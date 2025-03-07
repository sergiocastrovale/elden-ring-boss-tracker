<script setup>
import { ref, watch } from 'vue';
import { SquareX, Square } from 'lucide-vue-next';
import { useBossStore } from '@/stores/bossStore';

const bossStore = useBossStore();

const activeRegions = ref(new Set(bossStore.selectedRegions));
const activeCategories = ref(new Set(bossStore.selectedCategories));

watch(() => bossStore.selectedRegions, (newSelected) => {
  activeRegions.value = new Set(newSelected);
}, { immediate: true });

watch(() => bossStore.selectedCategories, (newSelected) => {
  activeCategories.value = new Set(newSelected);
}, { immediate: true });

const toggleRegion = (region) => {
  if (activeRegions.value.has(region)) {
    activeRegions.value.delete(region);
  } else {
    activeRegions.value.add(region);
  }
  bossStore.setSelectedRegions(Array.from(activeRegions.value));
};

const toggleCategory = (category) => {
  if (activeCategories.value.has(category)) {
    activeCategories.value.delete(category);
  } else {
    activeCategories.value.add(category);
  }
  bossStore.setSelectedCategories(Array.from(activeCategories.value));
};

const selectAllRegions = () => {
  activeRegions.value = new Set(bossStore.allRegions);
  bossStore.setSelectedRegions(Array.from(activeRegions.value));
};

const deselectAllRegions = () => {
  activeRegions.value.clear();
  bossStore.setSelectedRegions([]);
};

const selectAllCategories = () => {
  activeCategories.value = new Set(bossStore.allCategories);
  bossStore.setSelectedCategories(Array.from(activeCategories.value));
};

const deselectAllCategories = () => {
  activeCategories.value.clear();
  bossStore.setSelectedCategories([]);
};
</script>

<template>
  <div class="xl:sticky xl:top-0 xl:h-full xl:max-w-80">
    <div class="mb-5">
      <div class="flex gap-3 items-center mb-3">
        <h2 class="text-lg font-semibold text-stone-200">Regions</h2>

        <div class="flex gap-1 items-end text-stone-400 text-xs mt-1">
          <div @click="selectAllRegions" class="cursor-pointer hover:text-stone-200">Select All</div>
          <div>/</div>
          <div @click="deselectAllRegions" class="cursor-pointer hover:text-stone-200">Clear All</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        <div v-for="region in bossStore.allRegions" :key="region" @click="toggleRegion(region)"
          class="flex items-center gap-2 border py-1 px-2 rounded-md cursor-pointer"
          :class="activeRegions.has(region) ? 'border-stone-300 text-stone-300' : 'border-stone-500 text-stone-500'">
          <component :is="activeRegions.has(region) ? SquareX : Square" :size="18" />
          {{ region }}
        </div>
      </div>
    </div>

    <div>
      <div class="flex gap-3 items-center mb-3">
        <h2 class="text-lg font-semibold text-stone-200">Categories</h2>

        <div class="flex items-end gap-1 text-stone-400 text-xs mt-1">
          <div @click="selectAllCategories" class="cursor-pointer hover:text-stone-200">Select All</div>
          <div>/</div>
          <div @click="deselectAllCategories" class="cursor-pointer hover:text-stone-200">Clear All</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        <div v-for="category in bossStore.allCategories" :key="category" @click="toggleCategory(category)"
          class="flex items-center gap-2 border py-1 px-2 rounded-md cursor-pointer"
          :class="activeCategories.has(category) ? 'border-stone-300 text-stone-300' : 'border-stone-500 text-stone-500'">
          <component :is="activeCategories.has(category) ? SquareX : Square" :size="18" />
          {{ category }}
        </div>
      </div>
    </div>
  </div>
</template>
