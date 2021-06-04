<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 16:40:33
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 07:59:54
 * @Descripttion: 
-->
<template>
  <div class="TaskDetails" v-if="bountyDetail">
    <div class="banner"></div>
    <div class="content_bg">
      <div class="content">
        <div class="titleDate">
          <div class="title">
            {{
              $t("index.switch") === "en"
                ? bountyDetail.titleEn
                : bountyDetail.title
            }}
          </div>
        </div>
        <div class="text">
          {{
            $t("index.switch") === "en"
              ? bountyDetail.descriptionEn
              : bountyDetail.description
          }}
        </div>
        <div class="num">
          <span class="circle"></span>{{ $t("task.Number") }} ：{{
            bountyDetail.applyCount
          }}
        </div>
        <div class="githup">
          <span class="circle"></span>Github ：<a
            target="_blank"
            :href="bountyDetail.github"
          >
            {{ bountyDetail.github }}</a
          >
          <span class="gray">
            {{ $t("task.Click") }}
          </span>
        </div>
        <div class="timeSubmit">
          <div class="time">
            <span class="circle"></span>{{ $t("task.Deadline") }} ：<span>{{
              bountyDetail.endTime
            }}</span>
          </div>
          <div class="date">
            <span class="circle"></span>
            {{ $t("task.Completion") }} ：<span class="num" id='red'>{{
              bountyDetail.reward
            }}</span
            >UENC
          </div>
          <div class="submit">
            <el-button
              v-if="bountyDetail.isApply === '2'"
              type="info"
              size="small"
              disabled
              style="background: gray;"
            >
              {{ $t("index.switch") === "cn" ? "已报名" : "Have to sign up" }}
            </el-button>
            <el-button
              v-else-if="bountyDetail.isApply === '3'"
              type="info"
              size="small"
              disabled
              style="background: gray;"
            >
              {{ $t("index.switch") === "cn" ? "任务已结束" : "Mission over" }}
            </el-button>
            <el-button
              v-else
              style="background: #5432F4;"
              type="primary"
              size="small"
              @click="apply"
              >{{ $t("task.task") }}</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="$t('task.apply')"
      :visible.sync="dialogVisible"
      width="86%"
      :before-close="handleClose"
      :show-close="false"
    >
      <span class="prompt">{{ $t("task.info") }}</span>
      <el-form :model="applyForm" class="demo-form-inline">
        <el-form-item :label="$t('dialog.id')">
          <el-input v-model="applyForm.facebook"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.github')">
          <el-input v-model="applyForm.github"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">{{
          $t("dialog.cancel")
        }}</el-button>
        <el-button type="primary" @click="submit" size="small">{{
          $t("dialog.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
class ApplyForm {
  constructor() {
    this.facebook = "";
    this.github = "";
  }
}
import { GetBountyDetail, GetBountyApply } from "@/assets/server/api.js";
export default {
  data() {
    return {
      dialogVisible: false,
      bountyDetail: null,
      applyForm: new ApplyForm(),
    };
  },
  created() {
    this.getBountyDetail();
  },
  methods: {
    async getBountyDetail() {
      this.id = this.$route.query.id;
      this.loginName = localStorage.getItem("username") || null;
      const data = await GetBountyDetail(this.id + "/" + this.loginName);
      if (data.code === 0) {
        this.bountyDetail = data.data;
      } else {
        this.$notify({
          type: "danger",
          message:
            this.$t("index.switch") === "cn"
              ? "接口错误！"
              : "Interface error!",
        });
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.applyForm = new ApplyForm();
    },
    apply() {
      this.getBountyDetail();
      if (this.loginName) {
        this.dialogVisible = true;
        this.applyForm.bountyTaskId = this.bountyDetail.taskId;
      } else {
        this.$notify({
          type: "danger",
          message:
            this.$t("index.switch") === "cn"
              ? "请先登录再报名"
              : "Please sign in first",
        });
      }
    },
    async submit() {
      let loginName = localStorage.getItem("username");
      if (!loginName)
        this.$notify({
          type: "danger",
          message:
            this.$t("index.switch") === "cn"
              ? "请先去登录或注册"
              : "Please login or register",
        });
      this.applyForm.loginName = loginName;
      for (const key in this.applyForm) {
        const element = this.applyForm[key];
        if (element === "" || !element) {
          return this.$notify({
            type: "danger",
            message:
              this.$t("index.switch") === "cn" ? "不能为空" : "Can it be empty",
          });
        }
      }
      const data = await GetBountyApply({ ...this.applyForm });
      if (data.code === 0) {
        this.$notify({
          type: "success",
          message: this.$t("index.switch") === "cn" ? "报名成功！" : "success",
        });
        this.handleClose();
        this.getBountyDetail();
      } else {
        this.$notify({ type: "error", message: data.msg });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.TaskDetails {

  .banner {
    height: 110px;
    background: #34375a;
   position: -webkit-sticky;

  position: sticky;
    z-index: 100;
  }
  .content_bg {
    // background-image: url("../../../assets/imagesm/rw/bg.png");
    // background-size: 750px;
    z-index: 1;
    .content {
      padding: 0 42px 524px;
      .circle {
        width: 13px;
        height: 13px;
        background: #000000;
        margin-right: 34px;
        font-size: 13px;
        display: inline-block;
        border-radius: 50%;
      }
    }
  }
  .titleDate {
   
    margin-bottom: 42px;
    margin-top: 60px;
    .title {
    font-size: 40px;
font-family: PingFang SC;
font-weight: 600;
line-height: 56px;
color: #000000;
opacity: 1;

word-break:break-all;       

word-wrap:break-word;    
      // text-overflow: ellipsis;
      // overflow: hidden;
      // white-space: nowrap;
      // text-align: center;
    }
    .date {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40px;
      color: #0d051f;
      opacity: 1;
      .num {
        color: #df0500 !important;
      }
    }
  }
  .text {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 70px;
    color: #000000;
    opacity: 1;
    margin-bottom: 50px;
  }
  .num {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40px;
    color: #0d051f;
    opacity: 1;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .githup {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36px;
    color: black;
    opacity: 1;
    margin-bottom: 30px;
    .gray {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 36px;
      color: #999999;
      opacity: 1;
    }
    span {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40px;
      color: #0d051f;
      opacity: 1;
    }
    a {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40px;
      color: #0d051f;
      opacity: 1;
    }
  }
  .timeSubmit {
    // display: flex;
    // justify-content: space-between;
    .time {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0d051f;
      margin-bottom: 30px;
      span {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #df0500;
      }
    }
    .el-button {
      width: 668px;
      height: 80px;
      background: #5432f4;
      opacity: 1;
      border-radius: 8px;
      margin-top: 80px;
      border: none;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 42px;
      color: #ffffff;
      opacity: 1;
    }
  }
}
</style>

<style lang="less">
.TaskDetails {
  #red {
    color: #df0500 !important;
    font-size: 33px!important;
font-family: PingFang SC!important;
font-weight: 400!important;
// line-height: 40px!important;
color: #DF0500!important;
opacity: 1!important;
  }
  .el-dialog {
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 40px 106px;
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-dialog__title {
      padding: 0;
      margin: 0;
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      // line-height: 56px;
      margin-bottom: 16px;
      color: #000000;
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }
    .prompt {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .el-form-item__label {
      font-size: 30px !important;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #323232;
    }
    .el-form {
      margin-top: 54px;
    }
    .el-input__inner {
      height: 74px;
      background: #ffffff;
      border-radius: 4px;
      border: 2px solid #999999;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-around;
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
