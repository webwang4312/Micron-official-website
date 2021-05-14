<template>
  <div class="blockdetail">
    <div
      style="width: 375px;
height: 10px;
background: #F8F8F8;
opacity: 1;"
    ></div>
    <div class="top">
      <span>区块详情</span>
    </div>
    <ul class="detail_content">
      <li>
        <div>
          区块高度:
        </div>
        <div>
          {{ datalist[0].block_height }}
        </div>
      </li>
      <li>
        <div>
          区块个数:
        </div>
        <div>
          {{ datalist[0].transaction_num }}
        </div>
      </li>
      <li>
        <div>
          区块奖励:
        </div>
        <div>
          {{ datalist[0].transaction_award }}
        </div>
      </li>
      <li>
        <div>
          燃料费:
        </div>
        <div>
          4UENC
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
      <span>交易列表</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li v-for="item in blockData" :key="item" class="info_content">
          <ul>
            <li>
              <div>
               
                交易哈希
              </div>
              <div>
                 TX
               <span class="blue">
  {{ item.block_height }}
               </span>
              
              </div>
            </li>
            <li>
              <div>
                从
              </div>
              <div class="blue">
                {{ item.block_height }}
              </div>
            </li>
            <li>
              <div >
                到
              </div>
              <div class="blue">
                {{ item.block_height }}
              </div>
              
            </li>
            <li>
              <div>
                交易额
              </div>
              <div>
                {{ item.transaction_amount }}
              </div>
            </li>
            <li>
              <div>
                时间
              </div>
              <div>
                {{ item.block_time.toString() }}
              </div>
            </li>
            <li>
              <div>
                燃料费
              </div>
              <div>
                {{ item.transaction_award }}
              </div>
            </li>
            <li>
              <div>
                区块奖励
              </div>
              <div> {{ item.transaction_award }}</div>
             
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
export default {
  name: "block",
  data() {
    return {
      nowLang: "",

      // 分页
      blockmedianum: 1,
      internalCurrentPage: "",
      totalNum: "",
      blockData: [],
      shiyan: "",
      datalist: [
        {
          block_height: "", //高度
          transaction_award: "", // 区块奖励
          transaction_num: "", // 交易笔数
          transaction_amount: "", // 交易总额
        },
      ],
    };
  },
  components: {},
  created() {
   this.nowLang = this.$i18n.locale;
    this.shiyan = this.$route.query.block;
    //console.log(this.$route.query.block);
    this.blockmedianum = 1;
    this.blocklist();
    this.blocksearch();
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
      this.icon = true;
      let that = this;
      var blockData = [];
      await that.$http
        .get("/search_blockHeight_for_height", {
          params: {
            block_height: this.shiyan,
            pageNum: this.blockmedianum,
            pageSize: 20,
          },
        })
        .then((res) => {
          //console.log(res);
          this.totalNum = res.data[0].total_page[0].totalPageNum;

          // 高度
          this.datalist[0].block_height =
            res.data[0].block_height[0].block_height;
          // 区块奖励
          this.datalist[0].transaction_award =
            res.data[0].block_height[0].block_award;
          // 交易笔数
          this.datalist[0].transaction_num = res.data[0].block_height[0].tx_num;
          // 交易总额
          this.datalist[0].transaction_amount = res.data[0].block_height[0].transaction_amount.toLocaleString();
          // table赋值
          //console.log(res.data[0].block_list.length);
          for (let i = 0; i < res.data[0].block_list.length + 1; i++) {
            var obj = {};
            //console.log(res.data[0].transaction_hash);
            //console.log(res.data[0].from_address);
            obj.block_hash2 = res.data[0].block_list[i].block_hash;
            obj.block_hash =
              res.data[0].block_list[i].block_hash.substring(0, 10) + "...";
            obj.time = this.timestampToTime(
              Number(res.data[0].block_list[i].time)
            );

            obj.transaction_amount =
              res.data[0].block_list[i].transaction_amount;
            if (
              res.data[0].block_list[i].to_address ==
                "0000000000000000000000000000000000" ||
              res.data[0].block_list[i].pledge == "1"
            ) {
              // 从
              obj.from_address =
                res.data[0].block_list[i].from_address.substring(0, 10) + "...";
              if (this.nowLang == "cn") {
                obj.to_address = "质押";
              } else {
                obj.to_address = "Pledge";
              }
            } else if (
              res.data[0].block_list[i].from_address ==
                res.data[0].block_list[i].to_address ||
              res.data[0].block_list[i].redeem == "1"
            ) {
              if (this.nowLang == "cn") {
                // 从
                obj.from_address = "质押";
              } else {
                obj.from_address = "Pledge";
              }
              // 至
              obj.to_address =
                res.data[0].block_list[i].to_address.substring(0, 10) + "...";
            } else {
              obj.from_address =
                res.data[0].block_list[i].from_address.substring(0, 10) + "...";
              obj.to_address =
                res.data[0].block_list[i].to_address.substring(0, 10) + "...";
            }
            obj.gas = res.data[0].block_list[i].gas;
            // console.log(obj);
            blockData[i] = obj;
            //console.log(blockData);
            this.detailData = blockData;
            //console.log(obj);
            //console.log(this.transactionData);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //获取MEDIA
    async blocklist() {
      let that = this;
      var blockData = [];
      // var data = Qs.stringify({ pageNum: this.blockmedianum, pageSize: 20 });
      await that.$http
        .get("/get_block_list_for_all", {
          params: {
            pageNum: this.blockmedianum,
            pageSize: 20,
          },
        })
        .then((res) => {
          //console.log(res);
          this.totalNum = res.data[0].total_page[0].totalPageNum;
          //console.log(this.totalNum);
          if (this.nowLang == "cn") {
            for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
              var obj = {};
              let times = [];
              obj.block_height = res.data[0].block_list[i].block_height;
              let blocktime = res.data[0].block_list[i].block_time;
              // .substring(0, 13)
              // .valueOf();
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res.data[0].timeStamp;
              // console.log(timestamp);
              // console.log(timestamp + "xianzai");
              let s = timestamp - blocktime; //9.20
              //  console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              // console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  times.push("刚刚");
                } else {
                  times.push(parseInt(fenzhong) + "分钟前");
                }
                obj.block_time = times;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "小时前");
                obj.block_time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "天前");
                obj.block_time = times;
              }
              // obj.block_time = this.timestampToTime(
              //   Number(
              //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
              //   )
              // );
              obj.transaction_num = res.data[0].block_list[i].transaction_num;
              obj.transaction_amount =
                res.data[0].block_list[i].transaction_amount;
              obj.transaction_award =
                res.data[0].block_list[i].transaction_award;
              //console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.blockData = blockData;
              //console.log(obj);
            }
          } else {
            for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
              var obj = {};
              let times = [];
              obj.block_height = res.data[0].block_list[i].block_height;
              let blocktime = res.data[0].block_list[i].block_time;
              // .substring(0, 13)
              // .valueOf();
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res.data[0].timeStamp;
              // console.log(timestamp);
              // console.log(timestamp + "xianzai");
              let s = timestamp - blocktime; //9.20
              //  console.log(s+'相差');
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
                obj.block_time = times;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "hour ago");
                obj.block_time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "days ago");
                obj.block_time = times;
              }
              // obj.block_time = this.timestampToTime(
              //   Number(
              //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
              //   )
              // );
              obj.transaction_num = res.data[0].block_list[i].transaction_num;
              obj.transaction_amount =
                res.data[0].block_list[i].transaction_amount;
              obj.transaction_award =
                res.data[0].block_list[i].transaction_award;
              //console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.blockData = blockData;
              //console.log(obj);
            }
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
.blockdetail {
  height: auto;
  margin-bottom: 30px;
  .blue {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #5583ff !important;
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
      margin-left: 20px;
    }
    img {
      width: 38px;
      height: 38px;
    }
  }
  .detail_content {
    width: 343px;
    height: 123px;
    background: #ffffff;

    margin: 0 auto;
    padding: 0 20px;

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
    width: 343px;
    height: auto;
   

    margin: 0 auto 31px;
    .info_title {
      margin: 0 20px;
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
    padding: 0 20px;
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
    //     color: #5583ff;
    //     border: 1px solid #5583ff;

    //     border-radius: 6px;
    //     background-color: #ffffff !important;
    //   }
    // }
  }
}
</style>
