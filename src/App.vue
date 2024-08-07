<script>
import api from "./services/api.js";
import { fetchItems, addItem } from "./utils/utils.js";
import Banner from "./components/banner/Banner.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";

export default {
  components: {
    Banner,
    Sidebar,
  },
  data() {
    return {
      items: [],
      newItem: "",
    };
  },
  created() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      try {
        this.items = await fetchItems();
      } catch (error) {
        console.error(error);
      }
    },
    async addItem() {
      try {
        await addItem(this.newItem);
        this.loadItems();
        this.newItem = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <div id="app">
    <Banner />
    <div className="bodyWrapper">
      <Sidebar />
      <div class="content"></div>
    </div>
  </div>
</template>

<style scoped>
#app {
  position: relative;
  color: white;
  min-height: 100vh;
}

#app::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./assets/backdrop.jpg");
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: blur(6px);
  transform: scale(1.2);
}

.bodyWrapper {
  display: flex;
  flex: 1;
  padding: 20px;
}

.content {
  width: 100%;
  height: 200vh;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}
</style>
