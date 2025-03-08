interface PFC_AssemblingProcess {
    AssemblingProcessID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemAssemblingProcessID: PFC_ItemAssemblingProcess[]
}

interface PFC_ItemAssemblingProcess {
    ItemAssemblingProcessID: string
    AssemblingProcessID: string
    TableRow1: string
    ImagesContent: string
    LastingLaceType: string
    LastingClipSchedule: string
    ChillerMoldSpecification: string
    TotalWBSB: string
}

export { PFC_AssemblingProcess, PFC_ItemAssemblingProcess }