/// <reference types="vite/client" />
//告诉ts所有的.vue文件都因该被当作vue组件来处理 (防止在一个文件，写多个组件，引入时报出无法找到模块xxx，xxx隐式拥有any类型)
declare module "*.vue" {  

    import Vue from 'vue';  

    export default Vue;  

  }