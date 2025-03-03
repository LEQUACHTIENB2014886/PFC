import { computed, ref, watch } from "vue";

const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
import { ElNotification } from "element-plus";

const URL = `${urlIp}api/v1/fmea/`;
const loading = ref(true);
const activeStep = ref(0);
const newAction = ref({
  at: "",
  stg: "",
  sev: "1",
  occ: "1",
  dec: "1",
});
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

const actionSOD = ref([]);
const action_taken = ref("");
const latest_stage_id = ref("");
function resetData() {
  newAction.value = {
    at: "",
    stg: "",
    sev: "1",
    occ: "1",
    dec: "1",
  };

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
}
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
      Sev: String(newAction.value.sev),
      Occ: String(newAction.value.occ),
      Det: String(newAction.value.dec),
      Action_Taken: String(action_taken),
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

const saveActionSOD = async (Failure_id, Stage_id) => {
  try {
    const latestStageData = await fetchLatestStageID(Failure_id);

    latest_stage_id.value = latestStageData.Stage_Id;
    const Stage_name = latestStageData.Stage_name;
    if (Stage_id == null) {
      ElNotification({
        title: "Warning",
        message: "Next stage unknown!",
        type: "warning",
      });
      return false;
    }

    if (latest_stage_id.value != Stage_id) {
      if (newAction.value.at !== "" || actionSOD.value.length > 0) {
        const action_taken =
          newAction.value.at !== ""
            ? newAction.value.at
            : actionSOD.value[0].Action_Taken;

        await saveActionResult(Failure_id, Stage_id, action_taken);
        await fetchActionResultSOD({ Failure_id });
        resetData();
        activeStep.value = 0;
        ElNotification({
          title: "Success",
          message: "Save successfully!",
          type: "success",
        });
        return true;
      } else {
        ElNotification({
          title: "Warning",
          message: "Please fill in Next Action!",
          type: "warning",
        });
        return false;
      }
    } else {
      // alert(`${Stage_name} added. Please reload page!`);
      ElNotification({
        title: "Warning",
        message: `${Stage_name} added. Please reload page!`,
        type: "warning",
      });
      return true;
    }
  } catch (error) {
    console.error("Error in saveActionSOD:", error);
    return true;
  } finally {
    loading.value = false;
    // return false;
  }
};

const fetchActionResultSOD = async (item) => {
  loading.value = true;
  try {
    const requestData = {
      Failure_id: item.Failure_id,
    };

    const response = await fetch(`${URL}getactionresult`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();

    // Kiểm tra mã phản hồi và dữ liệu
    if (result.code === 200 && result.data && Array.isArray(result.data)) {
      actionSOD.value = result.data;

      // Lưu dữ liệu vào localStorage
      saveActionToLocalStorage(result.data);
    } else {
      actionSOD.value = [];
      console.warn("No valid data returned or code is not 200");
    }
  } catch (error) {
    console.error("POST Fetch error:", error);
  } finally {
    loading.value = false; // Đảm bảo loading luôn được tắt
  }
};

// Hàm lưu dữ liệu vào localStorage
const saveActionToLocalStorage = (data) => {
  try {
    localStorage.setItem("actionSOD", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const removeActionLocalStorage = () => {
  try {
    localStorage.removeItem("actionSOD");
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export {
  newAction,
  newControllPlan,
  saveActionSOD,
  actionSOD,
  activeStep,
  fetchActionResultSOD,
  saveActionToLocalStorage,
  removeActionLocalStorage,
  resetData,
};
