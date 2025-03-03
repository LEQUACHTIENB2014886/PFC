// useGlobal.js
import { ref } from "vue";
import axios from "axios";
import noImg from "@/assets/no-image.jpg"
const selectedSKU = ref("");
const isShowSkuPicture = ref(false);
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/fmea/`;
const ImgSKU = ref("");
export function useGlobal() {
  const setSelectedSKU = (SKU) => {
    selectedSKU.value = SKU;
  };
  const closeSkuPicture = () => {
    isShowSkuPicture.value = false;
  };
  const openSkuPicture = async () => {
    await SKUImage();
    isShowSkuPicture.value = true;
  };

  const SKUImage = async () => {
    try {
      const param = {
        Sku: selectedSKU.value,
      };
      const result = await axios.post(`${URL}getimg`, param);
      const data = result.data.data;
  
      // Kiểm tra kỹ dữ liệu trả về và gán ảnh phù hợp
      ImgSKU.value =
        data && data[0] && data[0].Image
          ? `http://192.168.23.202:8089/BOM${data[0].Image.replace(/\\/g, "/").replace(/ /g, "%20")}G`
          : noImg; // Đường dẫn ảnh mặc định
    } catch (error) {
      // Nếu API bị lỗi, sử dụng ảnh mặc định
      ImgSKU.value = noImg;
      console.error("Lỗi khi gọi API:", error);
    }
  };
  
  return {
    ImgSKU,
    selectedSKU,
    isShowSkuPicture,
    setSelectedSKU,
    closeSkuPicture,
    openSkuPicture,
    SKUImage,
  };
}
