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
          <DialogDescription>
            <h3 class="font-semibold text-md mb-2">What's this?</h3>
            <p>This is a tracker for the bosses you have defeated in Elden Ring (including the Shadow of the Erdtree
              DLC). In total, this game features 272 + 62 bosses, and keeping track of all events is pretty much
              impossible. Hopefully this tool will help you navigate the game a bit better without spoiling away any
              progression.</p>
            <p>I was looking for an excuse to do a "dev speedrun" of sorts by building a very small app as quickly as
              possible. As I was playing Elden Ring at the time, this seemed like a quick - but useful - project to work
              on.</p>
            <p>Unfortunately, as it is customary, I got excited with the project and kept on adding features 🤷</p>
            <h3 class="font-semibold text-md mb-2 mt-5">Aren't there better tools?</h3>
            <p>It's common knowledge that <a href="https://mapgenie.io/elden-ring" target="_blank"
                class="underline">MapGenie's tools</a> are incredibly useful are incredibly useful - in Elden Ring and
              so many other games. However, the one I use the most - the Boss Checklist - is capped at a maximum of 40
              free locations; after that you'd have to pay.</p>
            <p>This tracker uses the same information as that tracker, but without any limitations. It still links to
              MG's maps and wiki, but you can check and uncheck at will.</p>

            <h3 class="font-semibold text-md mb-2 mt-5">Caveats</h3>
            <p>This tool uses your browser's Local Storage - which means, the list is only stored in your browser. As
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
