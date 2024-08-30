<template>
    <div class="app">
        <div class="loading" v-if="showLoading">
            <Loading></Loading>
        </div>
        <RouterView />
    </div>
</template>

<script setup lang='ts'>
import { RouterView } from "vue-router"
import Loading from "@/components/loading/index.vue"
import { ref, } from "vue"
import router from "./router";
 let showLoading = ref(true)

router.afterEach(()=>{
    showLoading.value =false
})

</script>

<style lang="scss" scoped></style>