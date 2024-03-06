import { useAppSelector } from '@/store/store';
import {
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { useGetBoardQuery, useUpdateBoardFigureMutation } from '../../api/board.api';
import { BoardFigures } from '../../types';
import { dragInitial, dragReducer } from './board-figures-canvas.reducer';

const loadedImages: Record<string, Promise<HTMLImageElement>> = {};
const loadImage = (imageUrl: string): Promise<HTMLImageElement> => {
  if (loadedImages[imageUrl] !== undefined) {
    return loadedImages[imageUrl];
  }

  const imgPromise = new Promise<HTMLImageElement>((resolve, reject) => {
    const newImage = new Image();
    newImage.src = imageUrl;
    newImage.onload = () => {
      resolve(newImage);
    };
    newImage.onerror = (ev) => {
      console.log(ev);
      reject();
    };
  });

  loadedImages[imageUrl] = imgPromise;
  return loadedImages[imageUrl];
};

export const BoardFiguresCanvas = (): ReactElement => {
  const { boardId: id = '' } = useParams();
  const { data: board } = useGetBoardQuery({ id });
  const [updateFigure] = useUpdateBoardFigureMutation();
  const boardConfig = useAppSelector((state) => state.board);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragOpts, dispatch] = useReducer(dragReducer, dragInitial);
  // @TODO: Implement board type select
  const boardType = 'hexagonal';

  const figures = useMemo<BoardFigures>(
    () =>
      ((board && Object.values(board.figures.entities).filter((v) => !!v)) as BoardFigures) || [],
    [board?.figures.entities],
  );

  const calculatePosition = useCallback(
    (position: { x: number; y: number }): [number, number] => {
      const halfSize = boardConfig.tileSize / 2;
      if (boardType === 'hexagonal') {
        return [
          position.x * boardConfig.tileSize + halfSize * (position.y % 2),
          position.y * (halfSize + halfSize / 2),
        ];
      }
      return [position.x * boardConfig.tileSize, position.y * boardConfig.tileSize];
    },
    [boardType, boardConfig.tileSize],
  );

  const calculateGrid = useCallback(
    (position: { x: number; y: number }, figureSize: number): { x: number; y: number } => {
      const totalSize = figureSize * boardConfig.tileSize;
      const halfSize = totalSize / 2;
      if (boardType === 'hexagonal') {
        const y = Math.round((position.y - halfSize) / (halfSize + halfSize / 2));
        const x = Math.round((position.x - halfSize - halfSize * (y % 2)) / totalSize);
        return { x, y };
      }

      const x = Math.round((position.x - halfSize) / totalSize);
      const y = Math.round((position.y - halfSize) / totalSize);
      return { x, y };
    },
    [boardType, boardConfig.tileSize],
  );

  // Correct board size
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }
    canvas.width = boardConfig.tileSize * boardConfig.board[0].length;
    canvas.height = boardConfig.tileSize * boardConfig.board.length;
  }, [boardConfig.tileSize]);

  // Start Drag temporary figure
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }
    if (boardConfig.tempFigure) {
      const position = { x: 0, y: 0 };
      dispatch({
        type: 'start',
        payload: {
          item: { ...boardConfig.tempFigure, position },
          currentPosition: position,
        },
      });
    } else {
      dispatch({ type: 'end' });
    }
  }, [boardConfig.tempFigure]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawImages = async () => {
      const imageDraws = [];
      for (const figure of figures) {
        if (figure === dragOpts.item) {
          continue;
        }
        const [x, y] = calculatePosition(figure.position);

        imageDraws.push(loadImage(figure.imageUrl));
        try {
          const img = await loadImage(figure.imageUrl);
          ctx.drawImage(img, x, y, boardConfig.tileSize, boardConfig.tileSize);
        } catch (e) {
          console.log('failed to load images');
        }
      }
    };

    drawImages();

    if (dragOpts.isDrag && dragOpts.item) {
      const [x, y] = [
        dragOpts.currentPosition.x - boardConfig.tileSize / 2,
        dragOpts.currentPosition.y - boardConfig.tileSize / 2,
      ];

      loadImage(dragOpts.item.imageUrl).then((img) => {
        ctx.drawImage(img, x, y, boardConfig.tileSize, boardConfig.tileSize);
      });
    }
  }, [figures, boardConfig.tileSize, dragOpts.isDrag, dragOpts.currentPosition]);

  const handleMouseDown = (ev: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || dragOpts.isDrag) {
      return;
    }
    const rect = canvas.getBoundingClientRect();

    const position = {
      x: ((ev.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((ev.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
    for (const figure of figures) {
      const figureSize = figure.size * boardConfig.tileSize;

      const [figureX, figureY] = calculatePosition(figure.position);

      if (
        position.x >= figureX &&
        position.x <= figureX + figureSize &&
        position.y >= figureY &&
        position.y <= figureY + figureSize
      ) {
        dispatch({
          type: 'start',
          payload: {
            item: figure,
            currentPosition: position,
          },
        });
        break;
      }
    }
  };

  const handleMouseUp = () => {
    if (!dragOpts.isDrag || !dragOpts.item || !dragOpts.currentPosition) {
      return;
    }
    const size = dragOpts.item.size;
    const position = dragOpts.currentPosition;

    updateFigure({ id, figure: { ...dragOpts.item, position: calculateGrid(position, size) } });
    dispatch({ type: 'end' });
  };

  const handleOnMouseMove = (ev: MouseEvent<HTMLCanvasElement>) => {
    ev.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || !dragOpts.isDrag) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const currentPosition = {
      x: ((ev.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((ev.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
    dispatch({ type: 'updatePosition', payload: { currentPosition } });
  };

  return (
    <canvas
      style={{ position: 'absolute', pointerEvents: 'inherit' }}
      ref={canvasRef}
      onMouseMove={handleOnMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};
