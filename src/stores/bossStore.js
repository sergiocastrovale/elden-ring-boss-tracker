import { defineStore } from 'pinia'

export const useBossStore = defineStore('bossStore', {
  state: () => ({
    bosses: [],
    filteredBosses: [],
    foundBosses: new Set(),
    selectedRegions: [],
    selectedCategories: [],
    searchQuery: '',
    hideDone: false,
    originalBosses: [],
  }),
  actions: {
    setBosses(bosses) {
      this.originalBosses = bosses
      this.bosses = bosses
      this.filterBosses()
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
      this.filterBosses()
    },
    setSelectedCategories(categories) {
      this.selectedCategories = categories
      localStorage.setItem('selectedCategories', JSON.stringify(categories))
      this.filterBosses()
    },
    setSearchQuery(query) {
      this.searchQuery = query
      this.filterBosses()
    },
    setHideDone(value) {
      this.hideDone = value
      localStorage.setItem('hideDone', JSON.stringify(value))
      this.filterBosses()
    },
    loadHideDone() {
      const hideDone = JSON.parse(localStorage.getItem('hideDone'))
      if (hideDone !== null) {
        this.hideDone = hideDone
      }
      this.filterBosses()
    },
    filterBosses() {
      this.filteredBosses = this.originalBosses.filter((boss) => {
        const matchesName = this.searchQuery
          ? boss.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true
        const matchesRegion =
          this.selectedRegions.length === 0 || this.selectedRegions.includes(boss.region)
        const matchesCategory =
          this.selectedCategories.length === 0 || this.selectedCategories.includes(boss.category)
        const isNotDone =
          !this.hideDone ||
          !this.foundBosses.has(`${boss.name}-${boss.region_id}-${boss.location_id}`)
        return matchesName && matchesRegion && matchesCategory && isNotDone
      })
    },
  },
  getters: {
    allRegions: (state) => [...new Set(state.originalBosses.map((boss) => boss.region))],
    allCategories: (state) => [...new Set(state.originalBosses.map((boss) => boss.category))],
    filteredBossesByRegion: (state) => {
      return state.allRegions.reduce((acc, region) => {
        if (!state.selectedRegions.includes(region)) {
          return acc
        }
        const regionBosses = state.filteredBosses.filter(
          (boss) => boss.region === region && state.selectedCategories.includes(boss.category),
        )
        if (regionBosses.length) acc[region] = regionBosses
        return acc
      }, {})
    },
  },
})
