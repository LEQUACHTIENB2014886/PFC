import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCHeelWedgeSpecificationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCHeelWedgeSpecificationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCHeelWedgeSpecification = async (pfcHeelWedgeSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcHeelWedgeSpecification`, pfcHeelWedgeSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCHeelWedgeSpecification = async (pfcHeelWedgeSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcHeelWedgeSpecification`, pfcHeelWedgeSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCHeelWedgeSpecification = async (pfcHeelWedgeSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcHeelWedgeSpecification`, {
            data: pfcHeelWedgeSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCHeelWedgeSpecification = async (pfcItemHeelWedgeSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcItemHeelWedgeSpecification`, pfcItemHeelWedgeSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemHeelWedgeSpecification = async (pfcHeelWedgeSpecification) => {
    try {
        const res = await axios.post(`${URL}getPFCItemHeelWedgeSpecification`, pfcHeelWedgeSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemHeelWedgeSpecification = async (pfcItemHeelWedgeSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcItemHeelWedgeSpecification`, pfcItemHeelWedgeSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemHeelWedgeSpecification = async (pfcItemHeelWedgeSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcItemHeelWedgeSpecification`, {
            data: pfcItemHeelWedgeSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCHeelWedgeSpecificationByModelID,
    insertPFCHeelWedgeSpecification,
    deletePFCHeelWedgeSpecification,
    updatePFCHeelWedgeSpecification,
    insertItemPFCHeelWedgeSpecification,
    getPFCItemHeelWedgeSpecification,
    updatePFCItemHeelWedgeSpecification,
    deletePFCItemHeelWedgeSpecification
}