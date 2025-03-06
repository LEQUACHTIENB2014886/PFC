import axios from "axios";
import { reactive, ref } from "vue";

const loading = ref(true);
const album = reactive([]); // Reactive array for album data

const fetchData = async () => {
  loading.value = true;
  try {
    const apiUrl = `http://127.0.0.1:8081/api/v1/albums`;
    const response = await axios.get(apiUrl);
    const result = response.data;

    // Update the reactive array
    album.splice(0, album.length, ...result);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false; // Ensure loading is always turned off
  }
};

const hookDeleteAlbum = async (row) => {
  loading.value = true;
  try {
    const apiUrl = `http://127.0.0.1:8081/api/v1/albums/${row.id}`;
    await axios.delete(apiUrl);
    // Remove the album from the reactive array
    const index = album.findIndex((item) => item.id === row.id);
    if (index !== -1) {
      album.splice(index, 1); // Removes the album from the array
    }
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

const hookUpdateAlbum = async (form) => {
  loading.value = true;
  try {
    const apiUrl = `http://127.0.0.1:8081/api/v1/albums/${form.id}`;
    const data = {
      ...form,
      price: parseFloat(form.price) || 0, // Convert price to a number
    };
    const response = await axios.put(apiUrl, data);
    const result = response.data;
    const index = album.findIndex((item) => item.id === result.id);
    if (index !== -1) {
      album[index] = { ...album[index], ...result };
    }
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

const hookAddAlbum = async (form) => {
  loading.value = true;
  try {
    const apiUrl = `http://127.0.0.1:8081/api/v1/albums`;
    const data = {
      ...form,
      price: parseFloat(form.price) || 0, // Convert price to a number
    };
    const response = await axios.post(apiUrl, data);
    const result = response.data;
    album.push(result);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

export {
  album,
  loading,
  fetchData,
  hookDeleteAlbum,
  hookUpdateAlbum,
  hookAddAlbum,
};
