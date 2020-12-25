<template>
  <div class="media">
    <slider></slider>
    <div class="partnerheader" @click="showSliderFalse">
      <p>{{ $t("recommendtitle[0]") }}</p>
      <button @click="learnmore">
        <span>{{ $t("learnmore[0]") }}</span>
      </button>
    </div>
    <div class="mediafooter" @click="showSliderFalse">
      <p class="partnertitle">{{ $t("media[1]") }}</p>
      <div class="videoline"></div>
      <ul class="tab-title">
        <li
          v-for="(item, index) in medialist"
          :key="index"
          @click="
            godetail(
              item.content_id,
              item.content,
              item.title,
              item.updatedate,
              item.thumb,
              item.description
            )
          "
        >
          <p>{{ item.title }}</p>
          <img src="../assets/images/media/组 250@3x.png" alt />
        </li>
      </ul>
      <div class="mediablock">
        <Page
          :current="2"
          simple
          :total="totalNum"
          :page-size="9"
          @on-change="change"
          :cureent.sync="medianum"
          v-if="totalNum != 0"
          ref="pagination"
        />
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNum"
          @current-change="change"
        >
        </el-pagination> -->
        <!-- <van-pagination
          v-model="medianum"
          :total-items="totalNum"
          :items-per-page="9"
          :show-page-size="4"
          force-ellipses
          @change="change"
        /> -->
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
  name: "media",
  data() {
    return {
      short: true,
      sticky: false,
      nowLang: "",
      medianum: "",
      activenum: "",
      medialist: [],
      medialist2: [],
      mediacur: 0,
      page: "",
      fullscreenLoading: false,
      show: false,
      totalNum: 1,
      tomoretotal: "",
    };
  },
  components: { slider, vFooter },
  created() {
    this.nowLang = this.$i18n.locale;
    this.$nextTick(() => {
      this.$refs.pagination.currentPage = this.medianum;
    });
    this.medianum = this.getContextData("currentpage2") || 1;
    this.medianum = 1;
    this.getmedialist();
  },
  mounted() {},
  methods: {
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCengHide");
    },

    learnmore() {
      window.open(
        "https://mp.weixin.qq.com/s?__biz=MzUyMTU1NTY5Ng==&mid=2247484931&idx=1&sn=91dcaddee98c13e6c06725a304eb6fcd&chksm=f9d81d9cceaf948aad420aa22b7bc463e3f629e862696eb3e574ca56b4be7a523b68daabf8c3&mpshare=1&scene=1&srcid=07154gMhIKKtwTlrNgO6u9iZ&sharer_sharetime=1594800298815&sharer_shareid=075076a15a657862690d0180ddb3903f&key=e48de8bee8a80c9c5acebe13a30a042386a606043989167fede9e01ef2b1a9415d95d233bf220f6c74bb387526f2c4397803eb414a57612896359a9275f10e286393070d00d2f5d150a57d432748cc42&ascene=1&uin=MjE4Nzc3NzkwMg%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AQUOr446KM5J603N%2FtWmTJc%3D&pass_ticket=qfyOfhiRNshvZQdp%2FSYKDgWCwXETPSmHaPLiir7tnGPbWXehR9Qoa4OTwWK1Mxg1"
      );
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
      this.setContextData("currentpage2", this.medianum);
      this.getmedialist();
    },
    // 转到detail详情页
    godetail(id, content, title, updatedate, thumb, description) {
      // this.showDetail = true;
      // this.$refs.detail.getdetaillist(id);
      this.$router.push({
        path: "/detail",
        query: {
          content_id: id,
          content: content,
          title: title,
          updatedate: updatedate,
          thumb: thumb,
          description: description,
        },
      });
    },
    //获取MEDIA
    getmedialist() {
      let that = this;
      var data = Qs.stringify({ pageNum: this.medianum, pageSize: 9 });
      that.$http
        .post(`${BASEURL}` + "/weimioffice/web/content/getNews", data, {
          headers: { language: this.nowLang },
        })
        .then((res) => {
            // console.log(res);
          // console.log(res.data.result.total);
          // this.totalNum = res.data.result.total;
          this.totalNum = res.data.result.total;
          //console.log(this.totalNum);
          this.medialist = res.data.result.list;
          // console.log(this.medialist);
          for (let i = 0; i < this.medialist.length; i++) {
            if (this.nowLang == "en") {
              if (this.medialist[i].title.length > 18) {
                this.medialist[i].title =
                  this.medialist[i].title.substring(0, 18) + "...";
              } else {
                 this.medialist[i].title = this.medialist[i].title
              }
            }
            if (this.nowLang == "cn") {
              if (this.medialist[i].title.length > 18) {
                this.medialist[i].title =
                  this.medialist[i].title.substring(0, 18) + "...";
              } else {
                this.medialist[i].title = this.medialist[i].title
              }
            }
          }
        });
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
.mediablock {
  .ivu-page-simple-pager {
  input {
    background-color: rgba(12, 12, 12, 1) !important;
    border: none !important;
    outline: none !important;
    color: aliceblue !important;
  }
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
  .van-pagination {
    margin-top: 30px;
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
      min-width: 20px;
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

.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
.media {
  width: 100%;
  height: auto;
  background-color: black;
  .partnerheader {
    position: relative;
    top: 0px;
    width: 100%;
    height: 244px;
    background: url("../assets/images/media/蒙版组 4@3x.png") no-repeat
      center/100% 100%;
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
  .mediafooter {
    position: relative;
    width: 100%;
    height: 5660px;
    height: 200px;
    min-height: 560px;
    background: rgba(12, 12, 12, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    .partnertitle {
      width: 100%;
      height: 22px;
      position: absolute;
      text-align: center;
      margin: 0 auto;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 22px;
      color: rgba(255, 255, 255, 1);
      top: 50px;
    }
    .videoline {
      width: 60px;
      height: 0px;
      border: 2px solid rgba(0, 159, 205, 1);
      position: relative;
      margin: 0 auto;
      top: 72px;
    }

    .tab-title {
      height: 368px;
      position: relative;
      width: 345px;
      display: flex;
      flex-direction: column;
      top: 50px;
      margin: 0 auto;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      // background-color: goldenrod;
      li:nth-child(1) {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      li:nth-last-child(1) {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      li {
        position: relative;
        width: 345px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        line-height: 100px;
        text-align: center;
        background: rgba(102, 102, 102, 1);
        cursor: pointer;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        p {
          width: 80%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          font-family: "苹方-简";
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          margin-left: 15px;
          top: 0px;
          text-align: left;
          vertical-align: middle;
        }
        span {
          text-align: center;
          margin-left: 35px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 101px;
        }
        .media-tab-line {
          width: 0px;
          height: 100px;
          background: rgba(0, 159, 205, 1);
        }
        img {
          width: 7.41px;
          height: 13.41px;
          position: relative;
          left: 30px;
          top: 15px;
        }
      }
    }
    .mediablock {
      width: 345px !important;
      height: 50px;

      margin: 0 auto;
      text-align: center;
      .ivu-page {
        width: 100%;
        margin: 0 auto;
      }
    }
  }
}
</style>
