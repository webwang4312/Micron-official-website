<template>
  <div class="headersecond_top">
    <div class="index_left">
      <img src="@assets/images/second/logo.png" alt="" @click="goHome"/>
      <!-- <span> UENC </span>
      <span> Explorer </span> -->
    </div>
    <ul class="second_center">
      <li>
        <router-link :to="{ path: '/' }">{{ $t("nav")[0] }}</router-link>
      </li>
      <li>
        <el-dropdown :hide-on-click="false">
          <span :class="{ 'el-dropdown-link': true, blue: blues }">
            {{ $t("nav")[1] }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{ path: '/block' }">
                <span @click="blueClass">{{ $t("nav")[2] }} </span>
              </router-link></el-dropdown-item
            >
            <el-dropdown-item>
              <router-link :to="{ path: '/transaction' }">{{
                $t("nav")[3]
              }}</router-link></el-dropdown-item
            >
            <el-dropdown-item
              ><router-link :to="{ path: '/address' }">{{
                $t("nav")[4]
              }}</router-link></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <router-link :to="{ path: '/chart' }">
          <span @click="blueClass2">
            {{ $t("nav")[5] }}
          </span>
        </router-link>
      </li>
      <li>
        <div class="indexsecondsearch">
          <div class="searchleft">
            <el-select
              v-model="value"
              placeholder="请选择"
              @change="selectChanged"
            >
              <el-option
                v-for="item in select"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <i
            class="el-icon-minus"
            style="
              color:  #E9ECED;
              transform: rotate(90deg);
              width: 0px;
              height: 33px;
            "
          ></i>
          <div class="searchcenter">
            <input
              type="text"
              :placeholder="$t('search[0]')"
              v-model="inputvalue"
              ref="search"
              @keyup="keyup"
            />
          </div>

          <img
            src="@assets/images/second/搜索按钮.png"
            style="cursor: pointer"
            @click="searchselect"
          />
        </div>
      </li>
      <li>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="changeLanguage" style="width: 100%; height: 100%">
                {{ language2 }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import cn from "../../i18n/cn";
import en from "../../i18n/en";
export default {
  name: "headertop",
  inject: ["reload"],
  data() {
    return {
      blues: Boolean,
      activeIndex: "1",
      nowLang: "",
      language: "",
      language2: "",
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
    };
  },
  created() {
    this.blues = this.$store.state.blues;
    //console.log(this.blues);
    this.nowLang = this.$i18n.locale;
    this.language = this.nowLang;
    if (this.language == "cn") {
      this.language = "中文";
      this.language2 = "EN";
    } else {
      this.language = "EN";
      this.language2 = "中文";
    }
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
        // {
        //   value: "3",
        //   label: "区块哈希",
        // },
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
          label: "block height",
        },
        {
          value: "2",
          label: "Transaction",
        },
        // {
        //   value: "3",
        //   label: "Block",
        // },
      ];
    }
    if (this.value == "") {
      this.value = "0";
    }
    //console.log(this.$i18n.locale);
  },
  mounted() {},
  methods: {
    goHome(){
 this.$router.push({
              path: "/",
             
            });
    },
    blueClass() {
      this.$store.commit("bluesState", true);
      this.reload();
    },
    blueClass2() {
      this.$store.commit("bluesState", false);
      this.reload();
    },
    changeLanguage() {
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";
        this.reload();
        this.language = "1";
        this.language2 = "2";
      } else {
        this.$i18n.locale = "cn";
        this.reload();
        this.language = "2";
        this.language2 = "1";
      }
    },
    handleSelect(key, keyPath) {},
    // selectChanged(value) {
    //   switch (value) {
    //     // 地址搜索
    //     case "0":
    //       if (this.inputvalue !== "") {
    //         this.addresssearch();
    //       }
    //       break;
    //     case "1":
    //       // 区块高度
    //       if (this.inputvalue !== "") {
    //         this.blocksearch();
    //       }
    //       break;
    //     // 交易哈希
    //     case "2":
    //       if (this.inputvalue !== "") {
    //         this.transactiondetaillist();

    //       }
    //       break;
    //     // 区块哈希
    //     case "3":
    //       if (this.inputvalue !== "") {
    //         this.blockhaxisearch();
    //       }
    //       break;
    //   }
    // },
    keyup(event) {
      // console.log(event);
      if (this.inputvalue !== "") {
        if (event.keyCode == "13") {
          this.searchselect();
        }
      }
    },
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
    searchselect() {
      switch (this.value) {
        // 地址搜索
        case "0":
          if (this.inputvalue !== "") {
            this.inputvalue=this.inputvalue.replace(/\s*/g,"");
            this.addresssearch();
          }
          break;
        case "1":
          if (this.inputvalue !== "") {
            this.inputvalue=this.inputvalue.replace(/\s*/g,"");
            this.blocksearch();
          }
          break;
        // 交易哈希
        case "2":
          if (this.inputvalue !== "") {
            this.inputvalue=this.inputvalue.replace(/\s*/g,"");
            this.transactiondetaillist();
          }
          break;
        // 区块哈希
        case "3":
          if (this.inputvalue !== "") {
            this.inputvalue=this.inputvalue.replace(/\s*/g,"");
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
          //   console.log(res.data[0].total_page[0].totalPageNum);
          if (res.data[0].search_wallet_balance_for_walletAddress.length == 0) {
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
               this.inputvalue=''
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
            this.$router.push({
              path: "/blockdetail",
              query: {
                block: this.inputvalue,
                // transaction_award:this.transaction_award
              },
            });
            this.reload();
          } else {
             this.$router.push({
              path: "/notfound",
              query: { address: "height" },
            });
             this.reload();
           this.inputvalue=''
            // this.$router.push({
            //   path: "/notfound",
            //   query: {},
            // });
          }
        })
        .catch((err) => {});
    },
    // 根据交易易哈希查询相关交易易信息
    async transactiondetaillist() {
      //console.log(this.inputvalue);
      let that = this;
      await that.$http
        .get("/search_transactionHash_detailInfo", {
          params: {
            transaction_hash: this.inputvalue,
          },
        })
        .then((res) => {
          //console.log(res);
          if (res.data[0].select_status === 1) {
            this.$router.push({
              path: "/transactiondetail",
              query: {
                transaction_hash: this.inputvalue,
                // transaction_award:this.transaction_award
              },
            });
            this.reload();
             this.inputvalue=''
          } else {
            this.$router.push({
              path: "/notfound",
              query: { address: "transaction" },
            });
             this.reload();
            // this.$router.push({
            //   path: "/notfound",
            //   query: {},
            // });
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
            this.$router.push({
              path: "/blockdetails",
              query: { blockhaxi: this.inputvalue },
            });
            this.reload();
             this.inputvalue=''
          } else {
            this.$router.push({
              path: "/notfound",
              query: {},
            });
          }
        })
        .catch((err) => {});
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style lang="less">
.headersecond_top {
  width: 100%;
  height: 60px;
  background-color: #fff !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
  .blue {
    color: #915bde !important;
  }
 
  .el-dropdown-menu__item {
    width: 80px;
    padding: 10px;
    text-align: center;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 15px !important;
  }
  .el-menu {
    background-color: goldenrod !important;
    justify-content: center;
    align-items: center;
    li {
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      line-height: 12px;
      color: #915bde;
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .index_left {
    cursor: pointer;
    display: flex;
    flex-direction: row; /*这里可以不写，flex布局默认方向横向即row*/
    align-items: center;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    img {
     width: 167px;
      height: 28px;
      // margin-right: 14px;
     
    }
    span:nth-child(2) {
      font-size: 15px;
      font-family: Alibaba PuHuiTi 2;
      font-weight: bold;
      line-height: 12px;
      color: #915bde;
      margin-right: 3px;
    }
    span:nth-child(3) {
      font-size: 15px;
      font-size: 15px;
      font-family: Alibaba PuHuiTi 2;
      font-weight: bold;
      line-height: 12px;
      color: #000000;
    }
  }
  .second_center {
    display: flex;
    flex-direction: row;
    margin-right: 54px;
    // margin-left: 632px;
    .el-dropdown {
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      line-height: 12px;
      color: #000000;
    }
    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(3) {
      margin-right: 60px;
    }
    li {
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      line-height: 40px;
      color: #000000;
      display: inline-block;
      position: relative;
      cursor: pointer;
      // transition: all 0.5s;
    }
    // li::before {
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   width: 0%;
    //   bottom: 15px;
    //   left: 100%;
    //   border-bottom: 2px solid red;
    //   transition: all 0.5s;
    // }
    // li:hover::before {
    //   left: 0;
    //   width: 100%;
    // }
    // li:hover ~ li::before {
    //   left: 0;
    // }
  }
  // 搜索栏
  .indexsecondsearch {
    width: 599px;
    height: 44px;
    // position: sticky;
    // top: 100px;
    z-index: 40;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    opacity: 1;
    border-radius: 11px;
    // margin-right: 53px;
    // margin-left: 61px;
    .searchleft {
    }
    .el-input__inner {
      height: 45px;
      font-size: 15px;
      font-family: Arial;
      font-weight: 400;
      line-height: 18px;
      color: #515151;
      border: none;
      border-color: none;
    }
    .el-input--suffix {
      width: 122px;
      outline: none;
      input {
        border-top: 2px solid #e9eced;
        border-bottom: 2px solid #e9eced;
        border-left: 2px solid #e9eced;
        border-top-left-radius: 11px;
        border-bottom-left-radius: 11px;
        outline: none;
      }
    }
    .el-input__icon {
      line-height: 45px;
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-color: none !important;
    }
    .searchcenter {
      input {
        border-top: 2px solid #e9eced;
        border-bottom: 2px solid #e9eced;
        width: 346.5px;
        height: 100%;
        border-right: none;
        border-left: none;
        outline: none;
        font-size: 15px;
        font-family: Arial;
        font-weight: 400;
        line-height: 18px;
        color: black;
        padding-left: 22.5px;
      }
      input::-webkit-input-placeholder {
        /* Edge */
        font-size: 15px;
        font-family: Arial;
        font-weight: 400;
        line-height: 12px;
        color: #cccccc;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        font-size: 15px;
        font-family: Arial;
        font-weight: 400;
        line-height: 18px;
        color: #cccccc;
      }
      input::placeholder {
        font-size: 15px;
        font-family: Arial;
        font-weight: 400;
        line-height: 18px;
        color: #cccccc;
      }
    }
  }
}
.el-scrollbar__wrap {
  overflow: none;
}
</style>
