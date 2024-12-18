<script setup lang="ts">
import { useGameStore } from '@/stores/game';
</script>

<template>
  <div id="debug">
    <p>buildMode: {{ useGameStore().buildMode }}</p>
    <p>selectedTower: {{ useGameStore().newTowerKey }}</p>
  </div>
</template>

<style>
#debug {
  position: absolute;
  z-index: 1000;
  top: 1rem;
  right: 1rem;
  color: black;
  font-size: 1.3rem;

  p {
    margin: 0;
  }
}
</style>
