<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">BOTTOM SILK SCREEN PROCESS</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewBottomSilkScreenProcess">
            ADD NEW BOTTOM SILK SCREEN PROCESS
        </el-button>

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
                        <el-button size="small" @click="btnUpdatePFCBottomSilkScreenProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCBottomSilkScreenProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCBottomSilkScreenProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcBottomSilkScreenProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcBottomSilkScreenProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcBottomSilkScreenProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcBottomSilkScreenProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcBottomSilkScreenProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcBottomSilkScreenProcess.Title" />
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
                ITEM BOTTOM SILK SCREEN PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewBottomSilkScreenProcess">
            ADD NEW ITEM BOTTOM SILK SCREEN PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="BOTTOM SILK SCREEN PROCESS" width="500">
                    <template #default="{ row }">
                        {{ pfcBottomSilkScreenProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="ComponentName" label="Component" />
                <el-table-column prop="Material" label="Material" />
                <el-table-column prop="Vendor" label="Vendor" width="150" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewBottomSilkScreenProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewBottomSilkScreenProcess(scope.$index, scope.row)"
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
            <el-form style="width: 60vw" :model="pfcItemBottomSilkScreenProcess" label-width="auto" label-position="right"
                size="default">

                <el-form-item label="Component: ">
                    <el-input v-model="pfcItemBottomSilkScreenProcess.ComponentName" />
                </el-form-item>
                <el-form-item label="Material: ">
                    <el-input v-model="pfcItemBottomSilkScreenProcess.Material" />
                </el-form-item>
                <el-form-item label="Vendor: ">
                    <el-input v-model="pfcItemBottomSilkScreenProcess.Vendor" />
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
                                width="200">
                                <template #default="{ row }">
                                    <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                        style="min-height: 20px; text-align: left;">
                                        {{ row.Process }}
                                    </div>
                                    <el-input v-else v-model="row.Process" @blur="disableEdit(row, 'Process')" />
                                </template>
                            </el-table-column>
                            <el-table-column label="Pressing 压 Ép" align="center">
                                <el-table-column align="center" prop="arrComponent.Chemical" label="Chemical">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingChemical" @click="enableEdit(row, 'Chemical')"
                                            style="min-height: 20px;">
                                            {{ row.Chemical }}
                                        </div>
                                        <el-input v-else v-model="row.Chemical" @blur="disableEdit(row, 'Chemical')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.Hardener" label="Hardener">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingHardener" @click="enableEdit(row, 'Hardener')"
                                            style="min-height: 20px;">
                                            {{ row.Hardener }}
                                        </div>
                                        <el-input v-else v-model="row.Hardener" @blur="disableEdit(row, 'Hardener')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrComponent.WB" label="WB/SB">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingWB" @click="enableEdit(row, 'WB')" style="min-height: 20px;">
                                            {{ row.WB }}
                                        </div>
                                        <el-input v-else v-model="row.WB" @blur="disableEdit(row, 'WB')" />
                                    </template>
                                </el-table-column>
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
                                <el-table-column align="center" prop="arrComponent.Mesh" label="Mesh">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingMesh" @click="enableEdit(row, 'Mesh')"
                                            style="min-height: 20px;">
                                            {{ row.Mesh }}
                                        </div>
                                        <el-input v-else v-model="row.Mesh" @blur="disableEdit(row, 'Mesh')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="layout-container">
                <div class="header-top">
                    <div class="remarks-col">
                        <strong>Remarks 备注 Ghi chú</strong>
                    </div>
                    <div class="size-col">
                        <div class="size-header">SIZE</div>

                    </div>
                </div>
                <div class="content-main">
                    <el-input type="textarea" v-model="pfcItemBottomSilkScreenProcess.Size" class="size-input" :rows="3"></el-input>
                </div>
                <div class="remark-area">
                    <strong>Remark :</strong>
                    <el-input type="textarea" v-model="pfcItemBottomSilkScreenProcess.Remarks" class="remark-input"
                        :rows="12"></el-input>
                </div>
                <div class="footer-bottom">
                    <div class="wb-col">
                        <strong>Total WB Processes:</strong> {{ totalWB }}
                    </div>
                    <div class="sb-col">
                        <strong>Total SB Processes:</strong> {{ totalSB }}
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemBottomSilkScreenProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemBottomSilkScreenProcess, deletePFCBottomSilkScreenProcess, getPFCItemBottomSilkScreenProcess, getPFCBottomSilkScreenProcessByModelID, insertItemPFCBottomSilkScreenProcess, insertPFCBottomSilkScreenProcess, updatePFCItemBottomSilkScreenProcess, updatePFCBottomSilkScreenProcess } from '@/hooks/PFC/useBottomSilkScreenProcess';
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
    (arrItemBottomSilkScreenProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.ComponentName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrComponent = ref([]);
arrComponent.value = Array.from({ length: 12 }, () => ({}));
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW BOTTOM SILK SCREEN PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM BOTTOM SILK SCREEN PROCESS")
const pfcBottomSilkScreenProcess = ref({} as Record<string, any>)
const pfcItemBottomSilkScreenProcess = ref({} as Record<string, any>)
const arrItemBottomSilkScreenProcess = ref([]);

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
    const { res, _ } = await getPFCBottomSilkScreenProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewBottomSilkScreenProcess = () => {
    titleDialogForm1.value = "ADD NEW BOTTOM SILK SCREEN PROCESS"
    pfcBottomSilkScreenProcess.value = {};
    pfcBottomSilkScreenProcess.value.ModelType = pfcModel.value.ModelType
    pfcBottomSilkScreenProcess.value.ModelName = pfcModel.value.ModelName
    pfcBottomSilkScreenProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcBottomSilkScreenProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW BOTTOM SILK SCREEN PROCESS") {
        try {
            await insertPFCBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            success("Insert new BOTTOM SILK SCREEN PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE BOTTOM SILK SCREEN PROCESS") {
        try {
            await updatePFCBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            success("Update BOTTOM SILK SCREEN PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCBottomSilkScreenProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCBottomSilkScreenProcess(row);
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

const btnUpdatePFCBottomSilkScreenProcess = async (index: number, row) => {
    pfcBottomSilkScreenProcess.value = {};
    pfcBottomSilkScreenProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE BOTTOM SILK SCREEN PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCBottomSilkScreenProcess = async (index: number, row) => {
    showLoading();
    pfcBottomSilkScreenProcess.value = {};
    pfcBottomSilkScreenProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
    arrItemBottomSilkScreenProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcBottomSilkScreenProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewBottomSilkScreenProcess = () => {
    pfcItemBottomSilkScreenProcess.value = {};
    pfcItemBottomSilkScreenProcess.value.BottomSilkScreenProcessID = pfcBottomSilkScreenProcess.value.BottomSilkScreenProcessID;
    arrComponent.value = Array.from({ length: 12 }, (_, i) => ({
        No: i + 1,
    }));
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewBottomSilkScreenProcess = async (index: number, row) => {
    pfcItemBottomSilkScreenProcess.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.Remarks.toString();

    try {
        arrComponent.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 12 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 12 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.RemarksImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM BOTTOM SILK SCREEN PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewBottomSilkScreenProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.ComponentName}". Continue?`,
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
            await deletePFCItemBottomSilkScreenProcess(row);
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            arrItemBottomSilkScreenProcess.value = res.data.data;
            success("Delete PFC Item BOTTOM SILK SCREEN PROCESS successfully!")
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
    pfcItemBottomSilkScreenProcess.value.RemarksImages = null;
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
const totalWB = computed(() => {
    return arrComponent.value.filter(
        (row) => row.WB?.toLowerCase() === 'wb'
    ).length
})

const totalSB = computed(() => {
    return arrComponent.value.filter(
        (row) => row.WB?.toLowerCase() === 'sb'
    ).length
})


const { appContext } = getCurrentInstance();
appContext.app.directive('click-outside', clickOutsideDirective);
const btnConfirmItemBottomSilkScreenProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    if (!Array.isArray(arrComponent.value) || arrComponent.value.length === 0) {
        alert("Danh sách arrComponent không hợp lệ hoặc trống!");
        return;
    }

    const itemBottomSilkScreenProcess = {
        ItemBottomSilkScreenProcessID: pfcItemBottomSilkScreenProcess.value.ItemBottomSilkScreenProcessID,
        BottomSilkScreenProcessID: pfcItemBottomSilkScreenProcess.value.BottomSilkScreenProcessID,
        ComponentName: pfcItemBottomSilkScreenProcess.value.ComponentName,
        Material: pfcItemBottomSilkScreenProcess.value.Material,
        Vendor: pfcItemBottomSilkScreenProcess.value.Vendor,
        TableRow1: JSON.stringify(arrComponent.value),
        Remarks: pfcItemBottomSilkScreenProcess.value.Remarks,
        Size: pfcItemBottomSilkScreenProcess.value.Size,
        TotalWBSB: pfcItemBottomSilkScreenProcess.value.TotalWBSB,
    };
    // console.log(itemBottomSilkScreenProcess)
    if (titleDialogForm2.value === "ADD NEW ITEM BOTTOM SILK SCREEN PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomSilkScreenProcess.Remarks = res
            }
            await insertItemPFCBottomSilkScreenProcess(itemBottomSilkScreenProcess);
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            arrItemBottomSilkScreenProcess.value = res.data.data;
            success("Insert new Item BOTTOM SILK SCREEN PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM BOTTOM SILK SCREEN PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomSilkScreenProcess.Remarks = res
            } else {
                if (oldImageUrl_Content.value && itemBottomSilkScreenProcess.Remarks === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemBottomSilkScreenProcess(itemBottomSilkScreenProcess)
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            arrItemBottomSilkScreenProcess.value = res.data.data;
            success("Insert new Item BOTTOM SILK SCREEN PROCESS successfully!")
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
}

.header-top {
    display: flex;
    border-bottom: 1px solid #ebeef5;
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
    padding: 8px;
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

.footer-bottom {
    padding: 8px;
    border-top: 1px solid #ebeef5;
    display: flex;
    justify-content: center;
}

.wb-col,
.sb-col {
    margin-left: 10px;
    text-align: right;
}</style>