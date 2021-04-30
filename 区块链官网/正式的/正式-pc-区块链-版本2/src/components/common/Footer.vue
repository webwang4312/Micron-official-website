<template>
  <div class="uenc_foot">
    <div class="content">
    
    <div class="footer">
      Copyright©2015-2018 UENC.All Rights Reserved UENC
    </div>
    <ul>
      <li>
        <img src="@assets/images/second/git.png" @click="github" />
      </li>
      <li>
        <img src="@assets/images/second/组 25.png" @click="telegram" />
      </li>
      <li>
        <img src="@assets/images/second/facebook.png" @click="facebook" />
      </li>
      <li>
        <img src="@assets/images/second/twitter.png" @click="twitter" />
      </li>
      <li>
        <img src="@assets/images/second/微博.png" @click="weibo" />
      </li>
      <li>
        <img src="@assets/images/second/m.png" @click="medium" />
      </li>
      <li>
        <img src="@assets/images/second/reddit.png" @click="reddit" />
      </li>
    </ul>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
     github() {
      window.open("https://github.com/uenctech");
    },

    weibo() {
      window.open("https://weibo.com/u/5580784739");
    },
    telegram() {
      window.open("https://t.me/UniversalEnergyChain");
    },
    twitter() {
      window.open("https://twitter.com/ENChain_enc");
    },
    facebook() {
      window.open("https://fb.me/uencclubglobal");
    },
    reddit() {
      window.open("https://www.reddit.com/r/UENC/");
    },
    medium() {
      window.open("https://uenc.medium.com/");
    },
  },
};
</script>
<style lang="less">
.uenc_foot {
  width: 100%;
  height: 75px;
  background: #4a6df4;
  position: relative;
  
  .content{
    width: 1274px;
     height: 75px;
    margin: 0 auto;
    display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  }
  .footer {
    font-size: 15px;
    font-family: Arial;
    font-weight: 400;
    line-height: 17px;
    color: #ffffff;
    margin-left: 440px;
  }
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
    li{
      margin-left: 15px;
      img{
        cursor: pointer;
      }
    }
  }
}
</style>
