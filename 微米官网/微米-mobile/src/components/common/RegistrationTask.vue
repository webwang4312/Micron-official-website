<template>
  <van-popup v-model="$store.state.registrationtask">
    <div class="RegistrationTask">
      <div class="dengluzhuce">
        <img
          src="@assets/images/detail/组 372 (1).png"
          alt=""
          style="width:30px;height:30px; position: relative;;left:80%;top:41px;cursor:pointer"
          @click="forgetLogin"
        />
        <div class="tabs_name">
          {{ $t("registrationtask[0]") }}
        </div>
        <div class="line"></div>

        <div class="forget_content">
          <!-- 微信号 -->
          <div class="telzong">
            <div class="tel">
              <label :class="{ movename: showwx }">
                {{ $t("registrationtask[1]") }}</label
              >
              <input
                type="text"
                v-model="weixing"
                @focus="wxFocus"
                @blur="wxBlur"
                class="button"
              />
            </div>
          </div>

          <!-- facebook -->
          <div class="password">
            <label :class="{ movename: showfacebook }">
              {{ $t("registrationtask[2]") }}</label
            >
            <input
              type="text"
              v-model="facebook"
              @focus="facebookFocus"
              @blur="facebookBlur"
              class="button"
            />
          </div>
          <!-- github账号 -->
          <div class="confirmpassword">
            <label :class="{ movename: showgithub }">
              {{ $t("registrationtask[3]") }}</label
            >
            <input
              type="text"
              v-model="github"
              @focus="githubFocus"
              @blur="githubBlur"
              class="button"
            />
          </div>

          <div class="but_zong">
            <div class="submit" @click="submit">
              {{ $t("forgetpassword[5]") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { BASEURL } from "@api/api";
var qs = require("qs");
export default {
  inject: ["reload"],
  data() {
    return {
      showwx: false,
      showfacebook: false,
      showgithub: false,
      weixing: "",
      facebook: "",
      github: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    forgetLogin() {
      // console.log(this.$store.state.showlogin);
      this.$store.commit("RegistrationTask");
    },
    // 微信号
    wxFocus() {
      this.showwx = true;
      // this.blue1 = true;
    },
    wxBlur() {
      if (this.weixing == "") {
        this.showwx = false;
        // this.blue1 = false;
      } else {
        this.showwx = true;
      }
    },
    // 密码
    facebookFocus() {
      this.showfacebook = true;
      // this.blue3 = true;
    },
    facebookBlur() {
      if (this.facebook == "") {
        this.showfacebook = false;
      } else {
        this.showfacebook = true;
      }
    },

    //github账号
    githubFocus() {
      this.showgithub = true;
    },
    githubBlur() {
      if (this.github == "") {
        this.showgithub = false;
      } else {
        this.showgithub = true;
      }
    },

    // 确认
    async submit() {
      if (this.weixing == "" && this.facebook == "") {
        // console.log(this.$i18n.locale);
        if (this.$i18n.locale == "en") {
          this.$message.error(
            "Please fill in the WeChat account or facebook account"
          );
        } else {
          // this.$toast.error({
          //       duration: 2000, // 持续展示 toast
          //       forbidClick: true, // 禁用背景点击
          //       loadingType: "spinner",
          //       message: "请选填微信号或facebook账号",
          //       position: top,
          //     });
          //   this.$Message.info({
          //     content: '请选填微信号或facebook账号',
          //     top:'300'
          // });
          this.$message({
            message: "请选填微信号或facebook账号",
            center: true,
            type: "error",
            duration: "2000",
          });
        }
      } else if (this.github === "") {
        if (this.$i18n.locale == "en") {
          this.$message.error("Please fill in the github account");
        } else {
          this.$message({
            message: "请填写github账号",
            center: true,
            type: "error",
            duration: "2000",
          });
        }
      } else {
        this.$http
          .post(
            `${BASEURL}` + "/weimioffice/task/signUp",
            qs.stringify({
              taskId: localStorage.getItem("uenc-taskId"),
              userId: localStorage.getItem("userId"),
              wx: this.weixing,
              facebook: this.facebook,
              github: this.github,
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            //console.log(res);
            // res.data.code = 400
            if (res.data.code == 200) {
              this.$message.success(res.data.result);
              this.weixing = "";
              this.facebook = "";
              this.github = "";
              this.$store.commit("RegistrationTask");
              this.reload();
            } else {
              this.$message.error(res.data.result);
              window.sessionStorage.clear();
              localStorage.clear();
              this.reload();
            }
          });
      }
    },
  },
};
</script>

<style lang="less">
.ivu-message {
  z-index: 2228 !important;
}
.el-message {
  z-index: 2228 !important;
}
// .van-overlay{
//   z-index: 0!important;
// }
.van-popup {
  background-color: black !important;
  overflow: hidden !important;
}
.button:hover {
  border: 1px solid#009FCD !important;
}

.denglu_footer {
  width: 318px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .rember {
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .forget {
    color: rgba(255, 255, 255, 0.5);

    cursor: pointer;
  }
}

@keyframes move {
  from {
    position: relative;
    top: 23px;
  }
  to {
    position: relative;
    top: 0px;
    font-size: 12px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 12px;
    color: rgba(0, 182, 255, 1);
    opacity: 1;
  }
}
.movename {
  animation: move 0.5s linear;
  animation-fill-mode: forwards;
}
.blue {
  color: #ffffff;
  opacity: 1 !important;
}
.RegistrationTask {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  z-index: 1000;
  // position: fixed;
  // left: 0;
  // top: 0;
  .dengluzhuce {
    width: 345px;
    height: 529px;
    background: #131313;
    border-radius: 10px;
    margin: 0 auto;
    .tabs_name {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      position: relative;
      left: 40px;
      top: 30px;
    }
    .line {
      width: 320px;
      height: 1px;
      background: #ffffff;
      opacity: 0.1;
      margin: 0 auto;
      margin-top: 61px;
    }

    .content {
      width: 100%;
      height: auto;
      margin: 0 auto;
    }

    .telzong {
      width: 318px;
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      .telselect {
        height: 45px;
        background: #333333;
        margin-top: 20px;
        color: rgba(255, 255, 255, 0.5);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border: 1px solid #656565;
        border-right-width: 1px;
        font-size: 16px;
        outline: none;
      }
      .tel {
        width: 318px;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        label {
          font-size: 16px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 13px;
          color: rgba(255, 255, 255, 0.5);
          position: relative;
          top: 35px;
          left: 15px;
        }
        input {
          width: 318px;
          height: 45px;
          background: #333333;
          border: 1px solid #656565;
          border-radius: 10px;

          margin: 0 auto;
          margin-top: 7px;
          position: relative;
          padding-left: 15px;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .password {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 10px;

      label {
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 35px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 7px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .confirmpassword {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 10px;
      label {
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 35px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 7px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .but_zong {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      .submit:hover {
        background: #009fcd;
      }
      .submit {
        width: 318px !important;
        height: 45px;
        line-height: 45px;
        border-radius: 10px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin: 0 auto;
        margin: 60px auto 0;
        font-size: 16px;
        padding-left: 15px;
        background: rgba(255, 255, 255, 0.1);
        cursor: pointer;
      }
    }
    .but_zong1 {
      width: 318px !important;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 80px;
      .submit1 {
        width: 318px !important;
        height: 45px;
        line-height: 45px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        margin: 0 auto;
        margin: 0px auto 0;
        font-size: 16px;
        padding-left: 15px;

        cursor: pointer;
      }
    }
  }
}
</style>
