<script setup lang="ts">
import { SelectedTower } from '@/types/Game';
import StatusCard from '@/components/ui/upgradeModal/StatusCard.vue';

const selectedTower = defineModel<SelectedTower>('selectedTower', { required: true });

const clickInModal = (event: MouseEvent) => {
  event.stopPropagation();
};
</script>

<template>
  <div v-if="!!selectedTower" id="backdrop" @click="selectedTower = null">
    <section id="modal" @click="clickInModal">
      <div class="title-container">
        <img src="../../assets/ui/modalTitle.svg" alt="title background" />
        <h2 class="title">Upgrade tower</h2>
      </div>
      <div class="content">
        <StatusCard :selectedTower />
        <div class="right-container">
          <div class="target-frame">
            <img src="../../assets/ui/targetFrame.svg" alt="target" />
          </div>
          <div class="blueprint-container">
            <img id="background" src="../../assets/ui/inlaybox.svg" alt="background" />
            <img class="blueprint" src="../../assets/ui/blueprint.svg" alt="blueprint" />
            <img class="blueprint" src="../../assets/ui/blueprint.svg" alt="blueprint" />
            <img class="blueprint" src="../../assets/ui/blueprint.svg" alt="blueprint" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
#backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  pointer-events: all;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url('../../assets/cursor/pointer.svg'), auto;

  #modal {
    container-type: inline-size;
    background: white;
    width: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    border: 0.2cqi solid black;
    cursor: url('../../assets/cursor/arrow.svg'), auto;

    .title-container {
      position: relative;
      margin-top: -5%;
      min-width: 80cqi;
      margin-inline: auto;
      aspect-ratio: 437/65;

      display: flex;
      justify-content: center;
      align-items: center;
      container-type: inline-size;

      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .title {
        position: relative;
        font-weight: 700;
        z-index: 2;
        font-size: 6cqi;
        margin-top: -2.5cqi;
        color: white;
        text-shadow: -0.3cqw 0 black, 0 0.3cqw black, 0.3cqw 0 black, 0 -0.3cqw black;
        letter-spacing: 0.1cqw;
      }
    }

    .content {
      padding: 1cqi 3cqi 3cqi 3cqi;
      display: flex;
      align-items: start;
      gap: 2cqi;

      .right-container {
        display: flex;
        flex-grow: 1;

        flex-direction: column;
        gap: 0.5cqi;

        .target-frame {
          width: 25cqi;
          aspect-ratio: 177/50;

          img {
            width: 100%;
          }
        }

        .blueprint-container {
          position: relative;
          isolation: isolate;
          padding: 2cqi;

          display: flex;
          margin-top: auto;
          gap: 2cqi;
          width: 100%;
          aspect-ratio: 43/15;

          justify-content: space-around;

          #background {
            position: absolute;
            inset: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
          }

          .blueprint {
            cursor: url('../../assets/cursor/pointer.svg'), auto;
          }
        }
      }
    }
  }
}
</style>
