<script setup>
import { computed } from 'vue';
import { useBossStore } from '@/stores/bossStore';
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

const bossStore = useBossStore();

const searchQuery = computed({
  get: () => bossStore.searchQuery,
  set: (value) => {
    bossStore.setSearchQuery(value);
    bossStore.filterBosses();
  },
});
</script>

<template>
  <div class="relative w-full items-center text-stone-300 max-w-64">
    <Input type="text" v-model="searchQuery" placeholder="Search for a boss..."
      class="pl-10 bg-stone-900 border border-stone-500 rounded-lg" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center pl-3">
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
