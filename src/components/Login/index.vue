<template>
    <div class="Login-container" style="display: flex;height: 30rem;width: 60rem;">
        <div class="left boxTransition" :class="{ activeLeft: exchange }"
            style="position: relative;width: 50%;height: 100%;background-color: white;">
          
            <div class="login form contentTransition" :class="{ activeFrom: contentExchange }" >
                  <h2 style="width: 100%;text-align: justify;padding-left: 16%;">欢迎来到</h2>
                  <h1>风风博客的登陆中心</h1>
                <form action="" style="display: flex;flex-direction: column;width: 80%;">
                    <div style="display: flex;">
                        <SVG name="user" fill="black" class="svgStyle" ></SVG>
                        <input type="text" placeholder="请输入账号">
                    </div>
                    <div style="display: flex;">
                        <SVG name="lock" class="svgStyle" ></SVG>
                        <input type="password" placeholder="请输入密码" show-password>
                    </div>
                    
                </form>
                <button class="lbtn">登录</button>
            </div>
            <div class="enroll form contentTransition" :class="{ activeFrom: !contentExchange }"
                style="width: 100%;height: 100%;position: absolute;top: 0;opacity: 0;">
                <h2 style="width: 100%;text-align: justify;padding-left: 16%;">欢迎来到</h2>
                <h1>风风博客的登陆中心</h1>
                <form action="" style="display: flex;flex-direction: column;width: 80%;">
                    <div style="display: flex;"> 
                        <SVG name="user" class="svgStyle" ></SVG>
                        <input type="text" placeholder="请输入账号">
                    </div>
                    <div style="display: flex;">
                        <SVG name="lock" class="svgStyle" ></SVG>
                        <input type="password" placeholder="请输入密码" show-password>
                    </div>
                    <div style="display: flex;">
                        <SVG name="lockTwo" class="svgStyle" ></SVG>
                        <input type="password" placeholder="请再次输入密码" show-password>
                    </div>
                  
                    
                    
                </form>
                <button class="lbtn">注册</button>
            </div>
        </div>
        <div class="right boxTransition" :class="{ activeRight: exchange }"
            style="width: 50%;height: 100%;background-color: rgba(0, 0, 0, 0.3);position: relative;color: aliceblue;">
            <div class="goLogin go contentTransition" :class="{ activeFrom: !contentExchange }"
                style="width: 100%;height: 100%;position: absolute;top: 0;z-index: 1;opacity: 0;">
                <h1>已有账号？</h1>
                <p>请使用您的账号进行登录</p>
                <button class="sbtn" @click="exchangeLocation">登录</button>
            </div>
            <div class="goEnroll go contentTransition" :class="{ activeFrom: contentExchange }" >
                <h1 style="font-size: 30px;">没有账号?</h1>
                <p>立即注册加入我们，和我们一起开始旅程吧</p>
                <button class="sbtn" @click="exchangeLocation">注册</button>

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"
import SVG from "@/components/svgComponent/index.vue"

let exchange = ref(false)
let contentExchange = ref(true)
const exchangeLocation = () => {
    console.log(111)
    exchange.value = !exchange.value
    contentExchange.value = !contentExchange.value
}
</script>

<style lang="scss" scoped>
.form {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.svgStyle{
    position: relative;
    top: -13px;z-index: 2;
    left: 16px;
}
.go {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    opacity: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

h1 {
    font-size: 30px;
}

input {
    margin-bottom: 20px;
    outline: none;
    padding: 5px 20px;
    border-bottom: 1px solid gray;

}

input:focus {
    border-bottom: 1px solid skyblue;
}

h1,
p {
    margin-bottom: 16px;
}

.lbtn {
    width: 80%;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    color: rgba($color: #ffff, $alpha: 0.8);
    height: 3rem;
    border-radius: 30px;
}

.lbtn:hover,
.sbtn:hover {
    color: rgba($color: #ffff, $alpha: 1);
}

.sbtn {
    width: 10rem;
    height: 3rem;
    border-radius: 16px;
    border: 1px solid white;
    color: rgba($color: #ffff, $alpha: 0.8);
}

.activeFrom {
    z-index: 5 !important;
    opacity: 1 !important;
}

.activeLeft {
    transform: translateX(100%);
}

.activeRight {
    transform: translateX(-100%);
}

.contentTransition {
    transition: all .3s;
}

.boxTransition {
    transition: all .6s ease-in-out;
}
</style>