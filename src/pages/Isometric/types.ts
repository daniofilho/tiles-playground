export type tilesType = {
  onX: number;
  onY: number;
  size: {
    width: number;
    height: number;
  };
  tall: number;
};

export type CoordinateType = {
  x: number;
  y: number;
};

export interface IRenderedTiles extends IIsometricTile {
  key: string;
}
