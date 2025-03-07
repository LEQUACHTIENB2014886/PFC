
interface PFC_HeelWedgeSpecification {
    HeelWedgeSpecificationID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemHeelWedgeSpecificationID: PFC_ItemHeelWedgeSpecification[]
}

interface PFC_ItemHeelWedgeSpecification {
    ItemHeelWedgeSpecificationID: string
    HeelWedgeSpecificationID: string
    TableRow1: string
    Thickness: string
    ImagesContent: string
}
export { PFC_HeelWedgeSpecification, PFC_ItemHeelWedgeSpecification }