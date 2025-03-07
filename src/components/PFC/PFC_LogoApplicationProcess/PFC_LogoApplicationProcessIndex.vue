<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">LOGO APPLICATION PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewLogoApplicationProcess">
                    ADD NEW LOGO APPLICATION PROCESS
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
                <el-table-column prop="ItemIndex" label="Item Index" width="80" />
                <el-table-column prop="ModelType" label="Model Type" width="220" />
                <el-table-column prop="ModelName" label="Model Name" width="220" />
                <el-table-column prop="MaterialNumber" label="Material Number" width="150" />
                <el-table-column prop="Title" label="Title" />
                <el-table-column align="right" width="150">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnUpdatePFCLogoApplicationProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCLogoApplicationProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCLogoApplicationProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcLogoApplicationProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcLogoApplicationProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcLogoApplicationProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcLogoApplicationProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcLogoApplicationProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcLogoApplicationProcess.Title" />
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
                ITEMLOGO APPLICATION PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewLogoApplicationProcess">
            ADD NEW ITEMLOGO APPLICATION PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="LOGO APPLICATION PROCESS">
                    <template #default="{ row }">
                        {{ pfcLogoApplicationProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="ComponentName" label="ComponentName" width="200" />
                <el-table-column prop="LogoSockliner" label="LogoSockliner" width="200" />
                <el-table-column prop="Vendor" label="Vendor" width="200" />
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewLogoApplicationProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewLogoApplicationProcess(scope.$index, scope.row)"
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
        <!-- TableRow1 -->
        <el-form style="width:92vw" :model="pfcItemLogoApplicationProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 65vw ;">
                        <div style="display: flex; justify-content: space-between; ">
                            <el-form-item label="Component: " style="margin-bottom: 10px;">
                                <el-input v-model="pfcItemLogoApplicationProcess.ComponentName" style="width: 240px;" />
                            </el-form-item>
                            <el-form-item label="Logo-Sockliner: " style="margin-bottom: 10px;">
                                <el-input v-model="pfcItemLogoApplicationProcess.LogoSockliner" style="width: 240px;" />
                            </el-form-item>
                            <el-form-item label="Vendor: " style="margin-bottom: 10px;">
                                <el-input v-model="pfcItemLogoApplicationProcess.Vendor" style="width: 240px;" />
                            </el-form-item>
                        </div>
                        <el-table v-click-outside="handleClickOutside" :data="arrTableRow1" :row-style="{ height: '30px' }"
                            border>
                            <el-table-column align="center" prop="arrTableRow1.No" label="No" width="70">
                                <template #default="{ row }">
                                    <div v-if="!row.editingNo" @click="enableEdit(row, 'No')" style="min-height: 20px; ">
                                        {{ row.No }}
                                    </div>
                                    <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="left" prop="arrTableRow1.Process" label="Process 工段Công đoạn">
                                <template #default="{ row }">
                                    <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                        style="min-height: 20px; ">
                                        {{ row.Process }}
                                    </div>
                                    <el-input v-else v-model="row.Process" @blur="disableEdit(row, 'Process')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="arrTableRow1.Process" label="Process 工段Công đoạn">
                                <el-table-column align="center" prop="arrTableRow1.Chemical" label="Chemical 化品 Hóa chất "
                                    width="150">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingChemical" @click="enableEdit(row, 'Chemical')"
                                            style="min-height: 20px;">
                                            {{ row.Chemical }}
                                        </div>
                                        <el-input v-else v-model="row.Chemical" @blur="disableEdit(row, 'Chemical')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.Hardener"
                                    label="Hardener 硬化剂 Chất đông cứng" width="150">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingHardener" @click="enableEdit(row, 'Hardener')"
                                            style="min-height: 20px;">
                                            {{ row.Hardener }}
                                        </div>
                                        <el-input v-else v-model="row.Hardener" @blur="disableEdit(row, 'Hardener')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.WBSB" label="WB/SB" width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingWBSB" @click="enableEdit(row, 'WBSB')"
                                            style="min-height: 20px;">
                                            {{ row.WBSB }}
                                        </div>
                                        <el-input v-else v-model="row.WBSB" @blur="disableEdit(row, 'WBSB')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="Process details 明细流程 Chi tiết lưu trình" width="150">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTemp" @click="enableEdit(row, 'Temp')"
                                            style="min-height: 20px;">
                                            {{ row.Temp }}
                                        </div>
                                        <el-input v-else v-model="row.Temp" @blur="disableEdit(row, 'Temp')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.Time" label="Time 时间 Thời gian "
                                    width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')"
                                            style="min-height: 20px;">
                                            {{ row.Time }}
                                        </div>
                                        <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.Mesh" label="Mesh 网 Lưới #" width="80">
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
                    </div>
                    <div style="width: 20vw; margin-left: 10px;">
                        <el-form-item label="Size:" style="margin-bottom: 10px; margin-left:180px;">
                            <el-input v-model="pfcItemLogoApplicationProcess.Size" />
                        </el-form-item>
                        <div style="border: 1px solid rgb(235, 238, 245);">
                            <div
                                style="text-align: center; background-color: #f5f7fa; border-bottom: 1px solid #ebeef5; padding: 3px; font-weight: bold; color:#909399">
                                Ghi chú 备注 Remarks
                            </div>
                            <div style="background-color: rgba(220, 220, 220, 0.144); height:250px;">
                            <!-- Ảnh siêu vip pro -->
                            </div>
                            <div style="background-color: #f5f7fa; border-top: 1px solid #ebeef5; padding: 5px;">
                                <el-form-item label="Remark 备注Chú ý:" label-position="top" style="margin-bottom: 10px;">
                                    <el-input type="textarea" v-model="pfcItemLogoApplicationProcess.Remarks" autosize
                                        placeholder="Nhập nội dung...">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                </div>
            </el-form-item>
        </el-form>
        <!-- TableRow1 -->

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemLogoApplicationProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemLogoApplicationProcess, deletePFCLogoApplicationProcess, getPFCItemLogoApplicationProcess, getPFCLogoApplicationProcessByModelID, insertItemPFCLogoApplicationProcess, insertPFCLogoApplicationProcess, updatePFCItemLogoApplicationProcess, updatePFCLogoApplicationProcess } from '@/hooks/PFC/useLogoApplicationProcess';
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
    (arrItemLogoApplicationProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.ComponentName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrTableRow1 = ref([]);

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW LOGO APPLICATION PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM LOGO APPLICATION PROCESS")
const pfcLogoApplicationProcess = ref({} as Record<string, any>)
const pfcItemLogoApplicationProcess = ref({} as Record<string, any>)
const arrItemLogoApplicationProcess = ref([]);

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
    const { res, _ } = await getPFCLogoApplicationProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewLogoApplicationProcess = () => {
    titleDialogForm1.value = "ADD NEW LOGO APPLICATION PROCESS"
    pfcLogoApplicationProcess.value = {};
    pfcLogoApplicationProcess.value.ModelType = pfcModel.value.ModelType
    pfcLogoApplicationProcess.value.ModelName = pfcModel.value.ModelName
    pfcLogoApplicationProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcLogoApplicationProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW LOGO APPLICATION PROCESS") {
        try {
            await insertPFCLogoApplicationProcess(pfcLogoApplicationProcess.value)
            success("Insert new LOGO APPLICATION PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE LOGO APPLICATION PROCESS") {
        try {
            await updatePFCLogoApplicationProcess(pfcLogoApplicationProcess.value)
            success("Update LOGO APPLICATION PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCLogoApplicationProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemLogoApplicationProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCLogoApplicationProcess(row);
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

const btnUpdatePFCLogoApplicationProcess = async (index: number, row) => {
    pfcLogoApplicationProcess.value = {};
    pfcLogoApplicationProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE LOGO APPLICATION PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCLogoApplicationProcess = async (index: number, row) => {
    showLoading();
    pfcLogoApplicationProcess.value = {};
    pfcLogoApplicationProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemLogoApplicationProcess(pfcLogoApplicationProcess.value)
    arrItemLogoApplicationProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcLogoApplicationProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewLogoApplicationProcess = async () => {
    titleDialogForm2.value = "ADD NEW ITEM LOGO APPLICATION PROCESS";
    pfcItemLogoApplicationProcess.value = {};
    pfcItemLogoApplicationProcess.value.LogoApplicationProcessID = pfcLogoApplicationProcess.value.LogoApplicationProcessID;
    arrTableRow1.value = Array.from({ length: 14 }, (_, i) => ({
        No: "",
        Process: "",
        Chemical: "",
        Hardener: "",
        WBSB: "",
        Temp: "",
        Time: "",
        Mesh: "",
    }));

    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    // imageUrl_Content.value = null;
    // oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewLogoApplicationProcess = async (index: number, row) => {
    pfcItemLogoApplicationProcess.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Images.toString();

    try {
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 1 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrTableRow1.value = Array.from({ length: 14 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.ImagesImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM LOGO APPLICATION PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewLogoApplicationProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.ComponentName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            if (row.ImagesImages) {
                await deleteFilePFCModelFromFolderPFCModel(row.ImagesImages, pfcModel.value)
            }
            await deletePFCItemLogoApplicationProcess(row);
            const { res, _ } = await getPFCItemLogoApplicationProcess(pfcLogoApplicationProcess.value)
            arrItemLogoApplicationProcess.value = res.data.data;
            success("Delete PFC Item LOGO APPLICATION PROCESS successfully!")
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const formData_Content = new FormData();
const imageUrl_Content = ref('')
// const oldImageUrl_Content = ref('')

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const enableEdit = (row, field) => {
    row.editingNo = false;
    row.editingProcess = false;
    row.editingChemical = false;
    row.editingHardener = false;
    row.editingWBSB = false;
    row.editingTemp = false;
    row.editingTime = false;
    row.editingMesh = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};
const handleClickOutside = (event) => {
    arrTableRow1.value.forEach((row) => {
        row.editingNo = false;
        row.editingProcess = false;
        row.editingChemical = false;
        row.editingHardener = false;
        row.editingWBSB = false;
        row.editingTemp = false;
        row.editingTime = false;
        row.editingMesh = false;
    });
};

const btnConfirmItemLogoApplicationProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    const itemLogoApplicationProcess = {
        ItemLogoApplicationProcessID: pfcItemLogoApplicationProcess.value.ItemLogoApplicationProcessID,
        LogoApplicationProcessID: pfcItemLogoApplicationProcess.value.LogoApplicationProcessID,
        ComponentName: pfcItemLogoApplicationProcess.value.ComponentName,
        LogoSockliner: pfcItemLogoApplicationProcess.value.LogoSockliner,
        Vendor: pfcItemLogoApplicationProcess.value.Vendor,
        TableRow1: JSON.stringify(arrTableRow1.value),
        Remarks: pfcItemLogoApplicationProcess.value.Remarks,
        RemarksImage: pfcItemLogoApplicationProcess.value.RemarksImage,
        Size: pfcItemLogoApplicationProcess.value.Size,
    };
    // console.log(itemLogoApplicationProcess)
    if (titleDialogForm2.value === "ADD NEW ITEM LOGO APPLICATION PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {

            }
            await insertItemPFCLogoApplicationProcess(itemLogoApplicationProcess);
            const { res, _ } = await getPFCItemLogoApplicationProcess(pfcLogoApplicationProcess.value)
            arrItemLogoApplicationProcess.value = res.data.data;
            success("Insert new Item LOGO APPLICATION PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM LOGO APPLICATION PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
            }
            await updatePFCItemLogoApplicationProcess(itemLogoApplicationProcess)
            const { res, _ } = await getPFCItemLogoApplicationProcess(pfcLogoApplicationProcess.value)
            arrItemLogoApplicationProcess.value = res.data.data;
            success("Insert new Item LOGO APPLICATION PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
    // console.log("TableRow1", TableRow1)
}
</script>

<style scoped></style>