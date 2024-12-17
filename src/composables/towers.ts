import { ref } from 'vue';

// Constants
import { newTowers } from '@/constants/Towers.ts';

import type { Tower } from '@/types/Tower.ts';
import type { Tile } from '@/types/Tile.ts';

export const useTowers = (matrix: Tile[][]) => {
  const towers = ref<Tower[]>([]);

  const addTower = (type: 'square' | 'round', x: number, z: number) => {
    if (matrix[z][x].isBlocked) return;
    matrix[z][x].isBlocked = true;
    const newTower = newTowers[type];

    towers.value.push({
      ...newTower,
      models: [...newTower.models],
      type,
      x,
      z,
    });
  };

  return {
    towers,
    addTower,
  };
};
