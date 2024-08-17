<script setup>
import { ref, watch } from "vue";
import { useShoppingCartStore } from "./stores/shoppingCartStore"; // Adjust the import path as needed

import Banner from "./components/banner/Banner.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import ProductList from "./components/productlist/ProductList.vue";
import ShoppingCart from "./components/shoppingcart/ShoppingCart.vue";

// Create a store instance
const shoppingCartStore = useShoppingCartStore();

// Access cart state from the store
const cart = shoppingCartStore.cart;

// Make cart available in the template
const cartItems = ref(cart);

// Watch for changes in the cart and update cartItems accordingly
watch(
  () => shoppingCartStore.cart,
  (newCart) => {
    cartItems.value = newCart;
  },
  { immediate: true }
);
</script>

<template>
  <div id="app">
    <header class="header">
      <Banner />
    </header>
    <div class="bodyWrapper">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="content">
        <ProductList />
      </main>
    </div>
    <ShoppingCart :cartItems="cartItems" />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 2000px;
  margin: 0 auto;
}

.bodyWrapper {
  display: flex;
  flex: 1;
}

#app::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #ede4db, #d4b7a8);
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  z-index: -1;
  transform: scale(1.3);
}
</style>
