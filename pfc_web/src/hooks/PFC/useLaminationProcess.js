import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getDataLaminationProcess = async (model) => {
    try {
        const res = await axios.post(`${URL}getPFCLaminationProcess`, model);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
};

const insertPFCLaminationProcess = async (laminationProcess) => {
    try {
        const res = await axios.post(`${URL}pfcLaminationProcess`, laminationProcess);
        return { res: res.data.data, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const updatePFCLaminationProcess = async (laminationProcess) => {
    try {
        const res = await axios.put(`${URL}pfcLaminationProcess`, laminationProcess);
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCLaminationProcess = async (laminationProcess) => {
    try {
        const res = await axios.delete(`${URL}pfcLaminationProcess`, {
            data: laminationProcess,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCLaminationProcessByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcLaminationProcessByModelID`, {
            data: model,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getDataLaminationProcess,
    insertPFCLaminationProcess,
    updatePFCLaminationProcess,
    deletePFCLaminationProcess,
    deletePFCLaminationProcessByModelID
};
