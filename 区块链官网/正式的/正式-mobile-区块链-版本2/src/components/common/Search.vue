<template>
  <!-- 搜索栏区域 -->
  <div class="indexsecondsearch">
    <div class="searchleft">
      <div class="left_area">
        <span
          @click="bottomShow"
          style="font-size: 14px;
font-family: PingFang SC;
font-weight: 600;
line-height: 20px;
color: #253551;
opacity: 1;margin-left:14px"
        >
          {{ valuename }} <van-icon name="arrow-down"
        /></span>
      </div>

      <!-- <el-select v-model="value" placeholder="请选择" @change="selectChanged">
        <el-option
        选择
        >
        </el-option>
      </el-select> -->
      <van-popup v-model="showbottom" position="bottom">
        <li v-for="item in select" :key="item.value" @click="selected(item)">
          {{ item.label }}
        </li>
      </van-popup>
    </div>
    <!-- <i
      class="el-icon-minus"
      style="color:rgba(85, 131, 255, 1);transform:rotate(90deg);width: 0px;
height: 33px;"
    ></i> -->
    <div class="searchcenter">
      <input
        type="text"
        :placeholder="$t('search[0]')"
        v-model="inputvalue"
        ref="search"
        @keyup="keyup"
      />
    </div>
    <div class="search_img" @click="searchselect">
      <img src="@assets/images/second/搜索按钮@2x.png" alt="" />
    </div>
    <!-- <img
      src="../../assets/images/second/搜索按钮.png"
      class="search_img"
      @click="searchselect"
    /> -->
  </div>
</template>
<script>
import { GETADDRESSDETAIL, BlockSearch } from "@server/api.js";
export default {
  name: "search",
  inject: ["reload"],
  data() {
    return {
      valuename: "",
      iconvalue: "UENC地址",
      fullscreenLoading: false,
      nowLang: "",
      show: false,
      showbottom: false,
      sticky2: false,
      inputvalue: "",
      // 搜索下拉列表
      select: [],
      value: "",
      righticon: true,
      // 请求返回的数值
      // 地址
      // 高度
      block_height: "",
      transaction_award: "",
      block_list: [],
      // 交易哈希
      transactionhaxisearch: [],
      jiazai: false,
      // 区块哈希
    };
  },
  props: {
    select: Array,
    valuename: String,
  },
  watch: {},
  created() {
    this.nowLang = this.$i18n.locale;

    //  this.select=select;
    // if (this.$i18n.locale == "cn") {
    //   this.iconvalue = "UENC地址";
    //   this.valuename = "请选择";
    // } else {
    //   this.iconvalue = "Address";
    //   this.valuename = "Select";
    // }
    //console.log(this.$i18n.locale);

    if (this.value == "") {
      this.value = "0";
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    bottomShow() {
      this.showbottom = true;
    },
    selected(item) {
      // console.log(item.value);
      this.value = item.value;
      this.valuename = item.label;
      this.showbottom = false;
    },
    // selectChanged(value) {

    //   switch (value) {
    //     // 地址搜索
    //     case "0":
    //       // console.log('0');
    //       if (this.inputvalue !== "") {
    //         this.jiazai = true;
    //         //this.fullscreenLoading = true;
    //         this.addresssearch();
    //       }

    //       break;
    //     case "1":
    //       //  console.log('1');
    //       // 区块高度
    //       if (this.inputvalue !== "") {
    //         this.jiazai = true;
    //         //this.fullscreenLoading = true;
    //         this.blocksearch();
    //       }
    //       break;
    //     // 交易哈希
    //     case "2":
    //       //  console.log('2');
    //       if (this.inputvalue !== "") {
    //         this.jiazai = true;
    //         //this.fullscreenLoading = true;
    //         this.transactiondetaillist();
    //       }

    //       break;
    //     // 区块哈希
    //     case "3":
    //       //  console.log('3');
    //       if (this.inputvalue !== "") {
    //         this.jiazai = true;
    //         //this.fullscreenLoading = true;
    //         this.blockhaxisearch();
    //       }

    //       break;
    //   }
    // },
    errmsg() {
      if (this.$i18n.locale == "cn") {
        this.$message({
          message: "请输入正确查询信息",
          type: "error",
        });
      } else {
        this.$message({
          message: "Please enter the correct query information",
          type: "error",
        });
      }
    },
    keyup(event) {
      // console.log(event);
      if (this.inputvalue !== "") {
        if (event.keyCode == "13") {
          this.searchselect();
        }
      }
    },
    searchselect() {
      switch (this.value) {
        // 地址搜索
        case "0":
          // console.log('0');
          if (this.inputvalue !== "") {
            //this.fullscreenLoading = true;
            this.addresssearch();
          }

          break;
        case "1":
          //  console.log('1');
          // 区块高度
          if (this.inputvalue !== "") {
            //this.fullscreenLoading = true;
            this.blocksearch();
          }
          break;
        // 交易哈希
        case "2":
          //  console.log('2');
          if (this.inputvalue !== "") {
            //this.fullscreenLoading = true;
            this.transactiondetaillist();
          }

          break;
      }
    },
      // 根据交易易哈希查询相关交易易信息
    async transactiondetaillist() {
      const res = await GETADDRESSDETAIL({ type: "2", key: this.inputvalue,pageNum:'1',pageSize:'5'  });
      if (res.code == 200) {
        this.$router.push({
          path: "/transactiondetail",
          query: {
            txhash: this.inputvalue,
            // transaction_award:this.transaction_award
          },
        });
        this.reload();
        this.inputvalue = "";
      } else {
        this.$router.push({
          path: "/notfound",
          query: { address: "transaction" },
        });
        this.reload();
      }
    },
    //地址搜索
    async addresssearch() {
      const res = await GETADDRESSDETAIL({ type: "1", key: this.inputvalue,pageNum:'1',pageSize:'5' });
      // console.log(res);
      //   console.log(res.data[0].total_page[0].totalPageNum);
      if (res.result.detailList.length == 0) {
        this.$router.push({
          path: "/notfound",
          query: { address: "address" },
        });
        this.reload();
      } else {
        this.$router.push({
          path: "/addressdetail",
          query: { address: this.inputvalue },
        });
        this.reload();
        this.inputvalue = "";
      }
    },
    // 区块高度搜索
    async blocksearch() {
      const res = await GETADDRESSDETAIL({ type: "3", key: this.inputvalue,pageNum:'1',pageSize:'5' });
      if (res.code == 200) {
        this.$router.push({
          path: "/blockdetail",
          query: {
            block: this.inputvalue,
            // transaction_award:this.transaction_award
          },
        });
        this.reload();
        this.inputvalue = "";
      } else {
        this.$router.push({
          path: "/notfound",
          query: { address: "height" },
        });
        this.reload();
        // this.$router.push({
        //   path: "/notfound",
        //   query: {},
        // });
      }
    },
  },
};
</script>
<style lang="less">
.van-popup--bottom {
  background: #fff;
  height: 20%;
  li {
    list-style: none;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    // background: chartreuse;
  }
}
.el-scrollbar__wrap {
  overflow: none;
}
.selected {
  color: #965ee5 !important;
}
.el-scrollbar__wrap {
  margin-bottom: 0px !important;
}
// 搜索栏
.indexsecondsearch {
  width: 343px;
  height: 48px;
  background: #ffffff;
  border: 2px solid #4b3eff;
  opacity: 1;
  border-radius: 7px;
  margin: 21px auto 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .el-input__icon {
    width: 12px;
  }
  .searchleft {
    .left_area {
      display: flex;
      flex-direction: row;
      align-items: center;
      .van-icon {
        line-height: 20px;
      }
    }
  }
  .el-input__inner {
    height: 42px;
    font-size: 14px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 42px;
    color: #253551;
    line-height: 18px;
    padding: 0px;
    border: none;
    padding-left: 15px;
  }

  .el-input--suffix {
    width: 100px;
    border: none;
    outline: none;
  }
  .el-input__icon {
    line-height: 39px;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: none !important;
  }
  .searchcenter {
    display: flex;
    align-items: center;
    input {
      width: 163px;
      height: 50%;
      border: none;
      border-left: 1px solid #e9eced;
      outline: none;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: black;
      padding-left: 15px;
    }
    input::-webkit-input-placeholder {
      /* Edge */
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      line-height: 12px;
      color: #cccccc;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      line-height: 18px;
      color: #cccccc;
    }

    input::placeholder {
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      line-height: 18px;
      color: #cccccc;
    }
  }
  .search_img {
    width: 60px;
    height: 52px;
    background: #4b3eff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.16);
    opacity: 1;
    // border-radius:7px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 1px;
    border-radius: 7px;
    img {
      width: 19px;
      height: 19px;
    }
  }
}
</style>
