<script setup>
import Navigation from './components/Navigation.vue';
import BossList from './components/BossList.vue';
</script>

<template>
  <div class="container mx-auto">
    <Navigation />

    <div class="flex gap-2">
      <BossList />
    </div>
  </div>
</template>
