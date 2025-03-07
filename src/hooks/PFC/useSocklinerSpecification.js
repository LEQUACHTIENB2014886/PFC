import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCSocklinerSpecificationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCSocklinerSpecificationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCSocklinerSpecification = async (pfcSocklinerSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcSocklinerSpecification`, pfcSocklinerSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCSocklinerSpecification = async (pfcSocklinerSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcSocklinerSpecification`, pfcSocklinerSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCSocklinerSpecification = async (pfcSocklinerSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcSocklinerSpecification`, {
            data: pfcSocklinerSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCSocklinerSpecification = async (pfcItemSocklinerSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcItemSocklinerSpecification`, pfcItemSocklinerSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemSocklinerSpecification = async (pfcSocklinerSpecification) => {
    try {
        const res = await axios.post(`${URL}getPFCItemSocklinerSpecification`, pfcSocklinerSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemSocklinerSpecification = async (pfcItemSocklinerSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcItemSocklinerSpecification`, pfcItemSocklinerSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemSocklinerSpecification = async (pfcItemSocklinerSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcItemSocklinerSpecification`, {
            data: pfcItemSocklinerSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCSocklinerSpecificationByModelID,
    insertPFCSocklinerSpecification,
    deletePFCSocklinerSpecification,
    updatePFCSocklinerSpecification,
    insertItemPFCSocklinerSpecification,
    getPFCItemSocklinerSpecification,
    updatePFCItemSocklinerSpecification,
    deletePFCItemSocklinerSpecification
}