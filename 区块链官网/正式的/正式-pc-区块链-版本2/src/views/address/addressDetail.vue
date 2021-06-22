<template>
  <div class="addressdetail">
    <div class="top">
      <img src="@assets/images/second/地址概览@2x.png" alt="" />
      <span> {{ $t("addressdetail")[0] }}</span>
    </div>
    <div class="detail_content">
      <ul>
        <li>{{ $t("address")[2] }}:</li>
        <li>{{ $t("addressdetail")[1] }}:</li>
        <li>{{ $t("addressdetail")[2] }}:</li>
        <li>{{ $t("addressdetail")[3] }}:</li>
        <li>{{ $t("addressdetail")[4] }}:</li>
        <li>{{ $t("address")[1] }}:</li>
      </ul>
      <ul>
        <li class="blue">
          {{ shiyan }}
        </li>
        <li>{{ balance }}</li>
        <li>{{ tradeNums }}</li>
        <li>{{ income }}UENC</li>
        <li>{{ pay }}UENC</li>
        <li>{{ rank }}</li>
      </ul>
    </div>
    <div class="top">
      <img src="@assets/images/second/交易列表@2x.png" alt="" />
      <span>{{ $t("blockdetail")[4] }}</span>
    </div>
    <div class="block_info" v-show="have_list">
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
          <div>
            {{ $t("blockdetail")[2] }}
          </div>
        </li>
      </ul>
      <ul class="info_content">
        <li v-for="item in detailList" :key="item">
          <div @click="goToTransactionDetail(item.txhash2)">
            {{ item.txhash }}
          </div>
          <div>
            {{ item.tradeTime.toString() }}
          </div>
          <div @click="goToAddressDetail(item.fromAddress2)">
            {{ item.fromAddress }}
          </div>
          <div @click="goToAddressDetail(item.toAddress2)">
            {{ item.toAddress }}
          </div>
          <div>
            {{ item.amount }}
          </div>
          <div>
            {{ item.gasFees }}
          </div>
        </li>
      </ul>
    </div>
    <div class="no_info" v-show="!have_list">
      <img src="@assets/images/second/插画@2x (1).png" alt="" />
      <span>
        {{ $t("addressdetail")[5] }}
      </span>
    </div>
    <div class="block_pagination" v-if="totalNum > 1">
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
import {
  GETADDRESSDETAIL,
  timestampToTime,
  GETADDRESSDETAIL2,
} from "@server/api.js";
export default {
  name: "addressdetail",
  inject: ["reload"],
  data() {
    return {
      nowLang: "",
      // 分页
      transmedianum: 1,
      // 总页数
      totalNum: "",
      shiyan: "",
      detailList: [],
      // 钱包地址
      walletAddress: "",
      //余额
      balance: "",
      //交易数量
      tradeNums: "",
      //收入
      income: "",
      //支出
      pay: "",
      //排名
      rank: "",
      have_list: Boolean,
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    // console.log(this.$route.query.address);
    this.shiyan = this.$route.query.address;
    this.transmedianum = 1;
    this.addressSearch();
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
      // console.log(item);
      this.shiyan = item;
      this.addressSearch();
    },
    pagesMinus() {
      if (this.transmedianum == 1) {
        this.$message({
          message: "已到底",
          type: "error",
        });
      } else {
        this.transmedianum -= 1;
        this.pageList();
      }
    },
    pagesPlus() {
      if (this.transmedianum < this.totalNum) {
        this.transmedianum += 1;
        // //console.log(this.medianum);
        this.pageList();
      } else {
        return false;
      }
    },

    //地址搜索
    async addressSearch() {
      const res = await GETADDRESSDETAIL({
        type: "1",
        key: this.shiyan,
        pageNum: "1",
        pageSize: "20",
      });
      // console.log(res);
      this.totalNum = Math.ceil(res.result.detailCount / 20);

      if (this.totalNum !== 0) {
        this.have_list = true;
      } else {
        this.have_list = false;
      }
      //要查询的钱包地址
      this.walletAddress = res.result.walletAddress;
      //余额
      this.balance = res.result.balance;
      //交易数量
      this.tradeNums = res.result.tradeNums;
      //收入
      this.income = res.result.income;
      //支出
      this.pay = res.result.pay;
      //排名
      this.rank = res.result.rank;
      // this.yue=res.
      this.detailList = res.result.detailList;
      // console.log(this.detailList);
      if (this.nowLang == "cn") {
        for (var i = 0; i < this.detailList.length; i++) {
          this.detailList[i].txhash2 = this.detailList[i].txhash;
          this.detailList[i].txhash =
            this.detailList[i].txhash.substring(0, 10) + "...";
          this.detailList[i].fromAddress2 = this.detailList[i].fromAddress;
          this.detailList[i].fromAddress =
            this.detailList[i].fromAddress.substring(0, 8) + "...";
          this.detailList[i].toAddress2 = this.detailList[i].toAddress;
          this.detailList[i].type == "from" || this.detailList[i].type == "to"
            ? (this.detailList[i].toAddress =
                this.detailList[i].toAddress.substring(0, 8) + "...")
            : (this.detailList[i].toAddress = this.detailList[i].toAddress);
          let date = [];
          let strdate = parseInt(this.detailList[i].tradeTime / 1000);
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
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "小时前");
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong > 1440) {
            date.push(timestampToTime(strdate));
            this.detailList[i].tradeTime = date;
          }
          // console.log(this.detailList[i].date);
        }
      } else {
        for (var i = 0; i < this.detailList.length; i++) {
          this.detailList[i].txhash2 = this.detailList[i].txhash;
          this.detailList[i].txhash =
            this.detailList[i].txhash.substring(0, 10) + "...";
          this.detailList[i].fromAddress2 = this.detailList[i].fromAddress;
          this.detailList[i].fromAddress =
            this.detailList[i].fromAddress.substring(0, 8) + "...";
          this.detailList[i].toAddress2 = this.detailList[i].toAddress;
          this.detailList[i].type == "from" || this.detailList[i].type == "to"
            ? (this.detailList[i].toAddress =
                this.detailList[i].toAddress.substring(0, 8) + "...")
            : (this.detailList[i].toAddress = this.detailList[i].toAddress);
          let date = [];
          let strdate = parseInt(this.detailList[i].tradeTime / 1000);
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
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "hour ago");
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong > 1440) {
            date.push(timestampToTime(strdate));
            this.detailList[i].tradeTime = date;
          }
          // console.log(this.detailList[i].date);
        }
      }
    },
    async pageList() {
      const res = await GETADDRESSDETAIL2({
        address: this.walletAddress,
        pageNum: this.transmedianum,
        pageSize: 20,
      });
      this.detailList = res.result.detailList;
      if (this.nowLang == "cn") {
        for (var i = 0; i < this.detailList.length; i++) {
          this.detailList[i].txhash2 = this.detailList[i].txhash;
          this.detailList[i].txhash =
            this.detailList[i].txhash.substring(0, 10) + "...";
          this.detailList[i].fromAddress2 = this.detailList[i].fromAddress;
          this.detailList[i].fromAddress =
            this.detailList[i].fromAddress.substring(0, 8) + "...";
          this.detailList[i].toAddress2 = this.detailList[i].toAddress;
          this.detailList[i].type == "from" || this.detailList[i].type == "to"
            ? (this.detailList[i].toAddress =
                this.detailList[i].toAddress.substring(0, 8) + "...")
            : (this.detailList[i].toAddress = this.detailList[i].toAddress);
          let date = [];
          let strdate = parseInt(this.detailList[i].tradeTime / 1000);
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
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "小时前");
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong > 1440) {
            date.push(timestampToTime(strdate));
            this.detailList[i].tradeTime = date;
          }
          // console.log(this.detailList[i].date);
        }
      } else {
        for (var i = 0; i < this.detailList.length; i++) {
          this.detailList[i].txhash2 = this.detailList[i].txhash;
          this.detailList[i].txhash =
            this.detailList[i].txhash.substring(0, 10) + "...";
          this.detailList[i].fromAddress2 = this.detailList[i].fromAddress;
          this.detailList[i].fromAddress =
            this.detailList[i].fromAddress.substring(0, 8) + "...";
          this.detailList[i].toAddress2 = this.detailList[i].toAddress;
          this.detailList[i].type == "from" || this.detailList[i].type == "to"
            ? (this.detailList[i].toAddress =
                this.detailList[i].toAddress.substring(0, 8) + "...")
            : (this.detailList[i].toAddress = this.detailList[i].toAddress);
          let date = [];
          let strdate = parseInt(this.detailList[i].tradeTime / 1000);
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
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "hour ago");
            this.detailList[i].tradeTime = date;
          }
          if (fenzhong > 1440) {
            date.push(timestampToTime(strdate));
            this.detailList[i].tradeTime = date;
          }
          // console.log(this.detailList[i].date);
        }
      }
    },
  },
};
</script>
<style lang="less">
.blue {
  font-size: 17px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 22px;
  color: #965ee5;
}

.addressdetail {
  min-height: 900px;
  height: auto;
  background: #f9fafd;
  padding-bottom: 275px;
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
      margin-left: 5px;
    }
  }
  .detail_content {
    width: 1275px;
    height: 360px;
    background: #ffffff;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 1;
    border-radius: 11px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    ul {
      li {
        margin-top: 28px;
      }
    }
    ul:nth-child(1) {
      font-size: 17px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: #666666;
      margin-left: 53px;
      margin-top: 18px;
    }
    ul:nth-child(2) {
      margin-top: 18px;
      font-size: 17px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: #333333;
      margin-left: 94px;
    }
  }
  .block_info {
    width: 1275px;
    height: auto;

    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 1;
    border-radius: 11px;
    margin: 0 auto 31px;
    .info_title {
      height: 75px;
      line-height: 75px;
      font-size: 17px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      background: #ffffff;
      color: #000000;
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 53px;

        div {
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          width: 100px;
        }
        div:nth-child(2) {
          width: 200px;
        }
        div:nth-child(3) {
          text-align: center;
        }
        div:nth-child(4) {
          width: 150px;
          text-align: center;
        }
      }
    }
    .info_content {
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 53px;
        height: 45px;
        cursor: pointer;
        background: #fcfcfc;
        div:nth-child(4) {
          width: 150px;
          text-align: center;
        }
        div:nth-child(1),
        div:nth-child(3),
        div:nth-child(4) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;

          color: #965ee5;
        }
        div:nth-child(2) {
          width: 200px;
        }
        div:nth-child(3) {
          text-align: center;
        }
        div {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 45px;
          color: #333333;
          width: 100px;
        }
      }
    }
  }
  .no_info {
    width: 1275px;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto -300px;
    img {
      width: 454px;
      height: 315px;
    }
    span {
      font-size: 34px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 45px;
      color: #3f3d56;
      margin-top: 50px;
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
