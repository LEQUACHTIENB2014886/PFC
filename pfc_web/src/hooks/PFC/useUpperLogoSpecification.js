import axios from 'axios';
const urlIp = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = `${urlIp}api/v1/`;

const GetAllPFCUpperLogoSpecification = async (pfcModel) => {
    return await axios.post(`${URL}getPFCUpperLogoSpecificationByModelID`, pfcModel);
}

const InsertPFCUpperLogoSpecification = async (pfcUpperLogoSpecification) => {
    return await axios.post(`${URL}pfcUpperLogoSpecification`, pfcUpperLogoSpecification);
}

const UpdatePFCUpperLogoSpecification = async (pfcUpperLogoSpecification) => {
    return await axios.put(`${URL}pfcUpperLogoSpecification`, pfcUpperLogoSpecification);
}

const DeletePFCUpperLogoSpecification = async (pfcUpperLogoSpecification) => {
    return await axios.delete(`${URL}pfcUpperLogoSpecification`, {
        data: pfcUpperLogoSpecification,
    });
}

// PFC ITEM PERFORATION SPECIFICATION
const InsertPFCItemUpperLogoSpecification = async (pfcItemUpperLogoSpecification) => {
    return await axios.post(`${URL}pfcItemUpperLogoSpecification`, pfcItemUpperLogoSpecification);
}

const GetAllPFCItemUpperLogoSpecification = async (pfcItemUpperLogoSpecification) => {
    return await axios.post(`${URL}getPFCItemUpperLogoSpecification`, pfcItemUpperLogoSpecification);
}

const UpdatePFCItemUpperLogoSpecification = async (pfcItemUpperLogoSpecification) => {
    return await axios.put(`${URL}pfcItemUpperLogoSpecification`, pfcItemUpperLogoSpecification);
}

const DeletePFCItemUpperLogoSpecification = async (pfcItemUpperLogoSpecification) => {
    return await axios.delete(`${URL}pfcItemUpperLogoSpecification`, {
        data: pfcItemUpperLogoSpecification,
    });
}

export {
    GetAllPFCUpperLogoSpecification,
    InsertPFCUpperLogoSpecification,
    DeletePFCUpperLogoSpecification,
    UpdatePFCUpperLogoSpecification,
    InsertPFCItemUpperLogoSpecification,
    GetAllPFCItemUpperLogoSpecification,
    UpdatePFCItemUpperLogoSpecification,
    DeletePFCItemUpperLogoSpecification
}