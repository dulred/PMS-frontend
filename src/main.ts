import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios" 
import router from "./router"
import store from './store'
import installElementPlus from "./plugins/element"

// 创建vue实例 以及阻止显示生产模式的消息
const vapp = createApp(App,{
  devtools: false,
})
//设置反向代理，前端请求默认发送到 http://localhost:8443/personmis
//使用axios 来完成 ajax请求
//全局注册，之后可在其他组件中通过this.$axios发送数据
axios.defaults.baseURL = "http://localhost:5173/personmis"
//axios挂载到vue示例
vapp.config.globalProperties.$axios = axios

installElementPlus(vapp)

vapp.provide('$axios', axios)

vapp.use(router).use(store).mount("#app")

//验证是否登录
router.beforeEach(async (to, from,next) => {

  //如果路由器需要验证
  if(to.meta.requiresAuth){
    //对路由进行验证
    if (store.state.isLogin == '0') {
      alert("您没有登录，无权访问！", {confirmButtonText: '确定' })
      // 未登录则跳转到登陆界面，query:{ redirect: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    } else { // 已经登陆
      next() //正常跳转到设置好的页面
    }
  }else{
    next()
  }
}
)