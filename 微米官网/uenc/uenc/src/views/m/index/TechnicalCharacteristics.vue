<!--
 * @Author: yaoyuting
 * @Date: 2021-04-11 17:01:27
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-17 22:11:41
 * @Descripttion: 
-->
<template>
  <div class="TechnicalCharacteristics">
    <router-link to="/m/Technology"
      ><div class="sub_title">
        {{ $t("index.TechnicalTitle") }}
      </div></router-link
    >
    <div class="details">
      <div class="list">
        <div class="num">01</div>
        <div class="bgc"></div>
        <div class="title">{{ $t("index.Structure") }}</div>
        <div class="content">{{ $t("index.StructureText") }}</div>
        <div class="images">
          <img src="@/assets/images/index/1-3-1.gif" alt="暂无图片" />
        </div>
      </div>
      <div class="list">
        <div class="num">02</div>
        <div class="bgc"></div>
        <div class="title">{{ $t("index.Algorithm") }}</div>
        <div class="content">{{ $t("index.AlgorithmText") }}</div>
        <div class="images">
          <img src="@/assets/images/index/1-4-1.gif" alt="暂无图片" />
        </div>
      </div>
      <div class="list">
        <div class="num">03</div>
        <div class="bgc"></div>
        <div class="title">{{ $t("index.Hybrid") }}</div>
        <div class="content">{{ $t("index.HybridText") }}</div>
        <div class="images">
          <img src="@/assets/images/index/1-5-1.gif" alt="暂无图片" />
        </div>
      </div>
      <div class="list">
        <div class="num">04</div>
        <div class="bgc"></div>
        <div class="title">{{ $t("index.WASM") }}</div>
        <div class="content">{{ $t("index.WASMText") }}</div>
        <div class="images">
          <img src="@/assets/images/index/1-6-1.gif" alt="暂无图片" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.TechnicalCharacteristics {
  padding-top: 204px;
  padding-bottom: 142px;
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
    margin: 0 40px;
    padding-bottom: 48px;
   
    .list:nth-child(1) {
      margin-top: 42px;
    }
    .list {
      margin-top: 60px;
      .num {
        font-size: 28px;
        font-family: Futura-MediumItalic;
        line-height: 38px;
        color: #000000;
        opacity: 1;
        margin-bottom: 4px;
      }
      .bgc {
        width: 540px;
        height: 2px;
        opacity: 1;
        background: linear-gradient(270deg, rgba(98, 98, 98, 0), #333333);
      }
      .title {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 56px;
        color: #333333;
        opacity: 1;
        margin-top: 30px;
      }
      .content {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 52px;
        color: #333333;
        margin-top: 30px;
        margin-bottom: 60px;
        opacity: 0.7;
      }
      .images {
        width: 360px;
        height: 360px;
        text-align: center;
      background: rgba(0, 0, 0, 0);
box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.09);
opacity: 1;
border-radius: 40px;
margin-left: 156px;
        img{
          width: 360px;
height: 360px;

        }
      }
    }
    .list:nth-child(1) {
      img {
       
      }
    }
    .list:nth-child(2) {
      img {
       
      }
    }
    .list:nth-child(3) {
      img {
       
      }
    }
    .list:nth-child(4) {
      img {
      
      }
    }
  }
}
</style>
