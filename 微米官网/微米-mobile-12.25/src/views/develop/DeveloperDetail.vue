<template>
  <div class="developerdetail">
    <slider></slider>
    <registrationtask v-if="$store.state.registrationtask"></registrationtask>
    <div class="developer_detail_content">
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
      <div class="developer_detail_contents">
        <p class="title">{{ title }}</p>
        <div class="summary" v-html="describe"></div>
        <ul class="detail">
          <li class="detail_amount">
            <p>{{ $t("developerdetail[0]") }}</p>
            <p>
              <span> {{ amount }}</span
              ><span> UENC</span>
            </p>
          </li>
          <li class="detail_human">
            <p>
              <span> {{ $t("developerdetail[1]") }}:</span>
              <span>{{ joinCount }}</span>
            </p>
          </li>
          <li>
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
        </ul>

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
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { BASEURL } from "@api/api";
var qs = require("qs");

import registrationtask from "@components/common/RegistrationTask";
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
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
  components: { slider, vFooter, registrationtask },
  created() {
    this.$store.state.registrationtask = false;
    // console.log(this.$store.state.registrationtask);
    // console.log(localStorage.getItem("userId"));
    this.taskId = this.$route.query.taskId;
    localStorage.setItem("uenc-taskId", this.taskId);
  },

  mounted() {
    this.developerDetail();
  },
  destroyed() {},
  methods: {
    registrationTask() {
      if (!localStorage.getItem("token")) {
        window.sessionStorage.clear();
        localStorage.clear();

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
          res.data.result.rollList = [
            { amount: "100", name: "100" },
            { amount: "200", name: "200" },
            { amount: "300", name: "300" },
          { amount: "400", name: "400" },
          { amount: "500", name: "500" },
          { amount: "600", name: "600" },
          { amount: "700", name: "700" },
          { amount: "800", name: "800" },
          { amount: "900", name: "900" },
          { amount: "1000", name: "1000" },
          { amount: "1100", name: "1100" },
          { amount: "1200", name: "1200" },
          { amount: "1300", name: "1300" },
          { amount: "1400", name: "1400" },
          { amount: "1500", name: "1500" },
          { amount: "1600", name: "1600" },
          ];
          this.newsList = res.data.result.rollList;
          if (res.data.result.rollList.length > 0) {
            this.marqueetrueall = true;
            if (res.data.result.rollList.length >= 2) {
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

    fastoken() {
      this.$store.dispatch("fastokenShow");
    },

    leavelogin() {
      // 清除缓存
      this.$store.commit("leavelogin");
      this.iconshow = false;
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
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.overhide {
  width: 345px;
  height: 30px;
  line-height: 30px;
  background: rgba(44, 44, 44);
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 50px;
  ul {
    display: flex;
    flex-direction: row;
    height: 60px;
    li {
      font-size: 12px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: white;
      margin-left: 49px;
      span {
        color: rgba(0, 159, 205, 1);
      }
    }
  }
}
.registration_task {
  width: 152px;
  height: 40px;
  border: 1px solid #009fcd;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #009fcd;
  border-radius: 10px;
  font-size: 16px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 40px;

  color: #009fcd;
  margin-top: 30px;
  img{
    position: relative;
    top: 5px;
     right: 5px;
  }
}
.registration_task3 {
  width: 152px;
  height: 40px;
  border: 1px solid #009fcd;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #009fcd;
  border-radius: 10px;
  font-size: 16px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 40px;
  margin-top: 30px;
  color: #009fcd;
  img{
    position: relative;
    top: 5px;
     right: 5px;
  }
}
.registration_task2 {
  width: 152px;
  height: 40px;
  border: 1px solid #009fcd;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  border: 1px solid rgba(196, 53, 53, 1);
  border-radius: 10px;
  font-size: 16px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 40px;
  color: #c43535;
  margin-top: 30px;
  img{
    position: relative;
    top: 5px;
    right: 5px;
  }

}
// 主线
.developerdetail {
  width: 100%;
  height: auto;
  background: black;
  .developer_detail_content {
    width: 100%;
    height: auto;
    background: rgba(20, 20, 20);
    .developer_detail_contents {
      width: 345px;
      height: auto;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 50px;
      .title {
        width: 100%;
        font-size: 20px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: #ffffff;
        opacity: 1;
        word-wrap: break-word;
        word-break: normal;
      }
      .summary {
        padding: 15px;
        width: 345px;
        height: auto;
        min-height: 300px;
        background: #e5e5e5;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 40px;
        word-wrap: break-word;
        word-break: normal;
      }
      .detail {
        width: 345px;
        height: 188px;
        background: rgba(44, 44, 44);
        border-radius: 10px;

        margin-top: 34px !important;
        margin: 0 auto;
        li:nth-child(2) {
          margin-top: 10px;
        }
        li:nth-child(3) {
          margin-top: 10px;
        }
        li:nth-child(4) {
          margin-top: 10px;
        }
        .github_net {
          word-wrap: break-word;
          word-break: normal;
          font-size: 14px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 27px;
          color: #ffffff;
          opacity: 1;
        }
        li {
          font-size: 14px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 27px;
          color: #ffffff;
          padding-left: 20px;
          p {
            text-align: left;
            span:nth-child(1) {
            
            }
            span:nth-child(2) {
           
            }
          }
        }
        .detail_amount {
          width: 100%;
          height: 68px;
          background: #4d4d4d;
          border: 1px solid #009fcd;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
          border-radius: 5px;
          display: flex;
          flex-direction: row;
         
          align-items: center;
          p:nth-child(1) {
            font-size: 20px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 27px;
            color: #ffffff;
          }
          p:nth-child(2) {
            font-size: 20px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 27px;
            color: #009fcd;
            margin-left: 20px!important;
            span {
              margin-left: 0px !important;
            }
          }
        }
      }
    }
  }
}
</style>
