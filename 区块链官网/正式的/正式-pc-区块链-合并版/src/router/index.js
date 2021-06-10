import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import {
    goPAGE
} from '../utils/utils';
Vue.use(VueRouter);

let classify = goPAGE()
const routes = [
    {
        path: '/',
        redirect: '/' + classify + '/Index'
    },

    {
        path: '/pc/index',
        name: 'index',
        component: () =>
            import("../views/pc/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },

    },
    {
        path: '/pc/secondhome',
        name: 'secondhome',
        component: () =>
            import("../views/pc/secondHome.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
        children: [{
            path: "/pc/block",
            name: "block",
            component: () =>
                import("../views/pc/block/block.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/blockdetail",
            name: "block",
            component: () =>
                import("../views/pc/block/blockDetail.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/transaction",
            name: "transaction",
            component: () =>
                import("../views/pc/transaction/transaction.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/transactiondetail",
            name: "transactiondetail",
            component: () =>
                import("../views/pc/transaction/transactionDetail.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/address",
            name: "address",
            component: () =>
                import("../views/pc/address/address.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/addressdetail",
            name: "addressdetail",
            component: () =>
                import("../views/pc/address/addressDetail.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/chart",
            name: "chart",
            component: () =>
                import("../views/pc/chart.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },
        {
            path: "/pc/notfound",
            name: "notfound",
            component: () =>
                import("../views/pc/notFound.vue"),
            meta: {
                keepAlive: false // 需要被缓存
            }

        },

        ]

    },
    {
        path: '/m/index',
        name: 'home',
        component: () =>
            import("../views/m/home.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
        children: [

            {
                path: "/m/index",
                name: "index",
                component: () =>
                    import("../views/m/index.vue"),
                meta: {
                    keepAlive: false// 需要被缓存
                }

            },


            {
                path: "/m/block",
                name: "block",
                component: () =>
                    import("../views/m/block/block.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/m/blockdetail",
                name: "block",
                component: () =>
                    import("../views/m/block/blockDetail.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/m/transaction",
                name: "transaction",
                component: () =>
                    import("../views/m/transaction/transaction.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/m/transactiondetail",
                name: "transactiondetail",
                component: () =>
                    import("../views/m/transaction/transactionDetail.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/m/address",
                name: "address",
                component: () =>
                    import("../views/m/address/address.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/m/addressdetail",
                name: "addressdetail",
                component: () =>
                    import("../views/m/address/addressDetail.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
            {
                path: "/m/chart",
                name: "chart",
                component: () =>
                    import("../views/m/chart.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }

            },
           

        ]

    },

];

const router = new VueRouter({
    routes,
    linkActiveClass: '',
    linkExactActiveClass: 'active',
});

export default router;