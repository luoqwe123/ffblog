<template>
    <div class="picture-container">
        <div class="carousel">
            <ul class="carousel-inner" @wheel="scroll" :style="{
                transform: `translateX(${mobile}rem)`
            }">
                <li v-for="(item, key) in image" :key=key @click="select(key)"
                    :style="setLiStyle(key)">
                    <img :src=(baseUrl+item) alt="" :style="imageStyle(key)" :class="{ active: key == active }">
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>

import {  ref } from 'vue';
let image = ['119jpg.jpg', "152.jpg", "one.jpg", "168.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"]
let baseUrl = "../../../"
let active = ref(2)
let activeZ = ref(200)
let mobile = ref(0)
let time: any;
const scroll = (event: any) => {
    clearTimeout(time)
    time = setTimeout(() => {
        if (event.deltaY > 0) {
            if(active.value<image.length)
            active.value++
            if (mobile.value < -130) return;
            mobile.value -= 36
            
        } else if (event.deltaY < 0) {
            if(active.value>0){
                active.value--
            }
           
            if (mobile.value >= 29){
                return;
            } 
            mobile.value += 36
        }
    }, 80)
}
const select = (key: any) => {
    active.value = key
}
const setLiStyle = (key:number)=>{
    let minus1 = active.value - key
    let minus2 = key - active.value
    let count = activeZ.value - (active.value > key ? minus1 : minus2) * 120
    return{
        transform: `translate3d(${key==0?0:key * 500}px,0px,${count}px)`
    }
}
const imageStyle = (key: any) => {
    let minus1 = active.value - key
    let minus2 = key - active.value
    let count = 1 - (active.value > key ? minus1 : minus2) * 0.3
    if ((minus1 > 0 && minus1 < 3) || ((minus2 > 0 && minus2 < 3))) {
        if (count > 0) {
            return {
                filter: `brightness(${count})`
            }
        }
        
    }else {
            return {
                filter: `brightness(0.2)`
            }
        }

}
</script>

<style lang="scss" scoped>
.picture-container {
    display: flex;
    height: 100vh;
    margin: 0;
    background-color: rgba( #333,0.7);
}

.carousel {
    width: 100%;
    height: 100%;
    perspective: 1000px;
    position: relative;
    overflow: hidden;
    will-change: scroll-position;
}

.carousel-inner {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: transform 1s linear;
    display: flex;
    align-items: center;
    white-space: nowrap;
  
}

li {
    position: absolute;
    width: 580px;
    height: 500px;
    background-color: aliceblue;
    border-radius: 10px;
    transition: all 0.5s ease;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        transition: all .5s;

    }

}

li:hover {
    img {
        transform: scale(1.2);
    }
}

.active {
    filter: brightness(1) !important;

}


// .a {
//     transform:  translate3d(-850px,0px,-100px);
//     img {
//         filter: brightness(0.4);
//     }

// }

// .b {
//     transform:  translate3d(0px,0px,0px);
//     img {
//         filter: brightness(1);
//     }
// }

// .c {
//     transform:  translate3d(850px,0px,-100px);
//     img {
//         filter: brightness(0.4);
//     }
// }</style>