<template>
    <div style="height: 80vh; width: 83vw;">
        <el-row :span="24" style="height: 80vh;">
            <h4 style="width: 100%; text-align: center;">COVER</h4>
            <el-divider border-style="dashed" />

            <el-row style="height: 75vh; overflow: auto; width: 90vw;">
                <el-col :span="12">
                    <el-row style="padding: 20px;">
                        <h4>Model Summary</h4>
                    </el-row>

                    <el-form style="max-width: 600px" :model="model" label-width="auto" :label-position="labelPosition"
                        :size="size">
                        <el-form-item label="Model Type:">
                            <el-col :span="11">
                                <el-select v-model="ModelType" clearable placeholder="Select model type"
                                    style="width: 100%" :disabled="true">
                                    <el-option v-for="item in optionModelType" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Model name:">
                            <el-input v-model="model.ModelName" :disabled="true" />
                        </el-form-item>
                        <el-form-item label="Material number:">
                            <el-input v-model="model.MaterialNumber" :disabled="true" />
                        </el-form-item>

                        <el-form-item label="Model ID:">
                            <el-input v-model="model.ModelID" />
                        </el-form-item>
                        <el-form-item label="Colorway ID:">
                            <el-input v-model="model.ColorWayID" />
                        </el-form-item>
                        <el-form-item label="BOM ID:">
                            <el-input v-model="model.BOMID" />
                        </el-form-item>
                        <el-form-item label="Date:">
                            <el-col :span="11">
                                <el-date-picker v-model="model.Date" type="date" aria-label="Pick a date"
                                    placeholder="Pick a date" style="width: 100%" />
                            </el-col>
                        </el-form-item>
                        <el-form-item label="IDS:">
                            <el-col :span="11">
                                <el-select v-model="IDS" clearable placeholder="Select ids" style="width: 100%">
                                    <el-option v-for="item in optionIDS" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Converse:">
                            <el-col :span="11">
                                <el-select v-model="Converse" clearable placeholder="Select converse"
                                    style="width: 100%">
                                    <el-option v-for="item in optionConverse" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Size range:">
                            <el-input v-model="model.SizeRange" />
                        </el-form-item>
                        <el-form-item label="Last code:">
                            <el-input v-model="model.LastCode" />
                        </el-form-item>
                        <el-form-item label="Tool code:">
                            <el-input v-model="model.ToolCode" />
                        </el-form-item>
                        <el-form-item label="Pattern filename:">
                            <el-input v-model="model.PatternFileName" />
                        </el-form-item>
                        <el-form-item label="First source:">
                            <el-input v-model="model.FirstSource" />
                        </el-form-item>
                        <el-form-item label="Key Manufacturing Processes:">
                            <el-input v-model="model.KeyManufacturingProcesses" type="textarea" :rows="5" />
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-col :span="12">
                    <el-row style="padding: 20px; display: flex; justify-content: space-between;">
                        <h4>Model Picture</h4>
                        <el-form-item>
                            <el-button type="warning" icon="Printer" circle @click="exportThisSheet" />
                            <el-button type="primary" icon="Check" circle @click="onSubmit" />
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="justify-items: center;">
                            <ResizableImageView ref="medialSideViewRef" v-model:model="medialSideView"
                                title="Medial Side View" :widthCm="10" :heightCm="4" style="padding-bottom: 20px;" />
                            <ResizableImageView ref="lateralSideViewRef" v-model:model="lateralSideView" :widthCm="10"
                                :heightCm="5" title="Lateral Side View" style="padding-bottom: 20px;" />
                            <ResizableImageView ref="bottomViewRef" v-model:model="bottomView" :widthCm="10"
                                :heightCm="5" title="Bottom View" style="padding-bottom: 20px;" />
                            <ResizableImageView ref="frontViewRef" v-model:model="frontView" :widthCm="7" :heightCm="8"
                                title="Front View" style="padding-bottom: 20px;" />
                            <ResizableImageView ref="heelViewRef" v-model:model="heelView" :widthCm="7" :heightCm="8"
                                title="Heel View" />
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

import {
    reactive,
    ref,
    onMounted
} from 'vue'
import { ElLoading, ElNotification, type ComponentSize, type FormProps } from 'element-plus'
import { usePFCStore } from "@/stores/PFCStore";
import Model from "@/interfaces/Model";
import {
    workbook,
    loadExampleExcelFile,
    getURLImage,
    updatePFCModel,
    uploadFormDataMedialSideView,
    uploadFormDataLateralSideView,
    uploadFormDataFrontView,
    uploadFormDataBottomView,
    uploadFormDataHeelView,
    uploadFormDataMedialSideViewV1,
    uploadFormDataLateralSideViewV1,
    uploadFormDataFrontViewV1,
    uploadFormDataBottomViewV1,
    uploadFormDataHeelViewV1
} from "@/hooks/useHome"
import type { UploadProps } from 'element-plus'
import {
    displaySheetAsPDF
} from "@/hooks/PFC/useCover"
import { optionConverse, optionIDS, optionModelType } from "@/utils/PFC/CoverSheet"
import { exportExcel, getBlobMedial, getFormData, loadFileExcel } from '@/utils/PFC/ExcelFunction';
import ResizableImageView, { PFCUploadImage } from '@/components/Utils/PFC_UploadImageView.vue'
import { deleteFilePFCModelFromFolderPFCModel } from '@/hooks/PFC/usePFC';

const size = ref<ComponentSize>('default')
const labelPosition = ref<FormProps['labelPosition']>('right')
const store = usePFCStore();
const loading = ref(null);

const imageUrl_MedialSideView = ref('')
const imageUrl_LateralSideView = ref('')
const imageUrl_FrontView = ref('')
const imageUrl_BottomView = ref('')
const imageUrl_HeelView = ref('')

const formData_MedialSideView = new FormData();
const formData_LateralSideView = new FormData();
const formData_FrontView = new FormData();
const formData_BottomView = new FormData();
const formData_HeelView = new FormData();

const medialSideViewRef = ref(null);
const lateralSideViewRef = ref(null);
const frontViewRef = ref(null);
const bottomViewRef = ref(null);
const heelViewRef = ref(null);

const model = reactive<Model>({
    ModelType: "",
    ModelName: "",
    MaterialNumber: "",
    ModelID: "",
    ColorWayID: "",
    BOMID: "",
    Date: "",
    SizeRange: "",
    LastCode: "",
    ToolCode: "",
    PatternFileName: "",
    FirstSource: "",
    MedialSideView: "",
    LateralSideView: "",
    BottomView: "",
    FrontView: "",
    HeelView: "",
    KeyManufacturingProcesses: "",
    IDS: "",
    Converse: "",
    MedialSideViewV1: "",
    LateralSideViewV1: "",
    BottomViewV1: "",
    FrontViewV1: "",
    HeelViewV1: "",
});


const oldModel = reactive<Model>({
    ModelType: "",
    ModelName: "",
    MaterialNumber: "",
    ModelID: "",
    ColorWayID: "",
    BOMID: "",
    Date: "",
    SizeRange: "",
    LastCode: "",
    ToolCode: "",
    PatternFileName: "",
    FirstSource: "",
    MedialSideView: "",
    LateralSideView: "",
    BottomView: "",
    FrontView: "",
    HeelView: "",
    KeyManufacturingProcesses: "",
    IDS: "",
    Converse: "",
    MedialSideViewV1: "",
    LateralSideViewV1: "",
    BottomViewV1: "",
    FrontViewV1: "",
    HeelViewV1: "",
});

const IDS = ref('')
const ModelType = ref('')
const Converse = ref('')

const medialSideView = ref({} as Record<string, any>);
const lateralSideView = ref({} as Record<string, any>);
const frontView = ref({} as Record<string, any>);
const bottomView = ref({} as Record<string, any>);
const heelView = ref({} as Record<string, any>);

onMounted(() => {
    const storedRow = localStorage.getItem("selectedRow");
    if (storedRow) {
        Object.assign(model, JSON.parse(storedRow));
        Object.assign(oldModel, JSON.parse(storedRow));
    } else {
        Object.assign(model, store.selectedRow);
        Object.assign(oldModel, store.selectedRow);
    }
    IDS.value = model.IDS.toString();
    ModelType.value = optionModelType[0].value.toString()
    Converse.value = optionConverse[0].value.toString()
    ModelType.value = model.ModelType.toString();
    Converse.value = model.Converse.toString();
    imageUrl_MedialSideView.value = getURLImage(model.MedialSideView, model)
    imageUrl_LateralSideView.value = getURLImage(model.LateralSideView, model)
    imageUrl_FrontView.value = getURLImage(model.FrontView, model)
    imageUrl_BottomView.value = getURLImage(model.BottomView, model)
    imageUrl_HeelView.value = getURLImage(model.HeelView, model)

    medialSideView.value = safeJsonParse(model.MedialSideViewV1, medialSideView.value);
    medialSideView.value.url = getURLImage(medialSideView.value.url, model)

    lateralSideView.value = safeJsonParse(model.LateralSideViewV1, lateralSideView.value);
    lateralSideView.value.url = getURLImage(lateralSideView.value.url, model)

    bottomView.value = safeJsonParse(model.BottomViewV1, bottomView.value);
    bottomView.value.url = getURLImage(bottomView.value.url, model)

    frontView.value = safeJsonParse(model.FrontViewV1, frontView.value);
    frontView.value.url = getURLImage(frontView.value.url, model)

    heelView.value = safeJsonParse(model.HeelViewV1, heelView.value);
    heelView.value.url = getURLImage(heelView.value.url, model)
});

const onSubmit = async () => {
    showLoading()
    try {
        model.IDS = IDS.value
        model.ModelType = ModelType.value
        model.Converse = Converse.value
        const fileMedialSideView = await getFormData(medialSideView.value.url, medialSideView.value.name)
        if (fileMedialSideView) {
            formData_MedialSideView.append("file", fileMedialSideView);
        }
        if (!medialSideView.value.url && oldModel.MedialSideView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.MedialSideView, oldModel)
            const oldMMedialSideView = safeJsonParse(oldModel.MedialSideViewV1, {} as Record<string, any>)
            await deleteFilePFCModelFromFolderPFCModel(oldMMedialSideView.url, oldModel)
            model.MedialSideView = ""
            model.MedialSideViewV1 = ""
        }
        if (formData_MedialSideView && formData_MedialSideView.entries().next().value) {
            const fileMedialSideViewRef = await getBlobMedial(medialSideViewRef, medialSideView.value.name);
            const formData_MedialSideViewRef = new FormData();
            formData_MedialSideViewRef.append("file", fileMedialSideViewRef)
            await uploadFormDataMedialSideView(formData_MedialSideViewRef, model, oldModel)
            const res = await uploadFormDataMedialSideViewV1(formData_MedialSideView, model, oldModel)
            medialSideView.value.url = res.data.data;
            model.MedialSideViewV1 = JSON.stringify(medialSideView.value);

        }

        const fileLateralSideView = await getFormData(lateralSideView.value.url, lateralSideView.value.name)
        if (fileLateralSideView) {
            formData_LateralSideView.append("file", fileLateralSideView);
        }

        if (!lateralSideView.value.url && oldModel.LateralSideView) {
            console.log(lateralSideView.value.url)
            console.log(oldModel.LateralSideView)
            await deleteFilePFCModelFromFolderPFCModel(oldModel.LateralSideView, oldModel)
            const oldLateralSideView = safeJsonParse(oldModel.LateralSideViewV1, {} as Record<string, any>)
            await deleteFilePFCModelFromFolderPFCModel(oldLateralSideView.url, oldModel)
            model.LateralSideView = ""
            model.LateralSideViewV1 = ""
        }
        if (formData_LateralSideView && formData_LateralSideView.entries().next().value) {
            const fileLateralSideViewRef = await getBlobMedial(lateralSideViewRef, lateralSideView.value.name);
            const formData_LateralSideViewRef = new FormData();
            formData_LateralSideViewRef.append("file", fileLateralSideViewRef)
            await uploadFormDataLateralSideView(formData_LateralSideViewRef, model, oldModel)
            const res = await uploadFormDataLateralSideViewV1(formData_LateralSideView, model, oldModel)
            lateralSideView.value.url = res.data.data;
            model.LateralSideViewV1 = JSON.stringify(lateralSideView.value)
        }

        const fileFrontView = await getFormData(frontView.value.url, frontView.value.name)
        if (fileFrontView) {
            formData_FrontView.append("file", fileFrontView);
        }
        if (!frontView.value.url && oldModel.FrontView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.FrontView, oldModel)
            const oldFrontView = safeJsonParse(oldModel.FrontViewV1, {} as Record<string, any>)
            await deleteFilePFCModelFromFolderPFCModel(oldFrontView.url, oldModel)
            model.FrontView = ""
            model.FrontViewV1 = ""
        }
        if (formData_FrontView && formData_FrontView.entries().next().value) {
            const fileFrontViewRef = await getBlobMedial(frontViewRef, frontView.value.name);
            const formData_FrontViewRef = new FormData();
            formData_FrontViewRef.append("file", fileFrontViewRef)
            await uploadFormDataFrontView(formData_FrontViewRef, model, oldModel)
            const res = await uploadFormDataFrontViewV1(formData_FrontView, model, oldModel)
            frontView.value.url = res.data.data;
            model.FrontViewV1 = JSON.stringify(frontView.value)
        }

        const fileBottomView = await getFormData(bottomView.value.url, bottomView.value.name)
        if (fileBottomView) {
            formData_BottomView.append("file", fileBottomView);
        }
        if (!bottomView.value.url && oldModel.BottomView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.BottomView, oldModel)
            const oldBottomView = safeJsonParse(oldModel.BottomViewV1, {} as Record<string, any>)
            await deleteFilePFCModelFromFolderPFCModel(oldBottomView.url, oldModel)
            model.BottomView = ""
            model.BottomViewV1 = ""
        }
        if (formData_BottomView && formData_BottomView.entries().next().value) {
            const fileBottomViewRef = await getBlobMedial(bottomViewRef, bottomView.value.name);
            const formData_BottomViewRef = new FormData();
            formData_BottomViewRef.append("file", fileBottomViewRef)
            await uploadFormDataBottomView(formData_BottomViewRef, model, oldModel)
            const res = await uploadFormDataBottomViewV1(formData_BottomView, model, oldModel)
            bottomView.value.url = res.data.data;
            model.BottomViewV1 = JSON.stringify(bottomView.value)
        }

        const fileHeelView = await getFormData(heelView.value.url, heelView.value.name)
        if (fileHeelView) {
            formData_HeelView.append("file", fileHeelView);
        }
        if (!heelView.value.url && oldModel.HeelView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.HeelView, oldModel)
            const oldHeelView = safeJsonParse(oldModel.HeelViewV1, {} as Record<string, any>)
            await deleteFilePFCModelFromFolderPFCModel(oldHeelView.url, oldModel)
            model.HeelView = ""
            model.HeelViewV1 = ""
        }
        if (formData_HeelView && formData_HeelView.entries().next().value) {
            const fileHeelViewRef = await getBlobMedial(heelViewRef, heelView.value.name);
            const formData_HeelViewRef = new FormData();
            formData_HeelViewRef.append("file", fileHeelViewRef)
            await uploadFormDataHeelView(formData_HeelViewRef, model, oldModel)
            const res = await uploadFormDataHeelViewV1(formData_HeelView, model, oldModel)
            heelView.value.url = res.data.data;
            model.HeelViewV1 = JSON.stringify(heelView.value)
        }

        const { res, _ } = await updatePFCModel(model)
        localStorage.setItem("selectedRow", JSON.stringify(res.data.data));
        Object.assign(model, res.data.data);
        Object.assign(oldModel, res.data.data);
        medialSideView.value = safeJsonParse(model.MedialSideViewV1, medialSideView.value);
        medialSideView.value.url = getURLImage(medialSideView.value.url, model)

        lateralSideView.value = safeJsonParse(model.LateralSideViewV1, lateralSideView.value);
        lateralSideView.value.url = getURLImage(lateralSideView.value.url, model)

        bottomView.value = safeJsonParse(model.BottomViewV1, bottomView.value);
        bottomView.value.url = getURLImage(bottomView.value.url, model)

        frontView.value = safeJsonParse(model.FrontViewV1, frontView.value);
        frontView.value.url = getURLImage(frontView.value.url, model)

        heelView.value = safeJsonParse(model.HeelViewV1, heelView.value);
        heelView.value.url = getURLImage(heelView.value.url, model)

        formData_MedialSideView.delete("file");
        formData_MedialSideView.delete("ModelName");

        formData_LateralSideView.delete("file");
        formData_LateralSideView.delete("ModelName");

        formData_BottomView.delete("file");
        formData_BottomView.delete("ModelName");

        formData_FrontView.delete("file");
        formData_FrontView.delete("ModelName");

        formData_HeelView.delete("file");
        formData_HeelView.delete("ModelName");
        hideLoading()
        success("Updated PFC Model!")
    } catch (err) {
        console.error(err)
        hideLoading()
        error("Error update PFC Model!")
    }
}

const reviewSheet = async () => {
    await loadExampleExcelFile(model)
    await displaySheetAsPDF("Cover", workbook.value)
}

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

const handleChange_MedialSideView = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_MedialSideView.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
    return true
}

const customUpload_MedialSideView = (options) => {
    const { file, onSuccess, onError } = options
    formData_MedialSideView.delete("file")
    formData_MedialSideView.delete("ModelName")
    formData_MedialSideView.append("file", file);

}

const handleDelete_MedialSideView = () => {
    imageUrl_MedialSideView.value = null;
    model.MedialSideView = null;
    formData_MedialSideView.delete("file");
    formData_MedialSideView.delete("ModelName");
};

const handleChange_LateralSideView = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_LateralSideView.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_LateralSideView = (options) => {
    const { file, onSuccess, onError } = options
    formData_LateralSideView.delete("file")
    formData_LateralSideView.append("file", file);
}

const handleDelete_LateralSideView = () => {
    imageUrl_LateralSideView.value = null;
    model.LateralSideView = null;
    formData_LateralSideView.delete("file");
    formData_LateralSideView.delete("ModelName");
};

const handleChange_FrontView = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_FrontView.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_FrontView = (options) => {
    const { file, onSuccess, onError } = options
    formData_FrontView.delete("file")
    formData_FrontView.delete("ModelName")
    formData_FrontView.append("file", file);
}

const handleDelete_FrontView = () => {
    imageUrl_FrontView.value = null;
    model.FrontView = null;
    formData_FrontView.delete("file");
    formData_FrontView.delete("ModelName");
};

const handleChange_BottomView = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_BottomView.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_BottomView = (options) => {
    const { file, onSuccess, onError } = options
    formData_BottomView.delete("file")
    formData_BottomView.delete("ModelName")
    formData_BottomView.append("file", file);
}

const handleDelete_BottomView = () => {
    imageUrl_BottomView.value = null;
    model.BottomView = null;
    formData_BottomView.delete("file");
    formData_BottomView.delete("ModelName");
};

const handleChange_HeelView = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        imageUrl_HeelView.value = e.target.result as string
    }
    reader.readAsDataURL(file.raw)
}

const customUpload_HeelView = (options) => {
    const { file, onSuccess, onError } = options
    formData_HeelView.delete("file")
    formData_HeelView.delete("ModelName")
    formData_HeelView.append("file", file);
}

const handleDelete_HeelView = () => {
    imageUrl_HeelView.value = null;
    model.HeelView = null;
    formData_HeelView.delete("file");
    formData_HeelView.delete("ModelName");
};

const showLoading = (text = 'Loading...') => {
    loading.value = ElLoading.service({
        lock: true,
        text,
        background: 'rgba(0, 0, 0, 0.7)',
    });
};

const hideLoading = () => {
    if (loading.value) {
        loading.value.close();
        loading.value = null;
    }
};

const success = (message) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}

const error = (err) => {
    ElNotification({
        title: 'Error',
        message: err,
        type: 'error',
    })
}

const info = (message) => {
    ElNotification({
        title: 'Info',
        message: message,
        type: 'info',
    })
}

const exportThisSheet = async () => {
    showLoading();
    await loadFileExcel("Cover")
    await exportExcel("Cover", model)
    hideLoading();
}

function safeJsonParse<T>(data: any, defaultValue: T): T {
    try {
        return data ? JSON.parse(data.toString()) : defaultValue;
    } catch (error) {
        console.error("JSON parse error:", error);
        return defaultValue;
    }
}

</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.upload-container {
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
}
</style>
