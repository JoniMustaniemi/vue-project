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
            <span>{{ category.name }}</span>
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
  height: fit-content;
}

.categoryItem {
  flex: 1 1 55px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.categoryButton {
  position: relative;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid black;
}

.categoryButton.active {
  transform: scale(1.5);
  filter: brightness(1.2);
  background: linear-gradient(45deg, #e6923d73, #ff6a00ea, #e6923d73);
  transition: all 0.2s ease-in-out;
}

.categoryButton:hover:not(.active) {
  transform: scale(1.2);
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

.categoryButton > span {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  width: 100%;
  text-align: center;
}
</style>
