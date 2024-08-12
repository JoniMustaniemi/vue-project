<script>
import CategoryList from "../categorylist/CategoryList.vue";

export default {
  components: {
    CategoryList,
  },
  data() {
    return {
      colors: ["#095576"],
    };
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
  height: fit-content;
  width: 30vw;
  max-width: 500px;
  /* background-color: rgba(0, 0, 0, 0.5); */
  margin-right: 5px;
  border-radius: 20px;
  color: #06374b;
  padding: 20px;
}
</style>
