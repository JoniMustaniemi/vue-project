<script setup>
import { ref, computed, watch } from "vue";
import ShoppingCartItemList from "../shoppingcartitemlist/ShoppingCartItemList.vue";

const props = defineProps({
  cartItems: Array,
});

const showItemList = ref(false);

const totalQuantity = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
});

const totalPrice = computed(() => {
  return props.cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 0), 0)
    .toFixed(2);
});

const displayItemList = () => {
  showItemList.value = true;
};

watch(showItemList, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <div class="container">
    <div class="shoppingCart" @click="displayItemList">
      <p>{{ totalQuantity }}</p>
    </div>
    <div class="totalPrice">{{ totalPrice }} €</div>
  </div>
  <ShoppingCartItemList v-if="showItemList" @close="showItemList = false" />
</template>

<style scoped>
.container {
  position: fixed;
  top: 20px;
  right: 20px;
  height: 100px;
  z-index: 3;
}

.shoppingCart {
  color: wheat;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: black;
  background-image: url("../../assets/shoppingCart.png");
  background-size: cover;
}

.shoppingCart p {
  position: relative;
  right: -40px;
  z-index: 3;
  font-size: 12px;
  background-color: red;
  font-weight: 700;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.shoppingCart:hover {
  filter: brightness(1.2);
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.shoppingCart:active {
  transform: scale(0.9);
}

.totalPrice {
  position: relative;
  bottom: 0;
  background-color: aliceblue;
  border-radius: 5px;
  width: fit-content;
  padding: 5px;
  width: 100%;
  font-weight: 700;
  text-align: center;
  font-size: 12px;
  color: black;
  border: 1px solid black;
  cursor: default;
  user-select: none;
}
</style>
