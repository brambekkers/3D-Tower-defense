<script setup lang="ts">
  import { ref } from 'vue'
  import { useDecoration } from '../composables/decoration'
  import { useMatrix } from '../composables/matrix'
  import { usePath } from '../composables/path'
  import Tile from './Tile.vue'
  import Model from './Model.vue'
  import Selection from '../assets/models/selection-a.fbx'

  const size = 10
  const selectionPos = ref({ x: 0, z: 0 })

  const { matrix } = useMatrix(size)
  usePath(matrix.value)
  useDecoration(matrix.value)

  const setSelection = ({ x, z }) => {
    selectionPos.value.x = x
    selectionPos.value.z = z
  }
</script>

<template>
  <TresGroup :position="[-(size / 2), 0, -(size / 2)]">
    <template
      v-for="(row, z) of matrix"
      :key="'z' + z">
      <Tile
        v-for="(tile, x) of row"
        :key="'x' + x"
        :tile
        :x
        :z
        @selection="setSelection">
        >
      </Tile>
    </template>
    <!-- Mouse selection -->
    <Suspense>
      <Model
        :fbx="Selection"
        :scale="0.01"
        :position="[selectionPos.x, 0.2, selectionPos.z]" />
    </Suspense>
  </TresGroup>
</template>
