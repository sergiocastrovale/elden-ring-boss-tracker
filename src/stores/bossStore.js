import { defineStore } from 'pinia'

export const useBossStore = defineStore('bossStore', {
  state: () => ({
    bosses: [],
    foundBosses: new Set(),
    selectedRegions: [],
    selectedCategories: [],
  }),
  actions: {
    setBosses(bosses) {
      this.bosses = bosses
    },
    toggleFound(boss) {
      const key = `${boss.name}-${boss.region_id}-${boss.location_id}`

      if (this.foundBosses.has(key)) {
        this.foundBosses.delete(key)
      } else {
        this.foundBosses.add(key)
      }

      this.saveFoundBosses()
    },
    saveFoundBosses() {
      localStorage.setItem('bosses', JSON.stringify([...this.foundBosses]))
    },
    setSelectedRegions(regions) {
      this.selectedRegions = regions
      localStorage.setItem('selectedRegions', JSON.stringify(regions))
    },
    setSelectedCategories(categories) {
      this.selectedCategories = categories
      localStorage.setItem('selectedCategories', JSON.stringify(categories))
    },
  },
  getters: {
    allRegions: (state) => [...new Set(state.bosses.map((boss) => boss.region))],
    allCategories: (state) => [...new Set(state.bosses.map((boss) => boss.category))],
    filteredBossesByRegion: (state) => {
      return state.allRegions.reduce((acc, region) => {
        if (!state.selectedRegions.includes(region)) {
          return acc
        }

        const regionBosses = state.bosses.filter(
          (boss) => boss.region === region && state.selectedCategories.includes(boss.category),
        )
        if (regionBosses.length) acc[region] = regionBosses
        return acc
      }, {})
    },
  },
})
