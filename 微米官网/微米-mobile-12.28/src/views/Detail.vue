<template>
  <div class="detail">
    <HeaderDeatil></HeaderDeatil>
    <div class="detailheader"></div>
    <div class="detailfooter">
      <div class="detailfooter-content">
        <div class="detaies">
          {{ detaies }}
        </div>
        <div v-html="updatedate" class="update">
        
        </div>
        <div v-html="description" id="detailcontent">
      
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
import HeaderDeatil from "@components/common/HeaderDetail";
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
  components: { vFooter, HeaderDeatil },
  created() {
    this.nowLang = this.$i18n.locale;
    this.id = this.$route.query.content_id;
    this.getdetaillist();
    //console.log(this.$route.query);
    //console.log(this.$route.query.content_id);
  },

  methods: {
    scaed() {
      this.sca = !this.sca;
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
.detail {
  width: 100%;
  height: auto;
  background-color: black;

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
