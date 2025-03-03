<template>
    <div style="height: 100%; display: flex; flex-direction: column;">
        <div style="padding: 10px;">
            <el-button size="small" @click="toggleCollapse">
                <el-icon v-if="localCollapse">
                    <Fold />
                </el-icon>
                <el-icon v-else>
                    <Expand />
                </el-icon>
            </el-button>
        </div>
        <div ref="scrollContainer" style="flex: 1; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin;"
            @scroll="onScroll">
            <el-menu :default-active="menuActive" :collapse="localCollapse" mode="vertical" collapse-transition
                class="el-menu-vertical-demo" @select="handleMenuSelect">
                <el-menu-item index="1">
                    <el-icon>
                        <Folder />
                    </el-icon>
                    <template #title>Cover</template>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <template #title>Index</template>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <Crop />
                    </el-icon>
                    <template #title>Lamination Process</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <Scissor />
                    </el-icon>
                    <template #title>Common Cutting Process</template>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon>
                        <Tools />
                    </el-icon>
                    <template #title>Upper Cutting Die Schedule</template>
                </el-menu-item>
                <el-menu-item index="6">
                    <el-icon>
                        <Paperclip />
                    </el-icon>
                    <template #title>Perforation Specification</template>
                </el-menu-item>
                <el-menu-item index="7">
                    <el-icon>
                        <SetUp />
                    </el-icon>
                    <template #title>Upper Logo Specification</template>
                </el-menu-item>
                <el-menu-item index="8">
                    <el-icon>
                        <Umbrella />
                    </el-icon>
                    <template #title>Elastic Gore Specification</template>
                </el-menu-item>
                <el-menu-item index="9">
                    <el-icon>
                        <Football />
                    </el-icon>
                    <template #title>Upper Heating Pressing Process</template>
                </el-menu-item>
                <el-menu-item index="10">
                    <el-icon>
                        <Brush />
                    </el-icon>
                    <template #title>Skiving Instructions</template>
                </el-menu-item>
                <el-menu-item index="11">
                    <el-icon>
                        <Location />
                    </el-icon>
                    <template #title>Marking Location</template>
                </el-menu-item>
                <el-menu-item index="12">
                    <el-icon>
                        <SuitcaseLine />
                    </el-icon>
                    <template #title>Common Stitching Process</template>
                </el-menu-item>
                <el-menu-item index="13">
                    <el-icon>
                        <Tools />
                    </el-icon>
                    <template #title>Reinforcement Placement</template>
                </el-menu-item>
                <el-menu-item index="14">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                    <template #title>Second Process</template>
                </el-menu-item>
                <el-menu-item index="15">
                    <el-icon>
                        <Monitor />
                    </el-icon>
                    <template #title>Computer Stitching Schedule</template>
                </el-menu-item>
                <el-menu-item index="16">
                    <el-icon>
                        <Brush />
                    </el-icon>
                    <template #title>Stitching Overview Sketch</template>
                </el-menu-item>
                <el-menu-item index="17">
                    <el-icon>
                        <Medal />
                    </el-icon>
                    <template #title>Stitching Instruction</template>
                </el-menu-item>
                <el-menu-item index="18">
                    <el-icon>
                        <Box />
                    </el-icon>
                    <template #title>Common Stockfitting Process</template>
                </el-menu-item>
                <el-menu-item index="19">
                    <el-icon>
                        <Crop />
                    </el-icon>
                    <template #title>Bottom Cutting Die Schedule</template>
                </el-menu-item>
                <el-menu-item index="20">
                    <el-icon>
                        <Soccer />
                    </el-icon>
                    <template #title>Bottom Logo Specification</template>
                </el-menu-item>
                <el-menu-item index="21">
                    <el-icon>
                        <PartlyCloudy />
                    </el-icon>
                    <template #title>Bottom Parts Process</template>
                </el-menu-item>
                <el-menu-item index="22">
                    <el-icon>
                        <FullScreen />
                    </el-icon>
                    <template #title>Bottom Silk Screen Process</template>
                </el-menu-item>
                <el-menu-item index="23">
                    <el-icon>
                        <ShoppingTrolley />
                    </el-icon>
                    <template #title>Outsole Specification</template>
                </el-menu-item>
                <!-- <el-menu-item index="24">
                    <el-icon>
                        <Press />
                    </el-icon>
                    <template #title>Outsole Pressing Process</template>
                </el-menu-item>
                <el-menu-item index="25">
                    <el-icon>
                        <Rubber />
                    </el-icon>
                    <template #title>Rubber Component Specification</template>
                </el-menu-item>
                <el-menu-item index="26">
                    <el-icon>
                        <Print />
                    </el-icon>
                    <template #title>Common Silk Screen Process</template>
                </el-menu-item>
                <el-menu-item index="27">
                    <el-icon>
                        <Socks />
                    </el-icon>
                    <template #title>Sockliner Specification</template>
                </el-menu-item>
                <el-menu-item index="28">
                    <el-icon>
                        <Shoes />
                    </el-icon>
                    <template #title>Heel Wedge Specification</template>
                </el-menu-item>
                <el-menu-item index="29">
                    <el-icon>
                        <Brand />
                    </el-icon>
                    <template #title>Logo Application Process</template>
                </el-menu-item>
                <el-menu-item index="30">
                    <el-icon>
                        <Mold />
                    </el-icon>
                    <template #title>Sockliner Molding Process</template>
                </el-menu-item>
                <el-menu-item index="31">
                    <el-icon>
                        <Image />
                    </el-icon>
                    <template #title>Sockliner Graphic Process</template>
                </el-menu-item>
                <el-menu-item index="32">
                    <el-icon>
                        <Conveyor />
                    </el-icon>
                    <template #title>Outside Conveyor Process</template>
                </el-menu-item>
                <el-menu-item index="33">
                    <el-icon>
                        <Assemble />
                    </el-icon>
                    <template #title>Common Assembling Process</template>
                </el-menu-item>
                <el-menu-item index="34">
                    <el-icon>
                        <Cogs />
                    </el-icon>
                    <template #title>Assembly Process</template>
                </el-menu-item>
                <el-menu-item index="35">
                    <el-icon>
                        <Pad />
                    </el-icon>
                    <template #title>Pressing Pad Specification</template>
                </el-menu-item>
                <el-menu-item index="36">
                    <el-icon>
                        <Checklist />
                    </el-icon>
                    <template #title>Production Checklist</template>
                </el-menu-item>
                <el-menu-item index="37">
                    <el-icon>
                        <Ruler />
                    </el-icon>
                    <template #title>Upper Measurement Specification</template>
                </el-menu-item>
                <el-menu-item index="38">
                    <el-icon>
                        <Details />
                    </el-icon>
                    <template #title>Key Manufacturing Details</template>
                </el-menu-item>
                <el-menu-item index="39">
                    <el-icon>
                        <Package />
                    </el-icon>
                    <template #title>Packing Process</template>
                </el-menu-item> -->

            </el-menu>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from "vue"
import {
    Folder,
    Document,
    Crop,
    Scissor,
    Tools,
    Paperclip,
    SetUp,
    Umbrella,
    Football,
    Suitcase,
    Brush,
    Location,
    SuitcaseLine,
    Refresh,
    Monitor,
    Medal,
    Box,
    Soccer,
    PartlyCloudy,
    FullScreen,
    ShoppingTrolley,
    Expand,
    Fold
} from "@element-plus/icons-vue"

const props = defineProps<{
    menuActive: string
    isCollapse: boolean
}>()

const emit = defineEmits<{
    (e: "update:menuActive", value: string): void
    (e: "update:isCollapse", value: boolean): void
}>()

const localCollapse = ref(props.isCollapse)
const scrollContainer = ref<HTMLElement | null>(null)

watch(localCollapse, (val) => {
    emit("update:isCollapse", val)
})

function handleMenuSelect(index: string) {
    emit("update:menuActive", index)
}

function toggleCollapse() {
    localCollapse.value = !localCollapse.value
}

function onScroll() {
    if (!scrollContainer.value) return
    localStorage.setItem("asideScrollTop", scrollContainer.value.scrollTop.toString())
}

onMounted(() => {
    nextTick(() => {
        const savedScrollTop = localStorage.getItem("asideScrollTop")
        if (savedScrollTop && scrollContainer.value) {
            scrollContainer.value.scrollTop = parseFloat(savedScrollTop)
        }
    })
})
</script>
  
<style scoped>
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}
</style>
