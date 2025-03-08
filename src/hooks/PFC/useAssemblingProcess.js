import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCAssemblingProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCAssemblingProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCAssemblingProcess = async (pfcAssemblingProcess) => {
    try {
        const res = await axios.post(`${URL}pfcAssemblingProcess`, pfcAssemblingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCAssemblingProcess = async (pfcAssemblingProcess) => {
    try {
        const res = await axios.put(`${URL}pfcAssemblingProcess`, pfcAssemblingProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCAssemblingProcess = async (pfcAssemblingProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcAssemblingProcess`, {
            data: pfcAssemblingProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCAssemblingProcess = async (pfcItemAssemblingProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemAssemblingProcess`, pfcItemAssemblingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemAssemblingProcess = async (pfcAssemblingProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemAssemblingProcess`, pfcAssemblingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemAssemblingProcess = async (pfcItemAssemblingProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemAssemblingProcess`, pfcItemAssemblingProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemAssemblingProcess = async (pfcItemAssemblingProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemAssemblingProcess`, {
            data: pfcItemAssemblingProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCAssemblingProcessByModelID,
    insertPFCAssemblingProcess,
    deletePFCAssemblingProcess,
    updatePFCAssemblingProcess,
    insertItemPFCAssemblingProcess,
    getPFCItemAssemblingProcess,
    updatePFCItemAssemblingProcess,
    deletePFCItemAssemblingProcess
}