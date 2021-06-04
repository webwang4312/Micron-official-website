<!--
 * @Author: yaoyuting
 * @Date: 2021-04-11 18:05:00
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-04-22 07:57:03
 * @Descripttion: 
-->
<template>
  <div class="EconomicModels">
    <!-- <div class="subTitle w1352">{{ $t("index.MdelTitle") }}</div> -->
    <div class="lists">
      <div class="w1352">
        <!-- <div class="list1 list">
            <div class="content">
            <div class="title">{{ $t("index.Distribution") }}</div>
            <div class="text">{{ $t("index.DistributionText") }}</div>
          </div>
          
            <img  src="@/assets/images/index/1-7.png" class="list1_img" />
        
        
        </div> -->
        <div class="list2 list">
         
            <img  src="@/assets/images/index/1-8.png" class="list2_img" />
          
          <div class="content">
            <div class="title">{{ $t("index.Economic") }}</div>
            <div class="text">{{ $t("index.EconomicText") }}</div>
          </div>
          
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
  padding-top: 70px;
 background: url("../../../assets/images/index/index_jinji.png") no-repeat
    center/100% 100%;
  .subTitle {
  width: 100%;
    text-align: center;
    margin-bottom: 42px;
    height: 70px;
   font-size: 50px;
font-family: Microsoft YaHei;
font-weight: bold;
line-height: 66px;
color: #333333;
opacity: 1;
  }
  .lists {
   padding-bottom: 70px;
  }
  .list {
    display: flex;
   
    .img {
      width: 800px;
      height: 660px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 2px 60px 0px rgba(163, 163, 163, 0.18);
    }
    .content {
    
      .title {
       font-size: 40px;
font-family: Microsoft YaHei;
font-weight: bold;
line-height: 52px;
color: #333333;
opacity: 1;
padding-top: 104px;
      }
      .text {
        margin-top: 40px;
       width: 420px;
height: auto;
font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 40px;
color: #333333;
opacity: 1;
      }
    }
  }
  .list1 {
    width: 100%;
    padding-bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .list1_img {
     width:660px;
     height:420px;
    
    }
    .content {
    
    }
  }
  .list2 {
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
     .list2_img {
     width:460px;
     height:449px;
     margin-right: 226px;
    }
    .content {
     width: 514px;
     .text{
       width: 514px; 
     }
    }
    .img {
      margin-bottom: -116px;
    }
  }
}
</style>
