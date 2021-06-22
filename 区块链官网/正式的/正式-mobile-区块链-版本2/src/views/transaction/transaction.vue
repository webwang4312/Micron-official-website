<template>
  <div class="transaction">
    <div class="top">
      <span>{{ $t("index")[6] }}</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li v-for="item in tradeList" :key="item" class="info_content">
          <ul>
            <li>
              <div>
                {{ $t("blockdetail")[3] }}
              </div>
              <div @click="goToTransactionDetail(item.txhash2)">
                TX
                <span class="blue">
                  {{ item.txhash }}
                </span>
              </div>
            </li>
            <li>
              <div>
               {{ $t("index")[9] }}
              </div>
              <div class="blue" @click="goToAddressDetail(item.fromAddress2)">
                {{ item.fromAddress}}
              </div>
            </li>
            <li>
              <div>
               {{ $t("index")[10] }}
              </div>
              <div
                v-if="item.to_address == '质押' || item.to_address == 'Pledge'"
              >
                {{ item.toAddress }}
              </div>
              <div
                v-else
                class="blue"
                @click="goToAddressDetail(item.toAddress2)"
              >
                {{ item.toAddress }}
              </div>
            </li>
            <li>
              <div>
              {{ $t("block")[3] }}
              </div>
              <div>
                {{ item.amount }}UENC
              </div>
            </li>
            <li>
              <div>
               {{ $t("block")[1] }}
              </div>
              <div>
                {{ item.tradeTime.toString() }}
              </div>
            </li>
            <li>
              <div>
              {{ $t("blockdetail")[2] }}
              </div>
              <div>
                {{ item.gasFees }}UENC
              </div>
            </li>
            <li>
              <div>
              {{ $t("block")[4] }}
              </div>
              <div>
                {{ item.blockAward }}UENC
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="block_pagination">
      <div @click="pagesMinus()">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div>{{ transmedianum }}-{{ totalNum }}</div>

      <div @click="pagesPlus()">
        <i class="el-icon-arrow-right"></i>
      </div>

      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="change"
      >
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
 import {GETTRANSACTION} from "@server/api.js";
export default {
  name: "block",
  
  data() {
    return {
      nowLang: "",
      // 分页
      transmedianum: 1,
      totalNum: "",
      tradeList: [],
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.transmedianum = 1;
    this.transactionlist();
    // console.log(this.timestampToTime(1403058804)); //2014-06-18 10:33:24
  },

  // 页码设置
  watch: {},
  methods: {
    goToTransactionDetail(item) {
      this.$router.push({
        path: "/transactiondetail",

        query: {
          txhash: item,
        },
      });
    },
    goToAddressDetail(item) {
      this.$router.push({
        path: "/addressdetail",
        query: {
          address: item,
        },
      });
    },
    pagesMinus() {
      if (this.transmedianum == 1) {
        this.$message({
          message: "已到底",
          type: "error",
        });
      } else {
        this.transmedianum -= 1;
         window.scrollTo(0,0);
        this.transactionlist();
      }
    },
    pagesPlus() {
      this.transmedianum += 1;
      // //console.log(this.medianum);
         window.scrollTo(0,0);
      this.transactionlist();
    },
    async transactionlist() {
      const res = await GETTRANSACTION({
        pageNum: this.transmedianum,
        pageSize: 6,
      });
      this.tradeList = res.result.tradeList;
      // 取得页数总数
      this.totalNum = Math.ceil(res.result.total / 6);
      if (this.nowLang == "cn") {
        for (var i = 0; i < this.tradeList.length; i++) {
          this.tradeList[i].txhash2 = this.tradeList[i].txhash;
          this.tradeList[i].txhash =
            this.tradeList[i].txhash.substring(0, 10) + "...";
          // console.log(this.tradeList[i].txhash);
          this.tradeList[i].fromAddress2 = this.tradeList[i].fromAddress;
          this.tradeList[i].fromAddress =
            this.tradeList[i].fromAddress.substring(0, 8) + "...";
          this.tradeList[i].toAddress2 = this.tradeList[i].toAddress;
          this.tradeList[i].type == "tx"||this.tradeList[i].type == "redeem"
            ? (this.tradeList[i].toAddress =
                this.tradeList[i].toAddress.substring(0, 8) + "...")
            : (this.tradeList[i].toAddress = this.tradeList[i].toAddress);
          let date = [];
          let strdate = parseInt(this.tradeList[i].tradeTime / 1000);
          // console.log(strdate + "shuju");
          // 当前日期转时间戳
          // console.log(res.result.linuxTime);
          let timestamp = res.result.linuxTime / 1000;
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
            this.tradeList[i].tradeTime = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "小时前");
            this.tradeList[i].tradeTime = date;
          }
          if (fenzhong > 1440) {
            date.push(this.timestampToTime(strdate));
            this.tradeList[i].tradeTime = date;
          }
          // console.log(this.tradeList[i].date);
        }
      } else {
        for (var i = 0; i < this.tradeList.length; i++) {
          this.tradeList[i].txhash2 = this.tradeList[i].txhash;
          this.tradeList[i].txhash =
            this.tradeList[i].txhash.substring(0, 10) + "...";
          this.tradeList[i].fromAddress2 = this.tradeList[i].fromAddress;
          this.tradeList[i].fromAddress =
            this.tradeList[i].fromAddress.substring(0, 8) + "...";
          this.tradeList[i].toAddress2 = this.tradeList[i].toAddress;
         this.tradeList[i].type == "tx"||this.tradeList[i].type == "redeem"
            ? (this.tradeList[i].toAddress =
                this.tradeList[i].toAddress.substring(0, 8) + "...")
            : (this.tradeList[i].toAddress = this.tradeList[i].toAddress);
          let date = [];
          let strdate = parseInt(this.tradeList[i].tradeTime / 1000);
          // console.log(strdate + "shuju");
          // 当前日期转时间戳
          // console.log(res.result.linuxTime);
          let timestamp = res.result.linuxTime / 1000;

          let s = timestamp - strdate; //9.20
          // console.log(s+'相差');
          // console.log(s/86400000 + "天数");
          // console.log(parseInt(s/86400000*24*60) + "fenzhong");
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          // console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              date.push("Just");
            } else {
              date.push(parseInt(fenzhong) + "minutes ago");
            }
            this.tradeList[i].tradeTime = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "hour ago");
            this.tradeList[i].tradeTime = date;
          }
          if (fenzhong > 1440) {
            date.push(this.timestampToTime(strdate));
            this.tradeList[i].tradeTime = date;
          }
          // console.log(this.tradeList[i].date);
        }
      }
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
.transaction {
  background: #ffffff;
  min-height: 100vh;
  .blue {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #965EE5 !important;
  }
  .top {
    width: 343px;
    height: 38px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 20px;
    color: #253551;
    display: flex;
    align-items: center;
    margin: 20px auto 0;
    span {
      // margin-left: 20px;
    }
    img {
      width: 38px;
      height: 38px;
    }
  }
  .block_info {
    width: 343px;
    height: auto;
    min-height: 100vh;
    background: #ffffff;
    margin: 0 auto;
    .info_title {
      // margin: 0 20px;
      .info_content:nth-last-child(1) {
        ul {
          border-bottom: 1px solid #ffffff !important;
        }
      }
      .info_content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        ul {
          width: 343px;
          height: auto;
           padding-bottom: 20px ;
          border-bottom: 1px solid rgba(178, 178, 178, 0.5);
          li {
            display: flex;
            flex-direction: row;
            margin-top: 10px;
            div:nth-child(1) {
              width: 92px;
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
  .block_pagination {
    width: 343px;
    height: 37px;
    background: #ffffff;
    margin: 10px auto 55px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    // padding: 0 20px;
    div {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: #253551;
    }
    div:nth-child(1),
    div:nth-child(3) {
      width: 40px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #edf1f6;
      opacity: 1;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
    }
    div:nth-child(1),
    div:nth-child(2) {
      margin-right: 23px;
    }
    // .el-pagination {
    //   padding: 0;
    //   font-size: 15px;
    //   font-family: Microsoft YaHei;
    //   font-weight: 400;
    //   line-height: 20px;
    //   color: #666666;
    //   .number,
    //   button,
    //   .more {
    //     background: #ffffff;
    //   }
    //   .active {
    //     color: #965EE5;
    //     border: 1px solid #965EE5;

    //     border-radius: 6px;
    //     background-color: #ffffff !important;
    //   }
    // }
  }
}
</style>
