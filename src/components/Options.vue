<script setup>
import Export from '@/components/Export.vue';
import Import from '@/components/Import.vue';
import Search from '@/components/Search.vue';
import HideDone from '@/components/HideDone.vue';
</script>

<template>
  <div class="flex space-between items-center mb-2 xl:my-3">
    <div class="flex flex-1 gap-2 xl:gap-4">
      <Search />
      <HideDone />
    </div>

    <div class="flex gap-2 my-1 flex-1 justify-end">
      <Export />
      <Import />
    </div>
  </div>
</template>
