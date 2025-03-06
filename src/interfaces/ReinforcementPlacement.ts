interface PFC_ReinforcementPlacement {
    ReinforcementPlacementID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    RoItemReinforcementPlacementID: PFC_ItemReinforcementPlacement[];
}

interface PFC_ItemReinforcementPlacement {
    ItemReinforcementPlacementID: string;
    ReinforcementPlacementID: string;
    Component: string;
    ImageContent: string;
    Material: string;
    Adhesive: string;
    AttachingMethod: string;
    Temp: string;
    Pressure: string;
    Time: string;
    ItemIndex: string;
}
export { PFC_ReinforcementPlacement, PFC_ItemReinforcementPlacement }