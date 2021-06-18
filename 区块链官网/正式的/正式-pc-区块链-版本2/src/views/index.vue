<template>
  <div class="index">
    <headertop></headertop>
    <div class="index_top">
      <div class="title">
        UENC EXPLORER
      </div>
      <Search></Search>
    </div>
    <div class="info">
      <div class="info_top">
        <ul>
          <div class="block_height"></div>
          <div>
            <div class="center_top">
              {{ blockheigth }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[0] }}
            </div>
          </div>
          <!-- <div class="line_right"></div> -->
        </ul>
        <ul>
          <div class="transaction24"></div>
          <div>
            <div class="center_top">
              {{ transzoom }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[1] }}
            </div>
          </div>
          <!-- <div class="line_right"></div> -->
        </ul>
        <ul class="last">
          <div class="award"></div>
          <div>
            <div class="center_top">
              {{ blockreward }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[2] }}
            </div>
          </div>
          <!-- <div class="line_right2"></div> -->
        </ul>
      </div>
      <div class="info_line"></div>
      <div class="info_top info_bottom">
        <ul>
          <div class="alljiedian"></div>
          <div>
            <div class="center_top">
              {{ jiediancount }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[3] }}
            </div>
          </div>
          <!-- <div class="line_right"></div> -->
        </ul>
        <ul>
          <div class="alltransaction"></div>
          <div>
            <div class="center_top">
              {{ transnumber }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[4] }}
            </div>
          </div>
          <!-- <div class="line_right"></div> -->
        </ul>
        <ul class="last">
          <div class="last_award"></div>
          <div>
            <div class="center_top">
              {{ blocklastreward }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[5] }}
            </div>
          </div>
          <!-- <div class="line_right2"></div> -->
        </ul>
      </div>
    </div>
    <chart></chart>
    <index-list
      :tableData="tableData"
      :tableData2="tableData2"
      :nowTime="nowTime"
    ></index-list>
    <v-footer></v-footer>
  </div>
</template>
<script>
import { GETINDEX } from "@server/api.js";
import headertop from "@components/common/HeaderTop";
import VFooter from "@components/common/Footer.vue";
import Search from "@components/common/Search.vue";
import Chart from "./index/chart";
import indexList from "./index/indexList";
export default {
  name: "index",
  inject: ["reload"],
  data() {
    return {
      timer: null, //定时器名称
      // 固定设置
      nowLang: "",
      // 区块高度
      blockheigth: "",
      // 24小时交易笔数
      transzoom: "",
      //  交易笔数
      transnumber: "",
      // 区块奖励
      blockreward: "",
      // 剩余区块奖励
      blocklastreward: "",
      echartsed: [],
      // 本页面
      tableData: [],
      tableData2: [],
      tabledataall: "",
      jiediancount: "",
      nowTime: "",
    };
  },
  watch: {},
  components: { headertop, Search, VFooter, Chart, indexList },
  created() {
    this.nowLang = this.$i18n.locale;

    // window.setInterval(() => {
    //   setTimeout(this.indexlists(), 1000);
    // }, 60000);
    //  window.setInterval(() => {
    //   setTimeout(this.jiedian(), 0);
    // }, 3000);
    //  this.indexlists();
    // this.jiedian();
  },
  beforeDestroy() {
    clearInterval(this.indexlists);
  },
  mounted() {
    this.indexlists();
    setInterval(this.indexlists, 20000);
  },
  methods: {
    qianwei(str) {
      str = str.toString();
      var re = /(?=(?!(\b))(\d{3})+$)/g;
      return (str = str.replace(re, ","));
    },
    async indexlists() {
      const res = await GETINDEX();
      // console.log(res);
      var data = res.result;
      // 最新交易数据
      this.tableData = data.latestTranstion;
      // 最新出块数据
      this.tableData2 = data.latestBlock;
      // console.log(this.tableData.length);
      // 时间戳的处理
      this.nowTime = parseInt(data.linuxTime / 1000);
      if (this.nowLang == "cn") {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].amount = Number(this.tableData[i].amount).toFixed(
            2
          );
          this.tableData[i].txhash2 = this.tableData[i].txhash;
          this.tableData[i].txhash =
            this.tableData[i].txhash.substring(0, 10) + "...";

          let date = [];
          let strdate = parseInt(this.tableData[i].tradeTime / 1000);
          // console.log(strdate + "shuju");
          // 当前日期转时间戳
          // console.log(Date.parse(new Date()));
          let timestamp = this.nowTime;
          // console.log(timestamp + "xianzai");
          let s = timestamp - strdate; //9.20
          // console.log(s+'相差');
          // console.log(s/86400000 + "天数");
          // console.log(parseInt(s/86400000*24*60) + "fenzhong");
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          // console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              date.push("刚刚");
            } else {
              date.push(parseInt(fenzhong) + "分钟前");
            }
            this.tableData[i].date = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "小时前");
            this.tableData[i].date = date;
          }
          if (fenzhong > 1440) {
            date.push(parseInt(fenzhong / 1440) + "天前");
            this.tableData[i].date = date;
          }
          // console.log(this.tableData[i].date);
          this.tableData[i].fromAddress =
            this.tableData[i].fromAddress.substring(0, 8) + "...";
          this.tableData[i].fromAddress2 = this.tableData[i].fromAddress;
          this.tableData[i].toAddress =
            this.tableData[i].toAddress.substring(0, 8) + "...";
          this.tableData[i].toAddress2 = this.tableData[i].toAddress;

          // if (
          //   this.tableData[i].toAddress == "0000000000000000000000000000000000"
          // ) {
          //   if (this.nowLang == "cn") {
          //     this.tableData[i].toAddress = "质押";
          //   }
          //   if (this.nowLang == "en") {
          //     this.tableData[i].toAddress = "Pledge";
          //   }
          // } else {
          //   this.tableData[i].toAddress =
          //     this.tableData[i].toAddress.substring(0, 8) + "...";
          // }
        }
        //console.log(this.tableData2.length);
        for (var j = 0; j < this.tableData2.length; j++) {
          this.tableData2[j].blockAward = Number(
            this.tableData2[j].blockAward
          ).toFixed(2);
          let times = [];
          let strtime = parseInt(this.tableData2[j].tradeTime / 1000);
          // 当前日期转时间戳
          let timestamp = this.nowTime;
          // console.log(timestamp + "xianzai");
          let s = timestamp - strtime; //9.20
          // console.log(s+'相差');
          // console.log(s/86400000 + "天数");
          // console.log(parseInt(s/86400000*24*60) + "fenzhong");
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          //  console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              times.push("刚刚");
            } else {
              times.push(parseInt(fenzhong) + "分钟前");
            }
            this.tableData2[j].time = times;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            times.push(parseInt(fenzhong / 60) + "小时前");
            this.tableData2[j].time = times;
          }
          if (fenzhong > 1440) {
            times.push(parseInt(fenzhong / 1440) + "天前");
            this.tableData2[j].time = times;
          }
          // console.log(times);
          // console.log(strtime);
          // times.push(this.timestampToTime(Number(strtime)));
          // console.log(times);
        }
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].amount = Number(this.tableData[i].amount).toFixed(
            2
          );

          let date = [];
          let strdate = parseInt(this.tableData[i].tradeTime / 1000);
          // console.log(strdate + "shuju");
          // 当前日期转时间戳
          let timestamp = this.nowTime;
          // console.log(timestamp + "xianzai");
          let s = timestamp - strdate; //9.20
          // console.log(s+'相差');
          // console.log(s/86400000 + "天数");
          // console.log(parseInt(s/86400000*24*60) + "fenzhong");
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          //  console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              date.push("just");
            } else {
              date.push(parseInt(fenzhong) + "minutes ago");
            }
            this.tableData[i].date = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "hour ago");
            this.tableData[i].date = date;
          }
          if (fenzhong > 1440) {
            date.push(parseInt(fenzhong / 1440) + "days ago");
            this.tableData[i].date = date;
          }
          // console.log(this.tableData[i].date);
          this.tableData[i].txhash2 = this.tableData[i].txhash;
          this.tableData[i].txhash =
            this.tableData[i].txhash.substring(0, 10) + "...";
          this.tableData[i].fromAddress2 = this.tableData[i].fromAddress;
          this.tableData[i].fromAddress =
            this.tableData[i].fromAddress.substring(0, 8) + "...";
          this.tableData[i].toAddress =
            this.tableData[i].toAddress.substring(0, 8) + "...";

          this.tableData[i].toAddress2 = this.tableData[i].toAddress;
        }
        //console.log(this.tableData2.length);
        for (var j = 0; j < this.tableData2.length; j++) {
          this.tableData2[j].blockAward = Number(
            this.tableData2[j].blockAward
          ).toFixed(2);
          let times = [];
          let strtime = parseInt(this.tableData2[j].tradeTime / 1000);
          // 当前日期转时间戳
          let timestamp = this.nowTime;
          // console.log(timestamp + "xianzai");
          let s = timestamp - strtime; //9.20
          // console.log(s+'相差');
          // console.log(s/86400000 + "天数");
          // console.log(parseInt(s/86400000*24*60) + "fenzhong");
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          //  console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              times.push("just");
            } else {
              times.push(parseInt(fenzhong) + "minutes ago");
            }
            this.tableData2[j].time = times;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            times.push(parseInt(fenzhong / 60) + "hour ago");
            this.tableData2[j].time = times;
          }
          if (fenzhong > 1440) {
            times.push(parseInt(fenzhong / 1440) + "days ago");
            this.tableData2[j].time = times;
          }
          // console.log(times);
          // console.log(strtime);
          // times.push(this.timestampToTime(Number(strtime)));
          // console.log(times);
        }
      }
      // 节点数
      this.jiediancount = this.qianwei(data.nodeNums);
      //console.log(this.tableData);
      //区块高度
      this.blockheigth = this.qianwei(data.height);
      // 区块奖励
      this.blockreward = this.qianwei(Math.trunc(data.blockAward));
      // 剩余区块奖励
      this.blocklastreward = this.qianwei(Math.trunc(data.remainAward));
      //  交易笔数
      this.transnumber = this.qianwei(data.tradeNums);

      //24小时交易笔数?
      this.transzoom = this.qianwei(data.lastDayTradeNums);
    },
    timestampToTime2(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
  },
};
</script>
<style lang="less">
// canvas {
//   width: 626px !important;
//   height: 322px !important;
// }
@keyframes d-pro1 {
  0% {
    background: url("../assets/images/second/区块高度.gif") no-repeat
      center/100% 100%;
  }
  50% {
    background: url("../assets/images/second/区块高度.gif") no-repeat
      center/100% 100%;
  }
  100% {
    background: url("../assets/images/second/区块高度.gif") no-repeat
      center/100% 100%;
  }
}
@keyframes d-pro2 {
  0% {
    background: url("../assets/images/second/24H交易数.gif") no-repeat
      center/100% 100%;
  }
  50% {
    background: url("../assets/images/second/24H交易数.gif") no-repeat
      center/100% 100%;
  }
  100% {
    background: url("../assets/images/second/24H交易数.gif") no-repeat
      center/100% 100%;
  }
}
@keyframes d-pro3 {
  0% {
    background: url("../assets/images/second/已发放奖励.gif") no-repeat
      center/100% 100%;
  }
  50% {
    background: url("../assets/images/second/已发放奖励.gif") no-repeat
      center/100% 100%;
  }
  100% {
    background: url("../assets/images/second/已发放奖励.gif") no-repeat
      center/100% 100%;
  }
}
@keyframes d-pro4 {
  0% {
    background: url("../assets/images/second/节点总数.gif") no-repeat
      center/100% 100%;
  }
  50% {
    background: url("../assets/images/second/节点总数.gif") no-repeat
      center/100% 100%;
  }
  100% {
    background: url("../assets/images/second/节点总数.gif") no-repeat
      center/100% 100%;
  }
}
@keyframes d-pro5 {
  0% {
    background: url("../assets/images/second/累计交易数.gif") no-repeat
      center/100% 100%;
  }
  50% {
    background: url("../assets/images/second/累计交易数.gif") no-repeat
      center/100% 100%;
  }
  100% {
    background: url("../assets/images/second/累计交易数.gif") no-repeat
      center/100% 100%;
  }
}
@keyframes d-pro6 {
  0% {
    background: url("../assets/images/second/剩余区块奖励.gif") no-repeat
      center/100% 100%;
  }
  50% {
    background: url("../assets/images/second/剩余区块奖励.gif") no-repeat
      center/100% 100%;
  }
  100% {
    background: url("../assets/images/second/剩余区块奖励.gif") no-repeat
      center/100% 100%;
  }
}
.el-icon-arrow-right {
}
.more {
  cursor: pointer;
}

.index {
  height: auto;
}
.index_top {
  width: 100%;
  height: 351px;
  background: url("../assets/images/second/背景.png") no-repeat center/100% 100%;
  z-index: 1;
  padding-top: 75px;
  .title {
    width: 100%;
    text-align: center;
    font-size: 56px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: normal;
    line-height: 80px;
    color: rgba(255, 255, 255, 0.9);
    opacity: 1;
    padding-top: 43px;
    margin-bottom: 26px;
    letter-spacing: 10px;
  }
  .indexsecondsearch {
    width: 600px;
    height: 45px;
    background: #ffffff;
    opacity: 1;
    border-radius: 11px;
  }
}
.info {
  width: 1274px;
  height: 247px;
  background: #ffffff;
  border: 1px solid #e9eced;
  opacity: 1;
  border-radius: 18px;
  margin: 0 auto;
  z-index: 100;
  position: relative;
  top: -103px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
  .center_bottom {
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 15px;
    color: #666666;
    opacity: 1;
    margin-top: 2px;
  }
  .center_top {
    font-size: 20px;
    font-family: Microsoft YaHei;
    // font-weight: bold;
    line-height: 23px;
    color: #000000;
    opacity: 1;
  }
  .info_top {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 60px;
    align-items: center;
    // margin-left: 97.13px;
    margin: 45.38px auto 0;
    .last {
      // width: 332px;
      border: none;
      // justify-content: space-between;
    }
    ul:nth-child(1):hover {
      .block_height {
        width: 60px;
        height: 60px;
        animation-iteration-count: 1;
        animation: d-pro1 0.5s;
      }
    }
    ul:nth-child(2):hover {
      .transaction24 {
        width: 60px;
        height: 60px;
        animation-iteration-count: 1;
        animation: d-pro2 0.5s;
      }
    }
    ul:nth-child(3):hover {
      .award {
        width: 60px;
        height: 60px;
        animation-iteration-count: 1;
        animation: d-pro3 0.5s;
      }
    }

    ul:nth-child(3) {
      // margin-left: 95px;
    }
    ul {
      width: 422px;
      border-right: 2px solid #e9eced;
      //background: chocolate;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 97px;
      padding-right: 101px;
      div:nth-child(2) {
        width: 120px;
        text-align: right;
      }
      div {
        div:nth-child(1) {
          width: 125px;
          text-align: right;
          // margin-right: 78px;
        }
      }
      .block_height {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/区块高度.png") no-repeat
          center/100% 100%;
      }

      .transaction24 {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/24H交易数.png") no-repeat
          center/100% 100%;
      }

      .award {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/已发放奖励.png") no-repeat
          center/100% 100%;
      }

      .alljiedian {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/节点总数.png") no-repeat
          center/100% 100%;
      }

      .alltransaction {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/累计交易数.png") no-repeat
          center/100% 100%;
      }

      .last_award {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/剩余区块奖励.png") no-repeat
          center/100% 100%;
      }
    }
    // .top_left {
    //   margin-left: 63.5px;
    // }
  }
  .info_bottom {
    margin-top: 18px !important;
    ul:nth-child(1):hover {
      .alljiedian {
        width: 60px;
        height: 60px;
        animation-iteration-count: 1;
        animation: d-pro4 0.5s;
      }
    }
    ul:nth-child(2):hover {
      .alltransaction {
        width: 60px;
        height: 60px;
        animation-iteration-count: 1;
        animation: d-pro5 0.5s;
      }
    }
    ul:nth-child(3):hover {
      .last_award {
        width: 60px;
        height: 60px;
        animation-iteration-count: 1;
        animation: d-pro6 0.5s;
      }
    }
  }
  .info_line {
    width: 1080px;
    height: 0px;
    border: 1px solid #e9eced;

    margin: 30px auto 0;
  }
  .line_right {
    width: 0px;
    height: 47px;
    border: 1px solid #e9eced;
    opacity: 1;
  }
  .line_right2 {
    width: 0px;
    height: 31px;
    border: 1px solid #e9eced;
    opacity: 0;
  }
}
</style>
