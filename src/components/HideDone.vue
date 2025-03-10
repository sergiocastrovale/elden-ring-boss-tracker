<script setup>
import { computed } from 'vue';
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

const total = computed(() => bossStore.foundBosses.size);
</script>

<template>
  <div class="flex items-center cursor-pointer text-stone-300 min-w-40 text-sm" @click="toggleHideDone">
    <component :is="hideDone ? SquareCheckBigIcon : Square" :size="18" class="mr-1" />
    <span>Hide Done ({{ total }})</span>
  </div>
</template>
