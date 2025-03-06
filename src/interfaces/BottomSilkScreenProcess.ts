interface PFC_BottomSilkScreenProcess {
    BottomSilkScreenProcessID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemBottomSilkScreenProcessID: PFC_ItemBottomSilkScreenProcess[]
}

interface PFC_ItemBottomSilkScreenProcess {
    ItemBottomSilkScreenProcessID: string
    BottomSilkScreenProcessID: string
    ComponentName: string
    Material: string
    Vendor: string
    TableRow1: string
    Remarks: string
    Size: string
    TotalWBSB: string
}

export { PFC_BottomSilkScreenProcess, PFC_ItemBottomSilkScreenProcess }
