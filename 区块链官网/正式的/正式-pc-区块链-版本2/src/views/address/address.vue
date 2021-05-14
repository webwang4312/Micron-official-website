<template>
  <div class="address">
    <div class="top">
      <img src="@assets/images/second/footer/组 33.png" alt="" />
      <span>地址列表</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li>
          <div>
            排名
          </div>
          <div>地址</div>
          <div>交易笔数</div>
          <div>
            金额
          </div>
          <div>占百分比</div>
        </li>
      </ul>
      <ul v-for="item in addressData" :key="item" class="info_content">
        <li >
          <div>
            {{ item.rank }}
          </div>
          <div @click="goToAddressDetail(item.wallet_address)">
            {{ item.wallet_address }}
          </div>
          <div>
            {{ item.transaction_num }}
          </div>
          <div>
            {{ item.amount }}
          </div>
          <div>
            {{ item.percentage }}
          </div>
        </li>
      </ul>
    </div>
    <div class="block_pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="change"
      >
      </el-pagination>
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
        .get("/get_address_list_for_all", {
          params: {
            pageNum: this.addressmedianum,
            pageSize: 20,
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
            obj.wallet_address = addresslist[i].wallet_address;
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
    background: gainsboro;
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
          width: 148px;
        }
        div:nth-child(2) {
          width: 300px;
        }
        div:nth-child(3) {
          text-align: center;
        }
      }
    }
    .info_content {
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 53px;
        height: 45px;
       
        background: #fcfcfc;
        div:nth-child(2) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;

          color: #5583ff;
           cursor: pointer;
        }
        div:nth-child(3) {
          text-align: center;
        }
        div:nth-child(2) {
          width: 300px;
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
        color: #5583ff;
        border: 1px solid #5583ff;

        border-radius: 6px;
        background-color: #ffffff !important;
      }
    }
  }
}
</style>
