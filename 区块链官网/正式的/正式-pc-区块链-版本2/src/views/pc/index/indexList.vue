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

        <ul class="content" v-for="item in tableData" :key="item">
          <li>
            <div class="content_left">
              TX<span @click="goToTransactionDetail(item.transaction_hash2)">
                {{ item.transaction_hash }}</span
              >
              <br />
              <span>
                {{ item.date.toString() }}
              </span>
            </div>
            <div class="content_center">
              {{ $t("index")[9] }}
              <span @click="goToAddressDetail(item.from_address2)">
                {{ item.from_address }}
              </span>
              <br />
              {{ $t("index")[10] }}
              <span @click="goToAddressDetail(item.to_address2)">
                {{ item.to_address }}
              </span>
            </div>
            <div class="content_right">
              <span> {{ $t("block")[3] }}</span>

              <span>
                {{ item.amount }}
              </span>
            </div>
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

        <ul class="content" v-for="item in tableData2" :key="item">
          <li>
            <div class="content_left">
              TX<span @click="goToBlockDetail(item.block_height)">
                {{ item.block_height }}</span
              >
              <br />
              <span>
                {{ item.time.toString() }}
              </span>
            </div>
            <div class="content_center">
              <span>
                {{ $t("addressdetail")[2] }}
              </span>
              <span>
                {{ item.amount }}
              </span>
            </div>
            <div class="content_right">
              <span>
                {{ $t("block")[4] }}
              </span>
              <span>
                {{ item.award }}
              </span>
            </div>
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
    console.log(this.tableData);
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
<style lang="less" scoped>
.indexList {
  .info_list {
    width: 1274px;
    height: 889px;
    margin: 105.5px auto 115px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .last_transaction {
      width: 626px;
      height: 847px;
      border: 1px solid #e9eced;
      opacity: 1;
      border-radius: 18px;
      .subject {
        width: 551.74px;
        margin: 33.48px auto 23.5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 21px;
          color: #515151;
        }
        div:nth-child(2) {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 21px;
          color: #965ee5;
        }
      }
      .content {
        width: 551px;
        margin: 0 auto;
        li {
          width: 551px;
          height: 75px;
          border-top: 2px solid #ebeeef;
          display: flex;
          flex-direction: row;
          // justify-content: space-between;
          padding-top: 19px;
          padding-bottom: 18px;
          align-items: center;
          .content_left {
            width: 140px;
            margin-right: 85px;
            span:nth-child(1) {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              line-height: 17px;
              color: #965ee5;
              cursor: pointer;
            }
            span:nth-child(3) {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 17px;
              color: #666666;
            }
          }
          .content_center {
            width: 140px;
            margin-right: 75px;
            span:nth-child(1),
            span:nth-child(3) {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              line-height: 17px;
              color: #965ee5;
              cursor: pointer;
            }
          }
          .content_right {
            width: 118px;
            text-align: right;
            font-size: 15px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 17px;
            color: #666666;
            span {
              margin-right: 3px;
            }
          }
        }
      }
    }
    .last_block {
      width: 626px;
      height: 847px;
      border: 1px solid #e9eced;
      opacity: 1;
      border-radius: 18px;
      .subject {
        width: 551.74px;
        margin: 33.48px auto 23.5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 21px;
          color: #515151;
        }
        div:nth-child(2) {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 21px;
          color: #965ee5;
        }
      }
      .content {
        width: 551px;
        margin: 0 auto;
        li {
          width: 551px;
          height: 75px;
          border-top: 2px solid #ebeeef;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 19px;
          padding-bottom: 18px;
          align-items: center;
          .content_left {
            width: 140px;
            span:nth-child(1) {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              line-height: 17px;
              color: #965ee5;
              cursor: pointer;
            }
            span:nth-child(3) {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 17px;
              color: #666666;
            }
          }
          .content_center {
            text-align: center;
            span {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 17px;
              color: #666666;
            }
          }
          .content_right {
            font-size: 15px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 17px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
