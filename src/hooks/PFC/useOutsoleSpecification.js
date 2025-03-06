import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCOutsoleSpecificationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCOutsoleSpecificationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCOutsoleSpecification = async (pfcOutsoleSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcOutsoleSpecification`, pfcOutsoleSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCOutsoleSpecification = async (pfcOutsoleSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcOutsoleSpecification`, pfcOutsoleSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCOutsoleSpecification = async (pfcOutsoleSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcOutsoleSpecification`, {
            data: pfcOutsoleSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCOutsoleSpecification = async (pfcItemOutsoleSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcItemOutsoleSpecification`, pfcItemOutsoleSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemOutsoleSpecification = async (pfcOutsoleSpecification) => {
    try {
        const res = await axios.post(`${URL}getPFCItemOutsoleSpecification`, pfcOutsoleSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemOutsoleSpecification = async (pfcItemOutsoleSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcItemOutsoleSpecification`, pfcItemOutsoleSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemOutsoleSpecification = async (pfcItemOutsoleSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcItemOutsoleSpecification`, {
            data: pfcItemOutsoleSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCOutsoleSpecificationByModelID,
    insertPFCOutsoleSpecification,
    deletePFCOutsoleSpecification,
    updatePFCOutsoleSpecification,
    insertItemPFCOutsoleSpecification,
    getPFCItemOutsoleSpecification,
    updatePFCItemOutsoleSpecification,
    deletePFCItemOutsoleSpecification
}