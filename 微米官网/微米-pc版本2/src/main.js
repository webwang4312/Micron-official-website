// import './babel';
import Vue from "vue";
import 'babel-polyfill';
// import Es6Promise from 'es6-promise';
// Es6Promise.polyfill();
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";
import 'lib-flexible';
import VueParticles from 'vue-particles';
Vue.use(VueParticles);
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
import animated from 'animate.css' // npm install animate.css --save安装，在引入

Vue.use(animated)
// video引入
// import VueVideoPlayer from "vue-video-player";
// import "video.js/dist/video-js.css";
// Vue.use(VueVideoPlayer);
// import './html5';
import Paginate from 'vuejs-paginate';
// import { log } from './babel';
Vue.component('paginate', Paginate);
// video引入
Vue.config.productionTip = false;
// 防止重复点击
import preventClick from '@assets/clickStatefrom';  // 根据自己的路径
Vue.use(preventClick);
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);
// http://115.29.149.102:80/
// axios.defaults.baseURL = "http://47.116.69.138:80/";
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;
// Vue.use(axios);
// Add a request interceptor
Vue.prototype.$http = axios;
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
Vue.use(VueSlickCarousel);
//轮播图
import Swiper from "swiper";

import 'swiper/dist/css/swiper.min.css';

// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//     var config = err.config;
//     // If config does not exist or the retry option is not set, reject
//     if (!config || !config.retry) return Promise.reject(err);

//     // Set the variable for keeping track of the retry count
//     config.__retryCount = config.__retryCount || 0;

//     // Check if we've maxed out the total number of retries
//     if (config.__retryCount >= config.retry) {
//         // Reject with the error
//         return Promise.reject(err);
//     }
//     // Increase the retry count
//     config.__retryCount += 1;
//     // Create new promise to handle exponential backoff
//     var backoff = new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve();
//         }, config.retryDelay || 1);
//     });
//     // Return the promise in which recalls axios to retry the request
//     return backoff.then(function () {
//         return axios(config);
//     });
// });
// // 页面跳转到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
import { setCookie, getCookie, clearCookie } from './assets/cookie';
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");