<template>
  <div class="partner">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="polygon"
      :particleSize="1"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>

    <div class="partnertop">
    
      <div class="partnertop-content">
        <div class="partner-more">
          <p>{{ $t("recommendtitle[0]") }}</p>
          <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
          <div class="partner-button-overflow">
            <div class="partner-button-left"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="partnerfooter">
      <div class="partnerfooter-content">
        <p>{{ $t("partner[0]") }}</p>
        <div class="partner-line"></div>
        <div class="partnerfooter-img"></div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="partneruenc_foot">
      <div class="foot-top">
        <ul class="foot-box">
          <li>
            <div class="foot-box1">
              <div class="circle">
                 <img src="@assets/images/footer/github.png" @click="github" style="position:relative;left:10px" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/telegram.png"
                  @click="telegram"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box2">
              <div class="circle">
                <img src="@assets/images/footer/twitter.png" @click="twitter" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box3">
              <div class="circle">
                <img
                  src="@assets/images/footer/facebook.png"
                  @click="facebook"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box5">
              <div class="circle">
                <img src="@assets/images/footer/weibo.png" @click="weibo" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box4">
              <div
                class="circle"
                @mouseenter="gotoshow()"
                @mouseleave="gotohide()"
              >
                <img src="@assets/images/footer/erweima.png" />
              </div>
            </div>
          </li>
        </ul>
        <ul class="hovershow" v-if="show">
          <img src="@assets/images/indexhover/juxing.png" class="imgshow" />
          <li class="club">
            <img src="@assets/images/indexhover/club.png" />
            <br />
            <span>Energy Club</span>
          </li>
          <li class="wallet">
            <img src="@assets/images/indexhover/wallet.png" />
            <br />
            <span>Fastoken</span>
          </li>
        </ul>
        <div class="component">
          <span class="neirong" @click="index">{{ $t("index[0]") }}</span>
          <span>|</span>

          <span class="neirong" @click="faqs">FAQ</span>
          <span>|</span>
          <span class="neirong" @click="about">{{ $t("about[0]") }}</span>
          <span>|</span>
          <span class="neirong" @click="news">{{
            $t("Mediaannouncement[0]")
          }}</span>
        </div>
      </div>
      <div class="foot-zhong"></div>
      <footer>
        <p>{{ $t("shangbiao[0]") }}</p>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: "partner",
  data() {
    return {
      nowLang: "",
      fullscreenLoading: false,

      show: false,
    };
  },
  components: { },
  created() {
    this.nowLang = this.$i18n.locale;
  },
  computed: {},
  mounted() {},
  methods: {
    gotochainexplor() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
    },
    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    index() {
      this.$router.push({
        path: "/",
      });
    },
    news() {
      this.$router.push({
        path: "/news",
      });
    },
    about() {
      this.$router.push({
        path: "/about",
      });
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
    github(){
 window.open("https://github.com/uenctech");
    },
    telegram() {
      window.open("https://t.me/UniversalEnergyChain1");
    },
    twitter() {
      window.open("https://twitter.com/uencclub");
    },
    facebook() {
      window.open("https://fb.me/uencclub");
    },
    weibo() {
      window.open("https://weibo.com/u/5580784739");
    },
    // 选择语言
  },
};
</script>
<style lang="less" scoped>
#liulanqi {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 18px;
  position: relative;
  top: -7px;
  cursor: pointer;
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}

button {
  width: 83px;
  height: 36px;
  background: rgba(51, 51, 51, 1);
  border-radius: 5px;
  margin-top: -10px;
  margin-left: 15px;
  color: snow;
  cursor: pointer;
  border: none;
  outline: none;
}
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
@keyframes partnerslide {
  0% {
    width: 100px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  20% {
    width: 240px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  40% {
    width: 440px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  100% {
    width: 600px;
    background: rgba(0, 159, 205, 1);
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
  }
}
// 主线
.partner {
  width: 100%;
  height: auto;
  position: relative;
  .partnertop {
    height: 800px;
    position: relative;
    margin: 0 auto;
    background: url("../assets/images/partner/partnerbg.png") no-repeat
      center/100% 100%;

    // 头部内容区域
    .partnertop-content {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      // 大方块设置
      .partner-more {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        width: 600px;
        height: 263px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 50px;
        position: relative;
        top: 40px;
        cursor: pointer;

        z-index: 20;
        p:first-child {
          z-index: 10;
          position: relative;
          left: 86px;
          top: 38px;
          width: 481px;
          height: 98px;
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 60px;
          opacity: 1;
        }
        p:nth-child(2) {
          z-index: 10;
          position: relative;
          left: 86px;
          top: 96px;
          width: 293px;
          height: 17px;
          font-size: 17px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          opacity: 0.5;
        }
      }
      .partner-more:hover {
        .partner-button-left {
          // animation: partnerslide 0.5s linear;
          // animation-fill-mode: forwards;
        }
      }
      .partner-button-overflow {
        width: 600px;
        height: 263px;
        border-radius: 10px;
        position: relative;
        top: -97px;
        overflow: hidden;
        cursor: pointer;
        opacity: 1;
      }
      .partner-button-left {
        width: 5px;
        height: 263px;
        position: relative;
        left: -2px;
        color: rgba(0, 159, 205, 1);
        background: rgba(0, 159, 205, 1);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        overflow: hidden;
        opacity: 1;
      }
      .partner-button-left:hover {
        cursor: pointer;
      }
    }
  }
  .partnerfooter {
    width: 100%;
    height: 847px;

    position: relative;
    background-color: #0c0c0c;
    .partnerfooter-content {
      width: 1200px;
      height: 1011px;
      margin: 0 auto;
      p {
        width: 356px;
        height: 33px;
        font-size: 34px;
        position: relative;
        top: 80px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .partner-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 100px;
        background: rgba(0, 159, 205, 1);
      }
      .partnerfooter-img {
        width: 1200px;
        height: 554px;
        position: relative;
        top: 198px;
        background: url("../assets/images/partner/partners.png") no-repeat
          center;
      }
    }
  }
}

// 底部
.partneruenc_foot {
  width: 100%;
  height: 166px;
  background-color: #0c0c0c;
  position: relative;

  z-index: 20;
  .foot-top {
    width: 1200px;
    height: 111px;
    margin: 0 auto;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    // z-index: 20;
    .foot-box {
      width: 500px;
      display: flex;
      flex-direction: row;
      position: relative;
      justify-content: space-between;
      img {
        align-content: center;
      }
      .circle {
        width: 40px;
        height: 40px;
        background: rgba(51, 51, 51, 1);
        position: relative;
        left: 5px;
        top: 5px;
        border-radius: 50%;
      }
      .foot-box1 {
        width: 50px;
        height: 50px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
        margin-top: 30px;
        img {
          position: relative;
          top: 9px;
          cursor: pointer;
          left: 15%;
        }
      }
      .foot-box1:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box2:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box3:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box5:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box3 {
        img {
          left: 33% !important;
        }
      }
      .foot-box2,
      .foot-box3,
      .foot-box4,
      .foot-box5 {
        width: 50px;
        height: 50px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
        position: relative;
        // margin-left: 40px;
        margin-top: 30px;
        img {
          cursor: pointer;
          position: relative;
          top: 7px;
          left: 17%;
        }
      }
      .foot-box4:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
    }
    .component {
      line-height: 111px;
      span {
        margin-left: 39px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
      }
    }
  }
  .foot-zhong {
    width: 100%;
    height: 1px;
    background: rgba(0, 159, 205, 1);
  }
  footer p {
    margin: 0 auto;
    width: 372px;
    height: 13px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
    text-align: center;
  }
  .hovershow {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -97px;
    left: 42%;
    float: left;
    z-index: 30;
    opacity: 1;
    .imgshow {
      width: 310px;
      height: 181px;
      position: relative;
    }
    .club {
      width: 120px;
      height: 120px;
      position: relative;
      left: -280px;
      top: 20px;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        position: relative;
        left: 9px;
      }
    }
    .wallet {
      width: 120px;
      height: 120px;
      position: relative;
      left: -260px;
      top: 20px;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        position: relative;
        left: 18px;
      }
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>
