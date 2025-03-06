<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <p :class="cn('text-sm text-stone-500 dark:text-stone-400', props.class)">
    <slot />
  </p>
</template>
