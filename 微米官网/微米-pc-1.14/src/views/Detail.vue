<template>
  <div class="detail">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.3"
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

    <div class="detailtop">
      <headertop></headertop>
    </div>
    <div class="detailfooter">
      <div class="detailfooter-content">
        <!-- <p>{{ $route.query.title }}</p> -->
        <!-- <p>{{ $route.query.updatedate }}</p> -->
        <div class="footerzoom">
          <div class="detaies">{{ detaies }}</div>
          <div v-html="updatedate" class="update"></div>
          <div v-html="description" class="description"></div>
          <div class="detailfooter-left" v-html="content"></div>
          <!-- <div class="detailfooter-right"></div> -->
        </div>
        <div
          class="footerlast"
          style="width:100%;height:50px;background:#0C0C0C"
        ></div>
      </div>
    </div>
    <div class="uenc_foot">
      <div class="foot-top">
        <ul class="foot-box">
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/github.png"
                  @click="github"
                  style="position:relative;left:10px"
                />
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
import { BASEURL } from "@api/api";
import headertop from "../components/common/header";
//import headerTop from "@components/content/HeaderTop.vue";
import Qs from "qs";
import bus from "@/bus.js";
export default {
  name: "detail",
  data() {
    return {
      nowLang: "",
      fullscreenLoading: false,
      cur: 0,
      show: false,
      id: "",
      content: "",
      updatedate: "",
      description: "",
      detaies: [],
    };
  },
  components: { headertop },
  created() {
    this.nowLang = this.$i18n.locale;
    this.cur = 3;
    this.id = this.$route.query.content_id;
    this.getSession();
    // console.log(this.id);
    this.getdetaillist();
    //console.log(this.$route.query);
    //console.log(this.$route.query.content_id);
  },
  computed: {
    nav: {
      get() {
        let navE = this.$t("nav");
        return navE;
      },
      set() {},
    },
  },
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
    // 选择语言
    switchLan() {
      //console.log(this.$i18n.locale);
      this.fullscreenLoading = true;
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      } else if (this.$i18n.locale == "en") {
        this.$i18n.locale = "cn";
        localStorage.setItem("lang", "cn");
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      }
    },

    async getdetaillist() {
      let that = this;
      await that.$http
        .get(`${BASEURL}` + "/weimioffice/web/content/getContent", {
          params: { content_id: this.id },
          headers: { language: this.nowLang },
        })
        .then((res) => {
          this.detaies = res.data.result.title;
          this.content = res.data.result.content;
          //console.log(this.content);
          this.updatedate = res.data.result.updatedate;
          this.description = res.data.result.description;
          //console.log(this.detaies);
          localStorage.setItem("lan", this.nowLang);
        });
    },
    getSession() {
      this.cur = sessionStorage.getItem("cur");
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
    github() {
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
.update {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 31px;
  margin: 29px auto 39px;
}
.description {
  width: 1200px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  margin: 0 auto 39px;
}
.detaies {
  width: 1200px;
  margin: 60px auto 29px;
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 60px;
  text-align: center;
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}
.uenc_foot {
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
      justify-content: space-between !important;
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
      position: absolute;
      left: 60%;
      top: 55px;
      cursor: pointer;
      span {
        margin-left: 39px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
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
.foot_word {
  font-size: 18px;
  color: #fff;
}
.headerselect {
  position: relative;
  top: -83px;
}
// 头部
.headertop {
  width: 100%;
  height: 200px;
  line-height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  z-index: 30;
  .headerzong {
    width: 1200px;
    height: 200px;
    //background-color: yellow;
    display: flex;
    flex-direction: row;
    z-index: 30;
    //头部左侧
    .header-left {
      width: 226px;
      height: 90px;
      line-height: 90px;
      //background-color: gray;
      margin-top: 55px;
    }
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

  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
@keyframes detailslide {
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
.detail {
  width: 100%;
  height: auto;
  position: relative;
  .detailtop {
    height: 800px;
    position: relative;
    margin: 0 auto;
    background: url("../assets/images/detail/detailbg.png") no-repeat
      center/100% 100%;
  }
  .detailfooter {
    width: 100%;
    height: auto;
    position: relative;
    background-color: #0c0c0c;
    .detailfooter-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      // line-height: 20px;
      z-index: 20;
      p:nth-child(1) {
        width: 1100px;
        height: 50px;
        position: relative;
        top: 60px;
        color: snow;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 31px;
        margin: 0 auto;
      }
      p:nth-child(2) {
        position: relative;
        top: 50px;
        width: 200px;
        height: 50px;
        color: snow;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 31px;
        margin: 0 auto;
      }
      .footerzoom {
        height: auto;
        display: flex;
        flex-direction: column;
        position: relative;
        left: -50px;
        margin: 0 auto 50px;
        .detailfooter-left {
          margin: 0px auto;
        }
      }
    }
  }
}
</style>
