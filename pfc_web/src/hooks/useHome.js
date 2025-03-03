import ExcelJS from "exceljs";
import { ref } from "vue";
import axios from 'axios';
import { safeJsonParse } from "@/utils/PFC/ExcelFunction";

const pathExampleExcelFile = '/uploads/Mau-PFC.xlsx';
const workbook = ref(null);
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;
const pfcModels = ref([])

const optionIDS = [
    { value: '10T', label: '10T' },
    { value: '11', label: '11' },
    { value: '11T', label: '11T' },
    { value: '12', label: '12' },
    { value: '12T', label: '12T' },
    { value: '13', label: '13' },
    { value: '13T', label: '13T' },
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
    { value: '6', label: '6' }
]


// Load Excel file and process its contents
const loadExampleExcelFile = async (model) => {
    try {
        const response = await fetch(pathExampleExcelFile);
        if (!response.ok) {
            throw new Error("Failed to fetch the Excel file");
        }

        const arrayBuffer = await response.arrayBuffer();
        workbook.value = new ExcelJS.Workbook();

        await workbook.value.xlsx.load(arrayBuffer);

        const sheetCover = workbook.value.getWorksheet("Cover");
        const sheetIndex = workbook.value.getWorksheet("Index");
        if (!sheetCover || !sheetIndex) {
            console.log("Sheet not found!");
            return;
        }

        await insertDataInFileExcel(
            sheetCover,
            sheetIndex,
            model,
        );
    } catch (error) {
        console.error("Error loading Excel file:", error);
    }
};

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

// Insert model data into the Excel file
const insertDataInFileExcel = async (
    sheetCover,
    sheetIndex,
    model,
) => {
    const promises = [];

    sheetCover.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            const promise = insertModelIntoFileExcel(cell, sheetCover, colNumber, rowNumber, model);
            if (promise) {
                promises.push(promise);
            }
        });
    });

    sheetIndex.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            const promise = insertModelIntoFileExcel(cell, sheetIndex, colNumber, rowNumber, model);
            if (promise) {
                promises.push(promise);
            }
        });
    });

    // Wait for all promises (including image insertions) to complete
    await Promise.all(promises);
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

// Insert model data into the specific Excel cell
const insertModelIntoFileExcel = (cell, sheet, colNumber, rowNumber, model) => {
    cell.numFmt = "@";
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
    };

    // Check for model value mappings and insert accordingly
    if (valueMappings[cell.value]) {
        cell.value = valueMappings[cell.value];
    } else if (isValueInOptionIDS(cell.value, adjustedOptionIDS)) {
        cell.value = extractValue(cell.value);
        if (cell.value === model.IDS) {
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
    } else if (cell.value === "{{MedialSideView}}") {
        cell.value = "";
        if (model.MedialSideView) {
            return insertImageIntoFileExcel(getURLImage(model.MedialSideView, model), cell, sheet, rowNumber, colNumber, 290, 150);
        }

    } else if (cell.value === "{{FrontView}}") {
        cell.value = "";
        if (model.FrontView) {
            return insertImageIntoFileExcel(getURLImage(model.FrontView, model), cell, sheet, rowNumber, colNumber, 195, 260);
        }

    } else if (cell.value === "{{LateralSideView}}") {
        cell.value = "";
        if (model.LateralSideView) {
            return insertImageIntoFileExcel(getURLImage(model.LateralSideView, model), cell, sheet, rowNumber, colNumber, 280, 145);
        }

    } else if (cell.value === "{{HeelView}}") {
        cell.value = "";
        if (model.HeelView) {
            return insertImageIntoFileExcel(getURLImage(model.HeelView, model), cell, sheet, rowNumber, colNumber, 190, 270);
        }

    } else if (cell.value === "{{BottomView}}") {
        cell.value = "";
        if (model.BottomView) {
            return insertImageIntoFileExcel(getURLImage(model.BottomView, model), cell, sheet, rowNumber, colNumber, 280, 175);
        }
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
                    tl: { col: colNumber - 0.5, row: rowNumber - 0.5 },
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

const getAllPFCModel = async () => {
    try {
        const res = await axios.get(`${URL}pfcModel`);
        pfcModels.value = res.data.data
    } catch (e) {
        console.error(e);
    }
};

const insertNewPFCModel = async (model) => {
    try {
        const res = await axios.post(`${URL}pfcModel`, model);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e.Error() };
    }
}

const deletePFCModel = async (model) => {
    await deleteModelDirectory(model)

    const res = await axios.delete(`${URL}pfcModel`, {
        data: model,
    });

    return res;
}

const getURLImage = (fileName, model) => {
    return fileName ? `${URL}downloadFilePFCModelFromFolderPFCModel?filename=${fileName}&ModelName=${model.ModelType}_${model.ModelName}_${model.MaterialNumber}` : ''
}

const updatePFCModel = async (model) => {
    try {
        const res = await axios.put(`${URL}pfcModel`, model);
        return { res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deleteFilePFCModelFromFolderPFCModel = async (fileName, model) => {
    try {
        const res = await axios.delete(`${URL}deleteFilePFCModelFromFolderPFCModel`, {
            params: {
                filename: fileName,
                ModelName: `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`,
            },
        });
        return { res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deleteModelDirectory = async (model) => {
    try {
        const res = await axios.delete(`${URL}deleteModelDirectory`, {
            params: {
                ModelName: `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`,
            },
        });
        return { res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const uploadFormDataMedialSideView = async (formData, model, oldModel) => {
    try {
        if (oldModel.MedialSideView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.MedialSideView, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        model.MedialSideView = res.data.data
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const uploadFormDataMedialSideViewV1 = async (formData, model, oldModel) => {
    try {
        let medialSideView = safeJsonParse(oldModel.MedialSideViewV1, {})
        if (medialSideView.url) {
            await deleteFilePFCModelFromFolderPFCModel(medialSideView.url, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res;
    } catch (e) {
        console.error(e);
    }
}

const uploadFormDataLateralSideViewV1 = async (formData, model, oldModel) => {
    try {
        let lateralSideView = safeJsonParse(oldModel.LateralSideViewV1, {})
        if (lateralSideView.url) {
            await deleteFilePFCModelFromFolderPFCModel(lateralSideView.url, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (e) {
        console.error(e);
    }
}

const uploadFormDataFrontViewV1 = async (formData, model, oldModel) => {
    try {
        let frontView = safeJsonParse(oldModel.FrontViewV1, {})
        if (frontView.url) {
            await deleteFilePFCModelFromFolderPFCModel(frontView.url, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (e) {

    }
}

const uploadFormDataFrontView = async (formData, model, oldModel) => {
    try {
        if (oldModel.FrontView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.FrontView, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        model.FrontView = res.data.data
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const uploadFormDataBottomViewV1 = async (formData, model, oldModel) => {
    try {
        let bottomView = safeJsonParse(oldModel.BottomViewV1, {})
        if (bottomView.url) {
            await deleteFilePFCModelFromFolderPFCModel(bottomView.url, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (e) {
        console.error(e);
    }
}

const uploadFormDataHeelViewV1 = async (formData, model, oldModel) => {
    try {
        let heelView = safeJsonParse(oldModel.HeelViewV1, {})
        if (heelView.url) {
            await deleteFilePFCModelFromFolderPFCModel(heelView.url, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (e) {
        console.error(e);
    }
}


const uploadFormDataLateralSideView = async (formData, model, oldModel) => {
    try {
        if (oldModel.LateralSideView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.LateralSideView, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        model.LateralSideView = res.data.data
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const uploadFormDataBottomView = async (formData, model, oldModel) => {
    try {
        if (oldModel.BottomView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.BottomView, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        model.BottomView = res.data.data
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const uploadFormDataHeelView = async (formData, model, oldModel) => {
    try {
        if (oldModel.HeelView) {
            await deleteFilePFCModelFromFolderPFCModel(oldModel.HeelView, oldModel)
        }

        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        model.HeelView = res.data.data
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/ /g, '-');
};

function hexToARGB(hex) {
    hex = hex.replace("#", "");
    return `FF${hex.toUpperCase()}`;
}

const adjustedOptionIDS = optionIDS.map(option => ({
    value: `{{${option.value}}}`,
    label: option.label
}))

const isValueInOptionIDS = (value, options) => {
    return options.some(option => option.value === value);
};

const extractValue = (value) => {
    const match = value.match(/\{\{(.+?)\}\}/);
    return match ? match[1] : null;
};

const isEmptyString = (value) => {
    return !value || value.trim() === "";
}

export {
    pfcModels,
    workbook,
    loadExampleExcelFile,
    exportToExcel,
    getAllPFCModel,
    insertNewPFCModel,
    updatePFCModel,
    deletePFCModel,
    getURLImage,
    uploadFormDataMedialSideView,
    uploadFormDataLateralSideView,
    uploadFormDataFrontView,
    uploadFormDataBottomView,
    uploadFormDataHeelView,
    uploadFormDataMedialSideViewV1,
    uploadFormDataLateralSideViewV1,
    uploadFormDataFrontViewV1,
    uploadFormDataBottomViewV1,
    uploadFormDataHeelViewV1,
};
