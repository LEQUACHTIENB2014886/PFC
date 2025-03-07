interface PFC_LogoApplicationProcess {
    LogoApplicationProcessID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemLogoApplicationProcessID: PFC_ItemLogoApplicationProcess[]
}

interface PFC_ItemLogoApplicationProcess {
    ItemLogoApplicationProcessID: string
    LogoApplicationProcessID: string
    ComponentName: string
    LogoSockliner: string
    Vendor: string
    TableRow1: string
    Remarks: string
    RemarksImage: string
    Size: string
}
export { PFC_LogoApplicationProcess, PFC_ItemLogoApplicationProcess }