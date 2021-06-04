<template>
  <div class="toproposal">
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
    <login v-if="$store.state.showlogin" ref="login"></login>
    <forget v-if="$store.state.forget"></forget>
    <fastoken v-if="$store.state.fastoken"></fastoken>

    <div class="partnertop">
      <headerthird></headerthird>
      <div class="partnertop-content">
        <span class="top_title"
          >当前位置:
          <span @click="goToVote">关于社区></span>
          <span @click="goToVote">提案></span>
          <span>发布提案</span>
        </span>
      </div>
    </div>
    <div class="partnerfooter">
      <div class="partnerfooter-content">
        <table>
          <tr>
            <td>
              <label for=""> 姓名</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="请输入您的名字"
                v-model="name"
                class="button"
                @blur="nameblur"
              />
            </td>
          </tr>
          <!-- <tr>
            <td>
              <label for=""> 账号</label>
            </td>
            <td>
              <input type="text" placeholder="输入账号" v-model="userId" />
            </td>
          </tr> -->
          <tr>
            <td>
              <label for=""> 标题</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="输入标题"
                v-model="title"
                class="button"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for=""> 摘要</label>
            </td>
            <td>
              <textarea
                rows="10"
                cols="30"
                placeholder="输入背景摘要"
                v-model="summary"
                class="button"
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>
              <label for=""> 目标</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="输入目标"
                v-model="target"
                class="button"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for=""> 计划</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="输入计划"
                v-model="plan"
                class="button"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for=""> 预算</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="输入预算"
                v-model="budget"
                class="button"
              />
            </td>
          </tr>
        </table>

        <button class="confirm" @click="confirm" v-preventClick>
          确认发布
        </button>
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
import {BASEURL} from '@api/api';
var qs = require("qs");
import Login from "@components/common/Login";
import Forget from "@components/common/ForgetPassword";
import Fastoken from "@components/common/Fastoken";
import headerthird from "@components/common/headerthird";
export default {
  name: "partner",
    inject: ["reload"],
  data() {
    return {
      name: "",
      userId: "",
      title: "",
      summary: "",
      target: "",
      plan: "",
      budget: "",
      nowLang: "",
      fullscreenLoading: false,
      show: false,
      iconshow: false,
      transform: false,
      login: true,
      activeName: "first",
    
    };
  },
  components: { Login, Forget, Fastoken, headerthird },
  created() {
    // if (!localStorage.getItem("token")) {
    //   this.$message.error("请先去登录或注册");
    //   setTimeout(() => {
    //     this.$router.push({ path: "/proposal" });
    //   }, 3000);
    // }
  },
  computed: {},
  beforeUpdated() {
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
  },
  beforeDestroy() {
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
    // 滚动设置
    // window.addEventListener("scroll", this.getScroll);
  },
  mounted() {},
  methods: {
    nameblur() {
      if (this.name.length > 20) {
        this.name = "";
          this.$message.error('名字长度20字符以内');
      }
    },
    goToVote() {
      this.$router.push({
        path: "/proposal",
      });
    },
     confirm() {
      // console.log("11");
      if (
        this.name == "" ||
        this.title == "" ||
        this.summary == "" ||
        this.target == "" ||
        this.plan == "" ||
        this.budget == ""
      ) {
        this.$message.error("请填写完整信息");
      
      } else {
       
        this.$http
          .post(
            `${BASEURL}`+"/weimioffice/vote/addMotion",
            qs.stringify({
              name: this.name,
              userId: localStorage.getItem("userId"),
              title: this.title,
              summary: this.summary,
              target: this.target,
              plan: this.plan,
              budget: this.budget,
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.result);
              this.name = "";
              this.title = "";
              this.summary = "";
              this.target = "";
              this.plan = "";
              this.budget = "";
               this.reload();
            } else {
              this.$message.error(res.data.result);
            }
          });
      }
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
    // 选择语言
  },
};
</script>
<style lang="less">
.button:hover {
  border: 1px solid#009FCD !important;
}
.confirm {
  width: 318px;
  height: 45px;
  background: #009fcd;
  border-radius: 10px;
  margin: 0 auto;
  position: relative;
  left: 40%;
  margin-top: 50px;
}
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}

// 主线
.toproposal {
  width: 100%;
  height: auto;
  position: relative;
  .proposaltop {
    height: 150px;
    background: black;
    z-index: 999;
    .proposalzong {
      width: 1200px;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      position: relative;
      height: 100%;
      margin: 0 auto;
      button {
        height: 100%;
        align-content: center;
        align-items: center;
      }
    }
    .header-left {
      img {
        width: 147.7px;
        height: 58.7px;
      }
    }
    .loginregister {
      position: absolute;
      left: 1000px;
    }
    .header_selsetz {
      width: 100px;
      height: 180px;

      position: absolute;
      left: 1000px;
      margin-top: 90px;
      z-index: 999;
      cursor: pointer;
    }
    .header_ulul {
      width: 100px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      font-size: 18px !important;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      z-index: 999;
      position: absolute;
      left: 1000px;
      top: 100px;
      cursor: pointer;
      ul {
        li {
          margin-top: 20px;
          text-align: center;
        }
        margin-top: -100px;
      }
    }
    .selbutton {
      position: absolute;
      left: 850px;
      top: 70px;
    }
  }
  .partnertop {
    height: 500px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/proposal/bg.png") no-repeat center/100%
      100%;
    z-index: 1;
    // 头部内容区域
    .partnertop-content {
      width: 1200px;

      margin: 0 auto;
      .top_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #ffffff;
        position: relative;
        left: 80%;
        top: 320px;
        cursor: pointer;
      }
      .partner-button-overflow {
        width: 600px;
        height: 263px;
        border-radius: 10px;
        position: relative;
        top: -115px;
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
    }
  }
  .partnerfooter {
    width: 100%;
    height: auto;
    position: relative;
    background-color: #0c0c0c;
    padding-top: 87px;
    .partnerfooter-content {
      width: 1200px;
      height: 850px;
      margin: 0 auto;
      color: white;
      table {
        tr {
          td {
            label {
              position: relative;
              top: 10px;
            }
            input {
              margin-top: 20px;
              margin-left: 15px;
              padding-left: 15px;
            }
          }
        }
        input {
          width: 536px;
          height: 45px;
          background: #333333;
          border: 1px solid #666666;
          border-radius: 10px;
        }
        input::-webkit-input-placeholder {
          position: relative;
        }
        textarea {
          width: 1119px;
          height: 200px;
          background: #333333;
          border: 1px solid #666666;
          border-radius: 10px;
          margin-top: 20px;
          resize: none;
          margin-left: 15px;
          padding-left: 15px;
          line-height: 30px;
        }
      }
    }
  }
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
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
      justify-content: space-between;
      display: flex;
      flex-direction: row;
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
</style>
