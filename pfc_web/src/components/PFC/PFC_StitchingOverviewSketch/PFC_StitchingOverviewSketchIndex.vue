<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">STITCHING OVERVIEW SKETCH</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewStitchingOverviewSketch">
            ADD NEW STITCHING OVERVIEW SKETCH
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
                        <el-button size="small" @click="btnUpdatePFCStitchingOverviewSketch(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCStitchingOverviewSketch(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCStitchingOverviewSketch(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcStitchingOverviewSketch" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcStitchingOverviewSketch.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcStitchingOverviewSketch.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcStitchingOverviewSketch.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcStitchingOverviewSketch.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcStitchingOverviewSketch.Title" />
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
                ITEM STITCHING OVERVIEW SKETCH
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewStitchingOverviewSketch">
            ADD NEW ITEM STITCHING OVERVIEW SKETCH
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />
                <el-table-column label="STITCHING OVERVIEW SKETCH">
                    <template #default="{ row }">
                        {{ pfcStitchingOverviewSketch.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="RightFoot" label="RightFoot" />
                <!-- <el-table-column prop="Component" label="Component" /> -->
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewStitchingOverviewSketch(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewStitchingOverviewSketch(scope.$index, scope.row)"
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

        <div style="display: flex; justify-content: space-around;">
            <!-- LEFT -->
            <el-form style="width: 30vw" :model="pfcItemStitchingOverviewSketch" label-width="auto" label-position="right"
                size="default">
                <el-form-item label="Item Index:" style="width: 530px;">
                    <el-select v-model="pfcItemStitchingOverviewSketch.ItemIndex" clearable placeholder="Select">
                        <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label=" ">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside" :data="arrComponent" border style="width: 450px;"
                            :row-style="{ height: '40px' }">
                            <el-table-column label="COMPONENT 部件名称 Tên chi tiết:" header-align="center">
                                <template #default="{ row }">
                                    <div style="display: table; width: 100%; border: 1px solid #ccc; padding: 4px;">
                                        <div
                                            style="display: table-cell; width: 40px; text-align: center; vertical-align: middle; border-right: 1px solid #ccc; padding-right: 4px;">
                                            <div v-if="!row.editingIndex" @click="() => enableEdit(row, 'Index')"
                                                style="min-height: 20px; text-align: left;">
                                                {{ row.Index }}
                                            </div>
                                            <el-input v-else v-model="row.Index" @blur="() => disableEdit(row, 'Index')"
                                                style="text-align: left;" />
                                        </div>
                                        <div style="display: table-cell; padding-left: 10px; vertical-align: middle;">
                                            <div v-if="!row.editingCOMPONENT" @click="() => enableEdit(row, 'COMPONENT')"
                                                style="min-height: 20px; text-align: left;">
                                                {{ row.COMPONENT }}
                                            </div>
                                            <el-input v-else v-model="row.COMPONENT"
                                                @blur="() => disableEdit(row, 'COMPONENT')" style="text-align: left;" />
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-col>
                </el-form-item>
                <el-form-item label="RightFoot: " style="width: 530px;">
                    <el-input v-model="pfcItemStitchingOverviewSketch.RightFoot" />
                </el-form-item>
            </el-form>
            <!-- RIGHT -->

            <el-form style="width: 60vw; min-height: 80vh;" :model="pfcItemStitchingOverviewSketch" label-width="auto"
                label-position="right" size="default">
                <div style="display: flex; justify-content: space-between; gap: 0;">
                    <el-form-item label=" " style="width: 20vw;">
                        <el-col>
                            <el-card shadow="always" class="dark-mode" style="height: 400px;  align-content: center;">
                                <el-col style="text-align: center; align-content: center;">
                                    <el-upload>
                                        <img v-if="imageUrl_Content" />
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
                    <el-form-item label=" " style="width: 40vw;">
                        <el-col>
                            <el-card shadow="always" class="dark-mode" style="height: 400px; align-content: center;">
                                <el-col style="text-align: center; align-content: center;">
                                    <el-upload>
                                        <img v-if="imageUrl_Content" />
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
                </div>
                <div style="display: flex;  ">
                    <el-form-item label=" " style="width: 20vw;">

                    </el-form-item>
                    <el-form-item label=" " style="width: 40vw;">
                        <el-col>
                            <el-card shadow="always" class="dark-mode" style="height: 250px;  align-content: center;">
                                <el-col style="text-align: center; align-content: center;">
                                    <el-upload>
                                        <img v-if="imageUrl_Content" />
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
                </div>
            </el-form>
        </div>

        <div style="display: flex; justify-content: center;">
            <el-table :data="tableData2" border style="width: 87vw; margin-left:95px">
                <el-table-column label="Photo" />
                <el-table-column label="Address Stitching Guide Detail Information" fixed="right">
                    <el-table-column prop="image1" label="Image 1" />
                    <el-table-column prop="image2" label="Image 1" />
                    <el-table-column prop="image3" label="Image 1" />
                    <el-table-column prop="image4" label="Image 1" />
                    <el-table-column prop="image5" label="Image 1" />
                    <el-table-column prop="image6" label="Image 1" />
                    <el-table-column prop="image7" label="Image 1" />
                </el-table-column>

            </el-table>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemStitchingOverviewSketch">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemStitchingOverviewSketch, deletePFCStitchingOverviewSketch, getPFCItemStitchingOverviewSketch, getPFCStitchingOverviewSketchByModelID, insertItemPFCStitchingOverviewSketch, insertPFCStitchingOverviewSketch, updatePFCItemStitchingOverviewSketch, updatePFCStitchingOverviewSketch } from '@/hooks/PFC/useStitchingOverviewSketch';
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
    (arrItemStitchingOverviewSketch.value || []).filter(
        (data) =>
            !search1.value ||
            data.Component.toLowerCase().includes(search1.value.toLowerCase())
    )
);

const tableData = ref([]);
const arrComponent = ref([]);
arrComponent.value = Array.from({ length: 12 }, () => ({}));
const tableData2 = [
    {
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
        image7: '',

    }]

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW STITCHING OVERVIEW SKETCH")
const titleDialogForm2 = ref("ADD NEW ITEM STITCHING OVERVIEW SKETCH")
const pfcStitchingOverviewSketch = ref({} as Record<string, any>)
const pfcItemStitchingOverviewSketch = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemStitchingOverviewSketch = ref([]);

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
    const { res, _ } = await getPFCStitchingOverviewSketchByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewStitchingOverviewSketch = () => {
    titleDialogForm1.value = "ADD NEW STITCHING OVERVIEW SKETCH"
    pfcStitchingOverviewSketch.value = {};
    pfcStitchingOverviewSketch.value.ModelType = pfcModel.value.ModelType
    pfcStitchingOverviewSketch.value.ModelName = pfcModel.value.ModelName
    pfcStitchingOverviewSketch.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcStitchingOverviewSketch.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW STITCHING OVERVIEW SKETCH") {
        try {
            await insertPFCStitchingOverviewSketch(pfcStitchingOverviewSketch.value)
            success("Insert new STITCHING OVERVIEW SKETCH successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE STITCHING OVERVIEW SKETCH") {
        try {
            await updatePFCStitchingOverviewSketch(pfcStitchingOverviewSketch.value)
            success("Update STITCHING OVERVIEW SKETCH successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCStitchingOverviewSketch = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemStitchingOverviewSketch(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCStitchingOverviewSketch(row);
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

const btnUpdatePFCStitchingOverviewSketch = async (index: number, row) => {
    pfcStitchingOverviewSketch.value = {};
    pfcStitchingOverviewSketch.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE STITCHING OVERVIEW SKETCH"
    dialogForm1Visible.value = true;
}

const btnItemPFCStitchingOverviewSketch = async (index: number, row) => {
    showLoading();
    pfcStitchingOverviewSketch.value = {};
    pfcStitchingOverviewSketch.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemStitchingOverviewSketch(pfcStitchingOverviewSketch.value)
    arrItemStitchingOverviewSketch.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewStitchingOverviewSketch = () => {
    titleDialogForm2.value = "ADD NEW ITEM STITCHING OVERVIEW SKETCH";
    pfcItemStitchingOverviewSketch.value = {
       ItemIndex: `${arrItemStitchingOverviewSketch.value.length + 1}`,
       StitchingOverviewSketchID: pfcStitchingOverviewSketch.value.StitchingOverviewSketchID,
       RightFoot: "",
       ImageContent: ""
    };
    arrComponent.value = Array.from({ length: 12 }, () => ({}));
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
};

const btnEditItemNewStitchingOverviewSketch = async (index: number, row) => {
    pfcItemStitchingOverviewSketch.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.ImageContent.toString();
    try {
        arrComponent.value = row.Component ? JSON.parse(row.Component) : Array.from({ length: 12 }, () => ({}));
        arrComponent.value = arrComponent.value.map(item => item ?? { Index: "", COMPONENT: "" });

    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 12 }, () => ({}));
    }
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM STITCHING OVERVIEW SKETCH"
    dialogForm3Visible.value = true;
}

const btnDeleteItemNewStitchingOverviewSketch = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Index: "${row.ItemIndex}". Continue?`,
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
            await deletePFCItemStitchingOverviewSketch(row);
            const { res, _ } = await getPFCItemStitchingOverviewSketch(pfcStitchingOverviewSketch.value)
            arrItemStitchingOverviewSketch.value = res.data.data;
            success("Delete PFC Item STITCHING OVERVIEW SKETCH successfully!")
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
    pfcItemStitchingOverviewSketch.value.ImageContent = null;
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
    row.editingIndex = false;
    row.editingCOMPONENT = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside = (event) => {
    arrComponent.value.forEach((row) => {
        row.editingIndex = false;
        row.editingCOMPONENT = false;
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

const { appContext } = getCurrentInstance();
// appContext.app.directive('click-outside', clickOutsideDirective);

const btnConfirmItemStitchingOverviewSketch = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    const itemStitchingOverviewSketch = {
        ItemStitchingOverviewSketchID: pfcItemStitchingOverviewSketch.value.ItemStitchingOverviewSketchID,
        StitchingOverviewSketchID: pfcItemStitchingOverviewSketch.value.StitchingOverviewSketchID,
        RightFoot: pfcItemStitchingOverviewSketch.value.RightFoot,

        ImageContent: pfcItemStitchingOverviewSketch.value.ImageContent,
        Component: JSON.stringify(arrComponent.value),
        ItemIndex: pfcItemStitchingOverviewSketch.value.ItemIndex.toString(),
    }

    if (titleDialogForm2.value === "ADD NEW ITEM STITCHING OVERVIEW SKETCH") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemStitchingOverviewSketch.ImageContent = res
            }
            await insertItemPFCStitchingOverviewSketch(itemStitchingOverviewSketch);
            const { res, _ } = await getPFCItemStitchingOverviewSketch(pfcStitchingOverviewSketch.value)
            arrItemStitchingOverviewSketch.value = res.data.data;
            success("Insert new Item STITCHING OVERVIEW SKETCH successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM STITCHING OVERVIEW SKETCH") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemStitchingOverviewSketch.ImageContent = res
            } else {
                if (oldImageUrl_Content.value && itemStitchingOverviewSketch.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemStitchingOverviewSketch(itemStitchingOverviewSketch)
            const { res, _ } = await getPFCItemStitchingOverviewSketch(pfcStitchingOverviewSketch.value)
            arrItemStitchingOverviewSketch.value = res.data.data;
            success("Insert new Item STITCHING OVERVIEW SKETCH successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped>
img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.el-card {
    margin: 10px;
    position: relative;
    z-index: 1;
}
</style>