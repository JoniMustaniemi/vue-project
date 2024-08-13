<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div class="banner">
    <div class="links-container va-h4">
      <div class="logo"></div>
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
  width: fit-content;
  height: 10vh;
  max-height: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  display: flex;
  justify-content: start;
  margin: 2% auto;
  border-bottom: 2px solid black;
  border-radius: 20px;
}

.logo {
  border: 2px solid silver;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: black;
  margin-left: -5%;
  background: url("../../assets/shopLogo.png");
  background-position: center;
  background-size: 185%;
  border: 2px solid black;
}

.links-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}

.links-container a {
  color: whitesmoke;
  padding: 8.2vh 50px;
}

a:hover {
  padding: 8.2vh 50px;
}
</style>
