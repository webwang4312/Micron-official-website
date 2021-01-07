<template>
  <div class="developer">
    <slider></slider>
    <div class="developer_top">
      <div class="partnertop-content">
        <p>{{ $t("developer[0]") }}</p>
        <p>{{ $t("developer[1]") }}</p>
        <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
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
                style="width: 45px; height: 45px"
              />
              <div>{{ taskCount }}</div>
              <div>
                {{ $t("developer[3]") }}
              </div>
            </li>
            <li>
              <img
                src="@assets/images/developer/矢量智能对象(1).png"
                style="width: 45px; height: 45px"
              />
              <div>{{ completeCount }}</div>
              <div>
                {{ $t("developer[4]") }}
              </div>
            </li>
            <li>
              <img
                src="@assets/images/developer/矢量智能对象(2).png"
                style="width: 45px; height: 45px"
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
            style="width: 300px"
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
            :page-size="6"
            @on-change="developerChange"
            :cureent.sync="developernum"
            ref="pages"
            simple
          />
        </div>
      </div>
    </div>
    <div class="developer_reward">
      <div class="developer_reward-content">
        <p class="rewardp">{{ $t("developer[7]") }}</p>
        <div class="partner-line"></div>
        <div class="developer_reward-img">
          <div class="reward_right"></div>
          <div class="reward_left">
            <p>
              {{ $t("developer[8]") }}
            </p>
            <p>
              {{ $t("developer[9]") }}
            </p>
            <div>
              <button
                v-clipboard:copy="f"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                {{ $t("developer[10]") }}
              </button>
              <button @click="goTogithub">{{ $t("developer[11]") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
var qs = require("qs");
import { BASEURL } from "@api/api";
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
export default {
  name: "developer",
  inject: ["reload"],
  data() {
    return {
      f: "tech@uenc.net",
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
  components: { slider, vFooter },
  created() {
    this.nowLang = this.$i18n.locale;
    this.developernum =
      Number(localStorage.getItem("uenc-developerpage")) || Number(1);
    this.developerInfor();
    this.developerSum();
    this.$nextTick(() => {
      this.$refs.pages.currentPage =
        Number(localStorage.getItem("uenc-developerpage")) || Number(1);
    });
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 复制成功时的回调函数
    onCopy(e) {
      this.$message({
        message: "复制成功!",
        type: "success",
        center: true,
        duration: 2000,
      });
    },
    // 复制失败时的回调函数
    onError(e) {
      this.$message({
        message: "复制失败!",
        type: "error",
        center: true,
        duration: 2000,
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
      localStorage.setItem("uenc-developerpage", page);
      window.scrollTo(0, 550);
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
            if (res.data.result.list[i].outline.length >= 75) {
              res.data.result.list[i].outline =
                res.data.result.list[i].outline.substring(0, 75) + "...";
            } else {
              res.data.result.list[i].outline = res.data.result.list[i].outline;
            }
            if (res.data.result.list[i].title.length >= 11) {
              res.data.result.list[i].title =
                res.data.result.list[i].title.substring(0, 11) + "...";
            } else {
              res.data.result.list[i].title = res.data.result.list[i].title;
            }
          }
          this.developerlist = res.data.result.list;
        });
    },
    // CopyUrl(data) {
    //   var Url2 = "tech@uenc.net";
    //   var oInput = document.createElement("input");
    //   oInput.value = Url2;
    //   document.body.appendChild(oInput);
    //   oInput.select(); // 选择对象
    //   document.execCommand("Copy"); // 执行浏览器复制命令
    //   oInput.className = "oInput";
    //   oInput.style.display = "none";
    //   this.$message({
    //     message: "复制成功!",
    //     type: "success",
    //   });
    // },
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
  },
};
</script>
<style lang="less">
.ivu-page-next:hover a,
.ivu-page-prev:hover a {
  color: white !important;
}
.ivu-page-simple {
  .ivu-page-next {
    background: none !important;
    background-color: none !important;
    border: none;
  }
}
.ivu-page-simple-pager {
  input {
    border: none !important;
    outline: none !important;
    color: aliceblue !important;
    background: none !important;
  }
}

.ivu-page-prev {
  border: none;
  background: none !important;
  background-color: none !important;
}
.ivu-page-item {
  background: none;
  border: none;
}
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.developer {
  width: 100%;
  height: auto;
  background-color: black;
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
    height: 244px;
    position: relative;
    margin: 0 auto;
    background: url("../../assets/images/developer/developer.png") no-repeat
      center/100% 100%;

    // 头部内容区域
    .partnertop-content {
      width: 100%;
      height: 244px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      // 大方块设置

      p:first-child {
        // width: 193px;
        font-size: 18px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: #ffffff;
        opacity: 1;
        position: absolute;
        left: 179px;
        top: 87px;

        word-wrap: break-word;
        word-break: normal;
      }
      p:nth-child(2) {
        width: 151px;

        font-size: 12px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 18px;
        color: #ffffff;
        opacity: 1;
        position: absolute;
        left: 179px;
        top: 139px;
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
    height: 327px;
    position: relative;
    background-color: #0c0c0c;
    .partnerfooter-content {
      width: 100%;
      height: auto;
      margin: 0 auto;
      text-align: center;
      p {
        height: 37px;
        font-size: 26px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: #ffffff;
        position: relative;
        top: 50px;
      }
      .partner-line {
        width: 60px;
        height: 2px;
        margin: 0 auto;
        background: #009fcd;
        position: relative;
        top: 57px;
      }
      .developer_total-img {
        width: 92%;
        height: 140px;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        position: relative;
        top: 100px;
        margin: 0 auto;
        ul {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          li {
            width: 115px;
            display: flex;
            flex-direction: column;
            text-align: center;
            position: relative;
            align-items: center;
            top: 18px;
            overflow: hidden;
            img {
              width: 45px;
              height: 45px;
            }
            div:nth-of-type(1) {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 600;
              color: #009fcd;
            }
            div:nth-of-type(2) {
              font-size: 10px;
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
    padding-bottom: 94px;
    .developer_task-content {
      width: 100%;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .blocksdevelop {
        position: relative;
        top: 40px;
        width: 100%;
        height: 30px;
        z-index: 20;
        margin: 0 auto;
        text-align: center;
        .van-pagination {
          margin-top: 30px;
        }
        .van-pagination__item {
          background: none;
          color: white;
        }
        .van-pagination__item--active {
          background: #009fcd;
          border-radius: 5px;
        }
        [class*="van-hairline"]::after {
          border: none;
        }
        button {
          background-color: none !important;
          background: none !important;
        }
        .el-pager {
          .number {
            font-size: 13px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 25px;
            color: #ffffff !important;
            opacity: 1;
          }
          li {
            background: none !important;
            min-width: 20px;
          }
          .active {
            background: #009fcd !important;
            opacity: 1;
            border-radius: 5px !important;
          }
          .btn-prev {
            background-color: none !important;
          }
        }
      }
      p {
        font-size: 26px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: #ffffff;
        text-align: center;
        margin-top: 50px;
      }
      .developer_task-line {
        width: 60px;
        height: 2px;
        background: #009fcd;
        position: relative;
        top: 10px;

        margin: 0 auto;
        margin-bottom: 40px;
      }
      .zhanwei {
        width: 100%;
        text-align: center;
        height: 300px;
        p {
          width: 100%;
          text-align: center;
          font-size: 20px;
        }
      }
      .developer_task-img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin-top: 0px;

        margin: 0 auto;
        li {
          width: 345px;
          height: 183px;
          background: rgba(44, 44, 44);
          border-radius: 10px;
          margin-top: 15px;
          margin: 0 auto;
          margin-top: 15px;
          .developer_task_header {
            width: 100%;
            margin: 0 auto;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 20px;
            span:nth-child(1) {
              font-size: 18px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 25px;
              color: #ffffff;
              opacity: 1;
              color: #ffffff;
            }
            span:nth-child(2) {
              font-size: 16px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 16px;
              color: #009fcd;
              opacity: 1;
              color: #009fcd;
              line-height: 17px;
            }
          }
          .developer_task_content {
            width: 315px;
            height: 53px;
            border-radius: 5px;
            margin: 0 auto;

            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 18px;
            color: #ffffff;
            opacity: 0.7;
            margin-top: 15px;
          }
          .align {
            width: 315px;
            margin: 0 auto;
            text-align: right;
            margin-top: 20px;
            button {
              width: 84px;
              height: 30px;
              border: 1px solid #009fcd;

              color: #009fcd;
              border-radius: 15px;

              font-size: 11px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 18px;
              color: #009fcd;
            }
          }
        }
      }
    }
  }
  .developer_reward {
    width: 100%;
    height: auto;
    position: relative;
    background: rgb(12, 12, 12);
    .developer_reward-content {
      width: 100%;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .rewardp {
        font-size: 26px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: #ffffff;
        text-align: center;
        margin-top: 50px;
      }
      .partner-line {
        width: 60px;
        height: 2px;

        background: rgba(0, 159, 205, 1);
        position: relative;
        top: 20px;

        margin: 0 auto;
      }
      .developer_reward-img {
        width: 100%;
        height: auto;

        border-radius: 10px;
        margin-top: 40px;

        .reward_left {
          width: 100%;
          margin-top: 30px;

          div {
            width: 328px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          p {
            width: 329px;
            font-size: 12px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 24px;
            color: #ffffff;
            opacity: 0.7;
            margin: 0 auto;
          }
          button {
            margin-top: 30px;
            width: 146px;
            height: 40px;
            border: 1px solid #009fcd;

            border-radius: 20px;

            font-size: 16px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 18px;
            color: #009fcd;
            margin-bottom: 50px;
            background: black;
            margin-left: 0px !important;
          }
          button:nth-of-type(2) {
          }
        }
        .reward_right {
          margin: 0 auto;
          width: 100%;
          height: 249px;
          background: url("../../assets/images/developer/矢量智能对象(3).png")
            no-repeat center/100% 100%;
        }
      }
    }
  }
}
</style>
