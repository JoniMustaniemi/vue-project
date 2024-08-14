import api from "../services/api";

export async function fetchCategoryList() {
  try {
    const response = await api.getItems();
    return response.data[0].categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchProducts(category = "all") {
  try {
    const response = await api.getItems();
    const productData = response.data[0].categories;
    const selectedCategory = productData.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );

    if (selectedCategory) {
      return selectedCategory.products || [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addItem(newItem) {
  try {
    const item = { name: newItem };
    await api.postItem(item);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
