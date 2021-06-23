<template>
  <div class="transaction">
    <div class="top">
      <img src="@assets/images/second/交易列表@2x.png" alt="" />
      <span>{{ $t("blockdetail")[4] }}</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li>
          <div>
            {{ $t("blockdetail")[3] }}
          </div>
          <div>{{ $t("block")[1] }}</div>
          <div>{{ $t("index")[9] }}</div>
          <div>
            {{ $t("index")[10] }}
          </div>
          <div>{{ $t("block")[3] }}</div>
          <div>{{ $t("blockdetail")[2] }}</div>
          <div>{{ $t("block")[4] }}</div>
        </li>
      </ul>
      <ul class="info_content">
        <li v-for="item in tradeList" :key="item">
          <div @click="goToTransactionDetail(item.txhash2)">
            {{ item.txhash }}
          </div>
          <div>
            {{ item.tradeTime.toString() }}
          </div>
          <div class="zise" @click="goToAddressDetail(item.fromAddress2)">
            {{ item.fromAddress }}
          </div>
          <div class="zise" @click="goToAddressDetail(item.toAddress2)">
            {{ item.toAddress }}
          </div>
          <div>
            {{ item.amount }}
          </div>
          <div>
            {{ item.gasFees }}
          </div>
          <div>
            {{ item.blockAward }}
          </div>
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
import { GETTRANSACTION } from "@server/api.js";
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
        this.nowLang == "cn"
          ? this.$message({
              message: "已到底",
              type: "error",
            })
          : this.$message({
              message: "no more",
              type: "error",
            });
      } else {
        this.transmedianum -= 1;
        this.transactionlist();
      }
    },
    pagesPlus() {
      if (this.transmedianum >= this.totalNum) {
        this.nowLang == "cn"
          ? this.$message({
              message: "已到顶",
              type: "error",
            })
          : this.$message({
              message: "no more",
              type: "error",
            });
      } else {
        this.transmedianum += 1;
        // //console.log(this.medianum);
        this.transactionlist();
      }
    },
    //获取MEDIA
    async transactionlist() {
      const res = await GETTRANSACTION({
        pageNum: this.transmedianum,
        pageSize: 20,
      });
      this.tradeList = res.result.tradeList;
      // 取得页数总数
      this.totalNum = Math.ceil(res.result.total / 20);
      console.log(this.totalNum);
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
          this.tradeList[i].type == "tx" || this.tradeList[i].type == "redeem"
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
           this.tradeList[i].type == "tx" || this.tradeList[i].type == "redeem"
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
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>
<style lang="less">
.transaction {
  background: #f9fafd;
  padding-bottom: 195px;
  .zise {
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 20px;
    color: rgba(102, 36, 250, 1) !important;
    opacity: 1;
  }
  .top {
    width: 1275px;
    height: 38px;
    font-size: 23px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 38px;
    color: #000000;
    padding-top: 31px;
    padding-bottom: 21px;
    margin: 0px auto;
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      width: 38px;
      height: 38px;
    }
  }
  .block_info {
    width: 1275px;
    height: 975px;

    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 1;
    border-radius: 11px;
    margin: 0 auto 31px;
    .info_title {
      height: 75px;
      line-height: 75px;
      background: #ffffff;
      li {
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div {
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          width: 14%;
        }
        div:nth-child(1) {
          text-align: left;
          padding-left: 53px;
        }
      }
      div:nth-last-of-type(1) {
        text-align: right;
        padding-right: 53px;
      }
    }
    .info_content {
      li:nth-child(odd) {
        background: #fcfcfc;
      }
      li:nth-child(even) {
        background: #ffffff;
      }
      li {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        text-align: center;
        height: 45px;
        cursor: pointer;
        background: #fcfcfc;
        div:nth-child(1) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          text-align: left;
          color: rgba(102, 36, 250, 1);
          padding-left: 53px;
        }
        div:nth-last-of-type(1) {
          text-align: right;
          padding-right: 53px;
        }
        div {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 45px;
          color: #333333;
          width: 14%;
        }
      }
    }
  }
  .block_pagination {
    width: 1275px;
    height: 37px;
    background: #f9fafd;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    div {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #666666;
    }
    div:nth-child(1),
    div:nth-child(3) {
      cursor: pointer;
      width: 37px;
      height: 37px;
      line-height: 37px;
      background: #ffffff;
      border: 1px solid #edf1f6;
      border-radius: 6px;
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
