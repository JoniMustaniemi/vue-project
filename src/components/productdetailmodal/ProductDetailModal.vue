<script setup>
import { onMounted, ref } from "vue";
import arrow from "../../assets/arrow.png";

const props = defineProps({
  product: Object,
});

const imageUrl = ref("");

const emit = defineEmits(["close"]);

const closeModal = (e) => {
  emit("close");
};

const loadImage = async () => {
  const imageName = props.product.name.toLowerCase().replace(/\s+/g, "");
  try {
    const image = await import(`../../assets/products/${imageName}.jpg`);
    imageUrl.value = image.default;
  } catch (error) {
    imageUrl.value = "";
  }
};

onMounted(() => {
  loadImage();
});
</script>

<template>
  <div class="overlay" @click="closeModal"></div>
  <div class="productDetailModal">
    <img class="arrowIcon" :src="arrow" @click="closeModal" />
    <img class="productImage" :src="imageUrl" :alt="product.name + '.jpg'" />
    <div class="productInfoContainer">
      <div class="productName">
        <h1>{{ product.name }}</h1>
      </div>
      <div class="productDescription">
        <h1>{{ product.description }}</h1>
      </div>
      <div class="productPrice">
        <h1>{{ product.price }} €</h1>
      </div>
      <button class="addToCart">
        <h1>Add to cart</h1>
      </button>
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

.productDetailModal {
  display: flex;
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
  overflow: hidden;
}

.arrowIcon {
  height: 80px;
  position: absolute;
  left: 10px;
  top: 10px;
  transform: rotate(180deg);
  padding: 10px 20px;
}

.productImage {
  flex: 1;
  object-fit: cover;
  height: 100%;
  border-right: 2px solid black;
}

.productInfoContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(217, 215, 211);
}

.productName {
  font-size: 5em;
  text-align: center;
  height: 45%;
}

.productDescription {
  text-align: center;
  font-size: 2em;
  height: 35%;
}

.productPrice {
  text-align: center;
  font-size: 4em;
  height: 20%;
}

.addToCart {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin: 0 auto;
  background-color: rgb(0, 164, 0);
  color: white;
  border: 1px solid black;
  font-size: 1.2em;
  border-radius: 20px;
  border: 1px solid black;
  width: 300px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.02s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Horizontal offset, vertical offset, blur radius, color */
}

button:hover {
  transform: scale(1.02);
  filter: brightness(1.2);
}

button:active {
  transform: scale(1);
}
</style>
