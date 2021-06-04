<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 18:04:59
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-20 07:36:43
 * @Descripttion: 
-->
<template>
  <div class="Proposal">
    <div class="banner">
      <div class="sub_title">{{ $t("Proposal.Welcome") }}</div>
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
            :placeholder="$t('Proposal.state')"
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
          <el-button type="primary" @click="goPublish"
            ><i class="el-icon-plus"></i> {{ $t("Proposal.publish") }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="detalis_bg" v-if="proposalList.length > 0">
      <template v-for="list in proposalList">
        <div class="details" @click="details(list.id)" :key="list.id">
          <div class="top">
            <div class="num">{{ list.id }}</div>
            <div class="right">
              <div class="title">{{ list.title }}</div>
              <div class="date">{{ list.createTime }}</div>
            </div>
          </div>
          <div class="content">
            <div class="bottom">
              <div class="people">{{ $t("Proposal.Proposer") }}:{{ list.name }}</div>
              <div class="status">{{ $t("Proposal.status") }}：{{ getStatus(list.status) }}</div>
            </div>
            <div class="text" v-html="list.summary">{{ list.summary }}</div>
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
  </div>
</template>

<script>
import { GetProposalList, GetDictList, CheckUsersStatus } from "@/assets/server/api.js";
export default {
  data() {
    return {
      searchForm: {
        title: "",
        status: "",
        pageNo: 1,
        pageSize: 10
      },
      statusList: [],
      currentPage: 1,
      proposalList: [],
      total: 0
    };
  },
  mounted() {
    this.getProposalList();
    this.getDictList();
    console.log(this, "this");
  },
  methods: {
    async goPublish() {
      let loginName = localStorage.getItem("username");
      if (loginName) {
        const data = await CheckUsersStatus(loginName);
        if (data.code === 0) {
          if (data.data === "0") {
            this.$router.push({
              path: "/m/community/Proposal/Add"
            });
          } else {
            this.$notify({ type: "error", message: data.msg });
          }
        } else {
          this.$notify({ type: "error", message: data.msg });
        }
      } else {
        this.$notify({
          type: "error",
          message:
            this.$t("index.switch") === "cn"
              ? "请先登录您的账号信息"
              : "log in your information first"
        });
      }
    },
    more() {
      this.searchForm.pageNo++;
      this.getProposalList();
    },
    async getProposalList() {
      const dataList = await GetProposalList(this.searchForm);
      if (dataList.code === 0) {
        if (!dataList.rows.length) this.$notify({
          type: "error",
          message: this.$t("index.switch") === "cn" ? "暂无内容" : "No content"
        });
        dataList.rows.forEach(item => {
          item.summary = item.summary.replace(/\n/g, "<br>");
        });
        this.proposalList = this.proposalList.concat(dataList.rows);
        this.total = dataList.total;
      } else {
        this.$notify({ type: "error", message: dataList.msg });
      }
    },
    async getDictList() {
      const dataList = await GetDictList({ dictType: "sys_proposal_status" });
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
        query: { id: id, type: "Proposal" }
      });
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getProposalList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        text-align: center;
        margin-bottom: 120px;
        display: flex;
        justify-content: space-around;
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
    // background-size: cover;
    // background-position: center center;
    background-size: 750px;
  }
  .details {
    cursor: pointer;
    // padding-bottom: 86px;
    .top {
      display: flex;
      justify-content: flex-start;
      height: 79 * 2px;
      padding-top: 52px;
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
        max-width: 500px;
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
      background: #f6f6f6;
      .people {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: calc(100% - 200px);
        font-weight: 500;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        text-align: left;
        color: #666;
        line-height: 34px;
      }
      .status {
        width: 200px;
        text-align: right;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #484747;
        line-height: 36px;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
      }
      .text {
        max-height: 110px;
        margin-top: 20px;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #656565;
        line-height: 40px;
      }
    }
  }
  .more {
    text-align: center;
    width: 100%;
    padding: 40px 0 40px;
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
</style>
