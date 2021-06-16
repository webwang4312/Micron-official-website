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
            {{ info[0].search_wallect_balance[0].account_balance }}
          </div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[2] }}:</div>
          <div>
            {{ info[0].ranking_and_transaction_num[0].transaction_num }}
          </div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[3] }}:</div>
          <div>{{ info[0].total_income[0].total_income }}UENC</div>
        </li>
        <li>
          <div>{{ $t("addressdetail")[4] }}:</div>
          <div>{{ info[0].total_payout[0].total_payout }}UENC</div>
        </li>
        <li>
          <div>{{ $t("address")[1] }}:</div>
          <div>
            {{ info[0].ranking_and_transaction_num[0].ranking }}
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
        <li v-for="item in transactionData" :key="item" class="info_content">
          <ul>
            <li>
              <div>
                {{ $t("blockdetail")[3] }}
              </div>
              <div @click="goToTransactionDetail(item.transaction_hash2)">
                TX
                <span class="blue">
                  {{ item.transaction_hash }}
                </span>
              </div>
            </li>
            <li>
              <div>
                {{ $t("index")[9] }}
              </div>
              <div @click="goToAddressDetail(item.from_address2)" class="blue">
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
                {{ item.time.toString() }}
              </div>
            </li>
            <li>
              <div>
                {{ $t("blockdetail")[2] }}
              </div>
              <div>
                {{ item.gas }}
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
import { GetAddressListDetail, GetAddressListDetail2 } from "@server/api.js";
var qs = require("qs");
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
      yue: "",
      transactionData: [],
      info: {},
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
    // this.search();
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
      this.shiyan = item;

      this.addresssearch();
      this.addressList();
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
         window.scrollTo(0,0);
        this.transmedianum -= 1;
        this.addresssearch();
        this.addressList();
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
        window.scrollTo(0,0);
        this.transmedianum += 1;
        this.addresssearch();
        this.addressList();
      }
    },
    search() {
      let that = this;
      that.$http
        .post(
          `/api`,
          {
            headers: {
              "content-type": "application/json",
            },
          },

          qs.stringify({
            jsonrpc: "2.0",
            method: "get_balance",
            id: 1,
            params: { address: this.shiyan },
          })
        )
        .then((res) => {
          console.log(res);
        });
    },
    async addressList() {
      await this.$http
        .get(GetAddressListDetail2, {
          params: {
            wallet_address: this.shiyan,
          },
        })
        .then((res) => {
          // console.log(res);
          this.info = res.data;
          console.log(this.info);
        });
      // console.log(res);

      // console.log(this.info);
    },
    //地址搜索
    async addresssearch() {
      let that = this;
      var blockData = [];
      await that.$http
        .get(GetAddressListDetail, {
          params: {
            wallet_address: this.shiyan,
            pageNum: this.transmedianum,
            pageSize: 5,
          },
        })
        .then((res) => {
          // console.log(res);
          // this.loading = false;
          //console.log(res);
          // 余额
          this.yue =
            res.data[0].search_wallet_balance_for_walletAddress[0]
              .account_balance + "\n\nUENC";
          // 总条数
          this.totalNum = res.data[0].total_page[0].totalPageNum;
          //交易列表信息
          var translist = res.data[0].search_transaction_list_for_walletAddress;
          switch (this.$i18n.locale) {
            case "en":
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
                  date.push(parseInt(fenzhong / 1440) + "days ago");
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
                obj.from_address =
                  translist[i].from_address.substring(0, 10) + "...";
                obj.to_address =
                  translist[i].to_address.substring(0, 10) + "...";
                obj.gas = translist[i].gas;
                // console.log(obj);
                blockData[i] = obj;
                //console.log(blockData);
                this.transactionData = blockData;
                // console.log(obj);
                // console.log(this.transactionData);
              }
              break;
            case "cn":
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
                  date.push(parseInt(fenzhong / 1440) + "天前");
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
                if (
                  translist[i].to_address ==
                    "0000000000000000000000000000000000" ||
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
                  obj.to_address =
                    translist[i].to_address.substring(0, 10) + "...";
                } else {
                  obj.from_address =
                    translist[i].from_address.substring(0, 10) + "...";
                  obj.to_address =
                    translist[i].to_address.substring(0, 10) + "...";
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
              break;
            default:
          }
        })
        .catch((e) => {});
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
  font-size: 17px;
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
          height: 200px;
          padding: 10px 0;
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
