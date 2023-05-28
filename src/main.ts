import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios" 
import router from "./router"
import installElementPlus from "./plugins/element"

// 创建vue实例 以及阻止显示生产模式的消息
const vapp = createApp(App,{
  devtools: false,
})
//设置反向代理，前端请求默认发送到 http://localhost:8443/personmis
//使用axios 来完成 ajax请求
//全局注册，之后可在其他组件中通过this.$axios发送数据
axios.defaults.baseURL = "http://localhost:8443/personmis"
//axios挂载到vue示例
vapp.config.globalProperties.$axios = axios

installElementPlus(vapp)

vapp.use(router).mount("#app")

