interface PFC_SocklinerMoldingProcess {
    SocklinerMoldingProcessID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemSocklinerMoldingProcessID: PFC_ItemSocklinerMoldingProcess[]
}

interface PFC_ItemSocklinerMoldingProcess {
    ItemSocklinerMoldingProcessID: string
    SocklinerMoldingProcessID: string
    RawMaterialName: string
    Vendor: string
    TableRow1: string
    Remarks: string
    RemarksImage: string
    Model: string
    Size: string
}

export { PFC_SocklinerMoldingProcess, PFC_ItemSocklinerMoldingProcess }