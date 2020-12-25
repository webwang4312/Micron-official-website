<template>
  <div class="notfound">
   <headertop></headertop>
    <div class="notzong">
      <!-- 搜索栏区域 -->
      <search></search>
      <div class="not">
        <img src="../assets/images/404/pr-04.png" alt="">
        <p>{{ $t("notfound[0]") }}</p>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>

import Search from "@components/common/search.vue";
import VFooter from "@components/common/Footer.vue";
import headertop from "@components/common/HeaderTop";
export default {
  name: "chart",
  data() {
    return {
      sticky: false,
      // 外部公共部分
      nowLang: "",
      cur: "",
      fullscreenLoading: false,
      language: "",
      chose: "",
      // 语言图片显示与隐藏
      show: true,
      choselanguage: ["中文", "EN"],
    };
  },
  components: { VFooter, Search,headertop },
  beforeDestory() {},
  created() {
    this.nowLang = this.$i18n.locale;
    if (this.nowLang == "en") {
      this.chose = "lan";
    }
    if (this.nowLang == "cn") {
      this.chose = "语言";
    }
    this.cur = 3;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
  methods: {
    // 滚动固定区域
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > 0) {
        this.sticky = true;
      }
      if (scrollTop < 10) {
        this.sticky = false;
      }

      // console.log(scrollTop);
    },
    // 外部公共部分
    chinese() {
      this.fullscreenLoading = true;
      this.$i18n.locale = "cn";
      localStorage.setItem("lang", "cn");
      setTimeout(() => {
        this.$router.go(0);
      }, 1500);
    },
    english() {
      this.fullscreenLoading = true;
      this.$i18n.locale = "en";
      localStorage.setItem("lang", "en");
      setTimeout(() => {
        this.$router.go(0);
      }, 1500);
    },
    switchLan2() {
      this.show = true;
    },
    // 选择语言
    switchLan() {
      this.show = !this.show;
    },
    // 页面的切换选择
    jump(index, title) {
      this.cur = 3;
      let localPath = this.$route.path;
      if (localPath != "/d") {
        switch (title) {
          case "首页":
            this.$router.push({
              name: "index",
            });
            break;
          case "区块":
            this.$router.push({
              name: "block",
            });
            break;
          case "交易":
            this.$router.push({
              name: "transaction",
            });
            break;
          case "图表":
            this.$router.push({
              name: "chart",
            });
            break;
          case "地址":
            this.$router.push({
              name: "addressed",
            });
            break;
          case "Fastoken":
            this.$router.push({
              name: "Fastoken",
            });
            break;
          // 英文路由
          case "Home":
            this.$router.push({
              name: "index",
            });
            break;
          case "Block":
            this.$router.push({
              name: "block",
            });
            break;
          case "Trans":
            this.$router.push({
              name: "transaction",
            });
            break;
          case "Chart":
            this.$router.push({
              name: "chart",
            });
            break;
          case "Address":
            this.$router.push({
              name: "addressed",
            });
            break;
          case "Fastoken":
            this.$router.push({
              name: "Fastoken",
            });
            break;
        }
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less">
.sticky {
  width: 1200px !important;
  height: 120px !important;
  position: fixed;
  top: 0px;
  margin: 0 auto !important;
}
// 本页面
.notfound {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 40px;
  .notzong {
    width: 1200px;
    height: 880px;
    background: rgba(232, 234, 243, 1);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 40px;
  }
  .not {
    width: 1120px;
    height: 660px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 20px;
    margin: 0 auto;
    img{
      width: 533.38px;
      height: 400px;
      position: relative;
      left: 295px;
      top: 80px;
    }
   p{
      position: relative;
      left: 400px;
      top: 101px;
   }
  }
}
</style>
