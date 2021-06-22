<template>
  <div class="transactiondetail">
    <div class="top">
      <img src="@assets/images/second/交易明细.png" alt="" />
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
          <div class="strong">{{ txhash }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[2] }}:</div>
          <div class="strong">{{ tradeTime }}</div>
        </li>
        <li>
          <div>{{ $t("index")[9] }}:</div>
          <div class="blue" @click="goToAddressDetail(fromAddress)">
            {{ fromAddress }}
          </div>
        </li>
        <li>
          <div>{{ $t("index")[10] }}:</div>
          <ul v-if="showmore" id="address_information">
            <li
              class="blue"
              v-for="item in toAddress2"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
            <li class="blue">
              <el-popover width="900" trigger="click">
                <li v-for="item in toAddress2" :key="item">
                  <div v-html="item"></div>
                </li>
                <el-button slot="reference">
                  {{ $t("transaction")[1] }}</el-button
                >
              </el-popover>
            </li>
          </ul>
          <ul v-else>
            <li
              class="blue"
              v-for="item in toAddress"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
          </ul>
        </li>
        <li>
          <div>{{ $t("block")[3] }}:</div>
          <div class="strong">{{ amount }}</div>
        </li>
        <li v-show="amount_detail">
          <div>
            {{ $t("transaction")[0] }}
          </div>
          <div>
            <el-popover width="900" trigger="click">
              <li v-for="item in amount_detail2" :key="item">
                <div v-html="item"></div>
              </li>
              <el-button slot="reference">
                {{ $t("transaction")[1] }}</el-button
              >
            </el-popover>
          </div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[3] }}:</div>
          <div class="strong">{{ needVertify }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[4] }}:</div>
          <ul class="blue detail_info2">
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
          <div class="strong">{{ gasFees }}</div>
        </li>
        <li>
          <div>{{ $t("block")[4] }}:</div>
          <div class="strong">{{ blockAward }}</div>
        </li>
        <li
          style="font-size: 17px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 22px;
color: #965EE5;cursor:pointer"
          @click="moreClick"
          v-show="!moreclick"
        >
          {{ $t("transactiondetail")[5] }}
        </li>
        <li v-show="moreclick">
          <div>{{ $t("transactiondetail")[6] }}:</div>
          <ul class="detail_info detail_info2">
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
        <li v-show="moreclick">
          <div>{{ $t("transactiondetail")[7] }}:</div>
          <ul class="detail_info ">
            <li v-for="item in blockList" :key="item">
              {{ item.address }}
            </li>
          </ul>
          <ul>
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
      toAddress2: "",
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
    this.shiyan = this.$route.query.txhash;
    //console.log(this.shiyan);
    this.transactiondetaillist();
  },

  // 页码设置
  watch: {},
  methods: {
    goToAddressDetail(item) {
      //console.log(item);
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
    moreClick() {
      this.moreclick = true;
    },
    async transactiondetaillist() {
      const res = await GETADDRESSDETAIL({ type: "2", key: this.shiyan,pageNum:'1',pageSize:'20' });
      console.log(res);
      // res.result.fromAddress =
      //   "1,2,3,4,5,6,7,8,9";
      // res.result.toAddress = "1,2,3";
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
        ? ((this.toAddress = this.toAddress.slice(0, 5)),
          (this.showmore = true),
          (this.toAddress2 = res.result.toAddress.split(",")))
        : (this.toAddress, (this.showmore = false));
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
  background: #f9fafd;
  padding-bottom: 407px;
  .blue {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 18px;
    color: #965ee5;
    cursor: pointer;
  }
  .strong {
    font-size: 17px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 22px;
    color: #333333;
  }
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
    margin: 0px auto;
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
  .detail_content {
    width: 1275px;
    height: auto;
    background: #fcfcfc;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 1;
    border-radius: 11px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    padding-bottom: 54px;

    .all_content {
      font-size: 17px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: #666666;
      margin-left: 53px;
      margin-top: 18px;
      li {
        margin-top: 28px;
        display: flex;
        flex-direction: row;
        ul {
          li {
          }
          li:nth-child(1) {
            margin-top: 0px !important;
          }
        }
        div:nth-child(1) {
          width: 243px;
        }
        .detail_info2 {
          li {
          }
          li:nth-child(1) {
            margin-top: 0px;
          }
        }
        .detail_info {
          margin-right: 230px;
        }
      }
    }
  }
}
</style>
