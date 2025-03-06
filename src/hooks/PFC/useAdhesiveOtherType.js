import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const insertPFCAdhesiveOtherType = async (adhesiveOtherType) => {
    try {
        const res = await axios.post(`${URL}pfcAdhesiveOtherType`, adhesiveOtherType);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updatePFCAdhesiveOtherType = async (adhesiveOtherType) => {
    try {
        const res = await axios.put(`${URL}pfcAdhesiveOtherType`, adhesiveOtherType);
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCAdhesiveOtherType = async (adhesiveOtherType) => {
    try {
        const res = await axios.delete(`${URL}pfcAdhesiveOtherType`, {
            data: adhesiveOtherType,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCAdhesiveOtherTypeByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcAdhesiveOtherTypeByModelID`, {
            data: model,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    insertPFCAdhesiveOtherType,
    updatePFCAdhesiveOtherType,
    deletePFCAdhesiveOtherType,
    deletePFCAdhesiveOtherTypeByModelID
}