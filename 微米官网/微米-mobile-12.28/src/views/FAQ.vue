<template>
  <div class="faq">
    <slider></slider>
    <div class="faqheader" @click="showSliderFalse">
      <p>{{ $t("recommendtitle[0]") }}</p>
      <button @click="learnmore">
        <span>{{ $t("learnmore[0]") }}</span>
      </button>
    </div>
    <div class="faqfooter" @click="showSliderFalse">
      <p class="faqtitle">{{ $t("FAQ[0]") }}</p>
      <div class="videoline"></div>
      <div class="faqfooter-img">
        <el-collapse v-model="activenum" accordion>
          <el-collapse-item
            :title="item.question"
            :name="item.id"
            id="el-collapse-itemfirst"
            v-for="item in faqlist"
            :key="item.id"
          >
            <div>
              {{ item.answer }}
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="block">
          <!-- <Page
            :total="totalNum"
            :page-size="7"
            @on-change="change"
            :cureent.sync="medianum"
            v-if="totalNum != 0"
            ref="pagination"
          /> -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalNum"
            @current-change="change"
          >
          </el-pagination>
          <!-- <van-pagination
            v-model="medianum"
            :total-items="totalNum"
            :items-per-page="7"
            :show-page-size="4"
            force-ellipses
            @change="change"
          /> -->
          <!-- <img src="../assets/images/FAQ/left.png" alt="" @click="less" /> -->
          <!-- <input type="text" v-model="page" @blur="jump" /> -->
          <!-- <img src="../assets/images/FAQ/right.png" alt="" @click="plus" /> -->
          <!-- <Page :current="1" :total="2" simple :page-size="1" @on-change="pagezoom"/> -->
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>

import { BASEURL } from "@api/api";
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
import Qs from "qs";
export default {
  name: "faq",
  data() {
    return {
      nowLang: "",
      activenum: "",
      currentPage1: 1,
      faqlist: [],
      num: 1,
      page: 1,
      fullscreenLoading: false,

      show: false,
      totalNum: 1,
      medianum: 1,
      // ppp:'',
    };
  },
  components: { slider, vFooter },
  created() {
    this.nowLang = this.$i18n.locale;
    this.activenum = this.num;
    // this.$nextTick(() => {
    //   //console.log(this.$refs.pagination);
    //   this.$refs.pagination.currentPage = this.medianum;
    // });
    this.medianum = 1;
    this.getfaqlist();
  },

  methods: {
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCengHide");
    },

    //给sessionStorage存值
    setContextData: function(key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function(key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    },
    change(page) {
      this.medianum = page;
      this.setContextData("currentpages", this.medianum);
      this.getfaqlist();
    },
    //获取FAQ数据
    getfaqlist() {
      let that = this;
      var data = Qs.stringify({ pageNum: this.medianum, pageSize: 7 });
      that.$http
        .post(`${BASEURL}` + "/weimioffice/web/content/getFaqs", data, {
          headers: { language: this.nowLang },
        })
        .then((res) => {
        
          // console.log(res);
          this.setContextData("currentpages", this.medianum);
          this.totalNum = res.data.result.total;
          //this.ppp=res.data.result.length
          //console.log( this.ppp);
          this.faqlist = res.data.result.list;
          //console.log(this.faqlist);
          localStorage.setItem("lan", this.nowLang);
        });
    },
    jump() {
      //console.log(this.num);
      this.getfaqlist();
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },

    learnmore() {
      window.open(
        "https://mp.weixin.qq.com/s?__biz=MzUyMTU1NTY5Ng==&mid=2247484931&idx=1&sn=91dcaddee98c13e6c06725a304eb6fcd&chksm=f9d81d9cceaf948aad420aa22b7bc463e3f629e862696eb3e574ca56b4be7a523b68daabf8c3&mpshare=1&scene=1&srcid=07154gMhIKKtwTlrNgO6u9iZ&sharer_sharetime=1594800298815&sharer_shareid=075076a15a657862690d0180ddb3903f&key=e48de8bee8a80c9c5acebe13a30a042386a606043989167fede9e01ef2b1a9415d95d233bf220f6c74bb387526f2c4397803eb414a57612896359a9275f10e286393070d00d2f5d150a57d432748cc42&ascene=1&uin=MjE4Nzc3NzkwMg%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AQUOr446KM5J603N%2FtWmTJc%3D&pass_ticket=qfyOfhiRNshvZQdp%2FSYKDgWCwXETPSmHaPLiir7tnGPbWXehR9Qoa4OTwWK1Mxg1"
      );
    },
  },
};
</script>
<style lang="less">
.block {
  button {
    background-color: none !important;
    background: none !important;
  }
  .el-pager {
    .number {
      font-size: 13px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 25px;
      color: #ffffff !important;
      opacity: 1;
    }
    li {
      background: none !important;
    }
    .active {
      background: #009fcd !important;
      opacity: 1;
      border-radius: 5px !important;
    }
    .btn-prev {
      background-color: none !important;
    }
  }
}

.van-pagination__item {
  background: none;
  color: white;
}
.van-pagination__item--active {
  background: #009fcd;
  border-radius: 5px;
}
[class*="van-hairline"]::after {
  border: none;
}
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.ivu-page-next {
  background-color: rgba(12, 12, 12, 1) !important;
  border: none;
}
.ivu-page-prev {
  background-color: rgba(12, 12, 12, 1);
  border: none;
}
.ivu-page-item {
  background: none;
  border: none;
}
.faq {
  width: 100%;
  height: auto;
  background-color: black;
  .faqheader {
    position: relative;
    top: 0px;
    width: 100%;
    height: 244px;
    background: url("../assets/images/FAQ/蒙版组 3.png") no-repeat center/100%
      100%;
    p {
      width: 130px;
      height: 79px;
      font-size: 18px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 0.7;
      position: absolute;
      left: 50px;
      top: 50px;
    }
    button {
      width: 78px;
      height: 30px;
      background: rgba(0, 159, 205, 1);
      opacity: 1;
      border-radius: 5px;
      border: none;
      outline: none;
      position: absolute;
      left: 50px;
      top: 144px;
      span {
        width: 48px;
        height: 17px;
        font-size: 12px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }
    }
  }
  // 视频
  .faqfooter {
    position: relative;
    width: 100%;
    height: 709px;
    background: rgba(12, 12, 12, 1);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;
    .faqtitle {
      position: absolute;
      top: 50px;
      width: 100%;
      text-align: center;
    }
    p {
      height: 22px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);

      position: absolute;

      top: 70px;
    }
    .videoline {
      width: 60px;
      height: 2px;
      background:  rgba(0, 159, 205, 1);
   margin: 0 auto;
      position: absolute;

      top: 82px;
    }
    .faqfooter-img {
      width: 345px;
      height: auto;
      margin: 0 auto;
      // background: rgba(102, 102, 102, 1);
      border-radius: 10px;
      position: absolute;
      top: 102px;
      background-color: gray;
      #el-collapse-head-3779 {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      #el-collapse-head-4932 {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .el-collapse:first-child {
        border-radius: 30px;
      }
      .el-collapse {
        width: 100%;
        height: 460px;
        border-radius: 10px;
        border: none;
        #el-collapse-itemfirst {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          border: none;
        }
        .el-collapse-item__header {
          height: 54px;
          background: rgba(102, 102, 102, 1);
          font-size: 12px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 17px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          padding-left: 21px;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
        }
        .el-collapse-item__wrap {
          width: 100%;
          height: 119px;
          background: rgba(51, 51, 51, 1);
          box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
          border: none;
          .el-collapse-item__content {
            width: 100%;
            height: 119px;
            border-radius: 10px;
            background: rgba(51, 51, 51, 1);
            box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
            font-size: 10px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 15px;
            color: rgba(255, 255, 255, 1);
            opacity: 0.8;
            padding-left: 21px;
            padding-right: 15px;
            padding-top: 40px;
            // line-height: 192px;
          }
        }
      }
      .block {
        position: absolute;
        top: 540px;
        left: 25%;
        color: snow;
        height: 30px;
        margin: 0 auto;
        img:nth-child(1) {
          position: relative;
          left: 514px;
        }
        img:nth-child(3) {
          position: relative;
          left: 674px;
        }
        input {
          width: 30px;
          height: 30px;
          position: relative;
          top: -30px;
          left: 754px;
          background: rgba(0, 159, 205, 1);
          border-radius: 5px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 42px;
          text-align: center;
          outline: none;
          border: none;
        }
        .ivu-page {
        }
        .ivu-page-simple-pager {
          #text {
            color: red;
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
