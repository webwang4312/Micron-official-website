<!--
 * @Author: yaoyuting
 * @Date: 2021-04-23 07:57:52
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 12:17:09
 * @Descripttion: 
-->
<template>
  <div class="Fastoken">
    <div class="banner_bg">
      <div class="title">{{ $t("Fastoken.Wallet") }}</div>
      <ul class="lists">
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

      <div class="left">
        <img src="@/assets/imagesm/xz/手机展示.png" alt="暂无图片" />
      </div>
    </div>
    <div class="right">
      <img src="@/assets/images/code.png" alt="暂无图片" />

      <div class="text">{{ $t("Fastoken.Scan") }}</div>
    </div>
    <div class="faston_main">
      <div class="faston_title">
        {{ $t("Fastoken.title") }}
      </div>
      <ul>
        <li>
          <div class="images">
            <img src="@/assets/images/wallet/去中心化@2x.png" alt="" />
          </div>
          <div class="con1">{{ $t("Fastoken.zhongxin[0]") }}</div>
          <div class="con2">{{ $t("Fastoken.zhongxin[1]") }}</div>
        </li>
        <li>
          <div class="images">
            <img src="@/assets/images/wallet/私钥@2x.png" alt="" />
          </div>

          <div class="con1">{{ $t("Fastoken.siyao[0]") }}</div>
          <div class="con2">{{ $t("Fastoken.siyao[1]") }}</div>
        </li>
        <li>
          <div class="images">
            <img src="@/assets/images/wallet/支付@2x.png" alt="" />
          </div>

          <div class="con1">{{ $t("Fastoken.zhifu[0]") }}</div>
          <div class="con2">{{ $t("Fastoken.zhifu[1]") }}</div>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.banner_bg {
  height: 940px;
  background-image: url("../../assets/imagesm/fastonheader.png");
  background-size: cover;
  background-position: center center;
  .lists {
    // margin-top: 20px;
    font-size: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
    text-align: center;
    padding-left: 158px;
    li {
      margin-right: 20px;
      font-size: 28px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 38px;
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
  .left {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 410px;
      height: 534px;
    }
  }

  .title {
    font-size: 56px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 69px;
    color: #ffffff;
    opacity: 1;
    padding-top: 217px;
    text-align: center;
    margin-bottom: 21px;
  }
}
.right {
  padding-top: 80px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 240px;
    height: 240px;
  }
  .text {
    margin-top: 20px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 40px;
    color: #000000;
    opacity: 1;
  }
}
.mainbg {
  background-image: url("../../assets/imagesm/xz/bg.png");
  background-size: cover;
  background-position: center center;
}
.faston_main {
  width: 100%;

  padding-top: 120px;
  .faston_title {
    width: 100%;
    text-align: center;
    font-size: 48px;
font-family: PingFang SC;
font-weight: 600;
line-height: 66px;
color: #000000;
opacity: 1;
  }
  ul {
    width: 100%;
    margin: 40px auto 338px;
    display: flex;
    flex-direction: column;

    li {
      width: 670px;
      height: 360px;
      opacity: 1;
      min-height: 360px;
      height: auto;
background: #FAFAFA;
      margin-top: 40px;
      margin-left: 40px;
      padding: 40px;
      .images {
        width: 100px;
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
        }
      }

      .con1 {
        font-size: 40px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 52px;
        color: #1d0d44;
        opacity: 1;
        margin-top: 21px;
        margin-bottom: 20px;
      }
      .con2 {
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 48px;
        color: #666666;
        opacity: 1;
      }
    }
  }
}
</style>
