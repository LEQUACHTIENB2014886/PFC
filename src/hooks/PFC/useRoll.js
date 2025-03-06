import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const insertPFCRoll = async (roll) => {
    try {
        const res = await axios.post(`${URL}pfcRoll`, roll);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updatePFCRoll = async (roll) => {
    try {
        const res = await axios.put(`${URL}pfcRoll`, roll);
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCRoll = async (roll) => {
    try {
        const res = await axios.delete(`${URL}pfcRoll`, {
            data: roll,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCRollByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcRollByModelID`, {
            data: model,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    insertPFCRoll,
    updatePFCRoll,
    deletePFCRoll,
    deletePFCRollByModelID
}