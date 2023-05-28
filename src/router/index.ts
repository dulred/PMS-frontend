import { createRouter ,createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Test from "../components/Test.vue";

const routes = [

    {
        path:'/',
        // redirect:"/login",
        component:Test
    },
    {
        path: '/login',
        component: Login,
    },

]



const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL), 
    routes
}
)

export default router;

