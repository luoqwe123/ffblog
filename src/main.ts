import { createApp } from 'vue'
import "./styles/tail.css"
import  './styles/globalStyle.scss'

import './style.css'
import App from './App.vue'
import pinia from './stores/index'
import router from './router'
import 'virtual:svg-icons-register'
import "./perminsstion"


const app = createApp(App)


app
.use(router)
.use(pinia)
.mount('#app')
