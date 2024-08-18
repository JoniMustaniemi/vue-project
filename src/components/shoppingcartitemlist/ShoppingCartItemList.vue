<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";
import { defineEmits } from "vue";

const shoppingCartStore = useShoppingCartStore();
const cart = shoppingCartStore.cart;

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const processedCartItems = ref([]);

// Load image asynchronously
const loadImage = async (machineName) => {
  const imageUrl = ref("");
  try {
    const image = await import(`../../assets/products/${machineName}.jpg`);
    imageUrl.value = image.default;
  } catch (error) {
    imageUrl.value = "";
  }
  return imageUrl.value;
};

// Populate processedCartItems with data from cart
const displayCartItems = async () => {
  const items = await Promise.all(
    cart.map(async (product) => {
      const imageUrl = await loadImage(product.machineName);
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        imageUrl,
      };
    })
  );
  processedCartItems.value = items;
};

watch(
  () => cart,
  async () => {
    await displayCartItems();
  },
  { immediate: true }
);

const increaseQuantity = (index) => {
  const item = processedCartItems.value[index];
  item.quantity++;

  const productInStore = cart.find(
    (itemInStore) => itemInStore.name === item.name
  );
  if (productInStore) {
    productInStore.quantity = item.quantity;
  }
};

const decreaseQuantity = (index) => {
  const item = processedCartItems.value[index];
  if (item.quantity > 1) {
    item.quantity--;

    // Update the quantity in the shoppingCartStore
    const productInStore = cart.find(
      (itemInStore) => itemInStore.name === item.name
    );
    if (productInStore) {
      productInStore.quantity = item.quantity;
    }
  }
};

const removeItem = (index) => {
  const item = processedCartItems.value[index];
  shoppingCartStore.removeFromCart(item.name);

  // Remove item from processedCartItems
  processedCartItems.value.splice(index, 1);
};

// Compute total price based on processedCartItems
const totalPrice = computed(() => {
  return processedCartItems.value
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2); // Format to 2 decimal places
});
</script>

<template>
  <div class="overlay" @click="closeModal"></div>
  <div class="container">
    <div class="backbutton" @click="closeModal">
      <div class="backbuttonArrow"></div>
      <p>Back to shop</p>
    </div>
    <div class="cartItemContainer">
      <div
        v-for="(product, index) in processedCartItems"
        :key="product.id"
        class="cartItem"
      >
        <img
          :src="product.imageUrl"
          alt="Product Image"
          v-if="product.imageUrl"
        />
        <h2>{{ product.name }}</h2>
        <div class="quantityControl">
          <button class="decrease" @click="decreaseQuantity(index)">-</button>
          <p>{{ product.quantity }}</p>
          <button class="increase" @click="increaseQuantity(index)">+</button>
        </div>
        <p>Unit Price: {{ product.price }} €</p>
        <p>
          Total Price: {{ (product.price * product.quantity).toFixed(2) }} €
        </p>
        <button class="removeButton" @click="removeItem(index)">
          Remove Item
        </button>
      </div>
    </div>
    <div class="overallAmount">
      <div class="totalPriceContainer">
        <p>Overall Price:</p>
        <p class="overallPrice">{{ totalPrice }} €</p>
      </div>
      <button class="checkoutButton">Checkout</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 2;
}

.container {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 80%;
  max-width: 1900px;
  height: 80%;
  max-height: 900px;
  position: fixed;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  background-color: #cead9c;
  z-index: 3;
  padding: 20px;
  padding-bottom: 150px;
  overflow-y: auto;
}

.backbutton {
  display: flex;
  align-items: center;
  height: 100px;
  width: fit-content;
  font-weight: 700;
  padding: 20px;
  margin-bottom: 20px;
}

.backbuttonArrow {
  background-image: url("../../assets/arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(180deg);
  height: 50px;
  width: 50px;
  margin-right: 20px;
}

.cartItemContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 75%;
  margin: 0 auto;
}

.cartItemContainer p:not(.quantityControl p) {
  width: 15%;
  font-size: 1.2em;
  font-weight: 500;
}

.cartItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  width: 100%;
  height: 100px;
  background-color: #e5d5cb;
  border-radius: 10px;
  overflow: hidden;
}

.cartItem img {
  width: 120px;
  height: 100%;
  margin-right: 20px;
  border-right: 1px solid black;
}

.quantityControl {
  display: flex;
  align-items: center;
  font-size: 1em;
}

.quantityControl button {
  height: 30px;
  width: 30px;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
}

.increase {
  background-color: rgba(0, 128, 0, 0.4);
}

.decrease {
  background-color: rgba(255, 0, 0, 0.4);
}

.removeButton {
  margin-left: 50px;
  margin-right: 50px;
  padding: 5px 10px;
  background-color: rgb(139, 0, 0);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.removeButton:hover {
  background-color: darkred;
}

.overallAmount {
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center items horizontally */
  padding-top: 20px;
  font-size: 1.2em;
  gap: 10px; /* Space between the total price and checkout button */
}

.totalPriceContainer {
  text-align: center;
}

.overallPrice {
  margin-top: 10px;
  font-size: 1.6em;
  color: #261517;
}

.checkoutButton {
  padding: 10px 100px;
  background-color: #261517;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
}

.checkoutButton:hover {
  background-color: #162e38;
}
</style>
