<script async setup>
import draggable from 'vuedraggable';
import TaskCard from '@/components/TaskCard.vue';
import AddNewCard from '@/components/AddNewCard.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

store.dispatch('moduleDashboard/getDashboard');

const columns = computed(() => store.state.moduleDashboard.dashboard.columns.columns);

function seeChange(event, col) {
  if (event.added) {
    if (event.added.element.id === 0) return;
    store.dispatch('moduleDashboard/putTaskByStatusByColumn', {
      data: event.added.element,
      newState: col,
    });
  }
}
</script>

<template>
  <section class="dashboard dashboard__wrapper">
    <section
      v-for="column in columns"
      :key="column.title"
      class="dashboard__column"
    >
      <p class="dashboard__column--title">
        {{ column.title }}
      </p>

      <add-new-card v-if="column.id === 1" />

      <draggable
        v-model="column.tasks"
        :animation="300"
        ghost-class="hovering-card"
        group="tasks"
        :key="column.id"
        :item-key="column.title"
        class="dashboard__column--holder"
        @change="seeChange($event, column.id)"
      >
        <template #item="{ element }">
          <task-card
            :key="element.id"
            :task="element"
          >
          </task-card>
        </template>
      </draggable>
    </section>
    <router-view></router-view>
  </section>
</template>

<style lang="scss" scoped>
.dashboard {
  &__wrapper {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }

  &__column {
    & {
      display: flex;
      flex-direction: column;
      min-width: 280px;
      width: 280px;
      background-color: #0a1512;
      margin: 10px;

      &--title {
        font-size: 14px;
        font-weight: bold;
      }

      &--holder {
        height: 100%;
      }
    }
  }
}
.hovering-card {
  opacity: 0.8;
  background: #f7ce3e;
  border: 3px solid #cdcdcd;
  color: #0a1512;
}
</style>
