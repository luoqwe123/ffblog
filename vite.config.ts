import { defineConfig, } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入svg需要用到的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({ //command用于检测当前的开发环境

  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      "api/": {
        target:process.env.VITE_SERVICE, //获取数据的服务器地址
        changeOrigin: true, //是否需要代理跨域
        //rewrite: (path) => path.replace(/^\/api/, ''), //路径重写
      },
    },
  },
  build:{
    rollupOptions:{
      //确保 tree shaking 生效
      treeshake:true,
      
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          home: ['@/views/home/index.vue'], // 首页单独打包
        },
      },
    },
    minify: 'terser', // 确保代码压缩
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // 移除 console.log
    //   },
    // },
  }


})
