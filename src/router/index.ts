import { createRouter ,createWebHistory } from "vue-router";

const routes = [

    {
        name:"/index",
        path:'/',
        redirect:"/login",
    },
    {   
        name:"Login",
        path: '/login',
        component: ()=>import("@/views/Login.vue"),
        meta: { requiresAuth: false }
    },
    {
        name:"Department",
        path: '/department',
        component: ()=>import("@/views/Department.vue"),
        meta: { requiresAuth: true }
      },
      {
        name:"AddDepartment",
        path: '/addDepartment',
        component: ()=>import("@/views/AddDepartment.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"Post",
        path: '/post',
        component: ()=>import("@/views/Post.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"AddPost",
        path: '/addPost',
        component: ()=>import("@/views/AddPost.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"Staff",
        path: '/staff',
        component: ()=>import("@/views/Staff.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"AddStaff",
        path: '/addStaff',
        component: ()=>import("@/views/AddStaff.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"PeroidOp",
        path: '/peroidOp',
        component: ()=>import("@/views/PeroidOp.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"AddTransferStaff",
        path: '/addTransferStaff',
        component: ()=>import("@/views/AddTransferStaff.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"TransferStaff",
        path: '/transferStaff',
        component: ()=>import("@/views/TransferStaff.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"AddQuit",
        path: '/addQuit',
        component: ()=>import("@/views/AddQuit.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"Quit",
        path: '/quit',
        component: ()=>import("@/views/Quit.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"NewStaffReport",
        path: '/newStaffReport',
        component: ()=>import("@/views/NewStaffReport.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"QuitStaffReport",
        path: '/quitStaffReport',
        component: ()=>import("@/views/QuitStaffReport.vue"),
        meta: { requiresAuth: true }
    },
    {
        name:"TransferStaffReport",
        path: '/transferStaffReport',
        component: ()=>import("@/views/TransferStaffReport.vue"),
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

