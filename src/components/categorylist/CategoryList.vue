<script setup>
import { ref, onMounted } from "vue";
import categoriesData from "../../categories.json";

const categories = ref([]);

onMounted(() => {
  categories.value = categoriesData.categories;
});
</script>

<template>
  <div>
    <div class="categoryContainer">
      <div
        class="categoryItem"
        v-for="category in categories"
        :key="category.name"
      >
        <button class="categoryButton">{{ category.name }}</button>
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
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to top,
    #01242a9d,
    #000000
  ); 
  border: 1px solid silver;
  border-radius: 8px; 
  color: white; 
  font-weight: bold;
  font-size: 14px; 
  text-transform: uppercase; 
  cursor: pointer; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.2s, box-shadow 0.2s;
}

.categoryButton:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); 
  transform: translateY(-2px); 
}

.categoryButton:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(1px); 
}
</style>
