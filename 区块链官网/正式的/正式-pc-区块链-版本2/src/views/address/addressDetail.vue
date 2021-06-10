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
        <li>{{ info[0].search_wallect_balance[0].account_balance }}</li>
        <li>{{ info[0].ranking_and_transaction_num[0].transaction_num }}</li>
        <li>{{ info[0].total_income[0].total_income }}UENC</li>
        <li>{{ info[0].total_payout[0].total_payout }}UENC</li>
        <li>{{ info[0].ranking_and_transaction_num[0].ranking }}</li>
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
        <li v-for="item in transactionData" :key="item">
          <div @click="goToTransactionDetail(item.transaction_hash2)">
            {{ item.transaction_hash }}
          </div>
          <div>
            {{ item.time.toString() }}
          </div>
          <div @click="goToAddressDetail(item.from_address2)">
            {{ item.from_address }}
          </div>
          <div @click="goToAddressDetail(item.to_address2)">
            {{ item.to_address }}
          </div>
          <div>
            {{ item.amount }}
          </div>
          <div>
            {{ item.gas }}
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
import { GetAddressListDetail, GetAddressListDetail2 } from "@server/api.js";
export default {
  name: "addressdetail",
  inject: ["reload"],
  data() {
    return {
      nowLang: "",
      // 分页
      transmedianum: 1,
      internalCurrentPage: "",
      totalNum: "",
      shiyan: "",
      transactionData: [],
      info: {},
      have_list: Boolean,
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    // console.log(this.$route.query.address);
    this.shiyan = this.$route.query.address;
    this.transmedianum = 1;
    this.addresssearch();
    this.addressList();
  },

  // 页码设置
  watch: {},
  methods: {
    goToTransactionDetail(item) {
      this.$router.push({
        path: "/transactiondetail",

        query: {
          transaction_hash: item,
        },
      });
    },
    goToAddressDetail(item) {
      //console.log(item);
      this.shiyan = item;

      this.addresssearch();
    },
    pagesMinus() {
      if (this.transmedianum == 1) {
        this.$message({
          message: "已到底",
          type: "error",
        });
      } else {
        this.transmedianum -= 1;
        this.addresssearch();
      }
    },
    pagesPlus() {
      this.transmedianum += 1;
      // //console.log(this.medianum);
      this.addresssearch();
    },
    async addressList() {
      const res = await GetAddressListDetail2({
        wallet_address: this.shiyan,
      });
      // console.log(res);
      this.info = res;
      // console.log(this.info);
    },
    //地址搜索
    async addresssearch() {
      this.icon = true;
      let that = this;
      var blockData = [];
      const res = await GetAddressListDetail({
        wallet_address: this.shiyan,
        pageNum: this.transmedianum,
        pageSize: 20,
      });
      //console.log(res);
      this.totalNum = res[0].total_page[0].totalPageNum;
      if (this.totalNum !== 0) {
        this.have_list = true;
      } else {
        this.have_list = false;
      }
      var translist = res[0].search_transaction_list_for_walletAddress;
      //console.log(this.have_list);
      if (this.nowLang == "cn") {
        for (let i = 0; i < translist.length + 1; i++) {
          var obj = {};
          let date = [];
          let strdate = translist[i].time;
          let timestamp = Date.parse(new Date()) / 1000;
          let s = timestamp - strdate; //9.20
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          // console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              date.push("刚刚");
            } else {
              date.push(parseInt(fenzhong) + "分钟前");
            }
            obj.time = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "小时前");
            obj.time = date;
          }
          if (fenzhong > 1440) {
            date.push(this.timestampToTime(strdate));
            // date.push(parseInt(fenzhong / 1440) + "天前");
            obj.time = date;
          }
          // date.push(this.timestampToTime(Number(strdate)));
           obj.transaction_hash =
            translist[i].transaction_hash.substring(0, 10) + "...";
          obj.transaction_hash2 = translist[i].transaction_hash;
          obj.from_address2 = translist[i].from_address;
          obj.to_address2 = translist[i].to_address;
         
          // obj.time = this.timestampToTime(Number(strdate));
          obj.amount = translist[i].amount;
          if (
            translist[i].to_address == "0000000000000000000000000000000000" ||
            translist[i].pledge == "1"
          ) {
            // 从
            obj.from_address =
              translist[i].from_address.substring(0, 10) + "...";
            if (this.nowLang == "cn") {
              obj.to_address = "质押";
            } else {
              obj.to_address = "Pledge";
            }
          } else if (
            translist[i].from_address == translist[i].to_address ||
            translist[i].redeem == "1"
          ) {
            if (this.nowLang == "cn") {
              // 从
              obj.from_address = "质押";
            } else {
              obj.from_address = "Pledge";
            }
            // 至
            obj.to_address = translist[i].to_address.substring(0, 10) + "...";
          } else {
            obj.from_address =
              translist[i].from_address.substring(0, 10) + "...";
            obj.to_address = translist[i].to_address.substring(0, 10) + "...";
          }
          // obj.to_address = translist[i].to_address.substring(0, 10) + "...";
          obj.gas = translist[i].gas;
          // console.log(obj);
          blockData[i] = obj;
          //console.log(blockData);
          this.transactionData = blockData;
          // console.log(obj);
          // console.log(this.transactionData);
        }
      } else {
        for (let i = 0; i < translist.length + 1; i++) {
          var obj = {};
          let date = [];
          let strdate = translist[i].time;
          let timestamp = Date.parse(new Date()) / 1000;
          let s = timestamp - strdate; //9.20
          let fenzhong = parseInt((s / 86400) * 24 * 60);
          // console.log(fenzhong);
          if (fenzhong < 60) {
            if (fenzhong == 0) {
              date.push("just");
            } else {
              date.push(parseInt(fenzhong) + "minutes ago");
            }
            obj.time = date;
          }
          if (fenzhong >= 60 && fenzhong <= 1440) {
            date.push(parseInt(fenzhong / 60) + "hour ago");
            obj.time = date;
          }
          if (fenzhong > 1440) {
            date.push(this.timestampToTime(strdate));
            // date.push(parseInt(fenzhong / 1440) + "days ago");
            obj.time = date;
          }
          // date.push(this.timestampToTime(Number(strdate)));
          obj.transaction_hash2 = translist[i].transaction_hash;
          obj.from_address2 = translist[i].from_address;

          obj.to_address2 = translist[i].to_address;
          obj.transaction_hash =
            translist[i].transaction_hash.substring(0, 10) + "...";
          // obj.time = this.timestampToTime(Number(strdate));
          obj.amount = translist[i].amount;
          obj.from_address = translist[i].from_address.substring(0, 10) + "...";
          obj.to_address = translist[i].to_address.substring(0, 10) + "...";
          obj.gas = translist[i].gas;
          // console.log(obj);
          blockData[i] = obj;
          //console.log(blockData);
          this.transactionData = blockData;
          // console.log(obj);
          // console.log(this.transactionData);
        }
      }
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      if (Y == "2021-") {
        Y = "";
      } else {
        Y = date.getFullYear() + "-";
      }
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-";

      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds();
      return Y + M + D + h + m;
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
  height: auto;
  margin-bottom: 373px;
  .top {
    width: 1275px;
    height: 38px;
    font-size: 23px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 38px;
    color: #000000;
    margin: 31px auto 22px;
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
    background: gainsboro;
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
    background: #ffffff;
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
