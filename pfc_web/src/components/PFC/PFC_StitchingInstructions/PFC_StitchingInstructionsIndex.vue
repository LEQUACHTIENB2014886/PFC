<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">STITCHING INSTRUCTION</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewStitchingInstructions">
            ADD NEW STITCHING INSTRUCTION
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
                        <el-button size="small" @click="btnUpdatePFCStitchingInstructions(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCStitchingInstructions(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCStitchingInstructions(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcStitchingInstructions" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcStitchingInstructions.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcStitchingInstructions.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcStitchingInstructions.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcStitchingInstructions.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcStitchingInstructions.Title" />
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
                ITEM STITCHING INSTRUCTION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewStitchingInstructions">
            ADD NEW ITEM STITCHING INSTRUCTION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />

                <el-table-column prop="Component" label="Component" />
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewStitchingInstructions(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewStitchingInstructions(scope.$index, scope.row)"
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
        <el-form style="width: 85vw" :model="pfcItemStitchingInstructions" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemStitchingInstructions.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Component: ">
                <el-input v-model="pfcItemStitchingInstructions.Component" />
            </el-form-item>

            <el-form-item label=" ">
                <el-col>
                    <el-table :data="arrComponent" :row-style="{ height: '30px' }" border>
                        <!-- 1 -->
                        <el-table-column align="center" prop="McType" label="M/C Type 机器 Loại máy" width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingMcType" @dblclick="enableEdit(row, 'McType')"
                                    style="min-height: 20px;">
                                    {{ row.McType }}
                                </div>
                                <el-input v-else v-model="row.McType" @blur="disableEdit(row, 'McType')" />
                            </template>
                        </el-table-column>
                        <!-- 2 -->
                        <el-table-column align="center" prop="NeedleSystem" label="Needle System 针类 Loại kim" width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingNeedleSystem" @dblclick="enableEdit(row, 'NeedleSystem')"
                                    style="min-height: 20px;">
                                    {{ row.NeedleSystem }}
                                </div>
                                <el-input v-else v-model="row.NeedleSystem" @blur="disableEdit(row, 'NeedleSystem')" />
                            </template>
                        </el-table-column>
                        <!-- 3 -->
                        <el-table-column align="center" prop="NeedleSize" label="Needle Size 尺寸 Kích cỡ kim" width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingNeedleSize" @dblclick="enableEdit(row, 'NeedleSize')"
                                    style="min-height: 20px;">
                                    {{ row.NeedleSize }}
                                </div>
                                <el-input v-else v-model="row.NeedleSize" @blur="disableEdit(row, 'NeedleSize')" />
                            </template>
                        </el-table-column>
                        <!-- 4 -->
                        <el-table-column align="center" prop="NeedlePointType" label="Needle Point Type 针型头类 Loại đầu kim"
                            width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingNeedlePointType" @dblclick="enableEdit(row, 'NeedlePointType')"
                                    style="min-height: 20px;">
                                    {{ row.NeedlePointType }}
                                </div>
                                <el-input v-else v-model="row.NeedlePointType"
                                    @blur="disableEdit(row, 'NeedlePointType')" />
                            </template>
                        </el-table-column>
                        <!-- 5 -->
                        <el-table-column align="center" prop="ThreadType" label="Thread Type 车线 Loại chỉ" width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingThreadType" @dblclick="enableEdit(row, 'ThreadType')"
                                    style="min-height: 20px;">
                                    {{ row.ThreadType }}
                                </div>
                                <el-input v-else v-model="row.ThreadType" @blur="disableEdit(row, 'ThreadType')" />
                            </template>
                        </el-table-column>
                        <!-- 6 -->
                        <el-table-column align="center" prop="StitchingMargin" label="Stitching Margin 边距 Cách biên  (mm)"
                            width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingStitchingMargin" @dblclick="enableEdit(row, 'StitchingMargin')"
                                    style="min-height: 20px;">
                                    {{ row.StitchingMargin }}
                                </div>
                                <el-input v-else v-model="row.StitchingMargin"
                                    @blur="disableEdit(row, 'StitchingMargin')" />
                            </template>
                        </el-table-column>
                        <!-- 7 -->
                        <el-table-column align="center" prop="StitchPerInch"
                            label="SPI (Stitch Per Inch) 针数/英寸 Số mũi/inch">
                            <template #default="{ row }">
                                <div v-if="!row.editingStitchPerInch" @dblclick="enableEdit(row, 'StitchPerInch')"
                                    style="min-height: 20px;">
                                    {{ row.StitchPerInch }}
                                </div>
                                <el-input v-else v-model="row.StitchPerInch" @blur="disableEdit(row, 'StitchPerInch')" />
                            </template>
                        </el-table-column>
                        <!-- 8 -->
                        <el-table-column align="center" prop="AttachingMethod" label="Attaching Method 贴法 Phương pháp dán ">
                            <template #default="{ row }">
                                <div v-if="!row.editingAttachingMethod" @dblclick="enableEdit(row, 'AttachingMethod')"
                                    style="min-height: 20px;">
                                    {{ row.AttachingMethod }}
                                </div>
                                <el-input v-else v-model="row.AttachingMethod"
                                    @blur="disableEdit(row, 'AttachingMethod')" />
                            </template>
                        </el-table-column>
                        <!-- 9 -->
                        <el-table-column align="center" prop="StitchingGuideName"
                            label="Stitching Guide Name  靠边机名称Tên cử may">
                            <template #default="{ row }">
                                <div v-if="!row.editingStitchingGuideName" @dblclick="enableEdit(row, 'StitchingGuideName')"
                                    style="min-height: 20px;">
                                    {{ row.StitchingGuideName }}
                                </div>
                                <el-input v-else v-model="row.StitchingGuideName"
                                    @blur="disableEdit(row, 'StitchingGuideName')" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
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

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemStitchingInstructions">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemStitchingInstructions, deletePFCStitchingInstructions, getPFCItemStitchingInstructions, getPFCStitchingInstructionsByModelID, insertItemPFCStitchingInstructions, insertPFCStitchingInstructions, updatePFCItemStitchingInstructions, updatePFCStitchingInstructions } from '@/hooks/PFC/useStitchingInstructions';
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
    return Array.isArray(arrItemStitchingInstructions.value)
        ? arrItemStitchingInstructions.value.filter(data =>
            !search1.value || data.Component.toLowerCase().includes(search1.value.toLowerCase())
        )
        : [];
});

const tableData = ref([]);
const arrComponent = ref([]);
// arrComponent.value = Array.from({ length: 1 }, () => ({}));

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW STITCHING INSTRUCTION")
const titleDialogForm2 = ref("ADD NEW ITEM STITCHING INSTRUCTION")
const pfcStitchingInstructions = ref({} as Record<string, any>)
const pfcItemStitchingInstructions = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemStitchingInstructions = ref([]);

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
    const { res, _ } = await getPFCStitchingInstructionsByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewStitchingInstructions = () => {
    titleDialogForm1.value = "ADD NEW STITCHING INSTRUCTION"
    pfcStitchingInstructions.value = {};
    pfcStitchingInstructions.value.ModelType = pfcModel.value.ModelType
    pfcStitchingInstructions.value.ModelName = pfcModel.value.ModelName
    pfcStitchingInstructions.value.MaterialNumber = pfcModel.value.MaterialNumber

    pfcStitchingInstructions.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
    // console.log(pfcModel.value)
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW STITCHING INSTRUCTION") {
        try {
            await insertPFCStitchingInstructions(pfcStitchingInstructions.value)
            success("Insert new STITCHING INSTRUCTION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE STITCHING INSTRUCTION") {
        try {
            await updatePFCStitchingInstructions(pfcStitchingInstructions.value)
            success("Update STITCHING INSTRUCTION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCStitchingInstructions = async (index: number, row) => {
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
        const { res, error: getError } = await getPFCItemStitchingInstructions(row);
        if (getError) {
            console.error("Error in getPFCItemStitchingInstructions:", getError);
            error("Error occurred while fetching item details!");
            hideLoading();
            return;
        }
        const items = res.data.data || [];
        if (items.length > 0) {
            error("Please delete Item STITCHING INSTRUCTION!");
        } else {
            const { res: delRes, error: delError } = await deletePFCStitchingInstructions(row);
            if (delError) {
                console.error("Error in deletePFCStitchingInstructions:", delError);
                error("Error occurred while deleting record!");
            } else {
                await reloadData();
                success("Delete STITCHING INSTRUCTION successfully!");
            }
        }
        hideLoading();
    } catch (e) {
        console.error("Detailed error:", e);
        info('Cancel delete!');
        hideLoading();
    }
}

const btnUpdatePFCStitchingInstructions = async (index: number, row) => {
    pfcStitchingInstructions.value = {};
    pfcStitchingInstructions.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE STITCHING INSTRUCTION"
    dialogForm1Visible.value = true;
}

const btnItemPFCStitchingInstructions = async (index: number, row) => {
    showLoading();
    pfcStitchingInstructions.value = {};
    pfcStitchingInstructions.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemStitchingInstructions(pfcStitchingInstructions.value)
    pfcStitchingInstructions.value.StitchingInstructionID = pfcStitchingInstructions.value.StitchingInstructionID

    // console.log(pfcStitchingInstructions.value)  
    // console.log(pfcStitchingInstructions.value.StitchingInstructionID)
    arrItemStitchingInstructions.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewStitchingInstructions = () => {
    pfcItemStitchingInstructions.value = {};
    pfcItemStitchingInstructions.value.ItemIndex = `${arrItemStitchingInstructions.value.length + 1}`
    pfcItemStitchingInstructions.value.StitchingInstructionsID = pfcStitchingInstructions.value.StitchingInstructionsID;
    // console.log(pfcStitchingInstructions.value.StitchingInstructionID)
    arrComponent.value = [{}];
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewStitchingInstructions = async (index, row) => {
    pfcItemStitchingInstructions.value = { ...row }
    oldImageUrl_Content.value = row.ImageContent.toString()
    arrComponent.value = []
    
    try {
        arrComponent.value.push({
            McType: row.McType,
            NeedleSystem: row.NeedleSystem,
            NeedleSize: row.NeedleSize,
            NeedlePointType: row.NeedlePointType,
            ThreadType: row.ThreadType,
            StitchingMargin: row.StitchingMargin,
            StitchPerInch: row.StitchPerInch,
            AttachingMethod: row.AttachingMethod,
            StitchingGuideName: row.StitchingGuideName
        })
        // console.log("arrComponent:", arrComponent.value)
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error)
        arrComponent.value = [{}]
    }
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value)
    titleDialogForm2.value = "UPDATE ITEM STITCHING INSTRUCTION"
    dialogForm3Visible.value = true
}

const btnDeleteItemNewStitchingInstructions = async (index: number, row) => {
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
            await deletePFCItemStitchingInstructions(row);
            const { res, _ } = await getPFCItemStitchingInstructions(pfcStitchingInstructions.value)
            arrItemStitchingInstructions.value = res.data.data;
            success("Delete PFC Item STITCHING INSTRUCTION successfully!")
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
    pfcItemStitchingInstructions.value.ImageContent = null;
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

const enableEdit = (row: any, field: string) => {
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row: any, field: string) => {
    row[`editing${capitalize(field)}`] = false;
};

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const btnConfirmItemStitchingInstructions = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    const itemStitchingInstructions = {
        ItemStitchingInstructionID: pfcItemStitchingInstructions.value.ItemStitchingInstructionID,
        StitchingInstructionID: pfcStitchingInstructions.value.StitchingInstructionID,
        Component: pfcItemStitchingInstructions.value.Component,
        ImageContent: pfcItemStitchingInstructions.value.ImageContent,
        McType: arrComponent.value[0]?.McType ?? "",
        NeedleSystem: arrComponent.value[0]?.NeedleSystem ?? "",
        NeedleSize: arrComponent.value[0]?.NeedleSize ?? "",
        NeedlePointType: arrComponent.value[0]?.NeedlePointType ?? "",
        ThreadType: arrComponent.value[0]?.ThreadType ?? "",
        StitchingMargin: arrComponent.value[0]?.StitchingMargin ?? "",
        StitchPerInch: arrComponent.value[0]?.StitchPerInch ?? "",
        AttachingMethod: arrComponent.value[0]?.AttachingMethod ?? "",
        StitchingGuideName: arrComponent.value[0]?.StitchingGuideName ?? "",
        ItemIndex: pfcItemStitchingInstructions.value.ItemIndex.toString(),
    }

    // console.log("McType:", arrComponent.value[0]);
    // console.log(pfcStitchingInstructions.value.StitchingInstructionID)
    if (titleDialogForm2.value === "ADD NEW ITEM STITCHING INSTRUCTION") {
        try {

            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemStitchingInstructions.ImageContent = res
            }
            await insertItemPFCStitchingInstructions(itemStitchingInstructions);
            const { res, _ } = await getPFCItemStitchingInstructions(pfcStitchingInstructions.value)
            arrItemStitchingInstructions.value = res.data.data;
            success("Insert new Item STITCHING INSTRUCTION successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM STITCHING INSTRUCTION") {

        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemStitchingInstructions.ImageContent = res
            } else {
                if (oldImageUrl_Content.value && itemStitchingInstructions.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemStitchingInstructions(itemStitchingInstructions)
            const { res, _ } = await getPFCItemStitchingInstructions(pfcStitchingInstructions.value)
            arrItemStitchingInstructions.value = res.data.data;
            success("Insert new Item STITCHING INSTRUCTION successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped></style>