import { createRouter ,createWebHistory } from "vue-router";
import Test from "../components/Test.vue";

const routes = [

    {
        name:"/index",
        path:'/',
        redirect:"/login",
    },
    {   
        name:"Login",
        path: '/login',
        component: ()=>import("../views/Login.vue"),
        meta: { requiresAuth: false }
    },
    {
        name:"Department",
        path: '/department',
        component: ()=>import("../views/Department.vue"),
        meta: { requiresAuth: true }
      },
      {
        name:"AddDepartment",
        path: '/adddepartment',
        component: ()=>import("../views/AddDepartment.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"Test",
        path: '/test',
        component:Test,
        meta: { requiresAuth: true }
    },

]



const router = createRouter(
    {
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes
    }
)

export default router;

