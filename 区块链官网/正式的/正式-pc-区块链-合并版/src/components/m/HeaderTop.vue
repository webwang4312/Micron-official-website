<template>
  <div class="headers">
    <div
      class="header-top
    "
    >
      <div class="index_left">
        <img src="@assets/imagesen/second/logo.png" alt="" @click="goHome" />
        <!-- <span>
          UENC
        </span>
        <span>
          Explorer
        </span> -->
      </div>
      <div class="index_right">
        <img src="@assets/imagesen/second/菜单.png" @click="menuShow" />
      </div>
    </div>
    <van-popup v-model="show" position="top">
      <div
        class="header-tops
    "
      >
        <div class="index_left">
          <img src="@assets/imagesen/second/logo.png" @click="goHome" />
          <!-- <span>
          UENC
        </span>
        <span>
          Explorer
        </span> -->
        </div>
        <div class="index_right">
          <i class="el-icon-close" @click="menuHide"></i>
        </div>
      </div>
      <ul class="menuslide">
        <li @click="menu">
          <router-link :to="{ path: '/m/index' }">
            <span @click="menuindex">
              {{ $t("nav")[0] }}
            </span>
          </router-link>
        </li>
        <li class="slide2" @click="menuSecond">
          <div :class="{ 'el-dropdown-link': true, blue: $store.state.mblues }">
            {{ $t("nav")[1] }}
            <img
              src="@assets/imagesen/second/menuxia.png"
              v-show="!secondmenu"
            />
            <img src="@assets/imagesen/second/收回.png" v-show="secondmenu" />
            <!-- <i class="el-icon-caret-bottom" @click="menuSecond"></i> -->
          </div>
          <ul v-show="secondmenu">
            <li @click="menuBlue">
              <router-link :to="{ path: '/m/block' }">
                {{ $t("nav")[2] }}
              </router-link>
            </li>
            <li @click="menuBlue">
              <router-link :to="{ path: '/m/transaction' }">
                {{ $t("nav")[3] }}
              </router-link>
            </li>
            <li @click="menuBlue">
              <router-link :to="{ path: '/m/address' }">
                {{ $t("nav")[4] }}
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="menu">
          <router-link :to="{ path: '/m/chart' }">
            <span @click="blueClass2">
              {{ $t("nav")[5] }}
            </span>
          </router-link>
        </li>
        <li @click="changeLanguage" style="padding-left:15px">
          <div style="width:100%;height:100%; color: #9da5bb;">
            {{ language2 }}
          </div>
        </li>
      </ul></van-popup
    >

    <Search :select="select"></Search>
  </div>
</template>

<script>
import Search from "@components/m/Search.vue";
export default {
  name: "headertop",
  inject: ["reload"],
  data() {
    return {
      blues: false,
      activeIndex: "1",
      nowLang: "",
      language: "",
      language2: "",
      secondmenu: false,
      show: false,
      searchlist: [],
    };
  },
  watch: {
   
  },
  components: { Search },
  created() {
     

    if (localStorage.getItem("lang") == null) {
      this.$i18n.locale = "cn";
    } else {
      this.$i18n.locale = localStorage.getItem("lang");
    }
    this.nowLang = localStorage.getItem("lang");
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
          label: "Height",
        },
        {
          value: "2",
          label: "Trans",
        },
        // {
        //   value: "3",
        //   label: "Block",
        // },
      ];
    }
    this.language = this.nowLang;
    if (this.language == "cn") {
      this.language = "中文";
      this.language2 = "EN";
    } else {
      this.language = "EN";
      this.language2 = "中文";
    }
    //console.log(this.$i18n.locale);
  },
  mounted() {},
  methods: {
    goHome() {
      this.$router.push({
        path: "/m/index",
      });
      this.show=false
    },
    menuSecond() {
      this.secondmenu = !this.secondmenu;
    },
    menuindex() {
      // this.$store.commit("menuState", true);
      // this.$store.commit("mBluesState", false);
    },
    menuBlue() {
      this.$store.commit("mBluesState", true);
      this.show = false;
    },
    menu() {
      this.show = false;
      // this.$store.commit("menuState", true);
      this.$store.commit("mBluesState", false);
    },
    menuShow() {
      this.show = true;
      // this.$store.commit("menuState", false);
    },
    menuHide() {
      this.show = false;
      // this.$store.commit("menuState", true);
    },

    blueClass2() {
      // this.$store.commit("mBluesState", false);
      // this.$store.commit("menuState", true);
      this.reload();
    },
    changeLanguage() {
      // console.log(localStorage.lang);
       console.log(this.$i18n.locale);
      // console.log(localStorage.getItem("lang"));
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", this.$i18n.locale);
       
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
            label: "Trans",
          },
          // {
          //   value: "3",
          //   label: "Block",
          // },
        ];
        this.language = "1";
        this.language2 = "中文";
        this.$store.commit("menuState", true);
       this.reload()
        
      } else {
        this.$i18n.locale = "cn";
        localStorage.setItem("lang", this.$i18n.locale);
       
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
        this.language = "2";
        this.language2 = "En";
        this.$store.commit("menuState", true);
          this.reload()
      }
       this.reload()
    },
    
  },
};
</script>

<style lang="less">
.router-link-exact-active {
  color: #965ee5 !important;
}
.van-overlay {
}
.van-popup {
  max-height: 60%;
  .header-tops {
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    position: sticky;
    top: 0;

    border-bottom: 1px solid #e6e6e6;
    .el-icon-close {
      margin-right: 15px;
    }
  }
  .menuslide > li {
    height: 50px;
    margin-top: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 50px;
  }
  .menuslide {
    width: 100%;
    li {
      a {
        color: #9da5bb;
        margin-left: 15px;
      }
    }
    .slide2 {
      height: auto;

      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: #9da5bb !important;
      .el-dropdown-link {
        margin-left: 15px;
      }
      ul {
        li {
          height: 50px;
          margin-top: 20px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 22px;
          color: #9da5bb;
          a {
            margin-left: 30px;
          }
          span {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: #9da5bb;
          }
        }
      }
      .el-dropdown-link {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 50px;
        align-items: center;
        text-align: center;
        padding-right: 15px;
      }
      img {
        width: 30px;
        height: 30px;
      }
      i {
        display: inline-block;
        width: 33px;
        height: 25px;
        color: #965ee5;
      }
    }
  }
}
.headers {
  width: 100%;
  height: auto;
  background: #ffffff;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding-bottom: 21px;
  z-index: 100;
  .el-icon-close {
    transform: scale(2.5);
  }

  .header-top {
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    // border-top:1px solid #E6E6E6 ;
    border-bottom: 1px solid #e6e6e6;
    // position: sticky;
    // top: 0;
  }

  .blue {
    color: #965ee5 !important;
    font-size: 16px;
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
      font-size: 15px;
      font-family: Arial;
      font-weight: bold;
      line-height: 12px;
      // color: #965ee5;
    }
  }

  .index_left {
    display: flex;
    flex-direction: row; /*这里可以不写，flex布局默认方向横向即row*/
    justify-content: center;
    align-items: center;
    margin-left: 11px;
    img {
      width: 142px;
      height: 24px;
      margin-right: 14px;
      margin-top: 7px;
    }
    span:nth-child(2) {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      line-height: 12px;
      color: #965ee5;
      margin-right: 4px;
    }
    span:nth-child(3) {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      line-height: 12px;
      color: #000000;
    }
  }
  .index_right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    img {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
