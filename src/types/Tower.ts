import { newTowerData } from '@/constants/Towers.js';

export type Tower = {
  x: number;
  z: number;
  id: number;
  type: 'square' | 'round';
  models: any[];
  range: number;
  damage: number;
  fireRate: number;
};

export type NewTowerData = (typeof newTowerData)[keyof typeof newTowerData];
