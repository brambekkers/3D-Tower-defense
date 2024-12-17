<script setup lang="ts">
import { ref } from 'vue';
import Scene from './components/Scene.vue';
import UI from './components/UI.vue';
import type { BuildMode, SelectedTower } from './types/Game';

const buildMode = ref<BuildMode>(null);
const selectedTower = ref<SelectedTower>(null);
const lives = ref(10);
const coins = ref(1000);
const gems = ref(0);
</script>

<template>
  <Scene v-model:buildMode="buildMode" v-model:selectedTower="selectedTower" />
  <UI v-model:buildMode="buildMode" v-model:selectedTower="selectedTower" :gems :coins :lives />
</template>
