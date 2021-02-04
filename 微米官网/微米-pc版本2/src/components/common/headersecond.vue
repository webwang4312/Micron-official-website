<template>
  <div id="headersecond">
    <login v-if="$store.state.showlogin"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <fastoken-second v-if="$store.state.fastokensecond"></fastoken-second>
    <!-- 内容部分 -->
    <div class="headertopsecond">
      <div class="headerzong">
        <div class="header-left">
          <img src="@assets/images/index/logo.png" />
        </div>
        <div class="headersecond-right">
          <div id="fen">
            <ul class="header-right2">
              <li
                v-for="(item, i) in nav"
                :key="i"
                @click="gorouter(item.path)"
                :class="{ nav_li: active === i }"
              >
                <img :src="item.image" v-if="active === i" />
                <img :src="item.image2" v-else />
                <div>{{ item.title }}</div>
              </li>
            </ul>
          </div>
          <button
            class="selbuttons"
            @click="switchLan()"
            v-loading.fullscreen.lock="fullscreenLoading"
          >
            中 / EN
          </button>

          <div class="loginregister">
            <!-- 头部公共部分 -->
            <template v-if="!$store.state.username">
              <span @click="logins"> {{ $t("login[0]") }}</span>
              <!-- <span @click="register">{{ $t("login[1]") }}</span> -->
            </template>
          </div>
          <div
            class="header_selsetz"
            v-if="$store.state.username"
            @click="iconShow"
          >
            <div class="header_selset">
              <span id="loginregister">{{ $store.state.username }}</span>

              <img
                src="@assets/images/header/矩形 38@2x.png"
                :class="{ header_icon: true, transform: transform }"
              />
            </div>

            <div class="header_ululs" v-if="iconshow" @mouseleave="iconHide">
              <img src="@assets/images/header/矩形 37.png" alt="" />
              <ul>
                <li @click="fastoken" v-if="watch">绑定钱包</li>
                <li @click="fastokensecond" v-else>查看钱包</li>
                <div class="fastline"></div>
                <li @click="leavelogin">退出登录</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "@components/common/Login";
import Forget from "@components/common/ForgetPassword";
import Fastoken from "@components/common/Fastoken";
import FastokenSecond from "@components/common/FastokenSecond";
var qs = require("qs");
export default {
  name: "index",
  data() {
    return {
      active: "",
      // 头部公共部分
      xianzhi: false,
      startstop: true,
      show: false,
      fullscreenLoading: false,
      cur: "",
      // 提交成功
      submits: true,
      nowLang: "",
      showfooter: false,
      showmedia: false,
      showus: false,
      indexNumTop: "",
      scrollTop: "",
      description1: "",
      videoUrl: "",
      videosource: [{ src: "" }],
      nav: [],
      iconshow: false,
      transform: false,
      watch: localStorage.getItem("walletAddress") === "",
    };
  },

  created() {
    //  this.$i18n.locale=localStorage.getItem("lang")
    // console.log(localStorage.getItem("token"));
    // window.addEventListener("storage", this.pageFresh);
    if (!this.$store.username) {
    } else {
      this.$store.dispatch("login");
    }
    // console.log(this.username);

    this.nowLang = this.$i18n.locale;
    if (this.nowLang === "cn") {
      this.nav = [
        {
          title: "提案",
          path: "/proposal",
          image: require("@assets/images/proposal/tian.png"),
          image2: require("@assets/images/proposal/tian1.png"),
        },
        {
          title: "投票",
          path: "/vote",
          image: require("@assets/images/proposal/toupiao1.png"),
          image2: require("@assets/images/proposal/toupiao.png"),
        },
      ];
    }
    if (this.nowLang === "en") {
      this.nav = [
        {
          title: "proposal",
          path: "/proposal",
          image: require("@assets/images/proposal/tian.png"),
          image2: require("@assets/images/proposal/tian1.png"),
        },
        {
          title: "vote",
          path: "/vote",
          image: require("@assets/images/proposal/toupiao1.png"),
          image2: require("@assets/images/proposal/toupiao.png"),
        },
      ];
    }
    this.nav.forEach((v, i) => {
      if (v.path === this.$route.path) {
        this.active = i;
      }
    });
    if (!sessionStorage.getItem("uenc-whilelogin")) {
      window.sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("leavelogin");
    }
    // 滚动设置
    // window.addEventListener("scroll", this.getScroll);
  },
  computed: {},
  watch: {},
  beforeUpdated() {
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
  },
  beforeDestroy() {
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
    // 滚动设置
    // window.removeEventListener("storage", this.pageFresh);
    window.removeEventListener("scroll", this.getScroll);
  },
  components: { Login, Forget, Fastoken, FastokenSecond },

  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    pageFresh(e) {
      // console.log(e);
      if (e.key === "loginState") {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            localStorage.getItem("store")
              ? JSON.parse(localStorage.getItem("store"))
              : {}
          )
        );
      }
    },
    gorouter(index) {
      // console.log(index);
      this.$router.push({ path: index });
    },
    fastoken() {
      this.$store.dispatch("fastokenShow");
    },
    fastokensecond() {
      this.$store.dispatch("fastokensecondShow");
    },
    iconShow() {
      this.iconshow = !this.iconshow;
      this.transform = !this.transform;
    },
    iconHide() {
      if ((this.iconshow = true)) {
        this.iconshow = false;
      }
    },
    // 头部公共部分
    logins() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow");
      // console.log('登录');
      // console.log(this.$refs);
    },
    register() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow2");
    },
    leavelogin() {
      // 清除缓存
      window.sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("leavelogin");
    },
    gotochainexplor() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
    },

    change() {
      this.submits = true;
    },
    change2() {
      this.submits = false;
    },
    // 选择语言
    switchLan() {
      //console.log(this.$i18n.locale);
      this.fullscreenLoading = true;
      if (this.nowLang == "cn") {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      } else if (this.nowLang == "en") {
        this.$i18n.locale = "cn";
        localStorage.setItem("lang", "cn");
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      }
    },
  },
};
</script>
<style lang="less">
#headersecond {
  width: 100%;
  #loginregister {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #009fcd;
    line-height: 14px;
  }

  .transform {
    transform: rotate(0deg) !important;
  }

  .header_selset {
    display: flex;
    flex-direction: row;
  }

  .header_icon {
    width: 12px;
    height: 7px;
    transform: rotate(-90deg);
    position: relative;
    left: 5px;
  }
  .nav_li {
    color: rgba(0, 159, 205, 1) !important;
    border-bottom: 2px solid rgba(0, 159, 205, 1) !important;
    border-top: 0px !important;
    font-weight: 600;
    border-right: none !important;
    padding-bottom: 5px;
  }
  .headertopsecond {
    width: 1200px !important;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between !important;
    align-items: center;
    color: #ffffff;
    margin: 0 auto;

    .headerzong {
      width: 1200px !important;
      height: 200px;
      //background-color: yellow;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between !important;
      //头部左侧
      .header-left {
        width: 147.8px;
        height: 58.7px;
        img {
          width: 117.6px;
          height: 45.6px;
        }
      }
      .headersecond-right {
        width: auto;
        min-width: 520px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center !important;
        #fen {
          width: auto;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        .selbuttons {
          width: 83px !important;
          height: 36px !important;
          background: #333333;
          outline: none;
          border: none;
          margin-left: 0px !important;
          border-radius: 5px;
        }
        .loginregister {
          line-height: 13px !important;

          span {
            cursor: pointer;
            width: 34px;
            height: 17px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            margin-left: 74px;
          }
        }
      }
      .header-right2 {
        width: 240px !important;
        margin-right: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li:nth-child(2) {
        }
        li {
          display: flex;
          flex-direction: row;
          margin-left: 30px;
          align-items: center;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 600;
          width: 74px !important;
          cursor: pointer;
          img {
            width: 22px;
            height: 21px;
            margin-right: 5px;
            margin-top: 5px;
          }
        }
      }
      .header_selsetz {
        position: relative;
        top: 90px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        line-height: 200px;
        margin: 0 auto;

        text-align: center;

        .header_ululs {
          position: relative;
          top: 10px;
          width: 108px;

          border-radius: 10px;
          display: flex;
          flex-direction: column;
          font-size: 18px !important;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          z-index: 99;
          ul {
            position: absolute;
            top: 0px !important;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            line-height: 52px;
            margin-top: 0px;
            li {
              text-align: center;
            }
          }
          div {
            width: 108px;
            height: 1px;
            background: #ffffff;
            opacity: 0.1;
          }
        }
      }
    }
  }
}
</style>
