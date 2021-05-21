<template>
  <div class="block">
    <div class="top">
      <img src="@assets/images/second/footer/组 33.png" alt="" />
      <span> {{ $t("block")[0] }}</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li>
          <div>
           {{ $t("index")[0] }}
          </div>
          <div>{{ $t("block")[1] }}</div>
          <div>{{ $t("block")[2] }}</div>
          <div>
           {{ $t("block")[3] }}
          </div>
          <div>{{ $t("block")[4] }}</div>
        </li>
      </ul>
      <ul class="info_content">
        <li v-for="item in blockData" :key="item">
          <div @click="goToBlockDetail(item.block_height)">
            {{ item.block_height }}
          </div>
          <div>
            {{ item.block_time.toString() }}
          </div>
          <div>
            {{ item.transaction_num }}
          </div>
          <div>
            {{ item.transaction_amount }}
          </div>
          <div>
            {{ item.transaction_award }}
          </div>
        </li>
      </ul>
    </div>
    <div class="block_pagination">
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
var qs = require("qs");
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
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.blockmedianum = 1;
     this.blocklist();
    // this.search();
  },

  // 页码设置
  watch: {},
  methods: {
    // search() {
    //   let that = this;
    //   that.$http
    //     .post(`/api`, {
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       jsonrpc: "2.0",
    //       method: "get_balance",
    //       id: "1",
    //       params: { address: "1KVZpXbAg64PCxf2HVLnMZCo7R91PTYHgp" },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },
    goToBlockDetail(item) {
      this.$router.push({
        path: "/blockdetail",

        query: {
          block: item,
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
        this.blocklist();
      }
    },
    pagesPlus() {
      this.blockmedianum += 1;
      // //console.log(this.medianum);
      this.blocklist();
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
.block {
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
    background: #ffffff;
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
          width: 160px;
        }
        div:nth-child(3) {
          text-align: center;
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
       
        div:nth-child(1) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;

          color: #965ee5;
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
