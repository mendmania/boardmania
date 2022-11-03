<script setup>
import TheModal from '@/components/modal/TheModal.vue';
import CardBadge from '@/components/CardBadge.vue';
import { useStore } from 'vuex';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const showModal = ref(false);
const isLoadingModal = ref(true);

const taskDetails = computed(() => store.state.moduleDashboard.taskDetails);

function handleCloseModal() {
  router.replace('/');
}

onMounted(async () => {
  showModal.value = true;
  await store.dispatch('moduleDashboard/getTaskById', route.params.id);
  isLoadingModal.value = false;
});
</script>

<template>
  <div class="details">
    <the-modal
      v-show="showModal"
      :is-loading="isLoadingModal"
      :data="taskDetails"
      @on-close-modal-trigger="handleCloseModal"
    >
      <card-badge :state-id="taskDetails.state" />
    </the-modal>
  </div>
</template>

<style></style>
