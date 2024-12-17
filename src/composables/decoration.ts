import { ref } from 'vue';

// Tiles
import Tree1 from '@/assets/models/detail-tree.fbx';
import Tree2 from '@/assets/models/detail-tree-large.fbx';

// Decoration
import Rock1 from '@/assets/models/detail-dirt.fbx';
import Rock2 from '@/assets/models/detail-dirt-large.fbx';
import Rock3 from '@/assets/models/detail-rocks-large.fbx';

import type { Tile } from '@/types/Tile.ts';
import type { Decoration } from '@/types/Decoration.ts';

export const useDecoration = (matrix: Tile[][]) => {
  const size = matrix.length;
  const decorationAmount = Math.floor(size * size * 0.2);
  const treeAmount = Math.floor(decorationAmount * 0.3);
  const rockAmount = Math.floor(decorationAmount * 0.3);
  const plantAmount = Math.floor(decorationAmount * 0.3);

  const decorations = ref<Decoration[]>([]);

  const addRandomDecoration = (models: any[], amount: number) => {
    let left = amount;

    while (left > 0) {
      const x = Math.floor(Math.random() * size);
      const z = Math.floor(Math.random() * size);

      if (!matrix[z][x].isBlocked) {
        const randomModel = Math.floor(Math.random() * models.length);
        matrix[z][x].isBlocked = true;
        decorations.value.push({
          model: models[randomModel],
          x,
          z,
          rotation: [0, Math.random() * 2 * Math.PI, 0],
        });
        left--;
      }
    }
  };

  const addTrees = () => {
    const trees = [Tree1, Tree2];
    addRandomDecoration(trees, treeAmount);
  };

  const addRocks = () => {
    const rocks = [Rock1, Rock2, Rock3];
    addRandomDecoration(rocks, rockAmount);
  };

  addTrees();
  addRocks();
  // add plants
  // Add water
  // Add bridges

  return {
    decorations,
  };
};
