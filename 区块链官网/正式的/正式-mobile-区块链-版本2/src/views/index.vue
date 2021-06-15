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

      <!--     
      <div class="info_top info_bottom">
        
      </div> -->
    </div>
    <div class="hezi"></div>

    <Chart></Chart>

    <div class="hezi"></div>
    <div class="info_list">
      <div class="last_transaction">
        <div class="subject">
          <div>
            {{ $t("index")[6] }}
          </div>
          <div class="more" @click="goToTransaction">
            {{ $t("index")[8] }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content">
          <li v-for="item in tableData" :key="item">
            <ul>
              <li>
                <div>
                  {{ $t("blockdetail")[3] }}
                  TX
                </div>
                <div
                  @click="goToTransactionDetail(item.transaction_hash2)"
                  class="blue"
                >
                  {{ item.transaction_hash }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("index")[9] }}
                </div>
                <div
                  @click="goToAddressDetail(item.from_address2)"
                  class="blue"
                >
                  {{ item.from_address }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("index")[10] }}
                </div>
                <div @click="goToAddressDetail(item.to_address2)" class="blue">
                  {{ item.to_address }}
                </div>
              </li>
              <li>
                <div>{{ $t("block")[3] }}:</div>
                <div>
                  {{ item.amount }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("block")[1] }}
                </div>
                <div>
                  {{ item.date.toString() }}
                </div>
              </li>
              <li>
                <div></div>
                <div
                  style="width: 248px;
height: 0px;border-bottom:1px solid #B2B2B2"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="last_block">
        <div class="subject">
          <div>
            {{ $t("index")[7] }}
          </div>
          <div class="more" @click="goToBlock">
            {{ $t("index")[8] }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content">
          <li v-for="item in tableData2" :key="item">
            <ul>
              <li>
                <div>
                  {{ $t("index")[0] }}
                </div>
                <div @click="goToBlockDetail(item.block_height)" class="blue">
                  {{ item.block_height }}
                </div>
              </li>
              <li>
                <div>{{ $t("block")[4] }}</div>
                <div>
                  {{ item.award }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("block")[1] }}
                </div>
                <div>
                  {{ item.time.toString() }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("block")[2] }}
                </div>
                <div>
                  {{ item.tx_num }}
                </div>
              </li>
              <li>
                <div></div>
                <div
                  style="width: 248px;
height: 0px;border-bottom:1px solid #B2B2B2"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "./index/chart.vue";
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
      // 节点数量
      jiediancount: "",
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
    };
  },
  watch: {},
  components: { Chart },
  created() {
    this.nowLang = this.$i18n.locale;
    this.indexlist();
  },
  mounted() {},
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
          transaction_hash: item,
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
    indexlist() {
      let that = this;
      that.$http
        .get("")
        .then((res) => {
          //console.log(res);
          // 获取首页数据集合
          var cardleftinformation = res.data[0];
          //console.log(cardleftinformation);
          // 区块高度
          // 最新交易数据
          this.tableData = cardleftinformation.transaction_info_for_index;
          //  console.log(this.tableData);
          // 最新出块数据
          this.tableData2 = cardleftinformation.block_new;
          // console.log(this.tableData.length);
          // 时间戳的处理
          if (this.nowLang == "cn") {
            for (var i = 0; i < this.tableData.length; i++) {
              let date = [];
              let strdate = this.tableData[i].date;
              // console.log(strdate + "shuju");
              // 当前日期转时间戳
              // console.log(Date.parse(new Date()));
              let timestamp = cardleftinformation.timeStamp;
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
              let timestamp = cardleftinformation.timeStamp;
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
              let timestamp = cardleftinformation.timeStamp;
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
              let timestamp = cardleftinformation.timeStamp;
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

          //console.log(this.tableData);
          this.jiediancount = cardleftinformation.node_count[0].count;
         
         

          this.blockheigth = this.qianwei(
            cardleftinformation.block_height_all[0].block_height
          );
          // 区块奖励
          this.blockreward =this.qianwei (Math.trunc(
            cardleftinformation.count_block_award_for_all[0].award_total
          ));
          // 剩余区块奖励
          this.blocklastreward =this.qianwei (Math.trunc(
            cardleftinformation.count_block_award_for_all[0].award_balance
          ));
          //  交易笔数
          this.transnumber =this.qianwei
           ( cardleftinformation.transaction_num_for_all[0].transaction_num);
          this.money =this.qianwei (res.data[0].usdt[0].usdt.toString().substring(0, 6));
          this.money2 =this.qianwei( res.data[0].usdt[0].rmb.toString().substring(0, 4));
          //24小时交易笔数?
          this.transzoom =this.qianwei
           ( cardleftinformation.transaction_num_for_24h[0].transaction_num);
          // console.log(this.transzoom);
          // 24小时交易总额?
          this.transmoney =this.qianwei (Math.trunc(
            cardleftinformation.transaction_amount_for_24h[0]
              .transaction_amount_24h
          ));
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
      align-items: center;
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

  .info_list {
    width: 343px;
    height: auto;
    margin: 20px auto 37px;
    display: flex;
    flex-direction: column;

    .last_transaction {
      width: 100%;
      height: auto;

      margin-bottom: 20px;
      .subject {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #253551;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #965ee5;
        }
      }
      .content {
        width: 100%;
        margin: 0 auto;
      }
      .content > li {
        width: 100%;
        height: 172px;

        display: flex;
        align-items: center;
        ul {
          width: 100%;
          height: 100%;
          li:nth-child(1) {
            margin-top: 20px;
          }
          li {
            display: flex;
            flex-direction: row;

            margin-top: 10px;
            div:nth-child(1) {
              width: 100px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #9da5bb;
            }
            div:nth-child(2) {
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #253551;
            }
          }
        }
      }
    }
    .last_block {
      width: 100%;
      height: auto;

      .subject {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #253551;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #965ee5;
        }
      }
      .content {
        width: 100%;
        height: auto;
        margin: 0 auto;
      }
      .content > li {
        width: 100%;
        height: 143px;

        display: flex;
        align-items: center;
        ul {
          width: 100%;
          height: 143px;
          li:nth-child(1) {
            margin-top: 20px;
          }
          li {
            margin-top: 10px;
            display: flex;
            flex-direction: row;

            div:nth-child(1) {
              width: 100px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #9da5bb;
            }
            div:nth-child(2) {
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #253551;
            }
          }
        }
      }
    }
  }
}
</style>
