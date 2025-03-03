import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCComputerStitchingScheduleByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCComputerStitchingScheduleByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCComputerStitchingSchedule = async (pfcComputerStitchingSchedule) => {
    try {
        const res = await axios.post(`${URL}pfcComputerStitchingSchedule`, pfcComputerStitchingSchedule);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCComputerStitchingSchedule = async (pfcComputerStitchingSchedule) => {
    try {
        const res = await axios.put(`${URL}pfcComputerStitchingSchedule`, pfcComputerStitchingSchedule);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCComputerStitchingSchedule = async (pfcComputerStitchingSchedule) => {
    try {
        const res = await axios.delete(`${URL}pfcComputerStitchingSchedule`, {
            data: pfcComputerStitchingSchedule,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCComputerStitchingSchedule = async (pfcItemComputerStitchingSchedule) => {
    try {
        const res = await axios.post(`${URL}pfcItemComputerStitchingSchedule`, pfcItemComputerStitchingSchedule);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemComputerStitchingSchedule = async (pfcComputerStitchingSchedule) => {
    try {
        const res = await axios.post(`${URL}getPFCItemComputerStitchingSchedule`, pfcComputerStitchingSchedule);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemComputerStitchingSchedule = async (pfcItemComputerStitchingSchedule) => {
    try {
        const res = await axios.put(`${URL}pfcItemComputerStitchingSchedule`, pfcItemComputerStitchingSchedule);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemComputerStitchingSchedule = async (pfcItemComputerStitchingSchedule) => {
    try {
        const res = await axios.delete(`${URL}pfcItemComputerStitchingSchedule`, {
            data: pfcItemComputerStitchingSchedule,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCComputerStitchingScheduleByModelID,
    insertPFCComputerStitchingSchedule,
    deletePFCComputerStitchingSchedule,
    updatePFCComputerStitchingSchedule,
    insertItemPFCComputerStitchingSchedule,
    getPFCItemComputerStitchingSchedule,
    updatePFCItemComputerStitchingSchedule,
    deletePFCItemComputerStitchingSchedule
}