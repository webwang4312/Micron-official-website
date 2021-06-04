<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 18:04:59
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 21:43:18
 * @Descripttion: 
-->
<template>
  <div class="Proposal">
    <div class="banner">
      <div class="sub_title">{{ $t("Vote.vote") }}</div>
      <div class="search">
        <div class="tpp">
          <input
            type="text"
            v-model="searchForm.title"
            class="el-input__inner"
            :placeholder="$t('Proposal.title')"
          />
          <el-select
            v-model="searchForm.status"
            :placeholder="$t('Vote.State')"
            class="select_style"
            clearable
          >
            <el-option
              v-for="item in statusList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="search">{{ $t("Proposal.Search") }}</el-button>
        </div>
      </div>
    </div>
    <div class="detalis_bg" v-if="proposalList.length > 0">
      <template v-for="list in proposalList">
        <div class="details" :key="list.id">
          <div class="top" @click="details(list.id)">
            <div class="num">{{ list.id }}</div>
            <div class="right">
              <div class="title toe">{{ list.title }}</div>
              <div class="date">{{ list.createTime }}</div>
            </div>
          </div>
          <div class="content">
            <div class="bottom">
              <div class="people toe">{{ $t("Proposal.Proposer") }}:{{ list.name }}</div>
              <div class="status">{{ $t("Proposal.status") }}：{{ getStatus(list.status) }}</div>
            </div>
            <div class="text" v-html="list.summary">{{ list.summary }}</div>
            <!-- <div class="time">{{$t('Proposal.deadline')}}：{{ list.deadline }}</div> -->
          </div>
          <div class="votes">
            <div class="num">
              <span>{{ list.approve }}</span>
              <span class="r">{{ list.oppose }}</span>
            </div>
            <div class="meddile">
              <div
                class="approve"
                :style="
                  `width: ${
                    list.approve
                      ? (
                          (Number(list.approve) / (list.approve + Number(list.oppose))) *
                          100
                        ).toFixed(2)
                      : list.approve == 0 && list.oppose == 0
                      ? 50
                      : 0
                  }%`
                "
              ></div>
              <div
                class="c"
                v-if="
                  !(list.approve == 0 && list.oppose > 0) && !(list.approve > 0 && list.oppose == 0)
                "
              >
                <span class="iconfont iconlan"></span>
                <span class="iconfont iconhong"></span>
              </div>
              <div
                class="oppose"
                :style="
                  ` width: ${
                    list.oppose
                      ? (
                          (list.oppose / (Number(list.approve) + Number(list.oppose))) *
                          100
                        ).toFixed(2)
                      : list.approve == 0 && list.oppose == 0
                      ? 50
                      : 0
                  }%`
                "
              ></div>
            </div>
            <div class="foot">
              <div @click="isPoll(1, list)">
                {{ list.userPollStatus === 1 ? $t("Proposal.agreea") : $t("Proposal.agree") }}
                <img src="@/assets/images/icon/点赞 (1).png" alt="暂无图片" />
              </div>
              <div @click="isPoll(2, list)" class="r">
                {{ list.userPollStatus === 2 ? $t("Proposal.opposea") : $t("Proposal.oppose")
                }}<img src="@/assets/images/icon/点赞.png" alt="暂无图片" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="more">
        <span v-if="proposalList.length < total" @click="more">
          {{ $t("index.switch") === "cn" ? "浏览更多" : "more" }}
        </span>
      </div>
    </div>
    <div class="all_center" v-else>
      {{ $t("index.switch") === "cn" ? "暂无数据" : "Empty data" }}
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
import { GetPollList, GetDictList, GetPoll, DetailInfo } from "@/assets/server/api.js";
import { log } from "util";
export default {
  data() {
    return {
      statusPoll: "",
      itemPoll: null,
      numPoll: "",
      searchForm: {
        title: "",
        status: "",
        pageNo: 1,
        pageSize: 10
      },
      statusList: [],
      currentPage: 1,
      proposalList: [],
      total: 0,
      dialogVisible: false,
      pollNumber: 0,
      poll: false,
      exec: false
    };
  },
  created() {
    let loginName = localStorage.getItem("username");
    this.searchForm.loginName = loginName;
  },
  mounted() {
    this.getProposalList();
    this.getDictList();
  },
  methods: {
    async isPoll(status, list) {
      if (list.userPollStatus === 0) {
        this.statusPoll = status;
        this.itemPoll = list;
        const data = await DetailInfo({
          loginName: this.searchForm.loginName,
          id: list.id
        });
        if (data.code == 0) {
          this.pollNumber = data.data.pollNumber;
          this.poll = data.data.poll;
          this.exec = data.data.exec;
          if (this.poll) {
            if (this.pollNumber / 1 < 1000) {
              this.$notify({
                type: "error",
                message:
                  this.$t("index.switch") === "cn"
                    ? "余额至少1000以上才可以投票哦！"
                    : "balance of at least 1000 "
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
              : "Participated in this poll"
        });
      }
    },
    close() {
      this.statusPoll = 0;
      this.dialogVisible = false;
      this.itemPoll = null;
      this.numPoll = "";
    },
    async getPoll() {
      let loginName = localStorage.getItem("username");
      if (this.itemPoll.userPollStatus != "0") {
        return this.$notify({
          type: "warning",
          message:
            this.$t("index.switch") === "cn" ? "已投票，请勿重复投递！" : "Voted, do not repeat!"
        });
      }
      if (this.numPoll < 1000) {
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
          message: this.$t("index.switch") === "cn" ? "可用余额不足" : "Lack of balance"
        });
      }
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
        this.getProposalList();
        this.close();
      } else {
        this.$notify({ type: "error", message: dataList.msg });
      }
    },
    more() {
      this.searchForm.pageNo++;
      this.getProposalList();
    },
    async getProposalList() {
      const dataList = await GetPollList(this.searchForm);
      if (dataList.code === 0) {
        if (!dataList.rows.length) this.$notify({
          type: "error",
          message: this.$t("index.switch") === "cn" ? "暂无内容" : "No content"
        });
        dataList.rows.forEach(item => {
          item.summary = item.summary.replace(/\n/g, "<br>");
        });
        this.total = dataList.total;
        this.proposalList = this.proposalList.concat(dataList.rows);
      } else {
        this.$notify({ type: "error", message: dataList.msg });
      }
    },
    async getDictList() {
      const dataList = await GetDictList({ dictType: "sys_poll_status" });
      if (dataList.code === 0) {
        this.statusList = dataList.rows;
      } else {
        this.$notify({ type: "error", message: dataList.msg });
      }
    },
    search() {
      this.proposalList = [];
      this.getProposalList();
    },
    getStatus(type) {
      let label = "无状态";
      for (const key of this.statusList) {
        if (key.dictValue == type) {
          label = key.dictLabel;
          break;
        }
      }
      return label;
    },
    details(id) {
      this.$router.push({
        path: "/m/community/Proposal/Details",
        query: { id: id, type: "vote", exec: this.exec }
      });
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getProposalList();
    },
    handleCurrentChange(val) {
      this.searchForm.pageNo = val;
      this.getProposalList();
    }
  }
};
</script>

<style lang="less" scoped>
.Proposal {
  min-height: 1400px;
  .all_center {
    margin-top: 300px;
  }
  .banner {
    height: 372 * 2px;
    background-image: url("../../assets/imagesm/indba2.png");
    background-size: cover;
    background-position: center center;
    padding: 0 32px;
    .sub_title {
      font-size: 44px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: #ffffff;
      line-height: 60px;
      margin-bottom: 28px;
      padding-top: 148 * 2px;
    }
    .search {
      .tpp {
        margin-bottom: 54px;
        .el-input__inner {
          line-height: 64px;
          width: 343 * 2px;
          height: 38 * 2px;
          background: #ffffff;
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 34px;
          margin-bottom: 30px;
        }
        .select_style {
          width: 126 * 2px;
          height: 76px;
          background: #ffffff;
          border-radius: 8px;
        }
      }
      .bottom {
        margin-bottom: 120px;
        .el-button {
          padding: 0;
          margin: 0;
          width: 109 * 2px;
          height: 64px;
          border-radius: 8px;
          border: 4px solid #ffffff;
          background-color: rgba(0, 0, 0, 0);
          font-size: 28px !important;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }
  .detalis_bg {
    background-image: url("../../assets/imagesm/ta/bg.png");
    background-size: 750px;
  }
  .details {
    cursor: pointer;
    padding-bottom: 86px;
    .top {
      display: flex;
      justify-content: flex-start;
      height: 77 * 2px;
      padding-top: 48px;
      .num {
        width: 72px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        background: #6624fa;
        border-radius: 12px;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      .title {
        font-size: 28px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 40px;
        margin-bottom: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 600px;
      }
      .date {
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;
        line-height: 34px;
      }
    }
    .content {
      margin-top: 24px;
      padding: 30px;
      font-size: 24px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #656565;
      line-height: 34px;
      .bottom {
        display: flex;
        justify-content: space-between;
      }
      .text {
        // height: 206px;
        overflow: hidden;
        margin-top: 18px;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
    .votes {
      padding: 32px;
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
        height: 40px;
        border-radius: 56px;
        overflow: hidden;
        display: flex;
        .approve {
          height: 40px;
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
          height: 40px;
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
  .more {
    text-align: center;
    width: 100%;
    padding: 0px 0 40px;
    font-size: 28px;
    color: #5432F4;
    cursor: pointer;
  }
}
</style>
<style lang="less">
.banner {
  .el-input {
    position: static;
  }
  .el-select {
    position: static;
  }
  .el-input__suffix {
    position: static;
    margin-left: -60px;
  }
  .el-input__inner {
    font-size: 24px !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 34px;
  }
}
.Proposal {
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
        background: #5432F4;
        color: #ffffff;
      }
    }
  }
}
</style>
