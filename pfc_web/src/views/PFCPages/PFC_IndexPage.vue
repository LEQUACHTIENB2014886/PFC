<template>
    <div>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-divider></el-divider>
            <el-page-header @back="goBack" style="margin-left: 20px;">
                <template #content>
                    <span class="text-large font-600 mr-3">PFCDetail</span>
                </template>
            </el-page-header>
            <el-divider></el-divider>
            <el-container>
                <el-aside style="margin-left: 20px;">
                    <Aside></Aside>
                </el-aside>
                <el-container>
                    <PFCIndex />
                    <el-footer></el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Header from "@/components/HomePage/Header.vue"
import Aside from "@/components/PFC/Aside.vue";
import router from "@/router";
import PFCIndex from "@/components/PFC/PFCIndex/PFCIndexIndex.vue"

const goBack = () => {
    router.back();
}

</script>

<style lang="css" scoped></style>