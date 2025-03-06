// composables/useOptions.js
import { ref } from "vue";

const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const baseURL = `${urlIp}api/v1/fmea/`;

// Hàm tạo URL cho các endpoint
const createURL = (endpoint) => `${baseURL}${endpoint}`;

export function useOptions() {
  // Stage options
  const stageOptions = ref([]);
  const categoryOptions = ref([]);
  const subcategoryOptions = ref([]);

  const fetchStageOptions = async () => {
    try {
      const response = await fetch(createURL("getstageslist"));

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        stageOptions.value = result.data;
      } else {
        console.log("Dữ liệu không phải là mảng. Gán mảng rỗng.");
        stageOptions.value = [];
      }
    } catch (error) {
      console.error("Fetch error:", error);
      stageOptions.value = [];
    }
  };

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch(createURL("getcategorieslist"));

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        categoryOptions.value = result.data;
      } else {
        console.log("Dữ liệu không phải là mảng. Gán mảng rỗng.");
        categoryOptions.value = [];
      }
    } catch (error) {
      console.error("Fetch error:", error);
      categoryOptions.value = [];
    }
  };

  const fetchSubcategoryOptions = async (Category_id) => {
    try {
      const requestData = { Category_id };
      const response = await fetch(createURL("getsublist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        subcategoryOptions.value = result.data;
        localStorage.setItem("subcategoryOptions", JSON.stringify(result.data));
      } else {
        console.log(
          "No valid data received, setting subcategoryOptions to empty."
        );
        subcategoryOptions.value = [];
      }
    } catch (error) {
      console.error("POST Fetch error:", error);
      subcategoryOptions.value =
        JSON.parse(localStorage.getItem("subcategoryOptions")) || [];
    }
  };

  return {
    fetchStageOptions,
    stageOptions,
    fetchCategoryOptions,
    categoryOptions,
    fetchSubcategoryOptions,
    subcategoryOptions,
  };
}
