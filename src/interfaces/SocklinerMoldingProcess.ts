interface PFC_SocklinerGraphicProcess {
    SocklinerGraphicProcessID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    ItemSocklinerGraphicProcessID: PFC_ItemSocklinerGraphicProcess[]
}

interface PFC_ItemSocklinerGraphicProcess {
    ItemSocklinerGraphicProcessID: string;
    SocklinerGraphicProcessID: string;
    ComponentName: string;
    SocklinerLogo: string;
    Vendor: string;
    TableRow1: string;
    Remarks: string;
    RemarksImage: string;
    ModelSize: string;
}

export { PFC_SocklinerGraphicProcess, PFC_ItemSocklinerGraphicProcess }