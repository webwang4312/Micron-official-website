import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


const routes = [

    {
        path: '/',
        name: 'index',
        component: () =>
            import("../views/index.vue"),
        meta: {
            keepAlive:false// 需要被缓存
        },
        
    },
    {
        path: '/secondhome',
        name: 'secondhome',
        component: () =>
            import("../views/secondHome.vue"),
        meta: {
            keepAlive:false// 需要被缓存
        },
        children: [
        {
            path: "/block",
            name: "block",
            component: () =>
                import("../views/block/block.vue"),
            meta: {
                keepAlive: false// 需要被缓存
            }
    
        },
        {
            path: "/blockdetail",
            name: "block",
            component: () =>
                import("../views/block/blockDetail.vue"),
            meta: {
                keepAlive: false// 需要被缓存
            }
    
        },
        {
            path: "/transactiondetail",
            name: "transactiondetail",
            component: () =>
                import("../views/transactionDetail.vue"),
            meta: {
                keepAlive: false// 需要被缓存
            }
    
        },
        
    ]
        
    },
    // children: [
    //     {
    //         path: "/",
    //         name: "index",
    //         component: () =>
    //             import("../views/index.vue"),
    //         meta: {
    //             keepAlive: false// 需要被缓存
    //         }
    
    //     },
        
    // ]

];

const router = new VueRouter({
    routes,
    linkActiveClass: '',
    linkExactActiveClass: 'active',
});

export default router;