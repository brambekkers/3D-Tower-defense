<script setup lang="ts">
const visible = defineModel<boolean>({ required: true });

const clickInModal = (event: MouseEvent) => {
  event.stopPropagation();
};
</script>

<template>
  <div v-if="visible" id="backdrop" @click="visible = false">
    <section id="modal" @click="clickInModal">
      <div class="title-container">
        <img src="../../assets/ui/modalTitle.svg" alt="title background" />
        <h2 class="title">Upgrade tower</h2>
      </div>
      <div class="content">
        <div class="status-card">
          <img src="../../assets/ui/statusCardRed.svg" alt="status" />
          <div id="max-level">Tower: 3/4</div>
          <div id="power">3.523.211</div>
        </div>
        <div class="target-frame">
          <img src="../../assets/ui/targetFrame.svg" alt="target" />
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
      gap: 2cqi;

      .status-card {
        width: 25cqi;
        position: relative;
        grid-column-start: 1;
        grid-column-end: 4;

        img {
          width: 100%;
          height: 100%;
        }

        #max-level {
          position: absolute;
          top: 2.5cqi;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8cqi;
          font-weight: 700;
          color: white;
          text-shadow: -0.2cqw 0 black, 0 0.2cqw black, 0.1cqw 0 black, 0 -0.1cqw black;
        }

        #power {
          position: absolute;
          bottom: 2.5cqi;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.7cqi;
          font-weight: 700;
          color: #ecc938;
          text-shadow: -0.2cqw 0 black, 0 0.2cqw black, 0.1cqw 0 black, 0 -0.1cqw black;
        }
      }

      .target-frame {
        width: 25cqi;

        aspect-ratio: 4/5;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
