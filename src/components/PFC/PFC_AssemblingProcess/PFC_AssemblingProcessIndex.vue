<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">ASSEMBLING PROCESS</h4>

        <div style="display: flex; justify-content: space-between;">
            <div style="margin-left:35px">
                <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewAssemblingProcess">
                    ADD NEW ASSEMBLING PROCESS
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
                        <el-button size="small" @click="btnUpdatePFCAssemblingProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning" @click="btnItemPFCAssemblingProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCAssemblingProcess(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcAssemblingProcess" label-width="auto" label-position="right" size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcAssemblingProcess.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcAssemblingProcess.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcAssemblingProcess.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcAssemblingProcess.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcAssemblingProcess.Title" />
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
                ITEM ASSEMBLING PROCESS
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewAssemblingProcess">
            ADD NEW ITEM ASSEMBLING PROCESS
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="ASSEMBLING PROCESS">
                    <template class="custom-header" #default="{ row }">
                        {{ pfcAssemblingProcess.Title }}
                    </template>
                </el-table-column>
                <el-table-column align="right" width="150">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewAssemblingProcess(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewAssemblingProcess(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogForm3Visible" width="92vw" :close-on-click-modal="false" @close="dialogForm1Visible = false">
        <template #header>
            <div style="text-align: center; width: 100%; font-weight: bold;">
                {{ titleDialogForm2 }}
            </div>
        </template>
        <el-form style="width: 90vw; " :model="pfcItemAssemblingProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <el-col>
                    <el-table v-click-outside="handleClickOutside" :data="arrTableRow1" :row-style="{ height: '30px' }"
                        border>
                        <el-table-column align="center" prop="arrTableRow1.No" label="No" width="60">
                            <template #default="{ row }">
                                <div v-if="!row.editingNo" @click="enableEdit(row, 'No')" style="height: 30px;">
                                    {{ row.No }}
                                </div>
                                <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrTableRow1.AssemblingProcess"
                            label="Assembling Process  成型流程 Lưu trình gò">
                            <template #default="{ row }">
                                <div v-if="!row.editingAssemblingProcess" @click="enableEdit(row, 'AssemblingProcess')"
                                    style="height: 30px; text-align: left;">
                                    {{ row.AssemblingProcess }}
                                </div>
                                <el-input v-else v-model="row.AssemblingProcess"
                                    @blur="disableEdit(row, 'AssemblingProcess')" />
                            </template>
                        </el-table-column>
                        <el-table-column label="Process details 明细流程Chi tiết lưu trình" align="center">
                            <el-table-column align="center" prop="arrTableRow1.Chemical" label="Chemical 化品名称 Hóa chất"
                                width="120">
                                <template #default="{ row }">
                                    <div v-if="!row.editingChemical" @click="enableEdit(row, 'Chemical')"
                                        style="height: 30px;">
                                        {{ row.Chemical }}
                                    </div>
                                    <el-input v-else v-model="row.Chemical"
                                        @blur="disableEdit(row, 'Chemical')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTableRow1.Hardener" label="Hardener 硬化剂 Chất đông cứng"
                                width="120">
                                <template #default="{ row }">
                                    <div v-if="!row.editingHardener" @click="enableEdit(row, 'Hardener')"
                                        style="height: 30px;">
                                        {{ row.Hardener }}
                                    </div>
                                    <el-input v-else v-model="row.Hardener" @blur="disableEdit(row, 'Hardener')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTableRow1.WBSB" label="WB/SB" width="120">
                                <template #default="{ row }">
                                    <div v-if="!row.editingWBSB" @click="enableEdit(row, 'WBSB')" style="height: 30px;">
                                        {{ row.WBSB }}
                                    </div>
                                    <el-input v-else v-model="row.WBSB" @blur="disableEdit(row, 'WBSB')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTableRow1.SurfaceTemp"
                                label="Surface Temp 温度表面 Nhiệt độ bề mặt" width="180">
                                <template #default="{ row }">
                                    <div v-if="!row.editingSurfaceTemp" @click="enableEdit(row, 'SurfaceTemp')"
                                        style="height: 30px;">
                                        {{ row.SurfaceTemp }}
                                    </div>
                                    <el-input v-else v-model="row.SurfaceTemp" @blur="disableEdit(row, 'SurfaceTemp')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTableRow1.Pressure" label="Pressure 压力 Lực ép"
                                width="180">
                                <template #default="{ row }">
                                    <div v-if="!row.editingPressure" @click="enableEdit(row, 'Pressure')"
                                        style="height: 30px;">
                                        {{ row.Pressure }}
                                    </div>
                                    <el-input v-else v-model="row.Pressure" @blur="disableEdit(row, 'Pressure')" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="arrTableRow1.Time" label="Time 时间 Thời gian" width="180">
                                <template #default="{ row }">
                                    <div v-if="!row.editingTime" @click="enableEdit(row, 'Time')" style="height: 30px;">
                                        {{ row.Time }}
                                    </div>
                                    <el-input v-else v-model="row.Time" @blur="disableEdit(row, 'Time')" />
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" prop="arrTableRow1.Comments" label="Comments 备注 Ghi chú"
                            width="320">
                            <template #default="{ row }">
                                <div v-if="!row.editingComments" @click="enableEdit(row, 'Comments')" style="height: 30px;">
                                    {{ row.Comments }}
                                </div>
                                <el-input v-else v-model="row.Comments" @blur="disableEdit(row, 'Comments')" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-form-item>
        </el-form>
        <el-form style="width: 90vw; " :model="pfcItemAssemblingProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <div class="container_image">
                    <div class="Lasting">
                        Lasting Lace/Clip Instruction 绑鞋带/绑鞋带指南 Dây gò/ Hướng dẫn buộc dây
                    </div>
                    <div class="images">
                    </div>
                </div>
            </el-form-item>
        </el-form>


        <el-form style="width: 90vw;" :model="pfcItemAssemblingProcess" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <div style="display:flex;">
                    <!-- LastingClipSchedule -->
                    <div style="width: 30vw;">
                        <el-table v-click-outside="handleClickOutside3" :data="arrLastingClipSchedule"
                            :row-style="{ height: '30px' }" border>
                            <el-table-column align="center" label="Lasting Clip Schedule">
                                <el-table-column align="center" prop="arrLastingClipSchedule.Size" label="Size" width="100">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingSize" @click="enableEdit3(row, 'Size')"
                                            style="height: 30px;">
                                            {{ row.Size }}
                                        </div>
                                        <el-input v-else v-model="row.Size" @blur="disableEdit3(row, 'Size')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrLastingClipSchedule.A" label="A" min-width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingA" @click="enableEdit3(row, 'A')" style="height: 30px;">
                                            {{ row.A }}
                                        </div>
                                        <el-input v-else v-model="row.A" @blur="disableEdit3(row, 'A')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrLastingClipSchedule.AA" label="A" min-width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingAA" @click="enableEdit3(row, 'AA')" style="height: 30px;">
                                            {{ row.AA }}
                                        </div>
                                        <el-input v-else v-model="row.AA" @blur="disableEdit3(row, 'AA')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrLastingClipSchedule.B" label="B" min-width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingB" @click="enableEdit3(row, 'B')" style="height: 30px;">
                                            {{ row.B }}
                                        </div>
                                        <el-input v-else v-model="row.B" @blur="disableEdit3(row, 'B')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrLastingClipSchedule.BB" label="B" min-width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingBB" @click="enableEdit3(row, 'BB')" style="height: 30px;">
                                            {{ row.BB }}
                                        </div>
                                        <el-input v-else v-model="row.BB" @blur="disableEdit3(row, 'BB')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </div>

                    <!-- ChillerMoldSpecification -->
                    <div style="width: 19.4vw;">
                        <el-table v-click-outside="handleClickOutside4" :data="arrChillerMoldSpecification"
                            :row-style="{ height: '30px' }" border>
                            <el-table-column align="center" label="Chiller Mold Specification">
                                <el-table-column align="center" prop="arrChillerMoldSpecification.UpperSize"
                                    label="UpperSize" min-width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingUpperSize" @click="enableEdit4(row, 'UpperSize')"
                                            style="height: 30px;">
                                            {{ row.UpperSize }}
                                        </div>
                                        <el-input v-else v-model="row.UpperSize" @blur="disableEdit4(row, 'UpperSize')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrChillerMoldSpecification.MoldCode" label="MoldCode"
                                    min-width="80">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingMoldCode" @click="enableEdit4(row, 'MoldCode')"
                                            style="height: 30px;">
                                            {{ row.MoldCode }}
                                        </div>
                                        <el-input v-else v-model="row.MoldCode" @blur="disableEdit4(row, 'MoldCode')" />
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" prop="arrChillerMoldSpecification.MoldSize" label="MoldSize"
                                    min-width="100">
                                    <template #default="{ row }">
                                        <div v-if="!row.editingMoldSize" @click="enableEdit4(row, 'MoldSize')"
                                            style="height: 30px;">
                                            {{ row.MoldSize }}
                                        </div>
                                        <el-input v-else v-model="row.MoldSize" @blur="disableEdit4(row, 'MoldSize')" />
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- LastingLaceType -->
                    <div style="width: 15vw;">
                        <el-table v-click-outside="handleClickOutside2" :data="arrLastingLaceType"
                            :row-style="{ height: '30px' }" border>
                            
                            <el-table-column align="center" prop="arrTableRow1.LastingLaceType" label="LastingLaceType">
                                <template #default="{ row }">
                                    <div v-if="!row.editingLastingLaceType" @click="enableEdit2(row, 'LastingLaceType')"
                                        style="height: 30px;">
                                        {{ row.LastingLaceType }}
                                    </div>
                                    <el-input v-else v-model="row.LastingLaceType"
                                        @blur="disableEdit2(row, 'LastingLaceType')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- TotalWBSB -->
                    <div style="width: 25vw;">
                        <el-table v-click-outside="handleClickOutside5" :data="arrTotalWBSB" :row-style="{ height: '30px' }"
                            border>
                            <el-table-column align="center" prop="arrTotalWBSB.WB" label="WB" min-width="100">
                                <template #default="{ row }">
                                    <div v-if="!row.editingWB" @click="enableEdit5(row, 'WB')" style="height: 30px;">
                                        {{ row.WB }}
                                    </div>
                                    <el-input v-else v-model="row.WB" @blur="disableEdit5(row, 'WB')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="arrTotalWBSB.SB" label="SB">
                                <template #default="{ row }">
                                    <div v-if="!row.editingSB" @click="enableEdit5(row, 'SB')" style="height: 30px;">
                                        {{ row.SB }}
                                    </div>
                                    <el-input v-else v-model="row.SB" @blur="disableEdit5(row, 'SB')" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </div>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogForm3Visible = false">Cancel</el-button>
                <el-button type="primary" @click="btnConfirmItemAssemblingProcess">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemAssemblingProcess, deletePFCAssemblingProcess, getPFCItemAssemblingProcess, getPFCAssemblingProcessByModelID, insertItemPFCAssemblingProcess, insertPFCAssemblingProcess, updatePFCItemAssemblingProcess, updatePFCAssemblingProcess } from '@/hooks/PFC/useAssemblingProcess';
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
    (arrItemAssemblingProcess.value || []).filter(
        (data) =>
            !search1.value ||
            data.RawMaterialName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);

const arrTableRow1 = ref([]);
const arrLastingLaceType = ref([]);
const arrLastingClipSchedule = ref([]);
const arrChillerMoldSpecification = ref([]);
const arrTotalWBSB = ref([]);

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW ASSEMBLING PROCESS")
const titleDialogForm2 = ref("ADD NEW ITEM ASSEMBLING PROCESS")
const pfcAssemblingProcess = ref({} as Record<string, any>)
const pfcItemAssemblingProcess = ref({} as Record<string, any>)
const arrItemAssemblingProcess = ref([]);

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
    const { res, _ } = await getPFCAssemblingProcessByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewAssemblingProcess = () => {
    titleDialogForm1.value = "ADD NEW ASSEMBLING PROCESS"
    pfcAssemblingProcess.value = {};
    pfcAssemblingProcess.value.ModelType = pfcModel.value.ModelType
    pfcAssemblingProcess.value.ModelName = pfcModel.value.ModelName
    pfcAssemblingProcess.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcAssemblingProcess.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW ASSEMBLING PROCESS") {
        try {
            await insertPFCAssemblingProcess(pfcAssemblingProcess.value)
            success("Insert new ASSEMBLING PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE ASSEMBLING PROCESS") {
        try {
            await updatePFCAssemblingProcess(pfcAssemblingProcess.value)
            success("Update ASSEMBLING PROCESS successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCAssemblingProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemAssemblingProcess(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCAssemblingProcess(row);
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

const btnUpdatePFCAssemblingProcess = async (index: number, row) => {
    pfcAssemblingProcess.value = {};
    pfcAssemblingProcess.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE ASSEMBLING PROCESS"
    dialogForm1Visible.value = true;
}

const btnItemPFCAssemblingProcess = async (index: number, row) => {
    showLoading();
    pfcAssemblingProcess.value = {};
    pfcAssemblingProcess.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemAssemblingProcess(pfcAssemblingProcess.value)
    arrItemAssemblingProcess.value = res.data.data ? res.data.data : [];
    // console.log(pfcAssemblingProcess.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewAssemblingProcess = () => {
    titleDialogForm2.value = "ADD NEW ITEM ASSEMBLING PROCESS";
    pfcItemAssemblingProcess.value = {};
    pfcItemAssemblingProcess.value.AssemblingProcessID = pfcAssemblingProcess.value.AssemblingProcessID;

    arrTableRow1.value = Array.from({ length: 9 }, (_, i) => ({
        No: i + 1,
        AssemblingProcess: '',
        Chemical: '',
        Hardener: '',
        WBSB: '',
        SurfaceTemp: '',
        Pressure: '',
        Time: '',
        Comments: '',
    }));

    arrLastingLaceType.value = Array.from({ length: 1 }, (_, i) => ({
        LastingLaceType: '',
    }));

    arrLastingClipSchedule.value = Array.from({ length: 2 }, (_, i) => ({
        Size: '',
        A: '',
        AA: '',
        B: '',
        BB: '',
    }));

    arrChillerMoldSpecification.value = Array.from({ length: 2 }, (_, i) => ({
        UpperSize: '',
        MoldCode: '',
        MoldSize: '',
    }));

    arrTotalWBSB.value = Array.from({ length: 1 }, (_, i) => ({
        WB: '',
        SB: '',
    }));

    imageUrl_Content.value = null;
    oldImageUrl_Content.value = null;

    dialogForm3Visible.value = true;
};


const btnEditItemNewAssemblingProcess = async (index: number, row) => {
    pfcItemAssemblingProcess.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Remarks.toString();
    try {
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 9 }, () => ({}));
        arrLastingLaceType.value = row.LastingLaceType ? JSON.parse(row.LastingLaceType) : Array.from({ length: 1 }, () => ({}));
        arrLastingClipSchedule.value = row.LastingClipSchedule ? JSON.parse(row.LastingClipSchedule) : Array.from({ length: 2 }, () => ({}));
        arrChillerMoldSpecification.value = row.ChillerMoldSpecification ? JSON.parse(row.ChillerMoldSpecification) : Array.from({ length: 2 }, () => ({}));
        arrTotalWBSB.value = row.TotalWBSB ? JSON.parse(row.TotalWBSB) : Array.from({ length: 1 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 9 }, () => ({}));
        arrLastingLaceType.value = row.LastingLaceType ? JSON.parse(row.LastingLaceType) : Array.from({ length: 1 }, () => ({}));
        arrLastingClipSchedule.value = row.LastingClipSchedule ? JSON.parse(row.LastingClipSchedule) : Array.from({ length: 2 }, () => ({}));
        arrChillerMoldSpecification.value = row.ChillerMoldSpecification ? JSON.parse(row.ChillerMoldSpecification) : Array.from({ length: 2 }, () => ({}));
        arrTotalWBSB.value = row.TotalWBSB ? JSON.parse(row.TotalWBSB) : Array.from({ length: 1 }, () => ({}));
    }
    // console.log(pfcItemAssemblingProcess.value)
    imageUrl_Content.value = getURLImage(row.RemarksImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM ASSEMBLING PROCESS";
    dialogForm3Visible.value = true;
};

const btnDeleteItemNewAssemblingProcess = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the Component: "${row.RawMaterialName}". Continue?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            showLoading();
            if (row.RemarksImages) {
                await deleteFilePFCModelFromFolderPFCModel(row.RemarksImages, pfcModel.value)
            }
            await deletePFCItemAssemblingProcess(row);
            const { res, _ } = await getPFCItemAssemblingProcess(pfcAssemblingProcess.value)
            arrItemAssemblingProcess.value = res.data.data;
            success("Delete PFC Item ASSEMBLING PROCESS successfully!")
            hideLoading()
        })
        .catch(() => {
            info('Cancel delete!')
        })
}

const formData_Content = new FormData();
const imageUrl_Content = ref('')
const oldImageUrl_Content = ref('')


const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const enableEdit = (row, field) => {
    row.editingNo = false;
    row.editingAssemblingProcess = false;
    row.editingChemical = false;
    row.editingHardener = false;
    row.editingWBSB = false;
    row.editingSurfaceTemp = false;
    row.editingPressure = false;
    row.editingTime = false;
    row.editingComments = false;
    row[`editing${capitalize(field)}`] = true;
};
const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside = (event) => {
    arrTableRow1.value.forEach((row) => {
        row.editingNo = false;
        row.editingAssemblingProcess = false;
        row.editingChemical = false;
        row.editingHardener = false;
        row.editingWBSB = false;
        row.editingSurfaceTemp = false;
        row.editingPressure = false;
        row.editingTime = false;
        row.editingComments = false;
    });
};


const enableEdit2 = (row, field) => {
    row.editingLastingLaceType = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit2 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside2 = () => {
    arrLastingLaceType.value.forEach((row) => {
        row.editingLastingLaceType = false;
    });
};

const enableEdit3 = (row, field) => {
    row.editingSize = false;
    row.editingA = false;
    row.editingAA = false;
    row.editingB = false;
    row.editingBB = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit3 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside3 = () => {
    arrLastingClipSchedule.value.forEach((row) => {
        row.editingSize = false;
        row.editingA = false;
        row.editingAA = false;
        row.editingB = false;
        row.editingBB = false;
    });
};

const enableEdit4 = (row, field) => {
    row.editingUpperSize = false;
    row.editingMoldCode = false;
    row.editingMoldSize = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit4 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside4 = () => {
    arrChillerMoldSpecification.value.forEach((row) => {
        row.editingUpperSize = false;
        row.editingMoldCode = false;
        row.editingMoldSize = false;
    });
};

const enableEdit5 = (row, field) => {
    row.editingWB = false;
    row.editingSB = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit5 = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};

const handleClickOutside5 = () => {
    arrTotalWBSB.value.forEach((row) => {
        row.editingWB = false;
        row.editingSB = false;
    });
};


const btnConfirmItemAssemblingProcess = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    if (!Array.isArray(arrTableRow1.value) || arrTableRow1.value.length === 0) {
        alert("Danh sách arrTableRow1 không hợp lệ hoặc trống!");
        return;
    }


    const itemAssemblingProcess = {
        ItemAssemblingProcessID: pfcItemAssemblingProcess.value.ItemAssemblingProcessID,
        AssemblingProcessID: pfcItemAssemblingProcess.value.AssemblingProcessID,
        TableRow1: JSON.stringify(arrTableRow1.value),
        LastingClipSchedule: JSON.stringify(arrLastingClipSchedule.value),
        LastingLaceType: JSON.stringify(arrLastingLaceType.value),
        ChillerMoldSpecification: JSON.stringify(arrChillerMoldSpecification.value),
        TotalWBSB: JSON.stringify(arrTotalWBSB.value),
    };
    // console.log(itemAssemblingProcess)
    if (titleDialogForm2.value === "ADD NEW ITEM ASSEMBLING PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemAssemblingProcess.Remarks = res
            }
            await insertItemPFCAssemblingProcess(itemAssemblingProcess);
            const { res, _ } = await getPFCItemAssemblingProcess(pfcAssemblingProcess.value)
            arrItemAssemblingProcess.value = res.data.data;
            success("Insert new Item ASSEMBLING PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM ASSEMBLING PROCESS") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
                if (oldImageUrl_Content.value) {
                    await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
                const { res, err } = await uploadFilePFCModelFromFolderPFCModel(formData_Content, pfcModel.value)
                itemAssemblingProcess.Remarks = res
            } else {
                if (oldImageUrl_Content.value && itemAssemblingProcess.Remarks === null) {
                    const { res, err } = await deleteFilePFCModelFromFolderPFCModel(oldImageUrl_Content.value, pfcModel.value)
                }
            }
            await updatePFCItemAssemblingProcess(itemAssemblingProcess)
            const { res, _ } = await getPFCItemAssemblingProcess(pfcAssemblingProcess.value)
            arrItemAssemblingProcess.value = res.data.data;
            success("Insert new Item ASSEMBLING PROCESS successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
}
</script>

<style scoped>
.container_image {
    width: 100vw;
    border: 1px solid #dcdfe6;
}

.Lasting {
    padding: 19px;
    background-color: rgb(245, 247, 250);
    color: rgb(144, 147, 153);
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    text-align: center;
}

.images {
    height: 220px;
}
</style>