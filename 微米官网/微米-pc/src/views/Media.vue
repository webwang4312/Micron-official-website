<template>
  <div class="media">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="polygon"
      :particleSize="1"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
    <div class="mediatop">
      <headertop> </headertop>
      <div class="mediatop-content">
        <div class="media-more">
          <p>{{ $t("recommendtitle[0]") }}</p>
          <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
          <div class="media-button-overflow">
            <div class="media-button-left"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mediafooter">
      <!-- <div class="media-left-line"></div> -->
      <div class="mediafooter-content">
        <p>{{ $t("media[0]") }}</p>
        <div class="media-line"></div>
        <div class="last">
          <ul class="tab-title">
            <li
              v-for="(item, index) in medialist"
              @click="mediacur = index"
              :class="{ mediaactive: mediacur == index }"
              :key="index"
            >
              <div class="media-tab-line"></div>
              <span
                v-html="item.title"
                style="text-align:left;line-height:104px"
              ></span>
            </li>
          </ul>
          <div class="tab-content">
            <div
              v-for="(item, index) in medialist"
              v-show="mediacur == index"
              :key="index"
              class="tab-contentzonf"
              @click="godetail(item.content_id)"
            >
              <div class="tab-content-top">
                <img :src="item.thumb" alt="" />
              </div>
              <div class="tab-content-bottom">
                <p
                  style="width:100%;font-size:16px;
                      font-family:PingFang SC;
                      font-weight:400;
                      color:rgba(255,255,255,1);
                      text-align:left"
                  class="title1"
                >
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mediablock">
          <Page
            :total="totalNum"
            :page-size="6"
            @on-change="change"
            :cureent.sync="medianum"
            v-if="totalNum != 0"
            ref="pagination"
          />
        </div>
      </div>
    </div>
    <div class="mediauenc_foot">
      <div class="foot-top">
        <ul class="foot-box">
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/github.png"
                  @click="github"
                  style="position:relative;left:10px"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/telegram.png"
                  @click="telegram"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box2">
              <div class="circle">
                <img src="@assets/images/footer/twitter.png" @click="twitter" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box3">
              <div class="circle">
                <img
                  src="@assets/images/footer/facebook.png"
                  @click="facebook"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box5">
              <div class="circle">
                <img src="@assets/images/footer/weibo.png" @click="weibo" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box4">
              <div
                class="circle"
                @mouseenter="gotoshow()"
                @mouseleave="gotohide()"
              >
                <img src="@assets/images/footer/erweima.png" />
              </div>
            </div>
          </li>
        </ul>
        <ul class="hovershow" v-if="show">
          <img src="@assets/images/indexhover/juxing.png" class="imgshow" />
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
        <div class="component">
          <span class="neirong" @click="index">{{ $t("index[0]") }}</span>
          <span>|</span>
          <span class="neirong" @click="faqs">FAQ</span>
          <span>|</span>
          <span class="neirong" @click="about">{{ $t("about[0]") }}</span>
          <span>|</span>
          <span class="neirong" @click="partner">{{ $t("Partner[0]") }}</span>
        </div>
      </div>
      <div class="foot-zhong"></div>
      <footer>
        <p>{{ $t("shangbiao[0]") }}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { BASEURL } from "@api/api";
import Qs from "qs";
import headertop from "../components/common/header";
export default {
  name: "media",
  data() {
    return {
      nowLang: "",
      medianum: "",
      activenum: "",
      medialist: [],
      medialist2: [],
      mediacur: 0,
      page: "",
      fullscreenLoading: false,

      show: false,
      totalNum: 1,
    };
  },
  components: { headertop },
  created() {
    this.nowLang = this.$i18n.locale;
    this.$nextTick(() => {
      //console.log(this.$refs.pagination);
      this.$refs.pagination.currentPage = this.medianum;
    });
    this.medianum = this.getContextData("currentpage") || 1;

    this.getmedialist();
  },
  mounted() {},
  computed: {},
  methods: {
    gotochainexplor() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
    },
    //给sessionStorage存值
    setContextData: function(key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function(key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    },

    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    index() {
      this.$router.push({
        path: "/",
      });
    },
    about() {
      this.$router.push({
        path: "/about",
      });
    },
    partner() {
      this.$router.push({
        path: "/partner",
      });
    },
    change(page) {
      //console.log(page);
      this.medianum = page;
      this.setContextData("currentpage", this.medianum);
      this.getmedialist();
    },
    // 转到detail详情页
    godetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: id,
          // content: content,
          // title: title,
          // updatedate: updatedate,
          // thumb: thumb,
          // description: description,
        },
      });
    },
    //获取MEDIA
    getmedialist() {
      let that = this;
      var data = Qs.stringify({ pageNum: this.medianum, pageSize: 6 });
      that.$http
        .post(`${BASEURL}` + "/weimioffice/web/content/getNews", data, {
          headers: { language: this.nowLang },
        })
        .then((res) => {
          // console.log(res);
          //console.log(res.data.result.total);
          this.totalNum = res.data.result.total;
          //console.log(this.totalNum);
          this.medialist = res.data.result.list;
          //console.log(this.medialist);
          for (let i = 0; i < this.medialist.length; i++) {
            // this.medialist[i].thumb=this.medialist[i].thumb.replace("https://47.75.93.221", "https://www.uenc.io")
            // console.log(this.medialist)
            if (this.medialist[i].title.length > 16) {
              this.medialist[i].title =
                this.medialist[i].title.substring(0, 16) + "...";
              // "<br/>" +
              // '<span style="text-align:left;position:relative;left:-38px;top:-34px">' +
              // this.medialist[i].title.substring(16) +
              // "</span>";
            } else {
            }
            // console.log(this.medialist[i].title);
          }
          //console.log(this.medialist);
          localStorage.setItem("lan", this.nowLang);
        });
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
    github() {
      window.open("https://github.com/uenctech");
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
    weibo() {
      window.open("https://weibo.com/u/5580784739");
    },
  },
  destroyed() {},
};
</script>

<style lang="less">
#liulanqi {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 18px;
  position: relative;
  top: -7px;
  cursor: pointer;
}
.title1 {
  position: relative;
  top: -5px !important;
}

@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}
button {
  width: 83px;
  height: 36px;
  background: rgba(51, 51, 51, 1);
  border-radius: 5px;
  margin-top: -10px;
  margin-left: 15px;
  color: snow;
  cursor: pointer;
  border: none;
  outline: none;
}
.mediablock {
  position: relative;
  top: 174px;
  color: snow;
  width: 1200px;
  height: 30px;
  z-index: 40;
  margin: 0 auto;
  img:nth-child(1) {
    position: relative;
    left: 514px;
  }
  img:nth-child(3) {
    position: relative;
    left: 674px;
  }
  input {
    width: 30px;
    height: 30px;
    position: relative;
    left: 585px;
    background: rgba(0, 159, 205, 1);
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 42px;
    text-align: center;
    outline: none;
    border: none;
  }
  .ivu-page {
    margin-left: 35% !important;
    .ivu-page-item-active {
      background: rgba(0, 159, 205, 1) !important;
      a {
        color: aliceblue;
      }
    }
  }
  .ivu-page-simple-pager {
    #text {
      color: red;
      display: none !important;
    }
  }
}
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
@keyframes mediaslide {
  0% {
    width: 100px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  20% {
    width: 240px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  40% {
    width: 440px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  100% {
    width: 600px;
    background: rgba(0, 159, 205, 1);
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
  }
}
@keyframes mediaslidetab {
  0% {
    width: 0px;
  }
  100% {
    width: 10px;
  }
}
/* 点击对应的标题添加对应的背景颜色 */
.mediaactive {
  background-color: rgba(102, 102, 102, 1) !important;
  .media-tab-line {
    animation: mediaslidetab 0.1s linear;
    animation-fill-mode: forwards;
  }
}
// 主线
.media {
  width: 100%;
  height: auto;
  position: relative;
  .mediatop {
    height: 800px;
    position: relative;

    background: url("../assets/images/media/mediabg.png") no-repeat center/100%
      100%;
    // 头部内容区域
    .mediatop-content {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      z-index: 20;
      // 大方块设置
      .media-more {
        width: 600px;
        height: 263px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 50px;
        position: relative;
        top: 40px;
        cursor: pointer;
        border-radius: 10px;
        z-index: 20;
        p:first-child {
          z-index: 10;
          position: relative;
          left: 86px;
          top: 38px;
          width: 481px;
          height: 98px;
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 60px;
          opacity: 1;
        }
        p:nth-child(2) {
          z-index: 10;
          position: relative;
          left: 86px;
          top: 96px;
          width: 293px;
          height: 17px;
          font-size: 17px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          opacity: 0.5;
        }
      }
      .media-more:hover {
        .media-button-left {
          // animation: mediaslide 0.5s linear;
          // animation-fill-mode: forwards;
        }
      }
      .media-button-overflow {
        width: 600px;
        height: 263px;
        border-radius: 10px;
        position: relative;
        top: -97px;
        overflow: hidden;
        cursor: pointer;
        opacity: 1;
      }
      .media-button-left {
        width: 5px;
        height: 263px;
        position: relative;
        left: -2px;
        color: rgba(0, 159, 205, 1);
        background: rgba(0, 159, 205, 1);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        overflow: hidden;
        opacity: 1;
      }
      .media-button-left:hover {
        cursor: pointer;
      }
    }
  }
  .mediafooter {
    width: 100%;
    height: 847px;
    position: relative;
    background-color: #0c0c0c;
    .mediafooter-content {
      width: 1200px;
      height: 1011px;
      margin: 0 auto;
      // background-color: gray;
      .ivu-page li {
        border: none;
        background: none;
        a {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 30px;
        }
      }
      .ivu-page-item-active {
        color: red;
      }
      p {
        width: 350px;
        height: 33px;
        font-size: 34px;
        position: relative;
        top: 80px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .media-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 100px;
        background: rgba(0, 159, 205, 1);
      }
      .last {
        position: relative;
        top: 160px;
        width: 1200px;
        height: 604px;
        background-color: #333333;
        display: flex;
        flex-direction: row;
        z-index: 20;
        ul {
          position: relative;
          width: 401px;
          height: 604px;
          // background-color: goldenrod;
          li {
            position: relative;
            width: 300px;
            height: 101px;
            color: white;
            display: flex;
            flex-direction: row;
            line-height: 100px;
            text-align: center;
            background-color: #333333;
            cursor: pointer;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            border-bottom: 1px solid rgba(12, 12, 12, 1);
            overflow: hidden;
            span {
              text-align: center;
              margin-left: 35px;
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              line-height: 101px;
            }
            .media-tab-line {
              width: 0px;
              height: 100px;
              background: rgba(0, 159, 205, 1);
            }
          }
          li:hover {
            display: flex;
            flex-direction: row;
            .media-tab-line {
              animation: mediaslidetab 0.1s linear;
              animation-fill-mode: forwards;
            }
          }
        }
      }
      .tab-content {
        .tab-contentzonf {
          display: flex;
          flex-direction: column;
        }
        .tab-content-top {
          position: relative;
          left: 60px;
          top: 60px;
          width: 779px;
          height: 222px;
          font-family: PingFang SC;
          font-weight: 400;
          overflow: hidden;
          cursor: pointer;
        }
        .tab-content-bottom {
          position: relative;
          left: 59px;
          top: 98px;
          width: 780px;
          height: 232px;
          border-radius: 10px;
          cursor: pointer;
        }
      }
      .tab-content > div {
        width: 899px;
        height: 604px;
        background: rgba(51, 51, 51, 1);
        line-height: 100px;
        text-align: center;
        background-color: #666666;
        display: flex;
        flex-direction: row;
      }
    }
  }
}

.headerindext {
  position: relative;
  top: -83px;
}
// 底部
.mediauenc_foot {
  width: 100%;
  height: 166px;
  background-color: #0c0c0c;
  position: relative;
  z-index: 40;
  .foot-top {
    width: 1200px;
    height: 111px;
    margin: 0 auto;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    // z-index: 20;
    .foot-box {
      width: 500px;
      display: flex;
      flex-direction: row;
      position: relative;
      justify-content: space-between;
      img {
        align-content: center;
      }
      .circle {
        width: 40px;
        height: 40px;
        background: rgba(51, 51, 51, 1);
        position: relative;
        left: 5px;
        top: 5px;
        border-radius: 50%;
      }
      .foot-box1 {
        width: 50px;
        height: 50px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
        margin-top: 30px;
        img {
          position: relative;
          top: 9px;
          cursor: pointer;
          left: 15%;
        }
      }
      .foot-box1:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box2:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box3:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box5:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box3 {
        img {
          left: 33% !important;
        }
      }
      .foot-box2,
      .foot-box3,
      .foot-box4,
      .foot-box5 {
        width: 50px;
        height: 50px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
        position: relative;
        // margin-left: 40px;
        margin-top: 30px;
        img {
          cursor: pointer;
          position: relative;
          top: 7px;
          left: 17%;
        }
      }
      .foot-box4:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
    }
    .component {
      line-height: 111px;
      span {
        margin-left: 39px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
      }
    }
  }
  .foot-zhong {
    width: 100%;
    height: 1px;
    background: rgba(0, 159, 205, 1);
  }
  footer p {
    margin: 0 auto;
    width: 372px;
    height: 13px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
    text-align: center;
  }
  .hovershow {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -97px;
    left: 42%;
    float: left;
    z-index: 30;
    opacity: 1;
    .imgshow {
      width: 310px;
      height: 181px;
      position: relative;
    }
    .club {
      width: 120px;
      height: 120px;
      position: relative;
      left: -280px;
      top: 20px;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        position: relative;
        left: 9px;
      }
    }
    .wallet {
      width: 120px;
      height: 120px;
      position: relative;
      left: -260px;
      top: 20px;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        position: relative;
        left: 18px;
      }
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>
