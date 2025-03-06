import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCSecondProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCSecondProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCSecondProcess = async (pfcSecondProcess) => {
    try {
        const res = await axios.post(`${URL}pfcSecondProcess`, pfcSecondProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCSecondProcess = async (pfcSecondProcess) => {
    try {
        const res = await axios.put(`${URL}pfcSecondProcess`, pfcSecondProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCSecondProcess = async (pfcSecondProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcSecondProcess`, {
            data: pfcSecondProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCSecondProcess = async (pfcItemSecondProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemSecondProcess`, pfcItemSecondProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemSecondProcess = async (pfcSecondProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemSecondProcess`, pfcSecondProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemSecondProcess = async (pfcItemSecondProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemSecondProcess`, pfcItemSecondProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemSecondProcess = async (pfcItemSecondProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemSecondProcess`, {
            data: pfcItemSecondProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCSecondProcessByModelID,
    insertPFCSecondProcess,
    deletePFCSecondProcess,
    updatePFCSecondProcess,
    insertItemPFCSecondProcess,
    getPFCItemSecondProcess,
    updatePFCItemSecondProcess,
    deletePFCItemSecondProcess
}