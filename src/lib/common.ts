export const getTileID = (x: number, y: number): string => {
  return `${x}:${y}`;
};

type TileProp = {
  id: string;
  x: number;
  y: number;
};
export const getTileProps = (id: string): TileProp => {
  const tile = id.split(":");

  return {
    id,
    x: parseInt(tile[0], 10),
    y: parseInt(tile[1], 10),
  };
};
