import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCPerforationSpecificationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCPerforationSpecificationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCPerforationSpecification = async (pfcPerforationSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcPerforationSpecification`, pfcPerforationSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCPerforationSpecification = async (pfcPerforationSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcPerforationSpecification`, pfcPerforationSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCPerforationSpecification = async (pfcPerforationSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcPerforationSpecification`, {
            data: pfcPerforationSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCPerforationSpecification = async (pfcItemPerforationSpecification) => {
    try {
        const res = await axios.post(`${URL}pfcItemPerforationSpecification`, pfcItemPerforationSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemPerforationSpecification = async (pfcPerforationSpecification) => {
    try {
        const res = await axios.post(`${URL}getPFCItemPerforationSpecification`, pfcPerforationSpecification);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemPerforationSpecification = async (pfcItemPerforationSpecification) => {
    try {
        const res = await axios.put(`${URL}pfcItemPerforationSpecification`, pfcItemPerforationSpecification);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemPerforationSpecification = async (pfcItemPerforationSpecification) => {
    try {
        const res = await axios.delete(`${URL}pfcItemPerforationSpecification`, {
            data: pfcItemPerforationSpecification,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCPerforationSpecificationByModelID,
    insertPFCPerforationSpecification,
    deletePFCPerforationSpecification,
    updatePFCPerforationSpecification,
    insertItemPFCPerforationSpecification,
    getPFCItemPerforationSpecification,
    updatePFCItemPerforationSpecification,
    deletePFCItemPerforationSpecification
}