<script setup lang="ts">
import Stats from './ui/Stats.vue';
import Towers from './ui/Towers.vue';
import UpgradeModal from './ui/UpgradeModal.vue';
</script>

<template>
  <div id="screen">
    <Stats />
    <Towers />
    <UpgradeModal />
  </div>
</template>

<style>
body {
  overflow: hidden;
}

#screen {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
