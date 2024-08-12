import api from "../services/api";

// Function to fetch items.
export async function fetchItems() {
  try {
    const response = await api.getItems();
    return response.data[0].categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to add an item.
export async function addItem(newItem) {
  try {
    const item = { name: newItem };
    await api.postItem(item);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
