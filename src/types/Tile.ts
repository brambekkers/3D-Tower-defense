export type Tile = {
  x: number;
  z: number;
  model: any;
  rotation: number[];
  isPath: boolean;
  isBlocked: boolean;
  visited: boolean;
};
