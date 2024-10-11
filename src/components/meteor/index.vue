<template>
    <div class="meteor-container">
        <canvas ref="cvs"></canvas>

    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from "vue"
import { offMeteor } from "@/perminsstion";
let cvs = ref()
const meteorsProperties = withDefaults(defineProps<{
    startCount?: number,

}>(), {
    startCount: 40,

})
onMounted(() => {
 
    const ctx = cvs.value.getContext("2d")

    cvs.value.width = window.innerWidth
    cvs.value.height = window.innerHeight * 0.56
    window.addEventListener("resize", () => {
        cvs.value.width = window.innerWidth
        cvs.value.height = window.innerHeight * 0.56
    })


    const getRandom = (start: number, end: number) => {
        return Math.round(Math.random() * (end - start)) + start
    }
    const meteors = ref<any>([])

    const getColor = () => {
        const allColor = [[0, 255, 255], [255, 255, 255], [255, 192, 203]]
        const index = Math.floor(Math.random() * 3)
        return allColor[index]
    }
    const addStart = () => {
        meteors.value.push(
            {
                lines: [{
                    x: getRandom(0, cvs.value.width),
                    y: getRandom(0, cvs.value.height),

                }],
                age: 0,
                life: getRandom(0, 100) + 100,
                color: getColor()
            }
        )
    }
    const createMeteor = () => {
        for (let i = 0; i < meteorsProperties.startCount; i++) {

            addStart()
        }
    }
    createMeteor()


    const draw = () => {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight * 0.56)
        for (let i = 0; i < meteors.value.length; i++) {
            let meteor = meteors.value[i]
            let line = meteor.lines
            const colorNumber = meteor.color

            for (let j = 0; j < line.length; j++) {


                ctx.fillStyle = `rgba(${colorNumber[0]},${colorNumber[1]},${colorNumber[2]},${j / line.length})`
                ctx.fillRect(line[j].x, line[j].y, 4, 4)

            }
            let head = line[line.length - 1]

            ctx.fillRect(head.x, head.y, 4, 4)
            if (meteor.age <= meteor.life / 2) {
                line.push({
                    x: head.x - 1,
                    y: head.y + 0.3
                })

            } else {
                line.shift()
            }
            meteor.age++
            if (meteor.age > meteor.life) {
                meteors.value.splice(i, 1)
                addStart()

            }
        }
    }
    let timer = setInterval(draw, 1)
    watch(() => offMeteor.value, () => {
        if (offMeteor.value) {
            clearInterval(timer)
        }

    })




})



</script>

<style lang="scss" scoped></style>