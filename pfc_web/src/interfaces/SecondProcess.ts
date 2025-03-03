interface PFC_SecondProcess {
    secondProcessID: string;
    modelType: string;
    modelName: string;
    materialNumber: string;
    title: string;
    itemIndex: string;
    itemSecondProcessID: PFC_ItemSecondProcess[];
};
interface PFC_ItemSecondProcess {
    itemSecondProcessID: string;
    secondProcessID: string;
    component: string;
    imageContent: string;
    material: string;
    method: string;
    itemIndex: string;
};

export { PFC_SecondProcess, PFC_ItemSecondProcess };

