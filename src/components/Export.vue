<script setup>
import { Download } from 'lucide-vue-next';
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const exportBosses = () => {
  const bosses = JSON.parse(localStorage.getItem('bosses')) || [];
  const jsonBlob = new Blob([JSON.stringify(bosses, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(jsonBlob);
  link.download = 'elden-ring-found-bosses.json';
  link.click();

  // Clean up and revoke the object URL
  URL.revokeObjectURL(link.href);

  toast({
    title: 'Export successful!',
    description: 'Your file was exported successfully. Use the import icon to sync your found bosses in another device!',
  });
};
</script>

<template>
  <div class="text-stone-300">
    <Toaster />

    <button @click="exportBosses">
      <Download :size="18" />
    </button>
  </div>
</template>
