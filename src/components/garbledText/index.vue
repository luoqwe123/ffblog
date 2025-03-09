<template>
    <div class="garled-container">
        <div :style="{ textAlign: 'left',color:textColor,padding:'0 10px'}" class="garbled">
            <a :style="{fontSize:lineSize+'px',}">{{ htmlStr }}
                <span class="textIcon" :style="{fontSize:lineSize}">{{ textIcon }}</span>
            </a>
           
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"

const getGarbledValue = withDefaults(defineProps<{
    texts?: any,   // texts?: Record<string, unknown> 如果类型是对象
    addTextTime?: number,
    deletTextTime?: number,
    lineFlashTime?: number,
    lineFlashCount?: number,
    textColor?: string,
    wordSize?: string,
    lineSize?: number,

}>(), {
    texts: [
        '欢迎来到风风站，在这段旅途你将看到风风的各种经历。',
        'Welcome to Fengfeng Station, where you will see the various experiences of Fengfeng',
    ],
    addTextTime: 180,
    deletTextTime: 100,
    lineFlashTime: 400,
    lineFlashCount: 4,
    lineSize:30


})
let textIcon = ref<string>("_")
let htmlStr = ref<string>("")

let animateText = (currentText: number, index: number, adding: boolean) => {

    let timer = setInterval(() => {
        if (adding) {
            htmlStr.value += getGarbledValue.texts[currentText][index]
            index++;
            if (index >= getGarbledValue.texts[currentText].length) {
                clearInterval(timer)
                let lineChangeTimer = setInterval(() => {
                    textIcon.value = textIcon.value == '_' ? '' : '_'

                }, getGarbledValue.lineFlashTime)
                setTimeout(() => {
                    clearInterval(lineChangeTimer)
                    animateText(currentText, index, false)
                }, getGarbledValue.lineFlashTime * getGarbledValue.lineFlashCount + 160)
            }
        } else {
            index--;
            if (index === 0) {
                htmlStr.value = ''
                clearInterval(timer)
                currentText = (currentText + 1) >= getGarbledValue.texts.length ? 0 : currentText + 1
                animateText(currentText, 0, true)
            } else {
                htmlStr.value = getGarbledValue.texts[currentText].substring(0, index)
            }
        }
    }, adding ? getGarbledValue.addTextTime : getGarbledValue.deletTextTime)
}

let useGarbled = () => {
    let currentText = ref<number>(0)
    let index = 0;
    animateText(currentText.value, index, true)
}

useGarbled()
</script>

<style lang="scss" scoped>
.garled-container{
    width: 100%;
    display: flex;
    justify-content: center;
}
.garbled{
    display: flex;
    justify-content: center;
    width: 80%;
}

</style>