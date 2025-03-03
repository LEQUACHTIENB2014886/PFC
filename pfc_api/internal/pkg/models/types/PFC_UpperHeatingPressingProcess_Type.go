package types

type PFC_UpperHeatingPressingProcess struct {
	UpperHeatingPressingProcessID string `gorm:"column:UpperHeatingPressingProcessID"`
	ModelType                     string `gorm:"column:ModelType"`
	ModelName                     string `gorm:"column:ModelName"`
	MaterialNumber                string `gorm:"column:MaterialNumber"`
	Title                         string `gorm:"column:Title"`
	ComponentName                 string `gorm:"column:ComponentName"`
	BOM                           string `gorm:"column:BOM"`
	Material                      string `gorm:"column:Material"`
	Vendor                        string `gorm:"column:Vendor"`
	Process                       string `gorm:"column:Process"`
	ImageRemark                   string `gorm:"column:ImageRemark"`
	RemarksA                      string `gorm:"column:RemarksA"`
	RemarksB                      string `gorm:"column:RemarksB"`
	RemarksSize                   string `gorm:"column:RemarksSize"`
	ItemIndex                     string `gorm:"column:ItemIndex"`
}
