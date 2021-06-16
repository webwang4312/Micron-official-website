<template>
  <div class="address">
  
    <div class="top">
      <span>{{ $t("nav")[4] }}</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li v-for="item in addressData" :key="item" class="info_content">
          <ul>
            <li>
              <div>
                {{ $t("address")[2] }}
              </div>
              <div @click="goToAddressDetail(item.wallet_address2)">
                <span class="blue">
                  {{ item.wallet_address }}
                </span>
              </div>
            </li>
            <li>
              <div>
              {{ $t("block")[2] }}
              </div>
              <div>
                {{ item.transaction_num }}
              </div>
            </li>
            <li>
              <div>
               {{ $t("address")[3] }}
              </div>
              <div>{{ item.amount }}</div>
            </li>
            <li>
              <div>
              {{ $t("address")[4] }}
              </div>
              <div>
                {{ item.percentage }}
              </div>
            </li>
            <li>
              <div>
                {{ $t("address")[1] }}
              </div>
              <div>
                {{item.rank}}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- <div class="block_pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="change"
      >
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
 import {GetAddressList} from "@server/api.js";
export default {
  name: "block",
  data() {
    return {
      nowLang: "",
      // 分页
      addressmedianum: 1,
      totalNum: "",
      addressData: [],
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.addressmedianum = 1;
    this.addresssearch();
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
    change(val) {
      //console.log(val);
      this.addressmedianum = val;
      //console.log(this.medianum);
      this.addresssearch();
    },
    async addresssearch() {
      let that = this;
      var blockData = [];
      await that.$http
        .get(GetAddressList, {
          params: {
            pageNum: this.addressmedianum,
            pageSize: 100,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.icon = false;
            this.loading = false;
          }

          // console.log(res);
          this.totalNum = res.data[0].total_page[0].totalPageNum;
          this.alltotal = res.data[0].total_record[0].total_record;
          //console.log(this.totalNum);
          // table赋值
          var addresslist = res.data[0].wallet_address_list;
          // console.log(addresslist);
          for (var i = 0; i < addresslist.length + 1; i++) {
            var obj = {};
            let times = [];
            obj.rank = addresslist[i].row_num;
            obj.wallet_address = addresslist[i].wallet_address.substring(0,14)+'...';
            obj.wallet_address2 = addresslist[i].wallet_address;
            // console.log(obj);
            obj.transaction_num = addresslist[i].transaction_num;
            obj.amount = addresslist[i].amount;
            obj.percentage = addresslist[i].percentage + "%";
            //console.log(obj);
            blockData[i] = obj;
            //console.log(blockData);
            this.addressData = blockData;
            //console.log(obj);
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
.address {
  background: #ffffff;
  min-height: 100vh;
  .blue {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #965EE5 !important;
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
    margin: 0px auto 0;
    background: #ffffff;
    span {
      // margin-left: 20px;
    }
    img {
      width: 38px;
      height: 38px;
    }
  }
  .block_info {
    width: 343px;
    height: auto;
    background: #ffffff;
    margin: 0 auto;
    .info_title {
      margin: 0 0px;
      .info_content:nth-last-child(1) {
        ul {
          border-bottom: 1px solid #B2B2B2 !important;
        }
      }
      .info_content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        ul {
          width: 343px;
          height: auto;
          padding: 20px 0;
          border-bottom: 1px solid #B2B2B2;

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
              width: 200px;
               word-wrap:break-word;
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
    margin: 0 auto 128px;
    text-align: right;
    .el-pagination {
      padding: 0;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #666666;
      .number,
      button,
      .more {
        background: #ffffff;
      }
      .active {
        color: #965EE5;
        border: 1px solid #965EE5;

        border-radius: 6px;
        background-color: #ffffff !important;
      }
    }
  }
}
</style>
