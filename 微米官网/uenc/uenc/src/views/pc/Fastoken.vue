<!--
 * @Author: yaoyuting
 * @Date: 2021-04-23 07:57:52
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 15:54:14
 * @Descripttion: 
-->
<template>
  <div class="Fastoken">
    <div class="banner">
      <div class="content w1300">
        <div class="r">
          <div class="title">{{ $t("Fastoken.Wallet") }}</div>
          <ul class="list">
            <li>
              <span></span>
              {{ $t("Fastoken.Safe") }}
            </li>
            <li>
              <span> </span>
              {{ $t("Fastoken.Safe2") }}
            </li>

            <li>
              <span> </span>
              {{ $t("Fastoken.Safe3") }}
            </li>
          </ul>
          <div class="box">
            <div class="code">
              <img src="@/assets/images/code.png" alt="" />
              <span>{{ $t("Fastoken.Scan") }}</span>
            </div>
          </div>
        </div>
        <img src="@/assets/images/wallet/机模@2x.png" alt="" />
      </div>
    </div>
    <div class="faston_main">
      <div class="faston_title">
      {{ $t("Fastoken.title") }}
      </div>
      <ul>
        <li>
          <div class="images">
            <img src="@/assets/images/wallet/私钥@2x.png" alt="" />
          </div>

        <div class="con1">  {{ $t("Fastoken.siyao[0]") }}</div>
          <div class="con2">{{ $t("Fastoken.siyao[1]") }} </div>
        </li>
        <li>
           <div class="images">
            <img src="@/assets/images/wallet/支付@2x.png" alt="" />
          </div>

          <div class="con1"> {{ $t("Fastoken.zhifu[0]") }}</div>
          <div class="con2">{{ $t("Fastoken.zhifu[1]") }}</div>
        </li>
        <li>
           <div class="images">
            <img src="@/assets/images/wallet/去中心化@2x.png" alt="" />
          </div>
<div class="con1"> {{ $t("Fastoken.zhongxin[0]") }}</div>
          <div class="con2">{{ $t("Fastoken.zhongxin[1]") }} </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    
  }
};
</script>

<style lang="less" scoped>
.banner {
  height: 900px;
  background-image: url("https://pili-vod.uenc.net/uenc_pc_walletDown.png");
  background-size: cover;
  background-position: center center;
  padding-top: 208px;
  padding-bottom: 16px;
  box-sizing: border-box;

  .content {
    color: #fff;
    display: flex;
    flex-direction: row;
    // justify-content: space-between;

    width: 1200px;
    margin: 0 auto;
    .r {
      display: flex;
      flex-direction: column;
      padding-top: 122px;
      margin-right: 230px;
    }
    img {
      width: 505px;
      height: 658px;
    }
    .box {
      flex: 1;
      display: flex;
      .flex {
        flex: 1;
      }
    }
    .code {
      display: flex;
      flex-direction: column;

      img {
        width: 120px;
        height: 120px;
        margin-top: 40px;
      }
      span {
        padding: 20px 0;
      font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 26px;
color: #FFFFFF;
opacity: 1;
      }
    }
    .title {
      width: 529px;
      font-size: 60px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 79px;
      color: #ffffff;
      opacity: 1;
    }
    .list {
      margin-top: 20px;
      font-size: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      li {
        margin-right: 41px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 29px;
        color: #ffffff;
        opacity: 1;
      }
      span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
        opacity: 1;
        margin-right: 10px;
      }
    }
  }
}
.faston_main {
  width: 100%;
  height: 694px;

  padding-top: 38px;
  .faston_title {
    width: 100%;
    text-align: center;
    font-size: 40px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 52px;
    color: #000000;
    opacity: 1;
  }
  ul {
    width: 1200px;
    margin: 82px auto 0;
    display: flex;
    flex-direction: row;
    li:hover{
    
box-shadow: 0px 3px 40px rgba(153, 119, 232, 0.2);

border: 3px solid #6380F9;

    }
    li {
      width: 360px;
      min-height: 275px;
      height: auto;
      background: #fafafa;
      opacity: 1;
      margin-right: 60px;
      padding: 38px 49px 34px 38px;
      .images{
        width: 80px;
        height: 80px;
     
        display: flex;
       justify-content: center;
            align-items: center;
        img {
        width: 80px;
        height: 80px;
      }
      }
      
      .con1{
        font-size: 24px;
font-family: Microsoft YaHei;
font-weight: bold;
line-height: 31px;
color: #1D0D44;
opacity: 1;
margin-top: 21px;
margin-bottom: 20px;
      }
      .con2{
        font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 24px;
color: #666666;
opacity: 1
      }
    }
  }
}
</style>
