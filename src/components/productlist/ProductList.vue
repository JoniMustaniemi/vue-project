<script setup>
import { ref, onMounted, watch } from "vue";
import { useCategoryStore } from "../../stores/categoryStore";
import { fetchCategoryList, fetchProducts } from "../../utils/utils";
import ProductCard from "../productcard/ProductCard.vue";

const categoryStore = useCategoryStore();
const products = ref([]);
const activeProduct = ref(null);

onMounted(async () => {
  await loadProducts(categoryStore.activeCategory?.name || "All");
});

watch(
  () => categoryStore.activeCategory,
  async (newCategory) => {
    await loadProducts(newCategory?.name || "All");
  }
);

async function loadProducts(category) {
  try {
    const response = await fetchProducts(category);
    products.value = response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}
</script>

<template>
  <div>
    <div class="productContainer">
      <div class="categoryName">
        <h2>
          {{ categoryStore.activeCategory?.name || "All products" }}
        </h2>
      </div>
      <div class="productItem" v-for="product in products" :key="product.name">
        <div>
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.productContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  padding: 5rem 2.5rem;
  width: 100%;
}

.categoryName {
  position: absolute;
  margin-top: -3rem;
}

h2 {
  font-size: 3em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

@media (min-width: 2000px) {
  .productContainer {
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
  }
}
</style>
