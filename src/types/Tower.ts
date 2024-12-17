import { newTowerData } from '@/constants/Towers.js';

export type Tower = {
  x: number;
  z: number;
  type: 'square' | 'round';
  models: any[];
  rotation: number[];
  range: number;
  damage: number;
  fireRate: number;
};

export type NewTowerData = (typeof newTowerData)[keyof typeof newTowerData];
