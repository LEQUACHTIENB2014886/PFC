interface PFC_ComputerStitchingSchedule {
    ComputerStitchingScheduleID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    ItemComputerStitchingScheduleID: PFC_ItemComputerStitchingSchedule[];
}

interface PFC_ItemComputerStitchingSchedule {
    ItemComputerStitchingScheduleID: string;
    ComputerStitchingScheduleID: string;
    Component: string;
    ImageContent: string;
    StitchingMargin: string;
    NeedleTypeSize: string;
    StitchPerInch: string;
    Size: string;
    ItemIndex: string;
}

export { PFC_ComputerStitchingSchedule, PFC_ItemComputerStitchingSchedule };