<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

// Components
import Ground from './Ground.vue';
import Tower from './Tower.vue';
import Model from './Model.vue';

const size = useGameStore().worldSize;
const { towers } = storeToRefs(useTowerStore());
const { enemies } = storeToRefs(useEnemyStore());
const enemyRefs = ref([]);

const { onLoop } = useRenderLoop();
onLoop(() => {
  enemyRefs.value.forEach((enemy, i) => {
    useEnemyStore().updatePosition(enemy, i);
  });
});
</script>

<template>
  <TresCanvas clear-color="#cbecf8" window-size shadows render-mode="on-demand">
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls :enable-pan="false" />
    <TresDirectionalLight :position="[3, 6, 9]" :intensity="0.6" cast-shadow />
    <TresAmbientLight :intensity="0.2" />
    <TresGroup :position="[-(size / 2), 0, -(size / 2)]">
      <Ground />
      <!-- Towers -->
      <Tower v-for="tower of towers" :key="tower.id + tower.models.length" :tower="tower" />

      <!-- Enemies -->
      <TresGroup v-for="enemy of enemies" :key="enemy.id" ref="enemyRefs" :position="enemy.position">
        <Suspense>
          <Model :fbx="enemy.model" :scale="enemy.scale" />
        </Suspense>
      </TresGroup>
    </TresGroup>
  </TresCanvas>
</template>
