<script setup>
import Export from '@/components/Export.vue';
import Import from '@/components/Import.vue';
import Search from '@/components/Search.vue';
</script>

<template>
  <div class="flex space-between items-center mb-5">
    <Search />

    <div class="flex gap-2 my-1 flex-1 justify-end">
      <Export />
      <Import />
    </div>
  </div>
</template>
