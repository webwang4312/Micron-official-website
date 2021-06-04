<!--
 * @Author: yaoyuting
 * @Date: 2021-04-12 21:57:33
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 19:51:58
 * @Descripttion: 
-->
<template>
  <div class="Partners">
    <div class="partner_content">
      <div class="subTitle">{{ $t("index.Partner") }}</div>
      <!-- <el-carousel :interval="5000" arrow="always" height="60px" indicator-position="outside">
        <el-carousel-item v-for="item in partnerList.length%6+1" :key="item">
          
        </el-carousel-item>
      </el-carousel> -->
     
    </div>
     <div class="imgs">
        <div v-for="item in partnerList" :key="item.images" class="partner_img ">
          <img  :src="item.images" alt="" />
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    partnerList: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
.Partners {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-top: 120px;
  padding-bottom: 274px;
  .partner_content {
    width: 1200px;
  
    margin: 0 auto;
  }
  .subTitle {
    margin-bottom: 32px;
    font-size: 50px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 66px;
    color: #333333;
    text-align: center;
width: 100%;
    // line-height: 70px;
  }
  .imgs {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
   
   
    // overflow: auto;
    div {
    }
    .partner_img {
      width: 230px;
      height:95px;
      background: rgba(0, 0, 0, 0);

      opacity: 1;
      margin-right: 10px;
      margin-top: 10px;
      img{
        width: 100%;
        height: 100%;
        
      }
    }
  }
}
</style>
