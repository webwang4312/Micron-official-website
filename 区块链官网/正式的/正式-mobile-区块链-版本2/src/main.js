import './babel';
import Vue from "vue";
import 'babel-polyfill';
import 'lib-flexible';
// import Es6Promise from 'es6-promise';
// Es6Promise.polyfill();
import App from "./App.vue";

import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";
import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);
// video引入
Vue.config.productionTip = false;
import Button from 'vant/lib/button';
import { Popup } from 'vant';
import 'vant/lib/index.css';
Vue.use(Button);
Vue.use(Popup);
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);
axios.defaults.baseURL = "http://47.116.69.138:9090/";
Vue.use(axios);
Vue.prototype.$http = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 页面跳转到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");