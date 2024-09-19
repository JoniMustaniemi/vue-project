import { defineStore } from 'pinia';
import { fetchCategoryList } from '../utils/utils';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    activeCategory: null,
  }),
  actions: {
    async fetchCategories() {
      try {
        this.categories = await fetchCategoryList();
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    toggleActive(category) {
      this.activeCategory = this.activeCategory === category ? null : category;
    },
  },
});
