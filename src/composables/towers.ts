import { ref } from 'vue';

// Tower parts
import Round_Middle from '@/assets/models/tower-round-middle-a.fbx';
import Round_Top from '@/assets/models/tower-round-top-a.fbx';

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
