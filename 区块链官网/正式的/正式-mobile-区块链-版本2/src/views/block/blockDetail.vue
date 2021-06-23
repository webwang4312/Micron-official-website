<template>
  <div class="blockdetail">
    
    <div class="top">
      <span>{{ $t("blockdetail")[0] }}</span>
    </div>
    <ul class="detail_content">
      <li>
        <div>{{ $t("index")[0] }}:</div>
        <div>
          {{ height }}
        </div>
      </li>
      <li>
        <div>{{ $t("blockdetail")[1] }}:</div>
        <div>
          {{ blockNums }}
        </div>
      </li>
      <li>
        <div>{{ $t("block")[4] }}:</div>
        <div>
          {{ blockAward}}UENC
        </div>
      </li>
      <li>
        <div>{{ $t("blockdetail")[2] }}:</div>
        <div>
          {{ gasFees}}UENC
        </div>
      </li>
    </ul>
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
        <li v-for="item in tradeList" :key="item" class="info_content">
          <ul>
            <li>
              <div>
                {{ $t("blockdetail")[3] }}
              </div>
              <div>
                TX
                <span class="blue" @click="goToTransactionDetail(item.txhash2)">
                  {{ item.txhash }}
                </span>
              </div>
            </li>
            <li>
              <div>
                {{ $t("index")[9] }}
              </div>
              <div class="blue" @click="goToAddressDetail(item.fromAddress2)">
                {{ item.fromAddress }}
              </div>
            </li>
            <li>
              <div>
                {{ $t("index")[10] }}
              </div>
              <div class="blue" @click="goToAddressDetail(item.toAddress2)">
                {{ item.toAddress }}
              </div>
            </li>
            <li>
              <div>
                {{ $t("block")[3] }}
              </div>
              <div>
                {{ item.amount}}UENC
              </div>
            </li>
            <li>
              <div>
                {{ $t("block")[1] }}
              </div>
              <div>
                {{ item.tradeTime}}
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
              <div>{{ item.blockAward }}UENC</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="block_pagination" v-if="totalNum > 1">
      <div @click="pagesMinus()">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div>{{ blockmedianum }}-{{ totalNum }}</div>

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
 import { GETADDRESSDETAIL } from "@server/api.js";

export default {
  name: "block",
  data() {
    return {
      nowLang: "",
      // 分页
      blockmedianum: 1,
      internalCurrentPage: "",
      totalNum: "",
      shiyan: "",
      height: "",
      // 区块个数
      blockNums: "",
      // 区块奖励
      blockAward: "",
      // 燃料费
      gasFees: "",
      tradeList: [],
     
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.shiyan = this.$route.query.block;
    //console.log(this.$route.query.block);
    this.blockmedianum = 1;
    // this.blocklist();
    this.blocksearch();
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
      if (this.blockmedianum == 1) {
        this.$message({
          message: "已到底",
          type: "error",
        });
      } else {
        this.blockmedianum -= 1;
        this.blocksearch();
      }
    },
    pagesPlus() {
      this.blockmedianum += 1;
      // //console.log(this.medianum);
      this.blocksearch();
    },
    async blocksearch() {
      const res = await GETADDRESSDETAIL({
        type: "3",
        key: this.shiyan
        ,pageNum:'1',pageSize:'5'
      });
      // console.log(res);
      //  高度
      this.height = res.result.height;
      // 区块个数
      this.blockNums = res.result.blockNums;
      // 区块奖励
      this.blockAward = res.result.blockAward;
      // 燃料费
      this.gasFees = res.result.gasFees;
      this.tradeList = res.result.tradeList;
     
        for (var i = 0; i < res.result.tradeList.length; i++) {
          this.tradeList[i].txhash2 = this.tradeList[i].txhash;
          this.tradeList[i].txhash =
            this.tradeList[i].txhash.substring(0, 10) + "...";
          this.tradeList[i].fromAddress2 = this.tradeList[i].fromAddress;
          this.tradeList[i].fromAddress =
            this.tradeList[i].fromAddress.substring(0, 8) + "...";
          this.tradeList[i].toAddress2 = this.tradeList[i].toAddress;
          this.tradeList[i].toAddress =
            this.tradeList[i].toAddress.substring(0, 8) + "...";
          this.tradeList[i].tradeTime = this.timestampToTime(
            res.result.tradeList[i].tradeTime
          );
          console.log(this.tradeList[i].tradeTime);
        }
    },
    //获取MEDIA
    // async blocklist() {
    //   let that = this;
    //   var blockData = [];
    //   // var data = Qs.stringify({ pageNum: this.blockmedianum, pageSize: 20 });
    //   await that.$http
    //     .get("/get_block_list_for_all", {
    //       params: {
    //         pageNum: this.blockmedianum,
    //         pageSize: 20,
    //       },
    //     })
    //     .then((res) => {
    //       //console.log(res);
    //       this.totalNum = res.data[0].total_page[0].totalPageNum;
    //       //console.log(this.totalNum);
    //       if (this.nowLang == "cn") {
    //         for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
    //           var obj = {};
    //           let times = [];
    //           obj.block_height = res.data[0].block_list[i].block_height;
    //           let blocktime = res.data[0].block_list[i].block_time;
    //           // .substring(0, 13)
    //           // .valueOf();
    //           // console.log(blocktime);
    //           // 当前日期转时间戳
    //           let timestamp = res.data[0].timeStamp;
    //           // console.log(timestamp);
    //           // console.log(timestamp + "xianzai");
    //           let s = timestamp - blocktime; //9.20
    //           //  console.log(s+'相差');
    //           // console.log(s/86400000 + "天数");
    //           // console.log(parseInt(s/86400000*24*60) + "fenzhong");
    //           let fenzhong = parseInt((s / 86400) * 24 * 60);
    //           // console.log(fenzhong);
    //           if (fenzhong < 60) {
    //             if (fenzhong == 0) {
    //               times.push("刚刚");
    //             } else {
    //               times.push(parseInt(fenzhong) + "分钟前");
    //             }
    //             obj.block_time = times;
    //           }
    //           if (fenzhong >= 60 && fenzhong <= 1440) {
    //             times.push(parseInt(fenzhong / 60) + "小时前");
    //             obj.block_time = times;
    //           }
    //           if (fenzhong > 1440) {
    //             times.push(parseInt(fenzhong / 1440) + "天前");
    //             obj.block_time = times;
    //           }
    //           // obj.block_time = this.timestampToTime(
    //           //   Number(
    //           //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
    //           //   )
    //           // );
    //           obj.transaction_num = res.data[0].block_list[i].transaction_num;
    //           obj.transaction_amount =
    //             res.data[0].block_list[i].transaction_amount;
    //           obj.transaction_award =
    //             res.data[0].block_list[i].transaction_award;
    //           //console.log(obj);
    //           blockData[i] = obj;
    //           //console.log(blockData);
    //           this.blockData = blockData;
    //           //console.log(obj);
    //         }
    //       } else {
    //         for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
    //           var obj = {};
    //           let times = [];
    //           obj.block_height = res.data[0].block_list[i].block_height;
    //           let blocktime = res.data[0].block_list[i].block_time;
    //           // .substring(0, 13)
    //           // .valueOf();
    //           // console.log(blocktime);
    //           // 当前日期转时间戳
    //           let timestamp = res.data[0].timeStamp;
    //           // console.log(timestamp);
    //           // console.log(timestamp + "xianzai");
    //           let s = timestamp - blocktime; //9.20
    //           //  console.log(s+'相差');
    //           // console.log(s/86400000 + "天数");
    //           // console.log(parseInt(s/86400000*24*60) + "fenzhong");
    //           let fenzhong = parseInt((s / 86400) * 24 * 60);
    //           //  console.log(fenzhong);
    //           if (fenzhong < 60) {
    //             if (fenzhong == 0) {
    //               times.push("just");
    //             } else {
    //               times.push(parseInt(fenzhong) + "minutes ago");
    //             }
    //             obj.block_time = times;
    //           }
    //           if (fenzhong >= 60 && fenzhong <= 1440) {
    //             times.push(parseInt(fenzhong / 60) + "hour ago");
    //             obj.block_time = times;
    //           }
    //           if (fenzhong > 1440) {
    //             times.push(parseInt(fenzhong / 1440) + "days ago");
    //             obj.block_time = times;
    //           }
    //           // obj.block_time = this.timestampToTime(
    //           //   Number(
    //           //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
    //           //   )
    //           // );
    //           obj.transaction_num = res.data[0].block_list[i].transaction_num;
    //           obj.transaction_amount =
    //             res.data[0].block_list[i].transaction_amount;
    //           obj.transaction_award =
    //             res.data[0].block_list[i].transaction_award;
    //           //console.log(obj);
    //           blockData[i] = obj;
    //           //console.log(blockData);
    //           this.blockData = blockData;
    //           //console.log(obj);
    //         }
    //       }
    //     })
    //     .catch((e) => {});
    // },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
.blockdetail {
  height: auto;
  margin-bottom: 30px;
  .blue {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #965ee5 !important;
  }
  .top {
    width: 335px;
    height: 38px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 20px;
    color: #253551;
    display: flex;
    align-items: center;
    margin-top: 20px;
    // margin: 20px auto 0;
    span {
      margin-left: 20px;
    }
    img {
      width: 38px;
      height: 38px;
    }
  }
  .detail_content {
    width: 335px;
    height: 123px;
    background: #ffffff;

    margin: 0 20px;
    // padding: 0 30px;

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
  .block_info {
    width: 335px;
    height: auto;

    margin: 0 auto 31px;
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
          height: 228px;
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
