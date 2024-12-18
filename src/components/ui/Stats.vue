<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const { gems, coins, lives } = storeToRefs(usePlayerStore());
</script>

<template>
  <section id="stats">
    <div>
      <img src="@/assets/ui/heart.svg" alt="Heart" />
      {{ lives }}
    </div>
    <div>
      <img src="@/assets/ui/coin.svg" alt="Coin" />
      {{ coins }}
    </div>
    <div>
      <img src="@/assets/ui/gem.svg" alt="Gem" />
      {{ gems }}
    </div>
  </section>
</template>

<style scoped>
#stats {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  margin: 1.3rem;

  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

#stats div {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  aspect-ratio: 11/6;
  background-image: url('@/assets/ui/counterBg.svg');
  background-repeat: no-repeat;
  background-size: 100%;
  margin-left: 1rem;

  font-weight: 400;
  font-style: normal;
  font-size: 1.3rem;
  text-shadow: -0.15rem 0 black, 0 0.15rem black, 0.15rem 0 black, 0 -0.15rem black;
}

#stats img {
  position: absolute;
  left: -0.2rem;
  width: 2.7rem;
  margin-right: 2rem;
}
</style>
