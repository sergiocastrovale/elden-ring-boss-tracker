<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Square, SquareX, MapPin } from 'lucide-vue-next';
import bossesData from '@/data/bosses_data.json';
import Filters from '@/components/Filters.vue';

const bosses = ref(bossesData.bosses);
const foundBosses = ref(new Set());

const allRegions = ref([...new Set(bosses.value.map(boss => boss.region))]);
const allCategories = ref([...new Set(bosses.value.map(boss => boss.category))]);

const selectedRegions = ref([]);
const selectedCategories = ref([]);
const listContainer = ref(null);

const getBossKey = (boss) => `${boss.name}-${boss.region}-${boss.location}`;

onMounted(() => {
  const storedRegions = JSON.parse(localStorage.getItem('selectedRegions'));
  const storedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
  const storedFound = JSON.parse(localStorage.getItem('foundBosses')) || [];

  selectedRegions.value = storedRegions ?? [...allRegions.value];
  selectedCategories.value = storedCategories ?? [...allCategories.value];
  foundBosses.value = new Set(storedFound);
});

const saveFoundBosses = () => {
  localStorage.setItem('foundBosses', JSON.stringify([...foundBosses.value]));
};

watch([selectedRegions, selectedCategories], ([regions, categories]) => {
  localStorage.setItem('selectedRegions', JSON.stringify(regions));
  localStorage.setItem('selectedCategories', JSON.stringify(categories));
});

const isBossFound = (boss) => foundBosses.value.has(getBossKey(boss));

const toggleFound = (boss) => {
  const key = getBossKey(boss);
  if (foundBosses.value.has(key)) {
    foundBosses.value.delete(key);
  } else {
    foundBosses.value.add(key);
  }
  saveFoundBosses();
};

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

watch([selectedRegions, selectedCategories], () => {
  beforeFilterChange();
  afterFilterChange();
});

const filteredBossesByRegion = computed(() => {
  return allRegions.value.reduce((acc, region) => {
    if (!selectedRegions.value.includes(region)) return acc;
    const regionBosses = bosses.value.filter(boss =>
      boss.region === region && selectedCategories.value.includes(boss.category)
    );
    if (regionBosses.length) acc[region] = regionBosses;
    return acc;
  }, {});
});
</script>

<template>
  <div>
    <Filters :regions="allRegions" :categories="allCategories" v-model:selectedRegions="selectedRegions"
      v-model:selectedCategories="selectedCategories" />

    <div ref="listContainer" class="flex flex-grow flex-col gap-3 overflow-y-auto">
      <div v-for="(bosses, region) in filteredBossesByRegion" :key="region">
        <h2 class="text-stone-100 text-xl font-semibold my-5">{{ region }}</h2>
        <div class="bg-stone-800 text-stone-100 py-5 px-7 flex flex-grow flex-col mb-5 rounded-2xl">
          <Table>
            <TableHeader class="uppercase">
              <TableRow class="hover:bg-stone-800 border-b-stone-700">
                <TableHead class="text-stone-500 p-3">Done</TableHead>
                <TableHead class="text-stone-500 p-3">Map</TableHead>
                <TableHead class="text-stone-500 p-3">Name</TableHead>
                <TableHead class="text-stone-500 p-3">Category</TableHead>
                <TableHead class="text-stone-500 p-3">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="boss in bosses" :key="getBossKey(boss)"
                class="border-b border-b-stone-700 transition-colors hover:bg-stone-700/50">
                <TableCell @click="toggleFound(boss)" class="p-3">
                  <component :is="isBossFound(boss) ? SquareX : Square" :size="30" class="cursor-pointer" />
                </TableCell>
                <TableCell>
                  <a v-if="boss.boss_location" :href="boss.boss_location" target="_blank" class="text-stone-100">
                    <MapPin :size="24" />
                  </a>
                </TableCell>
                <TableCell class="p-3">{{ boss.name }}</TableCell>
                <TableCell class="p-3">{{ boss.category }}</TableCell>
                <TableCell class="py-3 info-panel" v-html="boss.info"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
:deep(.info-panel h3) {
  @apply font-semibold;
  @apply mb-1;
}

:deep(.info-panel h3.loot) {
  @apply mt-3;
}

:deep(.info-panel a) {
  @apply inline-block;
  @apply pt-1;
  @apply text-orange-300;
  @apply border-b border-orange-300 border-dotted;
}
</style>
