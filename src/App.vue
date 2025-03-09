<script setup>
import Header from './components/Header.vue';
import List from './components/List.vue';
import Options from '@/components/Options.vue';
import Filters from '@/components/Filters.vue';
</script>

<template>
  <div class="container mx-auto py-2 px-3 xl:px-0">
    <Header />
    <Options />

    <div class="xl:flex xl:h-full xl:gap-10">
      <Filters />
      <List />
    </div>
  </div>
</template>
