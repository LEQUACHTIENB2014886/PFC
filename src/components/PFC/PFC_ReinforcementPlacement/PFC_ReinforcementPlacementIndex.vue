<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">REINFORCEMENT PLACEMENT</h4>
       
        <div style="display: flex; justify-content: space-between;">
    <div style="margin-left:35px">

        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewReinforcementPlacement">
            ADD NEW REINFORCEMENT PLACEMENT
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
                        <el-button size="small" @click="btnUpdatePFCReinforcementPlacement(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCReinforcementPlacement(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCReinforcementPlacement(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcReinforcementPlacement" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcReinforcementPlacement.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcReinforcementPlacement.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcReinforcementPlacement.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcReinforcementPlacement.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcReinforcementPlacement.Title" />
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

    <el-dialog v-model="dialogForm2Visible" width="93vw" :close-on-click-modal="false" @close="dialogForm2Visible = false"
        style="min-height: 60vh;">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                ITEM REINFORCEMENT PLACEMENT
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewReinforcementPlacement">
            ADD NEW ITEM REINFORCEMENT PLACEMENT
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="100" />

                <el-table-column prop="Component" label="Component" width="250" />
                <el-table-column prop="ImageContent" label="ImageContent" width="380" />
                <el-table-column prop="Material" label="Material" width="200" />
                <el-table-column prop="Adhesive" label="Adhesive" />
                <el-table-column prop="AttachingMethod" label="AttachingMethod" width="150" />
                <el-table-column prop="Temp" label="Temp" />
                <el-table-column prop="Pressure" label="Pressure" />
                <el-table-column prop="Time" label="Time" />

                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewReinforcementPlacement(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewReinforcementPlacement(scope.$index, scope.row)"
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
        <el-form style="width: 85vw" :model="pfcItemReinforcementPlacement" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemReinforcementPlacement.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Component: ">
                <el-input v-model="pfcItemReinforcementPlacement.Component" />
            </el-form-item>
            <el-form-item label="ImageContent: ">
                <el-input v-model="pfcItemReinforcementPlacement.ImageContent" />
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
            <el-form-item label="Material: ">
                <el-input v-model="pfcItemReinforcementPlacement.Material" />
            </el-form-item>
            <el-form-item label="Adhesive: ">
                <el-input v-model="pfcItemReinforcementPlacement.Adhesive" />
            </el-form-item>
            <el-form-item label="AttachingMethod: ">
                <el-input v-model="pfcItemReinforcementPlacement.AttachingMethod" />
            </el-form-item>
            <el-form-item label="Temp: ">
                <el-input v-model="pfcItemReinforcementPlacement.Temp" />
            </el-form-item>
            <el-form-item label="Pressure: ">
                <el-input v-model="pfcItemReinforcementPlacement.Pressure" />
            </el-form-item>
            <el-form-item label="Time: ">
                <el-input v-model="pfcItemReinforcementPlacement.Time" />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemReinforcementPlacement">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemReinforcementPlacement, deletePFCReinforcementPlacement, getPFCItemReinforcementPlacement, getPFCReinforcementPlacementByModelID, insertItemPFCReinforcementPlacement, insertPFCReinforcementPlacement, updatePFCItemReinforcementPlacement, updatePFCReinforcementPlacement } from '@/hooks/PFC/useReinforcementPlacement';
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
    return Array.isArray(arrItemReinforcementPlacement.value)
        ? arrItemReinforcementPlacement.value.filter(data =>
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

const pfcItemReinforcementPlacement = ref({
    SizeRange1: "",
    SizeRange2: "",
    SizeRange: ""
} as Record<string, any>);

const SizeRangeAreSame = ref([]);

const trigger = ref("enter");

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW REINFORCEMENT PLACEMENT")
const titleDialogForm2 = ref("ADD NEW ITEM REINFORCEMENT PLACEMENT")
const pfcReinforcementPlacement = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemReinforcementPlacement = ref([]);

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
    const { res, _ } = await getPFCReinforcementPlacementByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewReinforcementPlacement = () => {
    titleDialogForm1.value = "ADD NEW REINFORCEMENT PLACEMENT"
    pfcReinforcementPlacement.value = {};
    pfcReinforcementPlacement.value.ModelType = pfcModel.value.ModelType
    pfcReinforcementPlacement.value.ModelName = pfcModel.value.ModelName
    pfcReinforcementPlacement.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcReinforcementPlacement.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW REINFORCEMENT PLACEMENT") {
        try {
            await insertPFCReinforcementPlacement(pfcReinforcementPlacement.value)
            success("Insert new REINFORCEMENT PLACEMENT successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE REINFORCEMENT PLACEMENT") {
        try {
            await updatePFCReinforcementPlacement(pfcReinforcementPlacement.value)
            success("Update REINFORCEMENT PLACEMENT successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCReinforcementPlacement = async (index: number, row) => {
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
        const { res, error: getError } = await getPFCItemReinforcementPlacement(row);
        if (getError) {
            console.error("Error in getPFCItemReinforcementPlacement:", getError);
            error("Error occurred while fetching item details!");
            hideLoading();
            return;
        }
        const items = res.data.data || [];
        if (items.length > 0) {
            error("Please delete Item REINFORCEMENT PLACEMENT!");
        } else {
            const { res: delRes, error: delError } = await deletePFCReinforcementPlacement(row);
            if (delError) {
                console.error("Error in deletePFCReinforcementPlacement:", delError);
                error("Error occurred while deleting record!");
            } else {
                await reloadData();
                success("Delete REINFORCEMENT PLACEMENT successfully!");
            }
        }
        hideLoading();
    } catch (e) {
        console.error("Detailed error:", e);
        info('Cancel delete!');
        hideLoading();
    }
}

const btnUpdatePFCReinforcementPlacement = async (index: number, row) => {
    pfcReinforcementPlacement.value = {};
    pfcReinforcementPlacement.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE REINFORCEMENT PLACEMENT"
    dialogForm1Visible.value = true;
}

const btnItemPFCReinforcementPlacement = async (index: number, row) => {
    showLoading();
    pfcReinforcementPlacement.value = {};
    pfcReinforcementPlacement.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemReinforcementPlacement(pfcReinforcementPlacement.value)
    pfcReinforcementPlacement.value.ReinforcementPlacementID = pfcReinforcementPlacement.value.ReinforcementPlacementID
    arrItemReinforcementPlacement.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewReinforcementPlacement = () => {
    titleDialogForm2.value = "ADD NEW ITEM REINFORCEMENT PLACEMENT";
    pfcItemReinforcementPlacement.value = {};
    if (!Array.isArray(arrItemReinforcementPlacement.value)) {
        arrItemReinforcementPlacement.value = [];
    }
    pfcItemReinforcementPlacement.value.ItemIndex = `${arrItemReinforcementPlacement.value.length + 1}`;
    pfcItemReinforcementPlacement.value.ReinforcementPlacementID = pfcReinforcementPlacement.value.ReinforcementPlacementID;
    SizeRangeAreSame.value = [];
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
};


const btnEditItemNewReinforcementPlacement = async (index, row) => {
    pfcItemReinforcementPlacement.value = { ...row }
    oldImageUrl_Content.value = row.ImageContent.toString()
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value)
    titleDialogForm2.value = "UPDATE ITEM REINFORCEMENT PLACEMENT"
    dialogForm3Visible.value = true
}

const btnDeleteItemNewReinforcementPlacement = async (index: number, row) => {
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
            await deletePFCItemReinforcementPlacement(row);
            const { res, _ } = await getPFCItemReinforcementPlacement(pfcReinforcementPlacement.value)
            arrItemReinforcementPlacement.value = res.data.data;
            success("Delete PFC Item REINFORCEMENT PLACEMENT successfully!")
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
    pfcItemReinforcementPlacement.value.ImageContent = null;
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

const btnConfirmItemReinforcementPlacement = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    const itemReinforcementPlacement = {
        ItemReinforcementPlacementID: pfcItemReinforcementPlacement.value.ItemReinforcementPlacementID,
        ReinforcementPlacementID: pfcReinforcementPlacement.value.ReinforcementPlacementID,
        Component: pfcItemReinforcementPlacement.value.Component,
        ImageContent: pfcItemReinforcementPlacement.value.ImageContent,
        Material: pfcItemReinforcementPlacement.value.Material,
        Adhesive: pfcItemReinforcementPlacement.value.Adhesive,
        AttachingMethod: pfcItemReinforcementPlacement.value.AttachingMethod,
        Temp: pfcItemReinforcementPlacement.value.Temp,
        Pressure: pfcItemReinforcementPlacement.value.Pressure,
        Time: pfcItemReinforcementPlacement.value.Time,
        ItemIndex: pfcItemReinforcementPlacement.value.ItemIndex.toString(),
    }
    if (titleDialogForm2.value === "ADD NEW ITEM REINFORCEMENT PLACEMENT") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value);
                itemReinforcementPlacement.ImageContent = res;
            }
            await insertItemPFCReinforcementPlacement(itemReinforcementPlacement);
            const { res } = await getPFCItemReinforcementPlacement(pfcReinforcementPlacement.value);
            arrItemReinforcementPlacement.value = res.data.data;
            success("Insert new Item REINFORCEMENT PLACEMENT successfully!");
        } catch (e) {
            error(e);
        }
    }
    if (titleDialogForm2.value === "UPDATE ITEM REINFORCEMENT PLACEMENT") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value);
                }
                const { res } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value);
                itemReinforcementPlacement.ImageContent = res;
            } else {
                if (oldImageUrl_Content.value && itemReinforcementPlacement.ImageContent === null) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value);
                }
            }
            await updatePFCItemReinforcementPlacement(itemReinforcementPlacement);
            const { res } = await getPFCItemReinforcementPlacement(pfcReinforcementPlacement.value);
            arrItemReinforcementPlacement.value = res.data.data;
            success("Update Item REINFORCEMENT PLACEMENT successfully!");
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
};


</script>

<style lang="css" scoped></style>