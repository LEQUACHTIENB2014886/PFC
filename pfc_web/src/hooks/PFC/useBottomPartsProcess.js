import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCBottomPartsProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCBottomPartsProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCBottomPartsProcess = async (pfcBottomPartsProcess) => {
    try {
        const res = await axios.post(`${URL}pfcBottomPartsProcess`, pfcBottomPartsProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCBottomPartsProcess = async (pfcBottomPartsProcess) => {
    try {
        const res = await axios.put(`${URL}pfcBottomPartsProcess`, pfcBottomPartsProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCBottomPartsProcess = async (pfcBottomPartsProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcBottomPartsProcess`, {
            data: pfcBottomPartsProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCBottomPartsProcess = async (pfcItemBottomPartsProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemBottomPartsProcess`, pfcItemBottomPartsProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemBottomPartsProcess = async (pfcBottomPartsProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemBottomPartsProcess`, pfcBottomPartsProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemBottomPartsProcess = async (pfcItemBottomPartsProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemBottomPartsProcess`, pfcItemBottomPartsProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemBottomPartsProcess = async (pfcItemBottomPartsProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemBottomPartsProcess`, {
            data: pfcItemBottomPartsProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCBottomPartsProcessByModelID,
    insertPFCBottomPartsProcess,
    deletePFCBottomPartsProcess,
    updatePFCBottomPartsProcess,
    insertItemPFCBottomPartsProcess,
    getPFCItemBottomPartsProcess,
    updatePFCItemBottomPartsProcess,
    deletePFCItemBottomPartsProcess
}