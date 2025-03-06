import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const deleteFilePFCModelFromFolderPFCModel = async (fileName, model) => {
    if (!fileName || !model) {
        return
    }

    try {
        const res = await axios.delete(`${URL}deleteFilePFCModelFromFolderPFCModel`, {
            params: {
                filename: fileName,
                ModelName: `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`,
            },
        });
        return { res, error: null };
    } catch (e) {
        console.error(e);
        return { res: null, error: e };
    }
}

const uploadFilePFCModelFromFolderPFCModel = async (formData, model) => {
    try {
        formData.append("ModelName", `${model.ModelType}_${model.ModelName}_${model.MaterialNumber}`)
        const res = await axios.post(`${URL}uploadFilePFCModelFromFolderPFCModel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return { res: res.data.data, error: null };
    } catch (e) {
        return { res: null, error: e };
    }
}

export {
    deleteFilePFCModelFromFolderPFCModel,
    uploadFilePFCModelFromFolderPFCModel
}