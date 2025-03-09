<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Square, SquareX, MapPin } from 'lucide-vue-next';
import bossesData from '@/data/bosses_data.json';
import { useBossStore } from '@/stores/bossStore';

const bossStore = useBossStore();
const listContainer = ref(null);

onMounted(() => {
  const storedRegions = JSON.parse(localStorage.getItem('selectedRegions'));
  const storedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
  const storedFound = JSON.parse(localStorage.getItem('bosses')) || [];

  bossStore.setBosses(bossesData.bosses);
  bossStore.setSelectedRegions(storedRegions ?? bossStore.allRegions);
  bossStore.setSelectedCategories(storedCategories ?? bossStore.allCategories);
  bossStore.foundBosses = new Set(storedFound);
});

const getBossKey = (boss) => `${boss.name}-${boss.region_id}-${boss.location_id}`;

const previousScroll = ref(0);
const beforeFilterChange = () => {
  if (listContainer.value) {
    previousScroll.value = listContainer.value.scrollTop;
  }
};
const afterFilterChange = () => {
  nextTick(() => {
    if (listContainer.value) {
      listContainer.value.scrollTop = previousScroll.value;
    }
  });
};

watch([() => bossStore.selectedRegions, () => bossStore.selectedCategories], () => {
  beforeFilterChange();
  afterFilterChange();
});
</script>

<template>
  <div ref="listContainer" class="flex flex-grow flex-col gap-3 overflow-y-auto">
    <div v-for="(bosses, region) in bossStore.filteredBossesByRegion" :key="region">
      <h2 class="text-stone-100 text-xl font-semibold my-5">{{ region }}</h2>
      <div class="bg-stone-800 text-stone-100 py-1 px-3 xl:py-5 xl:px-7 flex flex-grow flex-col mb-5 rounded-2xl">
        <Table>
          <TableHeader class="uppercase">
            <TableRow class="hover:bg-stone-800 border-b-stone-700">
              <TableHead class="text-stone-500 p-3">Done</TableHead>
              <TableHead class="text-stone-500 p-3">Name</TableHead>
              <TableHead class="text-stone-500 p-3">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="boss in bosses" :key="getBossKey(boss)"
              class="border-b border-b-stone-700 transition-colors hover:bg-stone-700/50">
              <TableCell @click="bossStore.toggleFound(boss)" class="p-3">
                <component :is="bossStore.foundBosses.has(getBossKey(boss)) ? SquareX : Square" :size="30"
                  class="cursor-pointer" />
              </TableCell>
              <TableCell class="p-3">
                <div>
                  <a v-if="boss.location" :href="boss.location" target="_blank"
                    class="text-orange-300 hover:text-orange-400">
                    {{ boss.name }}
                  </a>
                  <span v-else class="text-stone-100"></span>
                </div>
                <div
                  class="border border-stone-500 bg-stone-500 rounded-lg text-xs py-1/2 px-2 inline-block text-center mt-2">
                  {{ boss.category }}
                </div>
              </TableCell>
              <TableCell class="py-3 info-panel flex-1" v-html="boss.info"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
:deep(.info-panel h3) {
  @apply font-semibold mb-1;
}

:deep(.info-panel h3.loot) {
  @apply mt-3;
}

:deep(.info-panel a) {
  @apply text-orange-300 hover:text-orange-400 pt-1 inline-block;
}
</style>
