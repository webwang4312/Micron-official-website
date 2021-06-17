<template>
  <div class="indexList">
    <div class="info_list">
      <div class="last_transaction">
        <div class="subject">
          <div>
            {{ $t("index")[6] }}
          </div>
          <div class="more" @click="goToTransaction">
            {{ $t("index")[8] }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content">
          <li v-for="item in tableData" :key="item">
            <ul>
              <li>
                <div>
                  {{ $t("blockdetail")[3] }}
                </div>
                <div @click="goToTransactionDetail(item.txhash2)" class="blue">
                  TX {{ item.txhash }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("index")[9] }}
                </div>
                <div @click="goToAddressDetail(item.fromAddress2)" class="blue">
                  {{ item.fromAddress }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("index")[10] }}
                </div>
                <div @click="goToAddressDetail(item.toAddress2)" class="blue">
                  {{ item.toAddress }}
                </div>
              </li>
              <li>
                <div>{{ $t("block")[3] }}:</div>
                <div>
                  {{ item.amount }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("block")[1] }}
                </div>
                <div>
                  {{ item.date.toString() }}
                </div>
              </li>
              <li>
                <div></div>
                <div
                  style="width: 248px;
height: 0px;border-bottom:1px solid #B2B2B2"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="last_block">
        <div class="subject">
          <div>
            {{ $t("index")[7] }}
          </div>
          <div class="more" @click="goToBlock">
            {{ $t("index")[8] }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content">
          <li v-for="item in tableData2" :key="item">
            <ul>
              <li>
                <div>
                  {{ $t("index")[0] }}
                </div>
                <div @click="goToBlockDetail(item.height)" class="blue">
                  {{ item.height }}
                </div>
              </li>
              <li>
                <div>{{ $t("block")[4] }}</div>
                <div>
                  {{ item.blockAward }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("block")[1] }}
                </div>
                <div>
                  {{ item.time.toString() }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("block")[2] }}
                </div>
                <div>
                  {{ item.total }}
                </div>
              </li>
              <li>
                <div></div>
                <div
                  style="width: 248px;
height: 0px;border-bottom:1px solid #B2B2B2"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "indexlist",
  props: {
    nowTime: [String, Number],
    tableData: Array, //必须是数值类型
    tableData2: Array, // 数字类型 || 字符串
  },

  data() {
    return {};
  },
  components: {},
  created() {
    //console.log(this.tableData);
  },
  mounted() {},

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
    goToTransaction() {
      this.$router.push({
        path: "/transaction",
      });
    },
    goToTransactionDetail(item) {
      this.$router.push({
        path: "/transactiondetail",
        query: {
          transaction_hash: item,
        },
      });
    },
    goToBlock() {
      this.$router.push({
        path: "/block",
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
  },
};
</script>
<style lang="less" >
.indexList {
  width:100%;
  .info_list {
    width: 343px;
    height: auto;
    margin: 20px auto 37px;
    display: flex;
    flex-direction: column;

    .last_transaction {
      width: 100%;
      height: auto;

      margin-bottom: 20px;
      .subject {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #253551;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #965ee5;
        }
      }
      .content {
        width: 100%;
        margin: 0 auto;
      }
      .content > li {
        width: 100%;
        height: 172px;

        display: flex;
        align-items: center;
        ul {
          width: 100%;
          height: 100%;
          li:nth-child(1) {
            margin-top: 20px;
          }
          li {
            display: flex;
            flex-direction: row;

            margin-top: 10px;
            div:nth-child(1) {
              width: 100px;
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
    .last_block {
      width: 100%;
      height: auto;

      .subject {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #253551;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #965ee5;
        }
      }
      .content {
        width: 100%;
        height: auto;
        margin: 0 auto;
      }
      .content > li {
        width: 100%;
        height: 143px;

        display: flex;
        align-items: center;
        ul {
          width: 100%;
          height: 143px;
          li:nth-child(1) {
            margin-top: 20px;
          }
          li {
            margin-top: 10px;
            display: flex;
            flex-direction: row;

            div:nth-child(1) {
              width: 100px;
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
}
</style>
