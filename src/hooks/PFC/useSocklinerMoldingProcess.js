import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCSocklinerMoldingProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCSocklinerMoldingProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCSocklinerMoldingProcess = async (pfcSocklinerMoldingProcess) => {
    try {
        const res = await axios.post(`${URL}pfcSocklinerMoldingProcess`, pfcSocklinerMoldingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCSocklinerMoldingProcess = async (pfcSocklinerMoldingProcess) => {
    try {
        const res = await axios.put(`${URL}pfcSocklinerMoldingProcess`, pfcSocklinerMoldingProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCSocklinerMoldingProcess = async (pfcSocklinerMoldingProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcSocklinerMoldingProcess`, {
            data: pfcSocklinerMoldingProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCSocklinerMoldingProcess = async (pfcItemSocklinerMoldingProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemSocklinerMoldingProcess`, pfcItemSocklinerMoldingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemSocklinerMoldingProcess = async (pfcSocklinerMoldingProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemSocklinerMoldingProcess`, pfcSocklinerMoldingProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemSocklinerMoldingProcess = async (pfcItemSocklinerMoldingProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemSocklinerMoldingProcess`, pfcItemSocklinerMoldingProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemSocklinerMoldingProcess = async (pfcItemSocklinerMoldingProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemSocklinerMoldingProcess`, {
            data: pfcItemSocklinerMoldingProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCSocklinerMoldingProcessByModelID,
    insertPFCSocklinerMoldingProcess,
    deletePFCSocklinerMoldingProcess,
    updatePFCSocklinerMoldingProcess,
    insertItemPFCSocklinerMoldingProcess,
    getPFCItemSocklinerMoldingProcess,
    updatePFCItemSocklinerMoldingProcess,
    deletePFCItemSocklinerMoldingProcess
}