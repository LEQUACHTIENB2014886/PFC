interface PFC_BottomPartsProcess {
	BottomPartsProcessID: string
	ModelType: string
	ModelName: string
	MaterialNumber: string
	Title: string

	ItemIndex: string
	ItemBottomPartsProcessID: PFC_ItemBottomPartsProcess[]
}
interface PFC_ItemBottomPartsProcess {
	ItemBottomPartsProcessID: string
	BottomPartsProcessID: string
	ItemIndex: string
	Process: string
	Component: string
	Material: string
	Vendor: string
	Remarks: string
	RemarksImages: string
	RemarksSize: string
	Temp: string
	Time: string
	Pressure: string
}

export { PFC_BottomPartsProcess, PFC_ItemBottomPartsProcess }