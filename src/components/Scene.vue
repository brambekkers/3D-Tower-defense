<script setup lang="ts">
  import { TresCanvas } from '@tresjs/core'
  import Ground from './Ground.vue'
  import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size>
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />

    <TresDirectionalLight
      :position="[1, 2, 3]"
      :intensity="0.5"
      cast-shadow />
    <TresAmbientLight
      :intensity="0.5"
      cast-shadow />
    <Ground />
  </TresCanvas>
</template>
