import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCBottomCuttingDieScheduleByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCBottomCuttingDieScheduleByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCBottomCuttingDieSchedule = async (pfcBottomCuttingDieSchedule) => {
    try {
        const res = await axios.post(`${URL}pfcBottomCuttingDieSchedule`, pfcBottomCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCBottomCuttingDieSchedule = async (pfcBottomCuttingDieSchedule) => {
    try {
        const res = await axios.put(`${URL}pfcBottomCuttingDieSchedule`, pfcBottomCuttingDieSchedule);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCBottomCuttingDieSchedule = async (pfcBottomCuttingDieSchedule) => {
    try {
        const res = await axios.delete(`${URL}pfcBottomCuttingDieSchedule`, {
            data: pfcBottomCuttingDieSchedule,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCBottomCuttingDieSchedule = async (pfcItemBottomCuttingDieSchedule) => {
    try {
        const res = await axios.post(`${URL}pfcItemBottomCuttingDieSchedule`, pfcItemBottomCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemBottomCuttingDieSchedule = async (pfcBottomCuttingDieSchedule) => {
    try {
        const res = await axios.post(`${URL}getPFCItemBottomCuttingDieSchedule`, pfcBottomCuttingDieSchedule);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemBottomCuttingDieSchedule = async (pfcItemBottomCuttingDieSchedule) => {
    try {
        const res = await axios.put(`${URL}pfcItemBottomCuttingDieSchedule`, pfcItemBottomCuttingDieSchedule);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemBottomCuttingDieSchedule = async (pfcItemBottomCuttingDieSchedule) => {
    try {
        const res = await axios.delete(`${URL}pfcItemBottomCuttingDieSchedule`, {
            data: pfcItemBottomCuttingDieSchedule,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCBottomCuttingDieScheduleByModelID,
    insertPFCBottomCuttingDieSchedule,
    deletePFCBottomCuttingDieSchedule,
    updatePFCBottomCuttingDieSchedule,
    insertItemPFCBottomCuttingDieSchedule,
    getPFCItemBottomCuttingDieSchedule,
    updatePFCItemBottomCuttingDieSchedule,
    deletePFCItemBottomCuttingDieSchedule
}