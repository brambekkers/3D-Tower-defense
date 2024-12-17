<script setup lang="ts">
import type { BuildMode, SelectedTower } from '../types/Game';
import { TresCanvas } from '@tresjs/core';
import Ground from './Ground.vue';
import { OrbitControls } from '@tresjs/cientos';

// Components
import Tower from './Tower.vue';

// Composables
import { useMatrix } from '../composables/matrix';
import { useTowers } from '../composables/towers';

const buildMode = defineModel<BuildMode | null>('buildMode', { required: true });
const selectedTower = defineModel<SelectedTower | null>('selectedTower', { required: true });

const size = 10;
const { matrix } = useMatrix(size);

const { towers, addTower } = useTowers(matrix.value);

const clickTile = ({ event, x, z }) => {
  event.stopPropagation();
  if (buildMode.value !== 'selected') return;
  addTower(x, z);
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
      <Tower v-for="(tower, i) of towers" :key="i" :tower="tower" />
    </TresGroup>
  </TresCanvas>
</template>
