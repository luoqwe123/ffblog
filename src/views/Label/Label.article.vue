<template>

    <div class="home" style="width: 100%;height: 100vh;">
        <div class="part1" style="width: 100%;height: 30%;background-image: url('../../../public/152.jpg');background-size: cover;
            display: flex;justify-content: center;align-items: center;font-size: 30px;color: #49b1f5;">
            {{ title }}</div>
        <div class="part2" :ref=partTwo>
            <div class="left mr-3 2xl:mr-8" style="margin-top: 10px;">
                <template v-if="articleInfo.length != '0'">
                    <template v-for="item in articleInfo" :key="item.id">
                        <ArticleCover @click="showArticle(item.id)" style="margin-top: 12px;" :sequential="item.id"
                            :title="item.title" :content="item.content" :info=[item.createdAt,title] :image=item.image>
                            >
                        </ArticleCover>
                    </template>

                </template>
                <template v-if="articleInfo.length != '0'">
                    <Pagination :total="articleInfo.length" :pageSize="row" v-model:current_page="page"
                        @click="handleArticle(page, row)" style="width: 100%;display: flex;justify-content: center;">
                    </Pagination>
                </template>

            </div>
            <div class="right " style="margin-left: 10px;">
                <Avatar style="margin-top: 20px;" :length=articleMeta></Avatar>
                <Poem style="margin-top: 10px;"></Poem>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>

import Pagination from "@/components/Pagination/index.vue"
import ArticleCover from "@/components/textCover/index.vue"
import Avatar from "@/components/avatar/index.vue"
import Poem from "@/components/poem/index.vue"
import { articleStore } from "@/stores/modules/aticles/index"

import { ref, } from "vue"
import { row } from "@/utils/setConstant"
import dayjs from "dayjs"
import { useRoute, useRouter } from "vue-router"
import { categoryStore } from "@/stores/modules/category"





let $router = useRouter()
let $route = useRoute()
let controlArticle: any = articleStore()
let cStore = categoryStore()
let page = ref<number>(1)
let articleInfo = ref<any>([])
let articleMeta = ref<any>([])
let partTwo = ref()
let title = ref()

const handleArticle = async (page: number, row: number) => {
    let res = await controlArticle.getArticleList(1, 1)
    let response = await cStore.getOneCategory(+$route.params.id)
    title.value = response.data.title
    let flag = (page - 1) * row
    let i = 0;
    for (const index in response.data.articles) {
        if (Number(index) >= flag) {
            articleInfo.value.push(response.data.articles[index])
            i++
        }
        if (i >= row) break
    }
    if (!articleInfo.value.length) {
        articleMeta.value.push(res.meta.total)
        articleMeta.value.push(res.meta.categoryTotal)


    }

    for (const item of articleInfo.value) {

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
    justify-content: center;
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