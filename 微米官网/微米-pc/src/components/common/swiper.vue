<template>
  <div class="swiper">
    <div class="blocke">
      <el-carousel indicator-position="outside" :interval="5000">
        <el-carousel-item v-for="item in human" :key="item.id">
          <div class="information" v-if="abouttrue">
            <p>{{ item.name }}</p>
            <p>{{ item.zhiwei }}</p>
            <p>{{ item.detail }}</p>
          </div>
          <div class="information" v-else>
            <p>{{ item.name2 }}</p>
            <p>{{ item.zhiwei2 }}</p>
            <p>{{ item.detail2 }}</p>
          </div>
          <img :src="item.source" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { human } from "@components/human";

export default {
  inject: ["reload"],
  data() {
    return {human:'',abouttrue:''};
  },
  computed: {},
  created() {
    this.human = human;
   if ( this.$i18n.locale== "cn") {
      this.abouttrue = true;
  }
  else{
     this.abouttrue =false;
  }
  // this.reload()
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less">
.swiper{
.blocke {
  height: 532px;
 
  img {
    width: 250px;
    height: 300px;
    z-index: 20;
    opacity: 1;
    position: relative!important;
    left: 151px!important;
    top: -336px!important;
  }
  .information {
    width: 1000px;
    height: 482px;
    position: relative;
    left: 99px;
    top: 55px;
    background: url("../../assets/images/about/aboutbg3.png") no-repeat center/100%
      100%;
    p:nth-child(1) {
      position: relative;
      left: 350px !important;

      top: 49px;
      font-size: 34px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(0, 159, 205, 1);
      line-height: 22px;
    }
    p:nth-child(2) {
      position: relative;
      left: 350px !important;
      top: 60px;

      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
    }
    p:nth-child(3) {
      position: relative;
      left: 380px;
      top: 83px;
      width: 567px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      text-align: justify;
    }
  }
  .el-carousel__container {
    width: 100%;
    height: 541px;
    button {
      display: block !important;
    }
    button:first-child {
    }
  }
  .el-carousel__arrow {
    width: 60px;
    height: 60px;
    display: block !important;
    border: 1px solid snow;
    display: block !important;
    i {
      transform: scale(2);
    }
  }
  .el-carousel--horizontal {
    height: 602px;
  }
}
}

</style>
