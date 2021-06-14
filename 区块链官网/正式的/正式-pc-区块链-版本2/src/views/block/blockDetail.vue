<template>
  <div class="blockdetail">
    <div class="top">
      <img src="@assets/images/second/区块详情1.png" alt="" />
      <span>{{ $t("blockdetail")[0] }}</span>
    </div>
    <div class="detail_content">
      <ul>
        <li>{{ $t("index")[0] }}:</li>
        <li>{{ $t("blockdetail")[1] }}:</li>
        <li>{{ $t("block")[4] }}:</li>
        <li>{{ $t("blockdetail")[2] }}:</li>
      </ul>
      <ul>
        <li>
          {{ datalist.block_height }}
        </li>
        <li>{{ datalist.tx_num }}</li>
        <li>{{ datalist.block_award }}UENC</li>
        <li>{{ datalist.block_gas }}UENC</li>
      </ul>
    </div>
    <div class="top">
      <img src="@assets/images/second/区块详情2.png" alt="" />
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
          <div>
            {{ $t("blockdetail")[2] }}
          </div>
          <div>{{ $t("block")[4] }}</div>
        </li>
      </ul>
      <ul class="info_content">
        <li v-for="item in blockData" :key="item">
          <div @click="goToTransactionDetail(item.transaction_hash2)">
            {{ item.transaction_hash }}
          </div>
          <div>
            {{ item.time }}
          </div>
          <div @click="goToAddressDetail(item.from_address2)">
            {{ item.from_address }}
          </div>
          <div @click="goToAddressDetail(item.to_address2)">
            {{ item.to_address }}
          </div>
          <div>
            {{ item.transaction_amount }}
          </div>
          <div>
            {{ item.gas }}
          </div>
          <div>
            {{ item.award }}
          </div>
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
import { GetBlockListDetail } from "@server/api.js";

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
      datalist: [],
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
      const res = await GetBlockListDetail({
        block_height: this.shiyan,
        pageNum: this.blockmedianum,
        pageSize: 20,
      });
      // console.log(res);
      this.totalNum = res[0].total_page[0].totalPageNum;
      // 高度
      this.datalist = res[0].block_height[0];
      // console.log(this.datalist);

      for (var i = 0; i < res[0].block_list.length + 1; i++) {
        var obj = {};
        let times = [];
        // 交易哈希
        obj.transaction_hash =
          res[0].block_list[i].transaction_hash.substring(0, 10) + "...";
        obj.transaction_hash2 = res[0].block_list[i].transaction_hash;
        // 从
        obj.from_address =
          res[0].block_list[i].from_address.substring(0, 10) + "...";
        obj.from_address2 = res[0].block_list[i].from_address;
        // 至
        if (
          res[0].block_list[i].to_address ==
          "0000000000000000000000000000000000"
        ) {
          obj.to_address = this.nowLang === "cn" ? "质押" : "pledge";
        } else {
          obj.to_address =
            res[0].block_list[i].to_address.substring(0, 10) + "...";
        }

        obj.to_address2 = res[0].block_list[i].to_address;
        //  交易额
        obj.transaction_amount = res[0].block_list[i].transaction_amount;
        //  燃料费
        obj.gas = res[0].block_list[i].gas;
        //  区块奖励
        obj.award = res[0].block_list[i].award;
        // let blocktime = res[0].block_list[i].time;
        obj.time = this.timestampToTime(res[0].block_list[i].time);
        blockData[i] = obj;
        //console.log(blockData);
        this.blockData = blockData;
        // console.log(this.blockData);
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
.blockdetail {
  height: auto;
  padding-bottom: 373px;
  background: #F9FAFD;
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
    margin:0px auto ;
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
  .detail_content {
    width: 1275px;
    height: 263px;
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
        div:nth-child(1) {
          width: 150px;
          text-align: left;
        }
        div {
          width: 140px;
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          text-align: center;
        }
        div:nth-child(3) {
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
          // padding-left: 9px;
          text-align: left;
        }
        div:nth-child(2) {
          width: 150px;
        }
        div:nth-child(1),
        div:nth-child(3),
        div:nth-child(4) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;

          color: #965ee5;
        }
        div:nth-child(3) {
          text-align: center;
        }
        div {
          width: 130px;
          text-align: center;
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 45px;
          color: #333333;
        }
      }
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
