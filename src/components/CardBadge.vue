<script setup>
import CARD_STATE from '@/constants/cardState';
import { computed } from 'vue';

const props = defineProps({
  colorName: String,
  stateId: Number,
});

const badge = computed(() => {
  let color = null;
  let name = null;
  switch (props.stateId) {
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
  <div
    class="status-badge"
    :style="{ backgroundColor: badge.color }"
  >
    {{ badge.name }}
  </div>
</template>

<style lang="scss" scoped>
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
}
</style>
