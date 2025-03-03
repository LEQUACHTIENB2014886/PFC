<template>
    <div class="container">
        <el-button class="btn-add" type="primary" plain @click="dialogFormVisible = true">Add New Model</el-button>

        <el-table :data="filterTableData" style="width: 100%; height: 80vh; overflow-y: auto;">
            <el-table-column label="Model Type" prop="ModelType" />
            <el-table-column label="Model Name" prop="ModelName" />
            <el-table-column label="Material Number" prop="MaterialNumber" />
            <el-table-column label="Color Way ID" prop="ColorWayID" width="180" />
            <el-table-column label="Size Range" prop="SizeRange" width="180" />
            <el-table-column label="Pattern File Name" prop="PatternFileName" width="180" />
            <el-table-column label="First Source" prop="FirstSource" width="180" />
            <el-table-column align="right" width="250">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="actionEdit(scope.row)"
                        style="width: 100px; height: 30px;">Edit</el-button>
                    <br />
                    <el-button size="small" type="danger" @click="messageBoxWarringDeletePFCModel(scope.row)"
                        style="width: 100px; height: 30px; margin-top: 10px; margin-bottom: 10px;">Delete</el-button>
                    <br />
                    <el-button size="small" type="warning" @click="actionExport(scope.$index, scope.row)"
                        style="width: 100px; height: 30px;">Export</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="dialogFormVisible" @close="cancelForm" title="New PFC Model" width="600"
        :close-on-click-modal="false">
        <el-form style="max-width: 600px" :model="model" label-width="auto" label-position="right" size="default">
            <el-form-item label="Model Type:">
                <el-col :span="11">
                    <el-select v-model="ModelType" clearable placeholder="Select model type" style="width: 100%">
                        <el-option v-for="item in optionModelType" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Model name:">
                <el-input v-model="model.ModelName" />
            </el-form-item>
            <el-form-item label="Material number:">
                <el-input v-model="model.MaterialNumber" />
            </el-form-item>

            <el-form-item label="Model ID:">
                <el-input v-model="model.ModelID" />
            </el-form-item>
            <el-form-item label="Colorway ID:">
                <el-input v-model="model.ColorWayID" />
            </el-form-item>
            <el-form-item label="BOM ID:">
                <el-input v-model="model.BOMID" />
            </el-form-item>
            <el-form-item label="Date:">
                <el-col :span="11">
                    <el-date-picker v-model="model.Date" type="date" aria-label="Pick a date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="IDS:">
                <el-col :span="11">
                    <el-select v-model="IDS" clearable placeholder="Select" style="width: 100%">
                        <el-option v-for="item in optionIDS" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Converse:">
                <el-col :span="11">
                    <el-select v-model="Converse" clearable placeholder="Select converse" style="width: 100%">
                        <el-option v-for="item in optionConverse" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Size range:">
                <el-input v-model="model.SizeRange" />
            </el-form-item>
            <el-form-item label="Last code:">
                <el-input v-model="model.LastCode" />
            </el-form-item>
            <el-form-item label="Tool code:">
                <el-input v-model="model.ToolCode" />
            </el-form-item>
            <el-form-item label="Pattern filename:">
                <el-input v-model="model.PatternFileName" />
            </el-form-item>
            <el-form-item label="First source:">
                <el-input v-model="model.FirstSource" />
            </el-form-item>
            <el-form-item label="Key Manufacturing Processes:">
                <el-input v-model="model.KeyManufacturingProcesses" type="textarea" :rows="5" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" @click="confirmInsertNewPFCModel">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { ElLoading, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import Model from "@/interfaces/Model";
import {
    // loadExampleExcelFile,
    // exportToExcel,
    pfcModels,
    getAllPFCModel,
    insertNewPFCModel,
    deletePFCModel

} from "@/hooks/useHome"
import { ElNotification } from 'element-plus'
import LaminationProcess from "@/interfaces/LaminationProcess"
import { insertPFCLaminationProcess, deletePFCLaminationProcessByModelID } from "@/hooks/PFC/useLaminationProcess"
import { insertPFCMaterialDescription, deletePFCMaterialDescriptionByModelID } from "@/hooks/PFC/useMaterialDescripton"
import { insertPFCAdhesiveType, deletePFCAdhesiveTypeByModelID } from "@/hooks/PFC/useAdhesiveType"
import { insertPFCAdhesiveOtherType, deletePFCAdhesiveOtherTypeByModelID } from "@/hooks/PFC/useAdhesiveOtherType"
import { insertPFCRoll, deletePFCRollByModelID } from "@/hooks/PFC/useRoll"
import { loadExampleExcelFile, exportToExcel, loadFileExcel } from "@/utils/PFC/ExcelFunction"
import { optionConverse, optionIDS, optionModelType } from "@/utils/PFC/CoverSheet"
import PageSetup from '@/interfaces/PageSetup';
import { insertPFCPageSetup, deletePFCPageSetupByModelID, getDataPageSetup } from "@/hooks/PFC/usePageSetup"

const router = useRouter();
const loading = ref(null);
const search = ref('')
const dialogFormVisible = ref(false)

const filterTableData = computed(() => {
    if (!pfcModels.value || pfcModels.value.length === 0) {
        return [];
    }
    return pfcModels.value.filter(
        (data) =>
            !search.value ||
            data.ModelName.toLowerCase().includes(search.value.toLowerCase())
    );
});

const model = reactive<Model>({
    ModelType: "",
    ModelName: "",
    MaterialNumber: "",
    SizeRange: "",
    ModelID: "",
    ColorWayID: "",
    BOMID: "",
    Date: "",
    LastCode: "",
    ToolCode: "",
    PatternFileName: "",
    FirstSource: "",
    MedialSideView: "",
    LateralSideView: "",
    BottomView: "",
    FrontView: "",
    HeelView: "",
    KeyManufacturingProcesses: "",
    IDS: "",
    Converse: "",
    MedialSideViewV1: "",
    LateralSideViewV1: "",
    BottomViewV1: "",
    FrontViewV1: "",
    HeelViewV1: "",
});
const IDS = ref('')
const ModelType = ref('PRODUCTION CONFIRMATION')
const Converse = ref('CONVERSE PE')


onMounted(async () => {
    showLoading();
    await getAllPFCModel();
    hideLoading()
});

const showLoading = (text = 'Loading...') => {
    loading.value = ElLoading.service({
        lock: true,
        text,
        background: 'rgba(0, 0, 0, 0.7)',
    });
};

const showInsertExcelLoading = (text = 'Inserting data to excel...') => {
    loading.value = ElLoading.service({
        lock: true,
        text,
        background: 'rgba(0, 0, 0, 0.7)',
    });
};

const showExportExcelLoading = (text = 'Exporting data to excel...') => {
    loading.value = ElLoading.service({
        lock: true,
        text,
        background: 'rgba(0, 0, 0, 0.7)',
    });
};

const hideLoading = () => {
    if (loading.value) {
        loading.value.close();
        loading.value = null;
    }
};

const actionExport = async (index, row) => {
    try {
        showInsertExcelLoading();
        const { res: resPageSetup, error: _errResPageSetup } = await getDataPageSetup(row)
        await loadExampleExcelFile(row, resPageSetup.data.data);
        hideLoading()
        showExportExcelLoading()
        await exportToExcel();
        hideLoading();
    } catch (err) {
        error(err.message);
        hideLoading();
    }
};

const actionEdit = async (row) => {
    localStorage.setItem("selectedRow", JSON.stringify(row));
    router.push("/PFCDetail");
};

const success = (message) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}

const error = (err) => {
    ElNotification({
        title: 'Error',
        message: err,
        type: 'error',
    })
}

const info = (message) => {
    ElNotification({
        title: 'Info',
        message: message,
        type: 'info',
    })
}

const confirmInsertNewPFCModel = async () => {
    model.IDS = IDS.value
    model.ModelType = ModelType.value
    model.Converse = Converse.value
    const clonedModel = JSON.parse(JSON.stringify(model));
    dialogFormVisible.value = false
    showLoading();

    try {
        const { res: _resInsertNewPFCModel, err: _errInsertNewPFCModel } = await insertNewPFCModel(clonedModel)

        const pageSetup: PageSetup = {
            PageSetupID: "",
            ModelType: clonedModel.ModelType,
            ModelName: clonedModel.ModelName,
            MaterialNumber: clonedModel.MaterialNumber,
            LeftSelectionHeader: "NIKE-CONVERSE, INC. Confidential",
            RightSelectionHeader: "Ver.16.0\nPB: 1-0"
        }

        await insertPFCPageSetup(pageSetup)

        const laminationProcess: LaminationProcess = {
            LaminationProcessID: "",
            ModelType: clonedModel.ModelType,
            ModelName: clonedModel.ModelName,
            MaterialNumber: clonedModel.MaterialNumber,
            ComponentName: "",
            Vendor: "",
            MaterialDescriptions: [],
            AdhesiveType: [],
            AdhesiveOtherType: [],
            Rolls: [],
            Winding: "",
            Cooling: "",
            EndStep: "",
        }

        const { res: laminationProcessID, err: _errInsertPFCLaminationProcess } = await insertPFCLaminationProcess(laminationProcess)

        laminationProcess.MaterialDescriptions = [
            {
                MaterialDescriptionID: "",
                LaminationProcessID: laminationProcessID,
                Name: "",
                Mat: "",
            },
            {
                MaterialDescriptionID: "",
                LaminationProcessID: laminationProcessID,
                Name: "",
                Mat: "",
            }
        ]

        laminationProcess.MaterialDescriptions.forEach(async (item, _) => {
            await insertPFCMaterialDescription(item)
        });

        laminationProcess.AdhesiveType = [
            {
                AdhesiveTypeID: "",
                LaminationProcessID: laminationProcessID,
                Type: "",
                Name: "",
                Vendor: "",
                Thickness: "",
                MeltingPoint: "",
            }
        ]
        laminationProcess.AdhesiveType.forEach(async (item, _) => {
            await insertPFCAdhesiveType(item)
        });

        laminationProcess.AdhesiveOtherType = [
            {
                AdhesiveOtherTypeID: "",
                LaminationProcessID: laminationProcessID,
                Name: "",
                Description: "",
            }
        ]
        laminationProcess.AdhesiveOtherType.forEach(async (item, _) => {
            await insertPFCAdhesiveOtherType(item)
        });

        laminationProcess.Rolls = [
            {
                RollID: "",
                LaminationProcessID: laminationProcessID,
                Temp: "",
                RollSize: "",
                Time: "",
            },
            {
                RollID: "",
                LaminationProcessID: laminationProcessID,
                Temp: "",
                RollSize: "",
                Time: "",
            }
        ]
        laminationProcess.Rolls.forEach(async (item, _) => {
            await insertPFCRoll(item)
        });
    } catch (e) {
        hideLoading()
        error(e.Error());
        return
    }

    await getAllPFCModel();
    hideLoading()
    success("Add new PFC Model successfully!")
};

const confirmDeletePFCModel = async (model) => {
    // showLoading();
    // try {
    //     await deletePFCPageSetupByModelID(model)
    //     await deletePFCRollByModelID(model)
    //     await deletePFCAdhesiveOtherTypeByModelID(model)
    //     await deletePFCAdhesiveTypeByModelID(model)
    //     await deletePFCMaterialDescriptionByModelID(model)
    //     await deletePFCLaminationProcessByModelID(model)
    //     await deletePFCModel(model)
    // } catch (e) {
    //     console.log(e)
    //     hideLoading()
    //     error(e);
    //     return
    // }

    // await getAllPFCModel();
    // hideLoading()
    // success(`Delete PFC Model: "${model.ModelName}" successfully!`)
}

const cancelForm = () => {
    dialogFormVisible.value = false;
    clearDataForm();
}

const clearDataForm = () => {
    Object.assign(model, {
        ModelType: "",
        ModelName: "",
        MaterialNumber: "",
        SizeRange: "",
        ModelID: "",
        ColorWayID: "",
        BOMID: "",
        Date: "",
        LastCode: "",
        ToolCode: "",
        PatternFileName: "",
        FirstSource: "",
        MedialSideView: "",
        LateralSideView: "",
        BottomView: "",
        FrontView: "",
        HeelView: "",
        KeyManufacturingProcesses: "",
        IDS: "",
        Converse: ""
    });
}

const messageBoxWarringDeletePFCModel = (row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the model name: "${row.ModelName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            await confirmDeletePFCModel(row);
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

</script>


<style lang="css" scoped>
.container {
    margin-top: -20px;
}

.btn-add {
    margin-bottom: 10px;
}

.feature {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.feature>* {
    padding: 10px;
}

.feature {
    justify-content: center;
    align-items: center;
}
</style>