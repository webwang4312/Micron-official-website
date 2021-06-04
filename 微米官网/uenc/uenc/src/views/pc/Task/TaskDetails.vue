<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 16:40:33
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 08:47:04
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
          <div class="date">
            {{ $t("task.Completion") }} ：<span>{{ bountyDetail.reward }}</span
            >UENC
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
           <div class="dian"></div>
          {{ $t("task.Number") }} ：{{ bountyDetail.applyCount }}
        </div>
        <div class="githup">
           <div class="dian"></div>Github：<a target="_blank" :href="bountyDetail.github" style="font-size: 28px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 37px;
color: #0D051F;">{{
            bountyDetail.github
          }}</a
          >
          <span>
 {{ $t("task.Click") }}
          </span>
         
        </div>
        <div class="timeSubmit">
          <div class="time">
            <div class="dian"></div>
            {{ $t("task.Deadline") }} ：<span>{{ bountyDetail.endTime }}</span>
          </div>
          <div class="submit">
            <el-button
              v-if="bountyDetail.isApply === '2'"
              type="info"
              size="small"
              disabled
            >
              {{ $t("index.switch") === "cn" ? "已报名" : "Have to sign up" }}
            </el-button>
            <el-button
              v-else-if="bountyDetail.isApply === '3'"
              type="info"
              size="small"
              disabled
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
      width="600px"
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
      <div class="btnz">
        <div class="btn2">
        <el-button type="text" @click="handleClose">{{
          $t("dialog.cancel")
        }}</el-button>
      </div>
<div class="btn1">
        <el-button type="primary" @click="submit">{{
          $t("dialog.confirm")
        }}</el-button>
      </div>
      
      </div>
      
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
      loginName: null,
      id: "",
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
        this.$message.error(
          this.$t("index.switch") === "cn" ? "接口错误！" : "Interface error!"
        );
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
        this.$message.error(
          this.$t("index.switch") === "cn"
            ? "请先登录再报名"
            : "Please sign in first"
        );
      }
    },
    async submit() {
      let loginName = localStorage.getItem("username");
      if (!loginName)
        return this.$message.error(
          this.$t("index.switch") === "cn"
            ? "请先去登录或注册"
            : "Please go to login or register first"
        );
      this.applyForm.loginName = loginName;
      for (const key in this.applyForm) {
        const element = this.applyForm[key];
        console.log(element);
        if (element === "" || !element) {
          return this.$message.error(
            this.$t("index.switch") === "cn" ? "不能为空" : "Can it be empty"
          );
        }
      }
      const data = await GetBountyApply({ ...this.applyForm });
      if (data.code === 0) {
        this.$message.success(
          this.$t("index.switch") === "cn" ? "报名成功！" : "success"
        );
        this.handleClose();
        this.getBountyDetail();
      } else {
        this.$message.error(data.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.time{
  span{
    font-size: 28px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 37px;
color: #DF0500;
  }
}
.githup{
  span{
    font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 26px;
color: #999999;
  }
}
.time,.num,.githup {
  display: flex;
  flex-direction: row;
  align-items: center;
  .dian {
    width: 10px;
    height: 10px;
    background: #000000;
    border-radius: 50%;
    opacity: 1;
    margin-right: 11px;
  }
}
.TaskDetails {
  .num,
  .githup,
  .time {
    // font-size: 20px;
    // font-family: PingFangSC-Medium, PingFang SC;
    // font-weight: 500;
    // color: #0d051f;
    // line-height: 28px;
    font-size: 28px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 37px;
color: #0D051F;
    i {
      margin-right: 4px;
      width: 20px;
    }
  }
  .banner {
    background-image: url("../../../assets/images/header/开发者header.png");
    background-size: cover;
    background-position: center center;
    height: 900px;
  }
  .content_bg {
    background-image: url("../../../assets/images/index/rwxqbg1.png");
    background-size: cover;
    background-position: center center;
    .content {
      width: 1200px;
      margin: 0 auto;
      padding-top: 160px;
      padding-bottom: 349px;
    }
  }
  .titleDate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    i {
      margin-right: 10px;
    }
    .title {
      font-size: 40px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 52px;
      color: #000000;
      text-align: left;
    }
    .date {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 24px;
      color: #0d051f;
      text-align: right;

      width: 500px;
      span {
        font-size: 36px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #df0500;
        line-height: 50px;
      }
    }
  }
  .text {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 48px;
    color: #545353;
    text-align: left;

    margin-bottom: 85px;
  }
  .num {
    margin-bottom: 20px;
    font-size: 28px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 37px;
color: #0D051F;
  }
  .githup {
    margin-bottom: 20px;
    font-size: 28px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 37px;
color: #0D051F;
  }
  .timeSubmit {
    display: flex;
    justify-content: space-between;
    .el-button {
      width: 175px;
      height: 56px;
      opacity: 1;
text-align: center;
      border-radius: 4px;
      font-size: 20px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      line-height: 28px;
      letter-spacing: 0px;
      border: none;
      padding: 0px;
    }
  }
  .btnz{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .btn1 {
    text-align: center;
   
    .el-button {
      width: 158px;
      height: 70px;
      opacity: 1;
      background: #5432f4;
      border-radius: 4px;
      font-size: 28px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
     
    }
  }
  .btn2 {
    text-align: center;
    .el-button {
      width: 158px;
height: 70px;
background: #AFB7E0;
opacity: 1;
border-radius: 4px;
     
     font-size: 28px;
font-family: PingFangSC-Regular;
color: #FFFFFF;
opacity: 1;
      line-height: 37px;
      margin-right: 40px;
       margin-left: 62px;
    }
  }
}
</style>

<style lang="less">
.TaskDetails {
  .el-dialog {
    width: 600px;
    height: 607px;
    opacity: 1;
    background: #ffffff;
    border-radius: 25px;
    padding: 0 60px;
    .el-dialog__title {
      padding: 0;
    
      font-size: 28px;
font-family: PingFangSC-Medium;
line-height: 37px;
color: #313131;
opacity: 1;
      text-align: left;
    
    }
    .el-dialog__header {
      padding: 0;
      padding-top: 30px;
       margin-bottom: 5px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .prompt {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      margin-top: 2px;
    }
    .el-form-item__label {
      font-size: 24px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      line-height: 33px;
      margin-bottom: 13px;
    }
    .el-form {
      margin-top: 54px;
    }
    .el-input__inner {
      height: 70px;
      opacity: 1;
      background: #fcfdff;
      border: 1px solid #d5d5d5;
      border-radius: 3px;
      font-size: 24px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      line-height: 33px;
    }
  }
}
</style>
