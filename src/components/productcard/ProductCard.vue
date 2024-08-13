<script setup></script>

<template>
  <div class="productCard"></div>
</template>

<style scoped>
.productCard {
  width: 350px;
  height: 250px;
  background: linear-gradient(45deg, #02252773, #006548, #02252773);
  transition: all 0.2s ease-in-out;
  border: 2px solid black;
}
.productCard:hover {
  transform: scale(1.1);
}
</style>
