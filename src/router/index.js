import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(Vuex);
Vue.use(ElementUI)

/*
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
*/

export default new Router({
    routes: [
        {
            path: '/customerHome',
            meta: {
                title: '首页'
            },
            component: (resolve) => require(['../components/customer/customer_Home'], resolve)
        },
        {
            path: '/list',
            meta: {
                title: '首页'
            },
            component: (resolve) => require(['../components/customer/customer_list'], resolve)
        },
        {
            path: '/product/:id',
            meta: {
                title: '商品详情'
            },
            component: (resolve) => require(['../components/customer/customer_product_view.vue'], resolve)
        },
        {
            path: '/cart',
            meta: {
                title: '购物车'
            },
            component: (resolve) => require(['../components/customer/customer_cart.vue'], resolve)
        },
        {
            path: '/login/:loginStatus',
            meta: {
                title: '登录注册'
            },
            component: (resolve) => require(['../components/customer/login.vue'], resolve)
        },
        {
            path: '/customerPerson',
            meta: {
                title: '个人中心'
            },
            component: (resolve) => require(['../components/customer/customer_personal'], resolve)
        },
        {
            path: '/customerOrder2',
            meta: {
                title: '我的订单2'
            },
            component: (resolve) => require(['../components/customer/orderTry'], resolve)
        },
        {
            path: '*',
            redirect: '/login/login',
            //component: (resolve) => require(['../components/customer/login'], resolve)
            component: (resolve) => require(['../components/customer/customer_Home.vue'], resolve)
        }
    ],
    mode: "history" // 去除访问时候带#问题
})

