<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">SOCKLINER SPECIFICATION</h4>
       
        <div style="display: flex; justify-content: space-between;">
    <div style="margin-left:35px">

        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewSocklinerSpecification">
            ADD NEW SOCKLINER SPECIFICATION
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
                        <el-button size="small" @click="btnUpdatePFCSocklinerSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCSocklinerSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCSocklinerSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcSocklinerSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcSocklinerSpecification.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcSocklinerSpecification.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcSocklinerSpecification.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcSocklinerSpecification.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcSocklinerSpecification.Title" />
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
                ITEM SOCKLINER SPECIFICATION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewSocklinerSpecification">
            ADD NEW ITEM SOCKLINER SPECIFICATION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="SOCKLINER SPECIFICATION">
                    <template #default="{ row }">
                        {{ pfcSocklinerSpecification.Title }}
                    </template>
                </el-table-column>

                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewSocklinerSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewSocklinerSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="97vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>

        <!-- Div -->
        <div>
            <div style="display: flex; justify-content: flex-end; width: 100%;">
                <el-form-item label="Size: ">
                    <el-input v-model="pfcItemSocklinerSpecification.Size" style="width: 150px;" />
                </el-form-item>
            </div>

            <div style="display: flex;">
                <!-- Cột 1 -->
                <div style="width: 50vw; border: 1px solid rgb(235, 238, 245); padding: 20px;">
                    <h3 style="text-align: center; margin-bottom: 10px;">
                        {{ pfcItemSocklinerSpecification.Front }}
                    </h3>
                    <div
                        style="height: 500px; border: 1px solid rgb(235, 238, 245); background: rgba(185, 174, 174, 0.349);">
                    </div>
                </div>

                <!-- Cột 2 -->
                <div style="width: 50vw; border: 1px solid rgb(235, 238, 245); padding: 20px;">
                    <h3 style="text-align: center; margin-bottom: 10px;">
                        {{ pfcItemSocklinerSpecification.Back }}
                    </h3>
                    <div
                        style="height: 500px; border: 1px solid rgb(235, 238, 245); background: rgba(185, 174, 174, 0.349);">
                    </div>
                </div>
            </div>
        </div>
        <!-- Div -->


        <div style="display: flex; flex-direction: row; margin-top: 20px;">
            <!-- TableRow1 -->
            <el-form style="width:40vw" :model="pfcItemSocklinerSpecification" label-width="auto" label-position="right"
                size="default">
                <el-form-item label=" ">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside" :data="arrTableRow1" :row-style="{ height: '30px' }"
                            border>
                            <el-table-column align="center" label="Logo Dimensions 规格Qui cách logo logo">
                                <el-table-column align="center" prop="arrTableRow1.SIZE" label="SIZE" width="120">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingSIZE" @click="enableEdit(row, 'SIZE')"
                                            style="min-height: 20px; ">
                                            {{ row.SIZE }}
                                        </div>
                                        <el-input v-else v-model="row.SIZE" @blur="disableEdit(row, 'SIZE')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.Remarks" label="Remarks">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingRemarks" @click="enableEdit(row, 'Remarks')"
                                            style="min-height: 30px; text-align: left;">
                                            {{ row.Remarks }}
                                        </div>
                                        <el-input v-else v-model="row.Remarks" @blur="disableEdit(row, 'Remarks')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.A" label="A" width="150">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingA" @click="enableEdit(row, 'A')" style="min-height: 20px;">
                                            {{ row.A }}
                                        </div>
                                        <el-input v-else v-model="row.A" @blur="disableEdit(row, 'A')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.B" label="B" width="150">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingB" @click="enableEdit(row, 'B')" style="min-height: 20px;">
                                            {{ row.B }}
                                        </div>
                                        <el-input v-else v-model="row.B" @blur="disableEdit(row, 'B')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.C" label="C" width="150">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingC" @click="enableEdit(row, 'C')" style="min-height: 20px;">
                                            {{ row.C }}
                                        </div>
                                        <el-input v-else v-model="row.C" @blur="disableEdit(row, 'C')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>

                        </el-table>
                    </el-col>
                </el-form-item>
            </el-form>
            <!-- TableRow1 -->

            <!-- TableRow2 -->
            <el-form style="width: 60vw" :model="pfcItemSocklinerSpecification" label-width="auto" label-position="right"
                size="default">
                <el-form-item label=" ">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside2" :data="arrTableRow2" :row-style="{ height: '30px' }"
                            border>
                            <el-table-column align="center" prop="arrTableRow2.Component"
                                label="Component 部件名称 Tên chi tiết" width="270">
                                <template #default="{ row }">
                                    <div v-if="!row.editingComponent" @click="enableEdit2(row, 'Component')"
                                        style="min-height: 20px;">
                                        {{ row.Component }}
                                    </div>
                                    <el-input v-else v-model="row.Component" @blur="disableEdit2(row, 'Component')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTableRow2.Material" label="Material  材料 Vật tư ">
                                <template #default="{ row }">
                                    <div v-if="!row.editingMaterial" @click="enableEdit2(row, 'Material')"
                                        style="min-height: 20px; text-align: center;">
                                        {{ row.Material }}
                                    </div>
                                    <el-input v-else v-model="row.Material" @blur="disableEdit2(row, 'Material')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTableRow2.MCS" label="MCS #" width="220">
                                <template #default="{ row }">
                                    <div v-if="!row.editingMCS" @click="enableEdit2(row, 'MCS')"
                                        style="min-height: 20px; text-align: center;">
                                        {{ row.MCS }}
                                    </div>
                                    <el-input v-else v-model="row.MCS" @blur="disableEdit2(row, 'MCS')" />
                                </template>
                            </el-table-column>

                        </el-table>
                    </el-col>
                </el-form-item>
            </el-form>
            <!-- TableRow2 -->
        </div>





        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemSocklinerSpecification">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemSocklinerSpecification, deletePFCSocklinerSpecification, getPFCItemSocklinerSpecification, getPFCSocklinerSpecificationByModelID, insertItemPFCSocklinerSpecification, insertPFCSocklinerSpecification, updatePFCItemSocklinerSpecification, updatePFCSocklinerSpecification } from '@/hooks/PFC/useSocklinerSpecification';
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
    (arrItemSocklinerSpecification.value || []).filter(
        (data) =>
            !search1.value ||
            data.ComponentName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrTableRow1 = ref([]);
const arrTableRow2 = ref([]);

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW SOCKLINER SPECIFICATION")
const titleDialogForm2 = ref("ADD NEW ITEM SOCKLINER SPECIFICATION")
const pfcSocklinerSpecification = ref({} as Record<string, any>)
const pfcItemSocklinerSpecification = ref({} as Record<string, any>)
const arrItemSocklinerSpecification = ref([]);

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
    const { res, _ } = await getPFCSocklinerSpecificationByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewSocklinerSpecification = () => {
    titleDialogForm1.value = "ADD NEW SOCKLINER SPECIFICATION"
    pfcSocklinerSpecification.value = {};
    pfcSocklinerSpecification.value.ModelType = pfcModel.value.ModelType
    pfcSocklinerSpecification.value.ModelName = pfcModel.value.ModelName
    pfcSocklinerSpecification.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcSocklinerSpecification.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW SOCKLINER SPECIFICATION") {
        try {
            await insertPFCSocklinerSpecification(pfcSocklinerSpecification.value)
            success("Insert new SOCKLINER SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE SOCKLINER SPECIFICATION") {
        try {
            await updatePFCSocklinerSpecification(pfcSocklinerSpecification.value)
            success("Update SOCKLINER SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCSocklinerSpecification = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemSocklinerSpecification(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCSocklinerSpecification(row);
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

const btnUpdatePFCSocklinerSpecification = async (index: number, row) => {
    pfcSocklinerSpecification.value = {};
    pfcSocklinerSpecification.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE SOCKLINER SPECIFICATION"
    dialogForm1Visible.value = true;
}

const btnItemPFCSocklinerSpecification = async (index: number, row) => {
    showLoading();
    pfcSocklinerSpecification.value = {};
    pfcSocklinerSpecification.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemSocklinerSpecification(pfcSocklinerSpecification.value)
    arrItemSocklinerSpecification.value = res.data.data ? res.data.data : [];
    // console.log(pfcSocklinerSpecification.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewSocklinerSpecification = async () => {
    titleDialogForm2.value = "ADD NEW ITEM SOCKLINER SPECIFICATION";
    pfcItemSocklinerSpecification.value = {};
    pfcItemSocklinerSpecification.value.SocklinerSpecificationID = pfcSocklinerSpecification.value.SocklinerSpecificationID;
    pfcItemSocklinerSpecification.value.Front = "Trước 前 Front";
    pfcItemSocklinerSpecification.value.Back = "Sau 后 Back";
    arrTableRow1.value = Array.from({ length: 1 }, (_, i) => ({
        SIZE: "",
        Remarks: "",
        A: "",
        B: "",
        C: "",
    }));
    arrTableRow2.value = Array.from({ length: 3 }, (_, i) => ({
        Component: "",
        Material: "",
        MCS: "",

    }));


    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    // imageUrl_Content.value = null;
    // oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewSocklinerSpecification = async (index: number, row) => {
    pfcItemSocklinerSpecification.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Images.toString();

    try {
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 1 }, () => ({}));
        arrTableRow2.value = row.TableRow2 ? JSON.parse(row.TableRow2) : Array.from({ length: 3 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrTableRow1.value = Array.from({ length: 1 }, () => ({}));
        arrTableRow2.value = Array.from({ length: 3 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.ImagesImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM SOCKLINER SPECIFICATION";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewSocklinerSpecification = async (index: number, row) => {
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
            await deletePFCItemSocklinerSpecification(row);
            const { res, _ } = await getPFCItemSocklinerSpecification(pfcSocklinerSpecification.value)
            arrItemSocklinerSpecification.value = res.data.data;
            success("Delete PFC Item SOCKLINER SPECIFICATION successfully!")
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
    row.editingSIZE = false;
    row.editingRemarks = false;
    row.editingA = false;
    row.editingB = false;
    row.editingC = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};
const handleClickOutside = (event) => {
    arrTableRow1.value.forEach((row) => {
        row.editingSIZE = false;
        row.editingRemarks = false;
        row.editingA = false;
        row.editingB = false;
        row.editingC = false;
    });
};

const enableEdit2 = (row, field) => {
    row.editingComponent = false
    row.editingMaterial = false
    row.editingMCS = false
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit2 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside2 = (event) => {
    arrTableRow2.value.forEach((row) => {
        row.editingComponent = false
        row.editingMaterial = false
        row.editingMCS = false
    });
};

const btnConfirmItemSocklinerSpecification = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    const itemSocklinerSpecification = {
        ItemSocklinerSpecificationID: pfcItemSocklinerSpecification.value.ItemSocklinerSpecificationID,
        SocklinerSpecificationID: pfcItemSocklinerSpecification.value.SocklinerSpecificationID,
        Front: pfcItemSocklinerSpecification.value.Front,
        Back: pfcItemSocklinerSpecification.value.Back,
        Size: pfcItemSocklinerSpecification.value.Size,
        TableRow1: JSON.stringify(arrTableRow1.value),
        TableRow2: JSON.stringify(arrTableRow2.value),
    };
    // console.log(itemSocklinerSpecification)
    if (titleDialogForm2.value === "ADD NEW ITEM SOCKLINER SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {

            }
            await insertItemPFCSocklinerSpecification(itemSocklinerSpecification);
            const { res, _ } = await getPFCItemSocklinerSpecification(pfcSocklinerSpecification.value)
            arrItemSocklinerSpecification.value = res.data.data;
            success("Insert new Item SOCKLINER SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM SOCKLINER SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
            }
            await updatePFCItemSocklinerSpecification(itemSocklinerSpecification)
            const { res, _ } = await getPFCItemSocklinerSpecification(pfcSocklinerSpecification.value)
            arrItemSocklinerSpecification.value = res.data.data;
            success("Insert new Item SOCKLINER SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
    // console.log("TableRow1", TableRow1)
}
</script>

<style scoped></style>