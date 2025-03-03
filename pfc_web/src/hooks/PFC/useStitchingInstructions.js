import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCStitchingInstructionsByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCStitchingInstructionByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCStitchingInstructions = async (pfcStitchingInstructions) => {
    try {
        const res = await axios.post(`${URL}pfcStitchingInstruction`, pfcStitchingInstructions);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCStitchingInstructions = async (pfcStitchingInstructions) => {
    try {
        const res = await axios.put(`${URL}pfcStitchingInstruction`, pfcStitchingInstructions);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCStitchingInstructions = async (pfcStitchingInstructions) => {
    try {
        const res = await axios.delete(`${URL}pfcStitchingInstruction`, {
            data: pfcStitchingInstructions,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCStitchingInstructions = async (pfcItemStitchingInstructions) => {
    try {
        const res = await axios.post(`${URL}pfcItemStitchingInstruction`, pfcItemStitchingInstructions);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemStitchingInstructions = async (pfcStitchingInstructions) => {
    try {
        const res = await axios.post(`${URL}getPFCItemStitchingInstruction`, pfcStitchingInstructions);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemStitchingInstructions = async (pfcItemStitchingInstructions) => {
    try {
        const res = await axios.put(`${URL}pfcItemStitchingInstruction`, pfcItemStitchingInstructions);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemStitchingInstructions = async (pfcItemStitchingInstructions) => {
    try {
        const res = await axios.delete(`${URL}pfcItemStitchingInstruction`, {
            data: pfcItemStitchingInstructions,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCStitchingInstructionsByModelID,
    insertPFCStitchingInstructions,
    deletePFCStitchingInstructions,
    updatePFCStitchingInstructions,
    insertItemPFCStitchingInstructions,
    getPFCItemStitchingInstructions,
    updatePFCItemStitchingInstructions,
    deletePFCItemStitchingInstructions
}