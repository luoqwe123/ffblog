<template>

  <div class="home">

    <div class="home-container">

      <div class="top-part">
        <Meteor :startCount='starCount' />
      </div>
      <div class="main">
        <GarbledText textColor="white" :lineSize="textSize"></GarbledText>
      </div>

      <div class="floor">
        <Icon name="downIcon" fill="white" width="30" height="30"></Icon>
      </div>
    </div>
    <div class="part2" :ref=partTwo style="padding: 0 10px;" @wheel="handleScroll">
      <div class="part2-main" style="display: flex;width: 100%;justify-content: center;">
        <div class="part2-left" style="display: flex;flex-direction: column;align-items: center;min-width: 550px;">
          <template v-if="articleInfo?.data">
            <template v-for="item in articleInfo.data" :key="item.id">
              <ArticleCover @click="showArticle(item.id)" style="margin-top: var(--margin-top);" :sequential="item.id"
                :title="item.title" :content="item.content" :info=[item.createdAt,item.category.title]
                :image=item.image>
              </ArticleCover>
            </template>
          </template>
        </div>
        <div class="right " style="margin-left: 6px;align-items: center;display: flex;flex-direction: column;"
          v-if="!isMobile">
          <Avatar style="width: 360px;height: 380px;margin-top: var(--margin-top);" :info=articleMeta></Avatar>
          <Poem style="margin-top: 10px;"></Poem>
        </div>
      </div>
      <div class="part2-floor" style="width: 100%;display: flex;justify-content: center;align-items: center;">
        <template v-if="articleInfo?.meta">
          <Pagination :total="articleInfo.meta.total" :pageSize="articleInfo.meta.page_row" v-model:current_page="page"
            @click="handleArticle(page, row)" style="width: 100%;display: flex;justify-content: center;"></Pagination>
        </template>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import Meteor from "@/components/meteor/index.vue"
import Icon from "@/components/svgComponent/index.vue"
import GarbledText from "@/components/garbledText/index.vue"
import Pagination from "@/components/Pagination/index.vue"
import Avatar from "@/components/avatar/index.vue"
import Poem from "@/components/poem/index.vue"
import { articleStore } from "@/stores/modules/aticles/index"
import "./index"
import { ref, computed, } from "vue"
import { row } from "@/utils/setConstant"
import dayjs from "dayjs"
import { useRouter } from "vue-router"
import { useScreenSize } from "@/hooks/useSreenSize"
import ArticleCover from "@/components/textCover/index.vue"
const { isMobile } = useScreenSize()
const startArticleNum = ref<number>(4)
interface articleInfo {
  code: number,
  data: object[]
  meta: object
}


let starCount = computed(() => {
  return !isMobile.value ? 40 : 20
})
let textSize = computed(() => {
  return !isMobile.value ? 30 : 16
})
let $router = useRouter()
let controlArticle: any = articleStore()
let page = ref<number>(1)
let articleInfo = ref()
let articleMeta = ref<any>({})
let partTwo = ref()


const handleScroll = ()=>{
  if(partTwo.value){
    console.log(partTwo.value.scrollTop)
  }
}
const handleArticle = async (page: number, row: number) => {
  let res = await controlArticle.getArticleList(page, row)
  articleInfo.value = res
  articleMeta.value['文章'] = res.meta.total
  articleMeta.value['标签'] = res.meta.categoryTotal
  for (const item of articleInfo.value.data) {
    item.content = item.content.replace(/<\/?.+?>/g, "")
    item.createdAt = dayjs(item.createdAt).format("YYYY-MM-DD")
  }
}
handleArticle(page.value, row)

const showArticle = (id: any) => {

  $router.push({
    name: "showArticle",
    params: { id }
  })

}




</script>

<style lang="scss" scoped>
.part2 {
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;

}



.top-part {
  position: absolute;
  top: 30px;
  z-index: 2;
}

.main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  text-align: justify;
}

.home-container {
  height: 100vh;
  width: 100%;
  background: url(../../../back.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
}

.picture {
  background-color: white;
  height: 100px;
  width: 100px;
}

.floor {
  display: flex;
  justify-content: center;
  animation: down 1.6s linear infinite;
  position: absolute;
  width: 100%;
  bottom: 16px;
}

@keyframes down {
  0% {
    bottom: 16px;
    opacity: 1;
  }

  50% {
    bottom: 0;
    opacity: 0.4;
  }

  100% {
    bottom: 16px;
    opacity: 1;
  }
}
</style>