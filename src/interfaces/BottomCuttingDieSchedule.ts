interface PFC_BottomCuttingDieSchedule {
    BottomCuttingDieScheduleID: string,
    ModelType: string,
    ModelName: string,
    MaterialNumber: string,
    Title: string,
    ItemIndex: string,
    ItemBottomCuttingDieScheduleID: PFC_ItemBottomCuttingDieSchedule[];
}

interface PFC_ItemBottomCuttingDieSchedule {
    ItemBottomCuttingDieScheduleID: string,
    BottomCuttingDieScheduleID: string,
    Component: string,
    ImageContent: string,
    SizeRange1: string,
    SizeRange2: string,
    SizeRange: string,
    SizeRangeAreSame: string,
    Remarks: string,
    NumberOfLayers: string,
    Thickness: string,
    Width: string,
    Hardness: string,
    ItemIndex: string,
}

export { PFC_BottomCuttingDieSchedule, PFC_ItemBottomCuttingDieSchedule };
