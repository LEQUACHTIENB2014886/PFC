import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCSocklinerGraphicProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCSocklinerGraphicProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCSocklinerGraphicProcess = async (pfcSocklinerGraphicProcess) => {
    try {
        const res = await axios.post(`${URL}pfcSocklinerGraphicProcess`, pfcSocklinerGraphicProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCSocklinerGraphicProcess = async (pfcSocklinerGraphicProcess) => {
    try {
        const res = await axios.put(`${URL}pfcSocklinerGraphicProcess`, pfcSocklinerGraphicProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCSocklinerGraphicProcess = async (pfcSocklinerGraphicProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcSocklinerGraphicProcess`, {
            data: pfcSocklinerGraphicProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCSocklinerGraphicProcess = async (pfcItemSocklinerGraphicProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemSocklinerGraphicProcess`, pfcItemSocklinerGraphicProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemSocklinerGraphicProcess = async (pfcSocklinerGraphicProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemSocklinerGraphicProcess`, pfcSocklinerGraphicProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemSocklinerGraphicProcess = async (pfcItemSocklinerGraphicProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemSocklinerGraphicProcess`, pfcItemSocklinerGraphicProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemSocklinerGraphicProcess = async (pfcItemSocklinerGraphicProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemSocklinerGraphicProcess`, {
            data: pfcItemSocklinerGraphicProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCSocklinerGraphicProcessByModelID,
    insertPFCSocklinerGraphicProcess,
    deletePFCSocklinerGraphicProcess,
    updatePFCSocklinerGraphicProcess,
    insertItemPFCSocklinerGraphicProcess,
    getPFCItemSocklinerGraphicProcess,
    updatePFCItemSocklinerGraphicProcess,
    deletePFCItemSocklinerGraphicProcess
}