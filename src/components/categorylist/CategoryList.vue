<script setup>
import { ref, onMounted } from "vue";
import { fetchItems } from "../../utils/utils";

const categories = ref([]);
const activeCategory = ref(null);

onMounted(async () => {
  try {
    const response = await fetchItems();
    categories.value = response;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});

function toggleActive(category) {
  activeCategory.value = activeCategory.value === category ? null : category;
}
</script>

<template>
  <div>
    <div class="categoryContainer">
      <div
        class="categoryItem"
        v-for="category in categories"
        :key="category.name"
      >
        <div class="static">
          <button
            class="categoryButton"
            :class="{ active: activeCategory === category }"
            @click="toggleActive(category)"
          >
            <span>
              {{ category.name }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categoryContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  height: auto;
}

.categoryItem {
  flex: 1 1 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 5px;
}

.categoryButton {
  position: relative;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px double black;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  background-color: transparent;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    0 4px 10px rgba(0, 0, 0, 0.5), 0 2px 5px rgba(255, 255, 255, 0.2) inset;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.categoryButton.active {
  transform: scale(1.2);
  border: 5px double black;
}

.categoryButton.active:hover {
  transform: scale(1.2);
}

.categoryButton::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #9e2a00, #ff8c00);
  z-index: -1;
  transition: filter 0.2s;
}

.categoryButton:hover::before {
  filter: brightness(1.1);
}

.categoryButton > span {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8),
    -1px -1px 2px rgba(255, 255, 255, 0.8);
  width: 100%;
  padding: 3px;
  text-align: center;
}

.categoryButton:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    0 6px 14px rgba(0, 0, 0, 0.6), 0 2px 5px rgba(255, 255, 255, 0.2) inset;
  transform: translateY(-3px);
}
</style>
