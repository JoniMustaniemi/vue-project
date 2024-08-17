<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  cartItems: Array,
});

const count = ref(0);

const totalQuantity = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
});

const totalPrice = computed(() => {
  return props.cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 0), 0)
    .toFixed(2);
});
</script>

<template>
  <div class="shoppingCart">
    {{ totalQuantity }}
  </div>
  <div class="totalPrice">{{ totalPrice }} €</div>
</template>

<style scoped>
.shoppingCart {
  padding: 30px;
  color: wheat;
  border-radius: 50%;
  background-color: rgb(45, 43, 40);
  position: fixed;
  top: 20px;
  right: 20px;
}

.totalPrice {
  position: fixed;
  top: 90px;
  right: 30px;
  background-color: red;
  border-radius: 10px;
  width: fit-content;
  padding: 5px;
  font-size: 12px;
  color: antiquewhite;
  border: 1px solid black;
}
</style>
