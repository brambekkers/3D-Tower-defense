<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import Ground from './Ground.vue';
import { OrbitControls } from '@tresjs/cientos';
</script>

<template>
  <TresCanvas clear-color="#cbecf8" window-size shadows>
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls :enable-pan="false" />
    <TresDirectionalLight :position="[3, 6, 9]" :intensity="0.6" cast-shadow />
    <TresAmbientLight :intensity="0.2" />
    <Ground />
  </TresCanvas>
</template>
