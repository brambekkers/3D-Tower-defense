import { ref } from 'vue';
import { defineStore } from 'pinia';
import { uuid } from '@/utils/id';

// Constants
import { newTowers } from '@/constants/Towers.ts';

// Types
import type { SelectedTower } from '@/types/Game';
import type { Tower } from '@/types/Tower.ts';

// Stores
import { useGameStore } from '@/stores/game';

// Round Tower parts
import Round_Bottom from '@/assets/models/tower-round-bottom-a.fbx';
import Round_Middle from '@/assets/models/tower-round-middle-c.fbx';
import Round_Roof from '@/assets/models/tower-round-roof-a.fbx';

// Square Tower parts
import Square_Bottom from '@/assets/models/tower-square-bottom-c.fbx';
import Square_Middle from '@/assets/models/tower-square-middle-b.fbx';
import Square_Top from '@/assets/models/tower-square-top-a.fbx';
import Weapon_Cannon from '@/assets/models/weapon-cannon.fbx';
import Weapon_Turret from '@/assets/models/weapon-turret.fbx';

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
      id: uuid(),
      models: [...newTower.models],
      type,
      x,
      z,
    });
  };

  const getPartsData = (model: string, position = [0, 0, 0]) => ({
    id: uuid(),
    model,
    position,
    rotation: [0, 0, 0],
  });

  const addSquareParts = () => {
    if (!selectedTower.value) return;
    const towerAmount = selectedTower.value?.models.length;

    if (towerAmount === 1) selectedTower.value?.models.unshift(getPartsData(Square_Top));
    else if (towerAmount === 2) {
      selectedTower.value?.models.push(getPartsData(Square_Bottom));
      const [top, shoot, bottom] = selectedTower.value?.models;
      selectedTower.value.models = [bottom, top, shoot];
    } else if (towerAmount === 3) {
      selectedTower.value?.models.push(getPartsData(Square_Middle));
      const [bottom, top, _, middle] = selectedTower.value?.models;
      const newShoot = getPartsData(Weapon_Cannon, [0, -0.1, 0]);
      selectedTower.value.models = [bottom, middle, top, newShoot];
    } else if (towerAmount === 4) {
      selectedTower.value?.models.push(getPartsData(Square_Middle));
      const [bottom, middle1, top, _, middle2] = selectedTower.value?.models;
      const newShoot = getPartsData(Weapon_Turret, [0, -0.05, 0]);
      selectedTower.value.models = [bottom, middle1, middle2, top, newShoot];
    }
  };

  const addRoundParts = () => {
    if (!selectedTower.value) return;

    const towerAmount = selectedTower.value.models.length;

    if (towerAmount === 1) selectedTower.value?.models.unshift(getPartsData(Round_Bottom));
    else if (towerAmount === 2) selectedTower.value?.models.push(getPartsData(Round_Roof));
    else if (towerAmount === 3) {
      selectedTower.value?.models.push(getPartsData(Round_Middle));
      const [bottom, shoot, roof, middle] = selectedTower.value?.models;
      selectedTower.value.models = [bottom, middle, shoot, roof];
    } else if (towerAmount === 4) {
      selectedTower.value?.models.push(getPartsData(Round_Middle));
      const [bottom, middle1, shoot, roof, middle2] = selectedTower.value?.models;
      selectedTower.value.models = [bottom, middle1, middle2, shoot, roof];
    }
  };

  return { selectedTower, towers, addTower, addSquareParts, addRoundParts };
});
