<template>
  <div class="developer">
    <slider></slider>
    11111111111
    <v-footer></v-footer>
  </div>
</template>

<script>
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
export default {
  name: "developer",
  data() {
    return {
     
    };
  },
  components: { slider, vFooter },
  created() {
   
   
  },

  mounted() {},
  destroyed() {},
  methods: {
   
  }
};
</script>
<style lang="less">
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.developer {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: black;

 
}
</style>
