<!--
 * @Author: yaoyuting
 * @Date: 2019-08-29 23:45:36
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 20:21:01
 * @Descripttion: 
-->
<template>
  <div class="index">
    <div class="banner">
      <div class="b_content">
        <div class="title">{{ $t("index.bannerContent") }}</div>
      </div>
    </div>
    <div class="content1" >
      <div class="what">
        <div class="text">
          <div class="title">{{ $t("index.UENCTitle") }}</div>
          <div class="details">{{ $t("index.UENCContent") }}</div>
        </div>
        <img
          style="width:352px;height:349px"
          src="@/assets/images/index/1-1.png"
          alt=""
        />
      </div>
      <div class="what">
        <img
          style="width:350px;height:324px"
          src="@/assets/images/index/1-2.png"
          alt=""
        />

        <div class="texts">
          <div class="titles">{{ $t("index.EFSTitle") }}</div>
          <div class="details">{{ $t("index.EFSContent") }}</div>
        </div>
      </div>
    </div>
    <div class="content_bg">
      <div class="w1352">
        <div class="overview">
          <div class="zi-1">
            <div class="a_center">
              <span class="l_title">{{ $t("index.Network") }}</span>
            </div>
            <div class="content_style" v-if="outcomeData">
              <div class="center100">
                <div class="num">{{ outcomeData.block_number || 0 }}+</div>
                <div class="r_title">{{ $t("index.Height") }}</div>
              </div>
              <div class="center100">
                <div class="num">{{ outcomeData.reward || 0 }}+</div>
                <div class="r_title">{{ $t("index.Award") }}</div>
              </div>

              <div class="center100">
                <div class="num">{{ outcomeData.node || 0 }}+</div>
                <div class="r_title">{{ $t("index.Nodes") }}</div>
              </div>
              <div class="center100">
                <div class="num">
                  {{ outcomeData.transaction_number || 0 }}+
                </div>
                <div class="r_title">{{ $t("index.Number") }}</div>
              </div>
            </div>
            <div class="btn_style">
              <a
                target="_blank"
                href="http://www.uenc.io/chainExplorer/index.html#/"
                >{{ $t("index.Lookmore") }}<i class="el-icon-right"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
      <TechnicalCharacteristics></TechnicalCharacteristics>
    </div>
    <EconomicModels></EconomicModels>
    <Blog :blogList="blogList" v-if="blogList.length > 0"></Blog>
    <CoreMembers
      :msemberList="msemberList"
      v-if="msemberList.length > 0"
    ></CoreMembers>
    <Partners
      :partnerList="partnerList"
      v-if="partnerList.length > 0"
    ></Partners>
  </div>
</template>

<script>
import TechnicalCharacteristics from "@/views/pc/index/TechnicalCharacteristics.vue";
import EconomicModels from "@/views/pc/index/EconomicModels.vue";
import Blog from "@/views/pc/index/Blog.vue";
import CoreMembers from "@/views/pc/index/CoreMembers.vue";
import Partners from "@/views/pc/index/Partners.vue";
import {
  GetBlogList,
  GetMsemberList,
  GetPartnerList,
  GetProjectOutcome,
} from "@/assets/server/api.js";
import { baseURL, trimHtml } from "@/utils/utils";
import { setInterval } from "timers";
export default {
  components: {
    TechnicalCharacteristics,
    EconomicModels,
    Blog,
    CoreMembers,
    Partners,
  },
  data() {
    return {
      msemberList: [],
      baseURL: baseURL,
      outcomeData: null,
      blogList: [],
      partnerList: [],
    };
  },
  created() {
    this.getProjectOutcome();
    this.getBlogList();
    this.getMsemberList();
    this.getPartnerList();
    this.frash();
  },
  methods: {
    frash() {
      setInterval(() => {
        this.getProjectOutcome();
      }, 10000);
    },
    async getProjectOutcome() {
      const data = await GetProjectOutcome();
      if (data.code === 0) {
        this.outcomeData = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
    async getBlogList() {
      const data = await GetBlogList({
        pageNo: 1,
        pageSize: 10,
      });
      if (data.code === 0) {
        data.rows.forEach((item) => {
          item.images = item.images;
          item.text = trimHtml(item.text);
          item.textEn = trimHtml(item.textEn);
        });
        this.blogList = data.rows;
      } else {
        this.$message.error(data.msg);
      }
    },

    async getMsemberList() {
      const dataList = await GetMsemberList({
        pageNo: 1,
        pageSize: 8,
      });
      if (dataList.code === 0) {
        dataList.rows.forEach((item) => {
          //console.log(item);
          item.images = item.images;
        });
        this.msemberList = dataList.rows;
      } else {
        this.$message.error(
          this.$t("index.switch") === "cn" ? "接口错误！" : "Interface error!"
        );
      }
    },
    async getPartnerList() {
      const dataList = await GetPartnerList();
      if (dataList.code === 0) {
        dataList.rows.forEach((item) => {
          item.images = item.images;
        });
        // let list = [];
        // for (let index = 1; index < dataList.rows.length + 1; index++) {
        //   list.push(dataList.rows[index - 1]);
        //   if (index % 6 == 0) {
        //     this.partnerList.push(list);
        //     list = [];
        //   }
        // }
        this.partnerList = dataList.rows;
      } else {
        this.$message.error(dataList.msg);
      }
    },
  },
};
</script>
<style lang="less">
.w1352 {
  width: 1200px;
  margin: 0 auto;
}
.w1300 {
  width: 67%;
  margin: 0 auto;
}
</style>
<style lang="less" scoped>
.index {
  /* width: 900px; */
  font-size: 16px;
}
.banner {
  height: 900px;
  background: url("https://pili-vod.uenc.net/uenc_pc_homePage.png") no-repeat
    center/100% 100%;
  padding-top: 371px;
  .b_content {
    line-height: 30px;
    width: 1200px;
    margin: 0 auto;
    .title {
      width: 563px;
      font-size: 60px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 80px;
      color: #ffffff;
      opacity: 1;
    }
  }
}
.content1 {
    background-image: url("../../assets/images/index/indexbg11.png");
  // background: url("../../assets/images/index/indexbg11.png") no-repeat
  //    center/100% 100%;
     background-size: cover;
  background-position: center center;
  // height: 1421px;
  // overflow: hidden;
   padding: 190px 0 42px;
  // width: 100%;
  margin: 0 auto;
}

.what:nth-child(1) {
}
.what:nth-child(2) {
  margin-bottom: 180px;
}
.what {
  // background-image: url("../../assets/images/index/背景4@2x.png");
  // background-size: cover;
  // background-position: center center;
  width: 1200px;
  display: flex;
  flex-direction: row;
  // align-items: center;
  margin: 0 auto;
  // padding: 124px 0 px;
  // margin: 100px 0;
  margin-bottom: 191px;
  .text:nth-child(1) {
    width: 660px;
    margin-right: 172px;
  }
  .text:nth-child(2) {
    width: 660px !important;
    margin-left: 267px;
    text-align: right;
    background: gray;
  }

  .texts {
    width: 678px;
    margin-left: 170px;
    .titles {
      font-size: 50px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 66px;
      color: #333333;
      text-align: left;
      margin-bottom: 30px;
    }
    .details {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 40px;
      color: #333333;
      text-align: left;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 50px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 66px;
      color: #333333;
      text-align: left;
      margin-bottom: 30px;
    }
    .details {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 40px;
      color: #333333;
      text-align: left;
    }
  }
}
.content_bg {
  background: url("../../assets/images/index/indexbg4.png") no-repeat
    center/100% 100%;

  // padding-bottom: 230px;
  padding-top: 150px;
}
.overview {
  img {
    width: 50px;
    height: 50px;
  }
  .a_center {
    width: 100%;
    text-align: center;
    margin: 0 auto 80px;
  }
  .content_style {
    display: flex;
    justify-content: space-between;
  }
  .center100 {
    margin-left: 20px;
  }
  .l_title {
    font-size: 50px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 66px;
    color: #333333;
    // line-height: 70px;
    margin-bottom: 3px;
  }
  .num {
    font-size: 50px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: normal;
    line-height: 98px;
    color: #333333;
    text-align: left;

    margin-bottom: 10px;
  }
  .r_title {
    font-size: 20px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: normal;
    line-height: 28px;
    color: #333333;
    opacity: 1;
    text-align: right;
    padding-right: 30px;
    margin-bottom: 80px;
  }
  .h100 {
    height: 360px;
    width: 700px;
    vertical-align: middle;
  }
  .btn_style {
    width: 100%;
    text-align: center;
    a {
      font-size: 20px;
      font-family: PingFangSC-Regular;
      line-height: 27px;
      color: #6624fa;
      opacity: 1;
    }
  }
}
</style>
