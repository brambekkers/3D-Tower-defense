<script setup lang="ts">
import type { BuildMode, NewTowerKey } from '@/types/Game';
import { TresCanvas } from '@tresjs/core';
import Ground from './Ground.vue';
import { OrbitControls } from '@tresjs/cientos';

// Constants
import { newTowerData } from '@/constants/Towers';

// Components
import TowerComp from './Tower.vue';

// Composables
import { useMatrix } from '@/composables/matrix';
import { useTowers } from '@/composables/towers';

// types
import type { Tower } from '@/types/Tower';

const buildMode = defineModel<BuildMode | null>('buildMode', { required: true });
const newTowerKey = defineModel<NewTowerKey | null>('newTowerKey', { required: true });
const coins = defineModel<number>('coins', { required: true });

const emit = defineEmits(['clickTower']);

const size = 10;
const { matrix } = useMatrix(size);

const { towers, addTower } = useTowers(matrix.value);

const hasEnoughCoins = (price: number) => {
  if (coins.value < price) return false;
  coins.value -= price;
  return true;
};

const clickTile = ({ event, x, z }) => {
  event.stopPropagation();
  if (matrix.value[z][x].isBlocked) return;
  if (buildMode.value !== 'selected' || !newTowerKey.value) return;

  // Buy tower
  const tower = newTowerData[newTowerKey.value];
  if (!hasEnoughCoins(tower.price)) return;
  addTower(tower.key, x, z);

  // Reset
  newTowerKey.value = null;
  buildMode.value = null;
};

const clickTower = ({ event, tower }) => {
  event.stopPropagation();
  emit('clickTower', tower);

  // Reset
  newTowerKey.value = null;
  buildMode.value = null;
};
</script>

<template>
  <TresCanvas clear-color="#cbecf8" window-size shadows>
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls :enable-pan="false" />
    <TresDirectionalLight :position="[3, 6, 9]" :intensity="0.6" cast-shadow />
    <TresAmbientLight :intensity="0.2" />
    <TresGroup :position="[-(size / 2), 0, -(size / 2)]">
      <Ground v-model:buildMode="buildMode" :matrix @click-tile="clickTile" />
      <!-- Towers -->
      <TowerComp v-for="(tower, i) of towers" :key="tower.type + i + tower.models.length" :tower="tower" @click-tower="clickTower" />
    </TresGroup>
  </TresCanvas>
</template>
