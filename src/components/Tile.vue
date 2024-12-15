<script setup lang="ts">
  import Dirt from '../assets/models/tile-dirt.fbx'
  import type { Tile } from '../types/Tile.ts'
  import Model from './Model.vue'

  const { tile, x, z } = defineProps<{
    tile: Tile
    x: number
    z: number
  }>()
  const emit = defineEmits(['selection'])

  const addHover = (event) => {
    event.stopPropagation()
    if (tile.isBlocked || tile.isPath) return
    emit('selection', { x, z })
  }
</script>

<template>
  <Suspense>
    <Model
      :fbx="tile.model"
      :scale="0.01"
      :rotation="tile.rotation"
      :position="[x, 0, z]"
      @pointer-enter="addHover" />
  </Suspense>
  <Suspense>
    <Model
      :fbx="Dirt"
      :scale="0.01"
      :position="[x, -0.1, z]" />
  </Suspense>
</template>
