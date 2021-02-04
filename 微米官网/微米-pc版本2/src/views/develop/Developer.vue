<template>
  <div class="developer">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.3"
      :particlesNumber="50"
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

    <div class="developer_top">
    
      <div class="partnertop-content">
        <div class="partner-more">
          <p>{{ $t("developer[0]") }}</p>
          <p>{{ $t("developer[1]") }}</p>
          <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
        </div>
      </div>
    </div>
    <div class="developer_total">
      <div class="partnerfooter-content">
        <p>{{ $t("developer[2]") }}</p>
        <div class="partner-line"></div>
        <div class="developer_total-img">
          <ul>
            <li>
              <img
                src="@assets/images/developer/矢量智能对象.png"
                style="width:80px;height:80px"
              />
              <div>{{ taskCount }}</div>
              <div>
                {{ $t("developer[3]") }}
              </div>
            </li>
            <li>
              <img
                src="@assets/images/developer/矢量智能对象(1).png"
                style="width:59px;height:80px"
              />
              <div>{{ completeCount }}</div>
              <div>
                {{ $t("developer[4]") }}
              </div>
            </li>
            <li>
              <img
                src="@assets/images/developer/矢量智能对象(2).png"
                style="width:60px;height:80px"
              />
              <div>{{ grantCount }}</div>
              <div>
                {{ $t("developer[5]") }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="developer_task">
      <div class="developer_task-content">
        <p>{{ $t("developer[6]") }}</p>
        <div class="developer_task-line"></div>
        <div class="zhanwei" v-if="zhanwei">
          <img
            src="@assets/images/proposal/矢量智能对象.png"
            style="width:400px"
          />
          <p>{{ $t("zhanwei[0]") }}</p>
        </div>

        <ul class="developer_task-img" v-else>
          <li v-for="item in developerlist" :key="item">
            <div class="developer_task_header">
              <span>{{ item.title }}</span>
              <span>{{ item.amount }}UENC</span>
            </div>
            <div class="developer_task_content">
              {{ item.outline }}
            </div>
            <div class="align">
              <button @click="goToDeveloperDetail(item.taskId)">
                {{ $t("developerdetail[8]") }}
              </button>
            </div>
          </li>
        </ul>
        <div class="blocksdevelop" v-if="!zhanwei">
          <Page
            :total="developerTotal"
            :page-size="9"
            @on-change="developerChange"
            v-if="developerTotal != 0"
            ref="pagination"
          />
        </div>
      </div>
    </div>
    <div class="developer_reward">
      <div class="developer_reward-content">
        <p class="rewardp">{{ $t("developer[7]") }}</p>
        <div class="partner-line"></div>
        <div class="developer_reward-img">
          <div class="reward_left">
            <p>
              {{ $t("developer[8]") }}
            </p>
            <p>
              {{ $t("developer[9]") }}
            </p>
            <button @click="CopyUrl">{{ $t("developer[10]") }}</button>
            <button @click="goTogithub">{{ $t("developer[11]") }}</button>
          </div>
          <div class="reward_right">
            <img src="@assets/images/developer/矢量智能对象(3).png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="partneruenc_foot">
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
var qs = require("qs");
import { BASEURL } from "@api/api";

export default {
  inject: ["reload"],
  name: "partner",
  data() {
    return {
      nowLang: "",
      fullscreenLoading: false,

      show: false,
      developerTotal: "",
      developernum: "",
      developerlist: [],
      completeCount: "",
      grantCount: "",
      taskCount: "",
      zhanwei: false,
    };
  },
  components: {  },
  created() {
    this.nowLang = this.$i18n.locale;
    this.developernum = 1;
    this.developerInfor();
    this.developerSum();
  },
  computed: {},
  mounted() {},
  methods: {
    goToDeveloperDetail(taskId) {
      this.$router.push({
        path: "/developerdetail",
        query: { taskId: taskId },
      });
    },
    developerChange(page) {
      // console.log(page);
      this.developernum = page;
      // console.log(this.developernum);
      // this.setContextData("currentpage", this.medianum);
      this.developerInfor();
      window.scrollTo(0, 1450);
    },
    developerSum() {
      this.$http
        .post(`${BASEURL}` + "/weimioffice/task/statistics ")
        .then((res) => {
          // console.log(res);
          this.completeCount = res.data.result.completeCount;
          this.grantCount = res.data.result.grantCount;
          this.taskCount = res.data.result.taskCount;
        });
    },
    developerInfor() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/task/list",
          qs.stringify({
            pageNum: this.developernum,
            pageSize: 9,
          })
        )
        .then((res) => {
          // console.log(res);
          this.developerTotal = res.data.result.total;
          if (res.data.result.total == 0) {
            this.zhanwei = true;
          } else {
            this.zhanwei = false;
          }
          for (let i = 0; i < res.data.result.list.length; i++) {
            if (res.data.result.list[i].outline.length >= 54) {
              res.data.result.list[i].outline =
                res.data.result.list[i].outline.substring(0, 54) + "...";
            } else {
              res.data.result.list[i].outline = res.data.result.list[i].outline;
            }
            if (res.data.result.list[i].title.length >= 5) {
              res.data.result.list[i].title =
                res.data.result.list[i].title.substring(0, 5) + "...";
            } else {
              res.data.result.list[i].title = res.data.result.list[i].title;
            }
          }
          this.developerlist = res.data.result.list;
        });
    },
    CopyUrl(data) {
      var Url2 = "tech@uenc.net";
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message({
        message: "复制成功!",
        type: "success",
      });
    },
    goTogithub() {
      window.open("https://github.com/uenctech");
    },
    gotochainexplor() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
    },
    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    partner() {
      this.$router.push({
        path: "/partner",
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
    // 选择语言
  },
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
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
@keyframes partnerslide {
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
// 主线
.developer {
  width: 100%;
  height: auto;
  position: relative;
  .developer_top {
    height: 900px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/developer/developer.png") no-repeat
      center/100% 100%;

    // 头部内容区域
    .partnertop-content {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      position: relative;
      // 大方块设置
      .partner-more {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        width: 600px;
        height: 297px;
        background: rgba(255, 255, 255, 0.05);
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        position: relative;
        left: 597px;
        top: 156px;
        cursor: pointer;
        z-index: 20;
        p:first-child {
          z-index: 10;
          margin-left: 80px;
          margin-top: 90px;
          width: 481px;

          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
        p:nth-child(2) {
          z-index: 10;
          width: 500px;
          margin-left: 80px;
          margin-top: 40px;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }

      .partner-button-overflow {
        width: 600px;
        height: 263px;
        border-radius: 10px;
        position: relative;
        top: -97px;
        overflow: hidden;
        cursor: pointer;
        opacity: 1;
      }
      .partner-button-left {
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
      .partner-button-left:hover {
        cursor: pointer;
      }
    }
  }
  .developer_total {
    width: 100%;
    height: 542px;
    position: relative;
    background-color: #0c0c0c;
    .partnerfooter-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      p {
        width: 356px;
        height: 33px;
        font-size: 34px;
        position: relative;
        top: 80px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .partner-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 100px;
        background: rgba(0, 159, 205, 1);
      }
      .developer_total-img {
        width: 1200px;
        height: 288px;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        position: relative;
        top: 140px;
        ul {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          li {
            width: 400px;
            display: flex;
            flex-direction: column;
            text-align: center;
            position: relative;
            align-items: center;
            top: 50px;
            overflow: hidden;
            div:nth-of-type(1) {
              font-size: 50px;
              font-family: PingFang SC;
              font-weight: 600;
              color: #009fcd;
            }
            div:nth-of-type(2) {
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .developer_task {
    width: 100%;
    height: auto;
    background: rgb(20, 20, 20);
    padding-bottom: 122px;
    .developer_task-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .blocksdevelop {
        position: relative;
        top: 40px;

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
      p {
        width: 356px;
        height: 33px;
        line-height: 33px;
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: 600;

        color: rgba(255, 255, 255, 1);
        margin-top: 80px;
      }
      .developer_task-line {
        width: 100px;
        height: 2px;
        background: #009fcd;
        margin-top: 20px;
      }
      .zhanwei {
        width: 1200px;
        text-align: center;
        height: 300px;
        p {
          width: 100%;
          text-align: center;
          font-size: 20px;
        }
      }
      .developer_task-img {
        width: 1200px;
        height: auto;
        border-radius: 10px;
        margin-top: 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 auto;

        li:nth-child(3n + 1) {
          margin-left: 0px !important;
        }
        li {
          width: 387px;
          height: 268px;
          background: rgba(44, 44, 44);
          border-radius: 10px;
          margin-top: 40px;
          margin-left: 15px;
          .developer_task_header {
            width: 80%;
            margin: 0 auto;
            margin-top: 39px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            // padding-left: 40px;
            // padding-right: 40px;
            span:nth-child(1) {
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: 600;
              color: #ffffff;
              line-height: 17px;
            }
            span:nth-child(2) {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #009fcd;
              line-height: 17px;
            }
          }
          .developer_task_content {
            width: 303px;
            height: 64px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            margin: 0 auto;
            margin-top: 28px !important;
          }
          .align {
            text-align: center;
            button {
              margin-top: 30px !important;
              width: 307px;
              height: 40px;
              border: 1px solid #009fcd;
              border-radius: 8px;
              background: none;
              margin: 0 auto;
              text-align: center;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #009fcd;
              line-height: 40px;
              cursor: pointer;
            }
            button:hover {
              background: #009fcd;
              color: white;
            }
          }
        }
      }
    }
  }
  .developer_reward {
    width: 100%;
    height: 521px;
    position: relative;
    background: rgb(12, 12, 12);
    .developer_reward-content {
      width: 1200px;
      height: 595px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .rewardp {
        width: 571px;
        height: 33px;
        font-size: 34px;
        position: relative;
        top: 80px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .partner-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 100px;
        background: rgba(0, 159, 205, 1);
      }
      .developer_reward-img {
        width: 1200px;
        height: 400px;

        border-radius: 10px;
        position: relative;
        top: 140px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .reward_left {
          width: 568px;
          p {
            width: 568px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #dddddd;
            line-height: 24px;
          }
          button {
            width: 176px;
            height: 45px;
            border: 1px solid #009fcd;
            border-radius: 10px;
            background: rgba(12, 12, 12);
            margin-top: 60px;

            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #009fcd;
            line-height: 24px;
          }
          button:nth-of-type(2) {
            margin-left: 60px;
          }
          button:hover {
            background: #009fcd;
            color: white;
          }
        }
        .reward_right {
          position: relative;
          top: -141px;
        }
      }
    }
  }
}

// 底部
.partneruenc_foot {
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
