import Vue from "vue";
import VueRouter from "vue-router";
// import index from '../views/Index.vue';

Vue.use(VueRouter);
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/',
        name: 'home',
        component: resolve => require(['../views/Home.vue'], resolve),
        meta: {
            keepAlive: false // 需要被缓存
        },
        children: [
            {
                path: '/index',
                name: 'index',
                component: resolve => require(['../views/Index.vue'], resolve),
                meta: {
                    keepAlive: false // 需要被缓存
                }
            },
            {
                path: '/FAQ',
                name: 'FAQ',
                component: () =>
                    import("../views/FAQ.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }
            },
            {
                path: "/about",
                name: "about",
                component: () =>
                    import("../views/About.vue"),
                meta: {
                    keepAlive: false// bu需要被缓存
                }
            },

            {
                path: '/media',
                name: 'media',
                component: () =>
                    import("../views/Media.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }
            },
            {
                path: "/partner",
                name: "partner",
                component: () =>
                    import("../views/Partner.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }
            },
            {
                path: "/developer",
                name: "developer",
                component: () =>
                    import("../views/develop/Developer.vue"),
                meta: {
                    keepAlive: false // 需要被缓存
                }
            },
        ]
    },


    {
        path: "/proposal",
        name: "proposal",
        component: () =>
            import("../views/proposal/Proposal.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/proposaldetail",
        name: "proposaldetail",
        component: () =>
            import("../views/proposal/ProposalDetail.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/toproposal",
        name: "toproposal",
        component: () =>
            import("../views/proposal/ToProposal.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
   
    {
        path: "/vote",
        name: "vote",
        component: () =>
            import("../views/vote/Vote.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/votedetail",
        name: "votedetail",
        component: () =>
            import("../views/vote/VoteDetail.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },

    {
        path: "/developerdetail",
        name: "developerdetail",
        component: () =>
            import("../views/develop/DeveloperDetail.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/detail",
        name: "detail",
        component: () =>
            import("../views/Detail.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: '/login',
        component: () =>
            import("../components/common/Login.vue"),
    },
    {
        path: '/ceshi',
        component: () =>
            import("../views/ceshi.vue"),
    },
    {
        path: "/forgetpassword",
        name: "forgetpassword",
        component: () =>
            import("../components/common/ForgetPassword.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/swiper",
        name: "swiper",
        component: () =>
            import("../components/common/swiper.vue"),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: "/fastoken",
        name: "fastoken",
        component: () =>
            import("../components/common/Fastoken.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/fastokensecond",
        name: "fastokensecond",
        component: () =>
            import("../components/common/FastokenSecond.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },

    {
        path: '/header',
        component: () =>
            import("../components/common/header.vue"),
    },



];

const router = new VueRouter({
  
   
    routes,
});

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
     console.log(to.path);
     
    // 访问登录页，放行
   
        next();
       
    
})

export default router;