interface UpperCuttingDieSchedule {
    UpperCuttingDieScheduleID: String
    ModelType: String
    ModelName: String
    MaterialNumber: String
    ComponentName: String
    ImageRemark: String
    Remark: String
    PageIndex: String
    ItemsUpperCuttingDieSchedule: ItemUpperCuttingDieSchedule[]
}

interface ItemUpperCuttingDieSchedule {
    ItemUpperCuttingDieScheduleID: String
    UpperCuttingDieScheduleID: String
    ComponentName: String
    ItemIndex: String
    SizeRange1: String
    SizeRange2: String
    SizeRange: String
    SizeRangeAreSame: String
    ImageContent: String
    ImageRemark: String
    IsShowImageRemark: String
    NumberOfPlayers: String
}

export {
    UpperCuttingDieSchedule,
    ItemUpperCuttingDieSchedule
}