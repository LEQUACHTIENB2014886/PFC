interface PFC_OutsideConveyorProcess {
    OutsideConveyorProcessID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemOutsideConveyorProcessID: PFC_ItemOutsideConveyorProcess[]
}

interface PFC_ItemOutsideConveyorProcess {
    ItemOutsideConveyorProcessID: string
    OutsideConveyorProcessID: string
    ComponentName: string
    Material: string
    Vendor: string
    TableRow1: string
}

export { PFC_OutsideConveyorProcess, PFC_ItemOutsideConveyorProcess }