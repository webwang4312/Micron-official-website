<template>
  <div class="index">
    <div class="info">
      <ul class="info_first">
        <li>
          <div class="block_height"></div>
          <div>
            <div class="center_top">
              {{ blockheigth }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[0] }}
            </div>
          </div>
        </li>
        <li>
          <div class="alljiedian"></div>
          <div>
            <div class="center_top">
              {{ jiediancount }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[3] }}
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="transaction24"></div>
          <div>
            <div class="center_top">
              {{ transzoom }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[1] }}
            </div>
          </div>
        </li>
        <li>
          <div class="alltransaction"></div>
          <div>
            <div class="center_top">
              {{ transnumber }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[4] }}
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="award"></div>
          <div>
            <div class="center_top">
              {{ blockreward }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[2] }}
            </div>
          </div>
        </li>
        <li>
          <div class="last_award"></div>
          <div>
            <div class="center_top">
              {{ blocklastreward }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[5] }}
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="node_award"></div>
          <div>
            <div class="center_top">
              {{ lastDayAvgAward }}
            </div>
            <div class="center_bottom">
              {{ $t("transaction")[3] }}
            </div>
          </div>
        </li>
        <li>
          <div class="liu_num"></div>
          <div>
            <div class="center_top">
              {{ totalTradeAmount }}
            </div>
            <div class="center_bottom">
              {{ $t("transaction")[4] }}
            </div>
          </div>
        </li>
      </ul>
      <!--     
      <div class="info_top info_bottom">
        
      </div> -->
    </div>
    <div class="hezi"></div>

    <Chart></Chart>

    <div class="hezi"></div>
    <index-list
      :tableData="tableData"
      :tableData2="tableData2"
      :nowTime="nowTime"
    ></index-list>
  </div>
</template>
<script>
import { GETINDEX } from "@server/api.js";
import Chart from "./index/chart.vue";
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
      // 24小时交易笔数?
      transzoom: "",
      // 24小时交易总额?
      transmoney: "" || 0,
      //  交易笔数
      transnumber: "",
      // 区块奖励
      blockreward: "",
      // 剩余区块奖励
      blocklastreward: "",
      // 节点数量
      jiediancount: "",
      // 流通总量
      totalTradeAmount: "",
      // 选举节点预计收益
      lastDayAvgAward: "",
      // 本页面
      tableData: [],
      tableData2: [],
      tabledataall: "",
    };
  },
  watch: {},
  components: { Chart, indexList },
  created() {
    this.nowLang = this.$i18n.locale;
    this.indexlists();
  },
  mounted() {
    setInterval(this.indexlists, 20000);
  },
  methods: {
    qianwei(str) {
      str = str.toString();
      var re = /(?=(?!(\b))(\d{3})+$)/g;
      return (str = str.replace(re, ","));
    },
    goToAddressDetail(item) {
      //console.log(item);
      this.$router.push({
        path: "/addressdetail",
        query: {
          address: item,
        },
      });
    },
    goToTransaction() {
      this.$router.push({
        path: "/transaction",
      });
    },
    goToTransactionDetail(item) {
      this.$router.push({
        path: "/transactiondetail",
        query: {
          txhash: item,
        },
      });
    },
    goToBlock() {
      this.$router.push({
        path: "/block",
      });
    },
    goToBlockDetail(item) {
      this.$router.push({
        path: "/blockdetail",
        query: {
          block: item,
        },
      });
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
           this.tableData[i].amount.toString().split(".")[1].length > 6
            ? (this.tableData[i].amount = Number(
                this.tableData[i].amount
              ).toFixed(2))
            : (this.tableData[i].amount = Number(
                this.tableData[i].amount
              ));
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
          this.tableData[i].fromAddress2 = this.tableData[i].fromAddress;
          this.tableData[i].toAddress2 = this.tableData[i].toAddress;
          this.tableData[i].fromAddress =
            this.tableData[i].fromAddress.substring(0, 8) + "...";

          if (this.tableData[i].toAddress == "质押") {
            this.tableData[i].toAddress = "质押";
          } else {
            this.tableData[i].toAddress =
              this.tableData[i].toAddress.substring(0, 8) + "...";
          }
          // this.tableData[i].toAddress =
          //   this.tableData[i].toAddress.substring(0, 8) + "...";
        }
        //console.log(this.tableData2.length);
        for (var j = 0; j < this.tableData2.length; j++) {
          this.tableData2[j].blockAward.toString().split(".")[1].length > 6
            ? (this.tableData2[j].blockAward = Number(
                this.tableData2[j].blockAward
              ).toFixed(2))
            : (this.tableData2[j].blockAward = Number(
                this.tableData2[j].blockAward
              ));
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
           this.tableData[i].amount.toString().split(".")[1].length > 6
            ? (this.tableData[i].amount = Number(
                this.tableData[i].amount
              ).toFixed(2))
            : (this.tableData[i].amount = Number(
                this.tableData[i].amount
              ));
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
          if (this.tableData[i].toAddress == "质押") {
            this.tableData[i].toAddress = "Pledge";
          } else {
            this.tableData[i].toAddress =
              this.tableData[i].toAddress.substring(0, 8) + "...";
          }

          this.tableData[i].toAddress2 = this.tableData[i].toAddress;
        }
        //console.log(this.tableData2.length);
        for (var j = 0; j < this.tableData2.length; j++) {
          this.tableData2[j].blockAward.toString().split(".")[1].length > 6
            ? (this.tableData2[j].blockAward = Number(
                this.tableData2[j].blockAward
              ).toFixed(2))
            : (this.tableData2[j].blockAward = Number(
                this.tableData2[j].blockAward
              ));
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
      // 选举节点预计收益
      this.lastDayAvgAward = data.lastDayAvgAward;
      // 流通总量
      this.totalTradeAmount = this.qianwei(data.totalTradeAmount);
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
.blue {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 18px;
  color: #965ee5 !important;
  cursor: pointer;
}

.el-icon-arrow-right {
}
.more {
  cursor: pointer;
}
.index {
  height: auto;
  .hezi {
    width: 100%;
    height: 10px;
    background: #f8f8f8;
  }
  .info {
    width: 343px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 30px;
    padding-top: 12px;
    // background: gray;
    .info_first {
      margin-top: 0px;
    }
    ul {
      //background: chocolate;
      display: flex;
      flex-direction: row;
      
      justify-content: space-between;
      margin-top: 38px;
      padding: 0 0px;
      li:nth-child(1) {
        width: 200px;
        margin-right: 61px;
      }
      li {
        width: 200px;
        display: flex;
        flex-direction: row;
      }
      li > div:nth-child(2) {
        width: 80px;
        color: red !important;
        margin-left: 15px;
        text-align: right;
      }
      .block_height {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/区块高度.png") no-repeat
          center/100% 100%;
      }
      // .block_height:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/区块高度.gif") no-repeat
      //     center/100% 100%;
      // }
      .transaction24 {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/24H交易数.png") no-repeat
          center/100% 100%;
      }
      // .transaction24:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/24H交易数.gif") no-repeat
      //     center/100% 100%;
      // }
      .award {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/已发放奖励.png") no-repeat
          center/100% 100%;
      }
      // .award:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/已发放奖励.gif") no-repeat
      //     center/100% 100%;
      // }
      .alljiedian {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/节点总数.png") no-repeat
          center/100% 100%;
      }
      // .alljiedian:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/节点总数.gif") no-repeat
      //     center/100% 100%;
      // }
      .alltransaction {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/累计交易数.png") no-repeat
          center/100% 100%;
      }
      // .alltransaction:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/累计交易数.gif") no-repeat
      //     center/100% 100%;
      // }
      .last_award {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/剩余区块奖励.png") no-repeat
          center/100% 100%;
      }

      // .last_award:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/剩余区块奖励.gif") no-repeat
      //     center/100% 100%;
      // }
      .liu_num {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/1H签名节点个数.png") no-repeat
          center/100% 100%;
      }
      .node_award {
        width: 44px;
        height: 44px;
        background: url("../assets/images/second/1H节点平均收益.png") no-repeat
          center/100% 100%;
      }
    }
    .center_bottom {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: #9da5bb;
      margin-top: 2px;
    }
    .center_top {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 21px;
      color: #253551;
    }
  }
}
</style>
