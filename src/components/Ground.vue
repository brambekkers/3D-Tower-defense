<script setup lang="ts">
import { ref } from 'vue';

// Types
import type { Tile } from '@/types/Tile.ts';
import type { BuildMode } from '@/types/Game';

// Composables
import { useDecoration } from '@/composables/decoration';
import { usePath } from '@/composables/path';

// Components
import TileComp from './Tile.vue';
import Model from './Model.vue';

// Models
import Selection from '@/assets/models/selection-a.fbx';

const { matrix } = defineProps<{ matrix: Tile[][]; buildMode: BuildMode }>();
defineEmits(['clickTile']);

const size = matrix.length;
const selectionPos = ref({ x: 0, z: 0 });

usePath(matrix);
const { decorations } = useDecoration(matrix);

const setSelection = ({ x, z }) => {
  selectionPos.value.x = x;
  selectionPos.value.z = z;
};
</script>

<template>
  <!-- Tiles -->
  <template v-for="(row, z) of matrix" :key="'z' + z">
    <TileComp v-for="(tile, x) of row" :key="'x' + x" :tile :x :z @selection="setSelection" @click="$emit('clickTile', { event: $event, x, z })" />
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
      <Model v-if="buildMode === 'selected'" :fbx="Selection" :scale="0.008" :position="[selectionPos.x, 0, selectionPos.z]" />
    </Suspense>
  </TresGroup>
</template>
