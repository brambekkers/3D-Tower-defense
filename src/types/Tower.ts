import { newTowers } from '../constants/Towers.js';

export type Tower = {
  x: number;
  z: number;
  models: any[];
  rotation: number[];
  range: number;
  damage: number;
  fireRate: number;
};

export type NewTower = (typeof newTowers)[0];
