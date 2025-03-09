<template>
    <div class="pagination-container">

        <div class="pagination-content"  v-for="(item,key) in arr" :key="key">
            <template v-if="item=='pager'">
                    <template v-if="pageCount<=5"> 
                        <div class="page"> 
                            <template v-for="el in pageArr" >
                                <button class="bg" :class="{active:el==currentPage, pager:true}" @click="optionPage(el)" >{{ el }}</button>
                            </template>
                           
                        </div>
                    </template>
                    <template v-if="pageCount>5"> 
                        <div class="page"> 
                            <template v-if="currentPage<=3">
                                <button 
                                    class="bg" :class="{active:el==currentPage, pager:true}" @click="optionPage(el)" 
                                    v-for="(el,key) in pageArr" :key="key" >{{ el }}
                                </button>
                            </template>
                            <template v-if="currentPage>3">
                                <button class="bg" :class="{active:1==currentPage, pager:true}" @click="optionPage(1)" >1</button>
                                <button class="bg" :class="{ pager:true}" v-if="currentPage-1>2" @click="deletePage()" style="font-size: 18px;">...</button>
                                <button 
                                    class="bg" :class="{active:el==currentPage, pager:true}" 
                                    @click="optionPage(el)" v-for="(el,key) in pageArr" :key="key" >
                                    {{ el }}
                                </button>
                            </template>
                            <button 
                                class="bg" :class="{ pager:true}" v-if="pageCount-currentPage>2" 
                                @click="addPage()" style="font-size: 18px;display: flex;justify-content: center;">
                                ...
                            </button>
                            <button class="bg" :class="{active:pageCount==currentPage, pager:true}" @click="optionPage(pageCount)" >{{ pageCount }}</button>
                        </div>
                    </template>
            </template>
            <template v-if="item=='prev'">
                <button class="bg" :class="item" @click="deletePage()" :disabled="currentPage<=1"><</button>
            </template>
            <template v-if="item=='next'">
                <button class="bg" :class="item" @click="addPage()" :disabled="currentPage>=pageCount">></button>
            </template>
            
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref,watch } from "vue"
const paginationSet = withDefaults(defineProps<{
    layout?:string,
    pageSize?:number,
    total?:number,

}>(),{
    layout:"prev,pager,next,jumper",
    pageSize:3,
    total:19,
})

let arr =  paginationSet.layout.split(",")
const pageCount = Math.ceil(paginationSet.total/paginationSet.pageSize)
let pageArr:any = []
let currentPage = ref(1)

const emit = defineEmits(["update:current_page"])
watch(()=>currentPage.value,(page)=>{
    emit("update:current_page",page)
})

const changePageArr = ()=>{
    let arr = []
    if(currentPage.value<=3){
        for(let i = 1;i<=4;i++){
            arr.push(i)
        }
    }
    if(currentPage.value>3&&pageCount-currentPage.value>=2){
        for(let i =currentPage.value-1;i<=currentPage.value+1;i++){
            arr.push(i)
        }    
    }
    if(pageCount-currentPage.value<2){
        for(let i = pageCount-2;i<pageCount;i++){
            arr.push(i)
        }
    }
    return arr
}
if(pageCount<=5){
    pageArr = []
    for(let i =1;i<=pageCount;i++){
        pageArr.push(i)
    }
}else{
    pageArr = changePageArr()
    watch(()=>currentPage.value,()=>{
        
        pageArr = []
        pageArr = changePageArr()
        console.log(pageArr)
    })
    
}

const optionPage = (page:number)=>{
    currentPage.value = page
}
const addPage = ()=>{
    if(currentPage.value<pageCount)
    currentPage.value++
}
const deletePage = ()=>{
    if(currentPage.value>1)
    currentPage.value--
}
</script>

<style lang="scss" scoped>
.page{
    display: flex;
}
.active{
    background-color: #409eff !important;
    color:white;
}

.total{
    height: 30px;
    width: 80px;
}
.sizes{
    height: 30px;
    width: 80px;
}
.jumper{
    height: 30px;
    width: 100px;
}
.pagination-container{
    width: 100%;
    display: flex;
   
}
.bg{
    background-color: #f0f2f5;
    margin-top: 18px;
    border-radius: 3px;
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
}
.bg:hover{
    color: #f8ca72;
}

</style>