<template>
  <div id="home">
    <headertopsecond></headertopsecond>
    <div class="pad">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </div>

    <router-view v-if="!$route.meta.keepAlive">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
    </router-view>
    <SecondFooter></SecondFooter>
  </div>
</template>

<style lang="less">
.pad {
  padding-top: 106px;
  background: #F9FAFD;
}
// .el-table__body tr td:nth-child(1){
//   text-align: left!important;
// }

a {
  text-decoration: none;
}
.vue-particles {
  // z-index: 1;
}
</style>
<script>
import headertopsecond from "@components/pc/HeaderTopSecond";
import SecondFooter from "@components/pc/SecondFooter.vue";
export default {
  inject: ["reload"],
  components: { headertopsecond, SecondFooter },
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
