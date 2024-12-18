<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { useTowerStore } from '@/stores/tower';

// Constants
import { newTowerData } from '@/constants/towers';

import Dirt from '@/assets/models/tile-dirt.fbx';
import type { Tile } from '@/types/Tile.ts';
import Model from './Model.vue';

const { tile, x, z } = defineProps<{
  tile: Tile;
  x: number;
  z: number;
}>();

const { matrix, newTowerKey, buildMode, selectedPos } = storeToRefs(useGameStore());

const addHover = (event: Event) => {
  if (tile.isBlocked) return;
  event.stopPropagation();

  selectedPos.value.x = x;
  selectedPos.value.z = z;
};

const clickTile = (event: Event) => {
  event.stopPropagation();
  if (matrix.value[z][x].isBlocked) return;
  if (buildMode.value !== 'selected' || !newTowerKey.value) return;

  // Buy tower
  const tower = { ...newTowerData[newTowerKey.value] };
  if (!usePlayerStore().hasEnoughCoins(tower.price)) return;
  useTowerStore().addTower(tower.key, x, z);

  // Reset
  newTowerKey.value = null;
  buildMode.value = null;
};
</script>

<template>
  <Suspense>
    <Model :fbx="tile.model" :scale="0.01" :rotation="tile.rotation" :position="[x, 0, z]" @pointer-enter="addHover" @click="clickTile" />
  </Suspense>
  <Suspense>
    <Model :fbx="Dirt" :scale="0.01" :position="[x, -0.1, z]" />
  </Suspense>
</template>
