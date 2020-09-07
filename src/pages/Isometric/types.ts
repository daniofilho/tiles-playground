export type tilesType = {
  onX: number;
  onY: number;
  size: {
    width: number;
    height: number;
  };
  tall: number;
};

export type ActiveTileType = {
  id: string;
  x: number;
  y: number;
  adjacents: Array<string>;
};

export type CoordinateType = {
  x: number;
  y: number;
};

export interface IRenderedTiles {
  key: string;
  id: string;
  x: number;
  y: number;
  size: {
    width: number;
    height: number;
  };
  tall: number;
  active: boolean;
  adjacent: boolean;
  discovered: boolean;
}
