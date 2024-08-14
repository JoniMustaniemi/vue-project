<script setup>
import { onMounted } from "vue";
import { useCategoryStore } from "../../stores/categoryStore";

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<template>
  <div>
    <div class="categoryContainer">
      <h1>Category</h1>
      <div
        class="categoryItem"
        v-for="category in categoryStore.categories"
        :key="category.categoryId"
      >
        <div>
          <button
            class="categoryButton"
            :class="{
              active:
                categoryStore.activeCategory?.categoryId ===
                category.categoryId,
            }"
            @click="categoryStore.toggleActive(category)"
          >
            <p>{{ category.name }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categoryContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding-top: 20px;
}

.categoryItem {
  width: 50%;
}

.categoryButton {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1.2em;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  background-color: transparent;
  border: 1px solid transparent;
  text-transform: capitalize;
}

.categoryButton.active {
  transition: all 0.2s ease-in-out;
  border-left: 3px solid orangered;
  font-size: 1.4em;
}

.categoryButton:hover:not(.active) {
  font-size: 1.4em;
}

.categoryButton::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: filter 0.2s;
}

.categoryButton > p {
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 1.8em;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
</style>
