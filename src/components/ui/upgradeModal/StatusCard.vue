<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTowerStore } from '@/stores/tower';
import statusCardRed from '@/assets/ui/statusCardRed.svg';
import statusCardPurple from '@/assets/ui/statusCardPurple.svg';

const { selectedTower } = storeToRefs(useTowerStore());
const getStatusCard = (type: 'round' | 'square' | undefined) => (type === 'round' ? statusCardRed : statusCardPurple);
</script>

<template>
  <div class="status-card">
    <img :src="getStatusCard(selectedTower?.type)" alt="status" />
    <div id="max-level">Tower: {{ selectedTower?.models.length }}/5</div>
    <div id="power">3.523.211</div>
  </div>
</template>

<style scoped lang="scss">
.status-card {
  width: 25cqi;
  position: relative;
  grid-column-start: 1;
  grid-column-end: 4;

  img {
    width: 100%;
    height: 100%;
  }

  #max-level {
    position: absolute;
    top: 2.2cqi;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2cqi;
    font-weight: 700;
    color: white;
    text-shadow: -0.2cqw 0 black, 0 0.2cqw black, 0.1cqw 0 black, 0 -0.1cqw black;
  }

  #power {
    position: absolute;
    bottom: 3cqi;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.7cqi;
    font-weight: 700;
    color: #ecc938;
    text-shadow: -0.2cqw 0 black, 0 0.2cqw black, 0.1cqw 0 black, 0 -0.1cqw black;
  }
}
</style>
