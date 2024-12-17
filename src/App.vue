<script setup lang="ts">
import { ref } from 'vue';
import Scene from './components/Scene.vue';
import UI from './components/UI.vue';
import type { BuildMode, NewTowerKey, SelectedTower } from './types/Game';

const buildMode = ref<BuildMode>(null);
const newTowerKey = ref<NewTowerKey>(null);
const selectedTower = ref<SelectedTower>(null);

const lives = ref(10);
const coins = ref(1000);
const gems = ref(0);

const openUpgradeMenu = (tower: SelectedTower) => {
  selectedTower.value = tower;
};
</script>

<template>
  <Scene v-model:buildMode="buildMode" v-model:newTowerKey="newTowerKey" v-model:coins="coins" @click-tower="openUpgradeMenu" />
  <UI v-model:buildMode="buildMode" v-model:newTowerKey="newTowerKey" v-model:selectedTower="selectedTower" :gems :coins :lives />
</template>
