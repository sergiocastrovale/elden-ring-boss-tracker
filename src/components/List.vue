<script setup>
import { ref, onMounted } from 'vue';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Square, SquareX, } from 'lucide-vue-next';
import bossesData from '@/data/bosses_data.json';
import { useBossStore } from '@/stores/bossStore';
import { MapPin } from 'lucide-vue-next';

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
  bossStore.loadHideDone();
});

const getBossKey = (boss) => `${boss.name}-${boss.region_id}-${boss.location_id}`;

const getDoneCount = (bosses) => {
  return bosses.filter(boss => bossStore.foundBosses.has(getBossKey(boss))).length;
};

const processLoot = (boss) => {
  const runes = boss.runes ? `<ul><li>${boss.runes} runes</li></ul>` : null;
  const loot = boss.loot ? `<div>${boss.loot}</div>` : null;
  return [loot, runes].filter(Boolean).join(' ');
}

const processLocationAndInfo = (boss) => {
  const location = boss.location ?? null;
  const info = boss.info ? `<div class="my-2">⚠️${boss.info}</div>` : null;
  return [location, info].filter(Boolean).join(' ');
}
</script>

<template>
  <div ref="listContainer" class="flex flex-grow flex-col overflow-y-auto">
    <div v-for="(bosses, region) in bossStore.filteredBossesByRegion" :key="region">
      <h2 class="text-stone-200 text-xl font-semibold my-3">
        {{ region }}

        <span v-if="!bossStore.hideDone" class="font-normal text-sm">
          ({{ getDoneCount(bosses) }}/{{ bosses.length }})
        </span>
      </h2>
      <div class="bg-stone-800 text-stone-300 py-1 px-3 xl:py-5 xl:px-7 flex flex-grow flex-col rounded-2xl mb-5">
        <Table class="boss-list">
          <TableHeader class="uppercase">
            <TableRow class="hover:bg-stone-800 border-b-stone-700">
              <TableHead class="text-stone-500 p-3">Done</TableHead>
              <TableHead class="text-stone-500 p-3">Map</TableHead>
              <TableHead class="text-stone-500 p-3">Name</TableHead>
              <TableHead class="text-stone-500 p-3">Location</TableHead>
              <TableHead class="text-stone-500 p-3">Loot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="boss in bosses" :key="getBossKey(boss)"
              class="border-b border-b-stone-700 transition-colors "
              :class="bossStore.foundBosses.has(getBossKey(boss)) ? 'bg-stone-800 hover:bg-stone-800 opacity-30' : 'hover:bg-stone-700/50'">
              <TableCell @click="bossStore.toggleFound(boss)" class="p-3">
                <component :is="bossStore.foundBosses.has(getBossKey(boss)) ? SquareX : Square" :size="30"
                  class="cursor-pointer" />
              </TableCell>
              <TableCell class="p-3">
                <a v-if="boss.map" :href="boss.map" target="_blank" class="text-stone-300">
                  <MapPin :size="22" class="cursor-pointer" />
                </a>
              </TableCell>
              <TableCell class="p-3">
                <div>
                  <a v-if="boss.wiki" :href="boss.wiki" target="_blank">
                    {{ boss.name }}
                  </a>
                  <span v-else>
                    {{ boss.name }}
                  </span>
                </div>
                <div
                  class="border border-stone-500 bg-stone-500 rounded-lg text-xs py-1/2 px-2 inline-block text-center mt-2">
                  {{ boss.category }}
                </div>
              </TableCell>
              <TableCell class="p-3">
                <div v-if="boss.location" v-html="processLocationAndInfo(boss)" />
              </TableCell>
              <TableCell class="py-3">
                <div class="loot flex-1" v-html="processLoot(boss)" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
:deep(.boss-list a:not(.text-stone-300)) {
  @apply text-orange-300 hover:text-orange-400 pt-1 inline-block;
}

:deep(.boss-list ul > li) {
  display: list-item;
  list-style-type: "·";
  padding-inline-start: 1ch;
}
</style>
