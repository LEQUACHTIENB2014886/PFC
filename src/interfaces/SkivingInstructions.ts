interface PFC_SkivingInstructions {
    SkivingInstructionsID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    SkivingKey: string;
    ItemIndex: string;
    ItemSkivingInstructionsID: PFC_ItemSkivingInstructions[];
}

interface PFC_ItemSkivingInstructions {
    ItemSkivingInstructionsID: string;
    SkivingInstructionsID: string;
    Component: string;
    ImageContent: string;
    SkivedEdgeThickness: string;
    SkivingWidth: string;
    ItemIndex: string;
}

export {
    PFC_ItemSkivingInstructions,
    PFC_SkivingInstructions
}