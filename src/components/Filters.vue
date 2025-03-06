<script setup>
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { SquareX, Square } from 'lucide-vue-next';

const props = defineProps({
  regions: Array,
  categories: Array,
  selectedRegions: Array,
  selectedCategories: Array,
});

const emit = defineEmits(['update:selectedRegions', 'update:selectedCategories']);

const activeRegions = ref(new Set(props.selectedRegions));
const activeCategories = ref(new Set(props.selectedCategories));

watch(() => props.selectedRegions, (newSelected) => {
  activeRegions.value = new Set(newSelected);
}, { immediate: true });

watch(() => props.selectedCategories, (newSelected) => {
  activeCategories.value = new Set(newSelected);
}, { immediate: true });

const toggleRegion = (region) => {
  if (activeRegions.value.has(region)) {
    activeRegions.value.delete(region);
  } else {
    activeRegions.value.add(region);
  }
  emit('update:selectedRegions', Array.from(activeRegions.value));
};

const toggleCategory = (category) => {
  if (activeCategories.value.has(category)) {
    activeCategories.value.delete(category);
  } else {
    activeCategories.value.add(category);
  }
  emit('update:selectedCategories', Array.from(activeCategories.value));
};

const selectAllRegions = () => {
  activeRegions.value = new Set(props.regions);
  emit('update:selectedRegions', Array.from(activeRegions.value));
};

const deselectAllRegions = () => {
  activeRegions.value.clear();
  emit('update:selectedRegions', []);
};
</script>

<template>
  <div class="mb-10">
    <div class="mb-5">
      <h2 class="text-lg font-semibold text-stone-200 mb-3">Regions</h2>
      <Button @click="selectAllRegions" variant="outline" class="mr-2 bg-stone-200">Select All</Button>
      <Button @click="deselectAllRegions" variant="destructive">Deselect All</Button>

      <div class="flex flex-wrap gap-2 mt-2">
        <Button v-for="region in props.regions" :key="region" @click="toggleRegion(region)" variant="outline"
          class="flex items-center gap-2 bg-stone-200">
          <component :is="activeRegions.has(region) ? SquareX : Square" />
          {{ region }}
        </Button>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold text-stone-200 mb-3">Categories</h2>
      <div class="flex flex-wrap gap-2 mt-2">
        <Button v-for="category in props.categories" :key="category" @click="toggleCategory(category)" variant="outline"
          class="flex items-center gap-2 bg-stone-200">
          <component :is="activeCategories.has(category) ? SquareX : Square" />
          {{ category }}
        </Button>
      </div>
    </div>
  </div>
</template>
