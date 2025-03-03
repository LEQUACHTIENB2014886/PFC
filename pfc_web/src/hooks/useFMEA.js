import { ref } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/fmea/`;

// Step 1
const stage = ref("");
const stageId = ref("");
const sku = ref("");
const category = ref("");
const categoryId = ref("");
const subcategory = ref("");
const subcategoryId = ref("");
const imgfailure = ref(null);

// Step 2
const Requirements = ref("");
const PotentialFailure = ref("");
const PotentialEffect = ref("");
const PotentialCause = ref("");

// Step 3
const SEV = ref(1);
const OCC = ref(1);
const DEC = ref(1);
const RPN = ref(1);
const Recommend = ref("");
const Responsibility = ref("");
const CompletionDate = ref("");
const latest_stage_id = ref("");
const Action_taken = ref("");

const newControllPlan = ref({
  projectName: "",
  mfg: "",
  characteristics: "",
  spec: "",
  evalTech: "",
  sample: "",
  resp: "",
  ctrl: "",
  reactionPlan: "",
});
const resetControlPlan = () => {
  newControllPlan.value = {
    projectName: "",
    mfg: "",
    characteristics: "",
    spec: "",
    evalTech: "",
    sample: "",
    resp: "",
    ctrl: "",
    reactionPlan: "",
  };
};
const step1Change = () => {
  if (
    !stage.value ||
    !sku.value ||
    !category.value ||
    !subcategory.value ||
    imgfailure.value === null
  ) {
    return true;
  }
  return false;
};

const step2Change = () => {
  if (
    !Requirements.value ||
    !PotentialFailure.value ||
    !PotentialEffect.value ||
    !PotentialCause.value ||
    !Recommend.value ||
    !CompletionDate.value
  ) {
    return true;
  }
  return false;
};

const ressetdat = () => {
  stage.value = "";
  sku.value = "";
  category.value = "";
  subcategory.value = "";
  imgfailure.value = null;
  Requirements.value = "";
  PotentialFailure.value = "";
  PotentialEffect.value = "";
  PotentialCause.value = "";
  SEV.value = 1;
  OCC.value = 1;
  DEC.value = 1;
  RPN.value = 1;
  Recommend.value = "";
  CompletionDate.value;
  Action_taken.value = "";
  resetControlPlan();
};

const generateUniqueFileName = (originalName) => {
  const timestamp = new Date().getTime();
  const extension = originalName.split(".").pop();
  return `${timestamp}.${extension}`;
};

// const SaveData = async () => {
//   const formData = new FormData();

//   formData.append("Stage_id", stageId.value);
//   formData.append("SKU_code", sku.value);
//   formData.append("Category_id", categoryId.value);
//   formData.append("SubCategory_id", subcategoryId.value);

//   if (
//     typeof imgfailure.value === "string" &&
//     imgfailure.value.startsWith("data:image/")
//   ) {
//     const byteString = atob(imgfailure.value.split(",")[1]);
//     const mimeString = imgfailure.value
//       .split(",")[0]
//       .split(":")[1]
//       .split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([ab], { type: mimeString });
//     const uniqueFileName = generateUniqueFileName("image.png");
//     formData.append("Image", blob, uniqueFileName);
//   } else {
//     console.error("imgfailure is not a valid data URL");
//   }

//   formData.append("Function_Requirements", Requirements.value);
//   formData.append("PotentialFailure", PotentialFailure.value);
//   formData.append("Potential_effec", PotentialEffect.value);
//   formData.append("Potential_Cause", PotentialCause.value);
//   formData.append("Sev", SEV.value);
//   formData.append("Occ", OCC.value);
//   formData.append("Det", DEC.value);
//   formData.append("Recommended_Actions", Recommend.value);

//   try {
//     const response = await fetch(`${URL}insertnewfailure`, {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();
//     if (response.ok) {
//       alert("Save successfully!");
//     } else {
//       alert("Error saving data.");
//     }
//   } catch (error) {
//     console.error("Lỗi khi gọi API:", error);
//   }
// };

const SaveData = async () => {
  const formData = new FormData();

  // Kiểm tra các giá trị bắt buộc
  if (!stageId.value) {
    alert("Please enter Stage!");
    return;
  }
  if (!sku.value) {
    alert("Please enter SKU!");
    return;
  }
  if (!categoryId.value) {
    alert("Please enter Category!");
    return;
  }
  if (!subcategoryId.value) {
    alert("Please enter Subcategory!");
    return;
  }
  if (!Requirements.value) {
    alert("Please enter Requirements!");
    return;
  }
  if (
    !PotentialFailure.value ||
    !PotentialEffect.value ||
    !PotentialCause.value
  ) {
    alert("Potential information fields cannot be empty!");
    return;
  }
  if (!SEV.value || !OCC.value || !DEC.value) {
    alert("Sev, Occ, or Det cannot be empty!");
    return;
  }
  if (!Recommend.value) {
    alert("Please enter Recommend!");
    return;
  }
  if (!CompletionDate.value) {
    alert("Please enter CompletionDate!");
    return;
  }
  if (!Responsibility.value) {
    alert("Please enter Responsibility!");
    return;
  }

  if (
    imgfailure.value &&
    typeof imgfailure.value === "string" &&
    imgfailure.value.startsWith("data:image/")
  ) {
    // Chuyển đổi base64 thành Blob
    const byteString = atob(imgfailure.value.split(",")[1]);
    const mimeString = imgfailure.value
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const uniqueFileName = generateUniqueFileName("image.png");
    formData.append("Image", blob, uniqueFileName);
  } else {
    alert("Invalid image or not uploaded!");
    return;
  }

  // Gắn các trường khác vào formData
  formData.append("Stage_id", stageId.value);
  formData.append("SKU_code", sku.value);
  formData.append("Category_id", categoryId.value);
  formData.append("SubCategory_id", subcategoryId.value);
  formData.append("Function_Requirements", Requirements.value);
  formData.append("PotentialFailure", PotentialFailure.value);
  formData.append("Potential_effec", PotentialEffect.value);
  formData.append("Potential_Cause", PotentialCause.value);
  formData.append("Sev", SEV.value);
  formData.append("Occ", OCC.value);
  formData.append("Det", DEC.value);
  formData.append("Target_Completion_Date", CompletionDate.value);
  formData.append("Recommended_Actions", Recommend.value);
  formData.append("Responsibility", Responsibility.value);

  try {
    const response = await fetch(`${URL}insertnewfailure`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      alert("Save successfully!");
      window.location.href = "/Main";
    } else {
      alert("Error saving data.");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

const fetchLatestStageID = async (Failure_id) => {
  const latestFailureID = { Failure_id };

  const response = await fetch(`${URL}getlatestsodbyfailureid`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(latestFailureID),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  // Trả về cả Stage_Id và Stage_name
  console.log("data.data.Stage_Id", data);

  return {
    Stage_Id: data.data.Stage_Id,
    Stage_name: data.data.Stage_Name,
  };
};

const saveActionResult = async (Failure_id, Stage_id, action_taken) => {
  // console.log(newControllPlan);
  const response = await fetch(`${URL}insertactionresult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Failure_id: Failure_id,
      Stage_id: String(Stage_id),
      Sev: String(SEV.value),
      Occ: String(OCC.value),
      Det: String(DEC.value),
      Action_Taken: String(Action_taken.value),
      ProjectName: String(newControllPlan.value.projectName),
      MFG_Resources: String(newControllPlan.value.mfg),
      Characteristics: String(newControllPlan.value.characteristics),
      Spec_Tolerance: String(newControllPlan.value.spec),
      Eval_Tech: String(newControllPlan.value.evalTech),
      Sample_Size_Freq: String(newControllPlan.value.sample),
      Resp_Depts: String(newControllPlan.value.resp),
      Ctrl_Method_Form: String(newControllPlan.value.ctrl),
      Reaction_Plan: String(newControllPlan.value.reactionPlan),
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Error saving data.");
  }

  return await response.json();
};

const updateActionSOD = async (Failure_id, Stage_id) => {
  console.log("updateActionSOD", Failure_id, Stage_id);

  try {
    if (Failure_id != "null" && Stage_id != "null") {
      const latestStageData = await fetchLatestStageID(Failure_id);

      latest_stage_id.value = latestStageData.Stage_Id;

      // console.log("latest_stage_id.value", latest_stage_id.value);
      // console.log("Stage_id", Stage_id, Failure_id);
      // console.log(
      //   newControllPlan.value,
      //   SEV.value,
      //   OCC.value,
      //   DEC.value,
      //   Action_taken.value
      // );
      if (latest_stage_id.value === Stage_id && Action_taken.value != "") {
        await saveActionResult(Failure_id, Stage_id)
          .then((data) => {
            ElNotification({
              title: "Success",
              message: "Save successfully!",
              type: "success",
            });
          })
          .catch((e) => {
            ElNotification({
              title: "Error",
              message: e,
              type: "error",
            });
          });
        ressetdat();
        // alert("Save successfully!");
        // if (newAction.value.at !== "" || actionSOD.value.length > 0) {
        //   const action_taken =
        //     newAction.value.at !== ""
        //       ? newAction.value.at
        //       : actionSOD.value[0].Action_Taken;

        //   await saveActionResult(Failure_id, Stage_id, action_taken);

        //   await fetchActionResultSOD({ Failure_id });
        //   window.location.reload();
        //   alert("Save successfully!");
        // } else {
        //   alert("Please fill in fields action_taken!");
        // }
      } else {
        ElNotification({
          title: "Warning",
          message:
            "Stage_name added or Action_taken is not null. Please reload page!",
          type: "warning",
        });
      }
    } else {
      ElNotification({
        title: "Warning",
        message: "Không được cập nhật!",
        type: "warning",
      });
    }
  } catch (error) {
    console.error("Error in updateActionSOD:", error);
  }
};
const saveSku = async (skuValue, Failure_id) => {
  try {
    const response = await fetch(`${URL}insertsku`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Sku_code: skuValue, Failure_id: Failure_id }),
    });
    const result = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Lỗi khi gọi API lưu SKU:", error);
  }
};

const fetchSodlistByFailureid = async (Failure_id, DateStart, DateEnd) => {
  const latestFailureID = { Failure_id, DateStart, DateEnd };

  const response = await fetch(`${URL}getsodlistbyfailureid`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(latestFailureID),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.data;
};

const fetchFailureDetail = async (Failure_id, Stage_name, SKU_code) => {
  const latestFailureID = { Failure_id, Stage_name, SKU_code };
  const response = await fetch(`${URL}getfailuredetail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(latestFailureID),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.data;
};

const listSKU = async () => {
  try {
    const result = await axios.get(`${URL}getsku`);
    const data = result.data.data;
    return data;
    // console.log("data", data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return ["No data"];
  }
};

export {
  stage,
  stageId,
  sku,
  category,
  categoryId,
  subcategory,
  subcategoryId,
  imgfailure,
  Requirements,
  PotentialFailure,
  PotentialEffect,
  PotentialCause,
  Responsibility,
  SEV,
  OCC,
  DEC,
  Recommend,
  CompletionDate,
  Action_taken,
  newControllPlan,
  step1Change,
  step2Change,
  ressetdat,
  SaveData,
  updateActionSOD,
  saveSku,
  fetchSodlistByFailureid,
  fetchFailureDetail,
  listSKU,
};
