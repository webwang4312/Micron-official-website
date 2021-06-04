<template>
  <div class="home">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from "@components/common/header";
import vFooter from "@components/common/Footer";
export default {
  name: "home",
  data() {
    return {};
  },
  components: { vHeader,vFooter },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    // 选择语言
  },
};
</script>
<style lang="less">
.home {
  width: 100%;
}
</style>
