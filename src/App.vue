<script setup lang="ts">
import { ref } from 'vue';
import Scene from './components/Scene.vue';
import UI from './components/UI.vue';

const buildMode = ref<'selected' | 'place'>(null);
const selectedTower = ref<'square' | 'round'>(null);
const lives = ref(10);
const coins = ref(1000);
const gems = ref(0);
</script>

<template>
  <Scene />
  <UI v-model:buildMode="buildMode" v-model:selectedTower="selectedTower" :gems :coins :lives />
</template>
