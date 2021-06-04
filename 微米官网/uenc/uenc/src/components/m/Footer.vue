<!--
 * @Author: yaoyuting
 * @Date: 2020-03-20 19:30:58
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-20 07:49:54
 * @Descripttion: 
-->
<template>
  <div class="foot">
    <div class="sub_title">{{ $t("navbar.Connect") }}</div>
    <div class="aboutUs">
      <a target="_blank" href="https://github.com/uenctech" class="iconfont icongithub"></a>
      <a target="_blank" href="https://www.reddit.com/r/UENC/" class="iconfont iconfeishu"></a>
      <a target="_blank" href="https://fb.me/uencclub" class="iconfont iconfacebook"></a>
      <a target="_blank" href="https://twitter.com/uencclub" class="iconfont icontuite"></a>
      <!-- <a target="_blank" href="https://weibo.com/u/5580784739" class="iconfont iconweibo"></a> -->
      <a target="_blank" href="https://www.reddit.com/r/UENC/" class="iconfont iconreddit"></a>
      <a target="_blank" href="https://uenc.medium.com/" class="iconfont iconmedium"></a>
       <img src="../../assets/images/discord.png" alt="" @click="goDiscord">
    </div>
    <div class="email">{{ $t("navbar.Email") }}：tech@uenc.net</div>
  </div>
</template>

<script>
export default {
   methods:{
    goDiscord(){
      window.open('https://discord.com/invite/AAPMAjtcNS', '_blank')
    }
  }
};
</script>

<style lang="less" scoped>
.foot {
  position: relative;
  left: 0;
  bottom: 0;
  height: 240px;
  width: 750px;
  // padding: 20px 30px 0;
  background: #212121;
  .sub_title {
    text-align: center;
    font-size: 28px;
font-family: PingFang SC;
font-weight: 500;
line-height: 40px;
color: #A7A7A7;
opacity: 1;
    margin-bottom: 20px;
    margin-top:36px;
   
  }
  .aboutUs {
    display: flex;
    justify-content: space-around;
   width:80%;
   margin: 0 auto;
    a {
      font-size: 60px;
      margin-right: 20px;
      color: #A7A7A7;
    }
    a:nth-child(1){
      // margin-left: 106px;
    }
     img{
        width: 70px;
        height: 70px;
      }
      cursor: pointer;
  }
  .email {
   text-align: center;
   font-size: 26px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 34px;
color: #9B9DA2;
opacity: 1;
    margin-top: 20px;
  }
}
</style>
