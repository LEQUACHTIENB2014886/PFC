package types

type PFC_BottomSilkScreenProcess struct {
	BottomSilkScreenProcessID string `gorm:"column:BottomSilkScreenProcessID"`
	ModelType                 string `gorm:"column:ModelType"`
	ModelName                 string `gorm:"column:ModelName"`
	MaterialNumber            string `gorm:"column:MaterialNumber"`
	Title                     string `gorm:"column:Title"`
	Component                 string `gorm:"column:Component"`
	Material                  string `gorm:"column:Material"`
	Vendor                    string `gorm:"column:Vendor	"`
	Remarks                   string `gorm:"column:Remarks"`
	RemarksImages             string `gorm:"column:RemarksImages"`
	RemarksSize               string `gorm:"column:RemarksSize"`
	TotalWBProcesses          string `gorm:"column:TotalWBProcesses"`
	TotalSBProcesses          string `gorm:"column:TotalSBProcesses"`
	ItemIndex                 string `gorm:"column:ItemIndex"`
}

type PFC_ItemBottomSilkScreenProcess struct {
	ItemBottomSilkScreenProcessID string `gorm:"column:ItemBottomSilkScreenProcessID"`
	BottomSilkScreenProcessID     string `gorm:"column:BottomSilkScreenProcessID"`
	ItemIndex                     string `gorm:"column:ItemIndex"`
	Process                       string `gorm:"column:Process"`
	Chemical                      string `gorm:"column:Chemical"`
	Hardener                      string `gorm:"column:Hardener"`
	WBSB                          string `gorm:"column:WBSB"`
	Temp                          string `gorm:"column:Temp"`
	Time                          string `gorm:"column:Time"`
	Mesh                          string `gorm:"column:Mesh"`
}
