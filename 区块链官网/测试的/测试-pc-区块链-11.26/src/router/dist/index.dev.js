"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
}; // const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }


var routes = [{
  path: "/",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Home.vue"));
    });
  },
  meta: {
    requireAuth: true,
    keepAlive: true // 需要缓存

  },
  children: [{
    path: '/',
    name: 'index',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Index.vue"));
      });
    },
    meta: {
      keepAlive: true // 需要被缓存

    }
  }, {
    path: "/address",
    name: "addressed",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Address.vue"));
      });
    },
    meta: {
      keepAlive: false // bu需要被缓存

    }
  }, {
    path: '/block',
    name: 'block',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Block.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }, {
    path: '/chart',
    name: 'chart',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Chart.vue"));
      });
    },
    meta: {
      keepAlive: true // 需要被缓存

    }
  }, {
    path: "/transaction",
    name: "transaction",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Transaction.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }, {
    path: "/wallet",
    name: "Fastoken",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Wallet.vue"));
      });
    },
    meta: {
      keepAlive: true // 需要被缓存

    }
  }, // 区块详情页
  {
    path: "/blockdetail",
    name: "blockdetail",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/blockchildren/blockdetail.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }, // 区块详情页2
  {
    path: "/blockdetails",
    name: "blockdetails",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/blockchildren/blockdetails.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }, // 交易详情页
  {
    path: "/transactiondetail",
    name: "transactiondetail",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/transactionchildren/transactiondetail.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }, // 地址搜索详情页
  {
    path: "/transactiondetails",
    name: "transactiondetails",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/transactionchildren/transactiondetails.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }, {
    path: "/notfound",
    name: "notfound",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/notfound.vue"));
      });
    },
    meta: {
      keepAlive: false // 需要被缓存

    }
  }]
}, // 搜索栏
{
  path: "/search",
  name: "search",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/common/search.vue"));
    });
  },
  meta: {
    keepAlive: false // 需要被缓存

  }
} // 搜索栏
];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;