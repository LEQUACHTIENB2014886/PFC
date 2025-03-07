
interface PFC_OutsoleSpecification {
    OutsoleSpecificationID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemOutsoleSpecificationID: PFC_ItemOutsoleSpecification[]
}

interface PFC_ItemOutsoleSpecification {
    ItemOutsoleSpecificationID: string
    OutsoleSpecificationID: string
    TableRow1: string
    PreformPartsNestingDiagram: string
    FinalPart: string
    TableRow2: string
    TotalWeightPerSize: string
}
export { PFC_OutsoleSpecification, PFC_ItemOutsoleSpecification }