import { ref } from 'vue';

// Tower parts
import Round_Bottom from '../assets/models/tower-round-bottom-a.fbx';
import Round_Middle from '../assets/models/tower-round-middle-a.fbx';
import Round_Top from '../assets/models/tower-round-top-a.fbx';

import type { Tower } from '../types/Tower.ts';
import type { Tile } from '../types/Tile.ts';

export const useTowers = (matrix: Tile[][]) => {
  const towers = ref<Tower[]>([]);

  const addTower = (x: number, z: number) => {
    console.log(matrix[z][x]);
    if (matrix[z][x].isBlocked) return;
    matrix[z][x].isBlocked = true;
    towers.value.push({
      x,
      z,
      models: [Round_Bottom, Round_Middle, Round_Top],
      rotation: [0, 0, 0],
      range: 5,
      damage: 1,
      fireRate: 1,
    });
  };

  return {
    towers,
    addTower,
  };
};
