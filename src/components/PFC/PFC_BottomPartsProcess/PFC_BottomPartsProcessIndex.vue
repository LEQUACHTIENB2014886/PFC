<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">BOTTOM PATRS PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewBottomPartsProcess">
                    ADD NEW BOTTOM PATRS PROCESS
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
                <!-- <el-table-column prop="ItemIndex" label="Item Index" width="100" /> -->
                <el-table-column prop="ModelType" label="Model Type" width="220" />
                <el-table-column prop="ModelName" label="Model Name" width="220" />
                <el-table-column prop="MaterialNumber" label="Material Number" width="180" />
                <el-table-column prop="Title" label="Title" />
                <el-table-column align="right" width="180">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnUpdatePFCBottomPartsProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCBottomPartsProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCBottomPartsProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcBottomPartsProcess" label-width="auto" label-position="right"
            size="default">
            <!-- <el-form-item label="Item Index: ">
                <el-input v-model="pfcBottomPartsProcess.ItemIndex" :disabled="true" />
            </el-form-item> -->
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcBottomPartsProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcBottomPartsProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcBottomPartsProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcBottomPartsProcess.Title" />
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
                ITEM BOTTOM PATRS PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewBottomPartsProcess">
            ADD NEW ITEM BOTTOM PATRS PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <!-- <el-table-column prop="ItemIndex" label="Item Index" width="200" /> -->
                <el-table-column label="BOTTOM PATRS PROCESS" width="500">
                    <template #default="{ row }">
                        {{ pfcBottomPartsProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="Component" label="Component" />
                <el-table-column prop="Material" label="Material" />
                <el-table-column prop="Vendor" label="Vendor" width="150" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewBottomPartsProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewBottomPartsProcess(scope.$index, scope.row)"
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
            <el-form style="width: 60vw" :model="pfcItemBottomPartsProcess" label-width="auto" label-position="right"
                size="default">
                <!-- <el-form-item label="Item Index:">
                <el-select v-model="pfcItemBottomPartsProcess.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item> -->
                <el-form-item label="Component: ">
                    <el-input v-model="pfcItemBottomPartsProcess.Component" />
                </el-form-item>
                <el-form-item label="Material: ">
                    <el-input v-model="pfcItemBottomPartsProcess.Material" />
                </el-form-item>
                <el-form-item label="Vendor: ">
                    <el-input v-model="pfcItemBottomPartsProcess.Vendor" />
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
                            <el-table-column align="center" prop="arrComponent.Process" label=" Process 工段 Công đoạn"
                                width="400">
                                <template #default="{ row }">
                                    <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                        style="min-height: 20px; text-align: left;">
                                        {{ row.Process }}
                                    </div>
                                    <el-input v-else v-model="row.Process" @blur="disableEdit(row, 'Process')" />
                                </template>
                            </el-table-column>
                            <el-table-column label="Pressing 压 Ép" align="center">
                                <el-table-column align="center" prop="arrComponent.Temp" label="Temp">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTemp" @click="enableEdit(row, 'Temp')"
                                            style="min-height: 20px;">
                                            {{ row.Temp }}
                                        </div>
                                        <el-input v-else v-model="row.Temp" @blur="disableEdit(row, 'Temp')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Time" label="Time">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')"
                                            style="min-height: 20px;">
                                            {{ row.Time }}
                                        </div>
                                        <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Pressure" label="Pressure">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingPressure" @click="enableEdit(row, 'Pressure')"
                                            style="min-height: 20px;">
                                            {{ row.Pressure }}
                                        </div>
                                        <el-input v-else v-model="row.Pressure" @blur="disableEdit(row, 'Pressure')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>

                            <el-table-column align="center" prop="arrComponent.Remarks" label="Remarks">
                                <template #default="{ row }">
                                    <div v-if="!row.editingRemarks" @click="enableEdit(row, 'Remarks')"
                                        style="min-height: 20px;">
                                        {{ row.Remarks }}
                                    </div>
                                    <el-input v-else v-model="row.Remarks" @blur="disableEdit(row, 'Remarks')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form style="width: 20vw" :model="pfcItemBottomPartsProcess" label-width="auto" label-position="right"
                size="default">
                <el-form-item label=" ">
                    <el-table :data="arrRemarks" border style="width: 100%;" :span-method="spanMethod">
                        <el-table-column label="Remarks" align="center">
                            <el-table-column label="Images" align="center">
                                <template #header>
                                    <div style="text-align: center;">
                                        <div>Images</div>
                                    </div>
                                </template>
                                <template #default="{ row, $index }">
                                    <div style="width: 100%; height: 100%; min-height: 40px;">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="Size" align="center" width="120" fixed="right">
                                <template #header>
                                    <div style="text-align: center;">
                                        <div>SIZE</div>
                                    </div>
                                </template>
                                <template #default="{ row }">
                                    <div v-if="!row.editingRemarksSize" @click="enableEdit(row, 'RemarksSize')"
                                        style="min-height: 58px; cursor: pointer;">
                                        {{ row.RemarksSize }}
                                    </div>
                                    <el-input v-else v-model="row.RemarksSize" @blur="disableEdit(row, 'RemarksSize')" />
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>


        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemBottomPartsProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemBottomPartsProcess, deletePFCBottomPartsProcess, getPFCItemBottomPartsProcess, getPFCBottomPartsProcessByModelID, insertItemPFCBottomPartsProcess, insertPFCBottomPartsProcess, updatePFCItemBottomPartsProcess, updatePFCBottomPartsProcess } from '@/hooks/PFC/useBottomPartsProcess';
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
    (arrItemBottomPartsProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.Component.toLowerCase().includes(search1.value.toLowerCase())
    )
);

function spanMethod({ row, column, rowIndex, columnIndex }) {
    if (columnIndex === 0) {
        if (rowIndex === 0) {
            return [arrRemarks.value.length, 1]
        } else {
            return [0, 0]
        }
    }
}

const tableData = ref([]);
const arrComponent = ref([]);
arrComponent.value = Array.from({ length: 16 }, () => ({}));
const arrRemarks = ref([]);
arrRemarks.value = Array.from({ length: 10 }, () => ({}));
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW BOTTOM PATRS PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM BOTTOM PATRS PROCESS")
const pfcBottomPartsProcess = ref({} as Record<string, any>)
const pfcItemBottomPartsProcess = ref({} as Record<string, any>)
// const ItemIndex = [1, 2, 3, 4]
const arrItemBottomPartsProcess = ref([]);

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
    const { res, _ } = await getPFCBottomPartsProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewBottomPartsProcess = () => {
    titleDialogForm1.value = "ADD NEW BOTTOM PATRS PROCESS"
    pfcBottomPartsProcess.value = {};
    pfcBottomPartsProcess.value.ModelType = pfcModel.value.ModelType
    pfcBottomPartsProcess.value.ModelName = pfcModel.value.ModelName
    pfcBottomPartsProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    // pfcBottomPartsProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW BOTTOM PATRS PROCESS") {
        try {
            await insertPFCBottomPartsProcess(pfcBottomPartsProcess.value)
            success("Insert new BOTTOM PATRS PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE BOTTOM PATRS PROCESS") {
        try {
            await updatePFCBottomPartsProcess(pfcBottomPartsProcess.value)
            success("Update BOTTOM PATRS PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCBottomPartsProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemBottomPartsProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCBottomPartsProcess(row);
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

const btnUpdatePFCBottomPartsProcess = async (index: number, row) => {
    pfcBottomPartsProcess.value = {};
    pfcBottomPartsProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE BOTTOM PATRS PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCBottomPartsProcess = async (index: number, row) => {
    showLoading();
    pfcBottomPartsProcess.value = {};
    pfcBottomPartsProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemBottomPartsProcess(pfcBottomPartsProcess.value)
    arrItemBottomPartsProcess.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewBottomPartsProcess = () => {
    titleDialogForm2.value = "ADD NEW ITEM BOTTOM PATRS PROCESS";
    pfcItemBottomPartsProcess.value = {};
    // pfcItemBottomPartsProcess.value.ItemIndex = `${arrItemBottomPartsProcess.value.length + 1}`
    pfcItemBottomPartsProcess.value.BottomPartsProcessID = pfcBottomPartsProcess.value.BottomPartsProcessID;
    arrComponent.value = Array.from({ length: 16 }, (_, i) => ({
        No: i + 1,
        Process: "",
        Temp: "",
        Time: "",
        Pressure: "",
        Remarks: "",
    }));
    arrRemarks.value = Array.from({ length: 10 }, () => ({ RemarksSize: "", }));
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewBottomPartsProcess = async (index: number, row) => {
    pfcItemBottomPartsProcess.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.RemarksImages.toString();

    try {
        // console.log(row.RemarksSize)
        arrRemarks.value = row.RemarksSize ? JSON.parse(row.RemarksSize) : Array.from({ length: 10 }, () => ({}));
        arrComponent.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 16 }, () => ({}));
        // console.log("arrComponent.value", arrComponent.value);
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 16 }, () => ({}));
        arrRemarks.value = Array.from({ length: 10 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.RemarksImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM BOTTOM PATRS PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewBottomPartsProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.Component}". Continue?`,
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
            await deletePFCItemBottomPartsProcess(row);
            const { res, _ } = await getPFCItemBottomPartsProcess(pfcBottomPartsProcess.value)
            arrItemBottomPartsProcess.value = res.data.data;
            success("Delete PFC Item BOTTOM PATRS PROCESS successfully!")
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const formData_Content = new FormData();
const imageUrl_Content = ref('')
const oldImageUrl_Content = ref('')

const handleChange_Remark = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_Content.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_Remark = (options) => {
    const { file, onSuccess, onError } = options
    formData_Content.delete("file")
    formData_Content.delete("ModelName")
    formData_Content.append("file", file);
}

const handleDelete_Remark = () => {
    imageUrl_Content.value = null;
    pfcItemBottomPartsProcess.value.RemarksImages = null;
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
};

const checkTypeFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const isImage = rawFile.type.startsWith('image/');
    const isLt5M = rawFile.size / 1024 / 1024 < 5;
    if (!isImage) {
        error('Type image not support!');
        return false;
    }
    if (!isLt5M) {
        error('Size image not support!');
        return false;
    }
    return true;
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const enableEdit = (row, field) => {
    row.editingNo = false;
    row.editingProcess = false;
    row.editingTemp = false;
    row.editingTime = false;
    row.editingPressure = false;
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
        row.editingTemp = false;
        row.editingTime = false;
        row.editingPressure = false;
    });
    arrRemarks.value.forEach((row) => {
        row.editingRemarks = false;
    });

};
const clickOutsideDirective = {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};
const { appContext } = getCurrentInstance();
// appContext.app.directive('click-outside', clickOutsideDirective);
const btnConfirmItemBottomPartsProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    if (!Array.isArray(arrRemarks.value) || arrRemarks.value.length === 0) {
        alert("Danh sách arrRemarks không hợp lệ hoặc trống!");
        return;
    }

    if (!Array.isArray(arrComponent.value) || arrComponent.value.length === 0) {
        alert("Danh sách arrComponent không hợp lệ hoặc trống!");
        return;
    }

    const itemBottomPartsProcess = {
        ItemBottomPartsProcessID: pfcItemBottomPartsProcess.value.ItemBottomPartsProcessID,
        Component: pfcItemBottomPartsProcess.value.Component,
        BottomPartsProcessID: pfcItemBottomPartsProcess.value.BottomPartsProcessID,
        Material: pfcItemBottomPartsProcess.value.Material,
        Vendor: pfcItemBottomPartsProcess.value.Vendor,
        RemarksImages: pfcItemBottomPartsProcess.value.RemarksImages,
        RemarksSize: JSON.stringify(arrRemarks.value),
        TableRow1: JSON.stringify(arrComponent.value),
    };

    if (titleDialogForm2.value === "ADD NEW ITEM BOTTOM PATRS PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomPartsProcess.RemarksImages = res
            }
            await insertItemPFCBottomPartsProcess(itemBottomPartsProcess);
            const { res, _ } = await getPFCItemBottomPartsProcess(pfcBottomPartsProcess.value)
            arrItemBottomPartsProcess.value = res.data.data;
            success("Insert new Item BOTTOM PATRS PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM BOTTOM PATRS PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomPartsProcess.RemarksImages = res
            } else {
                if (oldImageUrl_Content.value && itemBottomPartsProcess.RemarksImages === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemBottomPartsProcess(itemBottomPartsProcess)
            const { res, _ } = await getPFCItemBottomPartsProcess(pfcBottomPartsProcess.value)
            arrItemBottomPartsProcess.value = res.data.data;
            success("Insert new Item BOTTOM PATRS PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped></style>