<template>
  <div class="transactiondetail">
    <div class="top">
      <span>{{ $t("transactiondetail")[0] }}</span>
    </div>
    <div class="detail_content">
      <ul class="all_content">
        <li>
          <div>{{ $t("transactiondetail")[1] }}:</div>
          <div class="blue" @click="goToBlockDetail(height)">
            {{ height }}
          </div>
        </li>
        <li>
          <div>{{ $t("blockdetail")[3] }}:</div>
          <div>{{ txhash }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[2] }}:</div>
          <div>{{ tradeTime }}</div>
        </li>
        <li>
          <div>{{ $t("index")[9] }}:</div>
          <div @click="goToAddressDetail(fromAddress)">
            <span class="blue">
              {{ fromAddress }}
            </span>
          </div>
        </li>
        <li>
          <div>{{ $t("index")[10] }}:</div>
          <ul v-if="showmore" class="to-address">
            <li
              class="blue detail_info3"
              v-for="item in toAddress"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>

            <!-- <li class="blue">
              <el-popover width="900" trigger="click">
                <li
                  v-for="item in transactionlist[0].to_address2"
                  :key="item"
                  @click="goToAddressDetail(item)"
                >
                  {{ item }}
                </li>
                <el-button slot="reference">显示更多</el-button>
              </el-popover>
            </li> -->
          </ul>
          <ul v-else>
            <li
              v-for="item in toAddress"
              :key="item"
              class="detail_info3 
            "
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
          </ul>
          <!-- <ul v-else>
            <li
              class="blue"
              v-for="item in transactionlist[0].to_address"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
          </ul> -->
        </li>
        <li v-show="amount_detail">
          <div>{{ $t("transaction")[0] }}:</div>
          <div>{{ amount_detail }}</div>
        </li>
        <li>
          <div>{{ $t("block")[3] }}:</div>
          <div>{{ amount }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[3] }}:</div>
          <div>{{ needVertify }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[4] }}:</div>
          <ul class="blue detail_info3">
            <li
              v-for="item in signList"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
          </ul>
        </li>
        <li>
          <div>{{ $t("blockdetail")[2] }}:</div>
          <div>{{ gasFees }}</div>
        </li>
        <li>
          <div>{{ $t("block")[4] }}:</div>
          <div>{{ blockAward }}</div>
        </li>
      </ul>
      <div
        style="width: 100%;
height: 10px;
background: #F8F8F8;
opacity: 1;"
      ></div>
      <div class="top">
        <span>{{ $t("transaction")[2] }}</span>
      </div>
      <ul class="more-information">
        <li>
          <div>{{ $t("transactiondetail")[6] }}:</div>
          <ul class="detail_info ">
            <li v-for="item in gasList" :key="item">
              {{ item.address }}
            </li>
          </ul>
          <ul class="detail_info2">
            <li v-for="item in gasList" :key="item">
              {{ item.amount }}
            </li>
          </ul>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[7] }}:</div>
          <ul class="detail_info ">
            <li v-for="item in blockList" :key="item">
              {{ item.address }}
            </li>
          </ul>
          <ul class="detail_info2">
            <li v-for="item in blockList" :key="item">
              {{ item.amount }}
            </li>
          </ul>
        </li>
      </ul>
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
      blockmedianum: 1,
      moreclick: false,
      shiyan: "",
      amount_detail: false,
      height: "",
      tradeTime: "",
      fromAddress: "",
      toAddress: "",

      amount: "",
      needVertify: "",
      signList: [],
      gasFees: "",
      blockAward: "",
      blockList: [],
      gasList: [],

      showmore: false,
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.shiyan = this.$route.query.txhash;
    //console.log(this.shiyan);
    this.transactiondetaillist();
  },

  // 页码设置
  watch: {},
  methods: {
    goToAddressDetail(item) {
      this.$router.push({
        path: "/addressdetail",
        query: {
          address: item,
        },
      });
    },
    goToBlockDetail(item) {
      this.$router.push({
        path: "/blockdetail",

        query: {
          block: item,
        },
      });
    },

    async transactiondetaillist() {
      const res = await GETADDRESSDETAIL({
        type: "2",
        key: this.shiyan,
        pageNum: "1",
        pageSize: "5",
      });
      console.log(res);
      // res.result.fromAddress =
      //   "1,2,3,4,5,6,7,8,9";
      // res.result.toAddress = "1,2,3,4,5,6";
      // 区块高度
      this.height = res.result.height;
      // 交易哈希
      this.txhash = res.result.txhash;

      // 交易时间
      this.tradeTime = this.timestampToTime(res.result.tradeTime);
      // from地址
      this.fromAddress = res.result.fromAddress;
      // to地址
      this.toAddress = res.result.toAddress.split(",");
      this.toAddress.length > 5
        ? ((this.toAddress = this.toAddress.slice(0, 5) + "..."),
          (this.showmore = true))
        : ((this.toAddress = this.toAddress), (this.showmore = false));
      // console.log(this.toAddress);
      //  交易额
      this.amount = res.result.amount;
      // 共识数
      this.needVertify = res.result.needVertify;
      // 交易签名节点
      this.signList = res.result.signList;
      this.gasFees = res.result.gasFees;
      this.blockAward = res.result.blockAward;
      this.blockList = res.result.blockList;
      this.gasList = res.result.gasList;
    },

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
.el-popover {
  height: 600px !important;
  overflow: scroll;
  left: 50% !important;
  top: 50% !important;
  margin-left: -450px; /*利用margin实现偏移,设置为宽度和高度的一半的负值*/
  margin-top: -300px;
  li {
    list-style: none;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 18px;
    color: #965ee5;
    cursor: pointer;
    margin-top: 27px;
  }
}
.transactiondetail {
  height: auto;
  .blue {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #965ee5;
    width: 200px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .top {
    width: 343px;
    height: 38px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 20px;
    color: #253551;
    margin: 20px auto 10px;
    display: flex;
    align-items: center;
    span {
      // margin-left: 20px;
    }
  }
  .detail_content {
    width: 343px;
    height: auto;
    background: #ffffff;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 54px;
    margin-bottom: 10px;
    .all_content > li {
      margin-top: 28px;
      display: flex;
      flex-direction: row;
    }
    .all_content {
      width: 100%;
      padding: 0 0 30px;
      .detail_info3 {
        font-size: 13px;
        width: 200px;
        word-wrap: break-word;
        word-break: break-all;
        color: #965ee5 !important;
        li:nth-child(1) {
          margin-top: 0px !important;
        }
        li {
          margin-top: 12px;
        }
      }
      li {
        display: flex;
        flex-direction: row;
        ul {
          li {
            margin-top: 0px;
          }
        }
        div:nth-child(1) {
          width: 100px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 18px;
          color: #9da5bb;
        }
        div:nth-child(2) {
          width: 200px;
          word-wrap: break-word;
          word-break: break-all;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 18px;
          color: #333333;
        }
        .to-address {
        }
      }
    }
    .more-information > li {
      display: flex;
      flex-direction: row;
    }
    li:nth-child(2) {
      margin-top: 17px;
    }
    .more-information {
      width: 345px;
      padding: 0 0px;

      .detail_info2 {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 34px;
        color: #666666;
        word-wrap: break-word;

        li {
          margin-top: 12px;
        }
        li:nth-child(1) {
          margin-top: 0px !important;
        }
      }
      .detail_info {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 18px;
        color: #666666;
        margin-left: 20px;
        margin-right: 20px;
        li:nth-child(1) {
          margin-top: 0px !important;
        }
        li {
          width: 150px;
          word-wrap: break-word;
          word-break: break-all;
          margin-top: 12px;
        }
      }

      li {
        display: flex;
        flex-direction: row;

        div {
          width: 50px;
          word-wrap: break-word;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 18px;
          color: #9da5bb;
        }
      }
    }
  }
}
</style>
