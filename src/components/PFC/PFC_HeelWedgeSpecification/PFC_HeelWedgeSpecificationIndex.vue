<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">HEEL WEDGE SPECIFICATION</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">

                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewHeelWedgeSpecification">
                    ADD NEW HEEL WEDGE SPECIFICATION
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
                        <el-button size="small" @click="btnUpdatePFCHeelWedgeSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCHeelWedgeSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCHeelWedgeSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcHeelWedgeSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcHeelWedgeSpecification.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcHeelWedgeSpecification.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcHeelWedgeSpecification.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcHeelWedgeSpecification.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcHeelWedgeSpecification.Title" />
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
                ITEM HEEL WEDGE SPECIFICATION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewHeelWedgeSpecification">
            ADD NEW ITEM HEEL WEDGE SPECIFICATION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="HEEL WEDGE SPECIFICATION">
                    <template #default="{ row }">
                        {{ pfcHeelWedgeSpecification.Title }}
                    </template>
                </el-table-column>

                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewHeelWedgeSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewHeelWedgeSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="90vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <!-- TableRow1 -->
        <el-form style="width:85vw" :model="pfcItemHeelWedgeSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <el-col>
                    <el-table v-click-outside="handleClickOutside" :data="arrTableRow1" :row-style="{ height: '30px' }"
                        border>
                        <el-table-column align="center" prop="arrTableRow1.No" label="No" width="100">
                            <template #default="{ row }">
                                <div v-if="!row.editingNo" @click="enableEdit(row, 'No')" style="min-height: 20px; ">
                                    {{ row.No }}
                                </div>
                                <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrTableRow1.Section" label="Section 部件Chi tiết">
                            <template #default="{ row }">
                                <div v-if="!row.editingSection" @click="enableEdit(row, 'Section')"
                                    style="min-height: 20px; ">
                                    {{ row.Section }}
                                </div>
                                <el-input v-else v-model="row.Section" @blur="disableEdit(row, 'Section')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrTableRow1.Mold" label="Mold" width="180">
                            <template #default="{ row }">
                                <div v-if="!row.editingMold" @click="enableEdit(row, 'Mold')" style="min-height: 20px;">
                                    {{ row.Mold }}
                                </div>
                                <el-input v-else v-model="row.Mold" @blur="disableEdit(row, 'Mold')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrTableRow1.Material" label="Material 材料 Vật tư" width="180">
                            <template #default="{ row }">
                                <div v-if="!row.editingMaterial" @click="enableEdit(row, 'Material')"
                                    style="min-height: 20px;">
                                    {{ row.Material }}
                                </div>
                                <el-input v-else v-model="row.Material" @blur="disableEdit(row, 'Material')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.Hardness" label="Hardness 硬度Độ cứng" width="180">
                            <template #default="{ row }">
                                <div v-if="!row.editingHardness" @click="enableEdit(row, 'Hardness')"
                                    style="min-height: 20px;">
                                    {{ row.Hardness }}
                                </div>
                                <el-input v-else v-model="row.Hardness" @blur="disableEdit(row, 'Hardness')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.SG" label="S.G.(G/CC)" width="180">
                            <template #default="{ row }">
                                <div v-if="!row.editingSG" @click="enableEdit(row, 'SG')" style="min-height: 20px;">
                                    {{ row.SG }}
                                </div>
                                <el-input v-else v-model="row.SG" @blur="disableEdit(row, 'SG')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.MCS" label="MCS #" width="180">
                            <template #default="{ row }">
                                <div v-if="!row.editingMCS" @click="enableEdit(row, 'MCS')" style="min-height: 20px;">
                                    {{ row.MCS }}
                                </div>
                                <el-input v-else v-model="row.MCS" @blur="disableEdit(row, 'MCS')" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-form-item>
        </el-form>
        <!-- TableRow1 -->
        <el-form style="width:85vw" :model="pfcItemHeelWedgeSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <div style="display: flex;">
                    <!-- Cột 1 -->
                    <div style="width: 25vw;">
                        <h3 style="text-align: center; ">
                        </h3>
                        <div style="height: 500px;  ">
                            <el-form-item label="Thickness 厚度 Độ dày: ">
                                <el-input v-model="pfcItemHeelWedgeSpecification.Thickness" style="width: 150px;" />
                            </el-form-item>
                        </div>
                    </div>

                    <!-- Cột 2 -->
                    <div style="width: 25vw; border: 1px solid rgb(235, 238, 245);">
                        <h3 style="text-align: center; ">
                        </h3>
                        <div
                            style="height: 500px; border: 1px solid rgb(235, 238, 245); background: rgba(185, 174, 174, 0.349);">
                        </div>
                    </div>

                    <!-- Cột 3 -->
                    <div style="width: 25vw; ">
                        <h3 style="text-align: center; ">
                        </h3>
                        <div style="height: 500px;">
                        </div>
                    </div>
                </div>
            </el-form-item>
        </el-form>


        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemHeelWedgeSpecification">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemHeelWedgeSpecification, deletePFCHeelWedgeSpecification, getPFCItemHeelWedgeSpecification, getPFCHeelWedgeSpecificationByModelID, insertItemPFCHeelWedgeSpecification, insertPFCHeelWedgeSpecification, updatePFCItemHeelWedgeSpecification, updatePFCHeelWedgeSpecification } from '@/hooks/PFC/useHeelWedgeSpecification';
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
    (arrItemHeelWedgeSpecification.value || []).filter(
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
const titleDialogForm1 = ref("ADD NEW HEEL WEDGE SPECIFICATION")
const titleDialogForm2 = ref("ADD NEW ITEM HEEL WEDGE SPECIFICATION")
const pfcHeelWedgeSpecification = ref({} as Record<string, any>)
const pfcItemHeelWedgeSpecification = ref({} as Record<string, any>)
const arrItemHeelWedgeSpecification = ref([]);

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
    const { res, _ } = await getPFCHeelWedgeSpecificationByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewHeelWedgeSpecification = () => {
    titleDialogForm1.value = "ADD NEW HEEL WEDGE SPECIFICATION"
    pfcHeelWedgeSpecification.value = {};
    pfcHeelWedgeSpecification.value.ModelType = pfcModel.value.ModelType
    pfcHeelWedgeSpecification.value.ModelName = pfcModel.value.ModelName
    pfcHeelWedgeSpecification.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcHeelWedgeSpecification.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW HEEL WEDGE SPECIFICATION") {
        try {
            await insertPFCHeelWedgeSpecification(pfcHeelWedgeSpecification.value)
            success("Insert new HEEL WEDGE SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE HEEL WEDGE SPECIFICATION") {
        try {
            await updatePFCHeelWedgeSpecification(pfcHeelWedgeSpecification.value)
            success("Update HEEL WEDGE SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCHeelWedgeSpecification = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemHeelWedgeSpecification(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCHeelWedgeSpecification(row);
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

const btnUpdatePFCHeelWedgeSpecification = async (index: number, row) => {
    pfcHeelWedgeSpecification.value = {};
    pfcHeelWedgeSpecification.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE HEEL WEDGE SPECIFICATION"
    dialogForm1Visible.value = true;
}

const btnItemPFCHeelWedgeSpecification = async (index: number, row) => {
    showLoading();
    pfcHeelWedgeSpecification.value = {};
    pfcHeelWedgeSpecification.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemHeelWedgeSpecification(pfcHeelWedgeSpecification.value)
    arrItemHeelWedgeSpecification.value = res.data.data ? res.data.data : [];
    // console.log(pfcHeelWedgeSpecification.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewHeelWedgeSpecification = async () => {
    titleDialogForm2.value = "ADD NEW ITEM HEEL WEDGE SPECIFICATION";
    pfcItemHeelWedgeSpecification.value = {};
    pfcItemHeelWedgeSpecification.value.HeelWedgeSpecificationID = pfcHeelWedgeSpecification.value.HeelWedgeSpecificationID;
    arrTableRow1.value = Array.from({ length: 1 }, (_, i) => ({
        No: "",
        Section: "",
        Material: "",
        Hardness: "",
        SG: "",
        MCS: ""
    }));

    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    // imageUrl_Content.value = null;
    // oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewHeelWedgeSpecification = async (index: number, row) => {
    pfcItemHeelWedgeSpecification.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Images.toString();

    try {
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 1 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrTableRow1.value = Array.from({ length: 1 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.ImagesImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM HEEL WEDGE SPECIFICATION";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewHeelWedgeSpecification = async (index: number, row) => {
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
            await deletePFCItemHeelWedgeSpecification(row);
            const { res, _ } = await getPFCItemHeelWedgeSpecification(pfcHeelWedgeSpecification.value)
            arrItemHeelWedgeSpecification.value = res.data.data;
            success("Delete PFC Item HEEL WEDGE SPECIFICATION successfully!")
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
    row.editingSection = false;
    row.editingMaterial = false;
    row.editingHardness = false;
    row.editingSG = false;
    row.editingMCS = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};
const handleClickOutside = (event) => {
    arrTableRow1.value.forEach((row) => {
        row.editingNo = false;
        row.editingSection = false;
        row.editingMaterial = false;
        row.editingHardness = false;
        row.editingSG = false;
        row.editingMCS = false;
    });
};

const btnConfirmItemHeelWedgeSpecification = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    const itemHeelWedgeSpecification = {
        ItemHeelWedgeSpecificationID: pfcItemHeelWedgeSpecification.value.ItemHeelWedgeSpecificationID,
        HeelWedgeSpecificationID: pfcItemHeelWedgeSpecification.value.HeelWedgeSpecificationID,
        Thickness: pfcItemHeelWedgeSpecification.value.Thickness,
        // ImagesContent: pfcItemHeelWedgeSpecification.value.ImagesContent,
        TableRow1: JSON.stringify(arrTableRow1.value),
    };
    // console.log(itemHeelWedgeSpecification)
    if (titleDialogForm2.value === "ADD NEW ITEM HEEL WEDGE SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {

            }
            await insertItemPFCHeelWedgeSpecification(itemHeelWedgeSpecification);
            const { res, _ } = await getPFCItemHeelWedgeSpecification(pfcHeelWedgeSpecification.value)
            arrItemHeelWedgeSpecification.value = res.data.data;
            success("Insert new Item HEEL WEDGE SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM HEEL WEDGE SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
            }
            await updatePFCItemHeelWedgeSpecification(itemHeelWedgeSpecification)
            const { res, _ } = await getPFCItemHeelWedgeSpecification(pfcHeelWedgeSpecification.value)
            arrItemHeelWedgeSpecification.value = res.data.data;
            success("Insert new Item HEEL WEDGE SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
    // console.log("TableRow1", TableRow1)
}
</script>

<style scoped></style>