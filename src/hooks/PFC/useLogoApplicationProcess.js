import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCLogoApplicationProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCLogoApplicationProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCLogoApplicationProcess = async (pfcLogoApplicationProcess) => {
    try {
        const res = await axios.post(`${URL}pfcLogoApplicationProcess`, pfcLogoApplicationProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCLogoApplicationProcess = async (pfcLogoApplicationProcess) => {
    try {
        const res = await axios.put(`${URL}pfcLogoApplicationProcess`, pfcLogoApplicationProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCLogoApplicationProcess = async (pfcLogoApplicationProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcLogoApplicationProcess`, {
            data: pfcLogoApplicationProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCLogoApplicationProcess = async (pfcItemLogoApplicationProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemLogoApplicationProcess`, pfcItemLogoApplicationProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemLogoApplicationProcess = async (pfcLogoApplicationProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemLogoApplicationProcess`, pfcLogoApplicationProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemLogoApplicationProcess = async (pfcItemLogoApplicationProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemLogoApplicationProcess`, pfcItemLogoApplicationProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemLogoApplicationProcess = async (pfcItemLogoApplicationProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemLogoApplicationProcess`, {
            data: pfcItemLogoApplicationProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCLogoApplicationProcessByModelID,
    insertPFCLogoApplicationProcess,
    deletePFCLogoApplicationProcess,
    updatePFCLogoApplicationProcess,
    insertItemPFCLogoApplicationProcess,
    getPFCItemLogoApplicationProcess,
    updatePFCItemLogoApplicationProcess,
    deletePFCItemLogoApplicationProcess
}