import { defineStore } from "pinia";

export const useShoppingCartStore = defineStore("shoppingCart", {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      console.log("Name of the item", product.name);
      const existingProduct = this.cart.find(
        (item) => item.name === product.name
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      console.log(
        "Current shopping cart:",
        JSON.parse(JSON.stringify(this.cart))
      );
    },
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.name !== product);
    },
    increaseQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeFromCart(productId);
        }
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
});
