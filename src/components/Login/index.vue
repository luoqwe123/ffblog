<template>
    <div class="Login-container" style="display: flex;height: 30rem;width: 60rem;">
        <div class="left boxTransition" :class="{ activeLeft: exchange }"
            style="position: relative;width: 50%;height: 100%;background-color: white;">

            <div class="login form contentTransition" :class="{ activeFrom: contentExchange }">
                <h2 style="width: 100%;text-align: justify;padding-left: 16%;">欢迎来到</h2>
                <h1>风风博客的登陆中心</h1>
                <form action="" style="display: flex;flex-direction: column;width: 80%;">
                    <div class="formItem">
                        <div style="display: flex;">
                            <SVG name="user" :fill=loginForm.username.inputColor class="svgStyle"></SVG>
                            <input type="text" placeholder="请输入你的邮箱" v-model="loginForm.username.value"
                                :style="{ borderColor: loginForm.username.inputColor == 'black' ? 'gray' : loginForm.username.inputColor }"
                                @focus="errorStyle(loginForm.username)"
                                @blur="(event) => handleBlur(loginForm.username, formObj.loginUsername)">
                        </div>
                        <p class="worn">{{ loginForm.username.wornText }}</p>
                    </div>
                    <div class="formItem">
                        <div style="display: flex;">
                            <SVG name="lock" :fill=loginForm.password.inputColor class="svgStyle"></SVG>
                            <input type="password" placeholder="请输入密码" show-password v-model="loginForm.password.value"
                                :style="{ borderColor: loginForm.password.inputColor == 'black' ? 'gray' : loginForm.password.inputColor }"
                                @focus="errorStyle(loginForm.password)"
                                @blur="(event) => handleBlur(loginForm.password, formObj.loginPassword)">
                        </div>
                        <p class="worn">{{ loginForm.password.wornText }}</p>
                    </div>
                </form>
                <button class="lbtn" @click="handleConfirm(loginForm, 'login')">登录</button>
            </div>
            <div class="enroll form contentTransition" :class="{ activeFrom: !contentExchange }"
                style="width: 100%;height: 100%;position: absolute;top: 0;opacity: 0;">
                <h2 style="width: 100%;text-align: justify;padding-left: 16%;">欢迎来到</h2>
                <h1>风风博客的登陆中心</h1>
                <form action="" style="display: flex;flex-direction: column;width: 80%;">
                    <div class="formItem">
                        <div style="display: flex;">
                            <SVG name="user" :fill="registerForm.username.inputColor" class="svgStyle"></SVG>
                            <input type="text" placeholder="请输入你的邮箱" v-model="registerForm.username.value"
                                :style="{ borderColor: registerForm.username.inputColor == 'black' ? 'gray' : registerForm.username.inputColor }"
                                @focus="errorStyle(registerForm.username)"
                                @blur="(event) => handleBlur(registerForm.username, formObj.registerUsername)">
                        </div>
                        <p class="worn">{{ registerForm.username.wornText }}</p>
                    </div>
                    <div class="formItem">
                        <div style="display: flex;">
                            <SVG name="lock" :fill="registerForm.password.inputColor" class="svgStyle"></SVG>
                            <input type="password" placeholder="请输入密码" v-model="registerForm.password.value"
                                show-password
                                :style="{ borderColor: registerForm.password.inputColor == 'black' ? 'gray' : registerForm.password.inputColor }"
                                @focus="errorStyle(registerForm.password)"
                                @blur="(event) => handleBlur(registerForm.password, formObj.registerPassword)">
                        </div>
                        <p class="worn">{{ registerForm.password.wornText }}</p>
                    </div>
                    <div class="formItem">
                        <div style="display: flex;">
                            <SVG name="locktwo" :fill=registerForm.fPassword.inputColor class="svgStyle"></SVG>
                            <input type="password" placeholder="请再次输入密码" v-model="registerForm.fPassword.value"
                                :style="{ borderColor: registerForm.fPassword.inputColor == 'black' ? 'gray' : registerForm.fPassword.inputColor }"
                                show-password  @focus="errorStyle(registerForm.fPassword)"
                                @blur="(event) => handleBlur(registerForm.fPassword, formObj.registerfPassword)">
                        </div>
                        <p class="worn">{{ registerForm.fPassword.wornText }}</p>
                    </div>
                </form>
                <button class="lbtn" @click="handleConfirm(registerForm, 'register')">注册</button>
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
            <div class="goEnroll go contentTransition" :class="{ activeFrom: contentExchange }">
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
import { data } from "@/stores/modules/user"
import { FfMessage } from "../Message"
import { useRouter } from "vue-router"
import { user } from "@/stores/modules/user"
let userStroe:any  = user()
let $router = useRouter()

let exchange = ref(false)
let contentExchange = ref(true)
let loginForm = ref({
    username: {
        value: '',
        wornText: '',
        inputColor: "black",
    },

    password: {
        value: '',
        wornText: '',
        inputColor: "black",
    }


})
let registerForm = ref({
    username: {
        value: '',
        wornText: '',
        inputColor: "black",
    },
    password: {
        value: '',
        wornText: '',
        inputColor: "black",
    },
    fPassword: {
        value: '',
        wornText: '',
        inputColor: "black",
    }


})
const exchangeLocation = () => {

    exchange.value = !exchange.value
    contentExchange.value = !contentExchange.value
}

let commonRules = {
    username: [
        {
            reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{1,64}\.[a-zA-Z]{2,10}$/,
            message: '邮箱格式不正确'
        },
    ],
    password: [
        {
            reg: /.{6,15}/,
            message: '密码的长度为6到15位'
        },
        {
            reg: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*.)/,
            message: '密码必须包含英文大小写和数字'
        }
    ],
}
interface Irules {
    reg: RegExp,
    message: string
}
//any~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function handleValidtor(formData: any, regArr: Irules[]) {
    for (const item of regArr) {
        if (!item.reg.test(formData.value)) {
            formData.wornText = item.message
            return false
        }
    }
    return true
}

//   any~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let formObj: any = {
    loginUsername: {
        value: loginForm.value.username.value,
        rules: commonRules.username,
        validator: handleValidtor,
        res: false
    },
    loginPassword: {
        value: loginForm.value.password.value,
        rules: commonRules.password,
        validator: handleValidtor,
        res: false
    },
    registerUsername: {
        value: registerForm.value.username.value,
        rules: commonRules.username,
        validator: handleValidtor,
        res: false
    },
    registerPassword: {
        value: registerForm.value.password.value,
        rules: commonRules.password,
        validator: handleValidtor,
        res: false
    },
    registerfPassword: {
        value: registerForm.value.fPassword.value,
        validate: (firstPassword: string, formData: any) => {
             
                if (formData.value != firstPassword) {
                    formData.wornText = "两次输入的密码必须一致"
                    return false
                }
            
            return true
        },
        res: false
    }
}
// any~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function errorStyle(formValue: any) {
    formValue.inputColor = "skyblue"
    formValue.wornText = ''
}
interface IValidateItem {
    value: string,
    rules: RegExp,
    validator: Function,
    res: boolean
}
function handleBlur(formValue: any, validateObj: IValidateItem) {
    let targetObj: any = validateObj
    targetObj.value = JSON.parse(JSON.stringify(formValue.value))
    targetObj.res = targetObj.rules !== undefined ? targetObj.validator(formValue, targetObj.rules) : targetObj.validate(registerForm.value.password.value,formValue)
    formValue.inputColor = 'black'
    if (!targetObj.res) formValue.inputColor = 'red'
}
//any~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function handleConfirm(formData: any, name: string) {
    let flag = false
    flag =  name === "login" 
   
    name = "^" + name
    
    let reg = new RegExp(`${name}`, 'i')
    for (const key in formObj) {
        if (reg.test(key)) {
            if (!formObj[key].res) {
                handleBlur(formData[key.replace(reg, '').toLowerCase()], formObj[key])
                return
            }
        }
    }
    let data:data = {
        name:"",
        password:'',
    }
    let res :any
    if(flag){
        // data:loginData  = {
        //     name:"",
        //     password:'',
        
        // }
        data.name  = formData.username.value
        data.password = formData.password.value
        res  = await userStroe.login(data)
        
    }else{
        // let data:registerData  = {
        //     name:"",
        //     password:'',
        //     password_confirm:""
        // }
        data.name  = formData.username.value
        data.password = formData.password.value
        data["password_confirm"] = formData.fPassword.value
        res  = await userStroe.register(data)
    }
    // console.log(data)
    
    FfMessage({
    message:res,
    type:"success", 
  })

  $router.push({path:"/"})
    // console.log('成功了')
}

</script>

<style lang="scss" scoped>
.form {

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.svgStyle {
    position: relative;
    top: -4px;
    z-index: 2;
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

.login,
.enroll {
    opacity: 0;
}

h1 {
    font-size: 30px;
}

.worn {
    text-align: justify;
    padding: 0 16px;
    margin-bottom: 15px;
    color: red;
}

input {
    margin-bottom: 5px;
    outline: none;
    padding: 2px 20px;
    border-bottom: 1px solid;

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