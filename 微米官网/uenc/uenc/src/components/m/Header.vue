<template>
  <div class="header">
    <div class="content">
      <img
        class="l"
        @click="$router.push('/')"
        src="@/assets/imagesm/logo.png"
        alt=""
      />
      <img
        class="r"
        @click="showNav"
        src="@/assets/imagesm/index/菜单栏.png"
        alt=""
      />
    </div>
    <van-popup v-model="shows1">
      <div class="navTag">
        <div class="bg">
          <div class="navtitle">
            <img
              class="l logo"
              @click="$router.push('/')"
              src="@/assets/imagesm/logo.png"
            />
            <div class="you_zong">
              <button
                class="van-cell "
                id="language_button"
                @click="changelang"
              >
                {{ language }}
              </button>
              <img @click="shows1 = false" src="@/assets/images/no.png" alt="" />
            </div>
          </div>
          <Collapse v-model="activeName" accordion>
            <CollapseItem name="1" v-if="!isLogin">
              <template #title>
                <img
                  @click="show = false"
                  src="@/assets/imagesm/头像 (2).png"
                  alt=""
                />
                <span>{{ userName }}</span>
              </template>
              <div
                class="van-collapse-item__content"
                v-if="usersStatus == '1'"
                @click="check"
              >
                {{ type === "zh" ? "绑定钱包" : "Bind Wallet" }}
              </div>
              <div
                class="van-collapse-item__content"
                v-else
                @click="getUsersAddress"
              >
                {{ type === "zh" ? "查看钱包" : "Check Wallet" }}
              </div>
              <div class="van-collapse-item__content" @click="logout">
                {{ type === "zh" ? "退出登录" : "Log out" }}
              </div>
            </CollapseItem>
            <div class="navitems van-cell" v-if="isLogin">
              <div @click="login(2)">
                {{ type === "zh" ? "登录" : "Login" }}
              </div>
              <!-- <div class="text" @click="login(1)">
              {{ type === "zh" ? "注册" : "register" }}
            </div> -->
            </div>
            <div v-else></div>
            <div class="van-cell" @click="goPage('/m/Index')">
              <div>
                {{ type === "zh" ? "首页" : "Home" }}
              </div>
            </div>
            <div class="van-cell" @click="goPage('/m/Technology')">
              <div>
                {{ type === "zh" ? "技术" : "Technology" }}
              </div>
            </div>
            <div class="van-cell" @click="goPage('/m/Developers')">
              <div>
                {{ type === "zh" ? "开发者" : "Developers" }}
              </div>
            </div>
            <CollapseItem name="Wallet">
              <template #title>
                {{ type === "zh" ? "钱包" : "Wallet" }}
              </template>
              <!-- <div class="van-collapse-item__content"><div @click="goPage('/m/Index')">{{type === "zh" ?'访问钱包':'Access Wallet'}}</div></div> -->
              <div class="van-collapse-item__content">
                <div @click="goPage('/m/Fastoken')">
                  {{ type === "zh" ? "Fastoken下载" : "Fastoken downloads" }}
                </div>
              </div>
              <div class="van-collapse-item__content">
                <a
                  target="_blank"
                  href="http://www.uenc.io/fastoken/index.html#/"
                  >{{
                    type === "zh" ? "区块链浏览器" : "Blockchain browser"
                  }}</a
                >
              </div>
            </CollapseItem>
            <div class="van-cell" id="cancell" @click="goPage('/m/Blog')">
              <div>
                {{ type === "zh" ? "博客" : "Blog" }}
              </div>
            </div>
            <CollapseItem name="Proposal">
              <template #title>
                {{ type === "zh" ? "社区" : "Community" }}
              </template>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://github.com/uenctech">Github</a>
              </div>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://t.me/UENCOfficial">Telegram</a>
              </div>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://twitter.com/uencclub"
                  >Twitter</a
                >
              </div>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://discord.com/invite/AAPMAjtcNS"
                  >discord</a
                >
              </div>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://fb.me/uencclub">Facebook</a>
              </div>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://www.reddit.com/r/UENC/"
                  >Reddit</a
                >
              </div>
              <div class="van-collapse-item__content">
                <a target="_blank" href="https://uenc.medium.com/">Medium</a>
              </div>
              <!-- <div class="van-collapse-item__content">
              <div @click="goPage('/m/community/Proposal')">
                {{ type === "zh" ? "提案" : "Proposal" }}
              </div>
            </div>
            <div class="van-collapse-item__content">
              <div @click="goPage('/m/community/Vote')">{{ type === "zh" ? "投票" : "Vote" }}</div>
            </div> -->
            </CollapseItem>
          </Collapse>
        </div>
        <div class="bot" @click="show = false"></div>
      </div>
    </van-popup>
  <van-popup v-model="shows2" >
    <div :class="dialogVisible ? 'block dialog' : 'none dialog'" id="dialog">
      <div class="details">
        <div class="close" @click="close"><i class="el-icon-close"></i></div>
        <Login
          ref="login"
          @close="close"
          @showUserInfo="showUserInfo"
          @checkUsersStatus="checkUsersStatus"
          v-if="dialogType == 'login' || dialogType == 'register'"
          :dialogType="dialogType"
        ></Login>
        <CheckUser v-if="dialogType == 'check'" @close="close"></CheckUser>
        <ShowMoney
          v-if="dialogType == 'money'"
          @close="close"
          :moneyAddress="moneyAddress"
        ></ShowMoney>
      </div>
    </div>
  </van-popup>
  </div>
</template>
<script>
import { navList } from "@/assets/server/navServer.js";
import {
  WebLogout,
  CheckUsersStatus,
  GetUsersAddress,
} from "@/assets/server/api.js";
import Login from "./Login.vue";
import CheckUser from "./CheckUser.vue";
import ShowMoney from "./ShowMoney.vue";
import { Collapse, CollapseItem } from "vant";
export default {
  components: {
    Login,
    CheckUser,
    Collapse,
    CollapseItem,
    ShowMoney,
  },
  data() {
    return {
      shows1: false,
      shows2:false,
      language: "EN",
      moneyAddress: "",
      activeName: "",
      navList: navList,
      headerclass: true,
      show: false,
      type: "",
      userName: "",
      isLogin: true,
      dialogType: "",
      dialogVisible: false,
      userMenu: false,
      usersStatus: "",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.type = this.$i18n.locale;
    this.userName = localStorage.getItem("username");
    if (this.userName) {
      this.isLogin = false;
    }
    // 监听（绑定）滚轮 滚动事件
  },
  created() {
    this.userName = localStorage.getItem("username");
    if (this.userName) {
      this.isLogin = false;
    }
    this.checkUsersStatus();
  },
  watch: {
    // show(newValue) {
    //   if (newValue) {
    //     document.body.style.overflow = "hidden";
    //     document.body.style.height = "100%";
    //   } else {
    //     document.body.style.overflow = "visible";
    //     document.body.style.height = "auto";
    //   }
    // },
  },
  methods: {
    async getUsersAddress() {
        let datas = new FormData();
          datas.append("loginName", this.userName);
      const data = await GetUsersAddress(datas);
      if (data.code == 0) {
        this.moneyAddress = data.data;
        this.dialogType = "money";
        this.dialogVisible = true;
      }
      this.shows2=true;
      this.shows1=false;
    },
    goPage(url) {
      this.$router.push(url);
      this.show = false;
        this.shows1 = false;
    },
    showUserMenu(item) {
      this.userMenu = true;
      this.show = false;
      this.showsubmenu = true;
    },
    showUserInfo(name) {
      this.isLogin = false;
      this.userName = name;
    },
    async checkUsersStatus() {
       let datas = new FormData();
          datas.append("loginName", this.userName);
      const data = await CheckUsersStatus( datas);
      // const data = await CheckUsersStatus(this.userName);
      // console.log(data);
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
            this.$notify({
              type: "success",
              message:
                this.$t("index.switch") === "cn" ? "退出成功" : "success",
            });
            localStorage.setItem("username", "");
            this.isLogin = true;
            this.shows1=false;
            this.shows2=false;
          }
        })
        .catch(() => {
          this.$notify({
            type: "primary",
            message:
              this.$t("index.switch") === "cn"
                ? "已取消退出"
                : "Cancelled exit",
          });
        });
    },
    login(type) {
      this.dialogVisible = true;
      // this.show = false;
      this.shows2=true;
      this.shows1 = false;
      this.showsubmenu = false;
      // document.body.style.overflow = "hidden";
      // document.body.style.height = "100%";
      //         var mo=function(e){e.preventDefault();};
      //         document.body.style.overflow='hidden';
      //         document.addEventListener("touchmove",mo,false);//禁止页面滑动
      // console.log(document.body.style.overflow);
      //  this.$store.commit('toFixed', true)
      //  console.log(this.$store.state.fixeds);
      if (type === 2) {
        this.dialogType = "login";
      } else {
        this.dialogType = "register";
      }
    },
    check() {
      this.dialogVisible = true;
      this.dialogType = "check";
      this.shows2=true;
       this.shows1=false;
    },
    close() {
      this.dialogVisible = false;
      this.dialogType = "";
      this.shows1=false;
      this.shows2=false;
      //  var mo=function(e){e.preventDefault();};
      //   document.body.style.overflow='';//出现滚动条
      //   document.removeEventListener("touchmove",mo,false);
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
      this.show = false;
      sessionStorage.setItem("locale", type);
      this.type = sessionStorage.getItem("locale");
      this.$i18n.locale = sessionStorage.getItem("locale");
      this.show = false;
    },

    showNav() {
      let show = this.show;
      this.show = !show;
      this.shows1 = true;
      // this.$store.commit('toFixed', true)
      // console.log(this.$store.state.fixeds);
    },
    back() {
      // if(!this.show) return
      this.userMenu = false;
      this.show = false;
      this.showsubmenu = false;
    },
  },
};
</script>
<style lang="less">
.header {
  .van-popup{
     background-color: rgba(0, 0, 0, 0.85);
  }
  #cancell {
    // padding-top: 90px;
  }
  // .van-cell:nth-of-type(6){
  //  background: red!important;
  //  !important;
  // }
  .van-cell__title {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      margin-right: 32px;
    }
  }
  .you_zong {
    display: flex;
    flex-direction: row;
    align-items: center;
    #language_button {
      width: 100px;
      height: 60px;
margin-top: 0px!important;
      padding: 0px !important;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      opacity: 1;
      padding: 0px;
      text-align: center;
      margin-right: 58px;
      border-radius: 18px;
      border: 2px solid #fff;
    }
  }

  .navTag {
    .van-collapse {
      padding: 24px 0 64px;
    }
    .van-cell {
      background: transparent;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 44px;
      padding: 0px 0 0;
margin-top: 90px;
      div {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 44px;
        color: #ffffff;
        opacity: 1;
      }
      a,
      a:link {
        color: #ffffff;
        width: 100%;
      }
    }
    .van-cell::after,
    .van-collapse-item--border::after,
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border: none;
    }

    .van-collapse-item__content {
      background: transparent;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 44px;
      color: #c6c6c6;
      opacity: 1;

      padding: 20px 0 10px 20px;
      // max-height: 300px;
      // overflow-y: auto;
      a,
      a:link {
        color: #c6c6c6;
        width: 100%;
      }
    }
    .van-cell__right-icon {
      color: #fff;
    }
  }
}
</style>
<style lang="less" scoped>
.header {
  height: 110px;
  box-sizing: border-box;
  .navitems {
    display: flex;
    flex-direction: column;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 44px;
    color: #ffffff;
    opacity: 1;
    div:nth-child(2) {
      margin-top: 90px;
    }
    div {
      // width: 120px;
      // height: 64px;
      // line-height: 64px;
      // text-align: center;
      // margin-right: 12px;
      // font-size: 28px;
      // color: #fff;
    }
    .text {
      // background: #5432f4;
      // font-size: 28px;
      // font-family: PingFangSC-Medium, PingFang SC;
      // font-weight: 500;
      // color: #ffffff;
    }
  }
  .content {
    padding: 0 42px;
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .l {
      height: 72px;
    }
    .r {
      width: 64px;
    }
  }
  .navTag {
    // position: absolute;
    // right: 0;
    // top: 0px;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    display: inline-flex;
    flex-direction: column;
    .bg {
      background-color: rgba(0, 0, 0, 0.85);
      padding: 0 32px;
      .navtitle {
        height: 110px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
          width: 160px;
          height: 61px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .bot {
      flex: 1;
    }
  }
}
// .navTag {
//   padding: 0 30px;

//   z-index: 999;
//   width: 100%;
//   height: auto;
//   display: flex;
//   flex-direction: column;

//   .kong {
//     flex: 1;
//   }
// }
// .navTagitem {
//   padding: 0 30px;
//   background-color: rgba(0, 0, 0, 0.85);
//   position: absolute;
//   right: 0;
//   top: 0;
//   width: 100%;
//   z-index: 999;
//   height: auto;
//   display: flex;
//   flex-direction: column;
//   .kong {
//     flex: 1;
//   }
// }
// .top {
//   background: rgba(1, 25, 46, 0.7);
// }
// .nav {
//   /* display: none; */
//   width: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
// }
// .navtitle {
//   height: 140px;
//   line-height: 140px;
//   color: #fff;
//   text-align: left;
//   border-bottom: 1px solid #000;
//   display: flex;
//   justify-content: space-between;
//   img {
//     margin-top: 50px;
//     width: 40px;
//     height: 40px;
//   }
// }
// .navitems {
//   width: 100%;
//   // background-color: rgba(0, 0, 0, 0.85);
//   padding: 30px 0;
//   .text {
//     font-size: 28px;
//     font-family: PingFangSC, PingFangSC-Medium;
//     font-weight: 400;
//     text-align: left;
//     color: #ffffff;
//     a {
//       display: block;
//       font-size: 28px;
//       font-family: PingFangSC-Medium, PingFang SC;
//       font-weight: 500;
//       color: #ffffff;
//     }
//     span {
//       display: block;
//     }
//   }
// }
.dialog {
  // position: fixed;
  // left: 0;
  // top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  .details {
    width: 612px;
    margin: 10px auto;
    background-color: #fff;
    position: relative;
    border-radius: 24px;
    color: #000;
    // overflow: hidden;
    padding: 64px 66px 46px 54px;
    box-sizing: border-box;
    .close {
      position: absolute;
      right: 40px;
      top: 40px;
      cursor: pointer;
      color: #999;
      font-weight: 500;
    }
  }
}
.none {
  display: none;
}
.block {
  display: block;
  // position: absolute;
  // top: 0px;
}
</style>
