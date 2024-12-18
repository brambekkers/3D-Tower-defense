<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';

// Components
import Tile from './Tile.vue';
import Model from './Model.vue';

// Models
import Selection from '@/assets/models/selection-a.fbx';

const { matrix, decorations, buildMode, selectedPos } = storeToRefs(useGameStore());
</script>

<template>
  <!-- Tiles -->
  <template v-for="(row, z) of matrix" :key="'z' + z">
    <Tile v-for="(tile, x) of row" :key="'x' + x" :tile :x :z />
  </template>

  <TresGroup :position="[0, 0.2, 0]">
    <!-- Decoration -->
    <Suspense>
      <Model
        v-for="decoration of decorations"
        :fbx="decoration.model"
        :scale="0.01"
        :position="[decoration.x, 0, decoration.z]"
        :rotation="decoration.rotation"
      />
    </Suspense>

    <!-- Mouse selection -->
    <Suspense>
      <Model v-if="buildMode === 'selected'" :fbx="Selection" :scale="0.008" :position="[selectedPos.x, 0, selectedPos.z]" />
    </Suspense>
  </TresGroup>
</template>
