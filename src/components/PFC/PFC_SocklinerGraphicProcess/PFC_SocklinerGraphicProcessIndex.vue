<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">SOCKLINER GRAPHIC PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewSocklinerGraphicProcess">
                    ADD NEW SOCKLINER GRAPHIC PROCESS
                </el-button>

            </div>
            <div style="margin-right:35px">
                <el-button type="success" circle style="margin-right: 5px;">
                    <img src="@/assets/icon/export_excel.png" alt="export_excel" style="width: 16px; height: 16px;" />
                </el-button>
                <el-button type="danger" circle style="margin-right: 5px;">
                    <img src="@/assets/icon/export_pdf.png" alt="export_pdf" style="width: 16px; height: 16px;" />
                </el-button>
                <el-button type="primary" circle>
                    <img src="@/assets/icon/saving.png" alt="saving" style="width: 16px; height: 16px;" />
                </el-button>
            </div>
        </div>
        <div style="margin: 20px;">
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="100" />
                <el-table-column prop="ModelType" label="Model Type" width="220" />
                <el-table-column prop="ModelName" label="Model Name" width="220" />
                <el-table-column prop="MaterialNumber" label="Material Number" width="180" />
                <el-table-column prop="Title" label="Title" />
                <el-table-column align="right" width="180">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnUpdatePFCSocklinerGraphicProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCSocklinerGraphicProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCSocklinerGraphicProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-col>

    <!-- DIA LOG -->
    <el-dialog v-model="dialogForm1Visible" width="35vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm1 }}
            </div>
        </template>
        <el-form style="width: 30vw" :model="pfcSocklinerGraphicProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcSocklinerGraphicProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcSocklinerGraphicProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcSocklinerGraphicProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcSocklinerGraphicProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcSocklinerGraphicProcess.Title" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm1Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirm">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogForm2Visible" width="80vw" :close-on-click-modal="false" @close="dialogForm2Visible = false"
        style="min-height: 60vh;">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                ITEM SOCKLINER GRAPHIC PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewSocklinerGraphicProcess">
            ADD NEW ITEM SOCKLINER GRAPHIC PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="SOCKLINER GRAPHIC PROCESS" width="500">
                    <template #default="{ row }">
                        {{ pfcSocklinerGraphicProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="ComponentName" label="Component" />
                <el-table-column prop="SocklinerLogo" label="Sockliner Logo" />

                <el-table-column prop="Vendor" label="Vendor" width="150" />
                <el-table-column align="right" width="150">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewSocklinerGraphicProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewSocklinerGraphicProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="95vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
            <el-form style="width: 60vw" :model="pfcItemSocklinerGraphicProcess" label-width="auto" label-position="right"
                size="default">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 30px;">
                    <el-form-item label="Component Name 部件名称Tên chi tiết : ">
                        <el-input v-model="pfcItemSocklinerGraphicProcess.ComponentName" style="width: 220px;" />
                    </el-form-item>
                    <el-form-item label=" Sockliner Logo 鞋垫Logo Logo đế trung: ">
                        <el-input v-model="pfcItemSocklinerGraphicProcess.SocklinerLogo" style="width: 220px;" />
                    </el-form-item>
                    <el-form-item label="VENDOR 厂商 Nhà cung ứng : ">
                        <el-input v-model="pfcItemSocklinerGraphicProcess.Vendor" style="width: 220px;" />
                    </el-form-item>
                </div>
                <el-form-item label="">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside" :data="arrComponent" :row-style="{ height: '30px' }"
                            border>
                            <el-table-column align="center" prop="arrComponent.No" label="No" width="60">
                                <template #default="{ row }">
                                    <div v-if="!row.editingNo" @click="enableEdit(row, 'No')" style="min-height: 20px;">
                                        {{ row.No }}
                                    </div>
                                    <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="arrComponent.Process" label="Process 工段 Công đoạn"
                                width="200">
                                <template #default="{ row }">
                                    <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                        style="min-height: 20px; text-align: left;">
                                        {{ row.Process }}
                                    </div>
                                    <el-input v-else v-model="row.Process" @blur="disableEdit(row, 'Process')" />
                                </template>
                            </el-table-column>
                            <el-table-column label="Process details 明细流程Chi tiết lưu trình" align="center">
                                <el-table-column align="center" prop="arrComponent.CurrentIntensity"
                                    label="Current Intensity 电流 Cường độ dòng điện">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingCurrentIntensity"
                                            @click="enableEdit(row, 'CurrentIntensity')" style="min-height: 20px;">
                                            {{ row.CurrentIntensity }}
                                        </div>
                                        <el-input v-else v-model="row.CurrentIntensity"
                                            @blur="disableEdit(row, 'CurrentIntensity')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Temp" label="Temp℃ 温度 Nhiệt độ">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTemp" @click="enableEdit(row, 'CurrentIntensity')"
                                            style="min-height: 20px;">
                                            {{ row.Temp }}
                                        </div>
                                        <el-input v-else v-model="row.Temp" @blur="disableEdit(row, 'Temp')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrComponent.Time" label="Time 时间 Thời gian">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')"
                                            style="min-height: 20px;">
                                            {{ row.Time }}
                                        </div>
                                        <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Pressure" label="Pressure 压力 Lực ép">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingPressure" @click="enableEdit(row, 'Pressure')"
                                            style="min-height: 20px;">
                                            {{ row.Pressure }}
                                        </div>
                                        <el-input v-else v-model="row.Pressure" @blur="disableEdit(row, 'Pressure')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Comments" label="Comments 备注 Ghi chú">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingComments" @click="enableEdit(row, 'Comments')"
                                            style="min-height: 20px;">
                                            {{ row.Comments }}
                                        </div>
                                        <el-input v-else v-model="row.Comments" @blur="disableEdit(row, 'Comments')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-col>

                </el-form-item>
            </el-form>
            <div class="layout-container" style="width: 30vw">
                <div style="display: flex; justify-content: space-between; border: 1px solid #dcdfe6;">
                    <div class="remarks_title">Remarks 备注 Ghi chú</div>
                    <div class="header-top">
                        <el-table v-click-outside="handleClickOutside2" :data="arrModelSize" :row-style="{ height: '30px' }"
                            border>
                            <el-table-column align="center" prop="arrModelSize.Model" label="Model" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingModel" @click="enableEdit2(row, 'Model')"
                                        style="min-height: 20px;">
                                        {{ row.Model }}
                                    </div>
                                    <el-input v-else v-model="row.Model" @blur="disableEdit2(row, 'Model')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrModelSize.Size" label="Size" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingSize" @click="enableEdit2(row, 'Size')"
                                        style="min-height: 20px;">
                                        {{ row.Size }}
                                    </div>
                                    <el-input v-else v-model="row.Size" @blur="disableEdit2(row, 'Size')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrModelSize.A" label="A" width="70">
                                <template #default="{ row }">
                                    <div v-if="!row.editingA" @click="enableEdit2(row, 'A')" style="min-height: 20px;">
                                        {{ row.A }}
                                    </div>
                                    <el-input v-else v-model="row.A" @blur="disableEdit2(row, 'A')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrModelSize.B" label="B" width="70">
                                <template #default="{ row }">
                                    <div v-if="!row.editingB" @click="enableEdit2(row, 'B')" style="min-height: 20px;">
                                        {{ row.B }}
                                    </div>
                                    <el-input v-else v-model="row.B" @blur="disableEdit2(row, 'B')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrModelSize.C" label="C" width="70">
                                <template #default="{ row }">
                                    <div v-if="!row.editingC" @click="enableEdit2(row, 'C')" style="min-height: 20px;">
                                        {{ row.C }}
                                    </div>
                                    <el-input v-else v-model="row.C" @blur="disableEdit2(row, 'C')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="body"></div>
                <div>
                    <el-input type="textarea" v-model="pfcItemSocklinerGraphicProcess.Remarks" class="remark-input"
                        :autosize="{ minRows: 1, maxRows: 10 }">
                    </el-input>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemSocklinerGraphicProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemSocklinerGraphicProcess, deletePFCSocklinerGraphicProcess, getPFCItemSocklinerGraphicProcess, getPFCSocklinerGraphicProcessByModelID, insertItemPFCSocklinerGraphicProcess, insertPFCSocklinerGraphicProcess, updatePFCItemSocklinerGraphicProcess, updatePFCSocklinerGraphicProcess } from '@/hooks/PFC/useSocklinerGraphicProcess';
import { deleteFilePFCModelFromFolderPFCModel, uploadFilePFCModelFromFolderPFCModel } from '@/hooks/PFC/usePFC';
import { getURLImage } from '@/hooks/useHome';
import { usePFCStore } from '@/stores/PFCStore';
import { hideLoading, showLoading } from '@/utils/LoadingView';
import { error, info, success } from '@/utils/NotificationsView';
import { ElMessageBox, UploadProps } from 'element-plus';
import { computed, onMounted, ref, getCurrentInstance } from 'vue';

const search = ref('')
const search1 = ref('')
const pfcModel = ref({} as Record<string, any>);
const store = usePFCStore();

const filterTableData = computed(() =>
    (tableData.value || []).filter(
        (data) =>
            !search.value ||
            data.Title.toLowerCase().includes(search.value.toLowerCase())
    )
);

const filterTableData1 = computed(() =>
    (arrItemSocklinerGraphicProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.RawMaterialName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrComponent = ref([]);
const arrModelSize = ref([]);
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW SOCKLINER GRAPHIC PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM SOCKLINER GRAPHIC PROCESS")
const pfcSocklinerGraphicProcess = ref({} as Record<string, any>)
const pfcItemSocklinerGraphicProcess = ref({} as Record<string, any>)
const arrItemSocklinerGraphicProcess = ref([]);

onMounted(async () => {
    showLoading();
    const storedRow = localStorage.getItem("selectedRow");
    if (storedRow) {
        Object.assign(pfcModel.value, JSON.parse(storedRow) || store.selectedRow);
    }
    try {
        await reloadData()
    } catch (err) {
        console.error(err)
    }
    hideLoading();
})

const reloadData = async () => {
    const { res, _ } = await getPFCSocklinerGraphicProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewSocklinerGraphicProcess = () => {
    titleDialogForm1.value = "ADD NEW SOCKLINER GRAPHIC PROCESS"
    pfcSocklinerGraphicProcess.value = {};
    pfcSocklinerGraphicProcess.value.ModelType = pfcModel.value.ModelType
    pfcSocklinerGraphicProcess.value.ModelName = pfcModel.value.ModelName
    pfcSocklinerGraphicProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcSocklinerGraphicProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW SOCKLINER GRAPHIC PROCESS") {
        try {
            await insertPFCSocklinerGraphicProcess(pfcSocklinerGraphicProcess.value)
            success("Insert new SOCKLINER GRAPHIC PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE SOCKLINER GRAPHIC PROCESS") {
        try {
            await updatePFCSocklinerGraphicProcess(pfcSocklinerGraphicProcess.value)
            success("Update SOCKLINER GRAPHIC PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCSocklinerGraphicProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemSocklinerGraphicProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCSocklinerGraphicProcess(row);
                await reloadData();
                hideLoading();
            } else {
                error("Please delete Item Perforation Specification!");
            }

        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const btnUpdatePFCSocklinerGraphicProcess = async (index: number, row) => {
    pfcSocklinerGraphicProcess.value = {};
    pfcSocklinerGraphicProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE SOCKLINER GRAPHIC PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCSocklinerGraphicProcess = async (index: number, row) => {
    showLoading();
    pfcSocklinerGraphicProcess.value = {};
    pfcSocklinerGraphicProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemSocklinerGraphicProcess(pfcSocklinerGraphicProcess.value)
    arrItemSocklinerGraphicProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcSocklinerGraphicProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewSocklinerGraphicProcess = () => {
    titleDialogForm2.value = "ADD NEW ITEM SOCKLINER GRAPHIC PROCESS";
    pfcItemSocklinerGraphicProcess.value = {};
    pfcItemSocklinerGraphicProcess.value.SocklinerGraphicProcessID = pfcSocklinerGraphicProcess.value.SocklinerGraphicProcessID;

    arrComponent.value = Array.from({ length: 13 }, (_, i) => ({
        No: i + 1,
        Process: '',
        CurrentIntensity: '',
        Temp: '',
        Time: '',
        Pressure: '',
        Comments: '',
    }));

    arrModelSize.value = Array.from({ length: 1 }, (_, i) => ({
        Model: '',
        Size: '',
        A: '',
        B: '',
        C: '',
    }));

    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;

    dialogForm3Visible.value = true;
};


const btnEditItemNewSocklinerGraphicProcess = async (index: number, row) => {
    pfcItemSocklinerGraphicProcess.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.Remarks.toString();

    try {
        arrComponent.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 13 }, () => ({}));
        arrModelSize.value = row.ModelSize ? JSON.parse(row.ModelSize) : Array.from({ length: 1 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 13 }, () => ({}));
        arrModelSize.value = Array.from({ length: 1 }, () => ({}));
    }
    // console.log(pfcItemSocklinerGraphicProcess.value)
    imageUrl_Content.value = getURLImage(row.RemarksImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM SOCKLINER GRAPHIC PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewSocklinerGraphicProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.RawMaterialName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            if (row.RemarksImages) {
                await deleteFilePFCModelFromFolderPFCModel(row.RemarksImages, pfcModel.value)
            }
            await deletePFCItemSocklinerGraphicProcess(row);
            const { res, _ } = await getPFCItemSocklinerGraphicProcess(pfcSocklinerGraphicProcess.value)
            arrItemSocklinerGraphicProcess.value = res.data.data;
            success("Delete PFC Item SOCKLINER GRAPHIC PROCESS successfully!")
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const formData_Content = new FormData();
const imageUrl_Content = ref('')
const oldImageUrl_Content = ref('')


const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const enableEdit = (row, field) => {
    row.editingNo = false;
    row.editingProcess = false;
    row.editingTemp = false;
    row.editingCurrentIntensity = false;
    row.editingTemp = false;
    row.editingTime = false;
    row.editingPressure = false;
    row.editingComments = false;
    row[`editing${capitalize(field)}`] = true;
};
const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside = (event) => {
    arrComponent.value.forEach((row) => {
        row.editingNo = false;
        row.editingProcess = false;
        row.editingTemp = false;
        row.editingCurrentIntensity = false;
        row.editingTemp = false;
        row.editingTime = false;
        row.editingPressure = false;
        row.editingComments = false;
    });
};


const enableEdit2 = (row, field) => {
    row.editingModel = false;
    row.editingSize = false;
    row.editingA = false;
    row.editingB = false;
    row.editingC = false;
    row[`editing${capitalize(field)}`] = true;
};
const disableEdit2 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside2 = (event) => {
    arrModelSize.value.forEach((row) => {
        row.editingModel = false;
        row.editingSize = false;
        row.editingA = false;
        row.editingB = false;
        row.editingC = false;
    });
};

const btnConfirmItemSocklinerGraphicProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    if (!Array.isArray(arrComponent.value) || arrComponent.value.length === 0) {
        alert("Danh sách arrComponent không hợp lệ hoặc trống!");
        return;
    }
    if (!Array.isArray(arrModelSize.value) || arrModelSize.value.length === 0) {
        alert("Danh sách arrComponent không hợp lệ hoặc trống!");
        return;
    }

    const itemSocklinerGraphicProcess = {
        ItemSocklinerGraphicProcessID: pfcItemSocklinerGraphicProcess.value.ItemSocklinerGraphicProcessID,
        SocklinerGraphicProcessID: pfcItemSocklinerGraphicProcess.value.SocklinerGraphicProcessID,
        ComponentName: pfcItemSocklinerGraphicProcess.value.ComponentName,
        SocklinerLogo: pfcItemSocklinerGraphicProcess.value.SocklinerLogo,
        Vendor: pfcItemSocklinerGraphicProcess.value.Vendor,
        TableRow1: JSON.stringify(arrComponent.value),
        Remarks: pfcItemSocklinerGraphicProcess.value.Remarks,
        ModelSize: JSON.stringify(arrModelSize.value),
    };
    // console.log(itemSocklinerGraphicProcess)
    if (titleDialogForm2.value === "ADD NEW ITEM SOCKLINER GRAPHIC PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemSocklinerGraphicProcess.Remarks = res
            }
            await insertItemPFCSocklinerGraphicProcess(itemSocklinerGraphicProcess);
            const { res, _ } = await getPFCItemSocklinerGraphicProcess(pfcSocklinerGraphicProcess.value)
            arrItemSocklinerGraphicProcess.value = res.data.data;
            success("Insert new Item SOCKLINER GRAPHIC PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM SOCKLINER GRAPHIC PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemSocklinerGraphicProcess.Remarks = res
            } else {
                if (oldImageUrl_Content.value && itemSocklinerGraphicProcess.Remarks === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemSocklinerGraphicProcess(itemSocklinerGraphicProcess)
            const { res, _ } = await getPFCItemSocklinerGraphicProcess(pfcSocklinerGraphicProcess.value)
            arrItemSocklinerGraphicProcess.value = res.data.data;
            success("Insert new Item SOCKLINER GRAPHIC PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style scoped>
.layout-container {
    border: 1px solid #dcdfe6;
    color: rgb(144, 147, 153);
    border-radius: 4px;
    width: 500px;
    margin: 0 auto;
    box-sizing: border-box;

    /* height: 900px; */
}

.remarks_title {
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: 14px;
    font-weight: 600;
}

.header-top {
    display: flex;
    /* border-bottom: 1px solid #ebeef5; */
}

.body {
    height: 300px;
}
</style>