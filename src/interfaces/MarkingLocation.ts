interface PFC_MarkingLocation {
    MarkingLocationID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    ItemMarkingLocations: PFC_ItemMarkingLocation[];
}

interface PFC_ItemMarkingLocation {
    ItemMarkingLocationID: string;
    MarkingLocationID: string;
    Component: string;
    ImageContent: string;
    Process: string;
    ItemIndex: string;
}

export {
    PFC_MarkingLocation,
    PFC_ItemMarkingLocation
}
