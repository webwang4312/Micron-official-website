<template>
  <div class="headers">
    <div
      class="header-top
    "
    >
      <div class="index_left">
        <img src="@assets/images/second/logo.png" alt="" />
        <span>
          UENC
        </span>
        <span>
          Explorer
        </span>
      </div>
      <div class="index_right">
        <img
          src="@assets/images/second/菜单.png"
          v-if="$store.state.menu"
          @click="menuShow"
        />
        <i class="el-icon-close" v-else @click="menuHide"></i>
      </div>
    </div>
    <ul v-if="!$store.state.menu" class="menuslide">
      <li>
        <router-link :to="{ path: '/' }">
          <span @click="menuindex">
            {{ $t("nav")[0] }}
          </span>
        </router-link>
      </li>
      <li class="slide2" @click="menuSecond">
        <div :class="{ 'el-dropdown-link': true, blue: $store.state.blues }">
          {{ $t("nav")[1] }}
          <img src="@assets/images/second/menuxia.png" v-show="!secondmenu" />
           <img src="@assets/images/second/收回.png" v-show="secondmenu" />
          <!-- <i class="el-icon-caret-bottom" @click="menuSecond"></i> -->
        </div>
        <ul v-show="secondmenu">
          <li @click="blueClass">
            <router-link :to="{ path: '/block' }">
              {{ $t("nav")[2] }}
            </router-link>
          </li>
          <li @click="menu">
            <router-link :to="{ path: '/transaction' }">
              {{ $t("nav")[3] }}
            </router-link>
          </li>
          <li @click="menu">
            <router-link :to="{ path: '/address' }">
              {{ $t("nav")[4] }}
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link :to="{ path: '/chart' }">
          <span @click="blueClass2">
            {{ $t("nav")[5] }}
          </span>
        </router-link>
      </li>
      <li>
        <div @click="changeLanguage" style="width:100%;height:100%">
          {{ language2 }}
        </div>
      </li>
    </ul>
    <Search></Search>
  </div>
</template>

<script>
import Search from "@components/common/Search.vue";
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
    };
  },
  components: { Search },
  created() {
    this.nowLang = this.$i18n.locale;
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
    menuSecond() {
      this.secondmenu = !this.secondmenu;
    },
    menuindex() {
      this.$store.commit("menuState", true);
      this.$store.commit("bluesState", false);
    },
    menu() {
      this.$store.commit("menuState", true);
      this.$store.commit("bluesState", true);
    },
    menuShow() {
      this.$store.commit("menuState", false);
    },
    menuHide() {
      this.$store.commit("menuState", true);
    },
    blueClass() {
      this.$store.commit("menuState", true);
      this.$store.commit("bluesState", true);
      this.reload();
    },
    blueClass2() {
      this.$store.commit("bluesState", false);
      this.$store.commit("menuState", true);
      this.reload();
    },
    changeLanguage() {
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";

        this.language = "1";
        this.language2 = "中文";
        this.$store.commit("menuState", true);
        this.reload();
      } else {
        this.$i18n.locale = "cn";

        this.language = "2";
        this.language2 = "En";
        this.$store.commit("menuState", true);
        this.reload();
      }
    },
    handleSelect(key, keyPath) {},
  },
  mounted() {},
  destroyed() {},
};
</script>

<style lang="less">
.headers {
  width: 100%;
  height: auto;
  background-color: #fff !important;
  position: sticky;
  top: 0;
  margin-bottom: 21px;
  .el-icon-close{
  transform: scale(2.5);
  }
  .menuslide {
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    li {
      height: 50px;
      margin-top: 20px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: #9da5bb;
    }
    .slide2 {
      height: auto;

      padding-left: 15px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: #9da5bb;
      ul {
        li {
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

        align-items: center;
        text-align: center;
      }
      img {
        width: 30px;
        height: 30px;
      }
      i {
        display: inline-block;
        width: 33px;
        height: 25px;
        color: #965EE5;
      }
    }
  }
  .header-top {
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
  }

  .blue {
    color: #965EE5 !important;
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
      color: #965EE5;
    }
  }

  .index_left {
    display: flex;
    flex-direction: row; /*这里可以不写，flex布局默认方向横向即row*/
    justify-content: center;
    align-items: center;
    margin-left: 11px;
    img {
      width: 38px;
      height: 46px;
      margin-right: 14px;
      margin-top: 7px;
    }
    span:nth-child(2) {
      font-size: 16px;
      font-family: Arial;
      font-weight: bold;
      line-height: 12px;
      color: #965EE5;
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
