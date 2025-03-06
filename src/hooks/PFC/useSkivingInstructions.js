import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const getPFCSkivingInstructionsByModelID = async (pfcModel) => {
    try {
        const res = await axios.post(`${URL}getPFCSkivingInstructionsByModelID`, pfcModel);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const insertPFCSkivingInstructions = async (pfcSkivingInstructions) => {
    try {
        const res = await axios.post(`${URL}pfcSkivingInstruction`, pfcSkivingInstructions);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCSkivingInstructions = async (pfcSkivingInstructions) => {
    try {
        const res = await axios.put(`${URL}pfcSkivingInstruction`, pfcSkivingInstructions);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCSkivingInstructions = async (pfcSkivingInstructions) => {
    try {
        const res = await axios.delete(`${URL}pfcSkivingInstruction`, {
            data: pfcSkivingInstructions,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

// PFC ITEM PERFORATION SPECIFICATION

const insertItemPFCSkivingInstructions = async (pfcItemSkivingInstructions) => {
    try {
        const res = await axios.post(`${URL}pfcItemSkivingInstruction`, pfcItemSkivingInstructions);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const getPFCItemSkivingInstructions = async (pfcSkivingInstructions) => {
    try {
        const res = await axios.post(`${URL}getPFCItemSkivingInstruction`, pfcSkivingInstructions);
        return { res, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

const updatePFCItemSkivingInstructions = async (pfcItemSkivingInstructions) => {
    try {
        const res = await axios.put(`${URL}pfcItemSkivingInstruction`, pfcItemSkivingInstructions);
        return { res: res, err: null };
    } catch (e) {
        return { res: null, err: e };
    }
}

const deletePFCItemSkivingInstructions = async (pfcItemSkivingInstructions) => {
    try {
        const res = await axios.delete(`${URL}pfcItemSkivingInstruction`, {
            data: pfcItemSkivingInstructions,
        });
        return { res: res, err: null };
    } catch (e) {
        console.error(e);
        return { res: null, err: e };
    }
}

export {
    getPFCSkivingInstructionsByModelID,
    insertPFCSkivingInstructions,
    deletePFCSkivingInstructions,
    updatePFCSkivingInstructions,
    insertItemPFCSkivingInstructions,
    getPFCItemSkivingInstructions,
    updatePFCItemSkivingInstructions,
    deletePFCItemSkivingInstructions
}