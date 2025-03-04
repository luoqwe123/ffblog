<template>
    <div class="Label-container" style="width: 100%;height: 100vh;padding: 5% 12%;display: flex;">

        <ul style="width: 60%;height: 100%;  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 10px;
            border: 0.5px rgba(0, 0, 0, 0.1) solid;padding: 3% 4%;overflow: hidden;">
            <template v-if="categoryList!=''">
                <li style="height: 48px;width: 100%;display: flex;align-items: center;cursor: pointer;"
                v-for="(item,key) in categoryList" :key=key >
                    <div class="circle" style="width: 14px;height: 14px;border:3.6px solid #49b1f5;border-radius: 50%;
                    transition: all .8s;margin-right: 8px;">
                    </div>
                    <span style="font-family:revert" @click="go(item.id)">{{ item.title}}</span>
                </li>
                <div class="div" style="overflow: hidden;width: 100%;border-radius: 5%;">
                     <img src="../../../public/119jpg.jpg" class="picture" alt="" style="width: 100%;border-radius: 5%;transition: all 1s ease;">
                </div>
               
            </template>


        </ul>
        <div class="right" style="margin-left: 16px;">
            <Avatar style="margin-bottom: 12px;" :length></Avatar>
            <Poem />
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import Avatar from "@/components/avatar/index.vue"
import Poem from "@/components/poem/index.vue"
import { categoryStore } from "@/stores/modules/category";
import { articleStore } from "@/stores/modules/aticles";
import { useRouter } from "vue-router";
let $router = useRouter()
let categoryList = ref<any>()
let cStore = categoryStore()
let aStore = articleStore()
let length = ref<any>([])
async function getInfo() {
    let res = await cStore.getCategorys()
    categoryList.value = res.data
    let response = await aStore.getArticleList(1,1)
   
    length.value.push(response.meta.total)
    length.value.push(response.meta.categoryTotal)
}
getInfo()
const go = (id:number)=>{
    $router.push({
        name:"category",
        params:{id}
    })
}
</script>

<style lang="scss" scoped>
li:hover {
    
    color: #49b1f5;
   
    .circle {
        border: 3.6px solid #ff7242 !important;
    }
}
.picture:hover{
    transform: scale(1.2);
}
</style>