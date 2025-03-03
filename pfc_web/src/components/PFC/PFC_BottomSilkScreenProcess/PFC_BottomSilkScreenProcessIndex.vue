<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">BOTTOM PRINTING COMPONENTS PROCESS</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewBottomSilkScreenProcess">
            ADD NEW BOTTOM PRINTING COMPONENTS PROCESS
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
                ITEM BOTTOM PRINTING COMPONENTS PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewBottomSilkScreenProcess">
            ADD NEW ITEM BOTTOM PRINTING COMPONENTS PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />
                <el-table-column label="BOTTOM PRINTING COMPONENTS PROCESS">
                    <template #default="{ row }">
                        {{ pfcBottomSilkScreenProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="RightFoot" label="RightFoot" />
                <!-- <el-table-column prop="Component" label="Component" /> -->
                <el-table-column align="right" width="200">
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

    <el-dialog v-model="dialogForm3Visible" width="45vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <el-form style="width: 40vw" :model="pfcItemBottomSilkScreenProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemBottomSilkScreenProcess.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="RightFoot: ">
                <el-input v-model="pfcItemBottomSilkScreenProcess.RightFoot" />
            </el-form-item>

            <el-form-item label="Component:">
                <el-col>
                    <el-table :data="arrComponent" :row-style="{ height: '30px' }" border>
                        <el-table-column align="center" prop="arrComponent.Index" label="Index" width="100">
                            <template #default="{ row }">
                                <div v-if="!row.editingIndex" @dblclick="enableEdit(row, 'Index')"
                                    style="min-height: 20px;">
                                    {{ row.Index }}
                                </div>
                                <el-input v-else v-model="row.Index" @blur="disableEdit(row, 'Index')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrComponent.COMPONENT" label="Note">
                            <template #default="{ row }">
                                <div v-if="!row.editingCOMPONENT" @dblclick="enableEdit(row, 'COMPONENT')"
                                    style="min-height: 20px;">
                                    {{ row.COMPONENT }}
                                </div>
                                <el-input v-else v-model="row.COMPONENT" @blur="disableEdit(row, 'COMPONENT')" />
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

const filterTableData1 = computed(() =>
    (arrItemBottomSilkScreenProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.Component.toLowerCase().includes(search1.value.toLowerCase())
    )
);

const tableData = ref([]);
const arrComponent = ref([]);
arrComponent.value = Array.from({ length: 12 }, () => ({}));

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW BOTTOM PRINTING COMPONENTS PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM BOTTOM PRINTING COMPONENTS PROCESS")
const pfcBottomSilkScreenProcess = ref({} as Record<string, any>)
const pfcItemBottomSilkScreenProcess = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
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
    titleDialogForm1.value = "ADD NEW BOTTOM PRINTING COMPONENTS PROCESS"
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
    if (titleDialogForm1.value === "ADD NEW BOTTOM PRINTING COMPONENTS PROCESS") {
        try {
            await insertPFCBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            success("Insert new BOTTOM PRINTING COMPONENTS PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE BOTTOM PRINTING COMPONENTS PROCESS") {
        try {
            await updatePFCBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            success("Update BOTTOM PRINTING COMPONENTS PROCESS successfully!")
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
    titleDialogForm1.value = "UPDATE BOTTOM PRINTING COMPONENTS PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCBottomSilkScreenProcess = async (index: number, row) => {
    showLoading();
    pfcBottomSilkScreenProcess.value = {};
    pfcBottomSilkScreenProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
    arrItemBottomSilkScreenProcess.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewBottomSilkScreenProcess = () => {
    pfcItemBottomSilkScreenProcess.value = {};
    pfcItemBottomSilkScreenProcess.value.ItemIndex = `${arrItemBottomSilkScreenProcess.value.length + 1}`
    pfcItemBottomSilkScreenProcess.value.BottomSilkScreenProcessID = pfcBottomSilkScreenProcess.value.BottomSilkScreenProcessID;
    arrComponent.value = Array.from({ length: 12 }, () => ({}));
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewBottomSilkScreenProcess = async (index: number, row) => {
    // console.log(pfcModel.value)
    pfcItemBottomSilkScreenProcess.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.ImageContent.toString();
    try {
        arrComponent.value = row.Component ? JSON.parse(row.Component) : Array.from({ length: 12 }, () => ({}));
        arrComponent.value = arrComponent.value.map(item => item ?? { Index: "", COMPONENT: "" });

    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 12 }, () => ({}));
    }
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM BOTTOM PRINTING COMPONENTS PROCESS"
    dialogForm3Visible.value = true;
}

const btnDeleteItemNewBottomSilkScreenProcess = async (index: number, row) => {
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
            await deletePFCItemBottomSilkScreenProcess(row);
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            arrItemBottomSilkScreenProcess.value = res.data.data;
            success("Delete PFC Item BOTTOM PRINTING COMPONENTS PROCESS successfully!")
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
    pfcItemBottomSilkScreenProcess.value.ImageContent = null;
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

const btnConfirmItemBottomSilkScreenProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    const itemBottomSilkScreenProcess = {
        ItemBottomSilkScreenProcessID: pfcItemBottomSilkScreenProcess.value.ItemBottomSilkScreenProcessID,
        BottomSilkScreenProcessID: pfcItemBottomSilkScreenProcess.value.BottomSilkScreenProcessID,
        RightFoot: pfcItemBottomSilkScreenProcess.value.RightFoot,

        ImageContent: pfcItemBottomSilkScreenProcess.value.ImageContent,
        Component: JSON.stringify(arrComponent.value),
        ItemIndex: pfcItemBottomSilkScreenProcess.value.ItemIndex.toString(),
    }

    if (titleDialogForm2.value === "ADD NEW ITEM BOTTOM PRINTING COMPONENTS PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomSilkScreenProcess.ImageContent = res
            }
            await insertItemPFCBottomSilkScreenProcess(itemBottomSilkScreenProcess);
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            arrItemBottomSilkScreenProcess.value = res.data.data;
            success("Insert new Item BOTTOM PRINTING COMPONENTS PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM BOTTOM PRINTING COMPONENTS PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomSilkScreenProcess.ImageContent = res
            } else {
                if (oldImageUrl_Content.value && itemBottomSilkScreenProcess.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemBottomSilkScreenProcess(itemBottomSilkScreenProcess)
            const { res, _ } = await getPFCItemBottomSilkScreenProcess(pfcBottomSilkScreenProcess.value)
            arrItemBottomSilkScreenProcess.value = res.data.data;
            success("Insert new Item BOTTOM PRINTING COMPONENTS PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped></style>