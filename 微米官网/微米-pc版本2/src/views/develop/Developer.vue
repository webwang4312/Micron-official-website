<template>
  <div class="developer">
 
    <div class="developer_top">
      <div class="partnertop-content">
        <p class="content1">Capture your leads</p>
        <p class="content2">
          This is a lead capture oriented landing page template, hence oriented
          landing page the name.
        </p>
        <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
      </div>
    </div>
    <div class="developer_total">
      <div class="partnerfooter-content">
        <p>{{ $t("developer[2]") }}</p>
        <div class="partner-line">
          UENC has developed dpow consensus algorithm to meet the technical
          needs of the future economic development of Tongzheng.
        </div>
        <div class="developer_total-img">
          <ul>
            <li>
              <div>
                <img src="@assets/images/wmDeveloper/Frame.png" />
                <span> {{ $t("developer[3]") }}</span>
              </div>

              <div>
                {{ taskCount }}
              </div>
            </li>
            <li>
              <div>
                <img src="@assets/images/wmDeveloper/Frame (1).png" />
                <span> {{ $t("developer[4]") }}</span>
              </div>

              <div>
                {{ completeCount }}
              </div>
            </li>
            <li>
              <div>
                <img src="@assets/images/wmDeveloper/Frame (2).png" />
                <span> {{ $t("developer[5]") }}</span>
              </div>

              <div>
                {{ grantCount }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="developer_task">
      <div class="developer_task-content">
        <p>{{ $t("developer[6]") }}</p>

        <div class="zhanwei" v-if="zhanwei">
          <img
            src="@assets/images/proposal/矢量智能对象.png"
            style="width:400px"
          />
          <p>{{ $t("zhanwei[0]") }}</p>
        </div>

        <ul class="developer_task-img" v-else>
          <li
            v-for="item in developerlist"
            :key="item"
            @click="goToDeveloperDetail(item.taskId)"
          >
            <div class="developer_task_header">
              {{ item.title }}
            </div>
            <div class="developer_task_content">
              {{ item.outline }}
            </div>
            <div class="developer_task_footer">
              <span> {{ $t("meidaannouncement[1]") }}:</span>
              {{ item.amount }}UENC
            </div>
            <!-- <div class="align">
              <button @click="goToDeveloperDetail(item.taskId)">
                {{ $t("developerdetail[8]") }}
              </button>
            </div> -->
          </li>
        </ul>
        <div class="blocksdevelop" v-if="!zhanwei">
          <!-- <Page
            :total="developerTotal"
            :page-size="6"
            @on-change="developerChange"
            v-if="developerTotal != 0"
            ref="pagination"
          /> -->

          <el-pagination
            layout="prev, pager, next"
            :page-size="6"
            background
            @current-change="developerChange"
            :total="developerTotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="developer_reward">
      <div class="developer_reward-content">
        <p class="rewardp">{{ $t("developer[7]") }}</p>
        <!-- <div class="partner-line"></div> -->
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
            <img src="@assets/images/wmDeveloper/Frame (3).png" />
          </div>
        </div>
      </div>
    </div>
    <div class="developer_vote">
      <div class="developer_votecontent">
        <p class="top">
          {{ $t("meidaannouncement[2]") }}
        </p>
        <p class="center">
          Please fill in the form on the right and we will give you feedback in
          time.
        </p>
        <div class="bottom" @click="goToVote">
          {{ $t("meidaannouncement[3]") }}
        </div>
      </div>
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
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.developernum = 1;
    this.developerInfor();
    this.developerSum();
  },
  computed: {},
  mounted() {},
  methods: {
    goToVote() {
      this.$router.push({
        path: "/vote",
      });
    },
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
            pageSize: 6,
          })
        )
        .then((res) => {
          //console.log(res);

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

    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },

    // 选择语言
  },
};
</script>
<style lang="less">
svg{
font-size: 62.5%;
line-height: 1.15;
-webkit-text-size-adjust: 100%;
-webkit-font-smoothing: antialiased;
-webkit-box-direction: normal;
color: #1d1d1d;
font-family: "Montserrat", sans-serif;
text-align: center;
box-sizing: inherit;
width: 20.9rem !important;
height: 23.4rem !important;
transform: translate3d(0px, 0px, 0px);

}

.btn-prev,
.btn-next {
  width: 23px !important;
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
  z-index: 1;
  .developer_top {
    height: 800px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/wmDeveloper/banner 2.png") no-repeat
      center/100% 100%;

    // 头部内容区域
    .partnertop-content {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      position: relative;
      .content1 {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 70px;
        line-height: 82px;
        position: absolute;
        top: 279px;
        right: 0px;
        color: #18191f;
        background: #009fcd;
      }
      .content2 {
        position: absolute;
        background: red;
        bottom: 300px;
        right: 0px;
        width: 560px;
        height: 108px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 36px;
        text-align: right;
        color: #18191f;
        opacity: 0.75;
      }
    }
  }
  .developer_total {
    width: 100%;
    height: 604px;
    position: relative;
    background: #e5e5e5;
    .partnerfooter-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      p {
        width: 1200px;
        height: 64px;
        left: 0px;
        top: 0px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
        position: relative;
        top: 100px;
        background: red;
      }
      .partner-line {
        width: 668px;
        height: 64px;
        left: 0px;
        top: 72px;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
        margin: 108px auto 0px;
      }
      .developer_total-img {
        width: 1200px;
        height: auto;
        position: relative;
        top: 60px;
        ul {
          width: 100%;
          display: flex;
          flex-direction: row;
          li:nth-child(1) {
            margin-left: 0px;
          }
          li {
            display: flex;
            flex-direction: column;
            margin-left: 30px;
            width: 380px;
            height: 208px;
            background: #f5f5f5;
            border-radius: 10px;
            div:nth-of-type(1) {
              display: flex;
              flex-direction: row;
              img {
                margin: 30px 20px 0 40px;
              }
              span {
                font-family: PingFang SC;
                font-style: normal;
                font-weight: bold;
                font-size: 22px;
                line-height: 36px;
                color: #000000;
                margin-top: 32px;
              }
            }
            div:nth-of-type(2) {
              font-family: PingFang SC;
              font-style: normal;
              font-weight: bold;
              font-size: 64px;
              line-height: 90px;
              color: #30b3f5;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .developer_task {
    width: 100%;
    height: auto;
    background: #b1e5ff;
    padding-bottom: 100px;
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
        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        font-feature-settings: "liga" off;
        color: #18191f;
        text-align: center;
        margin-top: 100px;
        margin-bottom: 60px;
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
          cursor: pointer;
          width: 380px;
          height: 226px;

          background: #ffffff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04),
            0px 0px 1px rgba(0, 0, 0, 0.04);
          border-radius: 10px;
          margin-top: 30px;
          margin-left: 30px;
          .developer_task_header {
            width: 80%;
            margin: 0 auto;
            margin-top: 30px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 39px;

            color: #000000;
            // padding-left: 40px;
            // padding-right: 40px;
          }
          .developer_task_content {
            width: 303px;
            height: 64px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            /* or 150% */

            color: #000000;
            margin: 0 auto;
            margin-top: 20px !important;
          }
          .developer_task_footer {
            span {
            }
            width: 303px;
            height: 64px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 25px;

            /* #30B3F5 */

            color: #30b3f5;
            margin: 0 auto;
            margin-top: 10px !important;
          }
          // .align {
          //   text-align: center;
          //   button {
          //     margin-top: 30px !important;
          //     width: 307px;
          //     height: 40px;
          //     border: 1px solid #009fcd;
          //     border-radius: 8px;
          //     background: none;
          //     margin: 0 auto;
          //     text-align: center;
          //     font-size: 16px;
          //     font-family: PingFang SC;
          //     font-weight: 400;
          //     color: #009fcd;
          //     line-height: 40px;
          //     cursor: pointer;
          //   }
          //   button:hover {
          //     background: #009fcd;
          //     color: white;
          //   }
          // }
        }
      }
    }
  }
  .developer_reward {
    width: 100%;
    height: 617px;
    position: relative;
    background: white;
    .developer_reward-content {
      width: 1200px;
      height: 617px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .rewardp {
        width: 571px;
        height: 33px;

        position: relative;
        top: 80px;

        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 37px;
        /* identical to box height, or 132% */

        /* #18191F */

        color: #18191f;
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
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 27px;
            /* or 169% */

            letter-spacing: 0.01em;

            /* #18191F */

            color: #18191f;
          }
          button {
            width: 176px;
            height: 45px;
            border: 1px solid #009fcd;
            border-radius: 10px;

            margin-top: 60px;
            background: white;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            color: #30b3f5;
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
          top: -5px;
          img {
          }
        }
      }
    }
  }
  .developer_vote {
    width: 100%;
    height: 450px;
    background: url("../../assets/images/wmDeveloper/18963134-[转换] 1.png")
      no-repeat center/100% 100%;
    .developer_votecontent {
      width: 1200px;
      height: 100%;
      margin: 0 auto;

      .top {
        width: 100%;
        height: 64px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
        position: relative;
        top: 100px;
      }
      .center {
        width: 464px;
        height: 64px;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
        margin: 0 auto;
        position: relative;
        top: 108px;
      }
      .bottom {
        position: relative;
        top: 184px;
        height: 62px;
        width: 201px;
        background: #30b3f5;
        border-radius: 8px;
        font-family: Manrope;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 62px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #ffffff;
        margin: 0 auto;
        cursor: pointer;
      }
    }
  }
}
</style>
