<!--
 * @Author: yaoyuting
 * @Date: 2021-04-12 21:25:05
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 21:08:03
 * @Descripttion: 
-->
<template>
  <div class="CoreMembers">
    <div class="sub_title">{{ $t("index.members") }}</div>
     <!-- <div class="scroll">
      <div class="details">
        <el-card class="box-card" v-for="msember in msemberList" :key="msember.usersId">
           <img
            :src="msember.images"
             alt="暂无图片"
            :class="msember.usersId == id ? 'active' : ''"
            @click="tab(msember.usersId)"
          />
        </el-card>
      </div>
    </div> -->
    <div class="banner">
      <ul class="row-bg">
        <li  v-for="msember in msemberList" :key="msember.usersId">
          <img
            :src="msember.images"
             alt="暂无图片"
            :class="msember.usersId == id ? 'active' : ''"
            @click="tab(msember.usersId)"
          />
        </li>
      </ul>
    </div>
    <div v-if="introduce" class="content">
      <div class="top">
        <div class="name">{{ $t("index.switch") === "en" ? introduce.userNameEn : introduce.userName }}</div>
        <div class="position">{{ $t("index.switch") === "en" ? introduce.jobEn : introduce.job }}</div>
      </div>

      <div class="about">{{ $t("index.switch") === "en" ? introduce.introductionEn : introduce.introduction }}</div>
    </div>
    <div class="btn">
      <el-button type="text" @click="goMore()">{{$t("Developer.learn")}}<i class="el-icon-right"></i></el-button>
    </div>
  </div>
</template>

<script>
import { GetMsemberDetail } from "@/assets/server/api.js";
export default {
  data() {
    return {
      introduce: null,
      id: ""
    };
  },
  props: {
    msemberList: {
      type: Array
    }
  },
  created() {
    this.introduce = this.msemberList[0];
    this.id = this.msemberList[0].usersId;
  },
  methods: {
    async tab(id) {
      this.id = id;
      const data = await GetMsemberDetail(id);
      if (data.code === 0) {
        this.introduce = data.data;
      } else {
        this.$notify({ type: 'danger', message: this.$t("index.switch") === "cn" ?"接口错误！":'Interface error!'})
      }
    },
    goMore() {
      this.$router.push({
        path: "/m/CoreMembersDetails"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.CoreMembers {
  width: 100%;
  margin: 204px auto 0;
  padding:0 38px 0 40px ;
 
  
  .el-row {
    position: static;
  }
  .sub_title {
    text-align: center;
   font-size: 48px;
font-family: PingFang SC;
font-weight: 600;
line-height: 66px;
color: #333333;
opacity: 1;
    margin-bottom: 64px;
  }
  .banner {
    width: 670px;
 
    overflow: hidden;
    margin-bottom: 80px;
    .row-bg{
      display: flex;
      flex-direction: row;
      li{
        margin-right:42px ;
      }
    }
    // .el-col {
    //   width: 100px!important;
    //   height: 100px;
    //   display: flex;
    //   // align-items: center;
    //   // justify-content: center;
    //   margin-bottom: 32px;
    // }
    img {
      height: 100px;
      width: 100px;
      cursor: pointer;
      border-radius: 50%;
    }
    .active {
      height: 100px;
      width: 100px;
    }
  }
  .content {
    .top {
      display: flex;
      justify-content: flex-start;
      margin-top: 32px;
     font-size: 30px;
font-family: PingFang SC;
font-weight: 500;
line-height: 42px;
color: #333333;
opacity: 1;
      text-align: left;
     
      .name {
        margin-right: 20px;
      }
    }
    .about {
      margin-top: 20px;
     font-size: 28px;
font-family: PingFangSC-Regular;
line-height: 52px;
color: #333333;
opacity: 1;
      text-align: left;
    
      word-break: break-all;
    }
  }
  .btn {
    text-align: center;
    // margin-right: 30px;
    margin-top:30px;
    .el-button {
      margin: 0;
      padding: 0;
     font-size: 26px;
font-family: PingFangSC-Medium;
line-height: 34px;
color: #5432F4;
opacity: 1;
    }
  }
}
</style>
