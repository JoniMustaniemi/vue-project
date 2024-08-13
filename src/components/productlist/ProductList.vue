<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "../../stores/categoryStore";
import { fetchItems } from "../../utils/utils";
import ProductCard from "../productcard/ProductCard.vue";

const categoryStore = useCategoryStore();
const products = ref([]);
const activeProduct = ref(null);

onMounted(async () => {
  try {
    const response = await fetchItems();
    products.value = response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
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
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

.categoryName {
  font-size: 2em;
  position: absolute;
  margin-top: -70px;
  text-decoration: underline;
}

@media (min-width: 2000px) {
  .productContainer {
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
}
</style>
