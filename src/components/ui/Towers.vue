<script setup lang="ts">
import { newTowers } from '../../constants/Towers';
import type { NewTower } from '../../types/Tower';
const buildMode = defineModel<'selected' | 'place' | null>('buildMode', { required: true });
const selectedTower = defineModel<'square' | 'round' | null>('selectedTower', { required: true });
const { coins } = defineProps<{ coins: number }>();

const select = (tower: NewTower) => {
  if (tower.price > coins) return;
  if (buildMode.value === 'selected') {
    buildMode.value = null;
    selectedTower.value = null;
  } else {
    buildMode.value = 'selected';
    selectedTower.value = tower.key;
  }
};
</script>

<template>
  <section id="towers">
    <div v-for="tower in newTowers" class="card" :class="{ selected: selectedTower === tower.key }" @click="select(tower)">
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
  font-family: 'Skranji', system-ui;
  font-style: normal;

  .card {
    position: relative;
    width: 220px;
    aspect-ratio: 179/274;
    transform: translateY(80%);
    transition: all 0.3s ease-in-out;

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
      cursor: pointer;
      transform: translateY(12%);
    }
  }
}
</style>
