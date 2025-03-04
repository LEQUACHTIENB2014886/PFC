<template>
    <div style="overflow: auto; height: 80vh; width: 100%;">
        <el-col :span="24" class="container">
            <el-row class="btn_save_container">
                <el-button type="primary" plain @click="update">UPDATE</el-button>
            </el-row>
            <el-row class="input_container">
                <el-form class="form_container" :model="laminationProcess" label-width="auto"
                    :label-position="labelPosition" :size="size">
                    <el-form-item label="Component Name:">
                        <el-input v-model="laminationProcess.ComponentName" style="max-width: 400px; width: 100%;" />
                    </el-form-item>
                    <el-form-item label="Vendor:">
                        <el-input v-model="laminationProcess.Vendor" style="max-width: 400px; width: 100%;" />
                    </el-form-item>
                    <el-form-item label="Material Description:">
                        <el-row>
                            <el-table :data="laminationProcess.MaterialDescriptions" style="width: 100%" border>
                                <el-table-column type="index" label="Index" width="100" />
                                <el-table-column label="Name 名称 Tên" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingName" @click="enableEdit(row, 'Name')"
                                            style="min-height: 20px;">
                                            {{ row.Name }}
                                        </div>
                                        <el-input v-else v-model="row.Name" @blur="disableEdit(row, 'Name')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Mat# (MCS#)" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingMat" @click="enableEdit(row, 'Mat')"
                                            style="min-height: 20px;">
                                            {{ row.Mat }}
                                        </div>
                                        <el-input v-else v-model="row.Mat" @blur="disableEdit(row, 'Mat')" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="Adhesive Type:">
                        <el-row>
                            <el-table :data="laminationProcess.AdhesiveType" style="width: 100%" border>
                                <el-table-column type="index" label="Index" width="100" />
                                <el-table-column label="Type 类型 Loại" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingType" @click="enableEdit(row, 'Type')"
                                            style="min-height: 20px;">
                                            {{ row.Type }}
                                        </div>
                                        <el-input v-else v-model="row.Type" @blur="disableEdit(row, 'Type')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Name 名称 Tên" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingName" @click="enableEdit(row, 'Name')"
                                            style="min-height: 20px;">
                                            {{ row.Name }}
                                        </div>
                                        <el-input v-else v-model="row.Name" @blur="disableEdit(row, 'Name')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Vendor 厂商 Nhà cung ứng" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingVendor" @click="enableEdit(row, 'Vendor')"
                                            style="min-height: 20px;">
                                            {{ row.Vendor }}
                                        </div>
                                        <el-input v-else v-model="row.Vendor" @blur="disableEdit(row, 'Vendor')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Thickness 厚度 Độ dày" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingThickness" @click="enableEdit(row, 'Thickness')"
                                            style="min-height: 20px;">
                                            {{ row.Thickness }}
                                        </div>
                                        <el-input v-else v-model="row.Thickness" @blur="disableEdit(row, 'Thickness')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Melting point 熔点 Điểm nóng chảy" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingMeltingPoint" @click="enableEdit(row, 'MeltingPoint')"
                                            style="min-height: 20px;">
                                            {{ row.MeltingPoint }}
                                        </div>
                                        <el-input v-else v-model="row.MeltingPoint"
                                            @blur="disableEdit(row, 'MeltingPoint')" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="Adhesive Other Type:">
                        <el-row>
                            <el-table :data="laminationProcess.AdhesiveOtherType" style="width: 100%" border>
                                <el-table-column type="index" label="Index" width="100" />
                                <el-table-column label="Name 名称 Tên" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingName" @click="enableEdit(row, 'Name')"
                                            style="min-height: 20px;">
                                            {{ row.Name }}
                                        </div>
                                        <el-input v-else v-model="row.Name" @blur="disableEdit(row, 'Name')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Description" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingDescription" @click="enableEdit(row, 'Description')"
                                            style="min-height: 20px;">
                                            {{ row.Description }}
                                        </div>
                                        <el-input v-else v-model="row.Description"
                                            @blur="disableEdit(row, 'Description')" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="Roll:">
                        <el-row>
                            <el-table :data="laminationProcess.Rolls" style="width: 100%" border>
                                <el-table-column type="index" label="Roll Index" width="100" />
                                <el-table-column label="Temp 温度 Nhiệt độ" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTemp" @click="enableEdit(row, 'Temp')"
                                            style="min-height: 20px;">
                                            {{ row.Temp }}
                                        </div>
                                        <el-input v-else v-model="row.Temp" @blur="disableEdit(row, 'Temp')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Roll Size 滚轮大小 Kích cở cuộn" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingRollSize" @click="enableEdit(row, 'RollSize')"
                                            style="min-height: 20px;">
                                            {{ row.RollSize }}
                                        </div>
                                        <el-input v-else v-model="row.RollSize" @blur="disableEdit(row, 'RollSize')" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="Time 时间 Thời gian" width="200">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')"
                                            style="min-height: 20px;">
                                            {{ row.Time }}
                                        </div>
                                        <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="Winding:">
                        <el-input v-model="laminationProcess.Winding" style="max-width: 400px; width: 100%;" />
                    </el-form-item>
                    <el-form-item label="Cooling:">
                        <el-input v-model="laminationProcess.Cooling" style="max-width: 400px; width: 100%;" />
                    </el-form-item>
                    <el-form-item label="End Step:">
                        <el-input v-model="laminationProcess.EndStep" style="max-width: 400px; width: 100%;" />
                    </el-form-item>
                </el-form>
            </el-row>
        </el-col>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { usePFCStore } from "@/stores/PFCStore";
import { type ComponentSize, type FormProps } from 'element-plus'
import {
    getDataLaminationProcess
} from "@/hooks/PFC/useLaminationProcess"
import LaminationProcess from '@/interfaces/LaminationProcess';
import Model from "@/interfaces/Model";
import { updatePFCLaminationProcess } from "@/hooks/PFC/useLaminationProcess"
import { updatePFCMaterialDescription } from "@/hooks/PFC/useMaterialDescripton"
import { updatePFCAdhesiveType } from "@/hooks/PFC/useAdhesiveType"
import { updatePFCAdhesiveOtherType } from "@/hooks/PFC/useAdhesiveOtherType"
import { updatePFCRoll } from "@/hooks/PFC/useRoll"
import { ElLoading } from "element-plus";
import { error, success } from '@/utils/NotificationsView'

const loading = ref(null);
const size = ref<ComponentSize>('default')
const labelPosition = ref<FormProps['labelPosition']>('right')
const store = usePFCStore();
const model = reactive<Model>({
    ModelID: "",
    ColorWayID: "",
    BOMID: "",
    Date: "",
    ModelName: "",
    MaterialNumber: "",
    SizeRange: "",
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
    ModelType: "",
    MedialSideViewV1: "",
    LateralSideViewV1: "",
    BottomViewV1: "",
    FrontViewV1: "",
    HeelViewV1: "",
});
const laminationProcess = reactive<LaminationProcess>({
    LaminationProcessID: "",
    ModelType: "",
    ModelName: "",
    MaterialNumber: "",
    ComponentName: "",
    Vendor: "",
    MaterialDescriptions: [],
    AdhesiveType: [],
    AdhesiveOtherType: [],
    Rolls: [],
    Winding: "",
    Cooling: "",
    EndStep: "",
})

const showLoading = (text = 'Loading...') => {
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

const enableEdit = (row: any, field: string) => {
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row: any, field: string) => {
    row[`editing${capitalize(field)}`] = false;
};

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

onMounted(async () => {
    showLoading()
    const storedRow = localStorage.getItem("selectedRow");
    if (storedRow) {
        Object.assign(model, JSON.parse(storedRow));
    } else {
        Object.assign(model, store.selectedRow);
    }

    try {
        const { res, _ } = await getDataLaminationProcess(model)
        Object.assign(laminationProcess, res.data.data);
    } catch (err) {
        console.error(err)
    }
    hideLoading()
})

const update = async () => {
    showLoading()
    try {
        laminationProcess.Rolls.forEach(async (item, _) => {
            await updatePFCRoll(item)
        });
        laminationProcess.AdhesiveOtherType.forEach(async (item, _) => {
            await updatePFCAdhesiveOtherType(item)
        });
        laminationProcess.AdhesiveType.forEach(async (item, _) => {
            await updatePFCAdhesiveType(item)
        });
        laminationProcess.MaterialDescriptions.forEach(async (item, _) => {
            await updatePFCMaterialDescription(item)
        });
        await updatePFCLaminationProcess(laminationProcess)
        success("Update successfully!")
    } catch (e) {
        console.error(e.Error())
        error(e.Error())
    }
    hideLoading()
}

</script>

<style lang="css" scoped>
.btn_save_container {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
}

.form_container {
    min-width: 30vw;
}

.material_container {
    border: 1px solid var(--el-border-color);
    border-radius: 4;

}
</style>