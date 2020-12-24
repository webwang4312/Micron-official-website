<template>
  <div class="headertop">
    <van-popup
      v-model="$store.state.slidershow"
      position="left"
      :style="{ width: '45%', height: '100%' }"
      ><div class="slide">
        <div class="baoguo">
          <span class="lefticon" @click="login" v-if="logins">
            {{ $t("slider[0]") }}</span
          >
          <span class="lefticon blue" v-if="loginss">{{ username }}</span>
          <p class="lefticon" v-if="loginss" @click="exitLogin">
            {{ $t("slider[1]") }}
          </p>
        </div>
        <ul class="tiaozhuan">
          <li
            v-for="(item, i) in nav"
            :class="{ active: cur === i }"
            :key="i"
            @click="gorouter(item.path)"
          >
            <div
              :class="{ active: cur === i }"
              id="slider_left"
              v-if="cur === i"
            ></div>
            <img
              :src="item.img"
              :class="{ active: cur === i }"
              v-if="cur === i"
            />
            <img :src="item.img2" v-else />
            <span :class="{ active: cur === i }">{{ item.title }}</span>
          </li>
          <!-- 查看绑定钱包 -->
          <li v-if="fastokenbind" @click="goFastoken">
            <div id="slider_left" v-if="fastoken11"></div>
            <img
              src="../../assets/images/index/绑定钱包.png"
              v-if="fastoken1"
            />
            <img
              src="../../assets/images/index/绑定钱包(1).png"
              v-if="fastoken11"
            />

            <span v-if="fastoken11" style="color: rgba(0, 159, 205, 1)">
              {{ $t("slider[2]") }}</span
            >
            <span v-if="fastoken1"> {{ $t("slider[2]") }}</span>
          </li>
          <li v-if="fastokenbind2" @click="goFastoken2">
            <div id="slider_left" v-if="fastoken22"></div>
            <img
              src="../../assets/images/index/绑定钱包.png"
              v-if="fastoken2"
            />
            <img
              src="../../assets/images/index/绑定钱包(1).png"
              v-if="fastoken22"
            />

            <span v-if="fastoken22" style="color: rgba(0, 159, 205, 1)">
              {{ $t("slider[3]") }}</span
            >
            <span v-if="fastoken2"> {{ $t("slider[3]") }}</span>
          </li>
        </ul>
      </div>
    </van-popup>

    <div class="header" :class="{ sticky: sticky }">
      <img
        src="@assets/images/index/组 3.png"
        class="headerchoose"
        @click="showSlider"
      />
      <img src="@assets/images/index/组 2.png" class="headerlogo" />
      <div class="qiehuan" @click="selectlanguage">
        <img src="@assets/images/index/切换.png" alt />
        <span>中/英</span>
      </div>
    </div>
  </div>
</template>
<script>
import cn from "../../i18n/cn";
import en from "../../i18n/en";
export default {
  inject: ["reload"],
  data() {
    return {
      cur: "",
      sticky: false,
      username: "",
      logins: true,
      loginss: true,
      fastokenbind: false,
      fastokenbind2: false,
      fastoken: true,
      fastoken2: false,
      fastoken22: false,
      fastoken1: false,
      fastoken11: false,
      nav: [
        // {
        //   path: "/index",
        //   title: "首页",
        //   img: require("@assets/images/index/首页(1).png"),
        //   img2: require("@assets/images/index/首页.png"),
        // },
        // {
        //   path: "/FAQ",
        //   title: "FAQ",
        //   img: require("@assets/images/index/faq(1).png"),
        //   img2: require("@assets/images/index/faq.png"),
        // },
        // {
        //   path: "/about",
        //   title: "关于项目",
        //   img: require("@assets/images/index/关于项目(1).png"),
        //   img2: require("@assets/images/index/关于项目.png"),
        // },
        // {
        //   path: "/news",
        //   title: "媒体公告",
        //   img: require("@assets/images/index/媒体公告(1).png"),
        //   img2: require("@assets/images/index/媒体公告.png"),
        // },
        // {
        //   path: "/partner",
        //   title: "合作伙伴",
        //   img: require("@assets/images/index/合作伙伴(1).png"),
        //   img2: require("@assets/images/index/合作伙伴.png"),
        // },
        // {
        //   path: "/proposal",
        //   title: "提案",
        //   img: require("@assets/images/index/提案(1).png"),
        //   img2: require("@assets/images/index/提案.png"),
        // },
        // {
        //   path: "/vote",
        //   title: "投票",
        //   img: require("@assets/images/index/投票(1).png"),
        //   img2: require("@assets/images/index/投票.png"),
        // },
        // // {
        // //   path: "/fastoken",
        // //   title: "绑定钱包",
        // //   img: require("@assets/images/index/绑定钱包(1).png"),
        // //   img2: require("@assets/images/index/绑定钱包.png"),
        // // },
        // //  {
        // //   path: "/fastokensecond",
        // //   title: "查看钱包",
        // //   img: require("@assets/images/index/绑定钱包(1).png"),
        // //   img2: require("@assets/images/index/绑定钱包.png"),
        // // },
      ],
    };
  },
  created() {
    window.scrollTo(0,0)
    // console.log(localStorage.getItem('sliderfastoken1'));
    if (localStorage.getItem("walletAddress") == null) {
      this.fastokenbind = false;
      this.fastokenbind2 = false;
    } else if (localStorage.getItem("walletAddress") == "") {
      this.fastokenbind = true;
      this.fastokenbind2 = false;
    } else {
      this.fastokenbind = false;
      this.fastokenbind2 = true;
      this.fastoken2 = true;
    }
    this.username = localStorage.getItem("username");
    this.logins = localStorage.getItem("login");
    if (localStorage.getItem("sliderfastoken1") == "true") {
      this.fastoken1 = false;
      this.fastoken11 = true;
    } else {
      this.fastoken1 = true;
      this.fastoken11 = false;
    }
    if (localStorage.getItem("sliderfastoken2") == "true") {
      this.fastoken2 = false;
      this.fastoken22 = true;
    } else {
      this.fastoken2 = true;
      this.fastoken22 = false;
    }
    // console.log(this.logins);
    if (this.logins == null || this.logins == false) {
      this.logins = true;
      this.loginss = false;
    } else {
      this.logins = false;
      this.loginss = true;
    }
    // alert(this.$store.state.login);
    // if(this.$store.state.username==false||this.$store.state.username==''){
    //      this.$store.commit("loginfalse");
    // }
    this.$store.commit("showSliderFalse");
    if (this.$i18n.locale == "cn") {
      this.nav = cn.nav;
    } else {
      this.nav = en.nav;
    }
    if (
      localStorage.getItem("token") === "" ||
      localStorage.getItem("token") === null
    ) {
      this.$store.commit("fastokenbind");
      this.$store.commit("fastokenbind2");
    } else {
      if (localStorage.getItem("walletAddress") === "") {
        this.$store.commit("fastokenbinds");
      } else {
        this.$store.commit("fastokenbind2s");
      }
    }
    this.nav.forEach((v, i) => {
      if (v.path === this.$route.path) {
        this.cur = i;
      }
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goFastoken() {
      localStorage.setItem("sliderfastoken1", true);
      // this.$store.commit("fastoken");
      this.$router.push({
        path: "/fastoken",
      });
    },
    goFastoken2() {
      localStorage.setItem("sliderfastoken2", true);
      // this.$store.commit("fastoken2");
      this.$router.push({
        path: "/fastokensecond",
      });
    },
    exitLogin() {
      // 清除缓存
      localStorage.setItem("login", true);
      window.sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("login");
      
      this.$router.push({
        path: "/index",
      });
       this.logins = true;
      this.loginss = false;
       this.fastokenbind = false;
      this.fastokenbind2 =false;
      this.reload();
    },
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > -10) {
        this.sticky = true;
      }
      if (scrollTop <= 0) {
        this.sticky = false;
      }

      // console.log(scrollTop);
    },
    showSlider() {
      this.$store.commit("sliderShow");
      this.$store.commit("menCeng");
    },
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCeng");
    },
    gorouter(index) {
      localStorage.setItem("sliderfastoken2", "false");
      localStorage.setItem("sliderfastoken1", "false");
      this.$router.push({ path: index });
      // this.$store.commit("showSliderFalse");
      this.$store.commit("menCeng");
      this.$store.commit("fastokenhide");
      this.$store.commit("fastokenhide2");
    },
    // 切换语言
    selectlanguage() {
      this.fullscreenLoading = true;
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else if (this.$i18n.locale == "en") {
        this.$i18n.locale = "cn";
        localStorage.setItem("lang", "cn");
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    },
  },
};
</script>
<style lang="less">
.headertop{
  width: 100%;
  height: auto;
}
#slider_left {
  width: 5px;
  height: 100%;
  background: rgba(0, 159, 205, 1);
}
.menceng {
  background: rgba(255, 255, 255, 0.1);
}
.active {
  color: rgba(0, 159, 205, 1) !important;
}
@keyframes linechange {
  0% {
    width: 0px;
    background: rgba(51, 51, 51, 1);
  }
  100% {
    width: 5px;
    background: rgba(0, 159, 205, 1);
  }
}
.sticky {
  position: fixed!important;
top: 0!important;

  // width: 100% !important;
  // position: fixed !important;
  // top: 0px !important;
  background-color: black !important;
}

.slide {
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(51, 51, 51, 1) !important;
  opacity: 1 !important;
  padding-bottom: 50px;
  .blue {
    color: rgba(0, 159, 205, 1) !important;
  }
  .baoguo {
    width: 100%;
    height: auto;
    padding-top: 20px;
    padding-left: 24px;
    padding-bottom: 20px;
  }
  .lefticon {
    position: relative;
    left: 0px;
    top: 0px;
    font-size: 18px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 27px;
    color: rgba(255, 255, 255, 1);
  }
  .back {
    position: relative;
    left: 20px;
    top: 0px;
    font-size: 18px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 27px;
    color: rgba(255, 255, 255, 1);
  }
  .tiaozhuan {
    width: 100%;
    height: auto;
    // min-height: 80vh;

    li {
      width: 100%;
      height: 65px;
      border-top: 0.5px solid rgba(255, 255, 255, 0.1);
      font-size: 18px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      img {
        width: 17.5px;
        height: 17.5px;
        position: relative;
        left: 19px;
        top: 25px;
      }
      span {
        position: relative;
        left: 28px;
        top: 21px;
      }
    }
    li:nth-last-child(1) {
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    }
  }
}

.header {
  width: 100%;
  height: 44px;
  position: relative;
  top: 0px;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .headerchoose {
    width: 29px;
    height: 26px;
    // position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    top: 9px;
  }
  .headerlogo {
    width: 83px;
    height: 28px;
    // position: absolute;
    // left: 147px;
    margin-top: 10px;
    top: 9px;
  }
  .qiehuan {
    width: 56px;
    height: 24px;
    // position: absolute;
    // left: 304px;
    margin-right: 15px;
    margin-top: 10px;
    background: rgba(51, 51, 51, 1);
    opacity: 1;
    border-radius: 5px;
    img {
      position: relative;
      left: 7px;
    }
    span {
      position: relative;
      left: 10px;
      font-size: 10px;
      font-family: Segoe UI;
      font-weight: 400;
      line-height: 14px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
}
</style>
