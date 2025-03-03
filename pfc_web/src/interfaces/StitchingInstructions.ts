interface PFC_StitchingInstruction {
    StitchingInstructionID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    IteStitchingInstructionID: PFC_ItemStitchingInstruction[];
}

interface PFC_ItemStitchingInstruction {
    ItemStitchingInstructionID: string;
    StitchingInstructionID: string;
    Component: string;
    ImageContent: string;
    McType: string;
    NeedleSystem: string;
    NeedleSize: string;
    NeedlePointType: string;
    ThreadType: string;
    StitchingMargin: string;
    StitchPerInch: string;
    AttachingMethod: string;
    StitchingGuideName: string;
    ItemIndex: string;
}

export {
    PFC_ItemStitchingInstruction,
    PFC_StitchingInstruction

}