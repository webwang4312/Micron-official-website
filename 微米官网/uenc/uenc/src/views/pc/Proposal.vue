<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 18:04:59
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 21:11:41
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
            :placeholder="$t('Proposal.state')"
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
          <span class="btn" @click="goPublish">+ {{ $t("Proposal.publish") }}</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="content" v-if="proposalList.length>0">
      <template v-for="list in proposalList">
        <div class="details" @click="details(list.id)" :key="list.id">
          <div class="head">
            <div class="num">{{ list.id }}</div>
            <div class="cen">
              <div class="title">{{ list.title }}</div>
              <div class="date">{{ list.createTime }}</div>
            </div>
            <div class="status">{{ $t("Proposal.status") }} ：{{ getStatus(list.status) }}</div>
          </div>
          <div class="bottom">
            <div class="text" v-html="list.summary">{{ list.summary }}</div>
            <div class="people">{{ $t("Proposal.Proposer") }} :{{ list.name }}</div>
          </div>
        </div>
      </template>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.pageNo"
          :page-sizes="[5, 10, 15, 20]"
          :page-size='searchForm.pageSize'
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
  },
  methods: {
    async goPublish() {
      let loginName = localStorage.getItem("username");
      if (loginName) {
        const data = await CheckUsersStatus(loginName);
        if (data.code === 0) {
          if (data.data === "0") {
            this.$router.push({
              path: "/pc/community/Proposal/Add"
            });
          } else {
            this.$message.error(data.msg);
          }
        } else {
          this.$message.error(data.msg);
        }
      } else {
        this.$message.error(this.$t("index.switch") === "cn" ?"请先登录您的账号信息":'Please log in ' );
      }
    },
    async getProposalList() {
      const dataList = await GetProposalList(this.searchForm);
      if (dataList.code === 0) {
        if (!dataList.rows.length) this.$message.warning(this.$t("index.switch") === "cn" ?"暂无内容":'No content' );
        dataList.rows.forEach(item => {
          item.summary = item.summary.replace(/\n/g, "<br>");
        });
        this.proposalList = dataList.rows;
        this.total = dataList.total;
      } else {
        this.$message.error(dataList.msg);
      }
    },
    async getDictList() {
      const dataList = await GetDictList({ dictType: "sys_proposal_status" });
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
        query: { id: id, type: "Proposal" }
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
</style>
<style lang="less" scoped>
.Proposal {
  .search {
    height: 900px;
    background-image: url("../../assets/images/index/Developersbg.png");
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
    cursor: pointer;
  }
  .content {
    background-image: url("../../assets/images/index/votebg.png");
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    padding-top: 96px;
  }
  .details {
    width: 1400px;
    cursor: pointer;
    margin: 20px auto;

    border-radius: 20px;
    color: #000;
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
      }
      .cen {
        flex: 1;
        padding: 0 20px;
        .title {
          height: 45px;
          font-size: 32px;
          font-weight: 500;
          color: #333333;
          line-height: 45px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .date {
          margin-top: 4px;
          height: 33px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 33px;
        }
      }
      .status {
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #323232;
        line-height: 40px;
      }
    }
    .bottom {
      background: #f6f6f6;
      padding: 12px 32px;
      margin-top: 34px;
      .text {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #656565;
        line-height: 40px;
        word-break: break-all;
        margin-bottom: 7px;
        display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;
      }
      .people {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #323232;
        line-height: 40px;
        text-align: right;
      }
    }
  }
  .page {
    margin-top: 199px;
    text-align: center;
    padding-bottom: 124px;
  }
}
</style>
