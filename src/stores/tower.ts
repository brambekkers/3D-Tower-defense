import { ref } from 'vue';
import { defineStore } from 'pinia';

// Constants
import { newTowers } from '@/constants/Towers.ts';

// Types
import type { SelectedTower } from '@/types/Game';
import type { Tower } from '@/types/Tower.ts';

// Stores
import { useGameStore } from '@/stores/game';

export const useTowerStore = defineStore('tower', () => {
  const towers = ref<Tower[]>([]);
  const selectedTower = ref<SelectedTower>(null);

  const addTower = (type: 'square' | 'round', x: number, z: number) => {
    const { matrix } = useGameStore();
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

  return { selectedTower, towers, addTower };
});
