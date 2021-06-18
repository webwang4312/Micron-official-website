<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
    </router-view>
  </div>
</template>

<style lang="less">
.actives {
  font-size: 16px !important;
  font-family: PingFang SC !important;
  font-weight: 400 !important;
  line-height: 22px !important;
  color: #6624fa !important;
  opacity: 1 !important;
}
.el-loading-mask {
  z-index: 1 !important;
  position: fixed !important;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: beige !important;
}

a {
  list-style: none;
  text-decoration: none;
}
a:hover {
  list-style: none;
  text-decoration: none;
}
</style>
<script>
import "@assets/css/normalize.css";
export default {
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
  },
  mounted() {
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = window.location.hash.slice(1);
        //console.log(currentPath);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      },
      false
    );
  },
};
</script>
