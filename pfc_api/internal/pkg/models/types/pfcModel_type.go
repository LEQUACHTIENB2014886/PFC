package types

type PFCModel struct {
	ModelType                 string `gorm:"column:ModelType"`
	ModelName                 string `gorm:"column:ModelName"`
	MaterialNumber            string `gorm:"column:MaterialNumber"`
	ModelID                   string `gorm:"column:ModelID"`
	ColorWayID                string `gorm:"column:ColorWayID"`
	BOMID                     string `gorm:"column:BOMID"`
	Date                      string `gorm:"column:Date"`
	SizeRange                 string `gorm:"column:SizeRange"`
	LastCode                  string `gorm:"column:LastCode"`
	ToolCode                  string `gorm:"column:ToolCode"`
	PatternFileName           string `gorm:"column:PatternFileName"`
	FirstSource               string `gorm:"column:FirstSource"`
	MedialSideView            string `gorm:"column:MedialSideView"`
	LateralSideView           string `gorm:"column:LateralSideView"`
	BottomView                string `gorm:"column:BottomView"`
	FrontView                 string `gorm:"column:FrontView"`
	HeelView                  string `gorm:"column:HeelView"`
	MedialSideViewV1          string `gorm:"column:MedialSideViewV1"`
	LateralSideViewV1         string `gorm:"column:LateralSideViewV1"`
	BottomViewV1              string `gorm:"column:BottomViewV1"`
	FrontViewV1               string `gorm:"column:FrontViewV1"`
	HeelViewV1                string `gorm:"column:HeelViewV1"`
	KeyManufacturingProcesses string `gorm:"column:KeyManufacturingProcesses"`
	IDS                       string `gorm:"column:IDS"`
	Converse                  string `gorm:"column:Converse"`
}
