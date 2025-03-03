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
    ItemIndex: string
    Component: string
    Material: string
    Vendor: string
    Remarks: string
    RemarksImages: string
    RemarksSize: string
    TotalWBProcesses: string
    TotalSBProcesses: string
    Process: string
    Chemical: string
    Hardener: string
    WBSB: string
    Temp: string
    Time: string
    Mesh: string
}

export { PFC_BottomSilkScreenProcess, PFC_ItemBottomSilkScreenProcess }