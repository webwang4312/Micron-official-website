<template>
  <div class="header">
    <login v-if="$store.state.showlogin"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <fastoken-second v-if="$store.state.fastokensecond"></fastoken-second>
    <!-- 内容部分 -->

    <div class="headertop">
      <div class="headerzong">
        <div class="headerzong1">
          <div class="header-left">
            <img src="@assets/images/index/logo.png" />
          </div>
          <div class="navheader_right">
            <button
              class="selbutton"
              @click="switchLan()"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              中 / EN
            </button>
            <!-- 头部公共部分 -->
            <template v-if="!$store.state.username">
              <span @click="logins" id="loginregister">
                {{ $t("login[0]") }}</span
              >
              <!-- <span @click="register" id="loginregister">{{ $t("login[1]") }}</span> -->
            </template>
            <div
              class="header_selsetz"
              v-if="$store.state.username"
              @click="iconShow"
            >
              <div class="header_selset">
                <span id="loginregister2">{{ $store.state.username }}</span>

                <img
                  src="@assets/images/header/矩形 38@2x.png"
                  :class="{ header_icon: true, transform: transform }"
                />
              </div>

              <div class="header_ulul" v-show="iconshow" @mouseleave="iconHide">
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
        <div>
          <div class="index_line"></div>
          <ul class="header-right">
            <li
              v-for="(item, i) in nav"
              :class="{ nav_li: active === i }"
              :key="i"
              @click="gorouter(item.path)"
              @mouseenter="navehover(item, index)"
              @mouseleave="naveleave"
              ref="tabber"
            >
              <div class="div1">{{ item.title }}</div>
              <div class="indexline"></div>
            </li>
          </ul>
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
      sticky: false,
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.$store.state.fastoken=false;
    this.$store.state.fastokensecond=false;
    // console.log(this.username);
    // window.addEventListener("storage", this.pageFresh);
    this.nowLang = this.$i18n.locale;
    // console.log(this.nowLang);
    if (this.nowLang === "cn") {
      this.nav = [
        {
          title: "首页",
          path: "/index",
        },
        {
          title: "FAQ",
          path: "/FAQ",
        },
        {
          title: "关于项目",
          path: "/about",
        },
        {
          title: "关于社区",
          path: "/proposal",
        },
        {
          title: "开发者社区",
          path: "/developer",
        },
        {
          title: "媒体公告",
          path: "/news",
        },
        {
          title: "合作伙伴",
          path: "/partner",
        },
      ];
    }

    if (this.nowLang === "en") {
      this.nav = [
        {
          title: "Home",
          path: "/index",
        },
        {
          title: "FAQ",
          path: "/FAQ",
        },
        {
          title: "About projects",
          path: "/about",
        },
        {
          title: "About community",
          path: "/proposal",
        },
        {
          title: "Speakers community",
          path: "/developer",
        },
        {
          title: "Media reports",
          path: "/news",
        },
        {
          title: "Partners",
          path: "/partner",
        },
      ];
    }
    this.nav.forEach((v, i) => {
      // console.log(v);
      // console.log(this.$route.path);
      // console.log(this.$route.path);
      if (v.path === this.$route.path) {
        this.active = i;
      }
    });
    if (!sessionStorage.getItem('uenc-whilelogin')) {
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
    // window.removeEventListener("storage", this.pageFresh);
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
    // 滚动设置
    window.removeEventListener("scroll", this.getScroll);
  },
  components: { Login, Forget, Fastoken, FastokenSecond },

  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    navehover(item, index) {
      // console.log(index);
      // console.log(this.$refs.tabber);
      // console.log(this.active);
      // console.log(item);
      if (item.path == "/about") {
        this.naveshover = true;
      } else {
        this.naveshover = false;
      }

      for (let j in this.$refs.tabber) {
        // console.log(this.$refs.tabber[j].innerText);
        this.$refs.tabber[j].style.border = "none";
        if (j == this.active) {
          this.$refs.tabber[j].style.color = "red";
          // this.$refs.tabber[j].classList[0]=''
        }
      }
      // console.log(index);
      // console.log(index);
    },
    naveleave(index) {
      // this.naveshover = false;
      for (let j in this.$refs.tabber) {
        // console.log(this.$refs.tabber[j]);
        if (j == this.active) {
          this.$refs.tabber[j].style.borderTop =
            "2px solid rgba(0, 159, 205, 1)";
          // this.$refs.tabber[j].classList[0]=''
        }
      }
    },

    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > 10) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    },
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
      // if (index === "/proposal") {
      //   let routeData = this.$router.resolve({
      //     path: "/proposal",
      //   });
      //   window.open(routeData.href, "_blank");
      // } else {
      this.$router.push({ path: index });
      // }
    },
    fastoken() {
      this.$store.dispatch("fastokenShow");
      // 根据userid绑定权益
    },
    fastokensecond() {
      this.$store.dispatch("fastokensecondShow");
    },
    iconShow() {
      this.iconshow = !this.iconshow;
      this.transform = !this.transform;
    },
    iconHide() {
      if (this.iconshow === true) {
        this.iconshow = false;
      }
    },
    // 头部公共部分
    logins() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow");
      // console.log("登录");
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
      if (this.nowLang === "cn") {
        this.$i18n.locale = "en";
        console.log(this.$i18n.locale);
        localStorage.setItem("lang", "en");
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      } else if (this.nowLang === "en") {
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
.sticky {
  width: 100%;
  position: fixed;
  top: 0;
  background: black;
  z-index: 999;
}
#loginregister {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #fff;
}
#loginregister2 {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(0, 159, 205, 1);
}
.transform {
  transform: rotate(0deg) !important;
}
.header_icon {
  width: 12px !important;
  height: 7px !important;
  line-height: 7px;
  transform: rotate(-90deg);
  position: relative;
  left: 3px;
  // top: -3px;
}
.header_selset {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#submit {
  text-align: center;
}
.input_video img {
  position: relative;
  top: -200px;
  left: 250px;
  cursor: pointer;
  opacity: 0.5;
}
.submit {
  top: -3px !important;
}
.el-button {
  position: relative;
  top: -8px !important;
  left: 23px;
}
.el-textarea textarea {
  background-color: #333333 !important;
  font-size: 16px !important;
  color: snow !important;
  border: 1px solid gray !important;
}
.el-textarea textarea::placeholder {
  color: #989898 !important;
}
.el-textarea textarea:focus {
  border: 2px solid #009fcd !important;
}
.el-input__inner::-webkit-input-placeholder {
  position: relative;
  left: -13px;
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
.success {
  background: rgba(34, 171, 79, 1) !important;

  span {
    position: relative;
    left: 5px;
  }
}

// 头部
.headerselect {
  position: relative;
  top: -83px;
}
.header {
  width: 100% !important;
}
.headertop {
  width: 100% !important;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  margin: 0 auto;
  .headerzong {
    width: 1200px;
    height: 200px;
    //background-color: yellow;
    display: flex;
    flex-direction: column;
    z-index: 30;
    .headerzong1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .header-left {
        width: 226px;
        height: 119px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        img {
          width: 117.6px;
          height: 45.6px;
        }
      }
      .navheader_right {
        width: auto;
        display: flex;
        flex-direction: row;
        align-items: center !important;
        justify-content: space-between;
        .selbutton {
          width: 83px !important;
          height: 36px !important;
          margin-left: 0px !important;
          margin-right: 40px;
        }
        .header_selsetz {
          cursor: pointer;
          .header_ulul {
            position: absolute;
            // top: 110px;
            width: 108px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 18px !important;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            z-index: 9999;
            text-align: center;
            img {
              width: 108px !important;
              height: 105px !important;
            }
            ul {
              width: 108px !important;
              height: 105px !important;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-top: -105px;
              li {
                text-align: center;
                line-height: 50px;
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
    }

    //头部左侧

    .index_line {
      width: 1200px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      top: 17px;
    }
    .header-right {
      width: 1200px;
      height: 90px;
      .indexline {
        width: 0px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 10px;
        height: 40px;
        line-height: 40px !important;
      }
      .nav_li {
        width: 170px;
        color: rgba(0, 159, 205, 1) !important;
        border-top: 2px solid rgba(0, 159, 205, 1);
        font-weight: 600;
        z-index: 99;
        text-align: center;
        //  border-right: 1px solid rgba(255, 255, 255, 0.1);
      }
      // .nav_li:hover {
      //   border-top: 2px solid rgba(0, 159, 205, 1);
      // }
      ul {
        padding: 0;
        margin: 0;
        font-size: 0;
      }
      li {
        // font-size: 20px;
        // padding: 5px 15px 5px 15px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        transition: all 0.5s;
      }
      li::before {
        content: "";
        display: block;
        position: absolute;
        width: 0%;
        top: 0;
        left: 100%;
        border-top: 2px solid rgba(0, 159, 205, 1);
        transition: all 0.2s;
      }
      li:hover::before {
        left: 0;
        width: 100%;
      }
      li:hover ~ li::before {
        left: 0;
      }
      li {
        height: 60px !important;
        line-height: 60px !important;
        width: 170px;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
      }
      li:hover {
        //  animation: bordertop 2s lin;
        font-weight: 600;
        // border-top: 2px solid rgba(0, 159, 205, 1);
        color: rgba(0, 159, 205, 1) !important;
      }
      .div1 {
        width: 170px;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}
//底部
.indexuenc_foot {
  width: 100%;
  height: 202px;
  background-color: #0c0c0c;
  position: relative;
  top: 409px;
  z-index: 20;
  margin: 0 auto;
  .foot-top {
    width: 1200px;
    height: 111px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // z-index: 20;
    .foot-box {
      display: flex;
      flex-direction: row;
      position: relative;
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
        margin-left: 40px;
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
      left: 55%;
      top: 55px;
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
    left: 35%;
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
