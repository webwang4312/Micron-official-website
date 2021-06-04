<!--
 * @Author: yaoyuting
 * @Date: 2021-04-12 21:25:05
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 14:43:53
 * @Descripttion: 
-->
<template>
  <div>
    <div class="banner">
      <div class="b_content"></div>
    </div>
    <div class="CoreMembers">
      <div class="w1300">
        <div>
          <div class="title">{{ $t("navbar.TeamMembers") }}</div>
          <div class="imgs">
            <div
              :class="introduce.usersId === msember.usersId ? 'border img' : 'img'"
              v-for="msember in msemberList"
              :key="msember.usersId"
            >
              <img :src="msember.images" alt="" @click="tab(msember.usersId)" />
            </div>
          </div>
        </div>
        <div class="r">
          <div v-if="introduce">
            <div class="name">{{ $t("index.switch") === "en" ? introduce.userNameEn : introduce.userName }}</div>
            <div class="position">{{ $t("index.switch") === "en" ? introduce.jobEn : introduce.job }}</div>
            <div class="about">{{ $t("index.switch") === "en" ? introduce.introductionEn : introduce.introduction }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetMsemberDetail, GetMsemberLists } from "@/assets/server/api.js";
import { baseURL } from "@/utils/utils";
export default {
  data() {
    return {
      msemberList: [],
      introduce: null,
    };
  },
  created() {
    this.getMsemberList();
  },
  methods: {
    async getMsemberList() {
      const dataList = await GetMsemberLists();
      if (dataList.code === 0) {
        dataList.rows.forEach((item) => {
          item.images = item.images;
        });
        this.msemberList = dataList.rows;
        this.introduce = this.msemberList[0];
      } else {
        this.$message.error(this.$t("index.switch") === "cn" ?"接口错误！":'Interface error!' );
      }
    },
    async tab(id) {
      const data = await GetMsemberDetail(id);
      if (data.code === 0) {
        this.introduce = data.data;
      } else {
         this.$message.error(this.$t("index.switch") === "cn" ?"接口错误！":'Interface error!' );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.banner {
  height: 80px;
  background: rgba(56, 55, 98, 1);
  // background-image: url("../../assets/images/index/tecBanner.png");
  // background-size: cover;
  // background-position: center center;
}
.CoreMembers {
  padding: 246px 0;
  background-image: url("../../assets/images/index/CoreMembersbg.png");
  background-size: cover;
  background-position: center center;
  .w1300 {
    display: flex;
    overflow: hidden;
  }
  .title {
    font-size: 50px;
    color: #333333;
  }
  .imgs {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    margin-top: 106px;
    // max-height: 386px;
    // overflow: auto;
    margin-left: 10px;
    .img {
      width: 110px;
      height: 110px;
      margin-right: 40px;
      margin-bottom: 40px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      img {
        height: 110px;
        width:  110px;
      }
    }
    .border {
      border: 1px solid #ffffff;
      box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.6);
    }
  }
  .r{
    padding-top: 176px;
    padding-left: 200px;
  }
  .name {
    font-size: 50px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 66px;
color: #333333;
opacity: 1;
  }
  .position {
   font-size: 30px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 40px;
color: #333333;
opacity: 1;
margin-top: 3px;
  }
  .about {
   font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 30px;
color: #333333;
opacity: 1;
    margin-top: 32px;
    word-break:break-all;
  }
}
</style>
