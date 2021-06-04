<!--
 * @Author: yaoyuting
 * @Date: 2021-04-25 20:37:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 21:30:20
 * @Descripttion: 
-->
<template>
  <div class="ProposaDetails">
    <div class="banner">
      <div class="abc"></div>
      <div class="details">
        <div>{{ $t("Proposal.Proposer") }} ：{{ ProposaData.name }}</div>
        <div>{{ $t("Proposal.Creation") }} ：{{ ProposaData.createTime }}</div>
        <div>
          {{ $t("Proposal.status") }} ：{{ getStatus(ProposaData.status) }}
        </div>
        <div>{{ $t("Proposal.number") }} ：{{ ProposaData.id }}</div>

        <div class="title">{{ ProposaData.title }}</div>
        <div class="votes">
          <div class="num">
            <span>{{ ProposaData.approve }}</span>
            <span class="r">{{ ProposaData.oppose }}</span>
          </div>
          <div class="meddile">
            <div
              class="approve"
              :style="`width: ${
                ProposaData.approve
                  ? ((ProposaData.approve + ProposaData.oppose) /
                      ProposaData.approve) *
                    100
                  : ProposaData.approve == 0 && ProposaData.oppose == 0
                  ? 50
                  : 0
              }%`"
            ></div>
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
              :style="`width: ${
                ProposaData.oppose
                  ? ((ProposaData.approve + ProposaData.oppose) /
                      ProposaData.oppose) *
                    100
                  : ProposaData.approve == 0 && ProposaData.oppose == 0
                  ? 50
                  : 0
              }%`"
            ></div>
          </div>
          <div class="foot" v-if="poll">
            <div @click="getPollStatus(1, ProposaData)">
              {{
                ProposaData.userPollStatus === 1
                  ? $t("Proposal.agreea")
                  : $t("Proposal.agree")
              }}
              <img src="@/assets/images/icon/点赞 (1).png" alt="" />
            </div>
            <div @click="getPollStatus(2, ProposaData)" class="r">
              {{
                ProposaData.userPollStatus === 2
                  ? $t("Proposal.opposea")
                  : $t("Proposal.oppose")
              }}<img src="@/assets/images/icon/点赞.png" alt="" />
            </div>
          </div>
          <div class="foot_style" v-else>
            <div>
              {{
                ProposaData.userPollStatus === 1
                  ? $t("Proposal.agreea")
                  : $t("Proposal.agree")
              }}
            </div>
            <div class="r">
              {{
                ProposaData.userPollStatus === 2
                  ? $t("Proposal.opposea")
                  : $t("Proposal.oppose")
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="w1300">
        <div>
          <div class="title">{{ $t("Proposal.Abstract") }}</div>
          <div class="text summary">
            <div v-html="ProposaData.summary"></div>
            <span class="more-txt" @click="more">展开全部</span>
            <span class="close-more" @click="closeMore">收起</span>
          </div>
        </div>
        <div>
          <div class="title">{{ $t("Proposal.Target") }}</div>
          <div class="text">{{ ProposaData.target }}</div>
        </div>
        <div>
          <div class="title">{{ $t("Proposal.Plan") }}</div>
          <div class="text">{{ ProposaData.plan }}</div>
        </div>
        <div>
          <div class="title">{{ $t("Proposal.Budget") }}</div>
          <div class="text">{{ ProposaData.budget }}</div>
        </div>
        <div>
          <div
            class="title"
            v-if="
              ProposaData &&
              ProposaData.implPlanList &&
              JSON.stringify(ProposaData.implPlanList) !== '{}'
            "
          >
            {{ $t("Proposal.Implementation") }}
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
            class="text"
            v-if="
              ProposaData &&
              ProposaData.implPlanList &&
              JSON.stringify(ProposaData.implPlanList) !== '{}'
            "
          >
            <div class="sub_title">{{ $t("Proposal.Progress") }}</div>
            <div
              class="list"
              v-for="(list, date) in ProposaData.implPlanList"
              :key="date"
            >
              <div class="date">{{ date }}</div>
              <div class="right">
                <div class="item" v-for="item in list" :key="item.id">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="exec">
            <div class="plan">
              <el-input type="textarea" rows="6" v-model="plan"></el-input>
            </div>
            <div class="btn">
              <el-button type="primary" @click="success">{{
                $t("Proposal.complete")
              }}</el-button>
              <el-button type="primary" @click="submit">{{
                $t("Proposal.submit")
              }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="vote-dialog"
      :title="$t('dialog.Number')"
      :visible="dialogVisible"
      width="600px"
      :before-close="close"
    >
      <el-input v-model="numPoll" :placeholder="$t('dialog.less')"></el-input>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn" @click="getPoll">
          {{ $t("dialog.confirm") }}
        </div>
        <div class="dialog-btn close" @click="close">
          {{ $t("dialog.cancel") }}
        </div>
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
  AddImplPlanOver,
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
      dialogVisible: false,
    };
  },
  mounted() {
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
            if (
              this.pollNumber / 1 < 1000 &&
              this.$route.query.type === "vote"
            ) {
              this.$message.error(
                this.$t("index.switch") === "cn"
                  ? "余额至少1000以上才可以投票哦！"
                  : "Only with a balance of at least 1000 can you vote!"
              );
            } else {
              this.dialogVisible = true;
            }
          } else {
            this.$message.error(
              this.$t("index.switch") === "cn"
                ? "您没有投票权限！"
                : "You do not have the right to vote!"
            );
          }
        }
      } else {
        this.$message.error(
          this.$t("index.switch") === "cn"
            ? "您已参与本次投票!"
            : "You have participated in this poll！"
        );
      }
    },
    async isPoll() {
      let loginName = localStorage.getItem("username");
      let id = this.$route.query.id;
      const data = await DetailInfo({
        loginName: loginName,
        id: id,
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
        id: this.$route.query.id,
      });
      if (data.code == 0) {
        this.isPoll();
      }
    },
    async submit() {
      if (this.plan == "")
        return this.$message.error(
          this.$t("index.switch") === "cn"
            ? "请输入内容！"
            : "Please enter content!"
        );
      const data = await AddImplPlan({
        proposalId: this.ProposaData.id,
        content: this.plan,
        createBy: this.ProposaData.createBy,
      });
      if (data.code == 0) {
        this.plan = "";
        this.isPoll();
      }
    },
    async getPoll(type = "") {
      if (type !== "pro") {
        if (this.itemPoll.userPollStatus != "0") {
          return this.$message.warning(
            this.$t("index.switch") === "cn"
              ? "已投票，请勿重复投递！"
              : "Voted, do not repeat!"
          );
        }
        if (this.numPoll < 1000 && this.$route.query.type === "vote") {
          return this.$message.warning(
            this.$t("index.switch") === "cn"
              ? "投票数量不得小于1000"
              : "The number of votes must not be less than 1,000"
          );
        }
        if (this.numPoll > this.pollNumber) {
          return this.$message.warning(
            this.$t("index.switch") === "cn"
              ? "可用余额不足"
              : "Insufficient available balance"
          );
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
        mark: this.itemPoll.status,
      });
      if (data.code === 0) {
        this.$message.success(
          this.$t("index.switch") === "cn" ? "投票成功！" : "success"
        );
        this.isPoll();
        this.close();
      } else {
        this.$message.error(dataList.msg);
      }
    },
    async getDictProposaData() {
      const dataProposaData = await GetDictList({
        dictType: "sys_proposal_status",
      });
      if (dataProposaData.code === 0) {
        this.statusProposaData = dataProposaData.rows;
        setTimeout(()=>{
          this.$nextTick(()=>{
            let contentDom = document.querySelectorAll('.summary')[0];
            let height = contentDom.offsetHeight;
            if (height > 142) {
              contentDom.style.height = '142px'
              contentDom.querySelector('.more-txt').style.display='block'
            }
          })
        },50)
      } else {
        this.$message.error(dataProposaData.msg);
      }
    },
    more() {
      let contentDom = document.querySelectorAll('.summary')[0];
      contentDom.querySelector('.more-txt').style.display='none'
      contentDom.querySelector('.close-more').style.display='block'
      contentDom.style.height = 'auto'
    },
    closeMore() {
      let contentDom = document.querySelectorAll('.summary')[0];
      contentDom.querySelector('.more-txt').style.display='block'
      contentDom.querySelector('.close-more').style.display='none'
      contentDom.style.height = '142px'
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
    },
  },
};
</script>

<style lang="less" scoped>
.banner {
  height: 900px;
  background-image: url("../../../assets/images/index/Developersbg.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .abc {
    flex: 1;
  }
  .details {
    margin: 0px 274px;
    margin-bottom: 10px;
    color: #fff;
    font-size: 26px;
    line-height: 60px;
    .title {
      margin-top: 30px;
      font-weight: bold;
      font-size: 60px;
      line-height: 112px;
      max-height: 224px;
      overflow: auto;
    }
  }
  .votes {
    margin-top: 30px;
    .num {
      display: flex;
      justify-content: space-between;
      font-size: 44px;
      color: #053ffb;
      .r {
        color: #f1594c;
      }
    }
    .meddile {
      border-radius: 56px;
      height: 32px;
      overflow: hidden;
      display: flex;
      .approve {
        height: 32px;
        background: linear-gradient(90deg, #4d71ff, #003cfb);
      }
      .c {
        display: flex;
        align-items: center;
        span {
          font-size: 46px;
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
        height: 32px;
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
    .foot_style {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      font-size: 24px;
      font-weight: 600;
      div {
        color: #003cfb;
      }
      .r {
        color: #ed4038;
      }
    }
  }
}
.content {
  background-image: url("../../../assets/images/index/voteD.png");
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  padding: 180px 0;
  .title {
    font-size: 32px;
    color: #333333;
    position: relative;
    margin-top: 60px;
  }
  .title::before {
    position: absolute;
    left: 0;
    bottom: 8px;
    content: "";
    width: 97px;
    height: 7px;
    background: linear-gradient(270deg, rgba(141, 146, 255, 0), #5459ff);
  }
  .text {
    background: #f9f9f9;
    padding: 20px;
    font-size: 24px;
    color: #656565;
    line-height: 40px;
    margin-top: 22px;
    word-break: break-all;
  }
  .title_about {
    padding: 20px;
    font-size: 24px;
    color: #656565;
    line-height: 40px;
    margin-top: 22px;
  }
  .sub_title {
    font-size: 32px;
    color: #333333;
    margin-bottom: 20px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    .date {
      margin-right: 20px;
      width: 150px;
    }
    .right {
      width: calc(100% - 150px);
    }
    .item {
      margin-bottom: 10px;
    }
  }
  .plan {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .btn {
    display: flex;
    justify-content: space-between;
  }
}
.vote-dialog {
  width: 600px;
  height: 417px;
  border-radius: 25px;
  .el-dialog__header {
    padding: 30px 60px;
    .el-dialog__title {
      font-size: 28px;
    }
    .el-dialog__headerbtn {
      top: 30px;
    }
    .el-dialog__close {
      font-size: 26px;
      color: #305bbc;
    }
  }
  .el-dialog__body {
    padding: 40px 60px 60px;
    .el-input__inner {
      width: 480px;
      height: 70px;
      background: #ffffff;
      border: 1px solid #999999;
      border-radius: 3px;
      font-size: 24px;
      border: 1px solid #999999;
    }
  }
  .el-dialog__footer {
    padding-ottom: 60px;
    .dialog-footer {
      display: flex;
      justify-content: center;
    }

    .dialog-btn {
      width: 158px;
      line-height: 70px;
      height: 70px;
      text-align: center;
      background: #4c67ef;
      border-radius: 4px;
      font-size: 28px;
      color: #ffffff;
      margin: 0 28px;
      cursor: pointer;
    }
    .close {
      background: #afb7e0;
    }
  }
}
.content .summary {
  // height: 142px;
  overflow: hidden;
  position: relative;
  padding-right: 180px;
  .more-txt {
    display: none;
    width: 180px;
    font-size: 24px;
    text-align: center;
    color: #4B3EFF;
    float: right;
    position: absolute;
    right: 0;
    bottom: 6px;
    cursor: pointer;
  }
  .close-more {
    display: none;
    font-size: 24px;
    width: 180px;
    text-align: center;
    color: #4B3EFF;
    float: right;
    position: absolute;
    bottom: 6px;
    right: 0;
    cursor: pointer;
  }
  .more-txt {
    display: none;
  }
  .close-more {
    display: none;
  }
}
</style>
