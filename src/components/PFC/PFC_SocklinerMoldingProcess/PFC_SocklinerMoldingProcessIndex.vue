<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">SOCKLINER MOLDING PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewSocklinerMoldingProcess">
                    ADD NEW SOCKLINER MOLDING PROCESS
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
                        <el-button size="small" @click="btnUpdatePFCSocklinerMoldingProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCSocklinerMoldingProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCSocklinerMoldingProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcSocklinerMoldingProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcSocklinerMoldingProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcSocklinerMoldingProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcSocklinerMoldingProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcSocklinerMoldingProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcSocklinerMoldingProcess.Title" />
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
                ITEM SOCKLINER MOLDING PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewSocklinerMoldingProcess">
            ADD NEW ITEM SOCKLINER MOLDING PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="SOCKLINER MOLDING PROCESS" width="500">
                    <template #default="{ row }">
                        {{ pfcSocklinerMoldingProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="RawMaterialName" label="RawMaterialName" />
                <el-table-column prop="Vendor" label="Vendor" width="150" />
                <el-table-column align="right" width="150">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewSocklinerMoldingProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewSocklinerMoldingProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="85vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
            <el-form style="width: 60vw" :model="pfcItemSocklinerMoldingProcess" label-width="auto" label-position="right"
                size="default">

                <el-form-item label="Raw Material: ">
                    <el-input type="textarea" v-model="pfcItemSocklinerMoldingProcess.RawMaterialName" />
                </el-form-item>
                <el-form-item label="Vendor: ">
                    <el-input v-model="pfcItemSocklinerMoldingProcess.Vendor" />
                </el-form-item>
                <el-form-item label=" ">
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
                                <el-table-column align="center" prop="arrComponent.Chemical" label="Chemical 化品 Hóa chất ">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingChemical" @click="enableEdit(row, 'Chemical')"
                                            style="min-height: 20px;">
                                            {{ row.Chemical }}
                                        </div>
                                        <el-input v-else v-model="row.Chemical" @blur="disableEdit(row, 'Chemical')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Temp" label="Temp℃ 温度 Nhiệt độ">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTemp" @click="enableEdit(row, 'Chemical')"
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
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col>
                        <el-input type="textarea" v-model="pfcItemSocklinerMoldingProcess.Remarks" class="remark-input"
                            :autosize="{ minRows: 1, maxRows: 10 }">
                        </el-input>

                    </el-col>
                </el-form-item>
            </el-form>
            <div class="layout-container">
                <div class="header-top">
                    <div class="remarks-col">
                        <strong>Remarks 备注 Ghi chú</strong>
                    </div>
                    <div class="size-col">
                        <div class="size-header">Size</div>
                    </div>
                    <div class="size-col">
                        <div class="size-header">Model

                        </div>
                    </div>
                </div>
                <div class="content-main" style="display: flex; justify-content:flex-end;">
                    <div></div>
                    <div>
                        <el-input v-model="pfcItemSocklinerMoldingProcess.Model" class="size-input"
                            style="width: 120px; text-align: center;">
                        </el-input>
                    </div>
                    <div>
                        <el-input v-model="pfcItemSocklinerMoldingProcess.Size" class="size-input" style="width: 120px; ">
                        </el-input>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemSocklinerMoldingProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemSocklinerMoldingProcess, deletePFCSocklinerMoldingProcess, getPFCItemSocklinerMoldingProcess, getPFCSocklinerMoldingProcessByModelID, insertItemPFCSocklinerMoldingProcess, insertPFCSocklinerMoldingProcess, updatePFCItemSocklinerMoldingProcess, updatePFCSocklinerMoldingProcess } from '@/hooks/PFC/useSocklinerMoldingProcess';
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
    (arrItemSocklinerMoldingProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.RawMaterialName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrComponent = ref([]);
arrComponent.value = Array.from({ length: 10 }, () => ({}));
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW SOCKLINER MOLDING PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM SOCKLINER MOLDING PROCESS")
const pfcSocklinerMoldingProcess = ref({} as Record<string, any>)
const pfcItemSocklinerMoldingProcess = ref({} as Record<string, any>)
const arrItemSocklinerMoldingProcess = ref([]);

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
    const { res, _ } = await getPFCSocklinerMoldingProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewSocklinerMoldingProcess = () => {
    titleDialogForm1.value = "ADD NEW SOCKLINER MOLDING PROCESS"
    pfcSocklinerMoldingProcess.value = {};
    pfcSocklinerMoldingProcess.value.ModelType = pfcModel.value.ModelType
    pfcSocklinerMoldingProcess.value.ModelName = pfcModel.value.ModelName
    pfcSocklinerMoldingProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcSocklinerMoldingProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW SOCKLINER MOLDING PROCESS") {
        try {
            await insertPFCSocklinerMoldingProcess(pfcSocklinerMoldingProcess.value)
            success("Insert new SOCKLINER MOLDING PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE SOCKLINER MOLDING PROCESS") {
        try {
            await updatePFCSocklinerMoldingProcess(pfcSocklinerMoldingProcess.value)
            success("Update SOCKLINER MOLDING PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCSocklinerMoldingProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemSocklinerMoldingProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCSocklinerMoldingProcess(row);
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

const btnUpdatePFCSocklinerMoldingProcess = async (index: number, row) => {
    pfcSocklinerMoldingProcess.value = {};
    pfcSocklinerMoldingProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE SOCKLINER MOLDING PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCSocklinerMoldingProcess = async (index: number, row) => {
    showLoading();
    pfcSocklinerMoldingProcess.value = {};
    pfcSocklinerMoldingProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemSocklinerMoldingProcess(pfcSocklinerMoldingProcess.value)
    arrItemSocklinerMoldingProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcSocklinerMoldingProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewSocklinerMoldingProcess = () => {
    titleDialogForm2.value = "ADD NEW ITEM SOCKLINER MOLDING PROCESS";
    pfcItemSocklinerMoldingProcess.value = {};
    pfcItemSocklinerMoldingProcess.value.SocklinerMoldingProcessID = pfcSocklinerMoldingProcess.value.SocklinerMoldingProcessID;

    arrComponent.value = Array.from({ length: 10 }, (_, i) => ({
        No: i + 1,
        Process: '',
        Chemical: '',
        Temp: '',
        Time: '',
        Pressure: ''
    }));

    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;

    dialogForm3Visible.value = true;
};


const btnEditItemNewSocklinerMoldingProcess = async (index: number, row) => {
    pfcItemSocklinerMoldingProcess.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.Remarks.toString();

    try {
        arrComponent.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 10 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 10 }, () => ({}));
    }
    // console.log(pfcItemSocklinerMoldingProcess.value)
    imageUrl_Content.value = getURLImage(row.RemarksImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM SOCKLINER MOLDING PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewSocklinerMoldingProcess = async (index: number, row) => {
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
            await deletePFCItemSocklinerMoldingProcess(row);
            const { res, _ } = await getPFCItemSocklinerMoldingProcess(pfcSocklinerMoldingProcess.value)
            arrItemSocklinerMoldingProcess.value = res.data.data;
            success("Delete PFC Item SOCKLINER MOLDING PROCESS successfully!")
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
    row.editingChemical = false;
    row.editingTemp = false;
    row.editingWB = false;
    row.editingTime = false;
    row.editingPressure = false;
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
        row.editingTime = false;
        row.editingPressure = false;
        row.editingChemical = false;
        row.editingTemp = false;
        row.editingWB = false;
        row.editingPressure = false;
    });

};

const btnConfirmItemSocklinerMoldingProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    if (!Array.isArray(arrComponent.value) || arrComponent.value.length === 0) {
        alert("Danh sách arrComponent không hợp lệ hoặc trống!");
        return;
    }

    const itemSocklinerMoldingProcess = {
        ItemSocklinerMoldingProcessID: pfcItemSocklinerMoldingProcess.value.ItemSocklinerMoldingProcessID,
        SocklinerMoldingProcessID: pfcItemSocklinerMoldingProcess.value.SocklinerMoldingProcessID,
        RawMaterialName: pfcItemSocklinerMoldingProcess.value.RawMaterialName,
        Vendor: pfcItemSocklinerMoldingProcess.value.Vendor,
        TableRow1: JSON.stringify(arrComponent.value),
        Remarks: pfcItemSocklinerMoldingProcess.value.Remarks,
        Size: pfcItemSocklinerMoldingProcess.value.Size,
        Model: pfcItemSocklinerMoldingProcess.value.Model,
    };
    // console.log(itemSocklinerMoldingProcess)
    if (titleDialogForm2.value === "ADD NEW ITEM SOCKLINER MOLDING PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemSocklinerMoldingProcess.Remarks = res
            }
            await insertItemPFCSocklinerMoldingProcess(itemSocklinerMoldingProcess);
            const { res, _ } = await getPFCItemSocklinerMoldingProcess(pfcSocklinerMoldingProcess.value)
            arrItemSocklinerMoldingProcess.value = res.data.data;
            success("Insert new Item SOCKLINER MOLDING PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM SOCKLINER MOLDING PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemSocklinerMoldingProcess.Remarks = res
            } else {
                if (oldImageUrl_Content.value && itemSocklinerMoldingProcess.Remarks === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemSocklinerMoldingProcess(itemSocklinerMoldingProcess)
            const { res, _ } = await getPFCItemSocklinerMoldingProcess(pfcSocklinerMoldingProcess.value)
            arrItemSocklinerMoldingProcess.value = res.data.data;
            success("Insert new Item SOCKLINER MOLDING PROCESS successfully!")
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
    border-radius: 4px;
    width: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 14px;
    height: 900px;
}

.header-top {
    display: flex;
    border-bottom: 1px solid #ebeef5;
}


.size-col {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #ebeef5;
}

.size-header {
    font-weight: bold;
    margin-bottom: 8px;
}

.size-input {
    width: 110px;
    /* height: 60px; */
    /* resize: none; */
    overflow-wrap: break-word;
    display: block;
    margin-left: auto;
}


.content-main {
    border-bottom: 1px solid #ebeef5;
    min-height: 278px;
    /* padding: 8px; */
}

.remark-area {
    padding: 8px;
    border-bottom: 1px solid #ebeef5;
}

.remark-input {
    width: 100%;
    margin-top: 8px;
    resize: none;
}

.remarks-col {
    flex: 1;
    border-right: 1px solid #ebeef5;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 60px;
}

:deep(.size-input .el-input__inner) {
    text-align: center;
}
</style>