<template>
  <div class="transaction">
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
              <div class="blue" @click="goToAddressDetail(item.from_address2)">
                {{ item.from_address }}
              </div>
            </li>
            <li>
              <div>
               {{ $t("index")[10] }}
              </div>
              <div
                v-if="item.to_address == '质押' || item.to_address == 'Pledge'"
              >
                {{ item.to_address }}
              </div>
              <div
                v-else
                class="blue"
                @click="goToAddressDetail(item.to_address2)"
              >
                {{ item.to_address }}
              </div>
            </li>
            <li>
              <div>
              {{ $t("block")[3] }}
              </div>
              <div>
                {{ item.transaction_amount }}
              </div>
            </li>
            <li>
              <div>
               {{ $t("block")[1] }}
              </div>
              <div>
                {{ item.transaction_time.toString() }}
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
            <li>
              <div>
              {{ $t("block")[4] }}
              </div>
              <div>
                {{ item.transaction_amount }}
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
export default {
  name: "block",
  data() {
    return {
      nowLang: "",
      loading: true,
      // 分页
      transmedianum: 1,
      totalNum: "",
      transactionData: [],
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
          transaction_hash: item,
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
        this.transactionlist();
      }
    },
    pagesPlus() {
      this.transmedianum += 1;
      // //console.log(this.medianum);
      this.transactionlist();
    },
    //获取MEDIA
    async transactionlist() {
      let that = this;
      var blockData = [];
      // var data = Qs.stringify({ pageNum: this.transmedianum, pageSize: 20 });
      await that.$http
        .get("/search_transaction_list_all", {
          params: {
            pageNum: this.transmedianum,
            pageSize: 20,
          },
        })
        .then((res) => {
          //console.log(res);
          this.loading = false;
          // 取得页数总数
          this.totalNum = res.data[0].total_page[0].totalPageNum;
          // console.log(this.totalNum);
          // table赋值
          switch (this.nowLang) {
            case "cn":
              for (
                let i = 0;
                i < res.data[0].transaction_list_results.length + 1;
                i++
              ) {
                var obj = {};
                let times = [];
                //console.log(res.data[0].transaction_hash);
                // console.log(res.data[0].from_address);
                obj.transaction_hash2 =
                  res.data[0].transaction_list_results[i].transaction_hash;
                obj.transaction_hash =
                  res.data[0].transaction_list_results[
                    i
                  ].transaction_hash.substring(0, 10) + "...";
                let blocktime =
                  res.data[0].transaction_list_results[i].transaction_time;
                // console.log(blocktime);
                // 当前日期转时间戳
                let timestamp = res.data[0].timeStamp;
                // console.log(timestamp);
                // console.log(timestamp + "xianzai");
                let s = timestamp - blocktime; //9.20
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
                  obj.transaction_time = times;
                }
                if (fenzhong >= 60 && fenzhong <= 1440) {
                  times.push(parseInt(fenzhong / 60) + "小时前");
                  obj.transaction_time = times;
                }
                if (fenzhong > 1440) {
                  // times.push(parseInt(fenzhong / 1440) + "天前");
                  times.push(this.timestampToTime(blocktime)); //2014-06-18 10:33:24)
                  // obj.transaction_time = times;
                  obj.transaction_time = times;
                }

                obj.transaction_amount =
                  res.data[0].transaction_list_results[i].transaction_amount;
                obj.from_address =
                  res.data[0].transaction_list_results[
                    i
                  ].from_address.substring(0, 10) + "...";
                obj.from_address2 =
                  res.data[0].transaction_list_results[i].from_address;
                // toaddress质押处理
                if (
                  res.data[0].transaction_list_results[i].to_address ==
                    "0000000000000000000000000000000000" ||
                  res.data[0].transaction_list_results[i].pledge == "1"
                ) {
                  // 从
                  obj.from_address =
                    res.data[0].transaction_list_results[
                      i
                    ].from_address.substring(0, 10) + "...";
                  obj.from_address2 =
                    res.data[0].transaction_list_results[i].from_address;
                  if (this.nowLang == "cn") {
                    obj.to_address = "质押";
                  } else {
                    obj.to_address = "Pledge";
                  }
                } else if (
                  res.data[0].transaction_list_results[i].from_address ==
                    res.data[0].transaction_list_results[i].to_address ||
                  res.data[0].transaction_list_results[i].redeem == "1"
                ) {
                  if (this.nowLang == "cn") {
                    // 从
                    obj.from_address = "质押";
                  } else {
                    obj.from_address = "Pledge";
                  }
                  // 至
                  obj.to_address =
                    res.data[0].transaction_list_results[
                      i
                    ].to_address.substring(0, 10) + "...";
                  obj.to_address2 =
                    res.data[0].transaction_list_results[i].to_address;
                } else {
                  obj.from_address =
                    res.data[0].transaction_list_results[
                      i
                    ].from_address.substring(0, 10) + "...";
                  obj.from_address2 =
                    res.data[0].transaction_list_results[i].from_address;
                  obj.to_address =
                    res.data[0].transaction_list_results[
                      i
                    ].to_address.substring(0, 10) + "...";
                  obj.to_address2 =
                    res.data[0].transaction_list_results[i].to_address;
                }

                obj.gas = res.data[0].transaction_list_results[i].gas;
                // console.log(obj);
                blockData[i] = obj;
                //console.log(blockData);
                this.transactionData = blockData;
                //console.log(obj);
                //console.log(this.transactionData);
              }
              break;
            case "en":
              for (
                let i = 0;
                i < res.data[0].transaction_list_results.length + 1;
                i++
              ) {
                var obj = {};
                let times = [];
                //console.log(res.data[0].transaction_hash);
                // console.log(res.data[0].from_address);
                obj.transaction_hash2 =
                  res.data[0].transaction_list_results[i].transaction_hash;
                obj.transaction_hash =
                  res.data[0].transaction_list_results[
                    i
                  ].transaction_hash.substring(0, 10) + "...";
                let blocktime =
                  res.data[0].transaction_list_results[i].transaction_time;
                // console.log(blocktime);
                // 当前日期转时间戳
                let timestamp = res.data[0].timeStamp;
                // console.log(timestamp + "xianzai");
                let s = timestamp - blocktime; //9.20
                // console.log(s+'相差');
                // console.log(s/86400000 + "天数");
                // console.log(parseInt(s/86400000*24*60) + "fenzhong");
                let fenzhong = parseInt((s / 86400) * 24 * 60);
                // console.log(fenzhong);
                if (fenzhong < 60) {
                  if (fenzhong == 0) {
                    times.push("just");
                  } else {
                    times.push(parseInt(fenzhong) + "minutes ago");
                  }
                  obj.transaction_time = times;
                }
                if (fenzhong >= 60 && fenzhong <= 1440) {
                  times.push(parseInt(fenzhong / 60) + "hour ago");
                  obj.transaction_time = times;
                }
                if (fenzhong > 1440) {
                  times.push(this.timestampToTime(blocktime)); //2014-06-18 10:33:24)
                  // times.push(parseInt(fenzhong / 1440) + "days ago");
                  obj.transaction_time = times;
                }
                // obj.transaction_time = this.timestampToTime(
                //   Number(
                //     res.data[0].transaction_list_results[i].transaction_time
                //       .substring(0, 13)
                //       .valueOf()
                //   )
                // );
                obj.transaction_amount =
                  res.data[0].transaction_list_results[i].transaction_amount;
                obj.from_address =
                  res.data[0].transaction_list_results[
                    i
                  ].from_address.substring(0, 10) + "...";
                obj.from_address2 =
                  res.data[0].transaction_list_results[i].from_address;
                obj.to_address =
                  res.data[0].transaction_list_results[i].to_address.substring(
                    0,
                    10
                  ) + "...";
                obj.to_address2 =
                  res.data[0].transaction_list_results[i].to_address;
                obj.gas = res.data[0].transaction_list_results[i].gas;
                // console.log(obj);
                blockData[i] = obj;
                //console.log(blockData);
                this.transactionData = blockData;
                //console.log(obj);
                //console.log(this.transactionData);
              }
              break;
            default:
          }

          // 取得列表信息
          this.medialist = res.data.result.list;
        })
        .catch((e) => {});
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
