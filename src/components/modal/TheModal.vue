<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  data: Object,
  isLoading: Boolean,
});

const { data } = toRefs(props);

const emit = defineEmits(['onCloseModalTrigger']);

function closeModalOnOverlayClick() {
  emit('onCloseModalTrigger');
}
</script>

<template>
  <dialog
    class="modal-overlay"
    @click="closeModalOnOverlayClick"
    @keyup.esc="closeModalOnOverlayClick"
  >
    <div
      class="is-loading"
      v-if="props.isLoading"
    >
      Loading...
    </div>
    <article
      v-else
      class="modal"
      @click.stop
    >
      <summary class="modal__summary">
        <h2 class="mr-05">Title:</h2>
        <h1>{{ data.title }}</h1>
      </summary>

      <summary class="modal__summary">
        <h2 class="mr-05">Assigned to:</h2>
        <p>{{ data.assignedTo }}</p>
      </summary>

      <summary class="modal__summary">
        <h2 class="mr-05">State:</h2>
        <slot></slot>
      </summary>

      <div
        class="close"
        @keyup.esc="closeModalOnOverlayClick"
        @click="closeModalOnOverlayClick"
      >
        <img
          class="close-img"
          src=""
          alt=""
        />
      </div>
    </article>
  </dialog>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000da;

  .is-loading {
    color: #cdcdcd;
  }
  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: self-start;
    padding: 12px;
    background-color: #1a2930;
    height: 250px;
    width: 300px;
    border-radius: 4px;
    color: #cdcdcd;

    &__summary {
      display: flex;
      align-items: center;

      .mr-05 {
        margin-right: 8px;
      }
    }
  }
  .close {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(250, 246, 246, 0.701);

    &:hover {
      background: rgba(95, 91, 91, 0.701);
      opacity: 1;

      &:before,
      &:after {
        background: rgba(250, 246, 246, 0.701);
      }
    }
    &:before,
    &:after {
      position: absolute;
      left: 14px;
      content: ' ';
      height: 15px;
      width: 2px;
      background-color: #333;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}

.close-img {
  width: 25px;
}
</style>
