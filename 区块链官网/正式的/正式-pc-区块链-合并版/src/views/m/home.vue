<template>
  <div id="home">
    <headertop></headertop>
    <div
      style="width: 100%;
height: 10px;
background: #F8F8F8;
opacity: 1;"
    ></div>

    <router-view></router-view>
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
    return {};
  },
  data() {
    return {};
  },
  components: { headertop, VFooter },
  created() {},
  // 页码设置
  watch: {},
  methods: {},
};
</script>
<style lang="less"></style>
