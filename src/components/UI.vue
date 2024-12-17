<script setup lang="ts">
import { ref } from 'vue';
import Stats from './ui/Stats.vue';
import Towers from './ui/Towers.vue';
import Modal from './ui/Modal.vue';
import type { BuildMode, SelectedTower } from '../types/Game';

const buildMode = defineModel<BuildMode>('buildMode', { required: true });
const selectedTower = defineModel<SelectedTower>('selectedTower', { required: true });
defineProps<{ gems: number; coins: number; lives: number }>();

const modalVisible = ref(true);
</script>

<template>
  <div id="screen">
    <div id="debug">
      <p>buildMode: {{ buildMode }}</p>
      <p>selectedTower: {{ selectedTower }}</p>
    </div>
    <Stats :gems :lives :coins />
    <Towers v-model:buildMode="buildMode" v-model:selectedTower="selectedTower" :coins />
    <Modal v-model="modalVisible" />
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
