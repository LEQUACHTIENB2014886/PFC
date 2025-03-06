import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const pageIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const SizeRange = ["7G", "6G", "5G", "3G", "2G", "1G"]

const getPFCUpperCuttingDieSchedule = async (model) => {
    try {
        const res = await axios.post(`${URL}getPFCUpperCuttingDieSchedule`, model);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const insertPFCUpperCuttingDieSchedule = async (upperCuttingDieSchedule) => {
    try {
        const res = await axios.post(`${URL}pfcUpperCuttingDieSchedule`, upperCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updatePFCUpperCuttingDieSchedule = async (upperCuttingDieSchedule) => {
    try {
        const res = await axios.put(`${URL}pfcUpperCuttingDieSchedule`, upperCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const uploadFilePFCUpperCuttingDieSchedule = async (formData, model) => {
    try {
        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        console.log(formData.entries().next().value);
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return { res: res.data.data, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const deleteUpperCuttingDieSchedule = async (UpperCuttingDieSchedule) => {
    try {
        const res = await axios.delete(`${URL}pfcUpperCuttingDieSchedule`, {
            data: UpperCuttingDieSchedule,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCItemUpperCuttingDieScheduleByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcItemUpperCuttingDieScheduleByModelID`, {
            data: model,
        });
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const insertNewItemUpperCuttingDieSchedule = async (itemUpperCuttingDieSchedule) => {
    try {
        const res = await axios.post(`${URL}pfcItemUpperCuttingDieSchedule`, itemUpperCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

//=============Page Item Upper Cutting Die Schedule================
const getAllPFCItemUpperCuttingDieSchedule = async (upperCuttingDieSchedule) => {
    try {
        const res = await axios.post(`${URL}getPFCItemUpperCuttingDieSchedule`, upperCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const getAllPFCItemUpperCuttingDieScheduleByModelID = async (model) => {
    try {
        const res = await axios.post(`${URL}getPFCItemUpperCuttingDieScheduleByModelID`, model);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updateItemUpperCuttingDieSchedule = async (itemUpperCuttingDieSchedule) => {
    try {
        const res = await axios.put(`${URL}pfcItemUpperCuttingDieSchedule`, itemUpperCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const deletePFCItemUpperCuttingDieSchedule = async (itemUpperCuttingDieSchedule) => {
    try {
        const res = await axios.delete(`${URL}pfcItemUpperCuttingDieSchedule`, {
            data: itemUpperCuttingDieSchedule,
        });
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}
//=============End Page Item Upper Cutting Die Schedule================

export {
    pageIndex,
    SizeRange,
    getPFCUpperCuttingDieSchedule,
    insertPFCUpperCuttingDieSchedule,
    uploadFilePFCUpperCuttingDieSchedule,
    deleteUpperCuttingDieSchedule,
    insertNewItemUpperCuttingDieSchedule,
    updatePFCUpperCuttingDieSchedule,
    deletePFCItemUpperCuttingDieScheduleByModelID,
    getAllPFCItemUpperCuttingDieSchedule,
    updateItemUpperCuttingDieSchedule,
    deletePFCItemUpperCuttingDieSchedule,
    getAllPFCItemUpperCuttingDieScheduleByModelID
}