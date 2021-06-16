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
          <div
            class="blue"
            @click="goToBlockDetail(transactionlist[0].block_height)"
          >
            {{ transactionlist[0].block_height }}
          </div>
        </li>
        <li>
          <div> {{ $t("blockdetail")[3] }}:</div>
          <div class="strong">{{ transactionlist[0].transaction_hash }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[2] }}:</div>
          <div class="strong">{{ transactionlist[0].transaction_time }}</div>
        </li>
        <li>
          <div>{{ $t("index")[9] }}:</div>
          <div
            class="blue"
            @click="goToAddressDetail(transactionlist[0].from_address)"
          >
            {{ transactionlist[0].from_address }}
          </div>
        </li>
        <li>
          <div>{{ $t("index")[10] }}:</div>
          <ul v-if="showmore" id="address_information">
            <li
              class="blue"
              v-for="item in transactionlist[0].to_address"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
            <li class="blue">
              <el-popover width="900" trigger="click">
                <li v-for="item in transactionlist[0].to_address2" :key="item">
                  <div v-html="item"></div>
                </li>
                <el-button slot="reference">  {{ $t("transaction")[1] }}</el-button>
              </el-popover>
            </li>
          </ul>
          <ul v-else>
            <li
              class="blue"
              v-for="item in transactionlist[0].to_address"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
          </ul>
        </li>
        <li>
          <div>{{ $t("block")[3] }}:</div>
          <div class="strong">{{ transactionlist[0].transaction_amount }}</div>
        </li>
        <li v-show="amount_detail">
          <div>
           {{ $t("transaction")[0] }}
          </div>
          <div>
            <el-popover width="900" trigger="click">
              <li v-for="item in transactionlist[0].amount_detail2" :key="item">
                <div v-html="item"></div>
              </li>
              <el-button slot="reference">  {{ $t("transaction")[1] }}</el-button>
            </el-popover>
          </div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[3] }}:</div>
          <div class="strong">{{ transactionlist[0].extra }}</div>
        </li>
        <li>
          <div>{{ $t("transactiondetail")[4] }}:</div>
          <ul class="blue detail_info2">
            <li
              v-for="item in transactionlist[0].sign_node"
              :key="item"
              @click="goToAddressDetail(item)"
            >
              {{ item }}
            </li>
          </ul>
        </li>
        <li>
          <div> {{ $t("blockdetail")[2] }}:</div>
          <div class="strong">{{ transactionlist[0].gas }}</div>
        </li>
        <li>
          <div>{{ $t("block")[4] }}:</div>
          <div class="strong">{{ transactionlist[0].award }}</div>
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
          <div> {{ $t("transactiondetail")[6] }}:</div>
          <ul class="detail_info detail_info2">
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
        <li v-show="moreclick">
          <div> {{ $t("transactiondetail")[7] }}:</div>
          <ul class="detail_info ">
            <li v-for="item in detail2Data" :key="item">
              {{ item.sign_node }}
            </li>
          </ul>
          <ul >
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
import {GetTransactionListDetail} from "@server/api.js";
export default {
  name: "block",
  data() {
    return {
      nowLang: "",
      blockmedianum: 1,
      moreclick: false,
      shiyan: "",
      amount_detail:false,
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
          sign_node: "",
          gas: "",
          award: "",
        },
      ],
      detail1Data: [],
      detail2Data: [],
      showmore: false,
    };
  },
  components: {},
  created() {
    this.shiyan = this.$route.query.transaction_hash;
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
          console.log(res);
          // 区块高度
          this.transactionlist[0].block_height =
            res.data[0].search_main_transaction_detailInfo[0].block_height;
          this.height = this.transactionlist[0].block_height;
          // 交易哈希
          this.transactionlist[0].transaction_hash =
            res.data[0].search_main_transaction_detailInfo[0].transaction_hash;
          this.transactionlist[0].transaction_hash2 =
            res.data[0].search_gas_transaction_detailInfo[0].transaction_hash_gas;
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
          //console.log(this.transactionlist[0].sign_node);

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
            obj2.sign_node =
              res.data[0].search_award_transaction_detailInfo[j].sign_node;
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
            obj.sign_node =
              res.data[0].search_gas_transaction_detailInfo[j].sign_node;
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
        .catch((e) => {});
    },
    zhiYaDetail() {
      let res = this.res;
      //console.log(res);
      if (
        res.data[0].search_main_transaction_detailInfo[0].to_address ==
          "0000000000000000000000000000000000" ||
        res.data[0].search_main_transaction_detailInfo[0].pledge == "1"
      ) {
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
          console.log(this.transactionlist[0].amount_detail2);
          let amount_detail = [];
          let amount_detail2 = [];
          for (
            let b = 0;
            b < this.transactionlist[0].amount_detail2.length;
            b++
          ) {
            amount_detail2.push(
              `<span style="color:blue">${b + 1}:</span>` +
                this.transactionlist[0].amount_detail2[b] / 1000000
            );
          }
          this.transactionlist[0].amount_detail2 = amount_detail2;
          // console.log(this.transactionlist[0].amount_detail2);
          if (this.transactionlist[0].amount_detail.length >= 6) {
            // 显示交易详情按钮
            // this.amountbutton_detail = true;
            for (let k = 0; k < 6; k++) {
              amount_detail.push(
                `<span style="color:blue">${k + 1}:</span>` +
                  this.transactionlist[0].amount_detail[k] / 1000000
              );
            }
            // // console.log(to_address.toString());
            this.transactionlist[0].amount_detail =
              amount_detail.toString() + "...";
          } else {
            // 不显示交易详情按钮
            // this.amountbutton_detail = false;
            for (
              let k = 0;
              k < this.transactionlist[0].amount_detail.length;
              k++
            ) {
              amount_detail.push(
                `<span style="color:blue">${k + 1}:</span>` +
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
            to_address2.push(
              `${a + 1}:` +
                `<span>` +
                this.transactionlist[0].to_address[a] +
                `</span>`
            );
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
    color: #965EE5;
    cursor: pointer;
    margin-top: 27px;
  }
}
.transactiondetail {
  height: auto;
 background: #F9FAFD;
  padding-bottom: 407px;
  .blue {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 18px;
    color: #965EE5;
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
    margin:0px auto ;
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
  .detail_content {
    width: 1275px;
    height: auto;
     background: #FCFCFC;
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
          li{
           
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
