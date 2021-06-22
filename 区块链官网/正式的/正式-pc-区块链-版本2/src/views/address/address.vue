<template>
  <div class="address">
    <div class="top">
      <img src="@assets/images/second/footer/组 33.png" alt="" />
      <span> {{ $t("address")[0] }}</span>
    </div>
    <div class="block_info">
      <ul class="info_title">
        <li>
          <div>
            {{ $t("address")[1] }}
          </div>
          <div>{{ $t("address")[2] }}</div>
          <div>{{ $t("block")[2] }}</div>
          <div>
            {{ $t("address")[3] }}
          </div>
          <div>{{ $t("address")[4] }}</div>
        </li>
      </ul>
      <ul class="info_content">
        <li v-for="item in addressData" :key="item">
          <div>
            {{ item.rankNum }}
          </div>
          <div @click="goToAddressDetail(item.address)">
            {{ item.address }}
          </div>
          <div>
            {{ item.tradeNums }}
          </div>
          <div>
            {{ item.balance }}
          </div>
          <div>
            {{ item.accountFor }}
          </div>
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
import { GETADDRESS } from "@server/api.js";
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
      const res = await GETADDRESS({});
      console.log(res);
      this.addressData=res.result
    },
  },
};
</script>
<style lang="less">
.address {
  background: #f9fafd;
  padding-bottom: 195px;
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
      margin-left: 15px;
    }
    img {
      width: 38px;
      height: 38px;
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
      background: #ffffff;
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
        div:nth-child(5) {
          text-align: right;
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

        background: #fcfcfc;
        div:nth-child(2) {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          width: 300px;
          color: #965ee5;
          cursor: pointer;
        }
        div:nth-child(3) {
          text-align: center;
        }
        div:nth-child(5) {
          text-align: right;
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
        color: #965ee5;
        border: 1px solid #965ee5;

        border-radius: 6px;
        background-color: #ffffff !important;
      }
    }
  }
}
</style>
