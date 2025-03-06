<template>
    <el-col :span="24" class="container">
        <el-col :span="24">
            <h4>Lamination Process</h4>
        </el-col>
        <Index></Index>
    </el-col>
</template>

<script lang="ts" setup>

import Index from "@/components/PFC/LaminationProcess/Index.vue"

</script>

<style lang="css" scoped>
.container {
    overflow: auto;
    margin-bottom: 10vh;
    width: 100vw;
    height: 100vh;
}
</style>