import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getDataPageSetup = async (model) => {
    try {
        const res = await axios.post(`${URL}getPFCPageSetup`, model);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
};


const getPageSetup = async (model) => {
    return await axios.post(`${URL}getPFCPageSetup`, model);
};

const insertPFCPageSetup = async (pageSetup) => {
    try {
        const res = await axios.post(`${URL}pfcPageSetup`, pageSetup);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updatePFCPageSetup = async (pageSetup) => {
    try {
        const res = await axios.put(`${URL}pfcPageSetup`, pageSetup);
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCPageSetupByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcPageSetupByModelID`, {
            data: model,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getDataPageSetup,
    insertPFCPageSetup,
    updatePFCPageSetup,
    deletePFCPageSetupByModelID,
    getPageSetup
}