<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

import { useGameStore } from '@/stores/game';
import { useTowerStore } from '@/stores/tower';

// Components
import Ground from './Ground.vue';
import Tower from './Tower.vue';

const size = useGameStore().worldSize;
const { towers } = storeToRefs(useTowerStore());
</script>

<template>
  <TresCanvas clear-color="#cbecf8" window-size shadows>
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls :enable-pan="false" />
    <TresDirectionalLight :position="[3, 6, 9]" :intensity="0.6" cast-shadow />
    <TresAmbientLight :intensity="0.2" />
    <TresGroup :position="[-(size / 2), 0, -(size / 2)]">
      <Ground />
      <!-- Towers -->
      <Tower v-for="tower of towers" :key="tower.id + tower.models.length" :tower="tower" />
    </TresGroup>
  </TresCanvas>
</template>
