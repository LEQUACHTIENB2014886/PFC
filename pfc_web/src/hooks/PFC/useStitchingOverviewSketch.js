import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCStitchingOverviewSketchByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCStitchingOverviewSketchByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCStitchingOverviewSketch = async (pfcStitchingOverviewSketch) => {
    try {
        const res = await axios.post(`${URL}pfcStitchingOverviewSketch`, pfcStitchingOverviewSketch);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCStitchingOverviewSketch = async (pfcStitchingOverviewSketch) => {
    try {
        const res = await axios.put(`${URL}pfcStitchingOverviewSketch`, pfcStitchingOverviewSketch);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCStitchingOverviewSketch = async (pfcStitchingOverviewSketch) => {
    try {
        const res = await axios.delete(`${URL}pfcStitchingOverviewSketch`, {
            data: pfcStitchingOverviewSketch,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCStitchingOverviewSketch = async (pfcItemStitchingOverviewSketch) => {
    try {
        const res = await axios.post(`${URL}pfcItemStitchingOverviewSketch`, pfcItemStitchingOverviewSketch);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemStitchingOverviewSketch = async (pfcStitchingOverviewSketch) => {
    try {
        const res = await axios.post(`${URL}getPFCItemStitchingOverviewSketch`, pfcStitchingOverviewSketch);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemStitchingOverviewSketch = async (pfcItemStitchingOverviewSketch) => {
    try {
        const res = await axios.put(`${URL}pfcItemStitchingOverviewSketch`, pfcItemStitchingOverviewSketch);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemStitchingOverviewSketch = async (pfcItemStitchingOverviewSketch) => {
    try {
        const res = await axios.delete(`${URL}pfcItemStitchingOverviewSketch`, {
            data: pfcItemStitchingOverviewSketch,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCStitchingOverviewSketchByModelID,
    insertPFCStitchingOverviewSketch,
    deletePFCStitchingOverviewSketch,
    updatePFCStitchingOverviewSketch,
    insertItemPFCStitchingOverviewSketch,
    getPFCItemStitchingOverviewSketch,
    updatePFCItemStitchingOverviewSketch,
    deletePFCItemStitchingOverviewSketch
}