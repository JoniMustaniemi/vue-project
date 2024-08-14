<script>
import CategoryList from "../categorylist/CategoryList.vue";

export default {
  components: {
    CategoryList,
  },
};
</script>

<template>
  <div className="sideBar">
    <CategoryList />
  </div>
</template>

<style scoped>
.sideBar {
  height: auto;
  width: 300px;
  max-width: 300px;
  border-right: 1px solid black;
}
</style>
