import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { BuildMode, NewTowerKey } from '@/types/Game';

// Composables
import { useMatrix } from '@/composables/matrix';
import { useDecoration } from '@/composables/decoration';
import { usePath } from '@/composables/path';

export const useGameStore = defineStore('game', () => {
  const worldSize = 10;
  const buildMode = ref<BuildMode>(null);
  const newTowerKey = ref<NewTowerKey>(null);
  const selectedPos = ref({ x: 0, z: 0 });

  const { matrix } = useMatrix(worldSize);
  usePath(matrix.value);
  const { decorations } = useDecoration(matrix.value);

  // const { towers, addTower } = useTowers(matrix.value);
  return { buildMode, newTowerKey, matrix, worldSize, decorations, selectedPos };
});
