import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCMarkingLocationByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCMarkingLocationByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCMarkingLocation = async (pfcMarkingLocation) => {
    try {
        const res = await axios.post(`${URL}pfcMarkingLocation`, pfcMarkingLocation);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCMarkingLocation = async (pfcMarkingLocation) => {
    try {
        const res = await axios.put(`${URL}pfcMarkingLocation`, pfcMarkingLocation);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCMarkingLocation = async (pfcMarkingLocation) => {
    try {
        const res = await axios.delete(`${URL}pfcMarkingLocation`, {
            data: pfcMarkingLocation,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCMarkingLocation = async (pfcItemMarkingLocation) => {
    try {
        const res = await axios.post(`${URL}pfcItemMarkingLocation`, pfcItemMarkingLocation);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemMarkingLocation = async (pfcMarkingLocation) => {
    try {
        const res = await axios.post(`${URL}getPFCItemMarkingLocation`, pfcMarkingLocation);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemMarkingLocation = async (pfcItemMarkingLocation) => {
    try {
        const res = await axios.put(`${URL}pfcItemMarkingLocation`, pfcItemMarkingLocation);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemMarkingLocation = async (pfcItemMarkingLocation) => {
    try {
        const res = await axios.delete(`${URL}pfcItemMarkingLocation`, {
            data: pfcItemMarkingLocation,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCMarkingLocationByModelID,
    insertPFCMarkingLocation,
    deletePFCMarkingLocation,
    updatePFCMarkingLocation,
    insertItemPFCMarkingLocation,
    getPFCItemMarkingLocation,
    updatePFCItemMarkingLocation,
    deletePFCItemMarkingLocation
}