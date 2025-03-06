import { isEmptyString, insertImageIntoFileExcel, getURLImage } from "@/utils/PFC/ExcelFunction"
import { getPFCUpperCuttingDieSchedule, getAllPFCItemUpperCuttingDieScheduleByModelID } from "@/hooks/PFC/useUpperCuttingDieSchedule"

const sizeRange = [
    { value: '1', label: '1' },
    { value: '1T', label: '1T' },
    { value: '2', label: '2' },
    { value: '2T', label: '2T' },
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
    { value: '12T', label: '12T' },
    { value: '13', label: '13' },
    { value: '13T', label: '13T' },
    { value: '14', label: '14' },
    { value: '14T', label: '14T' },
    { value: '15', label: '15' },
    { value: '15T', label: '15T' },
    { value: '16', label: '16' },
    { value: '16T', label: '16T' },
    { value: '17', label: '17' },
    { value: '17T', label: '17T' },
    { value: '18', label: '18' },
]

const insertDataInFileExcelSheetUpperCuttingDieSchedule = async (
    sheet,
    model,
    pageSetup
) => {
    const promises = [];
    const { res, error } = await getPFCUpperCuttingDieSchedule(model)
    const arrUpperCuttingDieSchedule = res.data.data;
    const { res: resGetAllPFCItemUpperCuttingDieScheduleByModelID, error: errGetAllPFCItemUpperCuttingDieScheduleByModelID } = await getAllPFCItemUpperCuttingDieScheduleByModelID(model)
    const arrItemUpperCuttingDieSchedule = resGetAllPFCItemUpperCuttingDieScheduleByModelID.data.data;

    await copyPageInSameSheet(sheet, [1, 1, 74, 55], arrUpperCuttingDieSchedule.length > 0 ? arrUpperCuttingDieSchedule.length - 1 : 0)
    // await insertDataText(sheet, model, arrUpperCuttingDieSchedule, arrItemUpperCuttingDieSchedule);
    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            const promise = insertDataIntoFileExcel(sheet, cell, model, arrUpperCuttingDieSchedule, arrItemUpperCuttingDieSchedule, rowNumber, colNumber);
            if (promise) {
                promises.push(promise);
            }
        });
    });
    await Promise.all(promises);
    sheet.headerFooter = {
        // Header
        differentFirst: false,
        oddHeader: `&L&"Arial,Bold"&12${pageSetup.LeftSelectionHeader}&R&"Arial,Bold"&12${pageSetup.RightSelectionHeader}`,

        // Footer
        // oddFooter: `&C&"Arial,Bold"&12 Upper Cutting Die Schedule`,
    };
};

const insertDataIntoFileExcel = async (sheet, cell, model, arrUpperCuttingDieSchedule, arrItemUpperCuttingDieSchedule, rowNumber, colNumber) => {
    for (const [index, value] of arrUpperCuttingDieSchedule.entries()) {
        await insertTextIntoFileExcel(cell, `{{ModelType${index}}}`, model.ModelType ? model.ModelType : "N/A");
        await insertTextIntoFileExcel(cell, `{{ModelName${index}}}`, model.ModelName ? model.ModelName : "N/A");
        await insertTextIntoFileExcel(cell, `{{MaterialNumber${index}}}`, model.MaterialNumber ? model.MaterialNumber : "N/A");
        await insertTextIntoFileExcel(cell, `{{ComponentName${index}}}`, value.ComponentName ? value.ComponentName : "N/A");
        await insertTextIntoFileExcel(cell, `{{Remark${index}}}`, value.Remark ? value.Remark : "N/A");
        await insertTextIntoFileExcel(cell, `{{PageIndex${index}}}`, value.PageIndex ? "Page: 3 - " + value.PageIndex : "N/A");

        if (cell.value === `{{ImageRemark${index}}}`) {
            cell.value = "";
            if (value.ImageRemark) {
                await insertImageIntoFileExcel(getURLImage(value.ImageRemark, model), cell, sheet, rowNumber, colNumber, 80, 90);
            }
        }

        let arrItem = arrItemUpperCuttingDieSchedule ? arrItemUpperCuttingDieSchedule.filter(
            (data) => data.UpperCuttingDieScheduleID.toLowerCase().includes(value.UpperCuttingDieScheduleID.toLowerCase())
        ) : []

        for (let i = 0; i < 9; i++) {
            const item = arrItem.find(item => item.ItemIndex === `${i + 1}`);
            if (item) {
                await insertTextIntoFileExcel(cell, `{{ItemComponentName${index}${i}}}`, item.ComponentName ? item.ComponentName : "N/A");
                await insertTextIntoFileExcel(cell, `{{ItemNumberofLayers${index}${i}}}`, item.NumberOfPlayers ? item.NumberOfPlayers : "N/A");
                if (cell.value === `{{ItemImageRemark${index}${i}}}`) {
                    cell.value = "";
                    if (item.ImageRemark) {
                        await insertImageIntoFileExcel(getURLImage(item.ImageRemark, model), cell, sheet, rowNumber, colNumber, 180, 170);
                    }
                }

                if (cell.value === `{{ItemImageContent${index}${i}}}`) {
                    cell.value = "";
                    if (item.ImageContent) {
                        await insertImageIntoFileExcel(getURLImage(item.ImageContent, model), cell, sheet, rowNumber, colNumber, 580, 330);
                    }
                }

                if (cell.value === `{{SizeRange1${index}${i}}}`) {
                    let values = [];
                    if (item.SizeRange1 === "7G") {
                        values = getRange(sizeRange, "2", "10");
                    }

                    if (item.SizeRange1 === "6G") {
                        values = getRange(sizeRange, "10T", "7");
                    }

                    if (item.SizeRange1 === "3G") {
                        values = getRange(sizeRange, "10T", "7");
                    }

                    if (item.SizeRange1 === "5G") {
                        values = getRange(sizeRange, "5", "11");
                    }

                    if (item.SizeRange1 === "2G") {
                        values = getRange(sizeRange, "3T", "7");
                    }

                    if (item.SizeRange1 === "1G") {
                        values = getRange(sizeRange, "3", "18");
                    }
                    const arrSizeRange1 = generateArr(values, item.SizeRange)
                    await insertArrayCell(sheet, cell, arrSizeRange1);
                    await insertTextIntoFileExcel(cell, `{{SizeRange1${index}${i}}}`, item.SizeRange1 ? item.SizeRange1 : "");

                    if (item.SizeRangeAreSame) {
                        const arrSizeRangeAreSame = item.SizeRangeAreSame.split(",");
                        for (let s = 0; s < arrSizeRangeAreSame.length; s++) {
                            let target = arrSizeRangeAreSame[s];
                            const indexAreSame = arrSizeRange1.findIndex(item => item?.value === target);
                            const startRow = cell.row + 2;
                            const startCol = cell.col + indexAreSame + 2;
                            const nextTargetCell = sheet.getCell(startRow, startCol);
                            nextTargetCell.value = "";
                        }
                    }

                    if (item.SizeRange) {
                        const startRow = cell.row + 2;
                        const startCol = cell.col + 6;
                        const targetCell = sheet.getCell(startRow, startCol);
                        const existingStyle = targetCell.style || {};
                        targetCell.style = {
                            ...existingStyle,
                            fill: {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FF32CD32" },
                            },
                        };
                    }
                }

                if (cell.value === `{{SizeRange2${index}${i}}}`) {
                    let values = [];
                    if (item.SizeRange2 === "7G") {
                        values = getRange(sizeRange, "2", "10");
                    }

                    if (item.SizeRange2 === "6G") {
                        values = getRange(sizeRange, "10T", "7");
                    }

                    if (item.SizeRange2 === "3G") {
                        values = getRange(sizeRange, "10T", "7");
                    }

                    if (item.SizeRange2 === "5G") {
                        values = getRange(sizeRange, "5", "11");
                    }

                    if (item.SizeRange2 === "2G") {
                        values = getRange(sizeRange, "3T", "7");
                    }

                    if (item.SizeRange2 === "1G") {
                        values = getRange(sizeRange, "3", "18");
                    }

                    const arrSizeRange2 = generateArr(values, item.SizeRange)
                    await insertArrayCell(sheet, cell, arrSizeRange2);
                    await insertTextIntoFileExcel(cell, `{{SizeRange2${index}${i}}}`, item.SizeRange2 ? item.SizeRange2 : "");
                }

            } else {
                await insertTextIntoFileExcel(cell, `{{ItemComponentName${index}${i}}}`, "");
                await insertTextIntoFileExcel(cell, `{{ItemNumberofLayers${index}${i}}}`, "");
                if (cell.value === `{{ItemImageRemark${index}${i}}}`) {
                    cell.value = "";
                }

                if (cell.value === `{{ItemImageContent${index}${i}}}`) {
                    cell.value = "";
                }
                await insertTextIntoFileExcel(cell, `{{SizeRange1${index}${i}}}`, "");
                await insertTextIntoFileExcel(cell, `{{SizeRange2${index}${i}}}`, "");
            }
        }
    }
};

const generateArr = (optionIDS, target) => {
    const arr = [];
    const beforeIndex = 5;
    const afterIndex = 12;
    let index = optionIDS.findIndex(item => item.value === target && item.label === target);
    if (index < 0) {
        index = 0;
    }

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

const insertTextIntoFileExcel = (cell, field, value) => {
    if (cell.value === field) {
        cell.value = value
    }
}

const copyPageInSameSheet = (sheet, range, numberOfPages) => {
    const [startCol, startRow, endCol, endRow] = range;
    const rowCount = endRow - startRow + 1;
    const colCount = endCol - startCol + 1;
    const mergedCells = [];

    sheet.model.merges.forEach((mergeRange) => {
        const [mergeStart, mergeEnd] = mergeRange.split(":");
        const mergeStartCell = sheet.getCell(mergeStart);
        const mergeEndCell = sheet.getCell(mergeEnd);
        if (
            mergeStartCell.row >= startRow &&
            mergeStartCell.col >= startCol &&
            mergeEndCell.row <= endRow &&
            mergeEndCell.col <= endCol
        ) {
            mergedCells.push(mergeRange);
        }
    });

    for (let pageIndex = 1; pageIndex <= numberOfPages; pageIndex++) {
        const startTargetRow = pageIndex * rowCount + 1;

        mergedCells.forEach((mergeRange) => {
            const [mergeStart, mergeEnd] = mergeRange.split(":");
            const mergeStartCell = sheet.getCell(mergeStart);
            const mergeEndCell = sheet.getCell(mergeEnd);

            const targetMergeStart = sheet.getCell(
                mergeStartCell.row - startRow + startTargetRow,
                mergeStartCell.col
            ).address;

            const targetMergeEnd = sheet.getCell(
                mergeEndCell.row - startRow + startTargetRow,
                mergeEndCell.col
            ).address;

            sheet.mergeCells(`${targetMergeStart}:${targetMergeEnd}`);
        });

        for (let row = startRow; row <= endRow; row++) {
            const sourceRow = sheet.getRow(row);
            const targetRow = sheet.getRow(row - startRow + startTargetRow);
            if (sourceRow.height) {
                targetRow.height = sourceRow.height;
            }
        }

        for (let col = startCol; col <= endCol; col++) {
            const sourceCol = sheet.getColumn(col);
            const targetCol = sheet.getColumn(col);
            if (sourceCol.width) {
                targetCol.width = sourceCol.width;
            }
        }

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const sourceCell = sheet.getCell(row, col);
                const targetCell = sheet.getCell(row - startRow + startTargetRow, col);
                targetCell.value = sourceCell.value;
                createField(targetCell, sourceCell, pageIndex)

                if (sourceCell.formula) {
                    targetCell.value = { formula: sourceCell.formula };
                }
                if (sourceCell.style) {
                    targetCell.style = { ...sourceCell.style };
                }
            }
        }

        const printStartRow = startTargetRow;
        const printEndRow = startTargetRow + rowCount - 1;
        const printArea = `${sheet.getCell(printStartRow, startCol).address}:${sheet.getCell(printEndRow, endCol).address}`;

        if (!sheet.pageSetup.printArea) {
            sheet.pageSetup.printArea = printArea;
        } else {
            sheet.pageSetup.printArea += `,${printArea}`;
        }
    }

};

function getNewCellValue(sheet, range, pageIndex, targetCellAddress) {
    const [startCol, startRow, endCol, endRow] = range;

    const rowCount = endRow - startRow + 1;

    const sourceCell = sheet.getCell(targetCellAddress);
    const row = sourceCell.row;
    const col = sourceCell.col;

    const newRow = (pageIndex - 1) * rowCount + (row - startRow + 1);
    const newCol = col;

    const targetCell = sheet.getCell(newRow, newCol);

    return targetCell
}

const createField = (targetCell, sourceCell, pageIndex) => {
    if (sourceCell.value === "{{ModelType0}}") {
        targetCell.value = `{{ModelType${pageIndex}}}`
    }

    if (sourceCell.value === "{{ModelName0}}") {
        targetCell.value = `{{ModelName${pageIndex}}}`
    }

    if (sourceCell.value === "{{MaterialNumber0}}") {
        targetCell.value = `{{MaterialNumber${pageIndex}}}`
    }

    if (sourceCell.value === "{{ComponentName0}}") {
        targetCell.value = `{{ComponentName${pageIndex}}}`
    }

    if (sourceCell.value === "{{ImageRemark0}}") {
        targetCell.value = `{{ImageRemark${pageIndex}}}`
    }

    if (sourceCell.value === "{{Remark0}}") {
        targetCell.value = `{{Remark${pageIndex}}}`
    }

    if (sourceCell.value === "{{PageIndex0}}") {
        targetCell.value = `{{PageIndex${pageIndex}}}`
    }

    for (let index = 0; index < 9; index++) {
        if (sourceCell.value === `{{ItemComponentName0${index}}}`) {
            targetCell.value = `{{ItemComponentName${pageIndex}${index}}}`
        }

        if (sourceCell.value === `{{ItemImageContent0${index}}}`) {
            targetCell.value = `{{ItemImageContent${pageIndex}${index}}}`
        }

        if (sourceCell.value === `{{ItemImageRemark0${index}}}`) {
            targetCell.value = `{{ItemImageRemark${pageIndex}${index}}}`
        }

        if (sourceCell.value === `{{ItemNumberofLayers0${index}}}`) {
            targetCell.value = `{{ItemNumberofLayers${pageIndex}${index}}}`
        }

        if (sourceCell.value === `{{SizeRange10${index}}}`) {
            targetCell.value = `{{SizeRange1${pageIndex}${index}}}`
        }

        if (sourceCell.value === `{{SizeRange20${index}}}`) {
            targetCell.value = `{{SizeRange2${pageIndex}${index}}}`
        }
    }
}

function insertArrayCell(sheet, cell, values) {
    const startRow = cell.row;
    const startCol = cell.col + 1;

    values.forEach((value, index) => {
        const targetCell = sheet.getCell(startRow, startCol + index);
        if (value) {
            targetCell.value = value.value;
        }
    });
}

function getRange(sizeRange, startValue, endValue) {
    const startIndex = sizeRange.findIndex(item => item.value === startValue);
    const endIndex = sizeRange.findIndex(item => item.value === endValue);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Invalid start or end value');
    }

    if (endIndex < startIndex) {
        const firstPart = sizeRange.slice(startIndex);
        const secondPart = sizeRange.slice(0, endIndex + 1);
        return [...firstPart, ...secondPart];
    }

    return sizeRange.slice(startIndex, endIndex + 1);
}

const checkInput = (input, searchString) => {
    const values = input.split(",");
    return values.some(value => searchString.startsWith(value));
};

export {
    insertDataInFileExcelSheetUpperCuttingDieSchedule,
}