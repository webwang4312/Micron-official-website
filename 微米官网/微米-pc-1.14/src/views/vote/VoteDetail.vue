<template>
  <div class="vote_detail">
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
    <votenumber v-if="$store.state.votenumber"></votenumber>

    <login v-if="$store.state.showlogin" ref="login"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>
    <div class="proposal_detail_top">
      <headerthird></headerthird>
      <div class="partnertop-content">
        <span class="top_title"
          ><img
            src="@assets/images/header/主页.png"
            style=" position: relative;top:2px"
            @click="index()"
          />
          当前位置：<span @click="goToVote">关于社区</span>
          <span @click="goToVote"> >投票</span>>投票详情</span
        >
      </div>
    </div>
    <div class="proposal_detail_content">
      <div class="proposal_detail_contentdetail">
        <div class="vote_title">{{ title }}</div>
        <div class="vote_name">由{{ name }}创建于{{ createtime }}</div>
        <ul>
          <li v-if="$route.query.state == 2">
            <div class="vote_content_top">
              <div></div>
              <div>投票倒计时</div>
            </div>
            <div class="vote_content_footer" v-if="toupiaoend">
              <count-down
                id="now_end"
                :currentTime="parseInt(nowTime / 1000)"
                :startTime="parseInt(nowTime / 1000)"
                :endTime="parseInt(endTime / 1000)"
                :tipText="'距离投票时间开始还有'"
                :tipTextEnd="'距离投票结束时间还剩'"
                :endText="'投票时间已结束'"
                :dayTxt="'天'"
                :hourTxt="'小时'"
                :minutesTxt="'分钟'"
                :secondsTxt="'秒'"
              >
              </count-down>
            </div>
            <div class="vote_content_footer" v-else>投票时间已结束</div>
          </li>
          <li v-else></li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>标题</div>
            </div>
            <div class="vote_content_footer">{{ title }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>摘要</div>
            </div>
            <div class="vote_content_footer">{{ summary }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>目标</div>
            </div>
            <div class="vote_content_footer">{{ target }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>计划</div>
            </div>
            <div class="vote_content_footer">{{ plan }}</div>
          </li>
          <li>
            <div class="vote_content_top">
              <div></div>
              <div>预算</div>
            </div>
            <div class="vote_content_footer">{{ budget }}</div>
          </li>
        </ul>
        <div class="agreereject">
          <div class="vote_vote">
            <el-progress :percentage="percentage" color="red"></el-progress>
            <div class="agreereject_detail">
              <div>
                <img src="@assets/images/detail/矩形 45 拷贝.png" /> 反对{{
                  consAmount
                }}
              </div>
              <div>
                {{ prosAmount }}
                赞成
                <img src="@assets/images/detail/矩形 45.png" />
              </div>
            </div>
            <div class="buttonprorej" v-if="$route.query.state == 2">
              <div @click="reject1" v-show="toupiaoend">
                <img src="@assets/images/detail/组 1890.png" /><span
                  >反对</span
                >
              </div>
              <div @click="agree1" v-show="toupiaoend">
                <img src="@assets/images/detail/组 1890 拷贝.png" /><span
                  >赞成</span
                >
              </div>
            </div>
            <div class="buttonprorej" v-else></div>
          </div>
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
          <span class="neirong" @click="news">{{
            $t("Mediaannouncement[0]")
          }}</span>
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
import votenumber from "@components/common/voteNumber";
export default {
  name: "partner",
  inject: ["reload"],
  data() {
    return {
      countDownList: "投票时间已结束",
      actEndTime: "2020-10-21 18:50:00",
      nowLang: "",
      fullscreenLoading: false,
      show: false,
      iconshow: false,
      transform: false,
      login: true,
      percentage: "",
      budget: "",
      consAmount: "",
      nowTime: "",
      endTime: "",
      plan: "",
      prosAmount: "",
      summary: "",
      target: "",
      title: "",
      toupiaoend: false,
      name: "",
      createtime: "",
    };
  },
  components: { Login, Forget, Fastoken, headerthird, votenumber, CountDown },
  created() {
    //  if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   location.reload();
    // }
    //  console.log(this.$route.query.state);
    this.voteDetail();
    this.countDown();
  },
  computed: {},
  mounted() {},
  methods: {
    reject1() {
      this.$store.commit("voteNumber");
      localStorage.setItem("activityId", this.$route.query.activityId);
      localStorage.setItem("toupiaostate", 0);
    },
    agree1() {
      this.$store.commit("voteNumber");
      localStorage.setItem("activityId", this.$route.query.activityId);
      localStorage.setItem("toupiaostate", 1);
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date(this.nowTime).getTime(); // 对结束时间进行处理渲染到页面
        // console.log(newTime);
        let endTime = new Date(this.endTime).getTime();
        // console.log(endTime);
        let obj = null; // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          this.toupiaoend = true;
          let time = (endTime - newTime) / 1000; // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt((time % (60 * 60 * 24)) / 3600);
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec),
          };
        } else {
          this.toupiaoend = false;
          // 活动已结束，全部设置为'00'
          obj = {
            day: "00",
            hou: "00",
            min: "00",
            sec: "00",
          };
          clearInterval(interval);
        }
        this.countDownList =
          obj.day + "天" + obj.hou + "时" + obj.min + "分" + obj.sec + "秒";
      }, 1000);
    },
    // 根据userid绑定权益
    async voteDetail() {
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/vote/optionDetail",
          qs.stringify({
            activityId: this.$route.query.activityId,
          })
        )
        .then((res) => {
          console.log(res);
          let result = res.data.result;
          this.budget = result.budget;
          this.consAmount = result.consAmount;
          this.endTime = result.endTime;
          this.nowTime = result.nowTime;
          this.plan = result.plan;
          this.prosAmount = result.prosAmount;
          this.summary = result.summary;
          this.target = result.target;
          this.title = result.title;
          this.name = result.name;
          this.createtime = this.timestampToTime2(result.createTime);
          if (result.prosAmount === 0 && result.consAmount === 0) {
            this.percentage = Number(50);
          } else if (result.consAmount === 0) {
            this.percentage = Number(0);
          } else {
            let fenzileft = Number(result.consAmount * 100);
            let fenziright = result.prosAmount + result.consAmount;

            let fenzi = fenzileft / fenziright;
            let fenmu =
              ((result.prosAmount + result.consAmount) * 100) /
              (result.prosAmount + result.consAmount);
            this.percentage = Number(fenzi / fenmu) * 100;
            // console.log(this.percentage);
          }
        });
    },
    reject() {
      this.voterejectnumber1 = true;
    },
    promise() {
      this.voterejectnumber2 = true;
    },
    timestampToTime2(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      if (D < 10) {
        D = "0" + D + "  ";
      } else {
        D = D + "  ";
      }
      var h = date.getHours();
      if (h < 10) {
        h = "0" + h + ":";
      } else {
        h = h + ":";
      }
      var m = date.getMinutes();
      if (m < 10) {
        m = "0" + m + ":";
      } else {
        m = m + ":";
      }

      var s = date.getSeconds();
      if (s < 10) {
        s = "0" + s;
      } else {
        s = s;
      }
      return Y + M + D + h + m + s;
    },
    goToVote() {
      this.$router.push({
        path: "/vote",
      });
    },
    fastoken() {
      this.$store.dispatch("fastokenShow");
    },
    iconShow() {
      this.iconshow = !this.iconshow;
      this.transform = !this.transform;
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
    index() {
      this.$router.push({
        path: "/",
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
#now_end {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 31px;
  opacity: 0.5;
  padding-top: 17px;
  font-style:normal;
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}
#voterejectnumber {
  width: 400px;
  height: 500px;
  background: #141414;
  position: fixed;
  border-radius: 10px;
  z-index: 99999;
  top: 25%;
  left: 40%;
  .quxiao {
    position: absolute;
    left: 336px;
    top: 34px;
  }
  .vote {
    position: absolute;
    left: 40px;
    top: 65px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
  }
  .line {
    width: 320px;
    height: 1px;
    background: #ffffff;
    opacity: 0.1;
    position: absolute;
    left: 40px;
    top: 113px;
  }
  input {
    width: 318px;
    height: 45px;
    background: #333333;
    border: 1px solid #666666;
    border-radius: 10px;
    position: absolute;
    left: 41px;
    top: 174px;
    padding-left: 21px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  .icon {
    position: absolute;
    left: 47px;
    top: 237px;
  }
  .title {
    width: 288px;
    height: 30px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 18px;
    position: absolute;
    left: 68px;
    top: 239px;
  }
  button {
    width: 320px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;

    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 24px;
    position: absolute;
    left: 40px;
    top: 395px;
  }
  button:hover {
    background: #009fcd !important;
  }
}
.el-progress-bar__outer {
  background: #1f91d3 !important;
}
.time {
  color: #ffffff !important;
}
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
// 主线
.vote_detail {
  width: 100%;
  height: auto;
  position: relative;
  .el-progress {
    padding-top: 10px !important;
  }
  .el-progress__text {
    display: none;
  }

  .el-progress-bar {
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
  }
  .proposal_detail_top {
    height: 500px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/detail/detailbg.png") no-repeat
      center/100% 100%;
    z-index: 1;
    .partnertop-content {
      width: 1200px;
      height: 350px;
      margin: 0 auto;
      text-align: right;
      .top_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #ffffff;
        position: relative;

        top: 90%;
        cursor: pointer;
        span {
          cursor: pointer;
        }
      }
    }
    // 头部内容区域
  }
  .proposal_detail_content {
    width: 100%;
    height: auto;
    background: #0c0c0c;
    .proposal_detail_contentdetail {
       white-space: pre-line;
      width: 1200px;
      height: auto;
      margin: 0 auto;
      padding-bottom: 100px;
      .vote_title {
        width: 100%;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 31px;
        text-align: center;
        padding-top: 81px;
      }
      .vote_name {
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 31px;
        opacity: 0.5;
        padding-top: 30px;
      }
      ul {
        li {
          margin-top: 40px;
          .vote_content_top {
            display: flex;
            flex-direction: row;
            align-items: center;
            div:nth-child(1) {
              width: 4px;
              height: 23px;
              background: #009fcd;
            }
            div:nth-child(2) {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
              padding-left: 15px;
            }
          }
          .vote_content_footer {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 31px;
            opacity: 0.5;
            padding-top: 17px;
          }
        }
      }
      .agreereject {
        width: 1200px;
        height: 198px;
        background: #333333;
        border-radius: 10px;
        margin-top: 60px;
        .vote_vote {
          padding-top: 53px;
        }
        .agreereject_detail {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 10px;
          div:nth-child(1) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #c03535;
            line-height: 22px;
            padding-left: 5%;
          }
          div:nth-child(2) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            line-height: 22px;
            padding-right: 5%;
          }
        }
        .buttonprorej {
          width: 90%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0 auto;
          margin-top: 8px;
          div:nth-child(1) {
            width: 125px;
            height: 40px;
            border: 2px solid #c03535;
            border-radius: 20px;
            padding-left: 5%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #c03535;
            cursor: pointer;
            img {
              position: relative;
              padding-top: 6px;
              left: -20px !important;
            }
            span {
              position: relative;
              top: -5px;
              left: -6px;
            }
          }
          div:nth-child(2) {
            width: 125px;
            height: 40px;
            border: 2px solid #009fcd;
            border-radius: 20px;
            padding-left: 5%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #009fcd;
            cursor: pointer;
            img {
              position: relative;
              padding-top: 6px;
              left: -20px !important;
            }
            span {
              position: relative;
              top: -5px;
              left: -6px;
            }
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
        line-height: 110px;
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
