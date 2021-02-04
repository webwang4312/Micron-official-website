<template>
  <div class="headerthird">
    <login v-if="$store.state.showlogin"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <fastoken-second v-if="$store.state.fastokensecond"></fastoken-second>
    <!-- 内容部分 -->
    <div class="headertop">
      <div class="headerzong">
        <div class="header-left">
          <img src="@assets/images/index/logo.png" />
        </div>
        <div class="header_third_right">
          <div id="fen">
            <button
              class="selbutton"
              @click="switchLan()"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              中 / EN
            </button>
          </div>

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

            <div class="header_ululss" v-if="iconshow" @mouseleave="iconHide">
              <img src="@assets/images/header/矩形 37.png" alt="" />
              <ul>
                <li @click="fastoken" v-if="watch">绑定钱包</li>
                <li @click="fastokensecond" v-else>查看钱包</li>
                <div class="fastline"></div>
                <li @click="leavelogin">退出登录</li>
              </ul>
            </div>
          </div>
          <div id="liulanqi" @click="gotochainexplor">
            {{ $t("liulanqi[0]") }}
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
    // console.log(localStorage.getItem("token"))
    // window.addEventListener("storage", this.pageFresh);
    if (!this.$store.username) {
    } else {
      this.$store.dispatch("login");
    }
    // console.log(this.username);

    this.nowLang = this.$i18n.locale;
    if (!sessionStorage.getItem("uenc-whilelogin")) {
      window.sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("leavelogin");
    }
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
    //  window.removeEventListener("storage", this.pageFresh);
    window.removeEventListener("scroll", this.getScroll);
  },
  components: { Login, Forget, Fastoken, FastokenSecond },

  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    // pageFresh(e) {
    //   if (e.key === "loginState") {
    //     this.$store.replaceState(
    //       Object.assign(
    //         {},
    //         this.$store.state,
    //         localStorage.getItem("store")
    //           ? JSON.parse(localStorage.getItem("store"))
    //           : {}
    //       )
    //     );
    //   }
    // },
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
      // console.log('1');
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow");
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
#loginregister {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #009fcd !important;
}

.transform {
  transform: rotate(0deg) !important;
}

.nav_li {
  color: rgba(0, 159, 205, 1) !important;
  // border-bottom: 2px solid rgba(0, 159, 205, 1);
  font-weight: 600;
}
.headerthird {
  .headerzong {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .header_third_right {
    width: auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    #liulanqi {
      width: 181px;
      height: 36px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 36px !important;
      position: relative;
      // left: 10px;
      cursor: pointer;
      text-align: center !important;
      border: 1px solid #009fcd;
      border-radius: 5px;
      margin-left: 40px;
    }
  }
  #fen {
    height: 100%;
    align-items: center;

    .selbutton {
      width: 83px !important;
      height: 36px !important;

      line-height: 20px !important;
      background: #333333;
      outline: none;
      border: none;
      margin-top: -10px;
      margin-right: 40px;
    }
  }
  .headertop {
    width: 1200px !important;
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ffffff;
    margin: 0 auto;
    z-index: 999;
    .headerzong {
      width: 1200px;
      height: 200px;
      //background-color: yellow;
      display: flex;
      flex-direction: row;
      align-items: center;
      //头部左侧
      .header-left {
        width: 147.8px;
        height: 58.7px;

        img {
          width: 147.8px;
          height: 58.7px;
        }
      }
      .header-right {
        width: 200px;

        li:nth-child(2) {
          margin-left: 60px;
        }

        li {
          display: flex;
          flex-direction: row;
          margin-left: 0px;
          img {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
        }
      }
      .loginregister {
        z-index: 1000;
        position: relative;

        span {
          cursor: pointer;
          width: 34px;
          height: 17px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 5px;
          margin-left: 21px;
        }
      }
      .header_selsetz {
        cursor: pointer;
        position: relative;
        .header_selset {
          display: flex;
          flex-direction: row;
          align-items: center !important;
          width: auto;
          .header_icon {
            width: 12px;
            height: 7px;
            transform: rotate(-90deg);
            position: relative;
            left: 5px;
            top: -5px;
          }
        }
        .header_ululss {
          position: absolute;
          // top: 110px;
          width: 108px;
          height: 105px !important;
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
            top: 2px;
            height: 105px !important;
            line-height: 46px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            li {
              text-align: center;
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
}
</style>
