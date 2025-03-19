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
  <nav class="text-stone-400 mt-4 flex justify-between text-sm border-b border-stone-700 pb-4 mb-3">
    <h1 class="font-semibold text-lg">Elden Ring Boss Tracker</h1>
    <div class="flex gap-3 items-center">
      <Dialog>
        <DialogTrigger>
          <Info class="hover:text-stone-200" />
        </DialogTrigger>
        <DialogContent>
          <DialogDescription class="text-stone-900 text-lg">
            <h3 class="font-semibold text-md mb-2">What's this?</h3>
            <p class="mb-3">This is a tracker for the bosses you have defeated in Elden Ring (including the Shadow of
              the Erdtree
              DLC). In total, this game features 272 + 62 bosses, and keeping track of all events is pretty much
              impossible. Hopefully this tool will help you navigate the game a bit better without spoiling away any
              progression.</p>

            <p class="mb-3">
              This tool leverages the two best sources of information on the internet: MapGenie's <a
                href="https://mapgenie.io/elden-ring/checklist">boss tracker</a> and
              <a href="https://mapgenie.io/elden-ring/maps/the-lands-between">map</a> and <a
                href="https://eldenring.wiki.fextralife.com/Elden+Ring+Wiki">[the Wiki</a>.
              It also includes some other handy features, like searching and, since it relies on your browser's local
              storage, an import and export mechanism so you can send it to other devices if needed.
            </p>

            <p class="mb-3">I was looking for an excuse to do a "dev speedrun" of sorts by building a very small app as
              quickly as
              possible. As I was playing Elden Ring at the time, this seemed like a quick - but useful - project to work
              on. Unfortunately, as it is customary, I got excited with the project and kept on adding features 🤷</p>

            <h3 class="font-semibold text-md mb-2 mt-5">Caveats</h3>
            <p class="mb-3">This tool uses your browser's Local Storage - which means, the list is only stored in your
              browser. As
              such, there's no login or multi-device sync whatsoever and everything is saved in the machine/browser
              you're interacting with.</p>

            <p>Keep in mind that if you clear cookies and local storage in said browser, you will lose all your tracked
              progress.</p>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <a href="https://github.com/sergiocastrovale/elden-ring-boss-tracker" target="_blank"
        class="hover:text-stone-200">
        <GitBranch :size="18" />
      </a>
    </div>
  </nav>
</template>
