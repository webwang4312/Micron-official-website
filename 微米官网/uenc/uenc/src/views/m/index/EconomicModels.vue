<!--
 * @Author: yaoyuting
 * @Date: 2021-04-11 18:05:00
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-17 22:10:01
 * @Descripttion: 
-->
<template>
  <div class="EconomicModels">
    <div class="sub_title">{{ $t("index.MdelTitle") }}</div>
    <div class="details">
      <!-- <div class="list">
        <div class="images"><img src="@/assets/imagesm/index/配图7.png"  alt="暂无图片" /></div>
        <div class="item">
          <div class="title">{{ $t("index.Distribution") }}</div>
          <div class="content">{{ $t("index.DistributionText") }}</div>
        </div>
      </div> -->
      <div class="list">
        <div class="images">
          <img src="@/assets/imagesm/index/配图8.png" alt="暂无图片" />
        </div>
        <div class="item">
          <div class="title">{{ $t("index.Economic") }}</div>
          <div class="content">{{ $t("index.EconomicText") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.EconomicModels {
  // background-color: pink;
  background-size: cover;
  background-position: center center;
  background-image: url("../../../assets/imagesm/index/jj_bg.png");
  padding: 0 40px;
  padding-bottom: 60px;
  padding-top: 98px;
  .sub_title {
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 66px;
    color: #333333;
    opacity: 1;
    text-align: center;
  }
  .details {
    width: 670px;

    background: #ffffff;
    opacity: 0.98;
    margin: 0 auto;
  }
  .list:nth-child(1) {
    img {
      width: 237 * 2px;
      height: 146 * 2px;
    }
  }
  .list:nth-child(2) {
    img {
      width: 164 * 2px;
      height: 162 * 2px;
    }
  }
  .list {
    padding: 92px 42px 30px 40px;
    margin-top: 60px;
    .images {
      width: 100%;
      height: 332px;
      background: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 30px;
      img {
        width: 340px;
        height: 332px;
      }
    }
    .item {
      padding: 30px 40px;
      background-color: #fff;
      .title {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 56px;
        color: #333333;
        opacity: 1;
        margin-bottom: 30px;
      }
      .content {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 52px;
        color: #333333;
        opacity: 0.7;
      }
    }
  }
}
</style>
