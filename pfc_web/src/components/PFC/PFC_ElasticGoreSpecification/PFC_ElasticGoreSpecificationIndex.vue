<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">ELASTIC GORE SPECIFICATION</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewElasticGoreSpecification">
            ADD NEW ELASTIC GORE SPECIFICATION
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
                        <el-button size="small" @click="btnUpdatePFCElasticGoreSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCElasticGoreSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCElasticGoreSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-col>

    <!-- DIA LOG -->
    <el-dialog v-model="dialogForm1Visible" width="35vw" :close-on-click-modal="false"
        @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm1 }}
            </div>
        </template>
        <el-form style="width: 30vw" :model="pfcElasticGoreSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcElasticGoreSpecification.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcElasticGoreSpecification.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcElasticGoreSpecification.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcElasticGoreSpecification.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcElasticGoreSpecification.Title" />
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

    <el-dialog v-model="dialogForm2Visible" width="80vw" :close-on-click-modal="false"
        @close="dialogForm2Visible = false" style="min-height: 60vh;">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                ITEM ELASTIC GORE SPECIFICATION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewElasticGoreSpecification">
            ADD NEW ITEM ELASTIC GORE SPECIFICATION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />
                <el-table-column label="ELASTIC GORE SPECIFICATION">
                    <template #default="{ row }">
                        {{ pfcElasticGoreSpecification.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="Component" label="Component" />
                <el-table-column prop="Vendor" label="Vendor" />
                <el-table-column prop="Material" label="Material & Application" />
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewElasticGoreSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewElasticGoreSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="45vw" :close-on-click-modal="false"
        @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <el-form style="width: 40vw" :model="pfcItemElasticGoreSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemElasticGoreSpecification.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Component: ">
                <el-input v-model="pfcItemElasticGoreSpecification.Component" />
            </el-form-item>
            <el-form-item label="Vendor: ">
                <el-input v-model="pfcItemElasticGoreSpecification.Vendor" />
            </el-form-item>
            <el-form-item label="Material & Application: ">
                <el-input v-model="pfcItemElasticGoreSpecification.Material" />
            </el-form-item>

            <el-form-item label=" ">
                <el-col>
                    <el-card shadow="always" class="dark-mode">
                        <el-col style="text-align: center; align-content: center;">
                            <el-upload class="avatar-uploader" :show-file-list="false" :on-change="handleChange_Remark"
                                :http-request="customUpload_Remark" :before-upload="checkTypeFileUpload">
                                <img v-if="imageUrl_Content" :src="imageUrl_Content" class="upload-container avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
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
                    <el-table :data="arrElasticGore" :row-style="{ height: '30px' }" border :span-method="mergeCells"
                        style="align-content: center; justify-items: center;">
                        <el-table-column align="center" prop="Model" label="Model">
                            <template #default="{ row }">
                                <div v-if="!row.editingModel" @dblclick="enableEdit(row, 'Model')"
                                    style="min-height: 20px;">
                                    {{ row.Model || "" }}
                                </div>
                                <el-input v-else v-model="row.Model" @blur="disableEdit(row, 'Model')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="SIZE" label="SIZE">
                            <template #default="{ row }">
                                <div v-if="!row.editingSIZE" @dblclick="enableEdit(row, 'SIZE')"
                                    style="min-height: 20px;">
                                    {{ row.SIZE || "" }}
                                </div>
                                <el-input v-else v-model="row.SIZE" @blur="disableEdit(row, 'SIZE')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="A" label="A">
                            <template #default="{ row }">
                                <div v-if="!row.editingA" @dblclick="enableEdit(row, 'A')" style="min-height: 20px;">
                                    {{ row.A || "" }}
                                </div>
                                <el-input v-else v-model="row.A" @blur="disableEdit(row, 'A')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="B" label="B">
                            <template #default="{ row }">
                                <div v-if="!row.editingB" @dblclick="enableEdit(row, 'B')" style="min-height: 20px;">
                                    {{ row.B || "" }}
                                </div>
                                <el-input v-else v-model="row.B" @blur="disableEdit(row, 'B')" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemElasticGoreSpecification">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import { deleteFilePFCModelFromFolderPFCModel, uploadFilePFCModelFromFolderPFCModel } from '@/hooks/PFC/usePFC';
import { DeletePFCItemElasticGoreSpecification, DeletePFCElasticGoreSpecification, GetAllPFCItemElasticGoreSpecification, GetAllPFCElasticGoreSpecification, InsertPFCItemElasticGoreSpecification, InsertPFCElasticGoreSpecification, UpdatePFCItemElasticGoreSpecification, UpdatePFCElasticGoreSpecification } from '@/hooks/PFC/useElasticGoreSpecification';
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
    (arrItemElasticGoreSpecification.value || []).filter(
        (data) =>
            !search1.value ||
            data.Component.toLowerCase().includes(search1.value.toLowerCase())
    )
);

const tableData = ref([]);
const arrElasticGore = ref([{}, {}, {}, {}, {}])

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW ELASTIC GORE SPECIFICATION")
const titleDialogForm2 = ref("ADD NEW ITEM ELASTIC GORE SPECIFICATION")
const pfcElasticGoreSpecification = ref({} as Record<string, any>)
const pfcItemElasticGoreSpecification = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemElasticGoreSpecification = ref([]);

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

const mergeCells = ({ rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
        if (rowIndex === 0) {
            return [arrElasticGore.value.length, 1];
        } else {
            return [0, 0];
        }
    }
};

const reloadData = async () => {
    const res = await GetAllPFCElasticGoreSpecification(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewElasticGoreSpecification = () => {
    titleDialogForm1.value = "ADD NEW ELASTIC GORE SPECIFICATION"
    pfcElasticGoreSpecification.value = {};
    pfcElasticGoreSpecification.value.ModelType = pfcModel.value.ModelType
    pfcElasticGoreSpecification.value.ModelName = pfcModel.value.ModelName
    pfcElasticGoreSpecification.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcElasticGoreSpecification.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;
}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW ELASTIC GORE SPECIFICATION") {
        try {
            await InsertPFCElasticGoreSpecification(pfcElasticGoreSpecification.value)
            success("Insert new ELASTIC GORE SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE ELASTIC GORE SPECIFICATION") {
        try {
            await UpdatePFCElasticGoreSpecification(pfcElasticGoreSpecification.value)
            success("Update ELASTIC GORE SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCElasticGoreSpecification = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            const res = await GetAllPFCItemElasticGoreSpecification(row)
            if (res.data.length && res.data.data.length > 0) {
                error("Please delete Item ELASTIC GORE SPECIFICATION!")
            } else {
                await DeletePFCElasticGoreSpecification(row);
                await reloadData()
                success("Delete ELASTIC GORE SPECIFICATION successfully!")
            }
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const btnUpdatePFCElasticGoreSpecification = async (index: number, row) => {
    pfcElasticGoreSpecification.value = {};
    pfcElasticGoreSpecification.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE ELASTIC GORE SPECIFICATION"
    dialogForm1Visible.value = true;
}

const btnItemPFCElasticGoreSpecification = async (index: number, row) => {
    showLoading();
    pfcElasticGoreSpecification.value = {};
    pfcElasticGoreSpecification.value = Object.assign({}, row);
    const res = await GetAllPFCItemElasticGoreSpecification(pfcElasticGoreSpecification.value)
    arrItemElasticGoreSpecification.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewElasticGoreSpecification = () => {
    pfcItemElasticGoreSpecification.value = {};
    pfcItemElasticGoreSpecification.value.ItemIndex = `${arrItemElasticGoreSpecification.value.length + 1}`
    pfcItemElasticGoreSpecification.value.ElasticGoreSpecificationID = pfcElasticGoreSpecification.value.ElasticGoreSpecificationID;
    arrElasticGore.value = [{}, {}, {}, {}, {}]
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewElasticGoreSpecification = async (index: number, row) => {
    pfcItemElasticGoreSpecification.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.ImageContent.toString();
    arrElasticGore.value[0] = JSON.parse(row.TableRow1);
    arrElasticGore.value[1] = JSON.parse(row.TableRow2);
    arrElasticGore.value[2] = JSON.parse(row.TableRow3);
    arrElasticGore.value[3] = JSON.parse(row.TableRow4);
    arrElasticGore.value[4] = JSON.parse(row.TableRow5);
    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM ELASTIC GORE SPECIFICATION"
    dialogForm3Visible.value = true;
}

const btnDeleteItemNewElasticGoreSpecification = async (index: number, row) => {
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
            await DeletePFCItemElasticGoreSpecification(row);
            const res = await GetAllPFCItemElasticGoreSpecification(pfcElasticGoreSpecification.value)
            arrItemElasticGoreSpecification.value = res.data.data;
            success("Delete PFC Item ELASTIC GORE SPECIFICATION successfully!")
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
    pfcItemElasticGoreSpecification.value.ImageContent = null;
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

const btnConfirmItemElasticGoreSpecification = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    pfcElasticGoreSpecification.value.Model = JSON.parse(JSON.stringify(arrElasticGore.value[0])).Model.toString();
    const itemElasticGoreSpecification = {
        ItemElasticGoreSpecificationID: pfcItemElasticGoreSpecification.value.ItemElasticGoreSpecificationID,
        ElasticGoreSpecificationID: pfcItemElasticGoreSpecification.value.ElasticGoreSpecificationID,
        Component: pfcItemElasticGoreSpecification.value.Component,
        Vendor: pfcItemElasticGoreSpecification.value.Vendor,
        Material: pfcItemElasticGoreSpecification.value.Material,
        Model: pfcElasticGoreSpecification.value.Model,
        ImageContent: pfcItemElasticGoreSpecification.value.ImageContent,
        TableRow1: JSON.stringify(arrElasticGore.value[0]),
        TableRow2: JSON.stringify(arrElasticGore.value[1]),
        TableRow3: JSON.stringify(arrElasticGore.value[2]),
        TableRow4: JSON.stringify(arrElasticGore.value[3]),
        TableRow5: JSON.stringify(arrElasticGore.value[4]),
        ItemIndex: pfcItemElasticGoreSpecification.value.ItemIndex.toString(),
    }

    if (titleDialogForm2.value === "ADD NEW ITEM ELASTIC GORE SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemElasticGoreSpecification.ImageContent = res
            }
            await InsertPFCItemElasticGoreSpecification(itemElasticGoreSpecification);
            const res = await GetAllPFCItemElasticGoreSpecification(pfcElasticGoreSpecification.value)
            arrItemElasticGoreSpecification.value = res.data.data;
            success("Insert new Item ELASTIC GORE SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM ELASTIC GORE SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemElasticGoreSpecification.ImageContent = res
            } else {
                if (oldImageUrl_Content.value && itemElasticGoreSpecification.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await UpdatePFCItemElasticGoreSpecification(itemElasticGoreSpecification)
            const res = await GetAllPFCItemElasticGoreSpecification(pfcElasticGoreSpecification.value)
            arrItemElasticGoreSpecification.value = res.data.data;
            success("Insert new Item ELASTIC GORE SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped></style>