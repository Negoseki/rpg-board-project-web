import { FC } from 'react';

const Tile: FC<{ tileSize: number }> = ({ tileSize }) => {
  return (
    <div
      style={{
        width: tileSize,
        height: tileSize,
        border: 1,
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderColor: 'black',
      }}
    ></div>
  );
};

export default Tile;
