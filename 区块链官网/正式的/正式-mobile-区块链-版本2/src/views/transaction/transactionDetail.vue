<template>
  <div class="transactiondetail">
    <div class="top">
      <span>{{ $t("transactiondetail")[0] }}</span>
    </div>
    <div class="detail_content">
      <ul class="all_content">
        <li>
          <div>{{ $t("transactiondetail")[1] }}:</div>
          <div
            class="blue"
            @click="goToBlockDetail(transactionlist[0].block_height)"
          >
            {{ transactionlist[0].block_height }}
          </div>
        </li>
        <li>
          <div>{{ $t("blockdetail")[3] }}:</div>
          <div>{{ transactionlist[0].transaction_hash2 }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[2] }}:</div>
          <div>{{ transactionlist[0].transaction_time }}</div>
        </li>
        <li>
          <div>{{ $t("index")[9] }}:</div>
          <div @click="goToAddressDetail(transactionlist[0].from_address)">
            <span class="blue">
              {{ transactionlist[0].from_address }}
            </span>
          </div>
        </li>
        <li>
          <div>{{ $t("index")[10] }}:</div>
          <ul v-if="zhiya" class="to-address">
            <li
              class="blue detail_info3"
              v-for="item in transactionlist[0].to_address"
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
              class="detail_info3
            "
            >
              {{ transactionlist[0].to_address }}
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
          <div>{{ transactionlist[0].amount_detail }}</div>
        </li>
        <li>
          <div>{{ $t("block")[3] }}:</div>
          <div>{{ transactionlist[0].transaction_amount }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[3] }}:</div>
          <div>{{ transactionlist[0].extra }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[4] }}:</div>
          <ul class="blue detail_info3">
            <li
              v-for="item in arr"
              :key="item"
              @click="goToAddressDetail(item.s)"
            >
              {{ item.ss }}
            </li>
          </ul>
        </li>
        <li>
          <div>{{ $t("blockdetail")[2] }}:</div>
          <div>{{ transactionlist[0].gas }}</div>
        </li>
        <li>
          <div>{{ $t("block")[4] }}:</div>
          <div>{{ transactionlist[0].award }}</div>
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
            <li v-for="item in detail1Data" :key="item">
              {{ item.sign_node }}
            </li>
          </ul>
          <ul class="detail_info2">
            <li v-for="item in detail1Data" :key="item">
              {{ item.detail }}
            </li>
          </ul>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[7] }}:</div>
          <ul class="detail_info ">
            <li v-for="item in detail2Data" :key="item">
              {{ item.sign_node }}
            </li>
          </ul>
          <ul class="detail_info2">
            <li v-for="item in detail2Data" :key="item">
              {{ item.detail }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { GetTransactionListDetail } from "@server/api.js";
export default {
  name: "block",
  data() {
    return {
      nowLang: "",
      blockmedianum: 1,

      shiyan: "",
      zhiya: true,
      transactionlist: [
        {
          block_height: "",
          transaction_hash: "",
          transaction_hash2: "",
          transaction_hash3: "",
          block_hash: "",
          transaction_time: "",
          from_address: "",
          from_address2: "",
          to_address: "",
          to_address2: "",
          amount_detail: "",
          amount_detail2: "",
          transaction_amount: "",
          extra: "",
          sign_nodez: [{ s: "" }, { ss: "" }],
          sign_node: [],
          sign_node2: [],
          gas: "",
          award: "",
        },
      ],
      detail1Data: [],
      detail2Data: [],
      showmore: false,
      arr: [],
      amount_detail: false,
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.shiyan = this.$route.query.transaction_hash;
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
      let that = this;
      var blockData = [];
      var blockData2 = [];
      await that.$http
        .get(GetTransactionListDetail, {
          params: {
            transaction_hash: this.shiyan,
          },
        })
        .then((res) => {
          //console.log(res);
          // 区块高度
          this.transactionlist[0].block_height =
            res.data[0].search_main_transaction_detailInfo[0].block_height;
          this.height = this.transactionlist[0].block_height;
          // 交易哈希
          this.transactionlist[0].transaction_hash =
            res.data[0].search_main_transaction_detailInfo[0].transaction_hash;
          this.transactionlist[0].transaction_hash2 =
            res.data[0].search_main_transaction_detailInfo[0].transaction_hash.substring(
              0,
              6
            ) +
            "..." +
            res.data[0].search_main_transaction_detailInfo[0].transaction_hash.substring(
              res.data[0].search_main_transaction_detailInfo[0].transaction_hash
                .length - 6,
              res.data[0].search_main_transaction_detailInfo[0].transaction_hash
                .length
            );
          //console.log(this.transactionlist[0].transaction_hash2);

          this.transactionlist[0].transaction_hash3 =
            res.data[0].search_award_transaction_detailInfo[0].transaction_hash_award;
          // 区块哈希、列表
          this.transactionlist[0].block_hash =
            res.data[0].search_main_transaction_detailInfo[0].block_hash;
          // 交易时间
          this.transactionlist[0].transaction_time = this.timestampToTime(
            res.data[0].search_main_transaction_detailInfo[0].transaction_time
          );
          // 交易额
          this.transactionlist[0].transaction_amount =
            res.data[0].search_main_transaction_detailInfo[0].transaction_amount;
          // 共识数
          this.transactionlist[0].extra =
            res.data[0].search_main_transaction_detailInfo[0].extra;
          // 交易签名节点
          this.transactionlist[0].sign_node = res.data[0].search_main_transaction_detailInfo[0].sign_node.split(
            ","
          );
          this.transactionlist[0].sign_node2 = res.data[0].search_main_transaction_detailInfo[0].sign_node.split(
            ","
          );

          for (let s = 0; s < this.transactionlist[0].sign_node.length; s++) {
            //console.log(this.transactionlist[0].sign_node[s]);
            let h = [];
            h.s = this.transactionlist[0].sign_node[s];
            h.ss =
              this.transactionlist[0].sign_node[s].substring(0, 6) +
              "..." +
              this.transactionlist[0].sign_node[s].substring(
                this.transactionlist[0].sign_node[s].length - 6,
                this.transactionlist[0].sign_node[s].length
              );

            this.arr.push(h);
            // this.sign_nodez[s].s=this.transactionlist[0].sign_node[s]
            // this.sign_nodez[s].ss=this.transactionlist[0].sign_node[s]
          }
          // 燃料费
          this.transactionlist[0].gas =
            res.data[0].search_main_transaction_detailInfo[0].gas;
          // 区块奖励
          this.transactionlist[0].award =
            res.data[0].search_main_transaction_detailInfo[0].award;
          this.collength = res.data[0].search_gas_transaction_detailInfo.length;
          this.res = res;
          this.zhiYaDetail();
          //  console.log(this.collength);
          //  console.log(res.data.length);
          for (
            let j = 0;
            j < res.data[0].search_award_transaction_detailInfo.length + 1;
            j++
          ) {
            var obj2 = {};
            let strtime =
              res.data[0].search_award_transaction_detailInfo[j]
                .transaction_time;
            obj2.transaction_time = this.transactionlist[0].transaction_time;
            obj2.award = this.transactionlist[0].award;
            obj2.detail =
              res.data[0].search_award_transaction_detailInfo[j].award;
            let nodelength =
              res.data[0].search_award_transaction_detailInfo[j].sign_node
                .length;
            obj2.sign_node =
              res.data[0].search_award_transaction_detailInfo[
                j
              ].sign_node.substring(0, 9) +
              "..." +
              res.data[0].search_award_transaction_detailInfo[
                j
              ].sign_node.substring(nodelength - 6, nodelength);
            // console.log(obj);
            blockData2[j] = obj2;
            this.detail2Data = blockData2;
            //console.log(this.detail2Data);
            var obj = {};
            let strtime2 =
              res.data[0].search_gas_transaction_detailInfo[j].transaction_time;
            obj.transaction_time = this.timestampToTime(Number(strtime2));
            // console.log(res.data.length)
            obj.gas = this.transactionlist[0].gas;
            obj.detail = res.data[0].search_gas_transaction_detailInfo[j].gas;
            let nodelength2 =
              res.data[0].search_gas_transaction_detailInfo[j].sign_node.length;

            obj.sign_node =
              res.data[0].search_gas_transaction_detailInfo[
                j
              ].sign_node.substring(0, 9) +
              "..." +
              res.data[0].search_gas_transaction_detailInfo[
                j
              ].sign_node.substring(nodelength2 - 6, nodelength2);
            // console.log(obj);
            blockData[j] = obj;
            this.detail1Data = blockData;
          }
          for (
            var i = 0;
            i < res.data[0].search_gas_transaction_detailInfo.length + 1;
            i++
          ) {}
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    zhiYaDetail() {
      let res = this.res;
      //console.log(res);
      if (
        res.data[0].search_main_transaction_detailInfo[0].to_address ==
          "0000000000000000000000000000000000" ||
        res.data[0].search_main_transaction_detailInfo[0].pledge == "1"
      ) {
        this.zhiya = false;
        // 从
        this.transactionlist[0].from_address =
          res.data[0].search_main_transaction_detailInfo[0].from_address;
        if (this.nowLang == "cn") {
          this.transactionlist[0].to_address = "质押";
        } else {
          this.transactionlist[0].to_address = "Pledge";
        }
      } else if (
        res.data[0].search_main_transaction_detailInfo[0].from_address ==
          res.data[0].search_main_transaction_detailInfo[0].to_address ||
        res.data[0].search_main_transaction_detailInfo[0].redeem == "1"
      ) {
        this.zhiya = false;
        if (this.nowLang == "cn") {
          // 从
          this.transactionlist[0].from_address = "质押";
        } else {
          this.transactionlist[0].from_address = "Pledge";
        }
        // 至
        this.transactionlist[0].to_address =
          res.data[0].search_main_transaction_detailInfo[0].to_address;
      } else {
        this.zhiya = true;
        // 不是质押的情况
        this.transactionlist[0].from_address = res.data[0].search_main_transaction_detailInfo[0].from_address.split(
          ","
        );
        this.transactionlist[0].from_address2 = res.data[0].search_main_transaction_detailInfo[0].from_address.split(
          ","
        );
        this.transactionlist[0].to_address = res.data[0].search_main_transaction_detailInfo[0].to_address.split(
          ","
        );
        //console.log(this.transactionlist[0].to_address);
        this.transactionlist[0].to_address2 = res.data[0].search_main_transaction_detailInfo[0].to_address.split(
          ","
        );
        //console.log(this.transactionlist[0].to_address2);
        // 来的地方
        //  this.transactionlist[0].from_address.length=7;
        if (this.transactionlist[0].from_address.length >= 6) {
          this.from_detail = true;
          let from_address = [];
          let from_address2 = [];
          for (
            let m = 0;
            m < this.transactionlist[0].from_address2.length;
            m++
          ) {
            from_address2.push(this.transactionlist[0].from_address2[m]);
          }

          this.transactionlist[0].from_address2 = from_address2
            .toString()
            .replaceAll(",", "");
          for (let c = 0; c < 6; c++) {
            from_address.push(this.transactionlist[0].from_address[c]);
          }
          this.transactionlist[0].from_address =
            from_address.toString() + "...";
        } else {
          // console.log("<6");
          this.transactionlist[0].from_address =
            res.data[0].search_main_transaction_detailInfo[0].from_address;
        }
        // 至的地方
        if (this.transactionlist[0].to_address.length >= 2) {
          // 显示交易详情
          this.amount_detail = true;
          this.transactionlist[0].amount_detail = res.data[0].search_main_transaction_detailInfo[0].amount_detail.split(
            ","
          );
          this.transactionlist[0].amount_detail2 = res.data[0].search_main_transaction_detailInfo[0].amount_detail.split(
            ","
          );
          // console.log(this.transactionlist[0].amount_detail2);
          let amount_detail = [];
          let amount_detail2 = [];
          for (
            let b = 0;
            b < this.transactionlist[0].amount_detail2.length;
            b++
          ) {
            amount_detail2.push(
              `<span style="color:blue">${b + 1}:</span>` +
                this.transactionlist[0].amount_detail2[b] / 1000000 +
                `</br>`
            );
          }
          this.transactionlist[0].amount_detail2 = amount_detail2
            .toString()
            .replaceAll(",", "");
          // console.log(this.transactionlist[0].amount_detail2);
          if (this.transactionlist[0].amount_detail.length >= 10) {
            // 显示交易详情按钮
            this.amountbutton_detail = true;
            for (let k = 0; k < 10; k++) {
              amount_detail.push(
                this.transactionlist[0].amount_detail[k] / 1000000
              );
            }
            // // console.log(to_address.toString());
            this.transactionlist[0].amount_detail =
              amount_detail.toString() + "...";
          } else {
            // 不显示交易详情按钮
            this.amountbutton_detail = false;
            for (
              let k = 0;
              k < this.transactionlist[0].amount_detail.length;
              k++
            ) {
              amount_detail.push(
                this.transactionlist[0].amount_detail[k] / 1000000
              );
            }
            // // console.log(to_address.toString());
            this.transactionlist[0].amount_detail = amount_detail.toString();
          }
        } else {
          // 不显示交易详情
          this.amount_detail = false;
        }
        // 从
        // console.log(this.transactionlist[0].to_address);
        if (this.transactionlist[0].to_address.length >= 10) {
          this.showmore = true;
          // 显示去的按钮
          this.to_detail = true;
          let to_address = [];
          let to_address2 = [];
          for (let a = 0; a < this.transactionlist[0].to_address2.length; a++) {
            to_address2.push(this.transactionlist[0].to_address[a]);
          }

          this.transactionlist[0].to_address2 = to_address2;

          //console.log(this.transactionlist[0].to_address2);
          //  this.transactionlist[0].to_address.length=5
          for (let s = 0; s < 10; s++) {
            to_address.push(this.transactionlist[0].to_address[s]);
          }
          this.transactionlist[0].to_address = to_address;
          // 交易明细详情
          // this.amount_detail = true;
          // 交易地址小于长度6
        } else {
          this.showmore = false;
          let to_address = [];
          let to_address2 = [];
          this.to_detail = false;
          if (this.transactionlist[0].to_address.length == 1) {
            this.transactionlist[0].to_address = this.transactionlist[0].to_address;
          } else {
            for (
              let a = 0;
              a < this.transactionlist[0].to_address.length;
              a++
            ) {
              to_address.push(this.transactionlist[0].to_address[a]);
            }
            this.transactionlist[0].to_address = to_address;
          }

          // this.amount_detail = false;
        }
      }
      console.log(this.transactionlist[0].to_address);
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
          li {
          }
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
        line-height: 18px;
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
