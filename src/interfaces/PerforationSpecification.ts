interface PerforationSpecification {
    PerforationSpecificationID: String
    ModelType: String
    ModelName: String
    MaterialNumber: String
    Title: String
    ItemIndex: String
}

interface ItemPerforationSpecification {
    ItemPerforationSpecificationID: String
    PerforationSpecificationID: String
    Component: String
    ImageContent: String
    SizeGroup1: String
    SizeGroup2: String
    SizeGroup3: String
    ItemIndex: String
}

export {
    PerforationSpecification,
    ItemPerforationSpecification
}