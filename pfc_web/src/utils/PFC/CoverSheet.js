
import { insertImageFileExcel, safeJsonParse } from "@/utils/PFC/ExcelFunction"
import { isEmptyString, formatDate, extractValue, isValueInOptionIDS, getURLImage } from "@/utils/PFC/ExcelFunction"

const optionModelType = [
    { label: "PRODUCTION CONFIRMATION", value: "PRODUCTION CONFIRMATION" },
    { label: "RFC", value: "RFC" },
]

const optionConverse = [
    { label: "CONVERSE PE", value: "CONVERSE PE" },
    { label: "CONVERSE TD", value: "CONVERSE TD" },
    { label: "CONVERSE ME", value: "CONVERSE ME" },
]

const optionIDS = [
    { value: '3', label: '3' },
    { value: '3T', label: '3T' },
    { value: '4', label: '4' },
    { value: '4T', label: '4T' },
    { value: '5', label: '5' },
    { value: '5T', label: '5T' },
    { value: '6', label: '6' },
    { value: '6T', label: '6T' },
    { value: '7', label: '7' },
    { value: '7T', label: '7T' },
    { value: '8', label: '8' },
    { value: '8T', label: '8T' },
    { value: '9', label: '9' },
    { value: '9T', label: '9T' },
    { value: '10', label: '10' },
    { value: '10T', label: '10T' },
    { value: '11', label: '11' },
    { value: '11T', label: '11T' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
]

// Insert model data into the Excel file
const insertDataInFileExcelSheetCover = async (
    sheetCover,
    model,
    pageSetup
) => {
    const arrIDS = generateArr(optionIDS, model.IDS)

    const promises = [];

    sheetCover.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            const promise = insertModelIntoFileExcel(cell, sheetCover, colNumber, rowNumber, model, arrIDS);
            if (promise) {
                promises.push(promise);
            }
        });
    });
    // Wait for all promises (including image insertions) to complete
    await Promise.all(promises);
    sheetCover.headerFooter = {
        // Header
        differentFirst: false,
        oddHeader: `&L&"Arial,Bold"&12${pageSetup.LeftSelectionHeader}&R&"Arial,Bold"&12${pageSetup.RightSelectionHeader}`,

        // Footer
        oddFooter: `&C&"Arial,Bold"&12 Cover`,
    };
};

const insertModelIntoFileExcel = (cell, sheet, colNumber, rowNumber, model, arrIDS) => {
    const valueMappings = {
        "{{ModelID}}": !isEmptyString(model.ModelID) ? model.ModelID : "N/A",
        "{{ColorWayID}}": !isEmptyString(model.ColorWayID) ? model.ColorWayID : "N/A",
        "{{BOMID}}": !isEmptyString(model.BOMID) ? model.BOMID : "N/A",
        "{{Date}}": !isEmptyString(model.Date) ? formatDate(model.Date) : "N/A",
        "{{ModelName}}": !isEmptyString(model.ModelName) ? model.ModelName : "N/A",
        "{{MaterialNumber}}": !isEmptyString(model.MaterialNumber) ? model.MaterialNumber : "N/A",
        "{{SizeRange}}": !isEmptyString(model.SizeRange) ? model.SizeRange : "N/A",
        "{{LastCode}}": !isEmptyString(model.LastCode) ? model.LastCode : "N/A",
        "{{ToolCode}}": !isEmptyString(model.ToolCode) ? model.ToolCode : "N/A",
        "{{PatternFileName}}": !isEmptyString(model.PatternFileName) ? model.PatternFileName : "N/A",
        "{{FirstSource}}": !isEmptyString(model.FirstSource) ? model.FirstSource : "N/A",
        "{{KeyManufacturingProcesses}}": !isEmptyString(model.KeyManufacturingProcesses) ? model.KeyManufacturingProcesses : "N/A",
        "{{ModelType}}": !isEmptyString(model.ModelType) ? model.ModelType : "N/A",
        "{{Converse}}": !isEmptyString(model.Converse) ? model.Converse : "N/A",
    };

    // Check for model value mappings and insert accordingly
    if (valueMappings[cell.value]) {
        cell.value = valueMappings[cell.value];
    }

    arrIDS.forEach((item, index) => {
        if (cell.value === `{{Ms${index}}}`) {
            cell.value = item.value
            if (item.value === model.IDS) {
                const existingStyle = cell.style || {};
                cell.style = {
                    ...existingStyle,
                    fill: {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FF32CD32" },
                    },
                };
            }
        }
    })

    if (cell.value === "{{MedialSideView}}") {
        cell.value = "";
        if (model.MedialSideView) {
            return insertImageIntoFileExcel(getURLImage(model.MedialSideView, model), cell, sheet, rowNumber, colNumber, 390, 160);
        }

    }

    if (cell.value === "{{FrontView}}") {
        cell.value = "";
        if (model.FrontView) {
            return insertImageIntoFileExcel(getURLImage(model.FrontView, model), cell, sheet, rowNumber, colNumber, 260, 280);
        }

    }

    if (cell.value === "{{LateralSideView}}") {
        cell.value = "";
        if (model.LateralSideView) {
            return insertImageIntoFileExcel(getURLImage(model.LateralSideView, model), cell, sheet, rowNumber, colNumber, 390, 160);
        }

    }

    if (cell.value === "{{HeelView}}") {
        cell.value = "";
        if (model.HeelView) {
            return insertImageIntoFileExcel(getURLImage(model.HeelView, model), cell, sheet, rowNumber, colNumber, 260, 280);
        }

    }

    if (cell.value === "{{BottomView}}") {
        cell.value = "";
        if (model.BottomView) {
            return insertImageIntoFileExcel(getURLImage(model.BottomView, model), cell, sheet, rowNumber, colNumber, 390, 190);
        }
    }
};

const adjustedOptionIDS = optionIDS.map(option => ({
    value: `{{${option.value}}}`,
    label: option.label
}))

const generateArr = (optionIDS, target) => {
    const arr = [];
    const beforeIndex = 8;
    const afterIndex = 9;
    const index = optionIDS.findIndex(item => item.value === target && item.label === target);

    for (let i = 0; i < beforeIndex; i++) {
        const indexItem = index - i - 1;
        if (indexItem < 0) {
            const item = optionIDS[optionIDS.length - Math.abs(indexItem)];
            arr.splice(0, 0, item);
        } else {
            const item = optionIDS[indexItem];
            arr.splice(0, 0, item);
        }
    }

    arr.push(optionIDS[index])

    for (let i = 0; i < afterIndex; i++) {
        const indexItem = index + i + 1;
        const circularIndex = indexItem % optionIDS.length;
        const item = optionIDS[circularIndex];
        arr.push(item)
    }

    return arr;
};

const insertDataSheetCover = async (sheet, pfcModel) => {
    const ModelTypeCell = sheet.getCell("B2");
    ModelTypeCell.value = pfcModel.ModelType ? pfcModel.ModelType : "N/A";

    const DateCell = sheet.getCell("G7");
    DateCell.value = pfcModel.Date ? pfcModel.Date : "N/A";

    const ModelNameCell = sheet.getCell("G8");
    ModelNameCell.value = pfcModel.ModelName ? pfcModel.ModelName : "N/A";

    const ModelIDCell = sheet.getCell("G9");
    ModelIDCell.value = pfcModel.ModelID ? pfcModel.ModelID : "N/A";

    const ColorWayIDCell = sheet.getCell("G10");
    ColorWayIDCell.value = pfcModel.ColorWayID ? pfcModel.ColorWayID : "N/A";

    const MaterialNumberCell = sheet.getCell("G11");
    MaterialNumberCell.value = pfcModel.MaterialNumber ? pfcModel.MaterialNumber : "N/A";

    const BOMIDCell = sheet.getCell("G12");
    BOMIDCell.value = pfcModel.BOMID ? pfcModel.BOMID : "N/A";

    const SizeRangeCell = sheet.getCell("G13");
    SizeRangeCell.value = pfcModel.SizeRange ? pfcModel.SizeRange : "N/A";

    const LastCodeCell = sheet.getCell("G14");
    LastCodeCell.value = pfcModel.LastCode ? pfcModel.LastCode : "N/A";

    const ToolCodeCell = sheet.getCell("G15");
    ToolCodeCell.value = pfcModel.ToolCode ? pfcModel.ToolCode : "N/A";

    const PatternFileNameCell = sheet.getCell("G16");
    PatternFileNameCell.value = pfcModel.PatternFileName ? pfcModel.PatternFileName : "N/A";

    const FirstSourceCell = sheet.getCell("G17");
    FirstSourceCell.value = pfcModel.FirstSource ? pfcModel.FirstSource : "N/A";

    const KeyManufacturingProcessesCell = sheet.getCell("G19");
    KeyManufacturingProcessesCell.value = pfcModel.KeyManufacturingProcesses ? pfcModel.KeyManufacturingProcesses : "N/A";

    const ConverseCell = sheet.getCell("BF33");
    ConverseCell.value = pfcModel.Converse;

    const arrIDS = generateArr(optionIDS, pfcModel.IDS)
    if (arrIDS && arrIDS.length > 0) {
        const MSCell = sheet.getCell("BF6");
        for (let i = 0; i < arrIDS.length; i++) {
            const idsCell = sheet.getCell(MSCell.row + i + 1, MSCell.col)
            idsCell.value = arrIDS[i].value;
            if (arrIDS[i].value === pfcModel.IDS) {
                const existingStyle = idsCell.style || {};
                idsCell.style = {
                    ...existingStyle,
                    fill: {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FF32CD32" },
                    },
                };
            }
        }
    }

    const MedialSideViewCell = sheet.getCell("AC8")
    const EndMedialSideViewCell = sheet.getCell("AR14")
    await insertImageFileExcel(sheet, getURLImage(pfcModel.MedialSideView, pfcModel), MedialSideViewCell, EndMedialSideViewCell);

    const FrontViewCell = sheet.getCell("AT8");
    const EndFrontViewCell = sheet.getCell("BD19");
    await insertImageFileExcel(sheet, getURLImage(pfcModel.FrontView, pfcModel), FrontViewCell, EndFrontViewCell);

    const LateralSideViewCell = sheet.getCell("AC17");
    const EndLateralSideViewCell = sheet.getCell("AR23");
    await insertImageFileExcel(sheet, getURLImage(pfcModel.LateralSideView, pfcModel), LateralSideViewCell, EndLateralSideViewCell);

    const BottomViewCell = sheet.getCell("AC26");
    const EndBottomViewCell = sheet.getCell("AR33");
    await insertImageFileExcel(sheet, getURLImage(pfcModel.BottomView, pfcModel), BottomViewCell, EndBottomViewCell);

    const HeelViewCell = sheet.getCell("AT22");
    const EndHeelViewCell = sheet.getCell("BD33")
    await insertImageFileExcel(sheet, getURLImage(pfcModel.HeelView, pfcModel), HeelViewCell, EndHeelViewCell);

}

export {
    insertDataInFileExcelSheetCover,
    optionModelType,
    optionConverse,
    optionIDS,
    insertDataSheetCover
}