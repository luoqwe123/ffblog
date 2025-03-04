<template>
    <div class="textShow-container h-[255px] 2xl:h-[285px]" @mouseenter="() => { showInco = true }"
        @mouseleave="() => { showInco = false; }">
        <template v-for="(item) in arrLayout">
            <div class="cover" v-if="(item == 'picture')" :style="{
                borderTopLeftRadius: imgHorn ? 10 + 'px' : 0,borderBottomLeftRadius: imgHorn ? 10 + 'px' : 0,
                borderTopRightRadius: !imgHorn ? 10 + 'px' : 0,borderBottomRightRadius: !imgHorn ? 10 + 'px' : 0,
            }">
                <img :data_src=src class="picture" ref="cover" >
            </div>
            <div class="content" v-if="(item == 'content')">
                <div class="articleTitle" @mouseenter="() => { IncoColor = true }"
                    @mouseleave="() => { IncoColor = false }">
                    
                    <span class="black-line"
                        :style="{ width: showInco ? 14 + 'px' : 0, backgroundColor: IncoColor ? '#49b1f5' : 'black' }"></span>
                    <a href="">
                       {{ textCoverInfo.title }}
                    </a>

                </div>
                <div class="articleInfo">
                    <template v-for="item in arr ">
                        <i class="icon" style="display: flex;align-items: center;justify-content: center;">
                            <svg style="height: 18px;width: 18px;">
                                <use :xlink:href="'#icon-' + textCoverInfo.svgName[item]" fill='#858585'></use>
                            </svg>
                        </i>
                        <span style="font-family: -apple-system, BlinkMacSystemFont, 'Varela Round', Ubuntu, 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', Roboto, sans-serif;
                        font-style: italic;color: #858585;
                        ">
                        
                        {{
                            textCoverInfo.info[item] }}</span>
                        <span v-if="item < arr.length - 1" class="separate"
                            style="margin-left: 5px;color: #858585;">|</span>
                    </template>

                </div>
                <div class="articleContent">{{ textCoverInfo.content }}
                </div>
            </div>
           
        </template>
    </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from "vue"
import { isComputer } from "@/utils/setConstant";

let showInco = ref(false)
let IncoColor = ref(false)
let textCoverInfo = withDefaults(defineProps<{
    image?:string
    svgName?: any,
    info?: any,
    sequential?: number,  //循序
    title?:string,
    content?:string
}>(), {
    image:"../../../4.jpg",
    svgName: ['calendar', 'label'],
    info: ['发布于2024-08-02', "js"],
    sequential: 1,
    title:"Apache EventMesh vs. AWS EventBridge: “产品化” 是开源中间件的出路吗？",
    content:"AWS EventBridge 是 Apache EventMesh 的理想形态吗？在 5 月底的亚马逊云科技中国峰会上，80%的技术议题的项目架构都使用了"
})
let src =  ref()
let cover = ref()

if(textCoverInfo.image!=""){
    src.value = textCoverInfo.image
}else{
    src.value = "../../../4.jpg"
}
src.value = textCoverInfo.image!=""?textCoverInfo.image:"../../../4.jpg"
onMounted(()=>{
 const callback = (item:any)=>{
        const  image = item[0].target
        const data_src = image.getAttribute("data_src")
        image.setAttribute('src',data_src)
        observer.unobserve(image)
    }
    const observer = new IntersectionObserver( callback,{
        threshold: 1
    } )
    observer.observe(cover.value[0])
})
let arrLayout = ref<any>([])
arrLayout.value = textCoverInfo.sequential % 2 == 0 ? ["content", "picture"] : ["picture", "content"]

if(!isComputer.value){
   
    arrLayout.value = ["picture", "content"]
}
let imgHorn = arrLayout.value[0] == "picture" ? true : false
let arr: any = []
const createArr = () => {
    let arr = []
    for (let i = 0; i < textCoverInfo.info.length; i++) {
        arr.push(i)
    }
    return arr
}
arr = createArr()

</script>

<style lang="scss" scoped>

@media screen and (max-width:900px){
    .textShow-container{
       
        flex-direction: column;
        width: 355px;
       
        align-items: center;
        margin-left: 16px;
        height: 400px;
    }
    .content{
        width: 100%;
        padding: 0 10px !important;
        justify-content:flex-start !important;
        .articleTitle{
            font-size: 19px;
            margin-top: 20px;
        }
        .articleInfo{
            margin-top: 12px;
        }
        .articleContent{
            font-size: 14px;
            margin-top: 10px;
        }
    }
    .cover{
        border-top-left-radius: 10px !important;
        border-top-right-radius: 10px !important;
        border-bottom-left-radius: 0px !important;
        width: 100% !important;
        height: 500px !important;
        aspect-ratio: none !important;
        img{
            width: 100% !important;
            height: 100% !important;
        }
    }

}

.articleContent {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 1.5;
    text-align: justify;
    font-size: 14.8px;

}

.articleInfo {
    display: flex;
}

.articleTitle {
    .black-line {
        width: 0px;
        display: inline-block;
        background-color: black;
        transition: width 0.3s;
        height: 3px;
        border-radius: 1px;
        transform: translate3d(0, -8px, 0);
    }

    width: 100%;
    font-size: 1.55em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: justify;
    line-height: 1.4;

}

.textShow-container {

    aspect-ratio: 3.8; //纵横比
    display: flex;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 0.5px rgba(0, 0, 0, 0.1) solid;
}

.articleTitle:hover {
    color: #49b1f5;
}

.textShow-container:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    .picture {
        transform: scale(1.2);
    }
}

.content {
    aspect-ratio: 2.37;
    height: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
}

.cover {
    aspect-ratio: 1.46;
    height: 100%;
    overflow: hidden;

}

.picture {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    overflow: hidden;

}
</style>