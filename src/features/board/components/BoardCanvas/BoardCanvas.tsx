import { useAppDispatch } from '@/store';
import { Box } from '@mui/material';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { boardActions } from '../../stores';
import { BoardBackgroundCanvas } from '../BoardBackgroundCanvas';
import { BoardFiguresCanvas } from '../BoardFiguresCanvas';

export const BoardCanvas = (): ReactElement => {
  const boardRef = useRef<HTMLElement>();

  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const dispatch = useAppDispatch();

  const handleOnWheel = useCallback(
    (ev: WheelEvent) => {
      ev.preventDefault();
      if (ev.ctrlKey) {
        dispatch(boardActions.zoomBoard({ size: ev.deltaY < 1 ? 1 : -1 }));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.addEventListener('wheel', handleOnWheel, { passive: false });
      return () => {
        boardRef.current?.removeEventListener('wheel', handleOnWheel);
      };
    }
  }, [boardRef.current]);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!e.altKey) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    setStartPos({ x, y });
    setScroll({ x: e.currentTarget.scrollLeft, y: e.currentTarget.scrollTop });
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDragging) {
      return;
    }

    if (!e.altKey) {
      setIsDragging(false);
    }

    const x = e.pageX - e.currentTarget.offsetLeft;
    const walkX = x - startPos.x;
    e.currentTarget.scrollLeft = scroll.x - walkX;
    const y = e.pageY - e.currentTarget.offsetTop;
    const walkY = y - startPos.y;

    e.currentTarget.scrollTop = scroll.y - walkY;
  };

  return (
    <Box
      ref={boardRef}
      maxWidth='100vw'
      maxHeight='calc(100vh - 64px)'
      overflow='auto'
      position='relative'
      sx={{}}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <BoardFiguresCanvas />
      <BoardBackgroundCanvas />
    </Box>
  );
};
