<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">UPPER HEATING PRESSING PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="">
                    ADD NEW UPPER HEATING PRESSING PROCESS
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
    </el-col>

    <!-- DIA LOG -->
    <el-dialog v-model="dialogForm1Visible" width="75vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm1 }}
            </div>
        </template>
        <el-form style="width: 70vw" :model="pfcUpperHeatingPressingProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.Title" />
            </el-form-item>
            <el-form-item label="Component Name: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.ComponentName" />
            </el-form-item>
            <el-form-item label="BOM#: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.BOM" />
            </el-form-item>
            <el-form-item label="Material: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.Material" />
            </el-form-item>
            <el-form-item label="Vendor: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.Vendor" />
            </el-form-item>
            <el-form-item label="Remarks Size: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.RemarksSize" />
            </el-form-item>
            <el-form-item label="Remarks A: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.RemarksA" />
            </el-form-item>
            <el-form-item label="Remarks B: ">
                <el-input v-model="pfcUpperHeatingPressingProcess.RemarksB" />
            </el-form-item>
            <el-form-item label=" ">
                <el-col>
                    <el-card shadow="always" class="dark-mode">
                        <el-col style="text-align: center; align-content: center;">
                            <el-upload class="avatar-uploader" :show-file-list="false" :on-change="handleChange_Remark"
                                :http-request="customUpload_Remark" :before-upload="checkTypeFileUpload">
                                <img v-if="imageUrl_Remark" :src="imageUrl_Remark" class="upload-container avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                            <el-button v-if="imageUrl_Remark" type="danger" icon="Delete" class="delete-button"
                                @click="handleDelete_Remark" size="small">
                            </el-button>
                            <h5 style="margin-top: 10px;">Image Remarks</h5>
                        </el-col>
                    </el-card>
                </el-col>
            </el-form-item>

            <el-form-item label=" ">
                <el-col>
                    <el-table :data="arrUpperHeating" :row-style="{ height: '30px' }" border>
                        <el-table-column type="index" label="No" width="50" align="center" />
                        <el-table-column align="center" prop="Process" label="Process 工段 Công đoạn">
                            <template #default="{ row }">
                                <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                    style="min-height: 20px; text-align: left;">
                                    {{ row.Process }}
                                </div>
                                <el-input v-else v-model="row.Process" @blur="disableEdit(row, 'Process')" />
                            </template>
                        </el-table-column>
                        <el-table-column label="Process details 明细流程 Chi tiết lưu trình" align="center">
                            <el-table-column prop="CurrentIntensity" width="150" align="left">
                                <template #header>
                                    Current Intensity <br> 电流 <br> Cường độ dòng điện
                                </template>
                                <template #default="{ row }">
                                    <div v-if="!row.editingCurrentIntensity" @click="enableEdit(row, 'CurrentIntensity')"
                                        style="min-height: 20px;">
                                        {{ row.CurrentIntensity }}
                                    </div>
                                    <el-input v-else v-model="row.CurrentIntensity"
                                        @blur="disableEdit(row, 'CurrentIntensity')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="Temp" width="150" align="center">
                                <template #header>
                                    Temp(actual temp. for mold) <br> 温度(模具实际温度) <br> Nhiệt độ (nhiệt độ thực tế của
                                    khuôn)
                                </template>
                                <template #default="{ row }">
                                    <div v-if="!row.editingTemp" @click="enableEdit(row, 'Temp')" style="min-height: 20px;">
                                        {{ row.Temp }}
                                    </div>
                                    <el-input v-else v-model="row.Temp" @blur="disableEdit(row, 'Temp')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="Time" width="150" align="center">
                                <template #header>
                                    Time <br> 时间 <br> Thời gian
                                </template>
                                <template #default="{ row }">
                                    <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')" style="min-height: 20px;">
                                        {{ row.Time }}
                                    </div>
                                    <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="Pressure" width="150" align="center">
                                <template #header>
                                    Pressure <br> 压力 <br> Lực ép
                                </template>
                                <template #default="{ row }">
                                    <div v-if="!row.editingPressure" @click="enableEdit(row, 'Pressure')"
                                        style="min-height: 20px;">
                                        {{ row.Pressure }}
                                    </div>
                                    <el-input v-else v-model="row.Pressure" @blur="disableEdit(row, 'Pressure')" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="Comments" label="Comments" width="150" align="center">
                                <template #header>
                                    Comments <br> 备注 <br> Ghi chú
                                </template>
                                <template #default="{ row }">
                                    <div v-if="!row.editingComments" @click="enableEdit(row, 'Comments')"
                                        style="min-height: 20px;">
                                        {{ row.Comments }}
                                    </div>
                                    <el-input v-else v-model="row.Comments" @blur="disableEdit(row, 'Comments')" />
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
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
</template>

<script lang="ts" setup>
import { error } from '@/utils/NotificationsView';
import { UploadProps } from 'element-plus';
import { ref } from 'vue';

const dialogForm1Visible = ref(true);
const titleDialogForm1 = ref("ADD NEW UPPER HEATING PRESSING PROCESS")
const pfcUpperHeatingPressingProcess = ref({} as Record<string, any>)
const arrUpperHeating = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
const formData_Remark = new FormData();
const imageUrl_Remark = ref('')
const oldImageUrl_Remark = ref('')

const enableEdit = (row: any, field: string) => {
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row: any, field: string) => {
    row[`editing${capitalize(field)}`] = false;
};

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

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
    pfcUpperHeatingPressingProcess.value.ImageRemark = null;
    formData_Remark.delete("file");
    formData_Remark.delete("ModelName");
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

const btnConfirm = async () => {
    console.log(pfcUpperHeatingPressingProcess.value)
    console.log(JSON.stringify(arrUpperHeating.value))
}

</script>