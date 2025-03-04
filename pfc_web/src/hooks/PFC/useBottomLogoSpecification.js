import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCBottomLogoSpecificationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCBottomLogoSpecificationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCBottomLogoSpecification = async (pfcBottomLogoSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcBottomLogoSpecification`, pfcBottomLogoSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCBottomLogoSpecification = async (pfcBottomLogoSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcBottomLogoSpecification`, pfcBottomLogoSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCBottomLogoSpecification = async (pfcBottomLogoSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcBottomLogoSpecification`, {
            data: pfcBottomLogoSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCBottomLogoSpecification = async (pfcItemBottomLogoSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcItemBottomLogoSpecification`, pfcItemBottomLogoSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemBottomLogoSpecification = async (pfcBottomLogoSpecification) => {
    try {
        const res = await axios.post(`${URL}getPFCItemBottomLogoSpecification`, pfcBottomLogoSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemBottomLogoSpecification = async (pfcItemBottomLogoSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcItemBottomLogoSpecification`, pfcItemBottomLogoSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemBottomLogoSpecification = async (pfcItemBottomLogoSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcItemBottomLogoSpecification`, {
            data: pfcItemBottomLogoSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCBottomLogoSpecificationByModelID,
    insertPFCBottomLogoSpecification,
    deletePFCBottomLogoSpecification,
    updatePFCBottomLogoSpecification,
    insertItemPFCBottomLogoSpecification,
    getPFCItemBottomLogoSpecification,
    updatePFCItemBottomLogoSpecification,
    deletePFCItemBottomLogoSpecification
}