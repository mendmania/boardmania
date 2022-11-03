<script setup>
import CARD_STATE from '@/constants/cardState';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Badge from './CardBadge.vue';

const store = useStore();
const title = ref('');
const assignedTo = ref('');

const vAutoFocus = {
  mounted: (el) => {
    el.focus();
  },
};

const props = defineProps({
  task: Object,
});

const task = computed(() => props.task);

async function saveNewTask() {
  if (title.value) {
    await store.dispatch('moduleDashboard/postTaskByStatus', {
      title: title.value,
      assignedTo: assignedTo.value,
    });

    title.value = null;
    assignedTo.value = null;
  }
}

function onBlurSaveTask() {
  if (!title.value) {
    store.commit('moduleDashboard/REMOVE_FIRST_NEW_TASK_COLUMN_NEW');
  }
}

const badgeColor = computed(() => {
  let color = null;
  let name = null;
  switch (task.value.state) {
    case CARD_STATE.NEW:
      color = '#b2b2b2';
      name = 'New';
      break;
    case CARD_STATE.ACTIVE:
      color = '#007acc';
      name = 'Active';
      break;
    case CARD_STATE.TO_TEST:
      color = '#ff9d00';
      name = 'To Test';
      break;
    case CARD_STATE.COMPLETED:
      color = '#265e34';
      name = 'Completed';
      break;
    default:
      color = '#b2b2b1';
      name = 'Unknown';
      break;
  }

  return { color, name };
});
</script>

<template>
  <article class="task-card task-card__wrapper">
    <summary class="task-card__info">
      <label
        v-if="task.editing"
        for="task-title"
      >
        <input
          autocomplete="off"
          id="task-title"
          class="m-input"
          type="text"
          placeholder="Add Title..."
          v-model="title"
          @blur="onBlurSaveTask"
          v-auto-focus
        />
      </label>
      <p
        v-else
        class="task-card__title"
      >
        <router-link :to="`/details/${task.id}`">
          {{ task.title }}
        </router-link>
      </p>

      <div class="task-card__assigned-info">
        <img
          class="task-card__img"
          src="@/assets/images/no-user.jpg"
          alt="Assigned to"
        />
        <label
          v-if="task.editing"
          for="task-assign"
        >
          <input
            autocomplete="off"
            id="task-assign"
            class="m-input"
            type="text"
            placeholder="Assign to..."
            v-model="assignedTo"
          />
        </label>
        <p class="task-card__name">{{ task.assignedTo }}</p>
      </div>
    </summary>
    <footer class="task-card__content">
      <div class="content__state">
        <badge
          v-if="task.state"
          :stateId="task.state"
          :colorName="badgeColor.color"
          >{{ badgeColor.name }}
        </badge>
      </div>

      <button
        class="m-button m-button--primary"
        v-if="task.editing"
        @click="saveNewTask"
      >
        Save
      </button>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.task-card {
  &__wrapper {
    margin: 12px;
    padding: 12px;
    background-color: #1a2930;
    cursor: move;
  }
  &__info {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      width: 100%;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;

    &-state {
      margin-right: 8px;
    }
    .content__state {
      display: flex;
      align-items: center;
    }
  }

  &__title {
    display: flex;
    justify-content: start;
    font-size: 12px;
    font-weight: bold;
  }

  &__img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    margin-right: 8px;
    background-color: antiquewhite;
  }

  &__assigned-info {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
}
</style>
