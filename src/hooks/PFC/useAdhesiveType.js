import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const insertPFCAdhesiveType = async (adhesiveType) => {
    try {
        const res = await axios.post(`${URL}pfcAdhesiveType`, adhesiveType);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updatePFCAdhesiveType = async (adhesiveType) => {
    try {
        const res = await axios.put(`${URL}pfcAdhesiveType`, adhesiveType);
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCAdhesiveType = async (adhesiveType) => {
    try {
        const res = await axios.delete(`${URL}pfcAdhesiveType`, {
            data: adhesiveType,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCAdhesiveTypeByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcAdhesiveTypeByModelID`, {
            data: model,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    insertPFCAdhesiveType,
    updatePFCAdhesiveType,
    deletePFCAdhesiveType,
    deletePFCAdhesiveTypeByModelID
}