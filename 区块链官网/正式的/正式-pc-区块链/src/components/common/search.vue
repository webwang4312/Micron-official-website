<template>
  <!-- 搜索栏区域 -->
  <div class="indexsearch">
    <div class="searchleft">
      <!-- <el-select v-model="value" placeholder="请选择"  @visible-change="right">
        <el-option
          @click="right"
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->

      <div class="icons" @click="right" >
        <div>{{ iconvalue }}</div>
        <img
          src="../../assets/images/index/right.png"
          class="right"
          v-if="righticon"
        />
        <img
          src="../../assets/images/index/right.png"
          class="rightxia"
          v-else
        />
      </div>
      <div class="icon" v-if="!righticon" @mouseleave="leave">
        <ul>
          <li
            v-for="item in select"
            :key="item.value"
            @click="selecticon(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>

      <!-- <select
        v-model="value"
        placeholder="UENC主网"
        @change="searchchange"
        @click="right"
      >
        <option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></option>
      </select> -->

      <!-- <span>{{ $t("publicsection[0]") }}</span>
      <img src="../../assets/images/index/right.png" alt="" />-->
    </div>
    <div class="searchcenter">
      <input
        type="text"
        :placeholder="$t('publicsection[2]')"
        v-model="inputvalue"
        ref="search"
        @keyup="keyup"
      />
    </div>
    <div class="searchright">
      <button @click="searchselect">
        <span>{{ $t("publicsection[1]") }}</span>

        <img
          src="../../assets/images/header/2.gif"
          alt=""
          style="transform:scale(3)"
          v-if="jiazai"
        />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {
      iconvalue: "UENC地址",
      fullscreenLoading: false,
      nowLang: "en",
      show: false,
      sticky2: false,
      inputvalue: "",
      // 搜索下拉列表
      select: "",
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
  watch: {
    inputvalue: {
      handler(newName, oldName) {
        // console.log(newName);
      },
    },
  },
  created() {
    this.righticon=true
    if (this.$i18n.locale == "cn") {
      this.iconvalue = "UENC地址";
    } else {
      this.iconvalue = "Address";
    }
    //console.log(this.$i18n.locale);
    if (this.$i18n.locale == "cn") {
      this.select = [
        {
          value: "0",
          label: "UENC地址",
        },
        {
          value: "1",
          label: "区块高度",
        },
        {
          value: "2",
          label: "交易哈希",
        },
        {
          value: "3",
          label: "区块哈希",
        },
      ];
    }
    if (this.$i18n.locale == "en") {
      this.select = [
        {
          value: "0",
          label: "Address",
        },
        {
          value: "1",
          label: "Height",
        },
        {
          value: "2",
          label: "Transaction",
        },
        {
          value: "3",
          label: "Block",
        },
      ];
    }
    if (this.value == "") {
      this.value = "0";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    selecticon(item) {
      if (this.righticon == false) {
        this.righticon = true;
      }

      this.value = item.value;
      if (this.$i18n.locale == "cn") {
        switch (item.value) {
          // 地址搜索
          case "0":
            this.iconvalue = "UENC地址";
            break;
          case "1":
            this.iconvalue = "区块高度";
            break;
          // 交易哈希
          case "2":
            this.iconvalue = "交易哈希";
            break;
          // 区块哈希
          case "3":
            this.iconvalue = "区块哈希";
            break;
        }
      }
      if (this.$i18n.locale == "en") {
        switch (this.value) {
          // 地址搜索
          case "0":
            this.iconvalue = "Address";
            break;
          case "1":
            this.iconvalue = "Height";
            break;
          // 交易哈希
          case "2":
            this.iconvalue = "Transaction";

            break;
          // 区块哈希
          case "3":
            this.iconvalue = "Block";
            break;
        }
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
    leave(){
      console.log('1');
       this.righticon=true
    },
    right() {
      this.righticon = !this.righticon;
    },
    searchchange() {
      // console.log(this.value);
    },
    searchselect() {
      // console.log("点击了");
      this.$emit("test", this.$refs.search._value);
      // console.log(this.$refs.search._value);
      switch (this.value) {
        // 地址搜索
        case "0":
          // console.log('0');
          if (this.inputvalue !== "") {
            this.jiazai = true;
            //this.fullscreenLoading = true;
            this.addresssearch();
          }

          break;
        case "1":
          //  console.log('1');
          // 区块高度
          if (this.inputvalue !== "") {
            this.jiazai = true;
            //this.fullscreenLoading = true;
            this.blocksearch();
          }
          break;
        // 交易哈希
        case "2":
          //  console.log('2');
          if (this.inputvalue !== "") {
            this.jiazai = true;
            //this.fullscreenLoading = true;
            this.transactiondetaillist();
          }

          break;
        // 区块哈希
        case "3":
          //  console.log('3');
          if (this.inputvalue !== "") {
            this.jiazai = true;
            //this.fullscreenLoading = true;
            this.blockhaxisearch();
          }

          break;
      }
    },
    //地址搜索
    async addresssearch() {
      let that = this;
      await that.$http
        .get("/search_transactionInfo_walletAddress", {
          params: {
            wallet_address: this.inputvalue,
            pageNum: 1,
            pageSize: 20,
          },
        })
        .then((res) => {
          // console.log(res);
          //   console.log(res.data[0].total_page[0].totalPageNum);
          if (res.data[0].total_page[0].totalPageNum !== 0) {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/transactiondetails",
              query: { addressvalue: this.inputvalue },
            });
          } else {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/notfound",
              query: {},
            });
          }
        })
        .catch((err) => {});
    },
    // 区块高度搜索
    async blocksearch() {
      let that = this;
      await that.$http
        .get("/search_blockHeight_for_height", {
          params: {
            block_height: this.inputvalue,
            pageNum: 1,
            pageSize: 20,
          },
        })
        .then((res) => {
          //  console.log(res);
          if (res.data[0].total_record[0].total_record !== 0) {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/blockdetail",
              query: {
                blockheight: this.inputvalue,
                // transaction_award:this.transaction_award
              },
            });
          } else {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/notfound",
              query: {},
            });
          }
        })
        .catch((err) => {});
    },
    // 根据交易易哈希查询相关交易易信息
    async transactiondetaillist() {
      let that = this;
      await that.$http
        .get("/search_transactionHash_detailInfo", {
          params: {
            transaction_hash: this.inputvalue,
          },
        })
        .then((res) => {
          //  console.log(res);
          if (res.data[0].select_status === 1) {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/transactiondetail",
              query: {
                transaction_hash: this.inputvalue,
                // transaction_award:this.transaction_award
              },
            });
          } else {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/notfound",
              query: {},
            });
          }
        })
        .catch((err) => {});
    },
    // 区块哈希搜索
    async blockhaxisearch() {
      let that = this;
      var blockData = [];
      await that.$http
        .get("/search_blockInfo_blockHash", {
          params: {
            block_hash: this.inputvalue,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.data[0].search_main_transactionInfo.length !== 0) {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/blockdetails",
              query: { blockhaxi: this.inputvalue },
            });
          } else {
            this.jiazai = false;
            this.fullscreenLoading = false;
            this.$router.push({
              path: "/notfound",
              query: {},
            });
          }
        })
        .catch((err) => {});
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 10) {
        this.sticky2 = true;
      }
      if (scrollTop < 20) {
        this.sticky2 = false;
      }
      // console.log(scrollTop);
    },
  },
};
</script>
<style lang="less">
svg {
  width: 150px !important;
}
lottie-player {
  width: 54px !important;
  transform: scale(2.5);
}
.icons {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  font-size: 20px;
  font-family: "苹方-简";
  font-weight: bold;
  line-height: 28px;
  color: #2860c2;
  opacity: 1;
  position: relative;
  width: 120px;
  left: 50px;
  top: 40px;
  cursor: pointer;

  img {
    position: relative;
    left: 5px !important;
    top: 0px !important;
  }
}
.icon {
  position: relative;
  top: 18px;
  width: 200px;
  height: 229px;
  background: url("../../assets/images/index/Icon 11.png") no-repeat center/100%
    100%;
  z-index: 50;
  ul {
    width: 150px;
    position: relative;
    top: 40px;

    margin: 0 auto;
  }
  li {
    text-align: center;
    height: 28px;
    font-size: 20px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 28px;
    color: #2860c2;
    opacity: 1;
    margin-top: 15px;
    cursor: pointer;
    overflow: hidden;
  }
  li:hover {
    background: #2860c2;
    color: white;
  }
}

.popper__arrow {
  display: none !important;
}

.right {
}
.rightxia {
  transform: rotate(90deg);
}

.indexsearch .searchleft span {
  color: blue !important;
  width: 14.83px !important;
  height: 8.83px !important;
  position: relative;
  left: 54px !important;
  top: -19px !important;
}

.sticky2 {
  width: 1200px !important;
  height: 120px;
  position: fixed;
  top: 90px;
  margin: 0 auto !important;
}
// 搜索栏
.indexsearch {
  width: 1200px;
  height: 120px;
  // position: sticky;
  // top: 100px;
  z-index: 40;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  background: url("../../assets/images/index/Up.png") no-repeat center/100% 100%;
  .el-input__inner {
    width: 120px;
    padding: 0px !important;
    position: relative;
    left: -2px;
    top: 4px;
    font-size: 20px !important;
    font-family: "苹方-简" !important;
    font-weight: normal !important;
    line-height: 28px !important;
    color: rgba(40, 96, 194, 1) !important;
    border: none !important;
    outline: none !important;
  }
  .searchleft {
    width: 200px;
    height: 105px;
    position: relative;
    left: 8px;
    top: 8px;
    background: url("../../assets/images/index/Icon 1.png") no-repeat
      center/100% 100%;
    z-index: 40;
    .el-input__suffix-inner {
      display: none !important;
    }
    span {
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: normal;
      position: relative;
      left: 40px;
      top: 40px;
      line-height: 28px;
      color: rgba(40, 96, 194, 1);
      opacity: 1;
    }
    img {
      position: relative;
      right: -50px;
      top: 40px;
    }
  }
  .searchcenter {
    width: 819px;
    height: 50px;
    position: relative;
    display: flex;
    flex-direction: row;
    top: 36px;
    left: -2px;
    background: url("../../assets/images/index/Down.png") no-repeat center/100%
      100%;
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: normal;
      color: #a5a5a5;
    }
    input {
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: normal;

      width: 818px;
      height: 47px;
      position: relative;
      left: 1px;
      top: 2px;
      border: none;
      background-color: rgba(255, 255, 255, 0.5);
      outline: none;
      border-radius: 11px;
      padding-left: 30px;
    }
  }
  .searchright {
    button {
      width: 126px;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      position: relative;
      right: -20px;
      top: 35px;
      background: rgba(40, 96, 194, 1);
      box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 28px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    img {
      position: relative;
      top: 1px;
      left: -4px;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
