<template>
  <div class="headers">
    <login v-if="$store.state.showlogin"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <fastoken-second v-if="$store.state.fastokensecond"></fastoken-second>
    <!-- 内容部分 -->
    <div class="left_nav">
      <div class="header-left">
        <img src="@assets/images/wmHeader/Vector.png" @click="goIndex" />
      </div>
      <div class="headerz">
        <ul class="header-center">
          <li
            v-for="(item, i) in nav"
            :key="i"
            @mouseenter="navehover(item, index)"
            @mouseleave="naveleave"
            ref="tabber"
          >
            <div class="div1">
              <router-link
                tag="div"
                class="tab_item "
                :to="item.path"
                :key="index"
              >
                <span class="tab_span">{{ item.title }}</span>
              </router-link>
            </div>
          </li>
          <li>
            <span class="tab_span" @click="goToBrower" v-if="nowLang == 'cn'"
              >浏览器</span
            >
            <span class="tab_span" @click="goToBrower" v-else>Brower</span>
          </li>
        </ul>

        <div class="header-right">
          <!-- 头部公共部分 -->
          <template v-if="!$store.state.username">
            <span @click="logins" class="login"> {{ $t("login[0]") }}</span>
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
          <span
            @click="switchLan()"
            v-loading.fullscreen.lock="fullscreenLoading"
            style="cursor:pointer"
          >
            EN / 中文
          </span>
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
    this.$store.state.fastoken = false;
    this.$store.state.fastokensecond = false;
    // console.log(this.username);
    // window.addEventListener("storage", this.pageFresh);
    this.nowLang = this.$i18n.locale;
    // console.log(this.nowLang);
    if (this.nowLang === "cn") {
      this.nav = [
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
          path: "/media",
        },
      ];
    }

    if (this.nowLang === "en") {
      this.nav = [
        {
          title: "About",
          path: "/about",
        },
        {
          title: "Proposal",
          path: "/proposal",
        },
        {
          title: "Developer",
          path: "/developer",
        },
        {
          title: "Media",
          path: "/media",
        },
      ];
    }
    this.nav.forEach((v, i) => {
      //console.log(v);
      // console.log(this.$route.path);
      // console.log(this.$route.path);
      if (v.path === this.$route.path) {
        this.active = i;
      }
    });
    if (!sessionStorage.getItem("uenc-whilelogin")) {
      window.sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("leavelogin");
    }
  },
  computed: {},
  watch: {},
  beforeUpdated() {},
  beforeDestroy() {
    window.removeEventListener("scroll", this.getScroll);
  },
  components: { Login, Forget, Fastoken, FastokenSecond },

  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    goToBrower() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/", "_blank");
    },
    goIndex() {
      this.$router.push({
        path: "/index",
      });
    },
    navehover(item, index) {
      if (item.path == "/about") {
        this.naveshover = true;
      } else {
        this.naveshover = false;
      }

      // for (let j in this.$refs.tabber) {
      //   // console.log(this.$refs.tabber[j].innerText);
      //   this.$refs.tabber[j].style.border = "none";
      //   if (j == this.active) {
      //     this.$refs.tabber[j].style.color = "red";
      //     // this.$refs.tabber[j].classList[0]=''
      //   }
      // }
      // console.log(index);
      // console.log(index);
    },
    naveleave(index) {
      // this.naveshover = false;
      // for (let j in this.$refs.tabber) {
      //   // console.log(this.$refs.tabber[j]);
      //   if (j == this.active) {
      //     this.$refs.tabber[j].style.borderTop =
      //       "2px solid rgba(0, 159, 205, 1)";
      //     // this.$refs.tabber[j].classList[0]=''
      //   }
      // }
    },

    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //  console.log(scrollTop);
      if (scrollTop > 760) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
      // console.log(this.sticky)
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
    // gorouter(index, i) {
    //   // console.log(index);
    //   // console.log(i);
    //   this.active = 6;
    //   if (this.active == -1) {
    //     this.active !== i;
    //   } else {
    //     this.active = i;
    //   }

    //   // console.log(index);
    //   if (index === "/browser") {
    //     window.open("http://www.uenc.io/chainExplorer/index.html#/", "_blank");
    //   } else {
    //     this.$router.push({ path: index });
    //   }
    // },
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
      // this.fullscreenLoading = true;
      if (this.nowLang === "cn") {
        this.$i18n.locale = "en";
        // console.log(this.$i18n.locale);
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
.router-link-active {
  color: blue;
}
.stickys {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  width: 100%;
  height: 72px;
  z-index: 100;
  background: #889fcd;
}
.nav_li {
  color: red !important;
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
  margin-right: 10px;
  margin-left: 40px;
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
.headers {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  width: 100%;
  height: 72px;
  z-index: 100;
  // background: #889fcd;
  .left_nav {
    width: 94.7%;
    height: 36px;
    line-height: 36px;
    position: relative;
    top: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    .header-left {
      width: 120px;
      height: 36px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #3e3a39;
      cursor: pointer;
    }
    .headerz {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .header-center {
        width: 383px;
        height: 36px;
        display: flex;
        flex-direction: row;

        ul {
          padding: 0;
          margin: 0;
          font-size: 0;
        }
        li:nth-child(1) {
          margin-left: 0px;
        }
        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          text-align: center;

          margin-left: 32px;
        }
        li:hover {
          cursor: pointer;
          //  animation: bordertop 2s lin;
          // font-weight: 600;
          // // border-top: 2px solid rgba(0, 159, 205, 1);
           color: rgba(0, 159, 205, 1) !important;
        }
        .div1 {
          text-align: center;
          vertical-align: middle;
        }
      }
      .header-right {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center !important;
        justify-content: space-between;

        align-items: center;

        font-size: 14px;
        .login {
          margin-right: 26px;
          cursor: pointer;
          margin-left: 40px;
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
      }
    }
  }
}
</style>
