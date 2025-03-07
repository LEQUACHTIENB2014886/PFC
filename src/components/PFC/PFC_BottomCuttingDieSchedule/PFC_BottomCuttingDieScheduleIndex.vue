<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">BOTTOM CUTTING DIE SCHEDULE</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewBottomCuttingDieSchedule">
                    ADD NEW BOTTOM CUTTING DIE SCHEDULE
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
                        <el-button size="small" @click="btnUpdatePFCBottomCuttingDieSchedule(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCBottomCuttingDieSchedule(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCBottomCuttingDieSchedule(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcBottomCuttingDieSchedule" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcBottomCuttingDieSchedule.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcBottomCuttingDieSchedule.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcBottomCuttingDieSchedule.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcBottomCuttingDieSchedule.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcBottomCuttingDieSchedule.Title" />
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
                ITEM BOTTOM CUTTING DIE SCHEDULE
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewBottomCuttingDieSchedule">
            ADD NEW ITEM BOTTOM CUTTING DIE SCHEDULE
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />

                <el-table-column prop="Component" label="Component" />
                <el-table-column prop="Remarks" label="Remarks" />
                <el-table-column prop="NumberOfLayers" label="NumberOfLayers" />
                <el-table-column prop="Thickness" label="Thickness" />
                <el-table-column prop="Width" label="Width" />
                <el-table-column prop="Hardness" label="Hardness" />
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewBottomCuttingDieSchedule(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewBottomCuttingDieSchedule(scope.$index, scope.row)"
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
        <el-form style="width: 85vw" :model="pfcItemBottomCuttingDieSchedule" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemBottomCuttingDieSchedule.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Component: ">
                <el-input v-model="pfcItemBottomCuttingDieSchedule.Component" />
            </el-form-item>
            <el-form-item label="Size range 1: ">
                <el-select v-model="pfcItemBottomCuttingDieSchedule.SizeRange1" clearable placeholder="Select">
                    <el-option v-for="item in optionSizeRangeValueG" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="Size range 2: ">
                <el-select v-model="pfcItemBottomCuttingDieSchedule.SizeRange2" clearable placeholder="Select">
                    <el-option v-for="item in optionSizeRangeValueG" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="Size range: ">
                <el-select v-model="pfcItemBottomCuttingDieSchedule.SizeRange" clearable placeholder="Select">
                    <el-option v-for="item in optionSizeRangeValueT" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="Size range are same: ">
                <el-input-tag v-model="pfcItemBottomCuttingDieSchedule.SizeRangeAreSame" :trigger="trigger" />
            </el-form-item>

            <el-form-item label=" ">
                <el-col>
                    <el-card shadow="always" class="dark-mode">
                        <el-col style="text-align: center; align-content: center;">
                            <el-upload :show-file-list="false" :on-change="handleChange_Remark"
                                :http-request="customUpload_Remark" :before-upload="checkTypeFileUpload">
                                <img v-if="imageUrl_Content" :src="imageUrl_Content" />
                                <el-icon v-else>
                                    <Plus />
                                </el-icon>
                            </el-upload>
                            <el-button v-if="imageUrl_Content" type="danger" icon="Delete" class="delete-button"
                                @click="handleDelete_Remark" size="small">
                            </el-button>
                            <h5 style="margin-top: 10px;">Image Content</h5>
                        </el-col>
                    </el-card>
                </el-col>
            </el-form-item>
            <el-form-item label="Remarks: ">
                <el-input v-model="pfcItemBottomCuttingDieSchedule.Remarks" />
            </el-form-item>
            <el-form-item label="NumberOfLayers: ">
                <el-input v-model="pfcItemBottomCuttingDieSchedule.NumberOfLayers" />
            </el-form-item>
            <el-form-item label="Thickness: ">
                <el-input v-model="pfcItemBottomCuttingDieSchedule.Thickness" />
            </el-form-item>
            <el-form-item label="Width: ">
                <el-input v-model="pfcItemBottomCuttingDieSchedule.Width" />
            </el-form-item>
            <el-form-item label="Hardness: ">
                <el-input v-model="pfcItemBottomCuttingDieSchedule.Hardness" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemBottomCuttingDieSchedule">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemBottomCuttingDieSchedule, deletePFCBottomCuttingDieSchedule, getPFCItemBottomCuttingDieSchedule, getPFCBottomCuttingDieScheduleByModelID, insertItemPFCBottomCuttingDieSchedule, insertPFCBottomCuttingDieSchedule, updatePFCItemBottomCuttingDieSchedule, updatePFCBottomCuttingDieSchedule } from '@/hooks/PFC/useBottomCuttingDieSchedule';
import { deleteFilePFCModelFromFolderPFCModel, uploadFilePFCModelFromFolderPFCModel } from '@/hooks/PFC/usePFC';
import { getURLImage } from '@/hooks/useHome';
import { usePFCStore } from '@/stores/PFCStore';
import { hideLoading, showLoading } from '@/utils/LoadingView';
import { error, info, success } from '@/utils/NotificationsView';
import { ElMessageBox, UploadProps } from 'element-plus';
import { computed, onMounted, ref } from 'vue';

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

const filterTableData1 = computed(() => {
    return Array.isArray(arrItemBottomCuttingDieSchedule.value)
        ? arrItemBottomCuttingDieSchedule.value.filter(data =>
            !search1.value || data.Component.toLowerCase().includes(search1.value.toLowerCase())
        )
        : [];
});

const tableData = ref([]);

const SizeRangeValueG = 7;
const optionSizeRangeValueG = ref(
    Array.from({ length: SizeRangeValueG }, (_, i) => {
        const num = i + 1;
        return [
            { label: `${num}G`, value: `${num}G` }
        ]
    }).flat()
);

const SizeRangeValueT = 18;
const optionSizeRangeValueT = ref(
    Array.from({ length: SizeRangeValueT }, (_, i) => {
        const num = i + 1;
        return [
            { label: `${num}`, value: `${num}` },
            { label: `${num}T`, value: `${num}T` }
        ]
    }).flat()
);

const pfcItemBottomCuttingDieSchedule = ref({
    SizeRange1: "",
    SizeRange2: "",
    SizeRange: ""
} as Record<string, any>);

const SizeRangeAreSame = ref([]);

const trigger = ref("enter");

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW BOTTOM CUTTING DIE SCHEDULE")
const titleDialogForm2 = ref("ADD NEW ITEM BOTTOM CUTTING DIE SCHEDULE")
const pfcBottomCuttingDieSchedule = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemBottomCuttingDieSchedule = ref([]);

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
    const { res, _ } = await getPFCBottomCuttingDieScheduleByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewBottomCuttingDieSchedule = () => {
    titleDialogForm1.value = "ADD NEW BOTTOM CUTTING DIE SCHEDULE"
    pfcBottomCuttingDieSchedule.value = {};
    pfcBottomCuttingDieSchedule.value.ModelType = pfcModel.value.ModelType
    pfcBottomCuttingDieSchedule.value.ModelName = pfcModel.value.ModelName
    pfcBottomCuttingDieSchedule.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcBottomCuttingDieSchedule.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW BOTTOM CUTTING DIE SCHEDULE") {
        try {
            await insertPFCBottomCuttingDieSchedule(pfcBottomCuttingDieSchedule.value)
            success("Insert new BOTTOM CUTTING DIE SCHEDULE successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE BOTTOM CUTTING DIE SCHEDULE") {
        try {
            await updatePFCBottomCuttingDieSchedule(pfcBottomCuttingDieSchedule.value)
            success("Update BOTTOM CUTTING DIE SCHEDULE successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCBottomCuttingDieSchedule = async (index: number, row) => {
    try {
        await ElMessageBox.confirm(
            `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        );
        showLoading();
        const { res, error: getError } = await getPFCItemBottomCuttingDieSchedule(row);
        if (getError) {
            console.error("Error in getPFCItemBottomCuttingDieSchedule:", getError);
            error("Error occurred while fetching item details!");
            hideLoading();
            return;
        }
        const items = res.data.data || [];
        if (items.length > 0) {
            error("Please delete Item BOTTOM CUTTING DIE SCHEDULE!");
        } else {
            const { res: delRes, error: delError } = await deletePFCBottomCuttingDieSchedule(row);
            if (delError) {
                console.error("Error in deletePFCBottomCuttingDieSchedule:", delError);
                error("Error occurred while deleting record!");
            } else {
                await reloadData();
                success("Delete BOTTOM CUTTING DIE SCHEDULE successfully!");
            }
        }
        hideLoading();
    } catch (e) {
        console.error("Detailed error:", e);
        info('Cancel delete!');
        hideLoading();
    }
}

const btnUpdatePFCBottomCuttingDieSchedule = async (index: number, row) => {
    pfcBottomCuttingDieSchedule.value = {};
    pfcBottomCuttingDieSchedule.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE BOTTOM CUTTING DIE SCHEDULE"
    dialogForm1Visible.value = true;
}

const btnItemPFCBottomCuttingDieSchedule = async (index: number, row) => {
    showLoading();
    pfcBottomCuttingDieSchedule.value = {};
    pfcBottomCuttingDieSchedule.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemBottomCuttingDieSchedule(pfcBottomCuttingDieSchedule.value)
    pfcBottomCuttingDieSchedule.value.BottomCuttingDieScheduleID = pfcBottomCuttingDieSchedule.value.BottomCuttingDieScheduleID
    arrItemBottomCuttingDieSchedule.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewBottomCuttingDieSchedule = () => {
    titleDialogForm2.value = "ADD NEW ITEM BOTTOM CUTTING DIE SCHEDULE";
    pfcItemBottomCuttingDieSchedule.value = {};
    if (!Array.isArray(arrItemBottomCuttingDieSchedule.value)) {
        arrItemBottomCuttingDieSchedule.value = [];
    }
    pfcItemBottomCuttingDieSchedule.value.ItemIndex = `${arrItemBottomCuttingDieSchedule.value.length + 1}`;
    pfcItemBottomCuttingDieSchedule.value.BottomCuttingDieScheduleID = pfcBottomCuttingDieSchedule.value.BottomCuttingDieScheduleID;
    SizeRangeAreSame.value = [];
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
};


const btnEditItemNewBottomCuttingDieSchedule = async (index, row) => {
    pfcItemBottomCuttingDieSchedule.value = { ...row }
    oldImageUrl_Content.value = row.ImageContent.toString()
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value)
    titleDialogForm2.value = "UPDATE ITEM BOTTOM CUTTING DIE SCHEDULE"
    const arrSizeRange = pfcItemBottomCuttingDieSchedule.value.SizeRangeAreSame;
    pfcItemBottomCuttingDieSchedule.value.SizeRangeAreSame = arrSizeRange.split(",").map(item => item.trim()).filter(item => item !== "");
    dialogForm3Visible.value = true
}

const btnDeleteItemNewBottomCuttingDieSchedule = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.Component}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            if (row.ImageContent) {
                await deleteFilePFCModelFromFolderPFCModel(row.ImageContent, pfcModel.value)
            }
            await deletePFCItemBottomCuttingDieSchedule(row);
            const { res, _ } = await getPFCItemBottomCuttingDieSchedule(pfcBottomCuttingDieSchedule.value)
            arrItemBottomCuttingDieSchedule.value = res.data.data;
            success("Delete PFC Item BOTTOM CUTTING DIE SCHEDULE successfully!")
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
    pfcItemBottomCuttingDieSchedule.value.ImageContent = null;
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

const btnConfirmItemBottomCuttingDieSchedule = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    const sizeRangeAreSameArray = Array.isArray(pfcItemBottomCuttingDieSchedule.value.SizeRangeAreSame)
        ? pfcItemBottomCuttingDieSchedule.value.SizeRangeAreSame
        : [];
    const itemBottomCuttingDieSchedule = {
        ItemBottomCuttingDieScheduleID: pfcItemBottomCuttingDieSchedule.value.ItemBottomCuttingDieScheduleID,
        BottomCuttingDieScheduleID: pfcBottomCuttingDieSchedule.value.BottomCuttingDieScheduleID,
        Component: pfcItemBottomCuttingDieSchedule.value.Component,
        SizeRange1: pfcItemBottomCuttingDieSchedule.value.SizeRange1,
        SizeRange2: pfcItemBottomCuttingDieSchedule.value.SizeRange2,
        SizeRange: pfcItemBottomCuttingDieSchedule.value.SizeRange,
        SizeRangeAreSame: sizeRangeAreSameArray.join(", "),
        Remarks: pfcItemBottomCuttingDieSchedule.value.Remarks,
        NumberOfLayers: pfcItemBottomCuttingDieSchedule.value.NumberOfLayers,
        Thickness: pfcItemBottomCuttingDieSchedule.value.Thickness,
        Width: pfcItemBottomCuttingDieSchedule.value.Width,
        Hardness: pfcItemBottomCuttingDieSchedule.value.Hardness,
        ImageContent: pfcItemBottomCuttingDieSchedule.value.ImageContent,
        ItemIndex: pfcItemBottomCuttingDieSchedule.value.ItemIndex.toString(),
    }
    if (titleDialogForm2.value === "ADD NEW ITEM BOTTOM CUTTING DIE SCHEDULE") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value);
                itemBottomCuttingDieSchedule.ImageContent = res;
            }
            await insertItemPFCBottomCuttingDieSchedule(itemBottomCuttingDieSchedule);
            const { res } = await getPFCItemBottomCuttingDieSchedule(pfcBottomCuttingDieSchedule.value);
            arrItemBottomCuttingDieSchedule.value = res.data.data;
            success("Insert new Item BOTTOM CUTTING DIE SCHEDULE successfully!");
        } catch (e) {
            error(e);
        }
    }
    if (titleDialogForm2.value === "UPDATE ITEM BOTTOM CUTTING DIE SCHEDULE") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value);
                }
                const { res } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value);
                itemBottomCuttingDieSchedule.ImageContent = res;
            } else {
                if (oldImageUrl_Content.value && itemBottomCuttingDieSchedule.ImageContent === null) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value);
                }
            }
            await updatePFCItemBottomCuttingDieSchedule(itemBottomCuttingDieSchedule);
            const { res } = await getPFCItemBottomCuttingDieSchedule(pfcBottomCuttingDieSchedule.value);
            arrItemBottomCuttingDieSchedule.value = res.data.data;
            success("Update Item BOTTOM CUTTING DIE SCHEDULE successfully!");
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
};


</script>

<style lang="css" scoped></style>