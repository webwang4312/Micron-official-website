<template>
  <div
    class="uenc_foot"
    @click="showSliderFalse"
   
  >
    <div class="socialmedia">
      <p class="socialtitle">{{ $t("social[0]") }}</p>
      <div class="socialline"></div>
      <ul class="fangshi">
       
        <li>
          <img src="@assets/images/index/telegram.png" @click="telegram" />
          <br />
          <span>{{ $t("contactus[1]") }}</span>
        </li>
        <li>
          <img src="@assets/images/index/twitter.png" @click="twitter" />
          <br />
          <span>{{ $t("contactus[2]") }}</span>
        </li>
        <li>
          <img src="@assets/images/index/微博.png" @click="weibo" />
          <br />
          <span>{{ $t("contactus[3]") }}</span>
        </li>
        <li>
          <img src="@assets/images/index/facebook.png" @click="facebook" />
          <br />
          <span>{{ $t("contactus[4]") }}</span>
        </li>
         <li>
          <img src="@assets/images/index/github (1).png" @click="github" />
          <br />
          <span>{{ $t("contactus[5]") }}</span>
        </li>
      </ul>
      <ul class="saoma">
        <li>
          <img src="@assets/images/index/钱包.png" @click="fastoken" />
          <br />
          <span>
            {{ $t("wallet[0]") }}
          </span>
        </li>
        <li>
          <img src="@assets/images/index/club.png" @click="club" />
          <br />
          <span>EnergyClub APP</span>
        </li>
      </ul>
    </div>
    <p class="footerfooter">Copyright©2015-2020 UENC 保留所有权利UENC</p>
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {
      nowLang: "en"
    };
  },
  created() {},
  mounted() {},
  methods: {
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCengHide");
    },
    fastoken() {
      window.location.href = "http://www.uenc.net/down/wallet.html";
    },
    club() {
      window.location.href = "http://www.uenc.net/down/uenc.html";
    },
    telegram() {
      window.open("https://t.me/UniversalEnergyChain1");
    },
    twitter() {
      window.open("https://twitter.com/uencclub");
    },
    facebook() {
      window.open("https://fb.me/uencclub");
    },
    weibo() {
      window.open("https://weibo.com/u/5580784739");
    },
    github(){
       window.open("https://github.com/uenctech");
    }
  }
};
</script>
<style lang="less">
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}

.uenc_foot {
  width: 100%;
  height: 388px;
  background-color: #0c0c0c;
  position: relative;
  top: 0px;

  // 社交媒体
  .socialmedia {
    position: relative;
    width: 100%;
    height: 345px;
    background: #181818;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;

    .socialtitle {
      width: 100%;
      position: absolute;
      text-align: center;
      margin: 0 auto;
      top: 50px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }

    .socialline {
      position: absolute;
      top: 82px;
      width: 60px;
      height: 2px;
      background:  rgba(0, 159, 205, 1);
   margin: 0 auto;
    }

    .fangshi {
      width: 350px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      position: absolute;
      top: 101px;

      img {
        width: 50px;
        height: 50px;
      }

      li:nth-child(1) {
        margin-left: 0px;
      }

      li:hover {
      }

      li {
        width: 50px;
        text-align: center;
        cursor: pointer;

        span {
          font-size: 10px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 27px;
          color: rgba(0, 159, 205, 1);
        }
      }
    }
  }

  .saoma {
    width: 210px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
    margin-top: 195px;

    img {
      width: 80px;
      height: 80px;
      // -webkit-touch-callout:behavior;
      -webkit-touch-callout: none !important;
    }

    li:nth-child(1) {
      margin-left: 0px;
    }

    li {
      text-align: center;

      span {
        font-size: 10px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: rgba(0, 159, 205, 1);
        opacity: 1;
      }
    }
  }

  .footerfooter {
    position: relative;
    top: 0px;
    height: 43px;
    line-height: 43px;
    width: 100%;
    text-align: center;
    font-size: 9px;
    font-family: "苹方-简";
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    background-color: #0c0c0c;
    opacity: 0.1;
  }
}
</style>
