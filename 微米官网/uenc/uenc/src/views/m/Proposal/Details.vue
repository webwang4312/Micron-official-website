<!--
 * @Author: yaoyuting
 * @Date: 2021-04-25 20:37:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 21:32:08
 * @Descripttion: 
-->
<template>
  <div class="ProposaDetails">
    <div class="banner">
      <div class="placeholder"></div>
      <div class="details">
        <div class="item">{{ $t("Proposal.Proposer") }}：{{ ProposaData.name }}</div>
        <div class="item">{{ $t("Proposal.Creation") }}：{{ ProposaData.createTime }}</div>
        <div class="item">{{ $t("Proposal.status") }}：{{ getStatus(ProposaData.status) }}</div>
        <div class="item">{{ $t("Proposal.number") }}：{{ ProposaData.id }}</div>
        <div class="title">{{ ProposaData.title }}</div>
        <div class="votes">
          <!-- <div class="num">
            <span>{{ ProposaData.approve }}</span>
            <span class="r">{{ ProposaData.oppose }}</span>
          </div> -->
          <div class="meddile">
            <div
              class="approve"
              :style="
                `width: ${
                  ProposaData.approve
                    ? (
                        (Number(ProposaData.approve) /
                          (ProposaData.approve + Number(ProposaData.oppose))) *
                        100
                      ).toFixed(2)
                    : ProposaData.approve == 0 && ProposaData.oppose == 0
                    ? 50
                    : 0
                }%`
              "
            >
              <span>{{ ProposaData.approve }} </span>
            </div>
            <div
              class="c"
              v-if="
                !(ProposaData.approve == 0 && ProposaData.oppose > 0) &&
                  !(ProposaData.approve > 0 && ProposaData.oppose == 0)
              "
            >
              <span class="iconfont iconlan"></span>
              <span class="iconfont iconhong"></span>
            </div>
            <div
              class="oppose"
              :style="
                ` width: ${
                  ProposaData.oppose
                    ? (
                        (ProposaData.oppose /
                          (Number(ProposaData.approve) + Number(ProposaData.oppose))) *
                        100
                      ).toFixed(2)
                    : ProposaData.approve == 0 && ProposaData.oppose == 0
                    ? 50
                    : 0
                }%`
              "
            >
              <span> {{ ProposaData.oppose }}</span>
            </div>
          </div>
          <div class="foot">
            <div @click="getPollStatus(1, ProposaData)">
              {{ ProposaData.userPollStatus === 1 ? $t("Proposal.agreea") : $t("Proposal.agree") }}
              <img src="@/assets/images/icon/点赞 (1).png" alt="暂无图片" />
            </div>
            <div @click="getPollStatus(2, ProposaData)" class="r">
              {{ ProposaData.userPollStatus === 2 ? $t("Proposal.opposea") : $t("Proposal.oppose")
              }}<img src="@/assets/images/icon/点赞.png" alt="暂无图片" />
            </div>
          </div>
          <!-- <div class="foot">
            <div @click="isPoll(1, ProposaData)">
              {{ ProposaData.userPollStatus === 1 ? "已" : "" }}赞成
              <img src="@/assets/images/icon/点赞 (1).png"  alt="暂无图片" />
            </div>
            <div @click="isPoll(2, ProposaData)" class="r">
              <img src="@/assets/images/icon/点赞.png"  alt="暂无图片" />{{
                ProposaData.userPollStatus === 2 ? "已" : ""
              }}反对
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="content_bg">
      <div class="content">
        <div class="top">
          <div class="lebelTitle">{{ $t("Proposal.Abstract") }}</div>
          <div class="bg"></div>
        </div>
        <div class="text" v-html="ProposaData.summary"></div>
        <div class="top">
          <div class="lebelTitle">{{ $t("Proposal.Target") }}</div>
          <div class="bg"></div>
        </div>
        <div class="text">{{ ProposaData.target }}</div>
        <div class="top">
          <div class="lebelTitle">{{ $t("Proposal.Plan") }}</div>
          <div class="bg"></div>
        </div>
        <div class="text">{{ ProposaData.plan }}</div>
        <div class="top">
          <div class="lebelTitle">{{ $t("Proposal.Budget") }}</div>
          <div class="bg"></div>
        </div>
        <div class="text">{{ ProposaData.budget }}</div>
        <div class="planList">
          <div
            class="top"
            v-if="
              ProposaData &&
                ProposaData.implPlanList &&
                JSON.stringify(ProposaData.implPlanList) !== '{}'
            "
          >
            <div class="lebelTitle">{{ $t("Proposal.Implementation") }}</div>
            <div class="bg"></div>
          </div>
          <div
            class="title_about"
            v-if="
              ProposaData &&
                ProposaData.implPlanList &&
                JSON.stringify(ProposaData.implPlanList) !== '{}'
            "
          >
            {{ ProposaData.implPlan }}
          </div>
          <div
            class="details_text"
            v-if="
              ProposaData &&
                ProposaData.implPlanList &&
                JSON.stringify(ProposaData.implPlanList) !== '{}'
            "
          >
            <div class="sub_title">{{ $t("Proposal.Progress") }}</div>
            <div class="list" v-for="(list, date) in ProposaData.implPlanList" :key="date">
              <div class="date">{{ date }}</div>
              <div class="right">
                <div class="item" v-for="item in list" :key="item.id">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="exec_bottom" v-if="exec">
            <div class="plan">
              <el-input type="textarea" rows="6" v-model="plan"></el-input>
            </div>
            <div class="btn">
              <el-button type="primary" @click="success">{{ $t("Proposal.complete") }}</el-button>
              <el-button type="primary" @click="submit">{{ $t("Proposal.submit") }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="vote-dialog"
      :title="$t('dialog.Number')"
      :visible="dialogVisible"
      width="85%"
      :before-close="close"
      :show-close="false"
    >
      <el-input v-model="numPoll" :placeholder="$t('dialog.less')"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t("dialog.cancel") }}</el-button>
        <el-button @click="getPoll">{{ $t("dialog.confirm") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetDictList,
  GetPoll,
  AddImplPlan,
  DetailInfo,
  AddImplPlanOver
} from "@/assets/server/api.js";
import { baseURL } from "@/utils/utils";
export default {
  data() {
    return {
      statusPoll: "",
      itemPoll: null,
      numPoll: "",
      ProposaData: [],
      statusProposaData: [],
      plan: "",
      exec: false,
      poll: false,
      pollNumber: "",
      dialogVisible: false
    };
  },
  created() {
    this.getDictProposaData();
    this.isPoll();
  },
  methods: {
    close() {
      this.statusPoll = 0;
      this.dialogVisible = false;
      this.itemPoll = null;
      this.numPoll = "";
    },
    getPollStatus(status, list) {
      if (list.userPollStatus === 0) {
        this.statusPoll = status;
        this.itemPoll = list;
        if (
          (this.ProposaData.status == "1" ||
            this.ProposaData.status == "3" ||
            this.ProposaData.status == "4") &&
          this.poll
        ) {
          this.getPoll("pro");
        } else {
          if (this.poll) {
            if (this.pollNumber / 1 < 1000 && this.$route.query.type === "vote") {
              this.$notify({
                type: "error",
                message:
                  this.$t("index.switch") === "cn"
                    ? "余额至少1000以上才可以投票哦！"
                    : "balance of at least 1000"
              });
            } else {
              this.dialogVisible = true;
            }
          } else {
            this.$notify({
              type: "error",
              message:
                this.$t("index.switch") === "cn"
                  ? "您没有投票权限！"
                  : "not have the right to vote!"
            });
          }
        }
      } else {
        this.$notify({
          type: "error",
          message:
            this.$t("index.switch") === "cn"
              ? "您已参与本次投票!"
              : "participated in this poll！"
        });
      }
    },
    async isPoll() {
      let loginName = localStorage.getItem("username");
      let id = this.$route.query.id;
      const data = await DetailInfo({
        loginName: loginName,
        id: id
      });
      if (data.code == 0) {
        this.ProposaData = data.data;
        this.pollNumber = data.data.pollNumber;
        this.poll = data.data.poll;
        this.exec = data.data.exec;
      }
    },
    async success() {
      const data = await AddImplPlanOver({
        id: this.$route.query.id
      });
      if (data.code == 0) {
        this.isPoll();
      }
    },
    async submit() {
      if (this.plan == "")
        return this.$notify({
          type: "error",
          message: this.$t("index.switch") === "cn" ? "请输入内容！" : "Enter content!"
        });
      const data = await AddImplPlan({
        proposalId: this.ProposaData.id,
        content: this.plan,
        createBy: this.ProposaData.createBy
      });
      if (data.code == 0) {
        this.plan = "";
        this.isPoll();
      }
    },
    async getPoll(type = "") {
      if (type !== "pro") {
        if (this.itemPoll.userPollStatus != "0") {
          return this.$notify({
            type: "warning",
            message:
              this.$t("index.switch") === "cn" ? "已投票，请勿重复投递！" : "Voted, do not repeat!"
          });
        }
        if (this.numPoll < 1000 && this.$route.query.type === "vote") {
          return this.$notify({
            type: "warning",
            message:
              this.$t("index.switch") === "cn"
                ? "投票数量不得小于1000"
                : "Quantity less than 1000"
          });
        }
        if (this.numPoll > this.pollNumber) {
          return this.$notify({
            type: "warning",
            message:
              this.$t("index.switch") === "cn" ? "可用余额不足" : "Lack of balance"
          });
        }
      } else {
        this.numPoll = 1;
      }
      let loginName = localStorage.getItem("username");
      const data = await GetPoll({
        loginName: loginName,
        proposalId: this.itemPoll.id,
        status: this.statusPoll,
        num: this.numPoll,
        mark: this.itemPoll.status
      });
      if (data.code === 0) {
        this.$notify({
          type: "success",
          message: this.$t("index.switch") === "cn" ? "投票成功！" : "success"
        });
        this.isPoll();
        this.close();
      } else {
        this.$message.error(dataList.msg);
      }
    },
    async getDictProposaData() {
      const dataProposaData = await GetDictList({ dictType: "sys_proposal_status" });
      if (dataProposaData.code === 0) {
        this.statusProposaData = dataProposaData.rows;
      } else {
        this.$message.error(dataProposaData.msg);
      }
    },
    getStatus(type) {
      let label = "无状态";
      for (const key of this.statusProposaData) {
        if (key.dictValue == type) {
          label = key.dictLabel;
          break;
        }
      }
      return label;
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  height: 660px;
  background-image: url("../../../assets/imagesm/indba2.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  .placeholder {
    flex: 1;
  }
  .details {
    padding: 30px;
    // padding-top: 184px;
    .item {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 18px;
    }
    .title {
      font-size: 60px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: #ffffff;
      line-height: 84px;
      margin-bottom: 40px;
      max-height: 84px;
      overflow: auto;
    }
  }
  .votes {
    .meddile {
      height: 72px;
      border-radius: 56px;
      overflow: hidden;
      display: flex;
      .approve {
        height: 72px;
        line-height: 72px;
        text-align: center;
        background: linear-gradient(90deg, #4d71ff, #003cfb);
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      .c {
        display: flex;
        align-items: center;
        span {
          font-size: 76px;
        }
        .iconlan {
          color: #003cfb;
          margin-right: -14px;
          margin-left: -2px;
          margin-top: -2px;
        }
        .iconhong {
          color: #ed4038;
          margin-left: -14px;
          margin-right: -2px;
          margin-bottom: -2px;
        }
      }
      .oppose {
        height: 72px;
        line-height: 72px;
        text-align: center;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        background: linear-gradient(270deg, #f78069, #ed4038);
      }
    }
    .foot {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      div {
        width: 164px;
        height: 54px;
        background: linear-gradient(90deg, #4d71ff, #003cfb);
        border-radius: 56px;
        font-size: 24px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 24px;
          margin: 0 6px;
        }
      }
      .r {
        background: linear-gradient(270deg, #f78069, #ed4038);
      }
    }
  }
}
.content_bg {
  background-image: url("../../../assets/imagesm/ta/bg2.png");
  background-size: 750px;
}
.content {
  padding-bottom: 120px;
  .top {
    height: 128px;
    padding-top: 54px;
    padding-bottom: 24px;
  }
  .lebelTitle {
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
    margin-left: 30px;
  }
  .bg {
    margin-left: 30px;
    width: 97 * 2px;
    height: 16px;
    margin-top: -20px;
    background: linear-gradient(270deg, rgba(141, 146, 255, 0), #5459ff);
  }
  .text {
    padding: 32px;
    background: #f6f6f6;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    line-height: 40px;
    word-break: break-all;
  }
  .planList {
    .title_about {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #656565;
      line-height: 40px;
      padding: 32px;
    }
    .details_text {
      .sub_title {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 50px;
        padding-left: 32px;
        margin-bottom: 20px;
      }
      .list {
        padding: 32px;
        background: #f6f6f6;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #656565;
        line-height: 40px;
        margin-bottom: 28px;
        display: flex;
        justify-content: flex-start;

        .date {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #666666;
          line-height: 34px;
          margin-bottom: 18px;
          width: 150px;
        }
        .right {
          width: calc(100% - 150px);
        }
        .item {
          margin-bottom: 28px;
        }
      }
    }
    .exec_bottom {
      margin: 32px;
      .plan {
        margin-bottom: 20px;
      }
      .btn {
        display: flex;
        justify-content: space-between;
        .el-button {
          width: 260px;
          height: 72px;
          background: #5432f4;
          border-radius: 8px;
          border: none;
          font-size: 28px !important;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>

<style lang="less">
.ProposaDetails {
  .el-dialog {
    background: #ffffff;
    border-radius: 24px;
    padding: 0 40px;
    .el-dialog__title {
      padding: 0;
      margin: 0;
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 56px;
    }
    .el-dialog__header {
      padding: 0;
      padding-top: 30px;
      margin-bottom: 56px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-input__inner {
      height: 74px;
      background: #ffffff;
      border-radius: 4px;
      border: 2px solid #999999;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-around;
      margin-top: 64px;
      margin-bottom: 60px;
      .el-button {
        width: 164px;
        height: 74px;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        border: none;
      }
      .el-button:nth-child(1) {
        background: #ececec;
        color: #9f9f9f;
      }
      .el-button:nth-child(2) {
        background: #5432f4;
        color: #ffffff;
      }
    }
  }
}
</style>
