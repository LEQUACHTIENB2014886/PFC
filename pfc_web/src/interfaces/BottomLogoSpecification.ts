interface PFC_BottomLogoSpecification {
    BottomLogoSpecificationID: string;
    ModelType: string;
    ModelName: string;
    MaterialNumber: string;
    Title: string;
    ItemIndex: string;
    ItemBottomLogoSpecificationID: PFC_ItemBottomLogoSpecification[];
}

interface PFC_ItemBottomLogoSpecification {
    ItemBottomLogoSpecificationID: string;
    BottomLogoSpecificationID: string;
    Component: string;
    ImageContent: string;
    Vendor: string;
    MaterialApplication: string;
    Model: string;
    Size: string;
    ItemIndex: string;
}
 