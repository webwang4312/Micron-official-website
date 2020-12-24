<template>
  <div class="detail">
    <div class="detailheadertop">
      <div class="detailheaders" :class="{ sticky: sticky }">
        <img
          src="../assets/images/detail/组 267@3x.png"
          class="return"
          @click="returned"
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
    <div class="detailheader"></div>
    <div class="detailfooter">
      <div class="detailfooter-content">
        <div class="detaies">
          {{ detaies }}
        </div>
        <div v-html="updatedate" class="update">
          >
        </div>
        <div v-html="description" id="detailcontent">
          >>
        </div>
        <div v-html="content" :class="{ sca: sca }" id="detailimg"></div>
        <!-- <div class="detailfooter-right"></div> -->
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { BASEURL } from "@api/api";
//import headerTop from "@components/content/HeaderTop.vue";
import vFooter from "@components/common/vFooter";
import Qs from "qs";
import bus from "@/bus.js";
export default {
  name: "detail",

  data() {
    return {
      nowLang: "",
      sticky: false,
      sca: false,
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
  components: { vFooter },
  created() {
    this.nowLang = this.$i18n.locale;
    this.id = this.$route.query.content_id;
    this.getdetaillist();
    //console.log(this.$route.query);
    //console.log(this.$route.query.content_id);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //  console.log(scrollTop);
      if (scrollTop > 10) {
        this.sticky = true;
      }
      if (scrollTop <= 0) {
        this.sticky = false;
      }
      // console.log(scrollTop);
    },
    scaed() {
      this.sca = !this.sca;
    },
    returned() {
      this.$router.go(-1); // 后退
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
    async getdetaillist() {
      let that = this;
      await that.$http
        .get(`${BASEURL}` + "/weimioffice/web/content/getContent", {
          params: { content_id: this.id },
          headers: { language: this.nowLang },
        })
        .then((res) => {
          //  console.log(res);
          this.detaies = res.data.result.title;
          this.content = res.data.result.content;
          // console.log(this.content);
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
  },
};
</script>
<style lang="less">
.sticky {
  width: 100% !important;
  top: 0;
  left: 0;
  right: 0;
  position: fixed !important;
  background-color: black !important;
}
.detail {
  width: 100%;
  height: auto;
  background-color: black;
  .detailheaders {
    width: 100%;
    height: 44px;
    position: relative;
    top: 0px;
    z-index: 20;
    display: flex;
    flex-direction: row;
    .return {
      position: absolute;
      top: 8px;
      left: 21px;
      width: 15.74px;
      height: 27.24px;
    }
    .headerchoose {
      width: 29px;
      height: 26px;
      position: absolute;
      left: 15px;
      top: 8px;
    }
    .headerlogo {
      width: 83px;
      height: 28px;
      position: absolute;
      left: 147px;
      top: 8px;
    }
    .qiehuan {
      width: 56px;
      height: 24px;
      position: absolute;
      left: 304px;
      top: 8px;
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
  .detailheader {
    position: relative;
    top: 0px;
    width: 100%;
    height: 120px;
    background: url("../assets/images/detail/蒙版组 4.png") no-repeat
      center/100% 100%;
  }
  .detailfooter {
    position: relative;
    top: 0px;
    width: 100%;
    height: auto;
    .detailfooter-content {
      width: 100%;
      height: auto;
      background: black;
      img {
        width: 100% !important;
        height: auto !important;
        float: none;
      }
      .detaies {
        width: 100%;
        margin: 0 auto;
        margin-top: 50px;
        // position: absolute;
        text-align: center;
        top: 20px;
        font-size: 18px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 25px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }
      .update {
        text-align: center;
        margin-top: 5px;
        font-size: 9px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 1);
        opacity: 0.5;
      }
      #detailcontent {
        margin-top: 15px !important;
        width: 345px;
        margin: 0 auto;
        font-size: 10px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 15px;
        color: rgba(255, 255, 255, 1);
        opacity: 0.8;
      }
      #detailimg {
        margin-top: 15px !important;
        margin-bottom: 50px !important;
        width: 90%;
        margin: 0 auto;
        opacity: 1;
        word-wrap: break-word;
        word-break: normal;
      }
      .detailfooter-left {
        position: absolute;
        left: 15px;
        top: 182px;
        width: 345px !important;
        height: 600px;
        // img {
        //   width: 345px !important;
        //   height: 600px !important;
        // }
        // p {
        //   width: 345px !important;
        //   font-size: 10px !important;
        //   span {
        //     font-size: 10px !important;
        //     img {
        //       width: 345px !important;
        //       height: 100px !important;
        //     }
        //   }
        // }
      }
    }
  }
}
</style>
