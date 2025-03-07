<script setup>
import Navigation from './components/Navigation.vue';
import BossList from './components/BossList.vue';
import Filters from '@/components/Filters.vue';
</script>

<template>
  <div class="container mx-auto py-2 px-3 xl:px-0">
    <Navigation />

    <div class="xl:flex xl:h-full xl:gap-10">
      <Filters />
      <BossList />
    </div>
  </div>
</template>
