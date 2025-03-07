<template>
  <el-col :span="24" style="height: 100vh;">
    <el-row :span="24" style="height: 5vh; background-color: aqua;">
      <Header />
    </el-row>
    <el-row :span="24" style="height: 5vh;">
      <el-divider />
    </el-row>
    <el-row :span="24" style="height: 5vh;">
      <el-page-header @back="goBack" style="margin-left: 20px;">
        <template #content>
          <span class="text-large font-600 mr-3">PFCDetail</span>
        </template>
      </el-page-header>
    </el-row>
    <el-row :span="24" style="height: 5vh;">
      <el-divider />
    </el-row>
    <el-row :span="24" style="height: 80vh;">
      <el-col :style="{ transition: 'all 0.3s ease' }" :span="isCollapse ? 1 : 4" style="height: 80vh;">
        <Aside :menuActive="menuActive" :isCollapse="isCollapse" @update:menuActive="handleMenuSelect"
          @update:isCollapse="val => isCollapse = val" />
      </el-col>
      <el-col :style="{ transition: 'all 0.3s ease' }" :span="isCollapse ? 23 : 20" style="height: 80vh;">
        <component v-if="currentComponent" :is="currentComponent" />
        <span v-else>Component chưa được định nghĩa</span>
      </el-col>
    </el-row>
  </el-col>
</template>
    
<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue"
import router from "@/router"
import Header from "@/components/HomePage/Header.vue"
import Aside from "@/components/PFC/Aside.vue"

// 1
import PFC_main from "@/components/PFC/PFCCover/PFC_main.vue"

// 2
import PFCIndex from "@/components/PFC/PFCIndex/PFCIndexIndex.vue"

// 3
import PFC_LaminationProcessPage from "@/components/PFC/PFC_LaminationProcess/PFC_LaminationProcessIndex.vue"

// 4
import PFC_CommonCuttingProcessPage from "@/components/PFC/PFC_CommonCuttingProcess/PFC_CommonCuttingProcessIndex.vue"

// 5
import PFC_UpperCuttingDieSchedule from "@/components/PFC/PFC_UpperCuttingDieSchedule/PFC_UpperCuttingDieScheduleIndex.vue"

// 6
import PFC_PerforationSpecificationIndex from "@/components/PFC/PFC_PerforationSpecification/PFC_PerforationSpecificationIndex.vue"

// 7
import PFC_UpperLogoSpecificationIndex from "@/components/PFC/PFC_UpperLogoSpecification/PFC_UpperLogoSpecificationIndex.vue"

// 8
import PFC_ElasticGoreSpecificationIndex from "@/components/PFC/PFC_ElasticGoreSpecification/PFC_ElasticGoreSpecificationIndex.vue"

// 9
import PFC_UpperHeatingPressingProcessIndex from "@/components/PFC/PFC_UpperHeatingPressingProcess/PFC_UpperHeatingPressingProcessIndex.vue"

// 10
import PFC_SkivingInstructionsIndex from "@/components/PFC/PFC_SkivingInstructions/PFC_SkivingInstructionsIndex.vue"

// 11
import PFC_MarkingLocationIndex from "@/components/PFC/PFC_MarkingLocation/PFC_MarkingLocationIndex.vue"

// 12
// import PFC_CommonStitchingProcessIndex from "@/components/PFC/PFC_CommonStitchingProcess/PFC_CommonStitchingProcessIndex.vue"

// 13
import PFC_ReinforcementPlacementIndex from "@/components/PFC/PFC_ReinforcementPlacement/PFC_ReinforcementPlacementIndex.vue"

// 14
import PFC_SecondProcessIndex from "@/components/PFC/PFC_SecondProcess/PFC_SecondProcessIndex.vue"

// 15
import PFC_ComputerStitchingScheduleIndex from "@/components/PFC/PFC_ComputerStitchingSchedule/PFC_ComputerStitchingScheduleIndex.vue"

// 16
import PFC_StitchingOverviewSketchIndex from "@/components/PFC/PFC_StitchingOverviewSketch/PFC_StitchingOverviewSketchIndex.vue"

// 17
import PFC_StitchingInstructionsIndex from "@/components/PFC/PFC_StitchingInstructions/PFC_StitchingInstructionsIndex.vue"

// 18
// import PFC_CommonStockfittingProcessIndex from "@/components/PFC/PFC_CommonStockfittingProcess/PFC_CommonStockfittingProcessIndex.vue"

// 19
import PFC_BottomCuttingDieScheduleIndex from "@/components/PFC/PFC_BottomCuttingDieSchedule/PFC_BottomCuttingDieScheduleIndex.vue"

// 20
import PFC_BottomLogoSpecificationIndex from "@/components/PFC/PFC_BottomLogoSpecification/PFC_BottomLogoSpecificationIndex.vue"

// 21
import PFC_BottomPartsProcessIndex from "@/components/PFC/PFC_BottomPartsProcess/PFC_BottomPartsProcessIndex.vue"

// 22
import PFC_BottomSilkScreenProcessIndex from "@/components/PFC/PFC_BottomSilkScreenProcess/PFC_BottomSilkScreenProcessIndex.vue"

// 23
import PFC_OutsoleSpecificationIndex from "@/components/PFC/PFC_OutsoleSpecification/PFC_OutsoleSpecificationIndex.vue"

// 24
import PFC_OutsolePressingProcessIndex from "@/components/PFC/PFC_OutsolePressingProcess/PFC_OutsolePressingProcessIndex.vue"

// 25
import PFC_RubberComponentSpecificationIndex from "@/components/PFC/PFC_RubberComponentSpecification/PFC_RubberComponentSpecificationIndex.vue"

// 26
// import PFC_CommonSilkScreenProcessIndex from "@/components/PFC/PFC_CommonSilkScreenProcess/PFC_CommonSilkScreenProcessIndex.vue"

// 27
import PFC_SocklinerSpecificationIndex from "@/components/PFC/PFC_SocklinerSpecification/PFC_SocklinerSpecificationIndex.vue"

// 28
import PFC_HeelWedgeSpecificationIndex from "@/components/PFC/PFC_HeelWedgeSpecification/PFC_HeelWedgeSpecificationIndex.vue"

// 29
// import PFC_LogoApplicationProcessIndex from "@/components/PFC/PFC_LogoApplicationProcess/PFC_LogoApplicationProcessIndex.vue"

// 30
// import PFC_SocklinerMoldingProcessIndex from "@/components/PFC/PFC_SocklinerMoldingProcess/PFC_SocklinerMoldingProcessIndex.vue"

// 31
// import PFC_SocklinerGraphicProcessIndex from "@/components/PFC/PFC_SocklinerGraphicProcess/PFC_SocklinerGraphicProcessIndex.vue"

// 32
// import PFC_OutsideConveyorProcessIndex from "@/components/PFC/PFC_OutsideConveyorProcess/PFC_OutsideConveyorProcessIndex.vue"


// 33
// import PFC_CommonAssemblingProcessIndex from "@/components/PFC/PFC_CommonAssemblingProcess/PFC_CommonAssemblingProcessIndex.vue"

// 34
// import PFC_AssemblyProcessIndex from "@/components/PFC/PFC_AssemblyProcess/PFC_AssemblyProcessIndex.vue"

// 35
// import PFC_PressingPadSpecificationIndex from "@/components/PFC/PFC_PressingPadSpecification/PFCPressingPadSpecificationIndex.vue"

// 36
// import PFC_ProductionChecklistIndex from "@/components/PFC/PFC_ProductionChecklist/PFC_ProductionChecklistIndex.vue"

// 37
// import PFC_UpperMeasurementSpecIndex from "@/components/PFC/PFC_UpperMeasurementSpec/PFC_UpperMeasurementSpecIndex.vue"

// 38
// import PFC_KeyManufacturingDetailsIndex from "@/components/PFC/PFC_KeyManufacturingDetails/PFC_KeyManufacturingDetailsIndex.vue"


// 39
// import PFC_PackingProcessIndex from "@/components/PFC/PFC_PackingProcess/PFC_PackingProcessIndex.vue"



function goBack() {
  router.back()
}

const menuActive = ref(localStorage.getItem("menuActive") || "1")
const isCollapse = ref(localStorage.getItem("isCollapse") === "true")

onMounted(() => {
  const savedMenu = localStorage.getItem("menuActive")
  if (savedMenu) menuActive.value = savedMenu
  const savedCollapse = localStorage.getItem("isCollapse")
  if (savedCollapse) isCollapse.value = savedCollapse === "true"
})

watch(isCollapse, (val) => {
  localStorage.setItem("isCollapse", String(val))
})

function handleMenuSelect(index: string) {
  menuActive.value = index
  localStorage.setItem("menuActive", index)
}

const DefaultComponent = {
  template: "<span>Component chưa được định nghĩa</span>"
}

const currentComponent = computed(() => {
  switch (menuActive.value) {
    case "1": return PFC_main;
    case "2": return PFCIndex;
    case "3": return PFC_LaminationProcessPage;
    case "4": return PFC_CommonCuttingProcessPage;
    case "5": return PFC_UpperCuttingDieSchedule;
    case "6": return PFC_PerforationSpecificationIndex;
    case "7": return PFC_UpperLogoSpecificationIndex;
    case "8": return PFC_ElasticGoreSpecificationIndex;
    case "9": return PFC_UpperHeatingPressingProcessIndex;
    case "10": return PFC_SkivingInstructionsIndex;
    case "11": return PFC_MarkingLocationIndex;
    // case "12": return PFC_CommonStitchingProcessIndex;
    case "13": return PFC_ReinforcementPlacementIndex;
    case "14": return PFC_SecondProcessIndex;
    case "15": return PFC_ComputerStitchingScheduleIndex;
    case "16": return PFC_StitchingOverviewSketchIndex;
    case "17": return PFC_StitchingInstructionsIndex;
    // case "18": return PFC_CommonStockfittingProcessIndex;
    case "19": return PFC_BottomCuttingDieScheduleIndex;
    case "20": return PFC_BottomLogoSpecificationIndex;
    case "21": return PFC_BottomPartsProcessIndex;
    case "22": return PFC_BottomSilkScreenProcessIndex;
    case "23": return PFC_OutsoleSpecificationIndex;
    case "24": return PFC_OutsolePressingProcessIndex;
    case "25": return PFC_RubberComponentSpecificationIndex;
    // case "26": return PFC_CommonSilkScreenProcessIndex;
    case "27": return PFC_SocklinerSpecificationIndex;
    case "28": return PFC_HeelWedgeSpecificationIndex;
    // case "29": return PFC_LogoApplicationProcessIndex;
    // case "30": return PFC_SocklinerMoldingProcessIndex;
    // case "31": return PFC_SocklinerGraphicProcessIndex;
    // case "32": return PFC_OutsideConveyorProcessIndex;
    // case "33": return PFC_CommonAssemblingProcessIndex;
    // case "34": return PFC_AssemblyProcessIndex;
    // case "35": return PFC_PressingPadSpecificationIndex;
    // case "36": return PFC_ProductionChecklistIndex;
    // case "37": return PFC_UpperMeasurementSpecIndex;
    // case "38": return PFC_KeyManufacturingDetailsIndex;
    // case "39": return PFC_PackingProcessIndex;
    default: return null;
  }
});



</script>
    
<style scoped></style>
    