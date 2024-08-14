<script setup>
import { defineProps, ref, onMounted } from "vue";

// Define the props for the component
const props = defineProps({
  product: Object,
});

// Create a ref to hold the image URL
const imageUrl = ref("");

// Function to load the image dynamically
const loadImage = async () => {
  const imageName = props.product.name.toLowerCase().replace(/\s+/g, "");
  try {
    // Dynamically import the image
    const image = await import(`../../assets/products/${imageName}.jpg`);
    imageUrl.value = image.default; // Set the image URL if found
  } catch (error) {
    // If the image is not found, set an empty string or a fallback URL
    imageUrl.value = ""; // Optionally, set a fallback image URL here
  }
};

// Load the image when the component is mounted
onMounted(() => {
  loadImage();
});
</script>

<template>
  <div class="productCard">
    <img class="productImage" :src="imageUrl" :alt="product.name + '.jpg'" />
    <div class="productInfoContainer">
      <h2 class="productName">{{ product.name }}</h2>
      <p class="productDescription">{{ product.description }}</p>
      <p class="productPrice">{{ product.price }} €</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: "Montserrat", sans-serif;
}

p {
  font-family: "Montserrat", sans-serif;
}

.productCard {
  width: 350px;
  height: 250px;
  transition: all 0.2s ease-in-out;
  border: 2px solid black;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.productCard:hover {
  transform: scale(1.1);
  transition: all 0.2s ease-in-out;

  .productImage {
    filter: brightness(1);
  }
}

.productImage {
  transition: all 0.2s ease-in-out;
  filter: brightness(0.5);
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.productInfoContainer {
  position: relative;
  height: 100%;
  z-index: 1;
  color: white;
}

.productName {
  font-size: 1.3em;
  background-color: rgba(255, 68, 0, 0.77);
  width: fit-content;
  min-width: 150px;
  padding: 10px;
  padding-left: 40px;
  margin-left: -20px;
  text-align: center;
  border-bottom-right-radius: 20px;
}

.productDescription {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  max-width: 70%;
  word-wrap: break-word;
  padding: 10px;
  bottom: 0;
  border-top-right-radius: 20px;
}

.productPrice {
  position: absolute;
  right: 0;
  bottom: 0px;
  background-color: rgb(0, 0, 0);
  color: white;
  font-weight: 700;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
}
</style>
