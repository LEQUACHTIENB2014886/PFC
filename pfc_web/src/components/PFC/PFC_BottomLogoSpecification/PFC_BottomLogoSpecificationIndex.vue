<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">BOTTOM LOGO SPECIFICATION</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewBottomLogoSpecification">
            ADD NEW BOTTOM LOGO SPECIFICATION
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
                        <el-button size="small" @click="btnUpdatePFCBottomLogoSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCBottomLogoSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCBottomLogoSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcBottomLogoSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcBottomLogoSpecification.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcBottomLogoSpecification.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcBottomLogoSpecification.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcBottomLogoSpecification.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcBottomLogoSpecification.Title" />
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
                ITEM BOTTOM LOGO SPECIFICATION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewBottomLogoSpecification">
            ADD NEW ITEM BOTTOM LOGO SPECIFICATION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="200" />
                <el-table-column label="BOTTOM LOGO SPECIFICATION">
                    <template #default="{ row }">
                        {{ pfcBottomLogoSpecification.Title }}
                    </template>
                </el-table-column>
                <el-table-column prop="MaterialApplication" label="MaterialApplication" />
                <!-- <el-table-column prop="Component" label="Component" /> -->
                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewBottomLogoSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewBottomLogoSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 40vw" :model="pfcItemBottomLogoSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index:">
                <el-select v-model="pfcItemBottomLogoSpecification.ItemIndex" clearable placeholder="Select">
                    <el-option v-for="item in ItemIndex" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Vendor: ">
                <el-input v-model="pfcItemBottomLogoSpecification.Vendor" />
            </el-form-item>
            <el-form-item label="MaterialApplication: ">
                <el-input v-model="pfcItemBottomLogoSpecification.MaterialApplication" />
            </el-form-item>
            <el-form-item label="">
                <el-col>
                    <el-table :data="arrComponent" :row-style="{ height: '30px' }" border  :span-method="mergeCells">
                        <el-table-column align="center" prop="arrModel.Model" label="Model">
                            <template #default="{ row }">
                                <div v-if="!row.editingModel" @dblclick="enableEdit(row, 'Model')"
                                    style="min-height: 20px;">
                                    {{ row.Model || "" }}
                                </div>
                                <el-input v-else v-model="row.Model" @blur="disableEdit(row, 'Model')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrComponent.SIZE" label="Size" width="100">
                            <template #default="{ row }">
                                <div v-if="!row.editingSIZE" @dblclick="enableEdit(row, 'SIZE')" style="min-height: 20px;">
                                    {{ row.SIZE }}
                                </div>
                                <el-input v-else v-model="row.SIZE" @blur="disableEdit(row, 'SIZE')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrComponent.SizeA" label="SizeA">
                            <template #default="{ row }">
                                <div v-if="!row.editingSizeA" @dblclick="enableEdit(row, 'SizeA')"
                                    style="min-height: 20px;">
                                    {{ row.SizeA }}
                                </div>
                                <el-input v-else v-model="row.SizeA" @blur="disableEdit(row, 'SizeA')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrComponent.SizeB" label="SizeB">
                            <template #default="{ row }">
                                <div v-if="!row.editingSizeB" @dblclick="enableEdit(row, 'SizeB')"
                                    style="min-height: 20px;">
                                    {{ row.SizeB }}
                                </div>
                                <el-input v-else v-model="row.SizeB" @blur="disableEdit(row, 'SizeB')" />
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
                <el-button type="primary" @click="btnConfirmItemBottomLogoSpecification">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemBottomLogoSpecification, deletePFCBottomLogoSpecification, getPFCItemBottomLogoSpecification, getPFCBottomLogoSpecificationByModelID, insertItemPFCBottomLogoSpecification, insertPFCBottomLogoSpecification, updatePFCItemBottomLogoSpecification, updatePFCBottomLogoSpecification } from '@/hooks/PFC/useBottomLogoSpecification';
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
    (arrItemBottomLogoSpecification.value || []).filter(
        (data) =>
            !search1.value ||
            data.Component.toLowerCase().includes(search1.value.toLowerCase())
    )
);

const tableData = ref([]);
const arrComponent = ref([]);
arrComponent.value = Array.from({ length: 6 }, () => ({}));

const arrModel= ref([{}]);
const mergeCells = ({ rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
        if (rowIndex === 0) {
            return [arrComponent.value.length, 1];
        } else {
            return [0, 0];
        }
    }
};
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW BOTTOM LOGO SPECIFICATION")
const titleDialogForm2 = ref("ADD NEW ITEM BOTTOM LOGO SPECIFICATION")
const pfcBottomLogoSpecification = ref({} as Record<string, any>)
const pfcItemBottomLogoSpecification = ref({} as Record<string, any>)
const ItemIndex = [1, 2, 3, 4]
const arrItemBottomLogoSpecification = ref([]);

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
    const { res, _ } = await getPFCBottomLogoSpecificationByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewBottomLogoSpecification = () => {
    titleDialogForm1.value = "ADD NEW BOTTOM LOGO SPECIFICATION"
    pfcBottomLogoSpecification.value = {};
    pfcBottomLogoSpecification.value.ModelType = pfcModel.value.ModelType
    pfcBottomLogoSpecification.value.ModelName = pfcModel.value.ModelName
    pfcBottomLogoSpecification.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcBottomLogoSpecification.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW BOTTOM LOGO SPECIFICATION") {
        try {
            await insertPFCBottomLogoSpecification(pfcBottomLogoSpecification.value)
            success("Insert new BOTTOM LOGO SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE BOTTOM LOGO SPECIFICATION") {
        try {
            await updatePFCBottomLogoSpecification(pfcBottomLogoSpecification.value)
            success("Update BOTTOM LOGO SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCBottomLogoSpecification = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemBottomLogoSpecification(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCBottomLogoSpecification(row);
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

const btnUpdatePFCBottomLogoSpecification = async (index: number, row) => {
    pfcBottomLogoSpecification.value = {};
    pfcBottomLogoSpecification.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE BOTTOM LOGO SPECIFICATION"
    dialogForm1Visible.value = true;
}

const btnItemPFCBottomLogoSpecification = async (index: number, row) => {
    showLoading();
    pfcBottomLogoSpecification.value = {};
    pfcBottomLogoSpecification.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemBottomLogoSpecification(pfcBottomLogoSpecification.value)
    arrItemBottomLogoSpecification.value = res.data.data ? res.data.data : [];
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewBottomLogoSpecification = () => {
    pfcItemBottomLogoSpecification.value = {};
    pfcItemBottomLogoSpecification.value.ItemIndex = `${arrItemBottomLogoSpecification.value.length + 1}`
    pfcItemBottomLogoSpecification.value.BottomLogoSpecificationID = pfcBottomLogoSpecification.value.BottomLogoSpecificationID;
    arrComponent.value = Array.from({ length: 6 }, () => ({}));
    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewBottomLogoSpecification = async (index: number, row) => {
    pfcItemBottomLogoSpecification.value = Object.assign({}, row);
    oldImageUrl_Content.value = row.ImageContent.toString();

    try {
        arrComponent.value = row.Size ? JSON.parse(row.Size) : Array.from({ length: 6 }, () => ({}));

        arrComponent.value = arrComponent.value.map(item => ({
            ...item,
            Model: row.Model || "" 
        }));

        arrModel.value = row.Model; 

    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrComponent.value = Array.from({ length: 6 }, () => ({ Model: "" }));
    }

    imageUrl_Content.value = getURLImage(row.ImageContent, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM BOTTOM LOGO SPECIFICATION";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewBottomLogoSpecification = async (index: number, row) => {
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
            await deletePFCItemBottomLogoSpecification(row);
            const { res, _ } = await getPFCItemBottomLogoSpecification(pfcBottomLogoSpecification.value)
            arrItemBottomLogoSpecification.value = res.data.data;
            success("Delete PFC Item BOTTOM LOGO SPECIFICATION successfully!")
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
    pfcItemBottomLogoSpecification.value.ImageContent = null;
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

const btnConfirmItemBottomLogoSpecification = async () => {
    dialogForm3Visible.value = false;
    showLoading();
    const itemBottomLogoSpecification = {
        ItemBottomLogoSpecificationID: pfcItemBottomLogoSpecification.value.ItemBottomLogoSpecificationID,
        BottomLogoSpecificationID: pfcItemBottomLogoSpecification.value.BottomLogoSpecificationID,
        MaterialApplication: pfcItemBottomLogoSpecification.value.MaterialApplication,
        Model: arrComponent.value.length > 0 ? arrComponent.value[0].Model : "", 
        Vendor: pfcItemBottomLogoSpecification.value.Vendor,
        ImageContent: pfcItemBottomLogoSpecification.value.ImageContent,
        Size: JSON.stringify(arrComponent.value.map(({ Model, ...rest }) => rest)),
        ItemIndex: pfcItemBottomLogoSpecification.value.ItemIndex.toString(),
    }

    if (titleDialogForm2.value === "ADD NEW ITEM BOTTOM LOGO SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomLogoSpecification.ImageContent = res
            }
            await insertItemPFCBottomLogoSpecification(itemBottomLogoSpecification);
            const { res, _ } = await getPFCItemBottomLogoSpecification(pfcBottomLogoSpecification.value)
            arrItemBottomLogoSpecification.value = res.data.data;
            success("Insert new Item BOTTOM LOGO SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM BOTTOM LOGO SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemBottomLogoSpecification.ImageContent = res
            } else {
                if (oldImageUrl_Content.value && itemBottomLogoSpecification.ImageContent === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemBottomLogoSpecification(itemBottomLogoSpecification)
            const { res, _ } = await getPFCItemBottomLogoSpecification(pfcBottomLogoSpecification.value)
            arrItemBottomLogoSpecification.value = res.data.data;
            success("Insert new Item BOTTOM LOGO SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style lang="css" scoped></style>