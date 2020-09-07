declare interface IIsometricTile {
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
  discoverTile(id: string): void;
}
