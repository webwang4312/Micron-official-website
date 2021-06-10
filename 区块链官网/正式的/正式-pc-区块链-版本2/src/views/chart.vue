<template>
  <div id="chart">
    <node></node>
  <award></award>
  <transaction></transaction>
  <account></account>
  </div>
</template>
<script>
import node from "@views/chart/node";
import award from "@views/chart/award";
import transaction from "@views/chart/transaction";
import account from "@views/chart/account";
export default {
  name: "chart",
  data() {
    return {
      nowLang: "",
    };
  },
  components: {node,award,transaction,account},
  created() {
    this.nowLang = this.$i18n.locale;
   
  },
  mounted() {
   
  },
  // 页码设置
  watch: {},
  methods: {
   
   
  },
};
</script>
<style lang="less">
#chart {
  width: 100%;
  height: auto;
  margin-bottom: 53px;
 
 
}
</style>
