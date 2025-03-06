import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCOutsolePressingProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCOutsolePressingProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCOutsolePressingProcess = async (pfcOutsolePressingProcess) => {
    try {
        const res = await axios.post(`${URL}pfcOutsolePressingProcess`, pfcOutsolePressingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCOutsolePressingProcess = async (pfcOutsolePressingProcess) => {
    try {
        const res = await axios.put(`${URL}pfcOutsolePressingProcess`, pfcOutsolePressingProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCOutsolePressingProcess = async (pfcOutsolePressingProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcOutsolePressingProcess`, {
            data: pfcOutsolePressingProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCOutsolePressingProcess = async (pfcItemOutsolePressingProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemOutsolePressingProcess`, pfcItemOutsolePressingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemOutsolePressingProcess = async (pfcOutsolePressingProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemOutsolePressingProcess`, pfcOutsolePressingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemOutsolePressingProcess = async (pfcItemOutsolePressingProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemOutsolePressingProcess`, pfcItemOutsolePressingProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemOutsolePressingProcess = async (pfcItemOutsolePressingProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemOutsolePressingProcess`, {
            data: pfcItemOutsolePressingProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCOutsolePressingProcessByModelID,
    insertPFCOutsolePressingProcess,
    deletePFCOutsolePressingProcess,
    updatePFCOutsolePressingProcess,
    insertItemPFCOutsolePressingProcess,
    getPFCItemOutsolePressingProcess,
    updatePFCItemOutsolePressingProcess,
    deletePFCItemOutsolePressingProcess
}