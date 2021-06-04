<!--
 * @Author: yaoyuting
 * @Date: 2020-03-20 19:30:58
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-20 07:43:03
 * @Descripttion: 
-->
<template>
  <div class="foot">
    <div class="top">
      <!-- <div class="subTitle">{{ $t("navbar.Connect") }}</div> -->
      <div class="aboutUs">
        <a
          target="_blank"
          href="https://github.com/uenctech"
          class="iconfont icongithub"
        ></a>
        <a
          target="_blank"
          href="https://www.reddit.com/r/UENC/"
          class="iconfont iconfeishu"
        ></a>
        <a
          target="_blank"
          href="https://fb.me/uencclub"
          class="iconfont iconfacebook"
        ></a>
        <a
          target="_blank"
          href="https://twitter.com/uencclub"
          class="iconfont icontuite"
        ></a>
        <!-- <a
          target="_blank"
          href="https://weibo.com/u/5580784739"
          class="iconfont iconweibo"
        ></a> -->
        <a
          target="_blank"
          href="https://www.reddit.com/r/UENC/"
          class="iconfont iconreddit"
        ></a>
        <a
          target="_blank"
          href="https://uenc.medium.com/"
          class="iconfont iconmedium"
        ></a>
        <img src="../../assets/images/discord.png" alt="" @click="goDiscord">
      </div>

      <div class="email">{{ $t("navbar.Email") }}：tech@uenc.net</div>
    </div>

    <!-- <div class="bottom">COPYRIGHT 2019. ALL RIGHTS RESERVED</div> -->
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
  height: 90px;
  width: 100%;
  color: #9b9da2;
  background: url("../../assets/images/footer.png") no-repeat center/100% 100%;
  .email {
    font-size: 24px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 31px;
color: #9B9DA2;
opacity: 1;
  }
  .top {
    width: 100%;
    padding: 0 200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .subTitle {
      text-align: left !important;
      height: 56px;
      line-height: 56px;
      font-size: 40px;
      margin-bottom: 36px;
    }
    .aboutUs {
      a {
        font-size: 40px;
        margin-right: 40px;
        color: #9b9da2;
      }
      img{
        width: 45px;
        height: 45px;
      }
      cursor: pointer;
    }
  }
}
</style>
