<!--
 * @Author: yaoyuting
 * @Date: 2019-08-29 23:45:36
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-17 22:02:42
 * @Descripttion: 
-->
<template>
  <div class="index" >
    <div class="content">
      <div class="banner">
        <div class="text">{{ $t("index.bannerContent") }}</div>
      </div>
      <div class="what_bg">
        <div class="what">
          <div class="text">
            <div class="title">{{ $t("index.UENCTitle") }}</div>
            <div class="details">{{ $t("index.UENCContent") }}</div>
          </div>
          <div class="bottom">
            <img src="@/assets/imagesm/index/配图1.png" alt="暂无图片" />
          </div>
        </div>
        <div class="fast">
          <div class="title">{{ $t("index.EFSTitle") }}</div>
          <div class="text">
            {{ $t("index.EFSContent") }}
          </div>
          <div class="left">
            <img src="@/assets/imagesm/index/配图2.png" alt="暂无图片" />
          </div>
        </div>
      </div>
      <div class="bg_style">
        <div class="overview">
          <div class="title">
            {{ $t("index.Network") }}
          </div>
          <div class="overview_con" v-if="outcomeData">
            <div class="line">
              <div class="center">
                <div class="num">{{ outcomeData.block_number || 0 }}+</div>
                <div class="r_title">{{ $t("index.Height") }}</div>
              </div>
              <div class="center">
                <div class="num">{{ outcomeData.reward || 0 }}+</div>
                <div class="r_title">{{ $t("index.Award") }}</div>
              </div>
            </div>
            <div class="line">
              <div class="center">
                <div class="num">{{ outcomeData.node || 0 }}+</div>
                <div class="r_title">{{ $t("index.Nodes") }}</div>
              </div>
              <div class="center">
                <div class="num">
                  {{ outcomeData.transaction_number || 0 }}+
                </div>
                <div class="r_title">{{ $t("index.Number") }}</div>
              </div>
            </div>
          </div>
          <div class="btn">
            <a
              target="_blank"
              class="btn_styles"
              href="http://www.uenc.io/fastoken/index.html#/"
              >{{ $t("index.Lookmore") }}<i class="el-icon-right"></i
            ></a>
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
  </div>
</template>

<script>
import TechnicalCharacteristics from "@/views/m/index/TechnicalCharacteristics.vue";
import EconomicModels from "@/views/m/index/EconomicModels.vue";
import Blog from "@/views/m/index/Blog.vue";
import CoreMembers from "@/views/m/index/CoreMembers.vue";
import Partners from "@/views/m/index/Partners.vue";
import {
  GetBlogList,
  GetMsemberList,
  GetPartnerList,
  GetProjectOutcome,
} from "@/assets/server/api.js";
import { baseURL, trimHtml } from "@/utils/utils";
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
        this.$notify({ type: "error", message: data.msg });
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
        this.$notify({ type: "error", message: data.msg });
      }
    },
    async getMsemberList() {
      const dataList = await GetMsemberList({
        pageNo: 1,
        pageSize: 8,
      });
      if (dataList.code === 0) {
        dataList.rows.forEach((item) => {
          item.images = item.images;
        });
        this.msemberList = dataList.rows;
      } else {
        this.$notify({
          type: "error",
          message:
            this.$t("index.switch") === "cn"
              ? "接口错误！"
              : "Interface error!",
        });
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
        // this.partnerList.push(list);
        this.partnerList = dataList.rows;
      } else {
        this.$notify({ type: "error", message: dataList.msg });
      }
    },
  },
};
</script>

<style lang="less" scoped>

.content {
  width: 750px;
  .banner {
    height: 660px;
    background-image: url("../../assets/imagesm/indba.png");
    background-size: cover;
    background-position: center center;
    display: flex;
    // align-items: center;
    // justify-content: center;
    padding-left: 40px;
    padding-bottom: 84px;
    display: flex;
    align-items: flex-end;
    .text {
      width: 514px;
font-size: 56px;
font-family: PingFang SC;
font-weight: 600;
line-height: 69px;
color: #FFFFFF;
opacity: 1;
    }
  }
}
.what_bg {
    background: url("../../assets/imagesm/index/what_bg.png") no-repeat
    center/100% 100%;
  // background-image: url("../../assets/imagesm/index/what_bg.png");
  // background-size: cover;
  // background-position: center center;
  .what {
    padding-top: 60px;
    // background-color: pink;
    .text {
      padding: 0 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        width: 100%;
        text-align: center;
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 28px;
        color: #333333;
        opacity: 1;
        // margin-top: 60px;
        margin-bottom: 40px;
      }
      .details {
        width: 668px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 60px;
        color: #333333;
        opacity: 1;
        margin: 0 auto;
        margin-bottom: 80px;
      }
    }
    .bottom {
      text-align: center;
      margin-bottom: 80px;
      img {
        width: 400px;
        height: 398px;
      }
    }
  }
  .fast {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      text-align: center;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 600;
      // line-height: 28px;
      color: #333333;
      opacity: 1;
      margin-bottom: 40px;
    }
    .text {
      width: 668px;

      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 60px;
      color: #333333;
      opacity: 1;
      margin: 0 auto;
      margin-bottom: 80px;
    }
    .left {
      text-align: center;

      margin-bottom: 104px;
      img {
        width: 400px;
        height: 366px;
      }
    }
  }
}
.bg_style {
   background: url("../../assets/imagesm/index/main_bg.png") no-repeat
    center/100% 100%;
  // background-image: url("../../assets/imagesm/index/main_bg.png");
  // background-size: cover;
  // background-position: center center;
  // background:red;
}
.overview {
  padding-top: 186px;
  .title {
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 66px;
    color: #333333;
    opacity: 1;
    text-align: center;
    margin-bottom: 52px;
    // background: chocolate;
  }
  .overview_con {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    .line:nth-child(1) {
      margin-left: 72px;
    }
    .line {
      width: 336px;

      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      .center:nth-child(2),
      .center:nth-child(4) {
        margin-top: 100px;
        margin-bottom: 64px;
      }
      .center {
      

        .num {
          font-size: 48px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 66px;
          color: #333333;
          opacity: 1;
          margin-bottom: 12px;
        }
        .r_title {
          width: 100%;
        // text-align: right;
          font-size: 24px;
          font-family: PingFangSC-Regular;
          line-height: 32px;
          color: #333333;
          opacity: 1;
          margin-bottom: 12px;
          // padding-right:160px;
        }
      }
    }
  }
  .btn {
    font-size: 26px;
    font-family: PingFangSC-Medium;
    line-height: 34px;
    color: #5432f4;
    opacity: 1;
    text-align: center;

    .btn_styles {
      font-size: 26px;
      font-family: PingFangSC-Medium;
      line-height: 34px;
      color: #5432f4;
      opacity: 1;
    }
  }
}
</style>
