export type tilesType = {
  onX: number;
  onY: number;
  size: {
    width: number;
    height: number;
  };
  tall: number;
};

export interface IRenderedTiles extends IIsometricTile {
  key: string;
}
