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
import headertop from "@components/pc/HeaderTop";
import VFooter from "@components/pc/Footer.vue";
import Search from "@components/pc/Search.vue";
import Chart from "@views/pc/index/chart";
import indexList from "@views/pc/index/indexList";
export default {
  name: "index",
  inject: ["reload"],
  data() {
    return {
      timer: null, //定时器名称
      // 固定设置
      tables: false,
      nowLang: "",
      language: "",
      test1: "",
      test2: "",
      // 语言图片显示与隐藏
      show: true,
      money: "",
      money2: "",
      // 卡片左边所有的数据
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
      echartsed: [],
      // 本页面
      tableData: [
        {
          transaction_hash: "",
          transaction_hash2: "",
          date: "",
          amount: "",
          from_address: "",
          to_address: "",
          from_address2: "",
          to_address2: "",
          gas: "",
        },
      ],
      tableData2: [
        {
          block_height: "",
          time: "",
          tx_num: "",
          amount: "",
          award: "",
        },
      ],
      tabledataall: "",
      pie: [],
      jiediancount: "",
      nowTime: "",
    };
  },
  watch: {},
  components: { headertop, Search, VFooter, Chart, indexList },
  created() {
    this.nowLang = this.$i18n.locale;

    window.setInterval(() => {
      setTimeout(this.indexlists(), 1000);
    }, 60000);
    //  window.setInterval(() => {
    //   setTimeout(this.jiedian(), 0);
    // }, 3000);
    // this.indexlists();
    // this.jiedian();
  },
  beforeDestroy() {
    clearInterval(this.indexlists());        
   
},
  mounted() {},
  methods: {
    indexlists() {
      let that = this;
      that.$http
        .get("")
        .then((res) => {
          //console.log(res);
          // 获取首页数据集合
          var data = res.data[0];
          // 最新交易数据
          this.tableData = data.transaction_info_for_index;
          //  console.log(this.tableData);
          // 最新出块数据
          this.tableData2 = data.block_new;
          // console.log(this.tableData.length);
          // 时间戳的处理
          this.nowTime = data.timeStamp;
          // console.log( this.nowTime );
          if (this.nowLang == "cn") {
            for (var i = 0; i < this.tableData.length; i++) {
              let date = [];
              let strdate = this.tableData[i].date;
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
              this.tableData[i].transaction_hash2 = this.tableData[
                i
              ].transaction_hash;
              this.tableData[i].from_address2 = this.tableData[i].from_address;
              this.tableData[i].transaction_hash =
                this.tableData[i].transaction_hash.substring(0, 10) + "...";
              this.tableData[i].from_address =
                this.tableData[i].from_address.substring(0, 10) + "...";

              this.tableData[i].to_address2 = this.tableData[i].to_address;
              if (
                this.tableData[i].to_address ==
                "0000000000000000000000000000000000"
              ) {
                if (this.nowLang == "cn") {
                  this.tableData[i].to_address = "质押";
                }
                if (this.nowLang == "en") {
                  this.tableData[i].to_address = "Pledge";
                }
              } else {
                this.tableData[i].to_address =
                  this.tableData[i].to_address.substring(0, 10) + "...";
              }
            }
            //console.log(this.tableData2.length);
            for (var j = 0; j < this.tableData2.length; j++) {
              let times = [];
              let strtime = this.tableData2[j].time;
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
              let date = [];
              let strdate = this.tableData[i].date;
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
              this.tableData[i].transaction_hash2 = this.tableData[
                i
              ].transaction_hash;
              this.tableData[i].transaction_hash =
                this.tableData[i].transaction_hash.substring(0, 10) + "...";
              this.tableData[i].from_address2 = this.tableData[i].from_address;
              this.tableData[i].from_address =
                this.tableData[i].from_address.substring(0, 10) + "...";
              this.tableData[i].to_address =
                this.tableData[i].to_address.substring(0, 10) + "...";

              this.tableData[i].to_address2 = this.tableData[i].to_address;
            }
            //console.log(this.tableData2.length);
            for (var j = 0; j < this.tableData2.length; j++) {
              let times = [];
              let strtime = this.tableData2[j].time;
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
          this.jiediancount = res.data[0].node_count[0].count;
          //console.log(this.tableData);
          //区块高度
          this.blockheigth = data.block_height_all[0].block_height;
          // 区块奖励
          this.blockreward = Math.trunc(
            data.count_block_award_for_all[0].award_total
          );
          // 剩余区块奖励
          this.blocklastreward = Math.trunc(
            data.count_block_award_for_all[0].award_balance
          );
          //  交易笔数
          this.transnumber = data.transaction_num_for_all[0].transaction_num;
          this.money = res.data[0].usdt[0].usdt.toString().substring(0, 6);
          this.money2 = res.data[0].usdt[0].rmb.toString().substring(0, 4);
          //24小时交易笔数?
          this.transzoom = data.transaction_num_for_24h[0].transaction_num;
          // console.log(this.transzoom);
          // 24小时交易总额?
          this.transmoney = Math.trunc(
            data.transaction_amount_for_24h[0].transaction_amount_24h
          );
        })
        .catch((e) => {});
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
  background: url("../../assets/images/second/背景.png") no-repeat center/100% 100%;
  z-index: 1;
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
    letter-spacing: 13px;
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
    ul:nth-child(2) {
      // margin-left: 95px;
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
        width: 100px;
        text-align: right;
        overflow: hidden;
      }
      div {
        div:nth-child(1) {
          width: 100px;
          text-align: right;
          // margin-right: 78px;
        }
      }
      .block_height {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/区块高度.png") no-repeat
          center/100% 100%;
      }
      .block_height:hover {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/区块高度.gif") no-repeat
          center/100% 100%;
      }
      .transaction24 {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/24H交易数.png") no-repeat
          center/100% 100%;
      }
      .transaction24:hover {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/24H交易数.gif") no-repeat
          center/100% 100%;
      }
      .award {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/已发放奖励.png") no-repeat
          center/100% 100%;
      }
      .award:hover {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/已发放奖励.gif") no-repeat
          center/100% 100%;
      }
      .alljiedian {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/节点总数.png") no-repeat
          center/100% 100%;
      }
      .alljiedian:hover {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/节点总数.gif") no-repeat
          center/100% 100%;
      }
      .alltransaction {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/累计交易数.png") no-repeat
          center/100% 100%;
      }
      .alltransaction:hover {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/累计交易数.gif") no-repeat
          center/100% 100%;
      }
      .last_award {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/剩余区块奖励.png") no-repeat
          center/100% 100%;
      }
      .last_award:hover {
        width: 60px;
        height: 60px;
        background: url("../../assets/images/second/剩余区块奖励.gif") no-repeat
          center/100% 100%;
      }
    }
    // .top_left {
    //   margin-left: 63.5px;
    // }
  }
  .info_bottom {
    margin-top: 18px !important;
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
