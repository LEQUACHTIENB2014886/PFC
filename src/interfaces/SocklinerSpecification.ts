
interface PFC_SocklinerSpecification {
    SocklinerSpecificationID: string
    ModelType: string
    ModelName: string
    MaterialNumber: string
    Title: string
    ItemIndex: string
    ItemSocklinerSpecificationID: PFC_ItemSocklinerSpecification[]
}

interface PFC_ItemSocklinerSpecification {
    ItemSocklinerSpecificationID: string
    SocklinerSpecificationID: string
    Front: string
    Back: string
    Size: string
    TableRow1: string
    TableRow2: string
}
export { PFC_SocklinerSpecification, PFC_ItemSocklinerSpecification }