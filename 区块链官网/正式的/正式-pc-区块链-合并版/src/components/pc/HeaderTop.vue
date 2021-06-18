<template>
  <div class="header_top">
    <div class="index_left">
      <img src="@assets/images/second/logo.png" alt="" />
      <!-- <span>
        UENC
      </span>
      <span>
        Explorer
      </span> -->
    </div>
    <ul>
      <li>
        <router-link :to="{ path: '/pc/index' }">{{ $t("nav")[0] }}</router-link>
      </li>
      <li>
        <el-dropdown :hide-on-click="false">
          <span :class="{ 'el-dropdown-link': true, blue:$store.state.pcblues }">
            {{ $t("nav")[1] }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{ path: '/pc/block' }">
                <span @click="blueClass">
                  
                  {{ $t("nav")[2] }}
                </span>
              </router-link></el-dropdown-item
            >
            <el-dropdown-item>
              <router-link :to="{ path: '/pc/transaction' }">
              <span @click="blueClass">
 {{
                $t("nav")[3]
              }}
              </span>
             </router-link></el-dropdown-item
            >
            <el-dropdown-item>
              <router-link :to="{ path: '/pc/address' }">
              <span @click="blueClass">
 {{
                $t("nav")[4]
              }}
              </span>
             </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <router-link :to="{ path: '/pc/chart' }">
          <span @click="blueClass2">
            {{ $t("nav")[5] }}
          </span>
        </router-link>
      </li>
      <li>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="changeLanguage" style="width:100%;height:100%">
                {{ language2 }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#4276FF"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">区块链</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="/address">图表</el-menu-item>
      <el-submenu index="4">
        <template slot="title">中文</template>
        <el-menu-item index="4-1" @click="language">英文</el-menu-item>
      </el-submenu>
    </el-menu> -->
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
      blues: false,
      activeIndex: "1",
      nowLang: "",
      language: "",
      language2: "",
    };
  },
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
    blueClass() {
      this.$store.commit("pcBluesState", true);
      // this.reload();
    },
    blueClass2() {
       this.$store.commit("pcBluesState", false);
      // this.reload();
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
  },
  mounted() {},
  destroyed() {},
};
</script>

<style lang="less">
.router-link-active{
  color: #6624FA!important;
}
.el-dropdown-menu__item {
  font-size: 18px !important;
  a{
    color: #000000;
  }
   a:hover {
    list-style: none;
    text-decoration: none;
  }
}
.header_top {
  width: 100%;
  height:75px;
  background-color: #fff !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 101;
  position: fixed;
  top: 0;

  //  position: -webkit-sticky;
  //   position: sticky;
  //   top: 0px;
  //  a{
  //    color: red!important;
  //  }
  a:hover {
    list-style: none;
    text-decoration: none;
  }
  .blue {
    color: #915bde !important;
  }

  .el-dropdown-menu__item {
  
    padding: 10px;
    text-align: center;

    }
   

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 18px !important;
  }
  .el-menu {
    background-color: goldenrod !important;
    justify-content: center;
    align-items: center;
    li {
      font-size: 18px !important;
      font-family: Arial;
      font-weight: bold;
      line-height: 12px;
      color: #000000;
      a,span{
         color: #000000;
      }
      a:hover {
        list-style: none;
        text-decoration: none;
      }
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
    margin-left: 26px;
    img {
      width: 167px;
      height: 28px;
      // margin-right: 14px;
    }
    span:nth-child(2) {
      font-size: 18px;
      font-size: 18px;
      font-family: Alibaba PuHuiTi 2;
      font-weight: bold;
      line-height: 12px;
      color: #915bde;
      margin-right: 3px;
    }
    span:nth-child(3) {
      font-size: 18px;
      font-size: 18px;
      font-family: Alibaba PuHuiTi 2;
      font-weight: bold;
      line-height: 12px;
      color: #000000;
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    margin-right: 36px;
    .el-dropdown {
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      line-height: 12px;
      color: #000000;
    }
    li {
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      line-height: 40px;
      color: #000000;
      margin-left: 60px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      span,a{
         color: #000000;
      }
      // transition: all 0.5s;
    }
    // li::before {
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   width: 0%;
    //   bottom: 18px;
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
}
</style>
