<template>
  <div class="headers">
    <div
      class="header-top
    "
    >
      <div class="index_left">
        <img src="@assets/images/second/logo.png" alt="" @click="goHome" />
        <!-- <span>
          UENC
        </span>
        <span>
          Explorer
        </span> -->
      </div>
      <div class="index_right">
        <img src="@assets/images/second/菜单.png" @click="menuShow" />
      </div>
    </div>
    <van-popup v-model="show" position="top">
      <div
        class="header-tops
    "
      >
        <div class="index_left">
          <img src="@assets/images/second/logo.png" alt="" />
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
      <el-menu
        class="menuslide"
        router
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item @click="menu" index="/">
          {{ $t("nav")[0] }}
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title"> {{ $t("nav")[1] }}</template>

          <el-menu-item index="/block">
            {{ $t("nav")[2] }}
          </el-menu-item>
          <el-menu-item index="/transaction">
            {{ $t("nav")[3] }}
          </el-menu-item>
          <el-menu-item index="/address">
            {{ $t("nav")[4] }}
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/chart">
          {{ $t("nav")[5] }}
        </el-menu-item>
        <li @click="changeLanguage" style="padding-left:15px">
          <div style="width:100%;height:100%;">
            {{ language2 }}
          </div>
        </li>
      </el-menu></van-popup
    >

    <Search :select="select" :valuename="valuename"></Search>
  </div>
</template>

<script>
import Search from "@components/common/Search.vue";
export default {
  name: "headertop",
  inject: ["reload"],
  data() {
    return {
      activeIndex: "1",
      blues: false,

      nowLang: "",
      language: "",
      language2: "",
      secondmenu: false,
      show: false,
      searchlist: [],
    };
  },
  watch: {
    nowLang(oldvalue, newvalue) {
      // console.log(oldvalue, newvalue);
    },
  },
  components: { Search },
  created() {
    // console.log(localStorage.getItem("lang"));

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
      this.valuename = "请选择";
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
      this.valuename = "Select";
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
    handleSelect(key, keyPath) {
      this.show = false;
    },
    goHome() {
      this.$router.push({
        path: "/",
      });
    },
    menuSecond() {
      this.secondmenu = !this.secondmenu;
    },
    menuindex() {
      // this.$store.commit("menuState", true);
      // this.$store.commit("bluesState", false);
    },
    menuBlue() {
      this.$store.commit("bluesState", true);
      this.show = false;
    },
    menu() {
      this.show = false;
      // this.$store.commit("menuState", true);
      this.$store.commit("bluesState", false);
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
      // this.$store.commit("bluesState", false);
      // this.$store.commit("menuState", true);
      this.reload();
    },
    changeLanguage() {
      // console.log(localStorage.lang);
      // console.log(this.$i18n.locale);
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
        this.valuename = "Select";
        this.language = "1";
        this.language2 = "中文";
        this.$store.commit("menuState", true);
        this.reload();
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
        this.valuename = "请选择";
        this.language = "2";
        this.language2 = "En";
        this.$store.commit("menuState", true);
        this.reload();
      }
      this.reload();
    },
  },
};
</script>

<style lang="less">
.el-menu-item {
  color: #9da5bb !important;
}
.el-submenu__title {
  color: #9da5bb !important;
}
.el-submenu__title:hover {
  background-color: white !important;
}
.is-opened {
  height: auto !important;
  color: #9da5bb !important;
}
.is-active {
  background: #f9f5ff !important;
  font-size: 16px !important;
  font-family: PingFang SC !important;
  font-weight: 400 !important;
  color: #6624fa !important;
  opacity: 1;
}
.van-overlay {
}
.van-popup {
  max-height: 60%;
  position: fixed;
  top: 0;
  z-index: 3;
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
    z-index: 20;
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
    color: #9da5bb;
  }
  .menuslide {
   
    li {
      a {
        margin-left: 15px;
      }
    }
    .slide2 {
      height: auto;

      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: #9da5bb;
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
    // background-color: goldenrod !important;
    justify-content: center;
    align-items: center;
    li {
      font-size: 15px;
      font-family: Arial;
      font-weight: bold;
      // line-height: 12px;
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
