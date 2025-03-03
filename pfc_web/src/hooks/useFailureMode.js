import { reactive, ref } from "vue";
import axios from "axios";
import { sku } from "./useFMEA";

const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/fmea/`;
const failureModeList = reactive([]);
const Temp = reactive([]);
const loading = ref(true);
const Sku = ref("");
const itempage = ref(10);
const failureModeDetail = ref([]);
const failureLastModeDetail = ref([]);
const fetchData = async () => {
  loading.value = true;
  try {
    const apiUrl = `${URL}getfailurelist`; // Construct URL
    const response = await axios.get(apiUrl);
    const result = response.data.data;
    failureModeList.splice(0, failureModeList.length, ...result);
    Temp.value = result;
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false; // Ensure loading is always turned off
  }
};
const fetchDataBySku = async (sku) => {
  failureModeList.splice(0, failureModeList.length, ...Temp.value);
  if (sku) {
    const skuFilter = sku.toLowerCase();
    const data = failureModeList.filter(
      (item) => item.SKU_code && item.SKU_code.toLowerCase().includes(skuFilter)
    );
    failureModeList.splice(0, failureModeList.length, ...data);
  } else {
    failureModeList.splice(0, failureModeList.length, ...Temp.value);
  }
};
// Định dạng sr
const extractStrings = (Devcode) => {
  const parts = Devcode.split("|");
  const extractedStrings = parts
    .map((part) => part.split(":")[1])
    .filter(Boolean);
  return extractedStrings.join("|");
};
// tim kiem theo SR
const fetchDataBySR = async (sku) => {
  failureModeList.splice(0, failureModeList.length, ...Temp.value);
  if (sku) {
    const skuFilter = sku.toLowerCase();
    const data = failureModeList.filter(
      (item) =>
        item.SR && extractStrings(item.SR).toLowerCase().includes(skuFilter)
    );
    failureModeList.splice(0, failureModeList.length, ...data);
  } else {
    failureModeList.splice(0, failureModeList.length, ...Temp.value);
  }
};

const fetchDataDetail = async (item) => {
  loading.value = true;
  try {
    const requestData = {
      Failure_id: item.Failure_id,
      Stage_name: item.Stage_name,
    };

    const response = await axios.post(`${URL}getfailuredetail`, requestData, {
      headers: { "Content-Type": "application/json" },
    });
    const result = response.data;

    if (result.data && Array.isArray(result.data)) {
      result.data.forEach((item) => {
        if (item.Image) {
          item.Image = `data:image/png;base64,${item.Image}`; // Chuyển đổi dữ liệu nhị phân thành base64
        }
      });
      failureModeDetail.value = result.data;

      // Lưu dữ liệu vào localStorage
      savefailureModeDetailLocalStorage(result.data);
    } else {
      failureModeDetail.value = [];
    }
  } catch (error) {
    console.error("POST Fetch error:", error);
    failureModeDetail.value =
      JSON.parse(localStorage.getItem("failureModeDetail")) || [];
  } finally {
    loading.value = false;
  }
};
const fetchLasstDataDetail = async (item) => {
  loading.value = true;
  try {
    const requestData = {
      Failure_id: item.Failure_id,
    };

    const response = await axios.post(
      `${URL}getlatestsodandcontrolplanbyfailureid`,
      requestData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = response.data;

    if (result.data && Array.isArray(result.data)) {
      failureLastModeDetail.value = result.data;
      // Lưu dữ liệu vào localStorage
      savefailureLastModeDetailLocalStorage(result.data);
    } else {
      failureLastModeDetail.value = [];
    }
  } catch (error) {
    console.error("POST Fetch error:", error);
    failureLastModeDetail.value =
      JSON.parse(localStorage.getItem("failureLastModeDetail")) || [];
  } finally {
    loading.value = false;
  }
};

const confirmDelete = async (Failure_id) => {
  loading.value = true;
  console.log("TEST", Failure_id);

  try {
    const response = await axios.post(`${URL}deletefailure`, {
      Failure_id: Failure_id,
    });

    console.log("Delete successful", response); 
    alert("Delete successful！");
  } catch (error) {
    console.error("Error deleting item", error);
    alert("Deletion failed, please try again!");
  } finally {
    loading.value = false;
  }
};

const savefailureModeDetailLocalStorage = (data) => {
  try {
    localStorage.setItem("failureModeDetail", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
const savefailureLastModeDetailLocalStorage = (data) => {
  try {
    localStorage.setItem("failureLastModeDetail", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const removefailureModeDetailLocalStorage = () => {
  try {
    localStorage.removeItem("failureModeDetail");
    localStorage.removeItem("failureLastModeDetail");
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export {
  Sku,
  itempage,
  loading,
  failureModeList,
  failureModeDetail,
  failureLastModeDetail,
  fetchData,
  fetchLasstDataDetail,
  fetchDataDetail,
  savefailureModeDetailLocalStorage,
  removefailureModeDetailLocalStorage,
  fetchDataBySku,
  fetchDataBySR,
  confirmDelete,
};
