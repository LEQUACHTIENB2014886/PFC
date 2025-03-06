interface PFC_OutsolePressingProcess {
    OutsolePressingProcessID: string,
    ModelType: string,
    ModelName: string,
    MaterialNumber: string,
    Title: string,
    ItemIndex: string,
    ItemOutsolePressingProcessID: PFC_ItemOutsolePressingProcess[],
}

interface PFC_ItemOutsolePressingProcess {
    ItemOutsolePressingProcessID: string,
    OutsolePressingProcessID: string,
    TableRow1: string,
    TableRow2: string,
}

export { PFC_OutsolePressingProcess, PFC_ItemOutsolePressingProcess }