<template>
  <div class="faq">
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
    <div class="faqtop">
      <headertop></headertop>
      <div class="faqtop-content">
        <div class="faq-more">
          <p>{{ $t("recommendtitle[0]") }}</p>
          <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
          <div class="faq-button-overflow">
            <div class="faq-button-left"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="faqfooter">
      <div class="faqfooter-content">
        <p>{{ $t("FAQ[0]") }}</p>
        <div class="faq-line"></div>
        <div class="faqfooter-img">
          <Collapse v-model="activenum" accordion>
            <Panel
              :name="item.id"
              v-for="item in faqlist"
              :key="item.id"
              @on-change="changecollapse"
            >
              {{ item.question }}
              <p slot="content">{{ item.answer }}</p>
            </Panel>
          </Collapse>
          <!-- <Collapse v-model="activenum" accordion>
        <Panel name="1">
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
        </Panel>
        <Panel name="2">
            斯蒂夫·盖瑞·沃兹尼亚克
            <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
        </Panel>
        <Panel name="3">
            乔纳森·伊夫
            <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
        </Panel>
    </Collapse> -->
          <!-- <el-collapse v-model="activenum" accordion @change="collapseChange">
            <el-collapse-item
              :title="item.question"
              :name="item.id"
              id="el-collapse-itemfirst"
              v-for="item in faqlist"
              :key="item.id"
            >
              <div>
                {{ item.answer }}
              </div>
            </el-collapse-item>
          </el-collapse> -->
          <div class="blocks">
            <Page
              :total="totalNum"
              :page-size="7"
              @on-change="change"
              :cureent.sync="medianum"
              v-if="totalNum != 0"
              ref="pagination"
            />
            <!-- <img src="../assets/images/FAQ/left.png" alt="" @click="less" /> -->

            <!-- <input type="text" v-model="page" @blur="jump" /> -->
            <!-- <img src="../assets/images/FAQ/right.png" alt="" @click="plus" /> -->
            <!-- <Page :current="1" :total="2" simple :page-size="1" @on-change="pagezoom"/> -->
          </div>
        </div>
      </div>
    </div>
    <div class="faquenc_foot">
      <div class="foot-top">
        <ul class="foot-box">
          <li>
            <div class="foot-box1">
              <div class="circle">
                  <img src="@assets/images/footer/github.png" @click="github" style="position:relative;left:10px" />
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
          <span class="neirong" @click="about">{{ $t("about[0]") }}</span>
          <span>|</span>
          <span class="neirong" @click="news">{{
            $t("Mediaannouncement[0]")
          }}</span>
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
import headertop from "../components/common/header";
import Qs from "qs";
export default {
  name: "faq",
  data() {
    return {
      nowLang: "",
      activenum: "",
      currentPage1: 1,
      faqlist: [],
      num: 1,
      page: 1,
      fullscreenLoading: false,
      cur: "",
      show: false,
      totalNum: 1,
      medianum: "",
      // ppp:'',
    };
  },
  components: { headertop },
  created() {
    this.nowLang = this.$i18n.locale;
    this.activenum = this.num;

    // this.$nextTick(() => {
    //   //console.log(this.$refs.pagination);
    //   this.$refs.pagination.currentPage = this.medianum;
    // });
    this.medianum =  1;

    this.getfaqlist();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    changecollapse(index) {
      // console.log(index);
    },
    collapseChange(activeNames) {
      // console.log(activeNames);
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //  console.log(scrollTop);
    },
    // 头部公共部分
    logins() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow");
    },
    register() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow2");
    },
    leavelogin() {
      // 清除缓存
      window.sessionStorage.clear();
      this.$store.dispatch("leavelogin");
    },
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
    news() {
      this.$router.push({
        path: "/news",
      });
    },
    partner() {
      this.$router.push({
        path: "/partner",
      });
    },
    change(page) {
      this.medianum = page;
      // this.setContextData("currentpage", this.medianum);
      this.getfaqlist();
    },
    //获取FAQ数据
    async getfaqlist() {
      let that = this;
      var data = Qs.stringify({ pageNum: this.medianum, pageSize: 7 });
      await that.$http
        .post(`${BASEURL}` + "/weimioffice/web/content/getFaqs", data, {
          headers: { language: this.nowLang },
        })
        .then((res) => {
          // console.log(res);
          this.totalNum = res.data.result.total;
          //this.ppp=res.data.result.length
          //console.log( this.ppp);
          for (let i = 0; i < res.data.result.list.length; i++) {
            // console.log(typeof res.data.result.list[i].id);
            res.data.result.list[i].id = String(res.data.result.list[i].id);
          }
          this.faqlist = res.data.result.list;

          // console.log(this.faqlist);
          localStorage.setItem("lan", this.nowLang);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    jump() {
      //console.log(this.num);
      this.getfaqlist();
    },
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
        github(){
 window.open("https://github.com/uenctech");
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
  },
  computed: {},
};
</script>
<style lang="less">
.ivu-collapse {
  border: 0px !important;
  width: 1200px !important;
  background: #666666 !important;
  border-radius: 10px !important;
  overflow: hidden;
  .ivu-collapse-item {
    border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
    background: #666666 !important;
  }
  .ivu-icon {
    position: relative;
    left: 1180px;
  }
}
.ivu-collapse-item {
  .ivu-collapse-header {
    width: 1200px !important;
    height: 51px !important;
    line-height: 51px !important;
    border: none !important;
    padding-left: 0px !important;
    font-size: 20px !important;
    font-family: PingFang SC !important;
    font-weight: 500 !important;
    color: #ffffff !important;
    margin-left: -20px !important;
  }
}
.ivu-collapse-content {
  padding: 0 !important;
}
.ivu-collapse-content-box {
  width: 1200px;
  height: 192px;
  background: #333333;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
  p {
    width: 1158px !important;
    height: 113px !important;
    font-size: 20px !important;
    font-family: PingFang SC !important;
    font-weight: 300 !important;
    color: #ffffff !important;
    line-height: 31px !important;
    position: relative !important;
    top: 0px !important;
    padding-left: 21px !important;
    padding-top: 40px !important;
  }
}
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
@keyframes faqslide {
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
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
// 主线
.faq {
 
  height: auto;
  position: relative;
  .faqtop {
    width: 100%;
    height: 800px;
    position: relative;
    background: url("../assets/images/FAQ/faqbg.png") no-repeat center/100% 100%;
    // 头部内容区域
    .faqtop-content {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      z-index: 20;
      // 大方块设置
      .faq-more {
        width: 600px;
        height: 263px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 1);

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
      .faq-more:hover {
        .faq-button-left {
          // animation: faqslide 0.5s linear;
          // animation-fill-mode: forwards;
        }
      }
      .faq-button-overflow {
        width: 600px;
        height: 263px;
        border-radius: 10px;
        position: relative;
        top: -97px;
        overflow: hidden;
        cursor: pointer;
        opacity: 1;
      }
      .faq-button-left {
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
      .faq-button-left:hover {
        cursor: pointer;
      }
    }
  }
  .faqfooter {
    width: 100%;
    height: 847px;
    position: relative;
    background-color: #0c0c0c;

    .faqfooter-content {
      width: 1200px;
      height: 1011px;
      margin: 0 auto;
      z-index: 20;
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
      .faq-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 100px;
        background: rgba(0, 159, 205, 1);
      }
      .faqfooter-img {
        width: 1200px;
        height: 548px;
        // background: rgba(102, 102, 102, 1);
        border-radius: 10px;
        position: relative;
        top: 139px;
        z-index: 20;
        #el-collapse-head-3779 {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        #el-collapse-head-4932 {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .el-collapse:first-child {
          border-radius: 30px;
        }
        .el-collapse {
          width: 1200px;
          height: 550px;
          position: relative;
          border-radius: 10px;
          border: none;
          #el-collapse-itemfirst {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border: none;
          }
          .el-collapse-item__header {
            height: 51px;
            background: rgba(102, 102, 102, 1);
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 50px;
            padding-left: 21px;
            border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
          }
          .el-collapse-item__wrap {
            width: 1200px;
            height: 192px;
            background: rgba(51, 51, 51, 1);
            box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
            border: none;
            .el-collapse-item__content {
              width: 1200px;
              height: 192px;
              border-radius: 10px;
              background: rgba(51, 51, 51, 1);
              box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 300;
              color: rgba(255, 255, 255, 1);
              padding-left: 21px;
              padding-top: 40px;
              // line-height: 192px;
            }
          }
        }
        .blocks {
          position: relative;
          top: 80px;

          width: 1200px;
          height: 30px;
          z-index: 20;
          margin: 0 auto;
          text-align: center;

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
            top: -30px;
            left: 754px;
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
            // margin-left: 35% !important;
          }
          .ivu-page-simple-pager {
            #text {
              color: red;
              display: none !important;
            }
          }
        }
      }
    }
    .ivu-page-item {
      background: none;
      border: none;
    }
    .ivu-page li {
      margin-left: 35px;
    }
    .ivu-page-next a,
    .ivu-page-prev a {
      font-size: 27px;
    }
    .ivu-page-next,
    .ivu-page-prev {
      background: none;
      border: none;
    }
    .ivu-page-item-active {
      background: rgba(0, 159, 205, 1);
      a {
        color: aliceblue;
      }
    }
  }
}

// 底部
.faquenc_foot {
  width: 100%;
  height: 166px;
  background-color: #0c0c0c;
  position: relative;

  z-index: 20;
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
