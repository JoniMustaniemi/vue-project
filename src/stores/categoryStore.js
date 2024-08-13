// stores/categoryStore.js
import { defineStore } from 'pinia';
import { fetchItems } from '../utils/utils'; // Adjust the import path as needed

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    activeCategory: null,
  }),
  actions: {
    async fetchCategories() {
      try {
        this.categories = await fetchItems();
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    toggleActive(category) {
      this.activeCategory = this.activeCategory === category ? null : category;
    },
  },
});
