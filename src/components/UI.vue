<script setup lang="ts">
import Stats from './ui/Stats.vue';
import Towers from './ui/Towers.vue';

const buildMode = defineModel<'selected' | 'place' | null>('buildMode', { required: true });
const selectedTower = defineModel<'square' | 'round' | null>('selectedTower', { required: true });
defineProps<{ gems: number; coins: number; lives: number }>();
</script>

<template>
  <div id="screen">
    <div id="debug">
      <p>buildMode: {{ buildMode }}</p>
      <p>selectedTower: {{ selectedTower }}</p>
    </div>
    <Stats :gems :lives :coins />
    <Towers v-model:buildMode="buildMode" v-model:selectedTower="selectedTower" :coins />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Skranji:wght@400;700&display=swap');

.skranji-regular {
  font-family: 'Skranji', system-ui;
  font-weight: 400;
  font-style: normal;
}

.skranji-bold {
  font-family: 'Skranji', system-ui;
  font-weight: 700;
  font-style: normal;
}

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
