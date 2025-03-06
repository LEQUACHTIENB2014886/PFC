<template>
    <div class="app">
        <div class="common-layout">
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-divider></el-divider>
                <el-main style="overflow: auto;">
                    <Body></Body>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </div>
    </div>
</template>

<script setup>

import Header from "@/components/HomePage/Header.vue"
import Body from "@/components/HomePage/Body.vue";

</script>