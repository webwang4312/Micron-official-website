<template>
  <div class="foot">
    <div class="footz">
      <div class="footz_top">
        <div class="shangbiao">
          Copyright © 2015-2020 UENC. All rights reserved.
        </div>
        <div @mouseleave="gotohide">
          <div class="xiazai" @mouseenter="gotoshow">
            {{ $t("wmfooter[5]") }}
          </div>
          <ul class="hovershow" v-if="showfooter">
            <li class="club">
              <img src="@assets/images/indexhover/club.png" />
              <br />
              <span>Energy Club</span>
            </li>
            <li class="wallet">
              <img src="@assets/images/indexhover/wallet.png" />
              <br />
              <span>Fastoken</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footzline"></div>
      <div class="footz_bottom">
        <div class="component">
          <span class="neirong" @click="goAbout">{{ $t("wmfooter[0]") }}</span>

          <span class="neirong" @click="goProposal">{{
            $t("wmfooter[1]")
          }}</span>

          <span class="neirong" @click="goDeveloper">{{
            $t("wmfooter[2]")
          }}</span>

          <span class="neirong" @click="goMedia">{{ $t("wmfooter[3]") }}</span>

          <span class="neirong" @click="goBowser">{{ $t("wmfooter[4]") }}</span>
        </div>
        <ul class="foot-box">
          <li>
            <img src="@assets/images/footer/facebook.png" @click="facebook" />
          </li>
          <li>
            <img src="@assets/images/footer/twitter.png" @click="twitter" />
          </li>
          <li>
            <img src="@assets/images/footer/github.png" @click="github" />
          </li>
          <li>
            <img src="@assets/images/footer/telegram.png" @click="telegram" />
          </li>
          <li>
            <img src="@assets/images/footer/weibo.png" @click="weibo" />
          </li>
          <li>
            <img src="@assets/images/footer/reddit.png" @click="reddit" />
          </li>
          <li>
            <img src="@assets/images/footer/medium.png" @click="medium" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {
      showfooter: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    goAbout() {
      this.$router.push({
        path: "/about",
      });
    },
    goProposal() {
      this.$router.push({
        path: "/proposal",
      });
    },
    goDeveloper() {
      this.$router.push({
        path: "/developer",
      });
    },
    goMedia() {
      this.$router.push({
        path: "/news",
      });
    },
    goBowser() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
    },

    gotoshow() {
      this.showfooter = true;
    },
    gotohide() {
      this.showfooter = false;
    },
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
//底部
.foot {
  width: 100%;
  height: 216px;
  background: #292929;
  position: relative;
  z-index: 20;
  margin: 0 auto;
  .footz {
    width: 1200px;
    height: 100%;
    margin: 0 auto;

    .footz_top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      padding-top: 62px;
      .shangbiao {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #ffffff;
      }
      .xiazai {
        text-align: center;
        height: 36px;
        width: 145px;

        border-radius: 5px;
        background: #30b3f5;
        border-radius: 5px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
      .hovershow {
        position: absolute;
        top: -110px;
        left: 65%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        z-index: 30000;
        width: 275px;
        height: 161px;
        background: #666666;
        border-radius: 5px;
        li {
          margin-top: 20px;
          text-align: center;
          img {
            width: 100px;
            height: 100px;
          }
          span {
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #ffffff;
          }
        }
        .club {
          width: 120px;
          height: 120px;
        }
        .wallet {
          width: 120px;
          height: 120px;
        }
      }
    }
    .footzline {
      height: 1px;
      width: 1200px;
      position: relative;
      top: 47px;
      border-radius: 0px;

      background: #ffffff;
      opacity: 0.1;
      margin: 0 auto;
    }
    .footz_bottom {
      width: 100%;
      height: 76px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      top: 39px;
      .foot-box {
        width: 330px;
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: space-between !important;
        align-items: center;
        img {
          align-content: center;
          cursor: pointer;
        }
        img:hover {
          transform: scale(1.5);
        }
      }
      .component {
        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
          /* identical to box height, or 171% */
          margin-right: 50px;
          color: #ffffff;
          cursor: pointer;
        }
        span:hover {
          color: #30b3f5;
        }
      }
    }
  }
}
</style>
