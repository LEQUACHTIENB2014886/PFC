<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">OUTSOLE PRESSING PROCESS</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewOutsolePressingProcess">
            ADD NEW OUTSOLE PRESSING PROCESS
        </el-button>

        <div style="margin: 20px;">
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column prop="ItemIndex" label="Item Index" width="100" />
                <el-table-column prop="ModelType" label="Model Type" width="220" />
                <el-table-column prop="ModelName" label="Model Name" width="220" />
                <el-table-column prop="TempNumber" label="Temp Number" width="180" />
                <el-table-column prop="Title" label="Title" />
                <el-table-column align="right" width="180">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnUpdatePFCOutsolePressingProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCOutsolePressingProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCOutsolePressingProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcOutsolePressingProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcOutsolePressingProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcOutsolePressingProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcOutsolePressingProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Temp Number: ">
                <el-input v-model="pfcOutsolePressingProcess.TempNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcOutsolePressingProcess.Title" />
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
                ITEM OUTSOLE PRESSING PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewOutsolePressingProcess">
            ADD NEW ITEM OUTSOLE PRESSING PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="OUTSOLE PRESSING PROCESS">
                    <template #default="{ row }">
                        {{ pfcOutsolePressingProcess.Title }}
                    </template>
                </el-table-column>

                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewOutsolePressingProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewOutsolePressingProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="97vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <div style="display: flex;">
            <el-form style="width:55vw" :model="pfcItemOutsolePressingProcess" label-width="auto" label-position="right"
                size="default">
                <el-form-item label=" ">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside" :data="arrTableRow1" :row-style="{ height: '25px' }"
                            :header-cell-style="{ height: '3rem' }" border>
                            <el-table-column align="center" prop="arrTableRow1.No" label="No" min-width="60">
                                <template #default="{ row }">
                                    <div v-if="!row.editingNo" @click="enableEdit(row, 'No')"
                                        style="min-height: 48px; display: flex; align-items: center; justify-content: center;">
                                        {{ row.No }}
                                    </div>
                                    <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="arrTableRow1.Process" label="Process 工段 Công đoạn"
                                min-width="420">
                                <template #default="{ row }">
                                    <div v-if="!row.editingProcess" @click="enableEdit(row, 'Process')"
                                        style="min-height: 48px; display: flex; align-items: center;">
                                        {{ row.Process }}
                                    </div>
                                    <el-input v-else v-model="row.Process" @blur="disableEdit(row, 'Process')" />
                                </template>
                            </el-table-column>
                            <el-table-column label="Pressimg 压 Ép " align="center">
                                <el-table-column align="center" prop="arrTableRow1.Temp" label="Temp ℃ 温度 nhiệt độ"
                                    min-width="100">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTemp" @click="enableEdit(row, 'Temp')"
                                            style="min-height: 48px; display: flex; align-items: center; justify-content: center;">
                                            {{ row.Temp }}
                                        </div>
                                        <el-input v-else v-model="row.Temp" @blur="disableEdit(row, 'Temp')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.Time" label="Time 时间 Thời gian"
                                    min-width="100">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')"
                                            style="min-height: 48px; display: flex; align-items: center; justify-content: center;">
                                            {{ row.Time }}
                                        </div>
                                        <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="arrTableRow1.Pressure" label="Pressure 压力 Lực ép"
                                    min-width="100">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingPressure" @click="enableEdit(row, 'Pressure')"
                                            style="min-height: 48px; display: flex; align-items: center; justify-content: center;">
                                            {{ row.Pressure }}
                                        </div>
                                        <el-input v-else v-model="row.Pressure" @blur="disableEdit(row, 'Pressure')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" prop="arrTableRow1.AdditionalInformation"
                                label="Additional Information 副信息 Thông tin thêm" width="250">
                                <template #default="{ row }">
                                    <div v-if="!row.editingAdditionalInformation"
                                        @click="enableEdit(row, 'AdditionalInformation')"
                                        style="min-height: 48px; display: flex; align-items: center;">
                                        {{ row.AdditionalInformation }}
                                    </div>
                                    <el-input v-else v-model="row.AdditionalInformation"
                                        @blur="disableEdit(row, 'AdditionalInformation')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
            </el-form>


            <el-form style="width: 40vw" :model="pfcItemOutsolePressingProcess" label-width="auto" label-position="right"
                size="default">
                <el-form-item label=" ">
                    <el-col>
                        <el-table v-click-outside="handleClickOutside2" :data="arrTableRow2" :row-style="{ height: '25px' }"
                            :header-cell-style="{ height: '6.95rem' }" border>
                            <el-table-column align="center" prop="A" label="Part Size" min-width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingA" @click="enableEdit2(row, 'A')" style="min-height: 15px;">
                                        {{ row.A }}
                                    </div>
                                    <el-input v-else v-model="row.A" @blur="disableEdit2(row, 'A')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="B" label="Preform Weight 起初重量Trọng lượng ban đầu"
                                min-width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingB" @click="enableEdit2(row, 'B')" style="min-height: 15px;">
                                        {{ row.B }}
                                    </div>
                                    <el-input v-else v-model="row.B" @blur="disableEdit2(row, 'B')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="C" label="Part Weight 剩下重量 Trọng lượng còn lại "
                                min-width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingC" @click="enableEdit2(row, 'C')" style="min-height: 15px;">
                                        {{ row.C }}
                                    </div>
                                    <el-input v-else v-model="row.C" @blur="disableEdit2(row, 'C')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="D" label="Weight 耗損重量 Waste Trọng lượng hao hụt"
                                min-width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingD" @click="enableEdit2(row, 'D')" style="min-height: 15px;">
                                        {{ row.D }}
                                    </div>
                                    <el-input v-else v-model="row.D" @blur="disableEdit2(row, 'D')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="E" label="Waste rate 耗損率 Tỷ lệ hao hụt" min-width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingE" @click="enableEdit2(row, 'E')" style="min-height: 15px;">
                                        {{ row.E }}
                                    </div>
                                    <el-input v-else v-model="row.E" @blur="disableEdit2(row, 'E')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
                <el-form-item label=" ">
                    <div class="waste-table">
                        <div class="waste-row">
                            <div class="waste-label">
                                AVERAGE WASTE PER PART
                                <div class="waste-subtitle">
                                    每部份的耗损量平均<br>
                                    Lượng hao hụt trung bình trên từng phần:
                                </div>
                            </div>
                            <div class="waste-value-container">
                                <div class="waste-value">{{ pfcItemOutsolePressingProcess.AverageWastePerPart }} </div>
                                <span class="waste-unit">gr</span>
                            </div>
                        </div>
                        <div class="waste-row">
                            <div class="waste-label">
                                AVERAGE WASTE RATE PER PART
                                <div class="waste-subtitle">
                                    每部份的耗损率平均<br>
                                    Tỷ lệ hao hụt trung bình trên từng phần:
                                </div>
                            </div>
                            <div class="waste-value-container">
                                <div class="waste-value">{{ pfcItemOutsolePressingProcess.VerageWasteRatePerPart }} </div>
                                <span class="waste-unit">%</span>
                            </div>
                        </div>
                    </div>
                </el-form-item>

            </el-form>

        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemOutsolePressingProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemOutsolePressingProcess, deletePFCOutsolePressingProcess, getPFCItemOutsolePressingProcess, getPFCOutsolePressingProcessByModelID, insertItemPFCOutsolePressingProcess, insertPFCOutsolePressingProcess, updatePFCItemOutsolePressingProcess, updatePFCOutsolePressingProcess } from '@/hooks/PFC/useOutsolePressingProcess';
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
    (arrItemOutsolePressingProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.ComponentName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrTableRow1 = ref([]);
const arrTableRow2 = ref([]);

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW OUTSOLE PRESSING PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM OUTSOLE PRESSING PROCESS")
const pfcOutsolePressingProcess = ref({} as Record<string, any>)
const pfcItemOutsolePressingProcess = ref({} as Record<string, any>)
const arrItemOutsolePressingProcess = ref([]);

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
    const { res, _ } = await getPFCOutsolePressingProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewOutsolePressingProcess = () => {
    titleDialogForm1.value = "ADD NEW OUTSOLE PRESSING PROCESS"
    pfcOutsolePressingProcess.value = {};
    pfcOutsolePressingProcess.value.ModelType = pfcModel.value.ModelType
    pfcOutsolePressingProcess.value.ModelName = pfcModel.value.ModelName
    pfcOutsolePressingProcess.value.TempNumber = pfcModel.value.TempNumber
    pfcOutsolePressingProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW OUTSOLE PRESSING PROCESS") {
        try {
            await insertPFCOutsolePressingProcess(pfcOutsolePressingProcess.value)
            success("Insert new OUTSOLE PRESSING PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE OUTSOLE PRESSING PROCESS") {
        try {
            await updatePFCOutsolePressingProcess(pfcOutsolePressingProcess.value)
            success("Update OUTSOLE PRESSING PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCOutsolePressingProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemOutsolePressingProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCOutsolePressingProcess(row);
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

const btnUpdatePFCOutsolePressingProcess = async (index: number, row) => {
    pfcOutsolePressingProcess.value = {};
    pfcOutsolePressingProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE OUTSOLE PRESSING PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCOutsolePressingProcess = async (index: number, row) => {
    showLoading();
    pfcOutsolePressingProcess.value = {};
    pfcOutsolePressingProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemOutsolePressingProcess(pfcOutsolePressingProcess.value)
    arrItemOutsolePressingProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcOutsolePressingProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewOutsolePressingProcess = async () => {
    titleDialogForm2.value = "ADD NEW ITEM OUTSOLE PRESSING PROCESS";
    pfcItemOutsolePressingProcess.value = {};
    pfcItemOutsolePressingProcess.value.OutsolePressingProcessID = pfcOutsolePressingProcess.value.OutsolePressingProcessID;
    arrTableRow1.value = Array.from({ length: 18 }, (_, i) => ({
        No: i + 1,
        Process: "",
        Temp: "",
        Time: "",
        Pressure: "",
        AdditionalInformation: ""
    }));

    arrTableRow2.value = Array.from({ length: 23 }, (_, i) => {
        const obj = {
            A: i + 1, B: "", C: "", D: "", E: ""
        };

        return obj;
    });

    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    // imageUrl_Content.value = null;
    // oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewOutsolePressingProcess = async (index: number, row) => {
    pfcItemOutsolePressingProcess.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Images.toString();

    try {
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 18 }, () => ({}));
        arrTableRow2.value = row.TableRow2 ? JSON.parse(row.TableRow2) : Array.from({ length: 23 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrTableRow1.value = Array.from({ length: 18 }, () => ({}));
        arrTableRow2.value = Array.from({ length: 23 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.ImagesImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM OUTSOLE PRESSING PROCESS";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewOutsolePressingProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.ComponentName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            if (row.ImagesImages) {
                await deleteFilePFCModelFromFolderPFCModel(row.ImagesImages, pfcModel.value)
            }
            await deletePFCItemOutsolePressingProcess(row);
            const { res, _ } = await getPFCItemOutsolePressingProcess(pfcOutsolePressingProcess.value)
            arrItemOutsolePressingProcess.value = res.data.data;
            success("Delete PFC Item OUTSOLE PRESSING PROCESS successfully!")
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const formData_Content = new FormData();
const imageUrl_Content = ref('')

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const enableEdit = (row, field) => {
    row.editingNo = false;
    row.editingProcess = false;
    row.editingTemp = false;
    row.editingTime = false;
    row.editingTime = false;
    row.editingAdditionalInformation = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};
const handleClickOutside = (event) => {
    arrTableRow1.value.forEach((row) => {
        row.editingNo = false;
        row.editingProcess = false;
        row.editingTemp = false;
        row.editingTime = false;
        row.editingTime = false;
        row.editingAdditionalInformation = false;
    });
};

const enableEdit2 = (row, field) => {
    row.editingA = false;
    row.editingB = false;
    row.editingC = false;
    row.editingD = false;
    row.editingE = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit2 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside2 = (event) => {
    arrTableRow2.value.forEach((row) => {
        row.editingA = false;
        row.editingB = false;
        row.editingC = false;
        row.editingD = false;
        row.editingE = false;
    });
};


const averageWasteGrVal = ref(null)
const averageWasteRateVal = ref(null)

const btnConfirmItemOutsolePressingProcess = async () => {
    dialogForm3Visible.value = false
    showLoading()

    //
    function calculateAverage(data, key) {
        const validValues = data
            .map(row => row[key])
            .filter(value => value !== null && value !== undefined && value !== "");

        if (validValues.length === 0) return null;

        const sum = validValues.reduce((total, value) => total + Number(value), 0);
        // console.log("length", validValues.length);
        return (sum / validValues.length).toFixed(2);
    }
    averageWasteGrVal.value = calculateAverage(arrTableRow2.value, 'D');
    averageWasteRateVal.value = calculateAverage(arrTableRow2.value, 'E');


    //

    const itemOutsolePressingProcess = {
        ItemOutsolePressingProcessID: pfcItemOutsolePressingProcess.value.ItemOutsolePressingProcessID,
        OutsolePressingProcessID: pfcItemOutsolePressingProcess.value.OutsolePressingProcessID,
        TableRow1: JSON.stringify(arrTableRow1.value),
        TableRow2: JSON.stringify(arrTableRow2.value),
        AverageWastePerPart: averageWasteGrVal.value,
        VerageWasteRatePerPart: averageWasteRateVal.value
    }

    console.log(itemOutsolePressingProcess.AverageWastePerPart, itemOutsolePressingProcess.VerageWasteRatePerPart);
    if (titleDialogForm2.value === "ADD NEW ITEM OUTSOLE PRESSING PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
            }
            await insertItemPFCOutsolePressingProcess(itemOutsolePressingProcess)
            const { res, _ } = await getPFCItemOutsolePressingProcess(pfcOutsolePressingProcess.value)
            arrItemOutsolePressingProcess.value = res.data.data
            success("Insert new Item OUTSOLE PRESSING PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM OUTSOLE PRESSING PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
            }
            await updatePFCItemOutsolePressingProcess(itemOutsolePressingProcess)
            const { res, _ } = await getPFCItemOutsolePressingProcess(pfcOutsolePressingProcess.value)
            arrItemOutsolePressingProcess.value = res.data.data
            success("Insert new Item OUTSOLE PRESSING PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading()
}
</script>

<style scoped>
.waste-table {
    width: 40vw;
    border: 1px solid #000;
    text-align: center;
    border: 1px solid rgb(235, 238, 245);
    padding: 1.72rem;
    align-items: center;
    justify-content: center;
}

.waste-row {
    display: flex;
    justify-content: space-between;
    margin: 0.15rem 0;
}

.waste-label {
    width: 50%;
    font-weight: bold;
    line-height: 2;
}

.waste-subtitle {
    font-weight: normal;
    font-size: 1em;
    color: #666;
    line-height: 2;
}

.waste-value-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
}

.waste-value {
    border: 3px solid rgb(143, 146, 153);
    padding: 0.2rem 1rem;
    margin-right: 0.3rem;
    font-size: 1rem;
    font-weight: bold;
}

.waste-unit {
    font-size: 1rem;
    color: #333;
}
</style>