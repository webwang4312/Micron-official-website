<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&isRouterAlive">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
    </router-view>
  </div>
</template>

<style lang="less">
  a:hover {
    list-style: none;
    text-decoration: none;
  }
  a{
    font-size: 18px
  }
.el-select .el-input.is-focus .el-input__inner{
  border-color: beige!important;
}

a {
  text-decoration: none;
}
.vue-particles {
  // z-index: 1;
}
</style>
<script>
import '@assets/css/normalize.css';
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
