<script setup>
import { useStore } from 'vuex';

const store = useStore();

function addNewTask() {
  store.commit('moduleDashboard/SET_NEW_TASK_TO_COLUMN');
}
</script>
<template>
  <div class="column__add-new">
    <button
      @click="addNewTask"
      class="column__add-new--btn m-button"
    ></button>
    <div class="column__add-new--text">Add new</div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  &__add-new {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 8px;

    &--btn {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 2;
      margin: 0 12px;
      padding: 8px;
      width: 30px;
      height: 30px;

      &::before {
        content: '\2795';
      }
    }

    &--text {
      transition: all 0.2s ease-in;
      transform: translate3d(-50px, 0, 0);
      opacity: 0;
    }

    &:hover {
      .column__add-new--text {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
  }
}
</style>
