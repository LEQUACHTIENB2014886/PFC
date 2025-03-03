import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const GetAllPFCElasticGoreSpecification = async (pfcModel) => {
    return await axios.post(`${URL}getPFCElasticGoreSpecificationByModelID`, pfcModel);
}

const InsertPFCElasticGoreSpecification = async (pfcElasticGoreSpecification) => {
    return await axios.post(`${URL}pfcElasticGoreSpecification`, pfcElasticGoreSpecification);
}

const UpdatePFCElasticGoreSpecification = async (pfcElasticGoreSpecification) => {
    return await axios.put(`${URL}pfcElasticGoreSpecification`, pfcElasticGoreSpecification);
}

const DeletePFCElasticGoreSpecification = async (pfcElasticGoreSpecification) => {
    return await axios.delete(`${URL}pfcElasticGoreSpecification`, {
        data: pfcElasticGoreSpecification,
    });
}

// PFC ITEM Elastic Gore Specification
const InsertPFCItemElasticGoreSpecification = async (pfcItemElasticGoreSpecification) => {
    return await axios.post(`${URL}pfcItemElasticGoreSpecification`, pfcItemElasticGoreSpecification);
}

const GetAllPFCItemElasticGoreSpecification = async (pfcItemElasticGoreSpecification) => {
    return await axios.post(`${URL}getPFCItemElasticGoreSpecification`, pfcItemElasticGoreSpecification);
}

const UpdatePFCItemElasticGoreSpecification = async (pfcItemElasticGoreSpecification) => {
    return await axios.put(`${URL}pfcItemElasticGoreSpecification`, pfcItemElasticGoreSpecification);
}

const DeletePFCItemElasticGoreSpecification = async (pfcItemElasticGoreSpecification) => {
    return await axios.delete(`${URL}pfcItemElasticGoreSpecification`, {
        data: pfcItemElasticGoreSpecification,
    });
}

export {
    GetAllPFCElasticGoreSpecification,
    InsertPFCElasticGoreSpecification,
    UpdatePFCElasticGoreSpecification,
    DeletePFCElasticGoreSpecification,
    InsertPFCItemElasticGoreSpecification,
    GetAllPFCItemElasticGoreSpecification,
    UpdatePFCItemElasticGoreSpecification,
    DeletePFCItemElasticGoreSpecification
}