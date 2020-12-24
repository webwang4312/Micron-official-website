<template>
  <div class="headertop">
    <div class="slide" :class="{ duan: short }">
      <div @click="duan" class="baoguo">
        <span class="lefticon">&lt;</span>
        <span class="back">{{ $t("back[0]") }}</span>
      </div>

      <ul class="tiaozhuan">
        <li
          @click="jump(index, item.title)"
          :class="{ active: cur == index }"
          v-for="(item, index) in nav"
          :key="index"
        >
          <div
            :class="{ tiaozhuanline: cur == index, chang: cur == index }"
          ></div>
          <img
            :src="item.img"
            :class="{ active: cur == index }"
            v-if="cur == index"
          />
          <img :src="item.img2" v-else />
          <span :class="{ active: cur == index }">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <div class="header" :class="{ sticky: sticky }">
      <img
        src="@assets/images/index/组 3.png"
        class="headerchoose"
        @click="duan2"
      />
      <img src="@assets/images/index/组 2.png" class="headerlogo" />
      <div
        class="qiehuan"
        @click="selectlanguage"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        <img src="@assets/images/index/切换.png" alt />
        <span>中/英</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/bus.js";
export default {
  name: "headertop",
  data() {
    return {
      short: true,
      sticky: false,
      fullscreenLoading: false,
      cur: 0,
    };
  },
  watch: {},
  mounted() {
    //this.cur=0;
    // this.getNowRouter();
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.nowLang = this.$i18n.locale;
    this.cur = 0;
    this.getSession();
  },
  actived() {},
  computed: {
    nav: {
      get() {
        let navE = this.$t("nav");
        return navE;
      },
      set() {},
    },
  },
  destroyed() {
    // 滚动取消

    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    duan2() {
      this.short = false;
    },
    duan() {
      this.short = true;
    },
    // 滚动固定区域
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
    // 切换语言
    selectlanguage() {
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
    // 页面的切换选择
    jump(index, title) {
      this.cur = index;
      // console.log(this.cur);
      console.log(index);
      localStorage.setItem("cur", index);
      let localPath = this.$route.path;
      if (localPath != "/d") {
        switch (title) {
          case "首页":
            this.$router.push({
              name: "index",
            });
            break;
          case "FAQ":
            this.$router.push({
              name: "FAQ",
            });
            break;
          case "关于项目":
            this.$router.push({
              name: "about",
            });
            break;
          case "媒体公告":
            this.$router.push({
              name: "news",
            });
            break;
          case "合作伙伴":
            this.$router.push({
              name: "partner",
            });
            break;
          // 英文路由
          case "Home":
            this.$router.push({
              name: "index",
            });
            break;
          case "FAQ":
            this.$router.push({
              name: "FAQ",
            });
            break;
          case "About":
            this.$router.push({
              name: "about",
            });
            break;
          case "News":
            this.$router.push({
              name: "news",
            });
            break;
          case "Partner":
            this.$router.push({
              name: "partner",
            });
            break;
        }
      }
    },
    getSession() {
      this.cur = localStorage.getItem("cur");
      // console.log(this.cur);
    },
  },
};
</script>

<style lang="less">
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
 
}
.duan {
  position: relative;
  left: -1000px;
}
.chang {
  animation: linechange 0.5s linear;
  animation-fill-mode: forwards;
}
.tiaozhuanline {
  animation: linechange 0.5s linear;
  animation-fill-mode: forwards;
}
.active {
  color: rgba(0, 159, 205, 1);
}
.slide {
  width: 188px;
  height: 812px;
  position: fixed;
  top: 0;
  background: rgba(51, 51, 51, 1);
  z-index: 30;
  .baoguo {
    width: 80px;
    height: auto;
    position: absolute;
    right: 18px;
    top: 64px;
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
    height: 329px;
    position: absolute;
    top: 109px;
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
      border-bottom: 1px solid gray;
    }
  }
}

.header {
  width: 100%;
  height: 88px;
  position: relative;
  top: 0px;
  z-index: 20;
  display: flex;
  flex-direction: row;

  .headerchoose {
    width: 29px;
    height: 26px;
    position: absolute;
    left: 15px;
    top: 53px;
  }
  .headerlogo {
    width: 83px;
    height: 28px;
    position: absolute;
    left: 147px;
    top: 52px;
  }
  .qiehuan {
    width: 56px;
    height: 24px;
    position: absolute;
    left: 304px;
    top: 54px;
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
