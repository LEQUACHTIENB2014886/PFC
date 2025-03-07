import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCRubberComponentSpecificationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCRubberComponentSpecificationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCRubberComponentSpecification = async (pfcRubberComponentSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcRubberComponentSpecification`, pfcRubberComponentSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCRubberComponentSpecification = async (pfcRubberComponentSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcRubberComponentSpecification`, pfcRubberComponentSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCRubberComponentSpecification = async (pfcRubberComponentSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcRubberComponentSpecification`, {
            data: pfcRubberComponentSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCRubberComponentSpecification = async (pfcItemRubberComponentSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcItemRubberComponentSpecification`, pfcItemRubberComponentSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemRubberComponentSpecification = async (pfcRubberComponentSpecification) => {
    try {
        const res = await axios.post(`${URL}getPFCItemRubberComponentSpecification`, pfcRubberComponentSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemRubberComponentSpecification = async (pfcItemRubberComponentSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcItemRubberComponentSpecification`, pfcItemRubberComponentSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemRubberComponentSpecification = async (pfcItemRubberComponentSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcItemRubberComponentSpecification`, {
            data: pfcItemRubberComponentSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCRubberComponentSpecificationByModelID,
    insertPFCRubberComponentSpecification,
    deletePFCRubberComponentSpecification,
    updatePFCRubberComponentSpecification,
    insertItemPFCRubberComponentSpecification,
    getPFCItemRubberComponentSpecification,
    updatePFCItemRubberComponentSpecification,
    deletePFCItemRubberComponentSpecification
}