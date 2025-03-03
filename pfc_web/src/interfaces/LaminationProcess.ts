import AdhesiveOtherType from "./AdhesiveOtherType";
import AdhesiveType from "./AdhesiveType";
import MaterialDescription from "./MaterialDescription";
import Roll from "./Roll";

interface LaminationProcess {
    LaminationProcessID: String
    ModelType: String
    ModelName: String
    MaterialNumber: String
    ComponentName: string
    Vendor: string
    MaterialDescriptions: MaterialDescription[]
    AdhesiveType: AdhesiveType[]
    AdhesiveOtherType: AdhesiveOtherType[]
    Rolls: Roll[]
    Winding: string
    Cooling: string
    EndStep: string
}

export default LaminationProcess;
