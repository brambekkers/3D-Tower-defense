import type { Tower } from './Tower.ts';
export type TowerKey = 'square' | 'round';

export type BuildMode = 'selected' | null;
export type NewTowerKey = TowerKey | null;
export type SelectedTower = Tower | null;
