"use strict";

require("./babel");

var _vue = _interopRequireDefault(require("vue"));

require("babel-polyfill");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _axios = _interopRequireDefault(require("axios"));

var _i18n = _interopRequireDefault(require("./i18n"));

require("lib-flexible");

var _vuejsPaginate = _interopRequireDefault(require("vuejs-paginate"));

var _viewDesign = _interopRequireDefault(require("view-design"));

require("view-design/dist/styles/iview.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Es6Promise from 'es6-promise';
// Es6Promise.polyfill();
// video引入
// import VueVideoPlayer from "vue-video-player";
// import "video.js/dist/video-js.css";
// Vue.use(VueVideoPlayer);
_vue["default"].component('paginate', _vuejsPaginate["default"]); // video引入


_vue["default"].config.productionTip = false;

_vue["default"].use(_viewDesign["default"]);

_axios["default"].defaults.baseURL = "/api"; // axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;

_axios["default"].defaults.timeout = 30000; // 请求超时
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;

_vue["default"].use(_axios["default"]);

_vue["default"].prototype.$http = _axios["default"];

_axios["default"].interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config; // If config does not exist or the retry option is not set, reject

  if (!config || !config.retry) return Promise.reject(err); // Set the variable for keeping track of the retry count

  config.__retryCount = config.__retryCount || 0; // Check if we've maxed out the total number of retries

  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  } // Increase the retry count


  config.__retryCount += 1; // Create new promise to handle exponential backoff

  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  }); // Return the promise in which recalls axios to retry the request

  return backoff.then(function () {
    return (0, _axios["default"])(config);
  });
}); // 页面跳转到顶部


_router["default"].afterEach(function (to, from, next) {
  window.scrollTo(0, 0);
});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  i18n: _i18n["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");