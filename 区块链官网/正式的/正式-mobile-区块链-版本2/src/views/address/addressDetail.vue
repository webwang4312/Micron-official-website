<template>
  <div class="addressdetail">
    <div
      style="width: 375px;
height: 10px;
background: #F8F8F8;
opacity: 1;"
    ></div>
    <div class="top">
      <span>{{ $t("addressdetail")[0] }}</span>
    </div>
    <div class="detail_content">
      <ul>
        <li>
          <div>{{ $t("address")[2] }}:</div>
          <div class="blue">
            {{ shiyan }}
          </div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[1] }}:</div>
          <div>
            {{ balance }}
          </div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[2] }}:</div>
          <div>
            {{ tradeNums }}
          </div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[3] }}:</div>
          <div>{{ income }}UENC</div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[4] }}:</div>
          <div>{{ pay }}UENC</div>
        </li>
        <li>
          <div>{{ $t("address")[1] }}:</div>
          <div>
            {{ rank }}
          </div>
        </li>
      </ul>
    </div>
    <div
      style="width: 375px;
height: 10px;
background: #F8F8F8;
opacity: 1;"
    ></div>
    <div class="top">
      <span>{{ $t("blockdetail")[4] }}</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li v-for="item in detailList" :key="item" class="info_content">
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
              <div @click="goToAddressDetail(item.fromAddress2)" class="blue">
                {{ item.fromAddress }}
              </div>
            </li>
            <li>
              <div>
                {{ $t("index")[10] }}
              </div>
              <div @click="goToAddressDetail(item.toAddress2)" class="blue">
                {{ item.toAddress }}
              </div>
            </li>
            <li>
              <div>
                {{ $t("block")[3] }}
              </div>
              <div>
                {{ item.amount }}
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
                {{ item.gasFees }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
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
    // this.search();
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
      this.shiyan = item;
      window.scrollTo(0, 0);
      this.addressSearch();
    },
    pagesMinus() {
      if (this.transmedianum == 1) {
        if (this.nowLang == "cn") {
          this.$message({
            message: "已到底",
            type: "error",
          });
        } else {
          this.$message({
            message: "Last",
            type: "error",
          });
        }
      } else {
        window.scrollTo(0, 0);
        this.transmedianum -= 1;

        this.pageList();
      }
    },
    pagesPlus() {
      if (this.transmedianum == this.totalNum) {
        if (this.nowLang == "cn") {
          this.$message({
            message: "已到顶",
            type: "error",
          });
        } else {
          this.$message({
            message: "Last",
            type: "error",
          });
        }
      } else {
        window.scrollTo(0, 0);
        this.transmedianum += 1;

        this.pageList();
      }
    },

    async pageList() {
      const res = await GETADDRESSDETAIL2({
        address: this.walletAddress,
        pageNum: this.transmedianum,
        pageSize: 5,
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
          // console.log(Date.parse(new Date()));
          let timestamp = Date.parse(new Date()) / 1000;
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
          // console.log(Date.parse(new Date()));
          let timestamp = Date.parse(new Date()) / 1000;

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
    //地址搜索
    async addressSearch() {
      const res = await GETADDRESSDETAIL({
        type: "1",
        key: this.shiyan,
        pageNum: '1',
        pageSize:'5',
      });
      // console.log(res);
      this.totalNum = Math.ceil(res.result.detailCount / 5);

      //  console.log(this.totalNum);
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
          // console.log(Date.parse(new Date()));
          let timestamp = Date.parse(new Date()) / 1000;

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
          // console.log(Date.parse(new Date()));
          let timestamp = Date.parse(new Date()) / 1000;

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
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
.blue {
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 22px;
  color: #965ee5 !important;
}

.addressdetail {
  height: auto;
  margin: 0 auto 60px;
  z-index: 1;
  .top {
    width: 343px;

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
  .detail_content {
    width: 343px;
    height: auto;
    background: #ffffff;
    margin: 0 auto;
    padding: 0 0px 20px;

    ul {
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
          width: 200px;
          word-wrap: break-word;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 18px;
          color: #253551;
        }
      }
    }
  }
  .block_info {
    width: 343px;
    height: auto;
    background: #ffffff;
    margin: 0 auto;
    z-index: 1;
    .info_title {
      margin: 0 0px;
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
          padding-bottom: 20px;
          border-bottom: 1px solid #b2b2b2;
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
