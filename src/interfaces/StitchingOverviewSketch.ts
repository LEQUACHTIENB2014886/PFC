interface PFC_StitchingOverviewSketch {
    StitchingOverviewSketchID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    ItemStitchingOverviewSketchID: PFC_ItemStitchingOverviewSketch[];
}

interface PFC_ItemStitchingOverviewSketch {
    ItemStitchingOverviewSketchID: string;
    StitchingOverviewSketchID: string;
    Component: string;
    ImageContent: string;
    RightFoot: string;
    ItemIndex: string;
}

export {
    PFC_ItemStitchingOverviewSketch,
    PFC_StitchingOverviewSketch
}
