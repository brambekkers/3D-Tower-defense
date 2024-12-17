<script setup lang="ts">
import Stats from './ui/Stats.vue';
import Towers from './ui/Towers.vue';
import UpgradeModal from './ui/UpgradeModal.vue';

// Types
import type { BuildMode, NewTowerKey, SelectedTower } from '@/types/Game';

const buildMode = defineModel<BuildMode>('buildMode', { required: true });
const newTowerKey = defineModel<NewTowerKey>('newTowerKey', { required: true });
const selectedTower = defineModel<SelectedTower>('selectedTower', { required: true });
defineProps<{ gems: number; coins: number; lives: number }>();
</script>

<template>
  <div id="screen">
    <div id="debug">
      <p>buildMode: {{ buildMode }}</p>
      <p>selectedTower: {{ newTowerKey }}</p>
    </div>
    <Stats :gems :lives :coins />
    <Towers v-model:build-mode="buildMode" v-model:new-tower-key="newTowerKey" :coins />
    <UpgradeModal v-model:selected-tower="selectedTower" />
  </div>
</template>

<style>
body {
  overflow: hidden;
}

#screen {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#debug {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: black;
  font-size: 1.3rem;

  p {
    margin: 0;
  }
}
</style>
