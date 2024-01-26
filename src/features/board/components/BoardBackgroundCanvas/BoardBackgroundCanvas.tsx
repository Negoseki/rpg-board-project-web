import { useAppSelector } from '@/store/store';
import { ReactElement, useEffect, useRef } from 'react';

export const BoardBackgroundCanvas = (): ReactElement => {
  const boardConfig = useAppSelector((state) => state.board);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    canvas.width = boardConfig.tileSize * boardConfig.board[0].length;
    canvas.height = boardConfig.tileSize * boardConfig.board.length;
    canvas.width = boardConfig.tileSize * boardConfig.board[0].length;
    canvas.height = boardConfig.tileSize * boardConfig.board.length;

    const boardType: string = 'hexagon';

    if (boardType === 'hexagon') {
      const squareSize = boardConfig.tileSize;
      const oneFourSize = boardConfig.tileSize / 4;
      const halfSize = boardConfig.tileSize / 2;

      let isInverted = false;
      ctx.beginPath();
      for (let y = 0; y < canvas.height; y += squareSize) {
        const offsetY = isInverted ? -oneFourSize : oneFourSize;
        console.log({ y, offsetY, oneFourSize });
        ctx.moveTo(0, y + offsetY);
        let current = 0;
        let isOffsetY = true;
        if (!isInverted) {
          ctx.lineTo(0, y + offsetY + halfSize);
          ctx.moveTo(0, y + offsetY);
        }
        while (current < canvas.width) {
          current += halfSize;
          const yCalc = isOffsetY ? y : y + offsetY;
          ctx.lineTo(current, yCalc);
          isOffsetY = !isOffsetY;
          if ((!isInverted && isOffsetY) || (isInverted && !isOffsetY)) {
            ctx.lineTo(current, yCalc + halfSize);
            ctx.moveTo(current, yCalc);
          }
        }

        isInverted = !isInverted;
        if (!isInverted) {
          y -= halfSize;
        }
      }
      ctx.stroke();
    } else {
      const squareSize = boardConfig.tileSize;
      for (let x = 0; x < canvas.width; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
  }, [boardConfig.tileSize]);

  return <canvas ref={canvasRef} />;
};
