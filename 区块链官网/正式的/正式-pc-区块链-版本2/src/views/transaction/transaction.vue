<template>
  <div class="transaction">
    <div class="top">
      <img src="@assets/images/second/交易列表@2x.png" alt="" />
      <span>交易列表</span>
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
          <div> {{ $t("blockdetail")[2] }}</div>
          <div>{{ $t("block")[4] }}</div>
        </li>
      </ul>
      <ul  class="info_content">
        <li v-for="item in transactionData" :key="item">
          <div @click="goToTransactionDetail(item.transaction_hash2)">
            {{ item.transaction_hash }}
          </div>
          <div>
            {{ item.transaction_time.toString() }}
          </div>
          <div>
            {{ item.from_address }}
          </div>
          <div>
            {{ item.to_address }}
          </div>
          <div>
            {{ item.transaction_amount }}
          </div>
          <div>
            {{ item.gas }}
          </div>
          <div>
            {{ item.transaction_amount }}
          </div>
        </li>
      </ul>
    </div>
    <div class="block_pagination">
      <div  @click="pagesMinus()">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div>{{transmedianum }}-{{ totalNum }}</div>

      <div @click="pagesPlus()">
        <i class="el-icon-arrow-right" ></i>
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
import { GetTransactionList } from "@server/api.js";
export default {
  name: "block",
  data() {
    return {
      nowLang: "",

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
       const res = await GetTransactionList({
        pageNum: this.transmedianum,
        pageSize: 20,
      });
      // var data = Qs.stringify({ pageNum: this.transmedianum, pageSize: 20 });
          // console.log(res)
          // console.log(res);
          // 取得页数总数
          this.totalNum = res[0].total_page[0].totalPageNum;
          // console.log(this.totalNum);
          // table赋值
          if (this.nowLang == "cn") {
            for (
              let i = 0;
              i < res[0].transaction_list_results.length + 1;
              i++
            ) {
              var obj = {};
              let times = [];
              //console.log(res[0].transaction_hash);
              // console.log(res[0].from_address);
              obj.transaction_hash2 =
                res[0].transaction_list_results[i].transaction_hash;
              obj.transaction_hash =
                res[0].transaction_list_results[
                  i
                ].transaction_hash.substring(0, 10) + "...";
              let blocktime =
                res[0].transaction_list_results[i].transaction_time;
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res[0].timeStamp;
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
                times.push(parseInt(fenzhong / 1440) + "天前");
                obj.transaction_time = times;
              }
              // obj.transaction_time = this.timestampToTime(
              //   Number(
              //     res[0].transaction_list_results[i].transaction_time
              //       .substring(0, 13)
              //       .valueOf()
              //   )
              // );
              obj.transaction_amount =
                res[0].transaction_list_results[i].transaction_amount;
              obj.from_address =
                res[0].transaction_list_results[i].from_address.substring(
                  0,
                  10
                ) + "...";
              // toaddress质押处理
              if (
                res[0].transaction_list_results[i].to_address ==
                  "0000000000000000000000000000000000" ||
                res[0].transaction_list_results[i].pledge == "1"
              ) {
                // 从
                obj.from_address =
                  res[0].transaction_list_results[
                    i
                  ].from_address.substring(0, 10) + "...";
                if (this.nowLang == "cn") {
                  obj.to_address = "质押";
                } else {
                  obj.to_address = "Pledge";
                }
              } else if (
                res[0].transaction_list_results[i].from_address ==
                  res[0].transaction_list_results[i].to_address ||
                res[0].transaction_list_results[i].redeem == "1"
              ) {
                if (this.nowLang == "cn") {
                  // 从
                  obj.from_address = "质押";
                } else {
                  obj.from_address = "Pledge";
                }
                // 至
                obj.to_address =
                  res[0].transaction_list_results[i].to_address.substring(
                    0,
                    10
                  ) + "...";
              } else {
                obj.from_address =
                  res[0].transaction_list_results[
                    i
                  ].from_address.substring(0, 10) + "...";
                obj.to_address =
                  res[0].transaction_list_results[i].to_address.substring(
                    0,
                    10
                  ) + "...";
              }

              obj.gas = res[0].transaction_list_results[i].gas;
              // console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.transactionData = blockData;
              //console.log(obj);
              //console.log(this.transactionData);
            }
          } else {
            for (
              let i = 0;
              i < res[0].transaction_list_results.length + 1;
              i++
            ) {
              var obj = {};
              let times = [];
              //console.log(res[0].transaction_hash);
              // console.log(res[0].from_address);
              obj.transaction_hash2 =
                res[0].transaction_list_results[i].transaction_hash;
              obj.transaction_hash =
                res[0].transaction_list_results[
                  i
                ].transaction_hash.substring(0, 10) + "...";
              let blocktime =
                res[0].transaction_list_results[i].transaction_time;
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res[0].timeStamp;
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
                times.push(parseInt(fenzhong / 1440) + "days ago");
                obj.transaction_time = times;
              }
              // obj.transaction_time = this.timestampToTime(
              //   Number(
              //     res[0].transaction_list_results[i].transaction_time
              //       .substring(0, 13)
              //       .valueOf()
              //   )
              // );
              obj.transaction_amount =
                res[0].transaction_list_results[i].transaction_amount;
              obj.from_address =
                res[0].transaction_list_results[i].from_address.substring(
                  0,
                  10
                ) + "...";
              obj.to_address =
                res[0].transaction_list_results[i].to_address.substring(
                  0,
                  10
                ) + "...";
              obj.gas = res[0].transaction_list_results[i].gas;
              // console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.transactionData = blockData;
              //console.log(obj);
              //console.log(this.transactionData);
            }
          }

          // 取得列表信息
          this.medialist = res.data.result.list;
          //console.log(this.medialist);
          // 截取字符串长度16字符
          // for (let i = 0; i < this.medialist.length; i++) {
          //   if (this.medialist[i].title.length > 16) {
          //     this.medialist[i].title =
          //       this.medialist[i].title.substring(0, 16) + "...";
          //   } else {
          //   }
          // }
        
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
.transaction {
  background: #f9fafd;
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
     background: #FCFCFC;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 1;
    border-radius: 11px;
    margin: 0 auto 31px;
    .info_title {
      height: 75px;
      line-height: 75px;
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
          width: 148px;
        }
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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 53px;
        height: 45px;
        cursor: pointer;
        background: #fcfcfc;
        div:nth-child(1) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;

          color: #965EE5;
        }

        div {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 45px;
          color: #333333;
          width: 148px;
        }
      }
    }
  }
  .block_pagination {
    width: 1275px;
    height: 37px;
    background: #ffffff;
    margin: 0 auto 128px;

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
background: #FFFFFF;
border: 1px solid #EDF1F6;
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
