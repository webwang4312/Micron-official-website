<!--
 * @Author: yaoyuting
 * @Date: 2021-04-12 21:57:33
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-17 22:10:37
 * @Descripttion: 
-->
<template>
  <div class="Partners">
    <div class="sub_title">{{ $t("index.Partner") }}</div>
    <el-row  >
      <el-col  v-for="(list, index) in partnerList" :key="index">
        <img :src="list.images"  alt="暂无图片" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    partnerList: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.Partners {
  padding: 0 48px 0px 54px;
  margin-bottom: 182px;
  .sub_title {
    padding-top: 196px;
    font-size: 48px;
font-family: PingFang SC;
font-weight: 600;
line-height: 66px;
color: #333333;
opacity: 1;
    margin-bottom: 20px;
    text-align: center;
  }
  img {
    width: 200px;
    height: 74px;
      box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.09);
  }
  .el-row {
    // margin-left: 10px !important;
    // margin-right: 6px !important;
    box-sizing: border-box;
    .el-col {
       width: 200px;
    height: 74px;
     margin-right: 6px !important;
      margin-bottom: 30px;
     
    }
  }
}
</style>
