<script setup lang="ts">
  import { useMatrix } from '../composables/matrix'
  import { usePath } from '../composables/path'
  import Model from './Model.vue'

  const { matrix } = useMatrix()
  usePath(matrix.value)
</script>

<template>
  <template
    v-for="(row, z) of matrix"
    :key="'z' + z">
    <template
      v-for="(tile, x) of row"
      :key="'x' + x">
      <Suspense>
        <Model
          :fbx="tile.model"
          :scale="0.01"
          :rotation="tile.rotation"
          :position="[x, 0, z]" />
      </Suspense>
    </template>
  </template>
</template>
