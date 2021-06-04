<!--
 * @Author: yaoyuting
 * @Date: 2021-04-11 17:01:27
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 14:49:02
 * @Descripttion: 
-->
<template>
  <div class="TechnicalCharacteristics">
    <div class="contentz">
      <div class="subTitle">{{ $t("index.TechnicalTitle") }}</div>
      <div>
        <div class="item">
          <div class="vertical_center">
            <div class="box">
              <p>01</p>
              <div class="level3title">{{ $t("index.Structure") }}</div>
              <div class="content">{{ $t("index.StructureText") }}</div>
            </div>
          </div>
          <div class="vertical_center vertical_center2" >
            <!-- <img width="400" src="@/assets/images/index/1-3.png" alt="" /> -->
            <img  src="@/assets/images/index/1-3-1.gif" alt="" />
          </div>
        </div>
        <div class="item">
          <div class="vertical_center vertical_center2" >
            <!-- <img width="400" style="margin-left:120px" src="@/assets/images/index/1-4.png" alt="" /> -->
            <img  src="@/assets/images/index/1-4-1.gif" alt="" />
          </div>
          <div class="vertical_center" :offset="4">
            <div class="box">
              <p>02</p>
              <div class="level3title">{{ $t("index.Algorithm") }}</div>
              <div class="content">{{ $t("index.AlgorithmText") }}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="vertical_center">
            <div class="box">
              <p>03</p>
              <div class="level3title">{{ $t("index.Hybrid") }}</div>
              <div class="content">{{ $t("index.HybridText") }}</div>
            </div>
          </div>
          <div :offset="4" class="vertical_center vertical_center2" >
            <!-- <img width="674" src="@/assets/images/index/1-5.png" alt="" /> -->
            <img  src="@/assets/images/index/1-5-1.gif" alt="" />
          </div>
        </div>
        <div class="item">
          <div class="vertical_center vertical_center2" >
            <!-- <img width="390" style="margin-left:120px" src="@/assets/images/index/1-6.png" alt="" /> -->
            <img  src="@/assets/images/index/1-6-1.gif" alt="" />
          </div>
          <div class="vertical_center" :offset="4">
            <div class="box">
              <p>04</p>
              <div class="level3title">{{ $t("index.WASM") }}</div>
              <div class="content">{{ $t("index.WASMText") }}</div>
            </div>
          </div>
        </div>
        <div>
            <router-link to="/pc/Technology" class="btn_style">{{ $t("Technology.more") }}<i class="el-icon-right"></i></router-link>
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
  padding-bottom: 200px;
  .contentz{
    width: 1200px;
    margin: 0 auto;
   
  }
  .subTitle{
    text-align: center;
    margin: 224px auto 135px;
    width: 100%;
    height: 70px;
    font-size: 50px;
font-family: Microsoft YaHei;
font-weight: bold;
line-height: 66px;
color: #333333;
opacity: 1;

  }
  .item{
    display: flex;
    justify-content: space-between;
    margin-bottom: 200px;
   
    img{
      width:400px;
      height: 400px;
    }
  }
  .vertical_center2{
 background: rgba(0, 0, 0, 0);
box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.09);
opacity: 1;
border-radius: 20px;
width: 400px!important;
height: 400px;
  }
  .vertical_center {
   width: 437px;
    p{
      font-size: 20px;
      color: #0d051f;
      border-bottom: 1px solid #333333;;
    }
    .level3title {
     font-size: 40px;
font-family: Microsoft YaHei;
font-weight: bold;
line-height: 52px;
color: #333333;
opacity: 1;
      margin: 36px 0 30px;
    }
    .content {
      width: 400px;
     font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 32px;
color: #333333;
    }
  }
  .btn_style{
    font-size: 20px!important;
font-family: PingFangSC-Regular!important;
line-height: 27px!important;
color: #6624FA!important;
    text-align: right;
    display: block;
    margin-top: -200px;
  }
  
}
</style>
