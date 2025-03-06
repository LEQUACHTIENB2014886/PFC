import { isEmptyString } from "@/utils/PFC/ExcelFunction"

const insertDataInFileExcelSheetCommonCuttingProcess = async (
    sheet,
    model
) => {

    const promises = [];

    sheet.eachRow((row, _rowNumber) => {
        row.eachCell((cell, _colNumber) => {
            const promise = insertModelIntoFileExcel(cell, model);
            if (promise) {
                promises.push(promise);
            }
        });
    });

    // Wait for all promises (including image insertions) to complete
    await Promise.all(promises);
};


const insertModelIntoFileExcel = (cell, model) => {
    cell.numFmt = "@";
    const valueMappings = {
        "{{ModelType}}": !isEmptyString(model.ModelType) ? model.ModelType : "N/A",
        "{{ModelName}}": !isEmptyString(model.ModelName) ? `MODEL NAME: ${model.ModelName}` : "MODEL NAME: N/A",
        "{{MaterialNumber}}": !isEmptyString(model.MaterialNumber) ? `MATERIAL NUMBER: ${model.MaterialNumber}` : "MATERIAL NUMBER: N/A",
    };

    // Check for model value mappings and insert accordingly
    if (valueMappings[cell.value]) {
        cell.value = valueMappings[cell.value];
    }
};

export {
    insertDataInFileExcelSheetCommonCuttingProcess
}