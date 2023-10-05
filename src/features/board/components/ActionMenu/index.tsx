import { useAppDispatch } from '@/store/redux';
import { addTempFigure } from '@/store/redux/board';
import { FC } from 'react';

const ActionMenu: FC = () => {
  const dispatch = useAppDispatch();

  const handleOnClickFigure = () => {
    dispatch(
      addTempFigure({
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqFUZWvui9UG46DRy-9iTi1_qsuyiGJqmMA&usqp=CAU',
        name: 'warrior',
        size: 1,
      }),
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        width: 60,
        height: '60vh',
        overflowY: 'auto',
        background: 'brown',
        top: '20vh',
      }}
    >
      <button onClick={handleOnClickFigure}>Figure</button>
    </div>
  );
};

export default ActionMenu;
