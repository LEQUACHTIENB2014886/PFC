<template>
    <el-col :span="24" style="height: 100vh;">
        <h4 style="width: 100%; text-align: center;">OUTSOLE SPECIFICATION</h4>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddNewOutsoleSpecification">
            ADD NEW OUTSOLE SPECIFICATION
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
                        <el-button size="small" @click="btnUpdatePFCOutsoleSpecification(scope.$index, scope.row)"
                            style="width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="warning"
                            @click="btnItemPFCOutsoleSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Item
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeletePFCOutsoleSpecification(scope.$index, scope.row)"
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
        <el-form style="width: 30vw" :model="pfcOutsoleSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label="Item Index: ">
                <el-input v-model="pfcOutsoleSpecification.ItemIndex" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Type: ">
                <el-input v-model="pfcOutsoleSpecification.ModelType" :disabled="true" />
            </el-form-item>
            <el-form-item label="Model Name: ">
                <el-input v-model="pfcOutsoleSpecification.ModelName" :disabled="true" />
            </el-form-item>
            <el-form-item label="Material Number: ">
                <el-input v-model="pfcOutsoleSpecification.MaterialNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="Title: ">
                <el-input v-model="pfcOutsoleSpecification.Title" />
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
                ITEM OUTSOLE SPECIFICATION
            </div>
        </template>
        <el-button class="btn-add" type="primary" plain size="small" @click="btnAddItemNewOutsoleSpecification">
            ADD NEW ITEM OUTSOLE SPECIFICATION
        </el-button>
        <div style="margin: 20px;">
            <el-table :data="filterTableData1" style="width: 100%">
                <el-table-column label="OUTSOLE SPECIFICATION">
                    <template #default="{ row }">
                        {{ pfcOutsoleSpecification.Title }}
                    </template>
                </el-table-column>

                <el-table-column align="right" width="200">
                    <template #header>
                        <el-input v-model="search1" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="btnEditItemNewOutsoleSpecification(scope.$index, scope.row)"
                            style="margin-top: 10px; margin-bottom: 10px; width: 100px; height: 30px;">
                            Edit
                        </el-button>
                        <br />
                        <el-button size="small" type="danger"
                            @click="btnDeleteItemNewOutsoleSpecification(scope.$index, scope.row)"
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
        <el-form style="width:95vw" :model="pfcItemOutsoleSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <el-col>
                    <el-table v-click-outside="handleClickOutside" :data="arrTableRow1" :row-style="{ height: '30px' }"
                        border>
                        <el-table-column align="center" prop="arrTableRow1.No" label="No" width="100">
                            <template #default="{ row }">
                                <div v-if="!row.editingNo" @click="enableEdit(row, 'No')" style="min-height: 20px; ">
                                    {{ row.No }}
                                </div>
                                <el-input v-else v-model="row.No" @blur="disableEdit(row, 'No')" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="arrTableRow1.Section" label="Section 部件Chi tiết" width="420">
                            <template #default="{ row }">
                                <div v-if="!row.editingSection" @click="enableEdit(row, 'Section')"
                                    style="min-height: 20px; text-align: left;">
                                    {{ row.Section }}
                                </div>
                                <el-input v-else v-model="row.Section" @blur="disableEdit(row, 'Section')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.Material" label="Material 材料 Vật tư">
                            <template #default="{ row }">
                                <div v-if="!row.editingMaterial" @click="enableEdit(row, 'Material')"
                                    style="min-height: 20px;">
                                    {{ row.Material }}
                                </div>
                                <el-input v-else v-model="row.Material" @blur="disableEdit(row, 'Material')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.Hardness" label="Hardness 硬度Độ cứng" width="250">
                            <template #default="{ row }">
                                <div v-if="!row.editingHardness" @click="enableEdit(row, 'Hardness')"
                                    style="min-height: 20px;">
                                    {{ row.Hardness }}
                                </div>
                                <el-input v-else v-model="row.Hardness" @blur="disableEdit(row, 'Hardness')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.SG" label="S.G.(G/CC)" width="250">
                            <template #default="{ row }">
                                <div v-if="!row.editingSG" @click="enableEdit(row, 'SG')" style="min-height: 20px;">
                                    {{ row.SG }}
                                </div>
                                <el-input v-else v-model="row.SG" @blur="disableEdit(row, 'SG')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow1.MCS" label="MCS #" width="250">
                            <template #default="{ row }">
                                <div v-if="!row.editingMCS" @click="enableEdit(row, 'MCS')" style="min-height: 20px;">
                                    {{ row.MCS }}
                                </div>
                                <el-input v-else v-model="row.MCS" @blur="disableEdit(row, 'MCS')" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-form-item>
        </el-form>
        <el-form style="width: 95vw" label-width="auto" label-position="right" size="default">
            <el-form-item label=" ">
                <div class="table-container">
                    <div class="row header">
                        <div class="cell-title-1">Preform parts & Nesting Diagram 大底与垫片还没压 Đế lớn và miếng chêm chưa ép
                        </div>
                        <div class="cell-title-2">Final part 成品 Thành phẩm </div>
                    </div>
                    <div class="row empty">
                        <div class="cell-1"></div>
                        <div class="cell-2"></div>
                    </div>
                </div>
            </el-form-item>
        </el-form>

        <el-form style="width: 95vw" :model="pfcItemOutsoleSpecification" label-width="auto" label-position="right"
            size="default">
            <el-form-item label=" ">
                <el-col>
                    <el-table v-click-outside="handleClickOutside2" :data="arrTableRow2" :row-style="{ height: '30px' }"
                        border :span-method="mergeCells">

                        <el-table-column align="center" prop="arrTableRow2.PreformPart" label="Preform Part" width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingPreformPart" @click="enableEdit2(row, 'PreformPart')"
                                    style="min-height: 20px;">
                                    {{ row.PreformPart }}
                                </div>
                                <el-input v-else v-model="row.PreformPart" @blur="disableEdit2(row, 'PreformPart')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow2.Thickness" label="Thickness" width="160">
                            <template #default="{ row }">
                                <div v-if="!row.editingThickness" @click="enableEdit2(row, 'Thickness')"
                                    style="min-height: 20px; text-align: center;">
                                    {{ row.Thickness }}
                                </div>
                                <el-input v-else v-model="row.Thickness" @blur="disableEdit2(row, 'Thickness')" />
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="arrTableRow2.WeightType" label="Weight Type" width="120">
                            <template #default="{ row }">
                                <div v-if="!row.editingWeightType" @click="enableEdit2(row, 'WeightType')"
                                    style="min-height: 20px; text-align: center;">
                                    {{ row.WeightType }}
                                </div>
                                <el-input v-else v-model="row.WeightType" @blur="disableEdit2(row, 'WeightType')" />
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Weight per Size(Grams/ Half Pair) 号码重量（grams/只）Trọng lượng trên size (grams trên chiếc)"
                            align="center">
                            <el-table-column align="center" prop="A" label="10T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingA" @click="enableEdit2(row, 'A')" style="min-height: 20px;">
                                        {{ row.A }}
                                    </div>
                                    <el-input v-else v-model="row.A" @blur="disableEdit2(row, 'A')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="B" label="11" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingB" @click="enableEdit2(row, 'B')" style="min-height: 20px;">
                                        {{ row.B }}
                                    </div>
                                    <el-input v-else v-model="row.B" @blur="disableEdit2(row, 'B')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="C" label="11T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingC" @click="enableEdit2(row, 'C')" style="min-height: 20px;">
                                        {{ row.C }}
                                    </div>
                                    <el-input v-else v-model="row.C" @blur="disableEdit2(row, 'C')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="D" label="12" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingD" @click="enableEdit2(row, 'D')" style="min-height: 20px;">
                                        {{ row.D }}
                                    </div>
                                    <el-input v-else v-model="row.D" @blur="disableEdit2(row, 'D')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="E" label="12T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingE" @click="enableEdit2(row, 'E')" style="min-height: 20px;">
                                        {{ row.E }}
                                    </div>
                                    <el-input v-else v-model="row.E" @blur="disableEdit2(row, 'E')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="F" label="13" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingF" @click="enableEdit2(row, 'F')" style="min-height: 20px;">
                                        {{ row.F }}
                                    </div>
                                    <el-input v-else v-model="row.F" @blur="disableEdit2(row, 'F')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="G" label="13T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingG" @click="enableEdit2(row, 'G')" style="min-height: 20px;">
                                        {{ row.G }}
                                    </div>
                                    <el-input v-else v-model="row.G" @blur="disableEdit2(row, 'G')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="H" label="1" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingH" @click="enableEdit2(row, 'H')" style="min-height: 20px;">
                                        {{ row.H }}
                                    </div>
                                    <el-input v-else v-model="row.H" @blur="disableEdit2(row, 'H')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="I" label="1T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingI" @click="enableEdit2(row, 'I')" style="min-height: 20px;">
                                        {{ row['I'] }}
                                    </div>
                                    <el-input v-else v-model="row.I" @blur="disableEdit2(row, 'I')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="J" label="2" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingJ" @click="enableEdit2(row, 'J')" style="min-height: 20px;">
                                        {{ row['J'] }}
                                    </div>
                                    <el-input v-else v-model="row.J" @blur="disableEdit2(row, 'J')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="K" label="2T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingK" @click="enableEdit2(row, 'K')" style="min-height: 20px;">
                                        {{ row['K'] }}
                                    </div>
                                    <el-input v-else v-model="row.K" @blur="disableEdit2(row, 'K')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="L" label="3" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingL" @click="enableEdit2(row, 'L')" style="min-height: 20px;">
                                        {{ row['L'] }}
                                    </div>
                                    <el-input v-else v-model="row.L" @blur="disableEdit2(row, 'L')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="M" label="4T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingM" @click="enableEdit2(row, 'M')" style="min-height: 20px;">
                                        {{ row['M'] }}
                                    </div>
                                    <el-input v-else v-model="row.M" @blur="disableEdit2(row, 'M')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="N" label="4" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingN" @click="enableEdit2(row, 'N')" style="min-height: 20px;">
                                        {{ row['N'] }}
                                    </div>
                                    <el-input v-else v-model="row.N" @blur="disableEdit2(row, 'N')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="O" label="4T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingO" @click="enableEdit2(row, 'O')" style="min-height: 20px;">
                                        {{ row['O'] }}
                                    </div>
                                    <el-input v-else v-model="row.O" @blur="disableEdit2(row, 'O')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="P" label="5" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingP" @click="enableEdit2(row, 'P')" style="min-height: 20px;">
                                        {{ row['P'] }}
                                    </div>
                                    <el-input v-else v-model="row.P" @blur="disableEdit2(row, 'P')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="Q" label="5T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingQ" @click="enableEdit2(row, 'Q')" style="min-height: 20px;">
                                        {{ row['Q'] }}
                                    </div>
                                    <el-input v-else v-model="row.Q" @blur="disableEdit2(row, 'Q')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="R" label="6" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingR" @click="enableEdit2(row, 'R')" style="min-height: 20px;">
                                        {{ row['R'] }}
                                    </div>
                                    <el-input v-else v-model="row.R" @blur="disableEdit2(row, 'R')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="S" label="6T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingS" @click="enableEdit2(row, 'S')" style="min-height: 20px;">
                                        {{ row['S'] }}
                                    </div>
                                    <el-input v-else v-model="row.S" @blur="disableEdit2(row, 'S')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="T" label="7" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingT" @click="enableEdit2(row, 'T')" style="min-height: 20px;">
                                        {{ row['T'] }}
                                    </div>
                                    <el-input v-else v-model="row.T" @blur="disableEdit2(row, 'T')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="U" label="7T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingU" @click="enableEdit2(row, 'U')" style="min-height: 20px;">
                                        {{ row['U'] }}
                                    </div>
                                    <el-input v-else v-model="row.U" @blur="disableEdit2(row, 'U')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="V" label="8" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingV" @click="enableEdit2(row, 'V')" style="min-height: 20px;">
                                        {{ row['V'] }}
                                    </div>
                                    <el-input v-else v-model="row.V" @blur="disableEdit2(row, 'V')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="W" label="8T" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingW" @click="enableEdit2(row, 'W')" style="min-height: 20px;">
                                        {{ row['W'] }}
                                    </div>
                                    <el-input v-else v-model="row.W" @blur="disableEdit2(row, 'W')" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" prop="X" label="9" width="75">
                                <template #default="{ row }">
                                    <div v-if="!row.editingX" @click="enableEdit2(row, 'X')" style="min-height: 20px;">
                                        {{ row['X'] }}
                                    </div>
                                    <el-input v-else v-model="row.X" @blur="disableEdit2(row, 'X')" />
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
                <el-button type="primary" @click="btnConfirmItemOutsoleSpecification">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deletePFCItemOutsoleSpecification, deletePFCOutsoleSpecification, getPFCItemOutsoleSpecification, getPFCOutsoleSpecificationByModelID, insertItemPFCOutsoleSpecification, insertPFCOutsoleSpecification, updatePFCItemOutsoleSpecification, updatePFCOutsoleSpecification } from '@/hooks/PFC/useOutsoleSpecification';
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
    (arrItemOutsoleSpecification.value || []).filter(
        (data) =>
            !search1.value ||
            data.ComponentName.toLowerCase().includes(search1.value.toLowerCase())
    )
);


const tableData = ref([]);
const arrTableRow1 = ref([]);
const arrTableRow2 = ref([]);

const mergeCells = ({ rowIndex, columnIndex }) => {
    if (columnIndex === 0) { // cột thứ a ban đầu
        if (rowIndex === 7) { // hàng thứ b bắt đầu
            return [7, 3] // [c,d] gộp n từ [a,b] với [c,d]
        }
    }
    if (rowIndex >= 7 && rowIndex < 7 + 7 && columnIndex >= 0 && columnIndex < 0 + 3) {
        return [0, 0] // Đánh dấu ô này thuộc vùng hợp của ô gốc nên hiển thị riêng -> k bị dư witdh
    }
    return [1, 1] // còn lại thì 1x1 k gộp
}

const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const titleDialogForm1 = ref("ADD NEW OUTSOLE SPECIFICATION")
const titleDialogForm2 = ref("ADD NEW ITEM OUTSOLE SPECIFICATION")
const pfcOutsoleSpecification = ref({} as Record<string, any>)
const pfcItemOutsoleSpecification = ref({} as Record<string, any>)
const arrItemOutsoleSpecification = ref([]);

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
    const { res, _ } = await getPFCOutsoleSpecificationByModelID(pfcModel.value)
    tableData.value = res.data.data ? res.data.data : [];
}

const btnAddNewOutsoleSpecification = () => {
    titleDialogForm1.value = "ADD NEW OUTSOLE SPECIFICATION"
    pfcOutsoleSpecification.value = {};
    pfcOutsoleSpecification.value.ModelType = pfcModel.value.ModelType
    pfcOutsoleSpecification.value.ModelName = pfcModel.value.ModelName
    pfcOutsoleSpecification.value.MaterialNumber = pfcModel.value.MaterialNumber
    pfcOutsoleSpecification.value.ItemIndex = `${tableData.value.length + 1}`
    dialogForm1Visible.value = true;

}

const btnConfirm = async () => {
    dialogForm1Visible.value = false;
    showLoading();
    if (titleDialogForm1.value === "ADD NEW OUTSOLE SPECIFICATION") {
        try {
            await insertPFCOutsoleSpecification(pfcOutsoleSpecification.value)
            success("Insert new OUTSOLE SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }

    if (titleDialogForm1.value === "UPDATE OUTSOLE SPECIFICATION") {
        try {
            await updatePFCOutsoleSpecification(pfcOutsoleSpecification.value)
            success("Update OUTSOLE SPECIFICATION successfully!")
            await reloadData()
        } catch (e) {
            error(e);
        }
    }
    hideLoading();
}

const btnDeletePFCOutsoleSpecification = async (index: number, row) => {
    ElMessageBox.confirm(
        `Proxy will permanently delete the TITLE: "${row.Title}". Continue?`,
        'Warning',

        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',

        }).then(async () => {
            const { res, _ } = await getPFCItemOutsoleSpecification(row)

            if (!res.data.data || res.data.data.length === 0) {
                showLoading();
                await deletePFCOutsoleSpecification(row);
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

const btnUpdatePFCOutsoleSpecification = async (index: number, row) => {
    pfcOutsoleSpecification.value = {};
    pfcOutsoleSpecification.value = Object.assign({}, row);
    titleDialogForm1.value = "UPDATE OUTSOLE SPECIFICATION"
    dialogForm1Visible.value = true;
}

const btnItemPFCOutsoleSpecification = async (index: number, row) => {
    showLoading();
    pfcOutsoleSpecification.value = {};
    pfcOutsoleSpecification.value = Object.assign({}, row);
    const { res, _ } = await getPFCItemOutsoleSpecification(pfcOutsoleSpecification.value)
    arrItemOutsoleSpecification.value = res.data.data ? res.data.data : [];
    // console.log(pfcOutsoleSpecification.value)
    dialogForm2Visible.value = true;
    hideLoading();
}

const btnAddItemNewOutsoleSpecification = async () => {
    titleDialogForm2.value = "ADD NEW ITEM OUTSOLE SPECIFICATION";
    pfcItemOutsoleSpecification.value = {};
    pfcItemOutsoleSpecification.value.OutsoleSpecificationID = pfcOutsoleSpecification.value.OutsoleSpecificationID;
    arrTableRow1.value = Array.from({ length: 6 }, (_, i) => ({
        No: i + 1,
        Section: "",
        Material: "",
        Hardness: "",
        SG: "",
        MCS: ""
    }));

    arrTableRow2.value = Array.from({ length: 8 }, (_, i) => {
        const obj = {
            PreformPart: "",
            Thickness: "",
            WeightType: "",
            A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "",
            I: "", J: "", K: "", L: "", M: "", N: "", O: "", P: "",
            Q: "", R: "", S: "", T: "", U: "", V: "", W: "", X: ""
        };

        if (i < 6) {
            obj.PreformPart = i % 2 === 0 ? String(i / 2 + 1) : "";
            obj.WeightType = i % 2 === 0 ? "Gross" : "Net";
        } else if (i === 7) {
            obj.PreformPart = "Tổng trọng lượng trên size 号码总重量 Total Weight per Size";
        }
        return obj;
    });

    formData_Content.delete("file");
    formData_Content.delete("ModelName");
    // imageUrl_Content.value = null;
    // oldImageUrl_Content.value = null;
    dialogForm3Visible.value = true;
}

const btnEditItemNewOutsoleSpecification = async (index: number, row) => {
    pfcItemOutsoleSpecification.value = Object.assign({}, row);
    // oldImageUrl_Content.value = row.Images.toString();

    try {
        arrTableRow1.value = row.TableRow1 ? JSON.parse(row.TableRow1) : Array.from({ length: 6 }, () => ({}));
        arrTableRow2.value = row.TableRow2 ? JSON.parse(row.TableRow2) : Array.from({ length: 8 }, () => ({}));
    } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        arrTableRow1.value = Array.from({ length: 6 }, () => ({}));
        arrTableRow2.value = Array.from({ length: 8 }, () => ({}));
    }

    imageUrl_Content.value = getURLImage(row.ImagesImages, pfcModel.value);
    titleDialogForm2.value = "UPDATE ITEM OUTSOLE SPECIFICATION";
    dialogForm3Visible.value = true;
};



const btnDeleteItemNewOutsoleSpecification = async (index: number, row) => {
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
            await deletePFCItemOutsoleSpecification(row);
            const { res, _ } = await getPFCItemOutsoleSpecification(pfcOutsoleSpecification.value)
            arrItemOutsoleSpecification.value = res.data.data;
            success("Delete PFC Item OUTSOLE SPECIFICATION successfully!")
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
    row.editingSection = false;
    row.editingMaterial = false;
    row.editingHardness = false;
    row.editingSG = false;
    row.editingMCS = false;
    row[`editing${capitalize(field)}`] = true;
};

const disableEdit = (row, field) => {
    row[`editing${capitalize(field)}`] = false;
};
const handleClickOutside = (event) => {
    arrTableRow1.value.forEach((row) => {
        row.editingNo = false;
        row.editingSection = false;
        row.editingMaterial = false;
        row.editingHardness = false;
        row.editingSG = false;
        row.editingMCS = false;
    });
};

const enableEdit2 = (row, field) => {
    row.editingA = false;
    row.editingB = false;
    row.editingC = false;
    row.editingD = false;
    row.editingE = false;
    row.editingF = false;
    row.editingG = false;
    row.editingH = false;
    row.editingI = false;
    row.editingJ = false;
    row.editingK = false;
    row.editingL = false;
    row.editingM = false;
    row.editingN = false;
    row.editingO = false;
    row.editingP = false;
    row.editingQ = false;
    row.editingR = false;
    row.editingS = false;
    row.editingT = false;
    row.editingU = false;
    row.editingV = false;
    row.editingW = false;
    row.editingX = false;

    row.editingPreformPart = false;
    row.editingThickness = false;
    row.editingWeightType = false;

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
        row.editingF = false;
        row.editingG = false;
        row.editingH = false;
        row.editingI = false;
        row.editingJ = false;
        row.editingK = false;
        row.editingL = false;
        row.editingM = false;
        row.editingN = false;
        row.editingO = false;
        row.editingP = false;
        row.editingQ = false;
        row.editingR = false;
        row.editingS = false;
        row.editingT = false;
        row.editingU = false;
        row.editingV = false;
        row.editingW = false;
        row.editingX = false;
        row.editingPreformPart = false;
        row.editingThickness = false;
        row.editingWeightType = false
    });
};


const btnConfirmItemOutsoleSpecification = async () => {
    dialogForm3Visible.value = false;
    showLoading();

    // tinh gia tri
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

    function updateRowToTwoDemacia(row) {
        columns.forEach(col => {
            if (row[col] !== "" && row[col] !== null) {
                let value = parseFloat(row[col]);
                row[col] = isNaN(value) ? row[col] : value.toFixed(2);
            }
        });
    }

    const firstRow = arrTableRow2.value[0];
    let hasData = columns.some(col => firstRow[col] !== "" && firstRow[col] !== null);

    if (hasData) {
        const row8 = arrTableRow2.value[7];
        columns.forEach(col => {
            if (firstRow[col] !== "" && firstRow[col] !== null) {
                let value = parseFloat(firstRow[col]);
                row8[col] = (value * 2).toFixed(2);
            }
        });
    }
    updateRowToTwoDemacia(firstRow);
    //

    const itemOutsoleSpecification = {
        ItemOutsoleSpecificationID: pfcItemOutsoleSpecification.value.ItemOutsoleSpecificationID,
        OutsoleSpecificationID: pfcItemOutsoleSpecification.value.OutsoleSpecificationID,
        TableRow1: JSON.stringify(arrTableRow1.value),
        TableRow2: JSON.stringify(arrTableRow2.value),
    };
    // console.log(itemOutsoleSpecification)
    if (titleDialogForm2.value === "ADD NEW ITEM OUTSOLE SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {

            }
            await insertItemPFCOutsoleSpecification(itemOutsoleSpecification);
            const { res, _ } = await getPFCItemOutsoleSpecification(pfcOutsoleSpecification.value)
            arrItemOutsoleSpecification.value = res.data.data;
            success("Insert new Item OUTSOLE SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }

    if (titleDialogForm2.value === "UPDATE ITEM OUTSOLE SPECIFICATION") {
        try {
            if (formData_Content && formData_Content.entries().next().value) {
            }
            await updatePFCItemOutsoleSpecification(itemOutsoleSpecification)
            const { res, _ } = await getPFCItemOutsoleSpecification(pfcOutsoleSpecification.value)
            arrItemOutsoleSpecification.value = res.data.data;
            success("Insert new Item OUTSOLE SPECIFICATION successfully!")
        } catch (e) {
            error(e)
        }
    }
    hideLoading();
    // console.log("TableRow1", TableRow1)
}
</script>

<style scoped>
.table-container {
    display: table;
    width: 100%;
    border-collapse: collapse;
}

.row {
    display: table-row;
}

.cell-title-1 {
    display: table-cell;
    width: 40%;
    border: 1px solid rgb(235, 238, 245);
    padding: 10px;
    text-align: center;
    background-color: rgba(240, 240, 42, 0.411);
}

.cell-title-2 {
    display: table-cell;
    width: 60%;
    border: 1px solid rgb(235, 238, 245);
    padding: 10px;
    text-align: center;
    background-color: rgba(240, 240, 42, 0.411);
}

.cell-1 {
    display: table-cell;
    width: 40%;
    border: 1px solid rgb(235, 238, 245);
    padding: 10px;
    /* background-color: rgba(240, 240, 42, 0.411); */
}

.cell-2 {
    display: table-cell;
    width: 60%;
    border: 1px solid rgb(235, 238, 245);
    padding: 10px;
    /* background-color: rgba(240, 240, 42, 0.411); */
}

.header {
    font-weight: bold;
}

.empty {
    height: 400px;
}
</style>