<script setup lang="ts">
import { SelectedTower } from '@/types/Game';

// Round Tower partsf
import Round_Middle1 from '@/assets/models/tower-round-middle-a.fbx';
import Round_Middle2 from '@/assets/models/tower-round-middle-b.fbx';
import Round_Middle3 from '@/assets/models/tower-round-middle-c.fbx';
import Round_Roof from '@/assets/models/tower-round-roof-a.fbx';

// Square Tower parts
import Square_Middle from '@/assets/models/tower-square-middle-a.fbx';
import Square_Top from '@/assets/models/tower-square-top-a.fbx';

// Weapon Tower parts
import Weapon_Ballista from '@/assets/models/weapon-ballista.fbx';
import Weapon_Cannon from '@/assets/models/weapon-cannon.fbx';
import Weapon_Turret from '@/assets/models/weapon-turret.fbx';

const selectedTower = defineModel<SelectedTower>('selectedTower', { required: true });

const roundMiddels = [Round_Middle1, Round_Middle2, Round_Middle3];

const addSquareParts = () => {
  console.log('Square parts added');
  if (selectedTower.value.models.length < 3) {
    selectedTower.value.models.push(Square_Middle);
  } else if (selectedTower.value.models.length === 3) {
    selectedTower.value.models.push(Square_Top);
  } else if (selectedTower.value.models.length === 4) {
    selectedTower.value.models.push(Weapon_Ballista);
  }
};

const addRoundParts = () => {
  console.log('Round parts added');
  if (selectedTower.value.models.length < 4) {
    const randomMiddle = roundMiddels[Math.floor(Math.random() * roundMiddels.length)];
    selectedTower.value.models.push(randomMiddle);
  } else if (selectedTower.value.models.length === 4) {
    selectedTower.value.models.push(Round_Roof);
  }
};

const addBlueprint = () => {
  console.log('Blueprint added', selectedTower.value);
  if (selectedTower.value.type === 'round') {
    addRoundParts();
  } else {
    addSquareParts();
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
