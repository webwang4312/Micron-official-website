<!--
 * @Author: yaoyuting
 * @Date: 2021-04-12 21:25:05
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 19:51:20
 * @Descripttion: 
-->
<template>
  <div class="CoreMembers">
    <div class="level2title">{{ $t("index.members") }}</div>
    <div class="w1352 flex">
      <div class="userList">
        <div class="banner">
          <div
            :class="introduce.usersId === msember.usersId ? 'border' : ''"
            v-for="msember in msemberList"
            :key="msember.usersId"
          >
            <img :src="msember.images" alt="" @click="tab(msember.usersId)" />
          </div>
          <!-- <div><el-button type="primary" round @click="goMore()">了解更多</el-button></div> -->
        </div>
      </div>
      <div class="center">
        <div class="name">
          {{
            $t("index.switch") === "en"
              ? introduce.userNameEn
              : introduce.userName
          }}
        </div>
        <div class="position">
          {{ $t("index.switch") === "en" ? introduce.jobEn : introduce.job }}
        </div>
        <div class="about">
          {{
            $t("index.switch") === "en"
              ? introduce.introductionEn
              : introduce.introduction
          }}
        </div>
      </div>
    </div>
    <div class="btn">
      <router-link to="/pc/CoreMembersDetails" class="btn_style"
        >{{ $t("Developer.learn") }} <i class="el-icon-right"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
import { GetMsemberDetail } from "@/assets/server/api.js";
export default {
  data() {
    return {
      introduce: null,
    };
  },
  props: {
    msemberList: {
      type: Array,
    },
  },
  created() {
    this.introduce = this.msemberList[0];
  },
  methods: {
    async tab(id) {
      const data = await GetMsemberDetail(id);
      if (data.code === 0) {
        this.introduce = data.data;
      } else {
        this.$message.error(
          this.$t("index.switch") === "cn" ? "接口错误！" : "Interface error!"
        );
      }
    },
    goMore() {
      this.$router.push({
        path: "/pc/CoreMembersDetails",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.CoreMembers {
  background: url("../../../assets/images/index/indexbg3.png") no-repeat
    center/100% 100%;
  // margin: 100px 0;
  padding: 146px 0;
  height:800px;
  // height: auto;
  box-sizing: border-box;

  .flex {
    display: flex;
    flex-direction: row;
    min-height: 400px;
    height: auto;
    .userList {
      width: 600px;
      margin-right: 120px;
    }
    .center {
    }
  }

  .level2title {
    width: 1200px;
    cursor: pointer;
    line-height: 60px;
    font-size: 50px;
    color: #333333;
    line-height: 70px;
    margin: 0 auto;
    margin-bottom: 60px;
  }
  .banner {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 600px;
    // max-height: 386px;
    // overflow: auto;
    div {
      width: 110px;
      height: 110px;
      margin-right: 40px;
      margin-bottom: 40px;
      border-radius: 50%;
      background: #ffffff;
    }
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 50%;
      z-index: 1;
    }
    .border {
      border: 1px solid #ffffff;
      box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.6);
    }
  }
  .center {
    width: 632px;
    height: auto;
    min-height: 220px !important;
    background: #ffffff;
    padding: 25px 35px 35px 49px;
    text-align: left;
    .name {
      font-size: 50px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 66px;
      color: #333333;

      word-break: break-all;
      // max-height: 140px;
      // overflow-y: scroll;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .position {
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 40px;
      color: #333333;
      opacity: 1;
      margin-top: 10px;
    }
    .about {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 30px;
      color: #333333;
      opacity: 1;
      // max-height: 150px;
      // overflow-y: auto;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      margin-top: 40px;
      overflow: hidden;
    }
  }
  .btn {
    width: 1200px;
    text-align: right;

    margin: 20px auto 0;

    .btn_style {
      width: 100%;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 26px;
      color: #6624fa;
      display: block;
    }
  }
}
</style>
