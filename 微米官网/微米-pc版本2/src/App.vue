<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive && isRouterAlive">
      <router-view> </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"> </router-view>
  </div>
</template>

<script>
export default {
  name: "app",
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
    //  console.log(JSON.parse(localStorage.getItem("store")).username)
    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("store"))
        )
      );
    }
    // console.log(this.$store.state);
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state));
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
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      window.addEventListener(
        "hashchange",
        () => {
          let currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath); // 主动更改路由界面
          }
        },
        false
      );
    }
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
  },
};
</script>
<style lang="less">
@import "./assets/css/normalize.css";
</style>
