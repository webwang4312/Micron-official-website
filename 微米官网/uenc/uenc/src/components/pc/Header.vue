<template>
  <div :class="headerclass ? 'header' : 'header top'">
    <div class="content">
      <div class="logo">
        <router-link to="/pc/Index"
          ><img src="@/assets/images/index/logo@2x.png" alt=""
        /></router-link>
      </div>
      <div class="nav">
        <el-menu
          class="el-menu-vertical-demo"
          mode="horizontal"
          active-text-color="#fff"
          text-color="#fff"
          :default-active="activeIndex"
        >
          <el-menu-item index="Index">
            <router-link :to="'/' + goPage + '/Index'">
              {{ type === "zh" ? "首页" : "Home" }}
            </router-link>
          </el-menu-item>
          <el-menu-item index="Technology">
            <router-link :to="'/' + goPage + '/Technology'">
              {{ type === "zh" ? "技术" : "Technology" }}
            </router-link>
          </el-menu-item>
          <el-menu-item index="Developers">
            <router-link :to="'/' + goPage + '/Developers'">
              {{ type === "zh" ? "开发者" : "Developers" }}
            </router-link>
          </el-menu-item>
          <el-submenu index="Fastoken">
            <template slot="title"
              >{{ type === "zh" ? "钱包" : "Wallet" }}
            </template>
            <!-- <el-menu-item index="4-1">
                <router-link to="/"> {{type === "zh" ?'访问钱包':'Access Wallet'}} </router-link>
              </el-menu-item> -->
            <el-menu-item index="4-2">
              <router-link :to="'/' + goPage + '/Fastoken'">
                {{ type === "zh" ? "Fastoken下载" : "Fastoken downloads" }}
              </router-link>
            </el-menu-item>
            <el-menu-item index="4-3">
              <a
                target="_blank"
                href="http://www.uenc.io/chainExplorer/index.html#/"
                >{{ type === "zh" ? "区块链浏览器" : "Blockchain browser" }}</a
              >
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="Blog">
            <router-link :to="'/' + goPage + '/Blog'">
              {{ type === "zh" ? "博客" : "Blog" }}
            </router-link>
          </el-menu-item>
          <el-submenu index="community">
            <template slot="title"
              >{{ type === "zh" ? "社区" : "Community" }}
            </template>
            <el-menu-item index="6-1">
              <a target="_blank" href="https://github.com/uenctech">Github</a>
            </el-menu-item>
            <el-menu-item index="6-2">
              <a target="_blank" href="https://t.me/UENCOfficial">Telegram</a>
            </el-menu-item>
            <el-menu-item index="6-3">
              <a target="_blank" href="https://twitter.com/uencclub">Twitter</a>
            </el-menu-item>
            <el-menu-item index="6-4">
              <a target="_blank" href="https://discord.com/invite/AAPMAjtcNS"
                >discord</a
              >
            </el-menu-item>
            <el-menu-item index="6-5">
              <a target="_blank" href="https://fb.me/uencclub">Facebook</a>
            </el-menu-item>
            <el-menu-item index="6-6">
              <a target="_blank" href="https://www.reddit.com/r/UENC/"
                >Reddit</a
              >
            </el-menu-item>
            <el-menu-item index="6-7">
              <a target="_blank" href="https://uenc.medium.com/">Medium</a>
            </el-menu-item>
            <!-- <el-menu-item index="6-8">
              <router-link :to="'/' + goPage + '/community/Proposal'">{{
                type === "zh" ? "提案" : "Proposal"
              }}</router-link>
            </el-menu-item>
            <el-menu-item index="6-9">
              <router-link :to="'/' + goPage + '/community/Vote'">{{
                type === "zh" ? "投票" : "Vote"
              }}</router-link>
            </el-menu-item> -->
          </el-submenu>
        </el-menu>

        <div class="login" v-if="isLogin">
          <el-button plain size="small" @click="login" class="login_style">{{
            type === "zh" ? "登录" : "Login"
          }}</el-button>
        </div>
        <div class="login" v-if="!isLogin">
          <el-menu
            class="el-menu-vertical-demo"
            mode="horizontal"
            active-text-color="#fff"
            text-color="#fff"
          >
            <el-submenu index="userInfo">
              <template slot="title">
                <img
                  src="../../assets/images/index/头像.png"
                  alt=""
                  style="width:30px;height:30px;margin-right:10px"
              /></template>

              <template slot="title">{{ userName }} </template>

              <el-menu-item
                index="7-2"
                v-if="usersStatus == '1'"
                @click="check"
                >{{ type === "zh" ? "绑定钱包" : "Bind Wallet" }}</el-menu-item
              >
              <el-menu-item index="7-3" v-else @click="getUsersAddress">{{
                type === "zh" ? "查看钱包" : "Check Wallet"
              }}</el-menu-item>
              <el-menu-item index="7-1" @click="logout">{{
                type === "zh" ? "退出登录" : "Log out"
              }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          mode="horizontal"
          active-text-color="#fff"
          text-color="#fff"
        >
          <el-menu-item class="noweight" index="8-1" @click="changelang">{{
            language
          }}</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div
      :class="dialogVisible ? 'block dialog' : 'none dialog'"
      id="dialog"
      :style="`width:100vw;height:100vh;z-index:999`"
    >
      <div class="details">
        <div class="close" @click="close"><i class="el-icon-close"></i></div>
        <Login
          ref="login"
          @close="close"
          @showUserInfo="showUserInfo"
          @checkUsersStatus="checkUsersStatus"
          v-if="dialogType == 'login'"
        ></Login>
        <CheckUser v-if="dialogType == 'check'" @close="close"></CheckUser>
        <ShowMoney
          v-if="dialogType == 'money'"
          @close="close"
          :moneyAddress="moneyAddress"
        ></ShowMoney>
      </div>
    </div>
  </div>
</template>
<script>
import {
  WebLogout,
  CheckUsersStatus,
  GetUsersAddress,
} from "@/assets/server/api.js";
import Login from "./Login.vue";
import CheckUser from "./CheckUser.vue";
import ShowMoney from "./ShowMoney.vue";
import { goPAGE } from "@/utils/utils";
export default {
  components: {
    Login,
    CheckUser,
    ShowMoney,
  },
  watch: {
    $route: {
      // 监听路由，页面跳页处理路由并且让当前页面的路由对应到 default-active 从而显示当前菜单选中状态
      handler: function(val, oldVal) {
        this.getShowMenu(val.path);
        this.getPath(val.path);
      },
      // 深度观察监听
      deep: true,
    },
  },
  data() {
    return {
      language: "EN",
      moneyAddress: "",
      headerclass: true,
      type: "",
      dialogVisible: false,
      width: "",
      height: "",
      isGoback: true,
      pathList: [
        {
          type: "proposal",
          path: "/pc/community/Proposal",
          isGoback: false,
        },
        {
          type: "proposal",
          path: "/pc/community/Vote",
          isGoback: false,
        },
        {
          type: "proposal",
          path: "/pc/community/Proposal/Add",
          isGoback: true,
        },
        {
          type: "proposal",
          path: "/pc/community/Proposal/Details",
          isGoback: true,
        },
        {
          type: "task",
          path: "/pc/Task/Details",
          isGoback: true,
        },
        {
          type: "CoreMembersDetails",
          path: "/pc/CoreMembersDetails",
          isGoback: true,
        },
      ],
      isLogin: true,
      userName: "",
      dialogType: "",
      usersStatus: "",
      activeIndex: "Index",
    };
  },
  created() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    this.width = width;
    this.height = height;
    this.getShowMenu(this.$route.path);
    this.getPath(this.$route.path);
    this.userName = localStorage.getItem("username");
    if (this.userName) {
      this.isLogin = false;
    }
    this.checkUsersStatus();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.type = this.$i18n.locale;
    // 监听（绑定）滚轮 滚动事件
  },
  computed: {
    goPage() {
      return goPAGE();
    },
  },
  methods: {
    test() {
      // console.log('1');
    },
    getPath(path) {
      //console.log(path, "pppppp");
      let activeIndex = path.split("/")[2];
      this.activeIndex = activeIndex;
      //console.log(activeIndex, "activeIndex");
    },
    async getUsersAddress() {
       let datas = new FormData();
          datas.append("loginName", this.userName);
      const data = await GetUsersAddress(datas);
      // const data = await GetUsersAddress(this.userName);
      if (data.code == 0) {
        this.moneyAddress = data.data;
        this.dialogType = "money";
        this.dialogVisible = true;
      }
    },
    async checkUsersStatus() {
      
      this.userName = localStorage.getItem("username");
     
      let datas = new FormData();
          datas.append("loginName", this.userName);
      const data = await CheckUsersStatus( datas);
      // console.log(this.userName);
      //  console.log(data);
      this.usersStatus = data.data;
      localStorage.setItem("usersStatus", data.data);
    },
    logout() {
      this.$confirm(
        this.$t("index.switch") === "cn"
          ? "确定退出当前账号?"
          : "Make sure to exit the current account?",
        this.$t("index.switch") === "cn" ? "提示" : "prompt",
        {
          confirmButtonText:
            this.$t("index.switch") === "cn" ? "确定" : "confirm",
          cancelButtonText:
            this.$t("index.switch") === "cn" ? "取消" : "cancel",
          type: "warning",
        }
      )
        .then(async () => {
          const data = await WebLogout();
          if (data.code == "0") {
            this.$message({
              type: "success",
              message:
                this.$t("index.switch") === "cn" ? "退出成功" : "success",
            });
            localStorage.setItem("username", "");
            this.isLogin = true;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message:
              this.$t("index.switch") === "cn"
                ? "已取消退出"
                : "Cancelled exit",
          });
        });
    },
    getShowMenu(path) {
      let isGoback = true;
      for (const item of this.pathList) {
        if (path === item.path) {
          isGoback = item.isGoback;
          break;
        }
      }
      this.isGoback = isGoback;
    },
    goBack() {
      this.$router.back(-1);
    },
    login() {
      this.dialogVisible = true;
      this.dialogType = "login";
      this.$nextTick(() => {
        this.$refs.login.getCaptchaImage();
      });
    },
    check() {
      this.dialogVisible = true;
      this.dialogType = "check";
    },
    close() {
      if (this.$refs.login) {
        this.$refs.login.type = "login";
      }
      this.dialogType = "";
      this.dialogVisible = false;
      this.checkUsersStatus();
    },
    handleClose(done) {
      this.$confirm(
        this.$t("index.switch") === "cn" ? "确认关闭？" : "Confirm shutdown?"
      )
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    changelang() {
      let type = "";
      if (this.type == "en") {
        type = "zh";
        this.language = "EN";
      }
      if (this.type == "zh") {
        type = "en";
        this.language = "中文";
      }
      sessionStorage.setItem("locale", type);
      this.type = sessionStorage.getItem("locale");
      this.$i18n.locale = sessionStorage.getItem("locale");
    },
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 100) {
        this.headerclass = false;
      } else {
        this.headerclass = true;
      }
    },
    showUserInfo(name) {
      this.isLogin = false;
      this.userName = name;
    },
  },
};
</script>
<style lang="less" scoped>
.noweight {
  font-weight: normal !important;
}
.noweight.is-active {
  font-weight: normal !important;
}

.header {
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  z-index: 2;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0);
  .el-submenu {
    margin-right: 60px;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 55px;
      margin-top: 10px;
    }
  }
}
.content {
  width: 100%;
  height: 80px;
  // width: 1140px;
  margin: 0 auto;
  line-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav {
    display: flex;
    flex-direction: row;

    padding-right: 20px;
    // margin-right: 40px;
    li {
      height: 100%;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 79px;
      color: #ffffff;
      a {
        color: #ffffff;
      }
    }
    .el-button {
      background-color: rgba(0, 0, 0, 0);
      margin: 0 20px;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
    }
  }
  .login_style {
    // width: 120px;
    height: 40px;
    opacity: 1;
    // border: 1px solid #ffffff;
    border-radius: 11px;
    // line-height: 40px;
  }
}
.top {
  background: rgba(80, 84, 149, 1);
  // opacity: 0.8;
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .details {
    width: 460px;
    background: #fff;
    position: relative;
    border-radius: 10px;
    color: #000;
    // overflow-y: scroll;
    // overflow: hidden;
    padding: 30px 30px 41px 30px;
    box-sizing: border-box;
    z-index: 10000;
    .close {
      position: absolute;
      right: 32px;
      top: 32px;
      font-size: 26px;
      cursor: pointer;
      color: #305bbc;
    }
  }
}
.none {
  display: none;
}
.block {
  display: flex;
}
</style>

<style lang="less">
.router-link-exact-active {
  font-weight: 600 !important;
}

.el-submenu__title {
  font-size: 18px !important;
  font-family: Microsoft YaHei !important;
  font-weight: 400 !important;

  color: #ffffff !important;
}
.el-menu-vertical-demo {
  /* margin-top: 25px; */
  background-color: rgba(0, 0, 0, 0);
  // padding: 20px 0;
  height: 80px;
  line-height: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .el-menu--horizontal {
    border-bottom: 0px solid #000;
    .el-menu-item {
      height: 80px;
      line-height: 80px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;

      color: black !important;
      opacity: 1;
    }
  }
  .el-submenu__icon-arrow {
    font-size: 16px;
  }

  .el-submenu__title i {
    color: #fff;
  }
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  margin-left: 0;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0px solid #000;
}

.el-submenu.is-opened .el-submenu__title {
  background-color: rgba(0, 0, 0, 0);
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 80px;
  line-height: 80px;
  /* width: 100px; */
  text-align: center;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0);
  font-size: 20px;
  text-align: left;
}
.el-submenu__title .el-menu--horizontal {
  background-color: #1d3244;
}
.el-menu--horizontal > .el-submenu {
  height: 80px;
  line-height: 80px;
  .el-menu-item {
    background-color: #01192e;
    // width: 220px;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    border: none;
    font-weight: 400;
    box-sizing: border-box;

    a {
      color: #909399;
      display: block;
      height: 40px;
    }
    a:hover {
      color: #fff;
    }
  }
  .el-menu-item:hover {
    text-align: center;
    color: #ffffff;
    border: none;
  }
}
.el-menu--horizontal > .el-menu-item {
  padding: 0;
  font-size: 18px !important;
  border: none;

  a {
    display: inline-block;
    height: 100%;
    width: 100%;
    // padding: 0 20px;
  }
}
.el-menu--horizontal > .el-menu-item.is-active {
  border: none;
  font-weight: 600;
  a {
    border-bottom: 3px solid white;
    // padding-bottom: 10px;
    position: relative;
  }
  a::after {
    // position: absolute;
    // bottom: 0;
    // left: 50%;
    // transform: translateX(-50%);
    // content: '';
    // height: 2px;
    // width: 50%;
    // background: #fff;
  }
}
.el-menu--horizontal .el-menu {
  width: auto;
  //  min-width: 180px;
  padding: 8px 13px;
  background: #ffffff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
  opacity: 0.94;
  border-radius: 10px;

  // width: 220px;
  .el-menu-item {
    // width: 220px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border: none;
    box-sizing: border-box;
    color: black !important;
    text-align: center !important;
    a {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      display: block;
      margin-top: 10px;
      // padding-left: 21px;
    }
    a:hover {
      //       font-size: 20px;
      // font-family: Microsoft YaHei;
      // font-weight: 400;
      line-height: 20px;
      color: #323bcc;
      // opacity: 1;
    }
    .router-link-active {
      color: #323bcc;
    }
    // a:hover {
    //   color: #fff;
    // }
  }
  .el-menu-item:hover {
    // font-size: 26px;
    text-align: left;
    color: #323bcc !important;
    border: none;
  }
}

.el-menu--horizontal > .el-submenu:last-child {
  border: none;
  margin-right: 0px;
}

.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border: none;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 26px;
  text-align: center;
  color: #ffffff;
  line-height: 80px;
  margin: 0 60px 0 0;
  box-sizing: border-box;
}
.login {
  // margin-right: 59px;
  .el-submenu {
  }
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  font-size: 22px;
  text-align: center;
  color: #ffffff;
  line-height: 80px;
}
</style>
