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
  <TresGroup :position="[tower.x, 0.2, tower.z]">
    <Suspense>
      <Model
        v-for="(model, i) of tower.models"
        :key="model.id"
        :fbx="model.model"
        :scale="0.004"
        :position="[0 + model.position[0], 0.2 * i + model.position[1], 0 + model.position[2]]"
        :rotation="model.rotation"
        @click="clickTower"
      />
    </Suspense>
  </TresGroup>
</template>
