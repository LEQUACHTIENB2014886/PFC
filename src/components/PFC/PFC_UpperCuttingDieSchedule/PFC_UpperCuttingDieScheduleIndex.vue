<template>
    <div style="overflow: auto; height: 80vh; width: 100%;">
        <el-col :span="24">
            <h4 style="width: 100%; text-align: center;">Upper Cutting Die Schedule</h4>

            <div style="display: flex; justify-content: space-between;">
                <div style="margin-left:35px">
                    <el-button class="btn-add" type="primary" plain size="small"
                        @click="btnAddNewUpperCuttingDieSchedule">Add
                        New Page
                        Upper Cutting Die Schedule</el-button>

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
                <el-table :data="filterTableData" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="PageIndex" label="Page Index" width="100" />
                    <el-table-column prop="ModelType" label="Model Type" width="220" />
                    <el-table-column prop="ModelName" label="Model Name" width="220" />
                    <el-table-column prop="MaterialNumber" label="Material Number" width="180" />
                    <el-table-column prop="ComponentName" label="Component Name" />
                    <el-table-column align="right" width="180">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" @click="btnEditUpperCuttingDieSchedule(scope.$index, scope.row)"
                                style="width: 100px; height: 30px;">
                                Edit
                            </el-button>
                            <br />
                            <el-button size="small" type="warning" @click="handleItem(scope.$index, scope.row)"
                                style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                                Item
                            </el-button>
                            <br />
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                                style="width: 100px; height: 30px;">
                                Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>

        <el-dialog v-model="dialogFormVisible" :title="titleDialogUpperCuttingDieSchedule" width="45vw"
            :close-on-click-modal="false" @close="dialogFormVisible = false">
            <el-form style="width: 40vw" :model="upperCuttingDieSchedule" label-width="auto" label-position="right"
                size="default">
                <el-form-item label="Page Index: ">
                    <el-input v-model="upperCuttingDieSchedule.PageIndex" :disabled="true" />
                </el-form-item>
                <el-form-item label="Model Type: ">
                    <el-input v-model="upperCuttingDieSchedule.ModelType" :disabled="true" />
                </el-form-item>
                <el-form-item label="Model Name: ">
                    <el-input v-model="upperCuttingDieSchedule.ModelName" :disabled="true" />
                </el-form-item>
                <el-form-item label="Material Number: ">
                    <el-input v-model="upperCuttingDieSchedule.MaterialNumber" :disabled="true" />
                </el-form-item>
                <el-form-item label="Component Name: ">
                    <el-input v-model="upperCuttingDieSchedule.ComponentName" />
                </el-form-item>
                <el-form-item label=" ">
                    <el-col>
                        <el-card shadow="always" class="dark-mode">
                            <el-col style="text-align: center; align-content: center;">
                                <el-upload :show-file-list="false" :on-change="handleChange_Remark"
                                    :http-request="customUpload_Remark" :before-upload="checkTypeFileUpload">
                                    <img v-if="imageUrl_Remark" :src="imageUrl_Remark" />
                                    <el-icon v-else>
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                                <el-button v-if="imageUrl_Remark" type="danger" icon="Delete" class="delete-button"
                                    @click="handleDelete_Remark" size="small">
                                </el-button>
                                <h5 style="margin-top: 10px;">Image Remark</h5>
                            </el-col>
                        </el-card>
                    </el-col>
                </el-form-item>
                <el-form-item label="Remark: ">
                    <el-input v-model="upperCuttingDieSchedule.Remark" type="textarea" :rows="5" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="confirmInsert">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogItemFormVisible" title="Item Page Upper Cutting Die Schedule" width="80vw"
            :close-on-click-modal="false" @close="dialogItemFormVisible = false" style="min-height: 60vh;">
            <el-button class="btn-add" type="primary" plain size="small"
                @click="btnAddItemUpperCuttingDieSchedule">Add</el-button>
            <el-table :data="filterTableDataItemUpperCuttingDieSchedule" style="width: 100%">
                <el-table-column label="Index" prop="ItemIndex" width="150" />
                <el-table-column label="Component Name" prop="ComponentName" />
                <el-table-column label="SizeRange1" prop="SizeRange1" width="150" />
                <el-table-column label="SizeRange2" prop="SizeRange2" width="150" />
                <el-table-column label="SizeRange" prop="SizeRange" width="150" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemUpperCuttingDieSchedule(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <el-button size="small" type="danger"
                            @click="handleDeleteItemUpperCuttingDieSchedule(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog v-model="dialogAddItemFormVisible" :title="titleDialogItemUpperCuttingDieSchedule" width="45svw"
            :close-on-click-modal="false" @close="">
            <el-form style="width: 40vw" :model="upperCuttingDieSchedule" label-width="auto" label-position="right"
                size="default">
                <el-form-item label="Page Index:">
                    <el-select v-model="itemUpperCuttingDieSchedule.ItemIndex" clearable placeholder="Select">
                        <el-option v-for="item in pageIndex" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Component name: ">
                    <el-input v-model="itemUpperCuttingDieSchedule.ComponentName" />
                </el-form-item>
                <el-form-item label="Size range 1: ">
                    <el-select v-model="itemUpperCuttingDieSchedule.SizeRange1" clearable placeholder="Select">
                        <el-option v-for="item in SizeRange" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Size range 2: ">
                    <el-select v-model="itemUpperCuttingDieSchedule.SizeRange2" clearable placeholder="Select">
                        <el-option v-for="item in SizeRange" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Size range: ">
                    <el-select v-model="itemUpperCuttingDieSchedule.SizeRange" clearable placeholder="Select">
                        <el-option v-for="item in optionIDS" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Size range are same: ">
                    <el-input-tag v-model="SizeRangeAreSame" :trigger="trigger" />
                </el-form-item>
                <el-form-item label=" ">
                    <el-col>
                        <el-card shadow="always" class="dark-mode">
                            <el-col style="text-align: center; align-content: center;">
                                <el-upload :show-file-list="false" :on-change="handleChange_ImageContent"
                                    :http-request="customUpload_ImageContent" :before-upload="checkTypeFileUpload">
                                    <img v-if="imageUrl_ImageContent" :src="imageUrl_ImageContent" />
                                    <el-icon v-else>
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                                <el-button v-if="imageUrl_ImageContent" type="danger" icon="Delete" class="delete-button"
                                    @click="handleDelete_ImageContent" size="small">
                                </el-button>
                                <h5 style="margin-top: 10px;">Image Content</h5>
                            </el-col>
                        </el-card>
                    </el-col>
                </el-form-item>
                <el-form-item label=" ">
                    <el-col>
                        <el-card shadow="always" class="dark-mode">
                            <el-col style="text-align: center; align-content: center;">
                                <el-upload :show-file-list="false" :on-change="handleChange_ImageRemark"
                                    :http-request="customUpload_ImageRemark" :before-upload="checkTypeFileUpload">
                                    <img v-if="imageUrl_ImageRemark" :src="imageUrl_ImageRemark" />
                                    <el-icon v-else>
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                                <el-button v-if="imageUrl_ImageRemark" type="danger" icon="Delete" class="delete-button"
                                    @click="handleDelete_ImageRemark" size="small">
                                </el-button>
                                <h5 style="margin-top: 10px;">Image Remark</h5>
                            </el-col>
                        </el-card>
                    </el-col>
                </el-form-item>
                <el-form-item label="Number of Layers: ">
                    <el-input v-model="itemUpperCuttingDieSchedule.NumberOfPlayers" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogAddItemFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="confirmInsertPFCItemUpperCuttingDieSchedule">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, reactive, ref } from 'vue'
import { UpperCuttingDieSchedule, ItemUpperCuttingDieSchedule } from '@/interfaces/UpperCuttingDieSchedule';
import { error, success, info } from "@/utils/NotificationsView"
import { ElMessageBox, UploadProps } from 'element-plus';
import { ElLoading } from "element-plus";
import Model from '@/interfaces/Model';
import { usePFCStore } from "@/stores/PFCStore";
import {
    pageIndex,
    SizeRange,
    getPFCUpperCuttingDieSchedule,
    insertPFCUpperCuttingDieSchedule,
    uploadFilePFCUpperCuttingDieSchedule,
    deleteUpperCuttingDieSchedule,
    insertNewItemUpperCuttingDieSchedule,
    updatePFCUpperCuttingDieSchedule,
    getAllPFCItemUpperCuttingDieSchedule,
    updateItemUpperCuttingDieSchedule,
    deletePFCItemUpperCuttingDieSchedule,
} from "@/hooks/PFC/useUpperCuttingDieSchedule"
import { optionIDS } from "@/utils/PFC/CoverSheet"
import { getURLImage } from "@/utils/PFC/ExcelFunction"
import {
    deleteFilePFCModelFromFolderPFCModel,
    uploadFilePFCModelFromFolderPFCModel,
} from "@/hooks/PFC/usePFC"

const trigger = ref<'Enter' | 'Space'>('Space')
const loading = ref(null);
const dialogFormVisible = ref(false)
const dialogItemFormVisible = ref(false)
const dialogAddItemFormVisible = ref(false)
const store = usePFCStore();
const formData_Remark = new FormData();
const formData_ImageRemark = new FormData();
const formData_ImageContent = new FormData();
const tableData = ref([])
const tableDataItemUpperCuttingDieSchedule = ref([])
const rowUpperCuttingDieScheduleSelected = ref('')
const isShowImageRemark = ref(true)
const titleDialogUpperCuttingDieSchedule = ref('New Page Upper Cutting Die Schedule')
const titleDialogItemUpperCuttingDieSchedule = ref('New Item Upper Cutting Die Schedule')
const upperCuttingDieSchedule = reactive<UpperCuttingDieSchedule>({
    UpperCuttingDieScheduleID: "",
    ModelType: "",
    ModelName: "",
    MaterialNumber: "",
    ComponentName: "",
    ImageRemark: "",
    Remark: "",
    PageIndex: "",
    ItemsUpperCuttingDieSchedule: [],
});
const itemUpperCuttingDieSchedule = reactive<ItemUpperCuttingDieSchedule>({
    ItemUpperCuttingDieScheduleID: "",
    UpperCuttingDieScheduleID: "",
    ComponentName: "",
    ItemIndex: "",
    SizeRange1: "",
    SizeRange2: "",
    SizeRange: "",
    SizeRangeAreSame: "",
    ImageContent: "",
    ImageRemark: "",
    IsShowImageRemark: "",
    NumberOfPlayers: "",
});
const SizeRangeAreSame = ref([])
const imageUrl_Remark = ref('')
const oldImageUrl_Remark = ref('')
const imageUrl_ImageRemark = ref('')
const oldImageUrl_ImageRemark = ref('')
const imageUrl_ImageContent = ref('')
const oldImageUrl_ImageContent = ref('')
const search = ref('')
const search1 = ref('')
const filterTableData = computed(() => {
    if (!tableData.value || tableData.value.length === 0) {
        return [];
    }
    return tableData.value.filter(
        (data) =>
            !search.value ||
            data.ComponentName.toLowerCase().includes(search.value.toLowerCase())
    )
});

const filterTableDataItemUpperCuttingDieSchedule = computed(() => {
    if (!tableDataItemUpperCuttingDieSchedule.value || tableDataItemUpperCuttingDieSchedule.value.length === 0) {
        return [];
    }
    return tableDataItemUpperCuttingDieSchedule.value.filter(
        (data) =>
            !search1.value ||
            data.ComponentName.toLowerCase().includes(search1.value.toLowerCase())
    )
});

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

const reloadData = async () => {
    const { res, _ } = await getPFCUpperCuttingDieSchedule(model)
    tableData.value = res.data.data;
}

onMounted(async () => {
    showLoading()
    const storedRow = localStorage.getItem("selectedRow");
    if (storedRow) {
        Object.assign(model, JSON.parse(storedRow));
    } else {
        Object.assign(model, store.selectedRow);
    }
    try {
        await reloadData()
    } catch (err) {
        console.error(err)
    }
    hideLoading()
})

//===========Dia log Upper Cutting Die Schedule=============
const btnAddNewUpperCuttingDieSchedule = () => {
    titleDialogUpperCuttingDieSchedule.value = "New Page Upper Cutting Die Schedule"
    if (!tableData.value || tableData.value.length === 0) {
        upperCuttingDieSchedule.PageIndex = '1'
    } else {
        upperCuttingDieSchedule.PageIndex = `${tableData.value.length + 1}`
    }
    upperCuttingDieSchedule.ModelType = model.ModelType
    upperCuttingDieSchedule.ModelName = model.ModelName
    upperCuttingDieSchedule.MaterialNumber = model.MaterialNumber
    upperCuttingDieSchedule.ComponentName = ""
    upperCuttingDieSchedule.Remark = ""
    imageUrl_Remark.value = ""
    oldImageUrl_Remark.value = ""
    formData_Remark.delete("file")
    formData_Remark.delete("ModelName")
    dialogFormVisible.value = true;
}

const btnEditUpperCuttingDieSchedule = (index: number, row) => {
    formData_Remark.delete("file")
    formData_Remark.delete("ModelName")
    titleDialogUpperCuttingDieSchedule.value = "Edit Page Upper Cutting Die Schedule"
    Object.assign(upperCuttingDieSchedule, row);
    imageUrl_Remark.value = getURLImage(upperCuttingDieSchedule.ImageRemark, model);
    oldImageUrl_Remark.value = upperCuttingDieSchedule.ImageRemark.toString();
    dialogFormVisible.value = true;
}

const confirmInsert = async () => {
    dialogFormVisible.value = false
    showLoading()

    if (titleDialogUpperCuttingDieSchedule.value === "New Page Upper Cutting Die Schedule") {
        try {
            if (formData_Remark && formData_Remark.entries().next().value) {
                const { res, err } = await uploadFilePFCUpperCuttingDieSchedule(formData_Remark, model)
                upperCuttingDieSchedule.ImageRemark = res
            }
            upperCuttingDieSchedule.PageIndex = upperCuttingDieSchedule.PageIndex.toString()
            await insertPFCUpperCuttingDieSchedule(upperCuttingDieSchedule)
            await reloadData();
            success("Insert new page upper cutting die schedule successfully!")
        } catch (err) {
            error(err)
            hideLoading()
        }
    }

    if (titleDialogUpperCuttingDieSchedule.value === "Edit Page Upper Cutting Die Schedule") {
        try {
            if (formData_Remark && formData_Remark.entries().next().value) {
                if (oldImageUrl_Remark.value) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Remark.value, model)
                }

                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Remark, model)
                upperCuttingDieSchedule.ImageRemark = res
            } else {
                if (oldImageUrl_Remark.value && upperCuttingDieSchedule.ImageRemark === null) {
                    console.log(oldImageUrl_Remark)
                    console.log(upperCuttingDieSchedule.ImageRemark)
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Remark.value, model)
                }
            }
            upperCuttingDieSchedule.PageIndex = upperCuttingDieSchedule.PageIndex.toString()
            await updatePFCUpperCuttingDieSchedule(upperCuttingDieSchedule)
            await reloadData();
            success("Update page upper cutting die schedule successfully!")
        } catch (err) {
            error(err)
            hideLoading()
        }
    }

    hideLoading()
}


const confirmDeletePFCUpperCuttingDieSchedule = async (upperCuttingDieSchedule) => {
    showLoading()
    try {
        const { res, err } = await getAllPFCItemUpperCuttingDieSchedule(upperCuttingDieSchedule)
        if (res.data.data == null || res.data.data.length < 1) {
            if (upperCuttingDieSchedule.ImageRemark) {
                const { res, err } = await deleteFilePFCModelFromFolderPFCModel(upperCuttingDieSchedule.ImageRemark, model)
            }
            // await deletePFCItemUpperCuttingDieScheduleByModelID(model)
            await deleteUpperCuttingDieSchedule(upperCuttingDieSchedule)
            await reloadData()
            success("Delete Upper Cutting Die Schedule successfully!")
        } else {
            error("Please delete item upper cutting die schedule!")
        }
    } catch (err) {
        error(err)
    }
    hideLoading()
}
//=============End dia log Upper Cutting Die Schedule==============

//=============Page Item Upper Cutting Die Schedule================
const handleItem = async (index: number, row) => {
    itemUpperCuttingDieSchedule.UpperCuttingDieScheduleID = row.UpperCuttingDieScheduleID
    dialogItemFormVisible.value = true;
    await loadDataItemUpperCuttingDieSchedule(row);
    rowUpperCuttingDieScheduleSelected.value = row;
}

const loadDataItemUpperCuttingDieSchedule = async (row) => {
    showLoading();
    try {
        const { res, err } = await getAllPFCItemUpperCuttingDieSchedule(row)
        tableDataItemUpperCuttingDieSchedule.value = res.data.data
    } catch (err) {
        console.error(err);
    }
    hideLoading();
}

const btnAddItemUpperCuttingDieSchedule = () => {
    titleDialogItemUpperCuttingDieSchedule.value = "New Item Upper Cutting Die Schedule";
    if (!tableDataItemUpperCuttingDieSchedule.value || tableDataItemUpperCuttingDieSchedule.value.length === 0) {
        itemUpperCuttingDieSchedule.ItemIndex = '1';
    } else {
        itemUpperCuttingDieSchedule.ItemIndex = `${tableDataItemUpperCuttingDieSchedule.value.length + 1}`;
    }
    itemUpperCuttingDieSchedule.SizeRange = model.IDS;
    itemUpperCuttingDieSchedule.ComponentName = "";
    itemUpperCuttingDieSchedule.SizeRange1 = "";
    itemUpperCuttingDieSchedule.SizeRange2 = "";
    itemUpperCuttingDieSchedule.SizeRangeAreSame = "";
    itemUpperCuttingDieSchedule.ImageRemark = "";
    itemUpperCuttingDieSchedule.ImageContent = "";
    itemUpperCuttingDieSchedule.NumberOfPlayers = "";
    SizeRangeAreSame.value = [];
    formData_ImageContent.delete("file");
    formData_ImageRemark.delete("file");
    formData_ImageContent.delete("ModelName");
    formData_ImageRemark.delete("ModelName");
    imageUrl_ImageContent.value = "";
    imageUrl_ImageRemark.value = "";
    dialogAddItemFormVisible.value = true;
}

const btnEditItemUpperCuttingDieSchedule = (_index, row) => {
    titleDialogItemUpperCuttingDieSchedule.value = "Edit Item Upper Cutting Die Schedule"
    formData_ImageContent.delete("file");
    formData_ImageRemark.delete("file");
    formData_ImageContent.delete("ModelName");
    formData_ImageRemark.delete("ModelName");
    Object.assign(itemUpperCuttingDieSchedule, row);
    imageUrl_ImageContent.value = getURLImage(itemUpperCuttingDieSchedule.ImageContent, model);
    imageUrl_ImageRemark.value = getURLImage(itemUpperCuttingDieSchedule.ImageRemark, model);
    const arrSizeRangeAreSame = itemUpperCuttingDieSchedule.SizeRangeAreSame.split(",").map(item => item.trim()).filter(item => item !== "");;

    SizeRangeAreSame.value = arrSizeRangeAreSame;
    oldImageUrl_ImageRemark.value = itemUpperCuttingDieSchedule.ImageRemark.toString();
    oldImageUrl_ImageContent.value = itemUpperCuttingDieSchedule.ImageContent.toString();
    dialogAddItemFormVisible.value = true;
}

const confirmInsertPFCItemUpperCuttingDieSchedule = async () => {
    dialogAddItemFormVisible.value = false;
    showLoading()
    if (titleDialogItemUpperCuttingDieSchedule.value === "New Item Upper Cutting Die Schedule") {
        try {
            itemUpperCuttingDieSchedule.ItemIndex = itemUpperCuttingDieSchedule.ItemIndex.toString();
            itemUpperCuttingDieSchedule.SizeRangeAreSame = SizeRangeAreSame.value.toString();

            if (formData_ImageRemark && formData_ImageRemark.entries().next().value) {
                const { res, err } = await uploadFilePFCUpperCuttingDieSchedule(formData_ImageRemark, model)
                itemUpperCuttingDieSchedule.ImageRemark = res
            }

            if (formData_ImageContent && formData_ImageContent.entries().next().value) {
                const { res, err } = await uploadFilePFCUpperCuttingDieSchedule(formData_ImageContent, model)
                itemUpperCuttingDieSchedule.ImageContent = res
            }
            await insertNewItemUpperCuttingDieSchedule(itemUpperCuttingDieSchedule)
            await loadDataItemUpperCuttingDieSchedule(rowUpperCuttingDieScheduleSelected.value);
            success("Insert new item upper cutting die schedule successfully!")
        } catch (err) {
            error(err)
        }
    }

    if (titleDialogItemUpperCuttingDieSchedule.value === "Edit Item Upper Cutting Die Schedule") {
        try {
            itemUpperCuttingDieSchedule.ItemIndex = itemUpperCuttingDieSchedule.ItemIndex.toString();
            itemUpperCuttingDieSchedule.SizeRangeAreSame = SizeRangeAreSame.value.toString();


            if (formData_ImageRemark && formData_ImageRemark.entries().next().value) {
                if (oldImageUrl_ImageRemark.value) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_ImageRemark.value, model)
                }

                const { res, err } = await uploadFilePFCUpperCuttingDieSchedule(formData_ImageRemark, model)
                itemUpperCuttingDieSchedule.ImageRemark = res
            } else {
                if (oldImageUrl_ImageRemark.value && itemUpperCuttingDieSchedule.ImageRemark === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_ImageRemark.value, model)
                }
            }

            if (formData_ImageContent && formData_ImageContent.entries().next().value) {
                if (oldImageUrl_ImageContent.value) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_ImageContent.value, model)
                }

                const { res, err } = await uploadFilePFCUpperCuttingDieSchedule(formData_ImageContent, model)
                itemUpperCuttingDieSchedule.ImageContent = res
            } else {
                if (oldImageUrl_ImageContent.value && itemUpperCuttingDieSchedule.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_ImageContent.value, model)
                }
            }
            await updateItemUpperCuttingDieSchedule(itemUpperCuttingDieSchedule)
            await loadDataItemUpperCuttingDieSchedule(rowUpperCuttingDieScheduleSelected.value);
            success("Edit new item upper cutting die schedule successfully!")
        } catch (err) {
            error(err)
        }
    }

    hideLoading()
}

const handleDeleteItemUpperCuttingDieSchedule = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the component name: "${row.ComponentName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            await deleteItemUpperCuttingDieSchedule(row);
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const deleteItemUpperCuttingDieSchedule = async (itemUpperCuttingDieSchedule) => {
    showLoading();
    try {
        if (itemUpperCuttingDieSchedule.ImageRemark) {
            await deleteFilePFCModelFromFolderPFCModel(itemUpperCuttingDieSchedule.ImageRemark, model)
        }

        if (itemUpperCuttingDieSchedule.ImageContent) {
            await deleteFilePFCModelFromFolderPFCModel(itemUpperCuttingDieSchedule.ImageContent, model)
        }

        await deletePFCItemUpperCuttingDieSchedule(itemUpperCuttingDieSchedule)
        await loadDataItemUpperCuttingDieSchedule(itemUpperCuttingDieSchedule)
        success("Delete successfully!")
    } catch (err) {
        error(err);
    }
    hideLoading();
}
//=============End Page Item Upper Cutting Die Schedule================

const handleDelete = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the component name: "${row.ComponentName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            await confirmDeletePFCUpperCuttingDieSchedule(row);
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row,
    rowIndex: number
}) => {
    if (rowIndex === 1) {
        return 'warning-row'
    } else if (rowIndex === 3) {
        return 'success-row'
    }
    return ''
}

const handleChange_Remark = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_Remark.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_Remark = (options) => {
    const { file, onSuccess, onError } = options
    formData_Remark.delete("file")
    formData_Remark.delete("ModelName")
    formData_Remark.append("file", file);
}

const handleDelete_Remark = () => {
    imageUrl_Remark.value = null;
    upperCuttingDieSchedule.ImageRemark = null;
    formData_Remark.delete("file");
    formData_Remark.delete("ModelName");
};

const handleChange_ImageRemark = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_ImageRemark.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_ImageRemark = (options) => {
    const { file, onSuccess, onError } = options
    formData_ImageRemark.delete("file")
    formData_ImageRemark.delete("ModelName")
    formData_ImageRemark.append("file", file);
}

const handleDelete_ImageRemark = () => {
    imageUrl_ImageRemark.value = null;
    itemUpperCuttingDieSchedule.ImageRemark = null;
    formData_ImageRemark.delete("file");
    formData_ImageRemark.delete("ModelName");
};

const handleChange_ImageContent = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_ImageContent.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_ImageContent = (options) => {
    const { file, onSuccess, onError } = options
    formData_ImageContent.delete("file")
    formData_ImageContent.delete("ModelName")
    formData_ImageContent.append("file", file);
}

const handleDelete_ImageContent = () => {
    imageUrl_ImageContent.value = null;
    itemUpperCuttingDieSchedule.ImageContent = null;
    formData_ImageContent.delete("file");
    formData_ImageContent.delete("ModelName");
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

const cancelFormItemUpperCuttingDieSchedule = () => {
    dialogAddItemFormVisible.value = false
}

</script>
