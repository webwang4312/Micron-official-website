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
//@import "./assets/css/media.less";
#particles-js {
  width: 100%;
  position: absolute;
  height: 800px !important;
  opacity: 0.5!important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}

a {
  text-decoration: none;
}
button {
  border: none;
  outline: none;
  cursor: pointer;
}
.vue-particles {
  // z-index: 1;
}
body {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
#loginregister {
  cursor: pointer;
  position: relative;
  margin-left: 20px;

  height: 17px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 4px;
}
// 头部右侧区域
.header-right {
  width: 974px;
  margin-left: 0px;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  li {
    text-align: center;
    width: 90px;
    height: 30px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 16px;
    cursor: pointer;
  }
  button {
    margin-left: 50px;
  }
}
</style>
