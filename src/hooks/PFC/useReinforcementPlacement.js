import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCReinforcementPlacementByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCReinforcementPlacementByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCReinforcementPlacement = async (pfcReinforcementPlacement) => {
    try {
        const res = await axios.post(`${URL}pfcReinforcementPlacement`, pfcReinforcementPlacement);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCReinforcementPlacement = async (pfcReinforcementPlacement) => {
    try {
        const res = await axios.put(`${URL}pfcReinforcementPlacement`, pfcReinforcementPlacement);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCReinforcementPlacement = async (pfcReinforcementPlacement) => {
    try {
        const res = await axios.delete(`${URL}pfcReinforcementPlacement`, {
            data: pfcReinforcementPlacement,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCReinforcementPlacement = async (pfcItemReinforcementPlacement) => {
    try {
        const res = await axios.post(`${URL}pfcItemReinforcementPlacement`, pfcItemReinforcementPlacement);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemReinforcementPlacement = async (pfcReinforcementPlacement) => {
    try {
        const res = await axios.post(`${URL}getPFCItemReinforcementPlacement`, pfcReinforcementPlacement);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemReinforcementPlacement = async (pfcItemReinforcementPlacement) => {
    try {
        const res = await axios.put(`${URL}pfcItemReinforcementPlacement`, pfcItemReinforcementPlacement);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemReinforcementPlacement = async (pfcItemReinforcementPlacement) => {
    try {
        const res = await axios.delete(`${URL}pfcItemReinforcementPlacement`, {
            data: pfcItemReinforcementPlacement,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCReinforcementPlacementByModelID,
    insertPFCReinforcementPlacement,
    deletePFCReinforcementPlacement,
    updatePFCReinforcementPlacement,
    insertItemPFCReinforcementPlacement,
    getPFCItemReinforcementPlacement,
    updatePFCItemReinforcementPlacement,
    deletePFCItemReinforcementPlacement
}