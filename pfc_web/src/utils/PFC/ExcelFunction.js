import ExcelJS from "exceljs";
import { ref } from "vue";
const pathExampleExcelFile = '/uploads/MauPFC.XLSX';
const fileExampleExcel = '/uploads/G35887-CT080J-20H02-ZZ-PFC-31.3.xlsx'
// const fileExampleExcel = '/uploads/Book1.xlsx'
const workbook = ref(null);
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

import { insertDataInFileExcelSheetCover, insertDataSheetCover } from "@/utils/PFC/CoverSheet"
import { insertDataInFileExcelSheetIndex } from "@/utils/PFC/IndexSheet"
import { insertDataInFileExcelSheetLaminationProcess } from "@/utils/PFC/LaminationProcessSheet"
import { insertDataInFileExcelSheetCommonCuttingProcess } from "@/utils/PFC/CommonCuttingProcessSheet"
import { insertDataInFileExcelSheetUpperCuttingDieSchedule } from "@/utils/PFC/UpperCuttingDieScheduleSheet"
import { insertDataInFileExcelSheetPerforationSpecification } from "./PerforationSpecification";
import { insertDataInFileExcelSheetUpperLogoSpecification } from "@/utils/PFC/UpperLogoSpecification"
import { insertDataInFileExcelSheetElasticGoreSpecification } from "./ElasticGoreSpecification";
import { getDataPageSetup, getPageSetup } from "@/hooks/PFC/usePageSetup";

// Load Excel file and process its contents
const loadExampleExcelFile = async (model, pageSetup) => {
    try {
        const response = await fetch(fileExampleExcel);
        if (!response.ok) {
            throw new Error("Failed to fetch the Excel file");
        }

        const arrayBuffer = await response.arrayBuffer();
        workbook.value = new ExcelJS.Workbook();

        await workbook.value.xlsx.load(arrayBuffer);
        await insertData(model, pageSetup);
        // await insertDataTest();

    } catch (error) {
        console.error("Error loading Excel file:", error);
    }
};

const insertDataTest = async () => {
    const sheet = workbook.value.getWorksheet("Test");
    if (!sheet) {
        console.error("Sheet not found!");
        return;
    }
    // Kiểm tra và hợp nhất trước
    sheet.mergeCells('A5:B5');

    // Áp dụng border cho toàn bộ vùng đã gộp
    const mergedCell = sheet.getCell('A5');
    mergedCell.border = {
        top: { style: 'double', color: { argb: 'FF00FF00' } },
        left: { style: 'double', color: { argb: 'FF00FF00' } },
        bottom: { style: 'double', color: { argb: 'FF00FF00' } },
        right: { style: 'double', color: { argb: 'FF00FF00' } }
    };
}

const insertData = async (model, pageSetup) => {
    const sheetCover = workbook.value.getWorksheet("Cover");
    if (!sheetCover) {
        console.error("Sheet not found!");
        return;
    }
    await insertDataInFileExcelSheetCover(sheetCover, model, pageSetup)

    // const sheetIndex = workbook.value.getWorksheet("Index");
    // if (!sheetIndex) {
    //     console.error("Sheet not found!");
    //     return;
    // }
    // await insertDataInFileExcelSheetIndex(sheetIndex, model, pageSetup)
    // await setupPrintFile(sheetIndex)
    // sheetIndex.pageSetup.printArea = "A1:BN38";

    const sheetLaminationProcess = workbook.value.getWorksheet("Lamination Process");
    if (sheetLaminationProcess) {
        await insertDataInFileExcelSheetLaminationProcess(sheetLaminationProcess, model, pageSetup)
    }

    // const sheetCommonCuttingProcess = workbook.value.getWorksheet("Common cutting process");
    // if (!sheetCommonCuttingProcess) {
    //     console.error("Sheet not found!");
    //     return;
    // }
    // await insertDataInFileExcelSheetCommonCuttingProcess(sheetCommonCuttingProcess, model)
    // await setupPrintFile(sheetCommonCuttingProcess)
    // sheetCommonCuttingProcess.pageSetup.printArea = "A1:BN22";

    const sheetUpperCuttingDieSchedule = workbook.value.getWorksheet("Upper Cutting Die Schedule");
    if (!sheetUpperCuttingDieSchedule) {
        console.error("Sheet not found!");
        return;
    }
    await insertDataInFileExcelSheetUpperCuttingDieSchedule(sheetUpperCuttingDieSchedule, model, pageSetup)

    const sheetPerforationSpecification = workbook.value.getWorksheet("Perforation Specification");
    if (sheetPerforationSpecification) {
        await insertDataInFileExcelSheetPerforationSpecification(sheetPerforationSpecification, model, pageSetup)
    }

    const sheetUpperLogoSpecification = workbook.value.getWorksheet("Upper Logo Specification");
    if (sheetUpperLogoSpecification) {
        await insertDataInFileExcelSheetUpperLogoSpecification(sheetUpperLogoSpecification, model, pageSetup)
    }

    const sheetElasticGoreSpecification = workbook.value.getWorksheet("Elastic gore Specification");
    if (sheetElasticGoreSpecification) {
        await insertDataInFileExcelSheetElasticGoreSpecification(sheetElasticGoreSpecification, model, pageSetup)
    }
}

// Fetch image as buffer
const fetchImageAsBuffer = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.arrayBuffer();
    } catch (error) {
        console.error("Failed to fetch image:", error);
        return null;
    }
};

// Insert an image into the Excel file
const insertImageIntoFileExcel = async (imageUrl, cell, sheet, rowNumber, colNumber, width, height) => {
    try {
        const imageBuffer = await fetchImageAsBuffer(imageUrl);
        if (imageBuffer) {
            const imageId = workbook.value.addImage({
                buffer: imageBuffer,
                extension: "png",
            });
            cell.value = "";

            const mergedCellRange = sheet.getCell(rowNumber, colNumber).merge;
            if (mergedCellRange) {
                sheet.addImage(imageId, {
                    tl: { col: colNumber - 0.5, row: rowNumber - 0.8 },
                    ext: { width, height },
                    offsets: { x: 0, y: 0 },
                });
            } else {
                console.warn("Cell is not merged.");
            }
        } else {
            console.error("Failed to fetch image from URL.");
        }
    } catch (error) {
        console.error("Error inserting image:", error);
    }
};

const insertImageFileExcel = async (sheet, imageUrl, cellStart, cellEnd) => {
    try {
        const imageBuffer = await fetchImageAsBuffer(imageUrl);
        if (imageBuffer) {
            const imageId = workbook.value.addImage({
                buffer: imageBuffer,
                extension: "png",
            });
            cellStart.value = "";

            sheet.addImage(imageId, {
                tl: { col: cellStart.col - 0.2, row: cellStart.row - 0.8 },
                br: { col: cellEnd.col, row: cellEnd.row }
            });
        } else {
            console.error("Failed to fetch image from URL.");
        }
    } catch (error) {
        console.error("Error inserting image:", error);
    }
};

// Export the Excel file
const exportToExcel = async () => {
    if (!workbook.value) {
        console.log("No workbook loaded.");
        return;
    }

    try {
        const buffer = await workbook.value.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Use a modern and tested method for downloading
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // Fallback for IE
            window.navigator.msSaveOrOpenBlob(blob, "Exported-PFCModel.xlsx");
        } else {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "Exported-PFCModel.xlsx";
            document.body.appendChild(link); // Append to DOM for Firefox compatibility
            link.click();
            document.body.removeChild(link); // Clean up after download
        }
    } catch (error) {
        console.error("Error during export:", error);
    }
};

const loadFileExcel = async (sheetName) => {
    try {
        console.log(`/uploads/PFC-${sheetName}.xlsx`)
        const response = await fetch(`/uploads/PFC-${sheetName}.xlsx`);
        if (!response.ok) {
            throw new Error("Failed to fetch the Excel file");
        }

        const arrayBuffer = await response.arrayBuffer();
        workbook.value = new ExcelJS.Workbook();
        await workbook.value.xlsx.load(arrayBuffer);

    } catch (error) {
        console.error("Error loading Excel file:", error);
    }
}

const exportThisExcel = async (sheetName) => {
    if (!workbook.value) {
        console.log("No workbook loaded.");
        return;
    }

    try {
        const buffer = await workbook.value.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `PFC-${sheetName}.xlsx`);
        } else {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `PFC-${sheetName}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error("Error during export:", error);
    }
};

const isEmptyString = (value) => {
    return !value || value.trim() === "";
}


const isValueInOptionIDS = (value, options) => {
    return options.some(option => option.value === value);
};

const extractValue = (value) => {
    const match = value.match(/\{\{(.+?)\}\}/);
    return match ? match[1] : null;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/ /g, '-');
};

const getURLImage = (fileName, model) => {
    return fileName ? `${URL}downloadFilePFCModelFromFolderPFCModel?filename=${fileName}&ModelName=${model.ModelType}_${model.ModelName}_${model.MaterialNumber}` : ''
}

const setupPrintFile = async (sheet) => {
    sheet.pageSetup = {
        paperSize: 9, // A4 (8.27 x 11.69 inches)
        orientation: "landscape",
        margins: {
            left: 0.1,
            right: 0.1,
            top: 0.5,
            bottom: 0.3,
            header: 0.1,
            footer: 0.1,
        },
        fitToPage: true,
        horizontalCentered: true,
        verticalCentered: false,
    };
}

const isMerged = (sheet, address) => {
    return sheet.model.merges.some((mergeRange) => mergeRange.includes(address));
};

const copyPageInSameSheet = (sheet, range, numberOfPages) => {
    const [startCol, startRow, endCol, endRow] = range;
    const rowCount = endRow - startRow + 1;
    const mergedCells = [];
    let lastCopiedRow = startRow;

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

    for (let pageIndex = 0; pageIndex < numberOfPages; pageIndex++) {
        const startTargetRow = pageIndex * rowCount + 1;
        const endTargetRow = startTargetRow + rowCount - 1;
        lastCopiedRow = endTargetRow;

        for (let row = startTargetRow; row <= endTargetRow; row++) {
            sheet.getRow(row);
        }

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

            const targetMergeRange = `${targetMergeStart}:${targetMergeEnd}`;

            if (!sheet.model.merges.includes(targetMergeRange)) {
                sheet.mergeCells(targetMergeRange);
            }
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
                const sourceCell = sheet.getRow(row).getCell(col);
                const targetCell = sheet.getRow(row - startRow + startTargetRow).getCell(col);

                targetCell.value = sourceCell.value;

                if (sourceCell.formula) {
                    targetCell.value = { formula: sourceCell.formula };
                }
                if (sourceCell.style) {
                    targetCell.style = { ...sourceCell.style };
                }
            }
        }

        if (pageIndex < numberOfPages - 1) {
            sheet.getRow(endTargetRow).addPageBreak();
        }
    }

    const printStartCell = sheet.getCell(startRow, startCol);
    const printEndCell = sheet.getCell(endRow * numberOfPages, endCol);
    sheet.pageSetup.printArea = `${printStartCell.address}:${printEndCell.address}`;
};

function getCellValue(sheet, range, pageIndex, targetCellAddress) {
    const [startCol, startRow, endCol, endRow] = range;
    const rowCount = endRow - startRow + 1;

    const sourceCell = sheet.getCell(targetCellAddress);
    if (!sourceCell) {
        console.error(`Cell ${targetCellAddress} does not exist!`);
        return null;
    }

    const row = sourceCell.row;
    const col = sourceCell.col;

    const newRow = pageIndex * rowCount + (row - startRow + 1);
    const newCol = col;

    const targetCell = sheet.getCell(newRow, newCol);

    return targetCell;
}

const exportExcel = async (sheetName, pfcModel) => {
    const res = await getPageSetup(pfcModel)
    if (!res && !res.data.data) {
        return;
    }
    let pageSetup = res.data.data;

    switch (sheetName) {
        case "Cover":
            const sheetCover = workbook.value.getWorksheet("Cover");
            if (sheetCover) {
                await insertDataSheetCover(sheetCover, pfcModel);
            }
            await exportThisExcel(sheetName)
        default:
            return;
    }
}

const getFormData = async (imageUrl, fileName) => {
    if (!imageUrl || !fileName) {
        return;
    }
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File([blob], fileName, { type: blob.type });

    return file;
}

function safeJsonParse(data, defaultValue) {
    try {
        return data ? JSON.parse(data.toString()) : defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

const getBlobMedial = async (ref, fileName) => {
    const blobMedial = await ref.value.getExportedImageBlob();

    return new File(
        [blobMedial],
        fileName,
        { type: 'image/png' }
    );
}

export {
    loadExampleExcelFile,
    exportToExcel,
    insertImageIntoFileExcel,
    isEmptyString,
    formatDate,
    isValueInOptionIDS,
    extractValue,
    getURLImage,
    copyPageInSameSheet,
    getCellValue,
    loadFileExcel,
    exportExcel,
    insertImageFileExcel,
    getFormData,
    safeJsonParse,
    getBlobMedial
}