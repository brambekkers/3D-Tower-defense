<script setup lang="ts">
import { SelectedTower } from '@/types/Game';

// Tower parts
import Round_Middle from '@/assets/models/tower-round-middle-a.fbx';
import Round_Top from '@/assets/models/tower-round-top-a.fbx';

const selectedTower = defineModel<SelectedTower>('selectedTower', { required: true });

const addBlueprint = () => {
  console.log('Blueprint added');
  if (selectedTower.value.models.length < 4) {
    selectedTower.value.models.push(Round_Middle);
  } else if (selectedTower.value.models.length === 4) {
    selectedTower.value.models.push(Round_Top);
  }
};
</script>

<template>
  <div class="container">
    <img id="background" src="@/assets/ui/inlaybox.svg" alt="background" />

    <section class="blueprint-container" v-for="i of 3" :key="i">
      <h3>Blueprint {{ i }}</h3>
      <img class="blueprint" src="@/assets/ui/blueprint.svg" alt="blueprint" @click="addBlueprint" />
      <div class="price">
        <img class="coin" src="@/assets/ui/coin.svg" alt="Coin" />
        100
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  isolation: isolate;
  padding: 2cqi;

  display: flex;
  margin-top: auto;
  gap: 2cqi;
  width: 100%;
  aspect-ratio: 43/15;
  max-height: 23cqi;

  justify-content: space-around;

  #background {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .blueprint-container {
    cursor: url('@/assets/cursor/pointer.svg'), auto;
    display: flex;
    flex-direction: column;
    gap: 1cqi;
    justify-content: center;
    align-items: center;

    h3 {
      font-size: 2.3cqi;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.4);
    }
    .blueprint {
      width: 12cqi;
      aspect-ratio: 1/1;
      transition: transform 0.1s ease-in;

      &:hover {
        transform: scale(1.05) rotate(1deg);
      }
    }

    .price {
      text-align: center;
      font-weight: 400;
      color: white;
      text-shadow: -0.25cqi 0 black, 0 0.25cqi black, 0.25cqi 0 black, 0 -0.25cqi black;
      font-size: 1.3rem;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1cqi;
      margin-left: -1.3cqi;

      .coin {
        width: 3cqi;
      }
    }
  }
}
</style>
