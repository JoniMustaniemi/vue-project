<script setup></script>

<template>
  <div class="banner">
    <div class="container va-h4">
      <div class="logo"></div>
    </div>
  </div>
</template>
<style scoped>
.banner {
  width: 100%;
  height: 300px;

  vertical-align: middle;
  display: flex;
  background: url("../../assets/header.png") center no-repeat;
  background-size: cover;
  border-bottom: 1px solid black;
}

.logo {
  border: 2px solid silver;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: black;
  background: url("../../assets/shopLogo.png") center center no-repeat;
  background-size: 185%;
  border: 2px solid black;
  margin-left: 200px;
}

.container {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>
