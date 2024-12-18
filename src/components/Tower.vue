<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Tower } from '@/types/Tower';
import Model from './Model.vue';

import { useGameStore } from '@/stores/game';
import { useTowerStore } from '@/stores/tower';

const { tower } = defineProps<{ tower: Tower }>();
defineEmits(['clickTower']);

const { newTowerKey, buildMode } = storeToRefs(useGameStore());
const { selectedTower } = storeToRefs(useTowerStore());

const clickTower = (event: Event) => {
  event.stopPropagation();
  selectedTower.value = tower;

  // Reset
  newTowerKey.value = null;
  buildMode.value = null;
};
</script>

<template>
  <Suspense>
    <Model
      v-for="(model, i) of tower.models"
      :fbx="model"
      :scale="0.004"
      :position="[tower.x, 0.2 + 0.2 * i, tower.z]"
      :rotation="tower.rotation"
      @click="clickTower"
    />
  </Suspense>
</template>
