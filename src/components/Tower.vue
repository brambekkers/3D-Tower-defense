<script setup lang="ts">
import type { Tower } from '../types/Tower.ts';
import Model from './Model.vue';

defineProps<{ tower: Tower }>();
</script>

<template>
  <Suspense>
    <Model v-for="(model, i) of tower.models" :fbx="model" :scale="0.004" :position="[tower.x, 0.2 + 0.2 * i, tower.z]" :rotation="tower.rotation" />
  </Suspense>
</template>
