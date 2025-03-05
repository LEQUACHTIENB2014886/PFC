import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCBottomSilkScreenProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCBottomSilkScreenProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCBottomSilkScreenProcess = async (pfcBottomSilkScreenProcess) => {
    try {
        const res = await axios.post(`${URL}pfcBottomSilkScreenProcess`, pfcBottomSilkScreenProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCBottomSilkScreenProcess = async (pfcBottomSilkScreenProcess) => {
    try {
        const res = await axios.put(`${URL}pfcBottomSilkScreenProcess`, pfcBottomSilkScreenProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCBottomSilkScreenProcess = async (pfcBottomSilkScreenProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcBottomSilkScreenProcess`, {
            data: pfcBottomSilkScreenProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCBottomSilkScreenProcess = async (pfcItemBottomSilkScreenProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemBottomSilkScreenProcess`, pfcItemBottomSilkScreenProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemBottomSilkScreenProcess = async (pfcBottomSilkScreenProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemBottomSilkScreenProcess`, pfcBottomSilkScreenProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemBottomSilkScreenProcess = async (pfcItemBottomSilkScreenProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemBottomSilkScreenProcess`, pfcItemBottomSilkScreenProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemBottomSilkScreenProcess = async (pfcItemBottomSilkScreenProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemBottomSilkScreenProcess`, {
            data: pfcItemBottomSilkScreenProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCBottomSilkScreenProcessByModelID,
    insertPFCBottomSilkScreenProcess,
    deletePFCBottomSilkScreenProcess,
    updatePFCBottomSilkScreenProcess,
    insertItemPFCBottomSilkScreenProcess,
    getPFCItemBottomSilkScreenProcess,
    updatePFCItemBottomSilkScreenProcess,
    deletePFCItemBottomSilkScreenProcess
}