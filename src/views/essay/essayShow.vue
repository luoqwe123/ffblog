<template>
    <div class="show-container" style="width: 80%;margin-left: 10%;margin-top: 9rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;padding: 36px;min-height: 80vh;
    border: 0.5px rgba(0, 0, 0, 0.1) solid;">
        <h1 style="height: 30px;border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        line-height: 20px;font-size: larger;font-weight: bolder;">{{ essayInfo.title }}</h1>
        <div class="info" style="display: flex;width: 100%;height: 40px;margin-top: 10px;justify-content: space-between;">
            <div class="left" style="display: flex;margin-top: 10px;">
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Varela Round', Ubuntu, 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', Roboto, sans-serif;
                    font-style: italic;color: skyblue;margin-left: 12px;">{{ essayInfo.createdAt }}</div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Varela Round', Ubuntu, 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', Roboto, sans-serif;
                        font-style: italic;color: skyblue;margin-left: 12px;">{{ essayInfo.updateAt }}</div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Varela Round', Ubuntu, 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', Roboto, sans-serif;
                        font-style: italic;color: skyblue;margin-left: 12px;">{{ essayInfo.category?.title }}</div>
            </div>
            <button class="btn" style="background-color: #67c23a;border-radius: 5px;width: 80px;margin-top: 5px;color: aliceblue;" @click="update(essayInfo.id)">编辑</button>
        </div>
        <p style="text-align: justify;margin-top: 10px;line-height: 1.8;" v-html="essayInfo.content"></p>
    </div>
</template>

<script setup lang='ts'>
import { articleStore } from '@/stores/modules/aticles';
import { useRoute,useRouter } from 'vue-router';
import { ref } from 'vue';
const id = useRoute()
const $router = useRouter()
let stroe = articleStore()
const essayInfo = ref<any>({})
async function getArticle() {
    let res = await stroe.queryArticle(+id.params.id)
    console.log(res.data)
    essayInfo.value = res.data
   
    if(essayInfo.value.content.startsWith('<p>')){
        essayInfo.value.content = essayInfo.value.content.replace(/<\/?p>/g,"")
    }
  
}
getArticle()
const update = (id:number)=>{
    $router.push({ name:'update', params:{id}})
}
</script>

<style lang="scss" scoped>
.btn:hover{
    opacity: 0.8;
}
</style>