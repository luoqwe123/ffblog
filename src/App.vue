<template>
    <div class="app">
       
        <Header class="header"></Header>
       
        <RouterView />
    </div>
</template>

<script setup lang='ts'>
import { RouterView } from "vue-router"
//import Loading from "@/components/loading/index.vue"
import Header from "./components/layout/header.vue";

import { ref, } from "vue"
import router from "./router";
 let showLoading = ref(true)

router.afterEach(()=>{
    showLoading.value =false
})

</script>

<style lang="scss" scoped>
.app{
    width: 100%;
    overflow-x: hidden;
}
.header {
  position: fixed;
  z-index: 3;
  top: 0px;
}
</style>