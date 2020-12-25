import Vue from "vue";
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";
import 'lib-flexible';
import './jquery';
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'});
// Element Ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// video引入
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
Vue.use(VueVideoPlayer);
Vue.config.productionTip = false;
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
//axios.defaults.timeout = 30000; // 请求超时
// axios.defaults.baseURL = "http://106.14.125.210:8003"; // 线上环境
//axios.defaults.baseURL = "http://47.75.93.221:8003"; // 测试环境
// axios.defaults.baseURL = "http://192.168.1.212:8003"; // 本地环境 // api 即上面 vue.config.js 中配置的地址
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "./request/utils/axios-api.js";
Vue.prototype.$http = axios;
Vue.prototype.$getRequest = getRequest;
Vue.prototype.$postRequest = postRequest;
Vue.prototype.$putRequest = putRequest;
Vue.prototype.$deleteRequest = deleteRequest;
// 防止重复点击
import preventClick from '@assets/clickStatefrom'  // 根据自己的路径
Vue.use(preventClick);
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0)
// })
router.beforeEach((to, from, next) => {
  // 让页面回到顶部
   // chrome
   document.body.scrollTop = 0;
   // firefox
   document.documentElement.scrollTop =0
   // safari
   window.pageYOffset = 0;
  // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
 
 next()
})
// router.afterEach((to,from)=>{
//   window.pageYOffset = 0
//   document.body.scrollTop = 0
//   document.documentElement.scrollTop = 0
//   window.scrollTo(0, 0)
// })

// router.beforeEach((to, from, next) => {    
//   // chrome
//   document.body.scrollTop = 0
//   // firefox
//   document.documentElement.scrollTop = 0
//   // safari
//   window.pageYOffset = 0
//   next()
// })


 //在页面刷新时将vuex里的信息保存到sessionStorage里
//  window.addEventListener("beforeunload", () => {
//   localStorage.setItem("store", JSON.stringify(this.$store.state));
// });
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
