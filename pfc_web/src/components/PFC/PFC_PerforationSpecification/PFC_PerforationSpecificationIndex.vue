<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">PERFORATION SPECIFICATION</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewPerforationSpecification">
            ADD NEW PERFORATION SPECIFICATION
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
                        <el-button size="small" @click="btnUpdatePFCPerforationSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCPerforationSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCPerforationSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcPerforationSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcPerforationSpecification.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcPerforationSpecification.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcPerforationSpecification.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcPerforationSpecification.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcPerforationSpecification.Title" />
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
                ITEM PERFORATION SPECIFICATION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewPerforationSpecification">
            ADD NEW ITEM PERFORATION SPECIFICATION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />
                <el-table-column label="Perforation Specification">
                    <template #default="{ row }">
                        {{ pfcPerforationSpecification.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="Component" label="Component" />
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewPerforationSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewPerforationSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 40vw" :model="pfcItemPerforationSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemPerforationSpecification.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Component: ">
                <el-input v-model="pfcItemPerforationSpecification.Component" />
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
            <el-form-item label=" ">
                <el-col>
                    <el-table :data="arrPerforation" :row-style="{ height: '30px' }" border>
                        <el-table-column align="center" prop="SizeGroup" label="Size Group 分段 Phân đoạn size ">
                            <template #default="{ row }">
                                <div v-if="!row.editingSizeGroup" @click="enableEdit(row, 'SizeGroup')"
                                    style="min-height: 20px;">
                                    {{ row.SizeGroup }}
                                </div>
                                <el-input v-else v-model="row.SizeGroup" @blur="disableEdit(row, 'SizeGroup')" />
                            </template>
                        </el-table-column>
                        <el-table-column label="Perforation Size 冲孔尺寸 Kích cỡ lổ đục ">
                            <el-table-column prop="A" label="A" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingA" @click="enableEdit(row, 'A')" style="min-height: 20px;">
                                        {{ row.A }}
                                    </div>
                                    <el-input v-else v-model="row.A" @blur="disableEdit(row, 'A')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="B" label="B" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingB" @click="enableEdit(row, 'B')" style="min-height: 20px;">
                                        {{ row.B }}
                                    </div>
                                    <el-input v-else v-model="row.B" @blur="disableEdit(row, 'B')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="C" label="C" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingC" @click="enableEdit(row, 'C')" style="min-height: 20px;">
                                        {{ row.C }}
                                    </div>
                                    <el-input v-else v-model="row.C" @blur="disableEdit(row, 'C')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="D" label="D" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingD" @click="enableEdit(row, 'D')" style="min-height: 20px;">
                                        {{ row.D }}
                                    </div>
                                    <el-input v-else v-model="row.D" @blur="disableEdit(row, 'D')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="E" label="E" width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingE" @click="enableEdit(row, 'E')" style="min-height: 20px;">
                                        {{ row.E }}
                                    </div>
                                    <el-input v-else v-model="row.E" @blur="disableEdit(row, 'E')" />
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemPerforationSpecification">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemPerforationSpecification, deletePFCPerforationSpecification, getPFCItemPerforationSpecification, getPFCPerforationSpecificationByModelID, insertItemPFCPerforationSpecification, insertPFCPerforationSpecification, updatePFCItemPerforationSpecification, updatePFCPerforationSpecification } from '@/hooks/PFC/usePerforationSpecification';
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
    (arrItemPerforationSpecification.value || []).filter(
        (data) =>
            !search1.value ||
            data.Component.toLowerCase().includes(search1.value.toLowerCase())
    )
);

const tableData = ref([]);
const arrPerforation = ref([{}, {}, {}])

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW PERFORATION SPECIFICATION")
const titleDialogForm2 = ref("ADD NEW ITEM PERFORATION SPECIFICATION")
const pfcPerforationSpecification = ref({} as Record<string, any>)
const pfcItemPerforationSpecification = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemPerforationSpecification = ref([]);

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
    const { res, _ } = await getPFCPerforationSpecificationByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewPerforationSpecification = () => {
    titleDialogForm1.value = "ADD NEW PERFORATION SPECIFICATION"
    pfcPerforationSpecification.value = {};
    pfcPerforationSpecification.value.ModelType = pfcModel.value.ModelType
    pfcPerforationSpecification.value.ModelName = pfcModel.value.ModelName
    pfcPerforationSpecification.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcPerforationSpecification.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW PERFORATION SPECIFICATION") {
        try {
            await insertPFCPerforationSpecification(pfcPerforationSpecification.value)
            success("Insert new Perforation Specification successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE PERFORATION SPECIFICATION") {
        try {
            await updatePFCPerforationSpecification(pfcPerforationSpecification.value)
            success("Update Perforation Specification successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCPerforationSpecification = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            const { res, _ } = await getPFCItemPerforationSpecification(row)
            if (res.data.data.length > 0) {
                error("Please delete Item Perforation Specification!")
            } else {
                await deletePFCPerforationSpecification(row);
                await reloadData()
                success("Delete Perforation Specification successfully!")
            }
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const btnUpdatePFCPerforationSpecification = async (index: number, row) => {
    pfcPerforationSpecification.value = {};
    pfcPerforationSpecification.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE PERFORATION SPECIFICATION"
    dialogForm1Visible.value = true;
}

const btnItemPFCPerforationSpecification = async (index: number, row) => {
    showLoading();
    pfcPerforationSpecification.value = {};
    pfcPerforationSpecification.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemPerforationSpecification(pfcPerforationSpecification.value)
    arrItemPerforationSpecification.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewPerforationSpecification = () => {
    pfcItemPerforationSpecification.value = {};
    pfcItemPerforationSpecification.value.ItemIndex = `${arrItemPerforationSpecification.value.length + 1}`
    pfcItemPerforationSpecification.value.PerforationSpecificationID = pfcPerforationSpecification.value.PerforationSpecificationID;
    arrPerforation.value = [{}, {}, {}]
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewPerforationSpecification = async (index: number, row) => {
    pfcItemPerforationSpecification.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.ImageContent.toString();
    arrPerforation.value[0] = JSON.parse(row.SizeGroup1);
    arrPerforation.value[1] = JSON.parse(row.SizeGroup2);
    arrPerforation.value[2] = JSON.parse(row.SizeGroup3);
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM PERFORATION SPECIFICATION"
    dialogForm3Visible.value = true;
}

const btnDeleteItemNewPerforationSpecification = async (index: number, row) => {
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
            await deletePFCItemPerforationSpecification(row);
            const { res, _ } = await getPFCItemPerforationSpecification(pfcPerforationSpecification.value)
            arrItemPerforationSpecification.value = res.data.data;
            success("Delete PFC Item Perforation Specification successfully!")
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
    pfcItemPerforationSpecification.value.ImageContent = null;
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

const btnConfirmItemPerforationSpecification = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    const itemPerforationSpecification = {
        ItemPerforationSpecificationID: pfcItemPerforationSpecification.value.ItemPerforationSpecificationID,
        PerforationSpecificationID: pfcItemPerforationSpecification.value.PerforationSpecificationID,
        Component: pfcItemPerforationSpecification.value.Component,
        ImageContent: pfcItemPerforationSpecification.value.ImageContent,
        SizeGroup1: JSON.stringify(arrPerforation.value[0]),
        SizeGroup2: JSON.stringify(arrPerforation.value[1]),
        SizeGroup3: JSON.stringify(arrPerforation.value[2]),
        ItemIndex: pfcItemPerforationSpecification.value.ItemIndex.toString(),
    }

    if (titleDialogForm2.value === "ADD NEW ITEM PERFORATION SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemPerforationSpecification.ImageContent = res
            }
            await insertItemPFCPerforationSpecification(itemPerforationSpecification);
            const { res, _ } = await getPFCItemPerforationSpecification(pfcPerforationSpecification.value)
            arrItemPerforationSpecification.value = res.data.data;
            success("Insert new Item Perforation Specification successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM PERFORATION SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemPerforationSpecification.ImageContent = res
            } else {
                if (oldImageUrl_Content.value && itemPerforationSpecification.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemPerforationSpecification(itemPerforationSpecification)
            const { res, _ } = await getPFCItemPerforationSpecification(pfcPerforationSpecification.value)
            arrItemPerforationSpecification.value = res.data.data;
            success("Insert new Item Perforation Specification successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped></style>