<template>
  <div id="home">
    <headertop></headertop>
   <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&isRouterAlive">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
    </router-view>
    <VFooter></VFooter>
  </div>
</template>
<script>
import headertop from "@components/m/HeaderTop";
import VFooter from "@components/m/Footer.vue";
export default {
  name: "home",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return { isRouterAlive: true,};
     
  },
  components: { headertop, VFooter },
  created() {},
  // 页码设置
  watch: {},
  methods: {reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },},
};
</script>
<style lang="less">

</style>
