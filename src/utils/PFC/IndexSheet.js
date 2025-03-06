import { isEmptyString } from "@/utils/PFC/ExcelFunction"

const insertDataInFileExcelSheetIndex = async (
    sheetIndex,
    model,
    pageSetup
) => {
    const promises = [];

    sheetIndex.columns.forEach(column => {
        if (column.width < 3.7) {
            column.width = 3.7;
        }
    });

    sheetIndex.eachRow((row, _rowNumber) => {
        if (row.height < 20) {
            row.height = 20
        }

        row.eachCell((cell, _colNumber) => {
            const promise = insertModelIntoFileExcel(cell, model);
            if (promise) {
                promises.push(promise);
            }
        });
    });

    // Wait for all promises (including image insertions) to complete
    await Promise.all(promises);

    sheetIndex.headerFooter = {
        // Header
        differentFirst: false,
        oddHeader: `&L&"Arial,Bold"&12${pageSetup.LeftSelectionHeader}&R&"Arial,Bold"&12${pageSetup.RightSelectionHeader}`,

        // Footer
        oddFooter: `&C&"Arial,Bold"&12 Index`,
    };
};


const insertModelIntoFileExcel = (cell, model) => {
    cell.numFmt = "@";
    const valueMappings = {
        "{{ModelType}}": !isEmptyString(model.ModelType) ? model.ModelType : "N/A",
        "{{ModelName}}": !isEmptyString(model.ModelName) ? model.ModelName : "N/A",
        "{{MaterialNumber}}": !isEmptyString(model.MaterialNumber) ? model.MaterialNumber : "N/A",
    };

    // Check for model value mappings and insert accordingly
    if (valueMappings[cell.value]) {
        cell.value = valueMappings[cell.value];
    }
};

export {
    insertDataInFileExcelSheetIndex
}