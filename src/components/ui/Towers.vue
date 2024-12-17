<script setup lang="ts">
import { newTowerData } from '@/constants/Towers';

import type { BuildMode, NewTowerKey } from '@/types/Game';
import type { NewTowerData } from '@/types/Tower';

const buildMode = defineModel<BuildMode>('buildMode', { required: true });
const newTowerKey = defineModel<NewTowerKey>('newTowerKey', { required: true });

const { coins } = defineProps<{ coins: number }>();

const select = (tower: NewTowerData) => {
  if (tower.price > coins) return;
  if (buildMode.value === 'selected' && newTowerKey.value === tower.key) {
    buildMode.value = null;
    newTowerKey.value = null;
  } else {
    buildMode.value = 'selected';
    newTowerKey.value = tower.key;
  }
};
</script>

<template>
  <section id="towers">
    <div v-for="tower in newTowerData" class="card" :class="{ selected: newTowerKey === tower.key }" @click="select(tower)">
      <img class="bg" :src="tower.card" :alt="`Build ${tower.name}`" />
      <h2>{{ tower.name }}</h2>
      <div class="price">
        <img src="../../assets/ui/coin.svg" alt="Coin" />
        {{ tower.price }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#towers {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  margin: 1.3rem;

  display: flex;
  justify-content: center;
  gap: 2rem;

  pointer-events: all;
  font-style: normal;

  .card {
    position: relative;
    width: 220px;
    aspect-ratio: 179/274;
    transform: translateY(80%);
    transition: all 0.15s ease-in-out;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      aspect-ratio: 179/274;
    }

    h2 {
      position: absolute;
      top: 22px;
      left: 0;
      right: 0;
      margin: 0;
      text-align: center;
      font-weight: 400;
      text-shadow: -0.15rem 0 black, 0 0.15rem black, 0.15rem 0 black, 0 -0.15rem black;
      font-size: 1.3rem;
    }

    .price {
      position: absolute;
      bottom: 25px;
      left: 0;
      right: 0;
      margin: 0;
      text-align: center;
      font-weight: 400;
      text-shadow: -0.15rem 0 black, 0 0.15rem black, 0.15rem 0 black, 0 -0.15rem black;
      font-size: 1.3rem;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-left: -15px;

      img {
        width: 25px;
      }
    }

    &:hover,
    &.selected {
      cursor: url('../../assets/cursor/pointer.svg'), auto;
      transform: translateY(12%);
    }
  }
}
</style>
