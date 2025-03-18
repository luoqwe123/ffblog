<template>
  <div class="container" style="width: 100vw;height: 100vh;">
    <div style=" width: 100%;height: 100vh;margin-top: 10px;display: flex;flex-direction: column;align-items: center;">
      <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc;width: 100%;;display: flex;flex-wrap: nowrap;
        justify-content: center;" />
      <div class="content" style="margin-top: 20px;height: 72%;display: flex;flex-direction: column; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;border: 0.5px rgba(0, 0, 0, 0.1) solid;">
        <input type="text" placeholder="请输入标题" v-model="title"
          style="border-bottom: 1px solid #ccc;padding-left: 10px;margin-top: 10px;width: 100%;height: 55px;outline: none;">
        <Editor :defaultConfig="editorConfig" v-model="valueHtml"
          style="height: 65vh; overflow-y: hidden;width: 100%;text-align: justify;border-radius: 10px;"
          @onCreated="handleCreated">
        </Editor>
      </div>
      <div class="prop" style="padding: 20px;margin-top: 20px;height: 340px;display: flex;flex-direction: column;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;border: 0.5px rgba(0, 0, 0, 0.1) solid;align-items: start;justify-content: space-around;">
        <div class="label" style="margin-top: 8px;margin-bottom: 8px;">
          <label style="opacity: 0.6;font-size: medium;">文章标签：</label>
          <select name="" id="" v-model="label" style="outline: none;">
            <option :value=label>
              <span>{{ labelText }}</span>
            </option>
            <template v-if="categoryInfo.length">
              <option :value=item.id v-for="item in categoryInfo" @click="label = item.id">
                <span>{{ item.title }}</span>
              </option>
            </template>
          </select>
        </div>
        <div class="addCover" style=" display: flex;margin-top: 12px;width: 100%;height: 200px;">
          <label for="" style="opacity: 0.6;font-size: medium;height: 80px">
            <span>添加封面：</span>
          </label>
          <button :style="{ backgroundColor: '#f7f7f7', width: '65%', height: '85%', }" @click="addCover">
            <div v-if="!imageUrl">
              <i style="opacity: 0.6;font-size:larger;">+</i>
              <p style="font-size: small;opacity: 0.6;">添加文章封面</p>
            </div>
            <img :src=imageUrl alt="" v-if="imageUrl" style="width: 100%;height: 100%;object-fit: cover;">
          </button>
          <input type="file" ref="ipt" style="display: none;" accept=".png,.jpg,.jpeg,.gif" @change="changeImage">
        </div>
        <div style="width: 100%; display: flex; justify-content: center; align-items: center; ">
          <div class="confirm" id="fixedSend" @click="fixedSend"
            style="cursor: pointer;height: 44px;width: 100px;border-radius: 20px;color: #999AAA;padding: 8px;border-width: 2px;margin-right: 40px;">
            定时发布</div>
          <div class="confirm" @click="send"
            style="cursor: pointer;height: 40px;width: 96px; background-color: #fc5531;border-radius: 20px;color: white;padding: 8px;">
            发布博客</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { articleStore } from '@/stores/modules/aticles';
import { categoryStore } from '@/stores/modules/category';
import { useRoute, useRouter } from 'vue-router';
import { FfMessage } from '../Message';
let $route = useRoute()
let $router = useRouter()

let store = articleStore()
let cStore = categoryStore()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
let labelText = ref("添加文章标签")
// 内容 HTML
const valueHtml = ref()
let title = ref()
let label = ref()
let ipt = ref()
let imageUrl = ref()
let categoryInfo = ref<any>([])
const getCategory = async () => {
  let id = $route.params.id
  if (id != undefined) {
    let res = await store.queryArticle(+id)
    labelText.value = res.data.category.title
    label.value = res.data.categoryId
    title.value = res.data.title
    valueHtml.value = res.data.content
    imageUrl.value = res.data.image == "" ? "../../../4.jpg" : res.data.image

  }
  let res = await cStore.getCategorys()
  for (const item of res.data) {
    categoryInfo.value.push(item)
  }



}

getCategory()
const addCover = () => {
  ipt.value.click()

  //console.log(ipt.value)
}
const changeImage = () => {
  const files = ipt.value.files

  let size = files[0].size / 1024 / 1024
  if (size > 7) {
    return false
  }
  if (files.length) imageUrl.value = URL.createObjectURL(files[0])

}

// watch(() => label.value, () => {
//   console.log(label.value)
// })

const toolbarConfig = {}
const editorConfig: any = { placeholder: '此刻的想法...', MENU_CONF: {} }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: string) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const fixedSend = () => {
  FfMessage({
    message: "暂未开放",
    type: "error",
  })
}
const send = async () => {
  let files = ipt.value.files[0]
  let data: any = {}
  data.title = title.value
  data.content = valueHtml.value
  data.categoryId = label.value
  if (files != undefined) {
    console.log(11)
    let res = await store.uploadImages(files)
    data.file = "http://localhost:3000/" + res
  }

  let response
  if ($route.path == "/editor") {
    response = await store.addArticles(data)
  } else {
    response = await store.updateArticles(+$route.params.id, data)
  }


  FfMessage({
    message: response,
    type: "success",
  })

  $router.push({ path: "/" })
}
type InsertFnType = (url: string, alt: string, href: string) => void
editorConfig.MENU_CONF['uploadImage'] = {
  server: "http://localhost:3000/api/upload/image",

  fieldName: 'file',  //即为发送请求需要的参数名
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 2 * 1024 * 1024, // 2M

  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 10,

  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: [],
  customInsert(res: any, insertFn: InsertFnType) {
    // customInsert(res, insertFn) {                  
    // res 即服务端的返回结果
    // 从 res 中找到 url alt href ，然后插入图片
    insertFn("http://localhost:3000/" + res.data.path, res.data.originalname, res.data.filename)
  },


  // 超时时间，默认为 10 秒
  timeout: 5 * 1000, // 5 秒
}



</script>

<style lang="scss" scoped>
.content{
  width: 80%;
}
.prop{
  width: 50%;
}
@media screen and (max-width: 768px) {
  .content{
    width: 90%;
  }
  .prop {
    width: 90%;
  }
}
</style>