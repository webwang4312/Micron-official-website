<template>
  <div class="developer_detail">
    <!-- <vue-particles
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
    </vue-particles> -->
    <registrationtask v-if="$store.state.registrationtask"></registrationtask>
    <votenumber v-if="$store.state.votenumber"></votenumber>

    <login v-if="$store.state.showlogin" ref="login"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <div class="developer_detail_top">
      <headerthird></headerthird>
    </div>
    <div class="developer_detail_content">
      <div class="developer_detail_contents">
        <p class="title">{{ title }}</p>
        <div class="summary" v-html="describe"></div>
        <ul class="detail">
          <li class="detail_amount">
            <p>
              <span> {{ amount }}</span
              ><span> UENC</span>
            </p>
            <p>{{ $t("developerdetail[0]") }}</p>
          </li>
          <li class="detail_human">
            <p>
              <span> {{ $t("developerdetail[1]") }}:</span>
              <span>{{ joinCount }}</span>
            </p>
            <p>
              <span>{{ $t("developerdetail[2]") }}:</span>
              <span>{{ endTime }}</span>
            </p>
          </li>
          <li>
            <p class="github_net">
              <span>{{ $t("developerdetail[3]") }}： </span>
              <span>{{ link }}</span>
            </p>
          </li>
          <li>
            <div class="registration_task3" v-if="status == 1">
              <img src="@assets/images/developerdetail/矢量智能对象.png" />{{
                $t("developerdetail[5]")
              }}
            </div>
            <div class="registration_task2" v-else-if="status == 2">
              <img src="@assets/images/developerdetail/完成.png" />{{
                $t("developerdetail[6]")
              }}
            </div>
            <div class="registration_task" @click="registrationTask" v-else>
              <img src="@assets/images/developerdetail/矢量智能对象.png" />{{
                $t("developerdetail[4]")
              }}
            </div>
          </li>
        </ul>
        <div class="overhide" v-if="marqueetrueall">
          <ul v-if="marqueetrue">
            <li v-for="(item, index) in newsList" :key="index">
              <span>{{ item.name }}</span
              >{{ $t("developerdetail[7]") }}<span>{{ item.amount }}</span
              >UENC
            </li>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </ul>

          <marquee
            direction="left"
            height="60"
            scrollamount="10"
            behavior="scroll"
            onmouseover="stop()"
            onmouseout="start()"
            v-else
          >
            <ul>
              <li v-for="(item, index) in newsList" :key="index">
                <span>{{ item.name }}</span
                >{{ $t("developerdetail[7]") }}<span>{{ item.amount }}</span
                >UENC
              </li>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </ul>
          </marquee>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="proposal_detail_foot">
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
            <div class="foot-box6">
              <div class="circle">
                <img src="@assets/images/footer/reddit.png" @click="reddit" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box7">
              <div class="circle">
                <img src="@assets/images/footer/medium.png" @click="medium" />
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
          <span class="neirong" @click="faqs">FAQ'S</span>
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
var qs = require("qs");
import CountDown from "vue2-countdown";
import Login from "@components/common/Login";
import Forget from "@components/common/ForgetPassword";
import Fastoken from "@components/common/Fastoken";
import headerthird from "@components/common/headerthird";
import registrationtask from "@components/common/RegistrationTask";
import votenumber from "@components/common/voteNumber";
export default {
  name: "developerdetail",
  inject: ["reload"],
  data() {
    return {
      taskId: "",
      nowLang: "",
      fullscreenLoading: false,
      show: false,
      newsList: [],
      marqueetrueall: false,
      marqueetrue: true,
      // 标题
      title: "",
      //  描述
      describe: "",
      //  奖励金额
      amount: "",
      //  已报名人数
      joinCount: "",
      // 截止时间
      endTime: "",
      // 地址
      link: "",
      // 状态
      status: "",
    };
  },

  components: {
    Login,
    Forget,
    Fastoken,
    headerthird,
    votenumber,
    CountDown,
    registrationtask,
  },
  created() {
    this.$store.state.registrationtask = false;
    // console.log(this.$store.state.registrationtask);
    // console.log(localStorage.getItem("userId"));
    this.taskId = this.$route.query.taskId;
    localStorage.setItem("uenc-taskId", this.taskId);
    // console.log(this.taskId);
  },
  computed: {},
  mounted() {
    this.developerDetail();
  },

  methods: {
    registrationTask() {
      if (!localStorage.getItem("token")) {
        window.sessionStorage.clear();
        localStorage.clear();
        this.$store.commit("leavelogin");
        this.reload();
        if (this.$i18n.locale == "en") {
          this.$message.error("Please log in or register first");
        } else {
          this.$message.error("请先去登录或注册");
        }
      } else {
        this.$store.commit("RegistrationTask");
      }
    },
    // 查询开发者社区详情
    async developerDetail() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/task/info",
          qs.stringify({
            taskId: this.taskId,
            userId: localStorage.getItem("userId"),
          })
        )
        .then((res) => {
          // console.log(res);
          let info = res.data.result.taskInfo;
          // 标题
          this.title = info.title;
          //  描述
          this.describe = info.describe;
          //  奖励金额
          this.amount = info.amount;
          //  已报名人数
          this.joinCount = info.joinCount;
          // 截止时间
          var timearr = info.endTime
            .replace(" ", ":")
            .replace(/\:/g, "-")
            .split("-");
          var timestr =
            timearr[0] + "/" + Number(timearr[1]) + "/" + timearr[2] + "";
          //  console.log(timearr);
          this.endTime = timestr;
          // 地址
          this.link = info.link;
          // 状态
          this.status = info.status;
          // res.data.result.rollList = [
          //   { amount: "100", name: "100" },
          //   { amount: "200", name: "200" },
          //   { amount: "300", name: "300" },
          // { amount: "400", name: "400" },
          // { amount: "500", name: "500" },
          // { amount: "600", name: "600" },
          // { amount: "700", name: "700" },
          // { amount: "800", name: "800" },
          // { amount: "900", name: "900" },
          // { amount: "1000", name: "1000" },
          // { amount: "1100", name: "1100" },
          // { amount: "1200", name: "1200" },
          // { amount: "1300", name: "1300" },
          // { amount: "1400", name: "1400" },
          // { amount: "1500", name: "1500" },
          // { amount: "1600", name: "1600" },
          // ];
          this.newsList = res.data.result.rollList;
          if (res.data.result.rollList.length > 0) {
            this.marqueetrueall = true;
            if (res.data.result.rollList.length >= 3) {
              this.marqueetrue = false;
            } else {
              this.marqueetrue = true;
            }
          } else {
            this.marqueetrueall = false;
          }

          //   var newsList = [];
          //   for (let i = 0; i < res.data.result.rollList.length; i++) {
          //     newsList.push(res.data.result.rollList[i]);
          //   }
          //   this.newsList = newsList;
        });
    },
    goToVote() {
      this.$router.push({
        path: "/vote",
      });
    },
    fastoken() {
      this.$store.dispatch("fastokenShow");
    },

    leavelogin() {
      // 清除缓存
      this.$store.commit("leavelogin");
      this.iconshow = false;
    },
    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },

    news() {
      this.$router.push({
        path: "/news",
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
    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
    linkClick() {
      // console.log(this.link);
      //  window.location.href = this.link
      window.open(this.link, "_blank");
      // window.open(this.link);
    },
    github() {
      window.open("https://github.com/uenctech");
    },
    telegram() {
      window.open("https://t.me/UENCOfficial");
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
.overhide {
  width: 1200px;
  height: 60px;
  line-height: 60px;
  background: rgba(44, 44, 44);
  border-radius: 10px;
  overflow: hidden;
  ul {
    display: flex;
    flex-direction: row;
    height: 60px;
    li {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: white;
      margin-left: 49px;
      span {
        color: rgba(0, 159, 205, 1);
      }
    }
  }
  marquee {
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
.developer_detail {
  width: 100%;
  height: auto;
  position: relative;

  .developer_detail_top {
    height: 150px;
    position: relative;
    margin: 0 auto;
    background: black;
    z-index: 1;
  }
  .developer_detail_content {
    width: 100%;
    height: auto;
    background: rgba(20, 20, 20);
    padding-bottom: 40px;
    padding-top: 80px;
    .developer_detail_contents {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      .title {
        width: 100%;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #ffffff;
        word-wrap: break-word;
        word-break: normal;
      }
      .summary {
        padding: 40px;
        width: 1200px;
        height: auto;
        min-height: 500px;
        background: #e5e5e5;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 40px;
        word-wrap: break-word;
        word-break: normal;
        table{
          width: 100%!important;
        }
      }
      .detail {
        width: 1200px;
        height: 160px;
        background: rgba(44, 44, 44);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 40px;
        margin-bottom: 40px;
        .github_net {
          position: relative;
          top: 46px;
          width: 350px;
          word-wrap: break-word;
          word-break: normal;

          span:nth-child(1) {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            line-height: 22px;
          }
          span:nth-child(2) {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 22px;
            // cursor: pointer;
          }
        }
        .detail_human {
          p:nth-child(1) {
            position: relative;
            top: 46px;
          }
          p:nth-child(2) {
            position: relative;
            top: 72px;
            span:nth-child(2) {
              padding-left: 20px;
            }
          }
          p {
            span:nth-child(1) {
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #009fcd;
              line-height: 22px;
            }
            span:nth-child(2) {
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 22px;
            }
          }
        }
        li {
          .registration_task {
            width: 163px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid #009fcd;
            border-radius: 10px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #009fcd;
            cursor: pointer;
          }
          .registration_task3 {
            width: 163px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid #009fcd;
            border-radius: 10px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #009fcd;
          }
          .registration_task2 {
            width: 163px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid rgba(196, 53, 53, 1);
            border-radius: 10px;

            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #c43535;
          }
        }
        .detail_amount {
          width: 237px;
          border: 1px solid rgba(24, 129, 160);
          background: rgba(77, 79, 79);
          text-align: center;
          box-shadow: 0px 0px 4px #888888;
          border-radius: 10px;
          p:nth-child(1) {
            margin-top: 48px;
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #009fcd;
            line-height: 22px;
          }
          p:nth-child(2) {
            margin-top: 19px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 22px;
          }
        }
        li:nth-child(2) {
        }
        li:nth-child(4) {
          display: flex;
          flex-direction: row;
          align-items: center;

          margin-right: 60px;
          img {
            width: 25px;
            height: 20px;
            margin-right: 14px;
            position: relative;
            top: 5px;
          }
        }
      }
    }
  }
  // 底部
  .proposal_detail_foot {
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
        justify-content: space-between;
        position: relative;
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
}
</style>
