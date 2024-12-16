<script setup lang="ts">
import Dirt from '../assets/models/tile-dirt.fbx';
import type { Tile } from '../types/Tile.ts';
import Model from './Model.vue';

const { tile, x, z } = defineProps<{
  tile: Tile;
  x: number;
  z: number;
}>();
const emit = defineEmits(['selection', 'click']);

const addHover = (event) => {
  if (tile.isBlocked) return;
  event.stopPropagation();

  emit('selection', { x, z });
};
</script>

<template>
  <Suspense>
    <Model :fbx="tile.model" :scale="0.01" :rotation="tile.rotation" :position="[x, 0, z]" @pointer-enter="addHover" @click="$emit('click', $event)" />
  </Suspense>
  <Suspense>
    <Model :fbx="Dirt" :scale="0.01" :position="[x, -0.1, z]" />
  </Suspense>
</template>
