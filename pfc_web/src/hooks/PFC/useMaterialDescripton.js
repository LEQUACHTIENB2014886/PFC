import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const insertPFCMaterialDescription = async (materialDescription) => {
    try {
        const res = await axios.post(`${URL}pfcMaterialDescription`, materialDescription);
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const updatePFCMaterialDescription = async (materialDescription) => {
    try {
        const res = await axios.put(`${URL}pfcMaterialDescription`, materialDescription);
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCMaterialDescription = async (materialDescription) => {
    try {
        const res = await axios.delete(`${URL}pfcMaterialDescription`, {
            data: materialDescription,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

const deletePFCMaterialDescriptionByModelID = async (model) => {
    try {
        const res = await axios.delete(`${URL}pfcMaterialDescriptionByModelID`, {
            data: model,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    insertPFCMaterialDescription,
    updatePFCMaterialDescription,
    deletePFCMaterialDescription,
    deletePFCMaterialDescriptionByModelID
}