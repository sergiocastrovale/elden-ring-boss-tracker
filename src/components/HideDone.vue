<script setup>
import { computed, onMounted } from 'vue';
import { useBossStore } from '@/stores/bossStore';
import { Square, SquareCheckBigIcon } from 'lucide-vue-next';

const bossStore = useBossStore();

const hideDone = computed({
  get: () => bossStore.hideDone,
  set: (value) => {
    bossStore.setHideDone(value);
  },
});

const toggleHideDone = () => {
  hideDone.value = !hideDone.value;
};
</script>

<template>
  <div class="flex items-center cursor-pointer text-stone-300 min-w-40" @click="toggleHideDone">
    <component :is="hideDone ? SquareCheckBigIcon : Square" :size="20" class="mr-1" />
    <span>Hide Done</span>
  </div>
</template>
