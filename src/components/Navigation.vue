<script setup lang="ts">
import { GitBranch } from 'lucide-vue-next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-vue-next';
</script>

<template>
  <nav class="text-stone-400 mt-4 flex justify-between text-sm border-b border-stone-700 pb-4 mb-5">
    <h1 class="font-semibold text-lg">Elden Ring Boss Tracker</h1>
    <div class="flex gap-3 items-center">
      <Dialog>
        <DialogTrigger>
          <Info />
        </DialogTrigger>
        <DialogContent>
          <DialogDescription>
            <h3 class="font-semibold text-md mb-2">Why did you build this?</h3>
            <p>In all honesty, I was looking for an excuse to do a "dev speedrun" of sorts by building a very small app
              as
              quickly as possible. I built this in about four hours.</p>
            <h3 class="font-semibold text-md mb-2 mt-5">Aren't there better tools?</h3>
            <p>It's common knowledge that <a href="https://mapgenie.io/elden-ring" target="_blank"
                class="underline">MapGenie's tools</a> are incredibly useful (in Elden Ring and so many other games).
            </p>
            <p>However, the one I use the most - the Boss Checklist - is capped at a maximum of 40 free locations; after
              that you'd have to pay.</p>
            <p>This tracker uses the same information as that tracker, but without any limitations. It still links to
              MG's maps and wiki, but you can check and uncheck at will.</p>

            <h3 class="font-semibold text-md mb-2 mt-5">Caveats</h3>
            <p>This tool uses your browser's Local Storage - which means, the list is only stored in your browser
              (there's no login or multi-device sync). Keep in mind that if you clear cookies and local storage, you
              will lose this progress.</p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <GitBranch :size="18" />
    </div>
  </nav>
</template>
