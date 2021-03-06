import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


const routes = [

    {
        path: '/',
        name: 'home',
        component: () =>
            import("../views/home.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
        children: [

            {
                path: "/",
                name: "index",
                component: () =>
                    import("../views/index.vue"),
                meta: {
                    keepAlive: false// 需要被缓存
                }

            },


            {
                path: "/block",
                name: "block",
                component: () =>
                    import("../views/block/block.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/blockdetail",
                name: "block",
                component: () =>
                    import("../views/block/blockDetail.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/transaction",
                name: "transaction",
                component: () =>
                    import("../views/transaction/transaction.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/transactiondetail",
                name: "transactiondetail",
                component: () =>
                    import("../views/transaction/transactionDetail.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/address",
                name: "address",
                component: () =>
                    import("../views/address/address.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/addressdetail",
                name: "addressdetail",
                component: () =>
                    import("../views/address/addressDetail.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/chart",
                name: "chart",
                component: () =>
                    import("../views/chart.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/notfound",
                name: "notfound",
                component: () =>
                    import ("../views/notFound.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
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
    linkExactActiveClass: 'actives',
});

export default router;