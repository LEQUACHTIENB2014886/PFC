import { isEmptyString } from "@/utils/PFC/ExcelFunction"
import { getDataLaminationProcess } from "@/hooks/PFC/useLaminationProcess"

const insertDataInFileExcelSheetLaminationProcess = async (
    sheet,
    model,
    pageSetup,
) => {

    const { res, _error } = await getDataLaminationProcess(model)
    const laminationProcess = res.data.data

    const promises = [];

    sheet.eachRow((row, _rowNumber) => {
        row.eachCell((cell, _colNumber) => {
            const promise = insertModelIntoFileExcel(cell, model, laminationProcess);
            if (promise) {
                promises.push(promise);
            }
        });
    });

    // Wait for all promises (including image insertions) to complete
    await Promise.all(promises);

    sheet.headerFooter = {
        // Header
        differentFirst: false,
        oddHeader: `&L&"Arial,Bold"&12${pageSetup.LeftSelectionHeader}&R&"Arial,Bold"&12${pageSetup.RightSelectionHeader}`,

        // Footer
        oddFooter: `&C&"Arial,Bold"&12 Lamination Process`,
    };
};


const insertModelIntoFileExcel = (cell, model, laminationProcess) => {
    cell.numFmt = "@";
    const valueMappings = {
        "{{ModelType}}": !isEmptyString(model.ModelType) ? model.ModelType : "N/A",
        "{{ModelName}}": !isEmptyString(model.ModelName) ? model.ModelName : "N/A",
        "{{MaterialNumber}}": !isEmptyString(model.MaterialNumber) ? model.MaterialNumber : "N/A",
        "{{ComponentName}}": !isEmptyString(laminationProcess.ComponentName) ? laminationProcess.ComponentName : "N/A",
        "{{Vendor}}": !isEmptyString(laminationProcess.Vendor) ? laminationProcess.Vendor : "N/A",

        //Material Descriptions
        "{{MaterialDescriptionName0}}": !isEmptyString(laminationProcess.MaterialDescriptions[0].Name) ? `Name 名称 Tên: ${laminationProcess.MaterialDescriptions[0].Name}` : "Name 名称 Tên: N/A",
        "{{MaterialDescriptionMat0}}": !isEmptyString(laminationProcess.MaterialDescriptions[0].Mat) ? `Mat# (MCS#): ${laminationProcess.MaterialDescriptions[0].Mat}` : "Mat# (MCS#): N/A",
        "{{MaterialDescriptionName1}}": !isEmptyString(laminationProcess.MaterialDescriptions[1].Name) ? `Name 名称 Tên: ${laminationProcess.MaterialDescriptions[1].Name}` : " Name 名称 Tên:N/A",
        "{{MaterialDescriptionMat1}}": !isEmptyString(laminationProcess.MaterialDescriptions[1].Mat) ? `Mat# (MCS#): ${laminationProcess.MaterialDescriptions[1].Mat}` : "Mat# (MCS#): N/A",
        //Adhesive Type
        "{{AdhesiveTypeType}}": !isEmptyString(laminationProcess.AdhesiveType[0].Type) ? `Type 类型 Loại: ${laminationProcess.AdhesiveType[0].Type}` : "Type 类型 Loại: N/A",
        "{{AdhesiveTypeName}}": !isEmptyString(laminationProcess.AdhesiveType[0].Name) ? `Name 名称 Tên: ${laminationProcess.AdhesiveType[0].Name}` : "Name 名称 Tên: N/A",
        "{{AdhesiveTypeVendor}}": !isEmptyString(laminationProcess.AdhesiveType[0].Vendor) ? `Vendor 厂商 Nhà cung ứng: ${laminationProcess.AdhesiveType[0].Vendor}` : "Vendor 厂商 Nhà cung ứng: N/A",
        "{{AdhesiveTypeThickness}}": !isEmptyString(laminationProcess.AdhesiveType[0].Thickness) ? `Thickness 厚度 Độ dày: ${laminationProcess.AdhesiveType[0].Thickness}` : "Thickness 厚度 Độ dày: N/A",
        "{{AdhesiveTypeMeltingPoint}}": !isEmptyString(laminationProcess.AdhesiveType[0].MeltingPoint) ? `Melting point 熔点 Điểm nóng chảy: ${laminationProcess.AdhesiveType[0].MeltingPoint}` : "Melting point 熔点 Điểm nóng chảy: N/A",
        //Adhesive Other Type
        "{{AdhesiveOtherTypeName}}": !isEmptyString(laminationProcess.AdhesiveOtherType[0].Name) ? `${laminationProcess.AdhesiveOtherType[0].Name}` : "N/A",
        "{{AdhesiveOtherTypeDescription}}": !isEmptyString(laminationProcess.AdhesiveOtherType[0].Description) ? `${laminationProcess.AdhesiveOtherType[0].Description}` : "N/A",
        //Rolls
        "{{RollsTemp0}}": !isEmptyString(laminationProcess.Rolls[0].Temp) ? `Temp 温度 Nhiệt độ: ${laminationProcess.Rolls[0].Temp}` : "Temp 温度 Nhiệt độ: N/A",
        "{{RollsRollSize0}}": !isEmptyString(laminationProcess.Rolls[0].RollSize) ? `Roll Size 滚轮大小 Kích cở cuộn: ${laminationProcess.Rolls[0].RollSize}` : "Roll Size 滚轮大小 Kích cở cuộn: N/A",
        "{{RollsTime0}}": !isEmptyString(laminationProcess.Rolls[0].Time) ? `Time 时间 Thời gian: ${laminationProcess.Rolls[0].Time}` : "Time 时间 Thời gian: N/A",
        "{{RollsTemp1}}": !isEmptyString(laminationProcess.Rolls[1].Temp) ? `Temp 温度 Nhiệt độ: ${laminationProcess.Rolls[1].Temp}` : "Temp 温度 Nhiệt độ: N/A",
        "{{RollsRollSize1}}": !isEmptyString(laminationProcess.Rolls[1].RollSize) ? `Roll Size 滚轮大小 Kích cở cuộn: ${laminationProcess.Rolls[1].RollSize}` : "Roll Size 滚轮大小 Kích cở cuộn: N/A",
        "{{RollsTime1}}": !isEmptyString(laminationProcess.Rolls[1].Time) ? `Time 时间 Thời gian: ${laminationProcess.Rolls[1].Time}` : "Time 时间 Thời gian: N/A",

        "{{Winding}}": !isEmptyString(laminationProcess.Winding) ? `${laminationProcess.Winding}` : "N/A",
        "{{Cooling}}": !isEmptyString(laminationProcess.Cooling) ? `${laminationProcess.Cooling}` : "N/A",
        "{{EndStep}}": !isEmptyString(laminationProcess.EndStep) ? `${laminationProcess.EndStep}` : "N/A",

    };

    // Check for model value mappings and insert accordingly
    if (valueMappings[cell.value]) {
        cell.value = valueMappings[cell.value];
    }
};

export {
    insertDataInFileExcelSheetLaminationProcess
}