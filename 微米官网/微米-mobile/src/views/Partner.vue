<template>
  <div class="partner">
    <slider></slider>
    <div
      class="partnerheader"
      @click="showSliderFalse"
    
    >
      <p>{{ $t("recommendtitle[0]") }}</p>
      <button @click="learnmore">
        <span>{{ $t("learnmore[0]") }}</span>
      </button>
    </div>
    <div
      class="partnerfooter"
      @click="showSliderFalse"
     
    >
      <p class="partnertitle">{{ $t("Partner[0]") }}</p>
      <div class="videoline"></div>
      <div class="hezuo"></div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
export default {
  name: "partner",
  data() {
    return {
      ysmenceng: false,
      short: true,
      sticky: false,
      nowLang: "",
      fullscreenLoading: false,

      show: false
    };
  },
  components: { slider, vFooter },
  created() {
   
    this.nowLang = this.$i18n.locale;
  },

  mounted() {},
  destroyed() {},
  methods: {
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCengHide");
    },
    

    learnmore() {
      window.open(
        "https://mp.weixin.qq.com/s?__biz=MzUyMTU1NTY5Ng==&mid=2247484931&idx=1&sn=91dcaddee98c13e6c06725a304eb6fcd&chksm=f9d81d9cceaf948aad420aa22b7bc463e3f629e862696eb3e574ca56b4be7a523b68daabf8c3&mpshare=1&scene=1&srcid=07154gMhIKKtwTlrNgO6u9iZ&sharer_sharetime=1594800298815&sharer_shareid=075076a15a657862690d0180ddb3903f&key=e48de8bee8a80c9c5acebe13a30a042386a606043989167fede9e01ef2b1a9415d95d233bf220f6c74bb387526f2c4397803eb414a57612896359a9275f10e286393070d00d2f5d150a57d432748cc42&ascene=1&uin=MjE4Nzc3NzkwMg%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AQUOr446KM5J603N%2FtWmTJc%3D&pass_ticket=qfyOfhiRNshvZQdp%2FSYKDgWCwXETPSmHaPLiir7tnGPbWXehR9Qoa4OTwWK1Mxg1"
      );
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    }
  }
};
</script>
<style lang="less">
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.partner {
  width: 100%;
  height: auto;
  background-color: black;
  .partnerheader {
    position: relative;
    top: 0px;
    width: 100%;
    height: 244px;
    background: url("../assets/images/partner/蒙版组 4.png") no-repeat
      center/100% 100%;
    p {
      width: 130px;
      height: 79px;
      font-size: 18px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 0.7;
      position: absolute;
      left: 50px;
      top: 50px;
    }
    button {
      width: 78px;
      height: 30px;
      background: rgba(0, 159, 205, 1);
      opacity: 1;
      border-radius: 5px;
      border: none;
      outline: none;
      position: absolute;
      left: 50px;
      top: 144px;
      span {
        width: 48px;
        height: 17px;
        font-size: 12px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }
    }
  }
  // 视频
  .partnerfooter {
    position: relative;
    width: 100%;
    height: 507px;
    background: rgba(12, 12, 12, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    .partnertitle {
      width: 100%;
      position: absolute;
      margin: 0 auto;
      text-align: center;
      top: 50px;
    }
    p {
      height: 22px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      position: absolute;
      top: 50px;
    }
    .videoline {
      width: 60px;
      height: 0px;
      border: 2px solid rgba(0, 159, 205, 1);
      position: relative;
      text-align: center;
      top: 50px;
      margin: 0 auto;
    }
    .hezuo {
      width: 315px;
      height: 355px;
      position: relative;
      margin: 0 auto;
      top: 0px;
      background: url("../assets/images/partner/未标题-1.png") no-repeat
        center/100% 100%;
    }
  }
}
</style>
