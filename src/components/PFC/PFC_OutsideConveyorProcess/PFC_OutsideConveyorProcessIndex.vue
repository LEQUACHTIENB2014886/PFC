<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">OUTSIDE CONVEYOR PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewOutsideConveyorProcess">
                    ADD NEW OUTSIDE CONVEYOR PROCESS
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
                        <el-button size="small" @click="btnUpdatePFCOutsideConveyorProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCOutsideConveyorProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCOutsideConveyorProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcOutsideConveyorProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcOutsideConveyorProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcOutsideConveyorProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcOutsideConveyorProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcOutsideConveyorProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcOutsideConveyorProcess.Title" />
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
                ITEM OUTSIDE CONVEYOR PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewOutsideConveyorProcess">
            ADD NEW ITEM OUTSIDE CONVEYOR PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="OUTSIDE CONVEYOR PROCESS" width="500">
                    <template #default="{ row }">
                        {{ pfcOutsideConveyorProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="ComponentName" label="Component" />
                <el-table-column prop="Material" label="Material" />

                <el-table-column prop="Vendor" label="Vendor" width="150" />
                <el-table-column align="right" width="150">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewOutsideConveyorProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewOutsideConveyorProcess(scope.$index, scope.row)"
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
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 30px; height: 50px;">
            <el-form-item label="Component Name 部件名称Tên chi tiết : ">
                <el-input v-model="pfcItemOutsideConveyorProcess.ComponentName" style="width: 300px;" />
            </el-form-item>
            <el-form-item label=" Sockliner Logo 鞋垫Logo Logo đế trung: ">
                <el-input v-model="pfcItemOutsideConveyorProcess.Material" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="VENDOR 厂商 Nhà cung ứng : ">
                <el-input v-model="pfcItemOutsideConveyorProcess.Vendor" style="width: 300px;" />
            </el-form-item>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <el-form style="width: 60vw" :model="pfcItemOutsideConveyorProcess" label-width="auto" label-position="right"
                size="default">
                <el-form-item label="">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside" :data="arrComponent" :row-style="{ height: '200px' }"
                            border>
                            <el-table-column align="center" prop="arrComponent.No" label="No" width="80">
                                <template #default="{ row }">
                                    <div v-if="!row.editingNo" @click="enableEdit(row, 'No')"
                                        style="height: 200px; display: flex; justify-content: center; align-items: center; overflow-y: auto;">
                                        {{ row.No }}
                                    </div>
                                    <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="arrComponent.Process" label="Process 工段 Công đoạn">
                                <template #default="{ row }">
                                    <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                        style="height: 200px; display: flex; justify-content: left; align-items: center; overflow-y: auto;">
                                        {{ row.Process }}
                                    </div>
                                    <el-input type="textarea" v-else v-model="row.Process"
                                        @blur="disableEdit(row, 'Process')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="arrComponent.Remarks" label=" Remarks 备注 Ghi chú ">
                                <template #default="{ row }">
                                    <div v-if="!row.editingRemarks" @click="enableEdit(row, 'Remarks')"
                                        style="height: 200px; display: flex; text-align: left; align-items: center; overflow-y: auto;">
                                        {{ row.Remarks }}
                                    </div>
                                    <el-input type="textarea" v-else v-model="row.Remarks"
                                        @blur="disableEdit(row, 'Remarks')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
            </el-form>
            <div style="width: 35vw;">
                <div class="pictures"
                    style="height: 40px; display:  flex; border: 1px solid #dcdfe6; color: rgb(144, 147, 153); font-weight: 600; justify-content: center; align-items: center;">
                    Pictures 图示Hình
                </div>
                <div class="images" style="height: 217px;border: 1px solid #dcdfe6;   "></div>
                <div class="images" style="height: 217px; border: 1px solid #dcdfe6;  "></div>
                <div class="images" style="height: 217px;border: 1px solid #dcdfe6;  "></div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemOutsideConveyorProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemOutsideConveyorProcess, deletePFCOutsideConveyorProcess, getPFCItemOutsideConveyorProcess, getPFCOutsideConveyorProcessByModelID, insertItemPFCOutsideConveyorProcess, insertPFCOutsideConveyorProcess, updatePFCItemOutsideConveyorProcess, updatePFCOutsideConveyorProcess } from '@/hooks/PFC/useOutsideConveyorProcess';
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
    (arrItemOutsideConveyorProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.RawMaterialName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrComponent = ref([]);
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW OUTSIDE CONVEYOR PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM OUTSIDE CONVEYOR PROCESS")
const pfcOutsideConveyorProcess = ref({} as Record<string, any>)
const pfcItemOutsideConveyorProcess = ref({} as Record<string, any>)
const arrItemOutsideConveyorProcess = ref([]);

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
    const { res, _ } = await getPFCOutsideConveyorProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewOutsideConveyorProcess = () => {
    titleDialogForm1.value = "ADD NEW OUTSIDE CONVEYOR PROCESS"
    pfcOutsideConveyorProcess.value = {};
    pfcOutsideConveyorProcess.value.ModelType = pfcModel.value.ModelType
    pfcOutsideConveyorProcess.value.ModelName = pfcModel.value.ModelName
    pfcOutsideConveyorProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcOutsideConveyorProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW OUTSIDE CONVEYOR PROCESS") {
        try {
            await insertPFCOutsideConveyorProcess(pfcOutsideConveyorProcess.value)
            success("Insert new OUTSIDE CONVEYOR PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE OUTSIDE CONVEYOR PROCESS") {
        try {
            await updatePFCOutsideConveyorProcess(pfcOutsideConveyorProcess.value)
            success("Update OUTSIDE CONVEYOR PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCOutsideConveyorProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemOutsideConveyorProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCOutsideConveyorProcess(row);
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

const btnUpdatePFCOutsideConveyorProcess = async (index: number, row) => {
    pfcOutsideConveyorProcess.value = {};
    pfcOutsideConveyorProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE OUTSIDE CONVEYOR PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCOutsideConveyorProcess = async (index: number, row) => {
    showLoading();
    pfcOutsideConveyorProcess.value = {};
    pfcOutsideConveyorProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemOutsideConveyorProcess(pfcOutsideConveyorProcess.value)
    arrItemOutsideConveyorProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcOutsideConveyorProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewOutsideConveyorProcess = () => {
    titleDialogForm2.value = "ADD NEW ITEM OUTSIDE CONVEYOR PROCESS";
    pfcItemOutsideConveyorProcess.value = {};
    pfcItemOutsideConveyorProcess.value.OutsideConveyorProcessID = pfcOutsideConveyorProcess.value.OutsideConveyorProcessID;

    arrComponent.value = Array.from({ length: 3 }, (_, i) => ({
        No: i + 1,
        Process: '',
        Remarks: '',
    }));

    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;

    dialogForm3Visible.value = true;
};


const btnEditItemNewOutsideConveyorProcess = async (index: number, row) => {
    pfcItemOutsideConveyorProcess.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Remarks.toString();

    try {
        arrComponent.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 3 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 3 }, () => ({}));
    }
    // console.log(pfcItemOutsideConveyorProcess.value)
    imageUrl_Content.value = getURLImage(row.RemarksImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM OUTSIDE CONVEYOR PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewOutsideConveyorProcess = async (index: number, row) => {
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
            await deletePFCItemOutsideConveyorProcess(row);
            const { res, _ } = await getPFCItemOutsideConveyorProcess(pfcOutsideConveyorProcess.value)
            arrItemOutsideConveyorProcess.value = res.data.data;
            success("Delete PFC Item OUTSIDE CONVEYOR PROCESS successfully!")
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
    row.editingRemarks = false;
    row[`editing${capitalize(field)}`] = true;
};
const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside = (event) => {
    arrComponent.value.forEach((row) => {
        row.editingNo = false;
        row.editingProcess = false;
        row.editingRemarks = false;
    });
};

const btnConfirmItemOutsideConveyorProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    if (!Array.isArray(arrComponent.value) || arrComponent.value.length === 0) {
        alert("Danh sách arrComponent không hợp lệ hoặc trống!");
        return;
    }
    const itemOutsideConveyorProcess = {
        ItemOutsideConveyorProcessID: pfcItemOutsideConveyorProcess.value.ItemOutsideConveyorProcessID,
        OutsideConveyorProcessID: pfcItemOutsideConveyorProcess.value.OutsideConveyorProcessID,
        ComponentName: pfcItemOutsideConveyorProcess.value.ComponentName,
        Material: pfcItemOutsideConveyorProcess.value.Material,
        Vendor: pfcItemOutsideConveyorProcess.value.Vendor,
        TableRow1: JSON.stringify(arrComponent.value),
    };
    // console.log(itemOutsideConveyorProcess)
    if (titleDialogForm2.value === "ADD NEW ITEM OUTSIDE CONVEYOR PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                // itemOutsideConveyorProcess.Remarks = res
            }
            await insertItemPFCOutsideConveyorProcess(itemOutsideConveyorProcess);
            const { res, _ } = await getPFCItemOutsideConveyorProcess(pfcOutsideConveyorProcess.value)
            arrItemOutsideConveyorProcess.value = res.data.data;
            success("Insert new Item OUTSIDE CONVEYOR PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM OUTSIDE CONVEYOR PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                // itemOutsideConveyorProcess.Remarks = res
            } else {
                if (oldImageUrl_Content.value) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemOutsideConveyorProcess(itemOutsideConveyorProcess)
            const { res, _ } = await getPFCItemOutsideConveyorProcess(pfcOutsideConveyorProcess.value)
            arrItemOutsideConveyorProcess.value = res.data.data;
            success("Insert new Item OUTSIDE CONVEYOR PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style scoped></style>