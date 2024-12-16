<script setup lang="ts">
import { ref } from 'vue';

// Composables
import { useDecoration } from '../composables/decoration';
import { useMatrix } from '../composables/matrix';
import { usePath } from '../composables/path';
import { useTowers } from '../composables/towers';

// Components
import Tile from './Tile.vue';
import Model from './Model.vue';
import Tower from './Tower.vue';

// Models
import Selection from '../assets/models/selection-a.fbx';

const size = 10;
const selectionPos = ref({ x: 0, z: 0 });

const { matrix } = useMatrix(size);
usePath(matrix.value);
const { decorations } = useDecoration(matrix.value);
const { towers, addTower } = useTowers(matrix.value);

const setSelection = ({ x, z }) => {
  selectionPos.value.x = x;
  selectionPos.value.z = z;
};

const clickTile = (event, x, z) => {
  event.stopPropagation();
  addTower(x, z);
};
</script>

<template>
  <TresGroup :position="[-(size / 2), 0, -(size / 2)]">
    <!-- Tiles -->
    <template v-for="(row, z) of matrix" :key="'z' + z">
      <Tile v-for="(tile, x) of row" :key="'x' + x" :tile :x :z @selection="setSelection" @click="clickTile($event, x, z)" />
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

      <!-- Towers -->
      <Tower v-for="(tower, i) of towers" :key="i" :tower="tower" />

      <!-- Mouse selection -->
      <Suspense>
        <Model :fbx="Selection" :scale="0.008" :position="[selectionPos.x, 0, selectionPos.z]" />
      </Suspense>
    </TresGroup>
  </TresGroup>
</template>
