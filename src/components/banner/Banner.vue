<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div class="banner">
    <div class="links-container va-h4">
      <a href="#link1">Home</a>
      <a href="#link2">Shop</a>
      <a href="#link3">About</a>
      <a href="#link4">Contact</a>
      <a href="#link5">Policies</a>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 100vw;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  display: flex;
}

.links-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}

.links-container a {
  color: whitesmoke;
  text-decoration: underline;
  padding: 8.2vh 50px;
}

a:hover {
  padding: 8.2vh 50px;
  background-color: #00000033;
}
</style>
