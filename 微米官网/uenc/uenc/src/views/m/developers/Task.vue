<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 07:52:31
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 08:22:25
 * @Descripttion: 
-->
<template>
  <div class="Task">
    <div class="sub_title">{{ $t("Developer.Bounty") }}</div>
    <div class="task_const">
      <div class="title">{{ $t("Developer.Mission") }}</div>
      <div class="details">
        <div class="list">
          <div class="left">
            <img src="@/assets/imagesm/kfz/任务.png" alt="暂无图片" srcset="" />
          </div>
          <div class="right">
            <div class="level3title">{{ $t("Developer.Total") }}</div>
            <div class="num">{{ bountyData && bountyData.count }}</div>
          </div>
        </div>
        <div class="list">
          <div class="left">
            <img src="@/assets/imagesm/kfz/完成.png" alt="暂无图片" srcset="" />
          </div>
          <div class="right">
            <div class="level3title">{{ $t("Developer.Finished") }}</div>
            <div class="num">{{ bountyData && bountyData.end }}</div>
          </div>
        </div>
        <div class="list">
          <div class="left">
            <img src="@/assets/imagesm/kfz/奖励.png" alt="暂无图片" srcset="" />
          </div>
          <div class="right">
            <div class="level3title">{{ $t("Developer.Award") }}</div>
            <div class="num">{{ bountyData && bountyData.reward }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="task_list">
      <div class="title">{{ $t("Developer.list") }}</div>
      <div class="scroll" v-if="total > 0">
        <div class="details">
          <el-card
            class="box-card"
            v-for="bount in bountyList"
            :key="bount.taskId"
          >
            <div class="box">
              <div class="title">
                {{ $t("index.switch") === "en" ? bount.titleEn : bount.title }}
              </div>
              <div class="medile">
                {{
                  $t("index.switch") === "en"
                    ? bount.introductionEn
                    : bount.introduction
                }}
              </div>
              <div class="bottom">
                <div class="reward">
                  {{ $t("Developer.reward") }}：<span>{{ bount.reward }}</span>
                  UENC
                </div>
                <router-link
                  :to="{ path: '/m/Task/Details', query: { id: bount.taskId } }"
                >
                  <el-button type="text"
                    >{{ $t("Developer.more") }}<i class="el-icon-right"></i
                  ></el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="notask" v-show="total == 0">
        <img src="@/assets/imagesm/notask.png" alt="" />
        <div>
          {{ $t("developers[3]") }}
        </div>
      </div>
    </div>
    <div class="vulnerabilitybg">
      <div class="vulnerability">
        <div class="title">{{ $t("Developer.Security") }}</div>
        <div class="content">{{ $t("Developer.SecurityText") }}</div>
        <div class="content">{{ $t("Developer.SecurityNote") }}</div>
        <!-- <div class="btn">
          <el-button type="text" @click="copyLink"
            >{{ $t("Developer.copyEmail") }}<i class="el-icon-right"></i
          ></el-button>
        </div> -->
        <div class="all_center">
          <div class="images all_center">
            <img src="@/assets/imagesm/kfz/安全漏洞奖励.png" alt="暂无图片" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetBountyList, GetBountyStatistics } from "@/assets/server/api.js";
export default {
  data() {
    return {
      total: Number,
      bountyList: [],
      bountyData: null,
    };
  },
  created() {
    this.getBountyList();
    this.getBountyStatistics();
  },
  methods: {
    async getBountyList() {
      const dataList = await GetBountyList({ pageNo: 0, pageSize: 12 });
      if (dataList.code === 0) {
        this.bountyList = dataList.rows;
        this.total = dataList.total;
        //  console.log(this.total);
      } else {
        this.$notify({ type: "error", message: dataList.msg });
      }
    },
    async getBountyStatistics() {
      const data = await GetBountyStatistics();
      if (data.code === 0) {
        this.bountyData = data.data;
      } else {
        this.$notify({ type: "error", message: data.msg });
      }
    },
    copyLink() {
      var link = "tech@uenc.net";
      var newNode = document.createElement("input");
      newNode.value = link;
      document.body.appendChild(newNode);
      newNode.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      newNode.style.display = "none";
      this.$notify({
        type: "success",
        message: this.$t("index.switch") === "cn" ? "复制成功" : "success",
      });
    },
  },
};
</script>
<style lang="less">
.Task {
  .el-card__body {
    height: 100%;
  }
}
</style>
<style lang="less" scoped>
.Task {
  .sub_title {
    margin: 0 40px;

    padding-top: 142px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 28px;
    color: #000000;
    opacity: 1;
    text-align: center;
    // border-top: 1px solid #000;
  }
  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 56px;
    color: #323232;
    opacity: 1;
    margin-top: 34px;
    margin-bottom: 38px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .task_const {
    margin: 0 32px;
    .details {
      display: flex;
      justify-content: space-between;
      .list {
        width: 220px;
        height: 100px;
        background: #fbf6ff;
        padding: 14px 20px;
        display: flex;
        // justify-content: space-around;
        align-items: center;
        // background: gray;
        .right{
          margin-left: 18px;
          .level3title{}
        }
        .left {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #e8ddf1;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
            height: 30px;
          }
        }
        .level3title {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 32px;
          color: #333333;
          opacity: 1;
          text-align: right;
        }
        .num {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 36px;
          color: #333333;
          opacity: 1;
          text-align: right;
        }
      }
    }
  }
  .task_list {
    margin-left: 32px;
    .title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 56px;
      color: #323232;
      opacity: 1;
      margin-top: 80px;
      margin-bottom: 40px;
    }
    .scroll {
      overflow-x: scroll;
      .details {
        display: inline-flex;
        margin-bottom: 146px;
        .box-card {
          width: 600px;
          height: 544px;
          background: #fbf6ff;
          margin-right: 20px;
          padding: 0 44px;
          padding-bottom: 52px;
          .box {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .title {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 42px;
            color: #0d051f;
            opacity: 1;
            border-bottom: 1px solid #000;
            padding-bottom: 30px;
            margin-bottom: 30px;
          }
          .medile {
            flex: 1;
            overflow: hidden;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 52px;
            color: #0d051f;
            opacity: 1;
            margin-bottom: 30px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
          }
          .bottom {
            border-top: 1px solid #000;
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            .reward {
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 28px;
              color: #0d051f;
              opacity: 1;
              span {
                font-size: 60px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 84px;
                color: #0d051f;
                opacity: 1;
              }
            }
            .el-button {
              font-size: 26px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 36px;
              color: #5432f4;
              opacity: 1;
            }
          }
        }
      }
    }
    .notask {
      padding-top: 81px;

      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 42px;
      color: #707070;
      opacity: 1;
      img {
        width: 522px;
        height: 383px;
        text-align: center;
      }
    }
  }
  .vulnerabilitybg {
    background-image: url("../../../assets/imagesm/kfz/bg2.png");
    background-size: cover;
    background-position: center center;
    .vulnerability {
      margin: 0 40px;
      padding-bottom: 162px;
      .title {
        padding-top: 82px;
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 66px;
        color: #000000;
        opacity: 1;
        text-align: center;
        margin-bottom: 60px;
      }
      .content {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 52px;
        color: #333333;
        opacity: 1;
        margin-bottom: 80px;
      }
      .btn {
        text-align: right;
        .el-icon-right {
          margin-left: 24px;
        }
      }
      .el-button {
        font-size: 32px !important;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4b3eff;
        line-height: 44px;
      }
      .images {
        width: 364px;
        height: 362px;

        img {
          width: 364px;
          height: 362px;
        }
      }
    }
  }
}
</style>
