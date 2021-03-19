<template>
  <div id="app">
    <div id="Loading" :class="{ display: displays }">
      <div class="loader-inner ball-beat">
        <h1>UENC</h1>
        
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

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
      displays: false,
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
    this.displays = true;
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
@import "./assets/css/normalize.less";
@import "./animate.min.css";
.display {
  display: none;
}
#Loading {
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  z-index: 100;
}
@-webkit-keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.ball-beat > div {
  background-color: #279fcf;
  width: 25px;
  height: 25px;
  border-radius: 100% !important;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: ball-beat 0.7s 0s infinite linear;
  animation: ball-beat 0.7s 0s infinite linear;
}
.ball-beat > div:nth-child(2n-1) {
  -webkit-animation-delay: 0.35s !important;
  animation-delay: 0.35s !important;
}
</style>
