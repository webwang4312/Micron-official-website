import Vue from "vue";
import VueRouter from "vue-router";
import index from '../views/Index.vue';
Vue.use(VueRouter);
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }
const routes = [{
    path: '/',
    redirect: '/index'
}, {
    path: "/slider",
    name: "slider",
    component: () =>
        import("../components/common/slider.vue"),

},
{
    path: "/login",
    name: "login",
    component: () =>
        import("../components/common/Login.vue"),

},
{
    path: "/forgetpassword",
    name: "forgetpassword",
    component: () =>
        import("../components/common/ForgetPassword.vue"),

},
{
    path: "/fastoken",
    name: "fastoken",
    component: () =>
        import("../components/common/Fastoken.vue"),

},
{
    path: "/fastokensecond",
    name: "fastokensecond",
    component: () =>
        import("../components/common/FastokenSecond.vue"),

},
{
    path: "/votenumber",
    name: "votenumber",
    component: () =>
        import("../components/common/voteNumber.vue"),

},
{
    path: '/index',
    name: 'index',
    component: index,

},
{
    path: "/about",
    name: "about",
    component: () =>
        import("../views/About.vue"),

},
{
    path: "/proposal",
    name: "proposal",
    component: () =>
        import("../views/proposal/Proposal.vue"),
},
{
    path: "/proposaldetail",
    name: "proposaldetail",
    component: () =>
        import("../views/proposal/ProposalDetail.vue"),

},
{
    path: "/toproposal",
    name: "toproposal",
    component: () =>
        import("../views/proposal/Toproposal.vue"),

},
{
    path: "/vote",
    name: "vote",
    component: () =>
        import("../views/vote/Vote.vue"),

},
{
    path: "/votedetail",
    name: "votedetail",
    component: () =>
        import("../views/vote/VoteDetail.vue"),

},
{
    path: "/developer",
    name: "developer",
    component: () =>
        import("../views/develop/Developer.vue"),

},

{
    path: '/FAQ',
    name: 'FAQ',
    component: () =>
        import("../views/FAQ.vue"),

},
{
    path: '/news',
    name: 'news',
    component: () =>
        import("../views/Media.vue"),

},
{
    path: "/partner",
    name: "partner",
    component: () =>
        import("../views/Partner.vue"),

},
{
    path: "/detail",
    name: "detail",
    component: () =>
        import("../views/Detail.vue"),
},


];

const router = new VueRouter({
    routes,
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0}
    // },
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            $(function() {
                // console.log('haha')
                $(window).scrollTop(0);
                
             });
             window.scrollTo(0,0)
            return { x: 0, y: 0 }
        }
    }
});

export default router;