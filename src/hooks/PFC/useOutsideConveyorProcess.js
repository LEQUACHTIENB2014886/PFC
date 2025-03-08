import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCOutsideConveyorProcessByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCOutsideConveyorProcessByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCOutsideConveyorProcess = async (pfcOutsideConveyorProcess) => {
    try {
        const res = await axios.post(`${URL}pfcOutsideConveyorProcess`, pfcOutsideConveyorProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCOutsideConveyorProcess = async (pfcOutsideConveyorProcess) => {
    try {
        const res = await axios.put(`${URL}pfcOutsideConveyorProcess`, pfcOutsideConveyorProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCOutsideConveyorProcess = async (pfcOutsideConveyorProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcOutsideConveyorProcess`, {
            data: pfcOutsideConveyorProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCOutsideConveyorProcess = async (pfcItemOutsideConveyorProcess) => {
    try {
        const res = await axios.post(`${URL}pfcItemOutsideConveyorProcess`, pfcItemOutsideConveyorProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemOutsideConveyorProcess = async (pfcOutsideConveyorProcess) => {
    try {
        const res = await axios.post(`${URL}getPFCItemOutsideConveyorProcess`, pfcOutsideConveyorProcess);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemOutsideConveyorProcess = async (pfcItemOutsideConveyorProcess) => {
    try {
        const res = await axios.put(`${URL}pfcItemOutsideConveyorProcess`, pfcItemOutsideConveyorProcess);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemOutsideConveyorProcess = async (pfcItemOutsideConveyorProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcItemOutsideConveyorProcess`, {
            data: pfcItemOutsideConveyorProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCOutsideConveyorProcessByModelID,
    insertPFCOutsideConveyorProcess,
    deletePFCOutsideConveyorProcess,
    updatePFCOutsideConveyorProcess,
    insertItemPFCOutsideConveyorProcess,
    getPFCItemOutsideConveyorProcess,
    updatePFCItemOutsideConveyorProcess,
    deletePFCItemOutsideConveyorProcess
}