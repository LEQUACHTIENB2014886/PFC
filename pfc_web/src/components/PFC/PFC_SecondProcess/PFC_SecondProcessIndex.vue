<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">SECOND PROCESS</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewSecondProcess">
            ADD NEW SECOND PROCESS
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
                        <el-button size="small" @click="btnUpdatePFCSecondProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning" @click="btnItemPFCSecondProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger" @click="btnDeletePFCSecondProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcSecondProcess" label-width="auto" label-position="right" size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcSecondProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcSecondProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcSecondProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcSecondProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcSecondProcess.Title" />
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

    <el-dialog v-model="dialogForm2Visible" width="90vw" :close-on-click-modal="false" @close="dialogForm2Visible = false"
        style="min-height: 60vh;">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                ITEM SECOND PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewSecondProcess">
            ADD NEW ITEM SECOND PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="100" />

                <el-table-column prop="Component" label="Component" width="300" />
                <el-table-column prop="ImageContent" label="ImageContent" width="380" />
                <el-table-column prop="Material" label="Material" width="380" />
                <el-table-column prop="Method" label="Method" width="220" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewSecondProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewSecondProcess(scope.$index, scope.row)"
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
        <el-form style="width: 85vw" :model="pfcItemSecondProcess" label-width="auto" label-position="right" size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemSecondProcess.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Component: ">
                <el-input v-model="pfcItemSecondProcess.Component" />
            </el-form-item>
            <el-form-item label="ImageContent: ">
                <el-input v-model="pfcItemSecondProcess.ImageContent" />
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
                <el-input v-model="pfcItemSecondProcess.Material" />
            </el-form-item>
            <el-form-item label="Method: ">
                <el-input v-model="pfcItemSecondProcess.Method" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemSecondProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemSecondProcess, deletePFCSecondProcess, getPFCItemSecondProcess, getPFCSecondProcessByModelID, insertItemPFCSecondProcess, insertPFCSecondProcess, updatePFCItemSecondProcess, updatePFCSecondProcess } from '@/hooks/PFC/useSecondProcess';
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
    return Array.isArray(arrItemSecondProcess.value)
        ? arrItemSecondProcess.value.filter(data =>
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

const pfcItemSecondProcess = ref({
    SizeRange1: "",
    SizeRange2: "",
    SizeRange: ""
} as Record<string, any>);

const SizeRangeAreSame = ref([]);

const trigger = ref("enter");

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW SECOND PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM SECOND PROCESS")
const pfcSecondProcess = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemSecondProcess = ref([]);

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
    const { res, _ } = await getPFCSecondProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewSecondProcess = () => {
    titleDialogForm1.value = "ADD NEW SECOND PROCESS"
    pfcSecondProcess.value = {};
    pfcSecondProcess.value.ModelType = pfcModel.value.ModelType
    pfcSecondProcess.value.ModelName = pfcModel.value.ModelName
    pfcSecondProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcSecondProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW SECOND PROCESS") {
        try {
            await insertPFCSecondProcess(pfcSecondProcess.value)
            success("Insert new SECOND PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE SECOND PROCESS") {
        try {
            await updatePFCSecondProcess(pfcSecondProcess.value)
            success("Update SECOND PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCSecondProcess = async (index: number, row) => {
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
        const { res, error: getError } = await getPFCItemSecondProcess(row);
        if (getError) {
            console.error("Error in getPFCItemSecondProcess:", getError);
            error("Error occurred while fetching item details!");
            hideLoading();
            return;
        }
        const items = res.data.data || [];
        if (items.length > 0) {
            error("Please delete Item SECOND PROCESS!");
        } else {
            const { res: delRes, error: delError } = await deletePFCSecondProcess(row);
            if (delError) {
                console.error("Error in deletePFCSecondProcess:", delError);
                error("Error occurred while deleting record!");
            } else {
                await reloadData();
                success("Delete SECOND PROCESS successfully!");
            }
        }
        hideLoading();
    } catch (e) {
        console.error("Detailed error:", e);
        info('Cancel delete!');
        hideLoading();
    }
}

const btnUpdatePFCSecondProcess = async (index: number, row) => {
    pfcSecondProcess.value = {};
    pfcSecondProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE SECOND PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCSecondProcess = async (index: number, row) => {
    showLoading();
    pfcSecondProcess.value = {};
    pfcSecondProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemSecondProcess(pfcSecondProcess.value)
    pfcSecondProcess.value.SecondProcessID = pfcSecondProcess.value.SecondProcessID
    arrItemSecondProcess.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewSecondProcess = () => {
    titleDialogForm2.value = "ADD NEW ITEM SECOND PROCESS";
    pfcItemSecondProcess.value = {};
    if (!Array.isArray(arrItemSecondProcess.value)) {
        arrItemSecondProcess.value = [];
    }
    pfcItemSecondProcess.value.ItemIndex = `${arrItemSecondProcess.value.length + 1}`;
    pfcItemSecondProcess.value.SecondProcessID = pfcSecondProcess.value.SecondProcessID;
    SizeRangeAreSame.value = [];
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
};


const btnEditItemNewSecondProcess = async (index, row) => {
    pfcItemSecondProcess.value = { ...row }
    oldImageUrl_Content.value = row.ImageContent.toString()
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value)
    titleDialogForm2.value = "UPDATE ITEM SECOND PROCESS"
    dialogForm3Visible.value = true
}

const btnDeleteItemNewSecondProcess = async (index: number, row) => {
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
            await deletePFCItemSecondProcess(row);
            const { res, _ } = await getPFCItemSecondProcess(pfcSecondProcess.value)
            arrItemSecondProcess.value = res.data.data;
            success("Delete PFC Item SECOND PROCESS successfully!")
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
    pfcItemSecondProcess.value.ImageContent = null;
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

const btnConfirmItemSecondProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    const itemSecondProcess = {
        ItemSecondProcessID: pfcItemSecondProcess.value.ItemSecondProcessID,
        SecondProcessID: pfcSecondProcess.value.SecondProcessID,
        Component: pfcItemSecondProcess.value.Component,
        ImageContent: pfcItemSecondProcess.value.ImageContent,
        Material: pfcItemSecondProcess.value.Material,
        Method: pfcItemSecondProcess.value.Method,
        ItemIndex: pfcItemSecondProcess.value.ItemIndex.toString(),
    }
    if (titleDialogForm2.value === "ADD NEW ITEM SECOND PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value);
                itemSecondProcess.ImageContent = res;
            }
            await insertItemPFCSecondProcess(itemSecondProcess);
            const { res } = await getPFCItemSecondProcess(pfcSecondProcess.value);
            arrItemSecondProcess.value = res.data.data;
            success("Insert new Item SECOND PROCESS successfully!");
        } catch (e) {
            error(e);
        }
    }
    if (titleDialogForm2.value === "UPDATE ITEM SECOND PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value);
                }
                const { res } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value);
                itemSecondProcess.ImageContent = res;
            } else {
                if (oldImageUrl_Content.value && itemSecondProcess.ImageContent === null) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value);
                }
            }
            await updatePFCItemSecondProcess(itemSecondProcess);
            const { res } = await getPFCItemSecondProcess(pfcSecondProcess.value);
            arrItemSecondProcess.value = res.data.data;
            success("Update Item SECOND PROCESS successfully!");
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
};


</script>

<style lang="css" scoped></style>