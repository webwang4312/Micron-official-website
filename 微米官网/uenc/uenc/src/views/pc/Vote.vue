<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 18:04:59
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 21:12:52
 * @Descripttion: 
-->
<template>
  <div class="Proposal">
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            class="title_bn"
            v-model="searchForm.title"
            :placeholder="$t('Proposal.title')"
            style="width: 320px"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select
            class="status_bn"
            v-model="searchForm.status"
            :placeholder="$t('Vote.State')"
            clearable
            style="width: 320px"
          >
            <el-option
              class="statusItem"
              v-for="item in statusList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="btn" @click="search">{{ $t("Proposal.Search") }}</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="content" v-if="proposalList.length > 0">
      <div class="w1300">
        <template v-for="list in proposalList">
          <div class="details" :key="list.id">
            <div class="head">
              <div class="num" @click="details(list.id)">{{ list.id }}</div>
              <div class="cen" @click="details(list.id)">
                <div class="title">{{ list.title }}</div>
                <div class="bottom">
                  <div class="people">{{ $t("Proposal.Proposer") }}:{{ list.name }}</div>
                  <!-- <div class="date">{{$t('Proposal.deadline')}} ：{{ list.deadline }}</div> -->
                  <div class="status">
                    {{ $t("Proposal.status") }} ：{{ getStatus(list.status) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="text" v-html="list.summary">{{ list.summary }}</div>

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
                    !(list.approve == 0 && list.oppose > 0) &&
                      !(list.approve > 0 && list.oppose == 0)
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
                  <img src="@/assets/images/icon/点赞 (1).png" alt="" />
                </div>
                <div @click="isPoll(2, list)" class="r">
                  {{ list.userPollStatus === 2 ? $t("Proposal.opposea") : $t("Proposal.oppose")
                  }}<img src="@/assets/images/icon/点赞.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.pageNo"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="searchForm.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </div>
    <div class="nodata" v-else>
      {{ $t("index.switch") === "cn" ? "暂无数据" : "Empty data" }}
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
        <div class="dialog-btn" @click="getPoll">{{ $t("dialog.confirm") }}</div>
        <div class="dialog-btn close" @click="close">{{ $t("dialog.cancel") }}</div>
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
    close() {
      this.statusPoll = 0;
      this.dialogVisible = false;
      this.itemPoll = null;
      this.numPoll = "";
    },
    async getPoll() {
      let loginName = localStorage.getItem("username");
      if (this.itemPoll.userPollStatus != "0") {
        return this.$message.warning(
          this.$t("index.switch") === "cn" ? "已投票，请勿重复投递！" : "Voted, do not repeat!"
        );
      }
      if (this.numPoll < 1000) {
        return this.$message.warning(
          this.$t("index.switch") === "cn"
            ? "投票数量不得小于1000"
            : "The number of votes must not be less than 1,000"
        );
      }
      if (this.numPoll > this.pollNumber) {
        return this.$message.warning(
          this.$t("index.switch") === "cn" ? "可用余额不足" : "Insufficient available balance"
        );
      }
      const data = await GetPoll({
        loginName: loginName,
        proposalId: this.itemPoll.id,
        status: this.statusPoll,
        num: this.numPoll,
        mark: this.itemPoll.status
      });
      if (data.code === 0) {
        this.$message.success(this.$t("index.switch") === "cn" ? "投票成功！" : "success");
        this.getProposalList();
        this.close();
      } else {
        this.$message.error(dataList.msg);
      }
    },
    async getProposalList() {
      const dataList = await GetPollList(this.searchForm);
      if (dataList.code === 0) {
        if (!dataList.rows.length) this.$message.warning(this.$t("index.switch") === "cn" ?"暂无内容":'No content' );
        dataList.rows.forEach(item => {
          item.summary = item.summary.replace(/\n/g, "<br>");
        });
        this.total = dataList.total;
        this.proposalList = dataList.rows;
      } else {
        this.$message.error(dataList.msg);
      }
    },
    async getDictList() {
      const dataList = await GetDictList({ dictType: "sys_poll_status" });
      if (dataList.code === 0) {
        this.statusList = dataList.rows;
      } else {
        this.$message.error(dataList.msg);
      }
    },
    search() {
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
        path: "/pc/community/Proposal/Details",
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

<style lang="less">
.statusItem.el-select-dropdown__item {
  height: 48px;
  line-height: 48px;
  font-size: 22px;
}
.Proposal {
  .nodata {
    text-align: center;
    font-size: 40px;
    margin: 100px 0;
  }
  .title_bn {
    width: 670px !important;
    height: 78px;
    input {
      height: 78px;
      font-size: 32px;
    }
    input::placeholder {
      font-size: 32px;
      color: #9a9a9a;
      height: 78px;
      line-height: 78px;
    }
  }

  .status_bn {
    width: 270px !important;
    height: 78px;
    input {
      height: 78px;
      font-size: 32px;
    }
    i {
      font-size: 24px !important;
    }
    input::placeholder {
      font-size: 32px;
      color: #9a9a9a;
      height: 78px;
      line-height: 78px;
    }
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
</style>
<style lang="less" scoped>
.Proposal {
  .btn {
    width: 200px;
    height: 78px;
    border: 2px solid #ffffff;
    border-radius: 10px;
    font-size: 32px;
    text-align: center;
    color: #ffffff;
    line-height: 78px;
    display: inline-block;
    margin-right: 20px;
  }
  .search {
    height: 900px;
    background-image: url("../../assets/images/index/Developersbg.png");
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .content {
    background-image: url("../../assets/images/index/votebg.png");
    background-size: cover;
    background-position: center center;
    overflow: hidden;
  }
  .details {
    margin-top: 86px;
    .head {
      display: flex;
      align-items: center;
      .num {
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: #5459ff;
        color: #fff;
        font-size: 32px;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
      }
      .cen {
        padding: 0 10px;
        flex: 1;
        cursor: pointer;
        .title {
          font-size: 32px;
          height: 45px;
          line-height: 45px;
          color: #333;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #323232;
          line-height: 40px;
          margin-top: 10px;
        }
      }
    }
    .text {
      margin: 18px 10px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #656565;
      line-height: 40px;
    }
    .votes {
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
  .page {
    margin-top: 150px;
    text-align: center;
    margin-bottom: 160px;
  }
}
</style>
