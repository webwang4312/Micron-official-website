<template>
  <div class="forgetpassword">
    <div class="dengluzhuce">
      <img
        src="@assets/images/index/组 3@2x.png"
        alt=""
        style="width:30px;height:30px; position: relative;;left:336px;top:41px;cursor:pointer"
        @click="forgetLogin"
      />
      <div class="tabs_name">
        {{ $t("forgetpassword[0]") }}
      </div>
      <div class="line"></div>

      <div class="forget_content">
        <!-- 手机号 -->
        <div class="telzong">
          <!-- <select
            name="public-choice"
            v-model="countrySelected"
            @change="getcountry"
            class="telselect"
          >
            <option
              :value="coupon.name"
              v-for="coupon in country"
              class="selectoption"
              :key="coupon.id"
              >{{ coupon.name }}</option
            >
          </select> -->
          <div class="tel">
            <!-- <label :class="{ movename: showtel }">
              {{ $t("forgetpassword[1]") }}</label
            > -->
            <input
              type="text"
              v-model="tel"
              @focus="telFocus"
              @blur="telBlur"
              :placeholder="$t('forgetpassword[1]')"
              class="button"
            />
          </div>
        </div>
        <div class="yanzheng">
          <!-- <label :class="{ movename: showyanzheng }">
            {{ $t("forgetpassword[2]") }}
          </label> -->
          <input
            type="text"
            v-model="yanzheng"
            @focus="yanzhengFocus"
            @blur="yanzhengBlur"
            :placeholder="$t('forgetpassword[2]')"
            class="button"
          />
          <span class="yanzheng_button" @click="getYanzheng" v-if="yandisabled">
            {{ $t("login[8]") }}
          </span>
          <span v-show="!yandisabled" class="count spantimer"
            >{{ count }} s</span
          >
        </div>
        <!-- 密码 -->
        <div class="password">
          <!-- <label :class="{ movename: showpassword }">
            {{ $t("forgetpassword[3]") }}</label
          > -->
          <input
            type="password"
            v-model="password"
            @focus="passwordFocus"
            @blur="passwordBlur"
            :placeholder="$t('forgetpassword[3]')"
            class="button"
          />
        </div>
        <!-- 确认密码 -->
        <div class="confirmpassword">
          <!-- <label :class="{ movename: showconfirmpassword }">
            {{ $t("forgetpassword[4]") }}</label
          > -->
          <input
            type="password"
            v-model="confirmpassword"
            @focus="confirmPasswordFocus"
            @blur="confirmPasswordBlur"
            :placeholder="$t('forgetpassword[4]')"
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
</template>

<script>
import { BASEURL } from "@api/api";
import { country } from "@assets/rule.js";
var qs = require("qs");
import crypto from "crypto";
export default {
  data() {
    return {
      tabsname: [],
      blue: "",
      blue1: false,
      blue2: false,
      blue3: false,
      blue4: false,
      //   表单内容
      tel: "",
      yanzheng: "",
      password: "",
      password1: "",
      confirmpassword: "",

      country: "",
      phoneleave: "",
      showusername: false,
      showusername1: false,
      showtel: false,
      showyanzheng: false,
      showpassword: false,
      showpassword1: false,
      showconfirmpassword: false,
      showemail: false,
      countrySelected: "",

      phonejiami: "",
      phonecountry: "",
      // 倒计时
      count: "",
      timer: null,
      yandisabled: true,
      yy: "",
      isChecked: true, // 记住密码
    };
  },
  computed: {},
  created() {
    // 手机号
    this.country = country;
    // console.log(country);
    this.countrySelected = country[0].name;
    this.phoneleave = "86+";
  },

  mounted() {
    this.getCookie();
  },

  methods: {
    forgetLogin() {
      // console.log(this.$store.state.showlogin);
      this.$store.commit("forgetlogin");
    },
    // 设置Cookie
    setCookie(username, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      window.document.cookie =
        "username=" + username + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password=" + password + ";path=/;expires=" + exdate.toGMTString();
    },

    // 读取Cookie
    getCookie() {
      // console.log(document.cookie);
      if (document.cookie.length > 0) {
        this.showpassword1 = true;
        this.showusername1 = true;
        let arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割
          // console.log(arr2);
          // 判断查找相对应的值
          if (arr2[0] == "username") {
            this.username1 = arr2[1];
            // 保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.password1 = arr2[1];
          }
        }
      }
    },

    // 清除Cookie
    clearCookie() {
      this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    },

    // 手机号
    telFocus() {
      this.showtel = true;
      // this.blue1 = true;
    },
    telBlur() {
      if (this.tel == "") {
        this.showtel = false;
        // this.blue1 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("手机号码不能为空");
          this.tel = "";
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Phone number can not be blank");
          this.tel = "";
        }
      } else {
        let numberreg = /^\d/;
        if (numberreg.test(this.tel)) {
          // 手机号加区号
          // this.allphone = this.phoneleave + this.tel;
          // console.log(this.allphone);
          // 手机号加区号+参数
          this.phonecountry = this.tel + "uenc_web";
          //console.log(this.phonecountry);
          // 加密处理
          var md5 = crypto.createHash("md5");
          md5.update(this.phonecountry); //需要加密的密码
          // 手机号+区号+参数加密
          var password = md5.digest("hex"); //password 加密完的密码
          this.phonejiami = password;
          // console.log(this.phonejiami);
          // console.log(this.phoneleave + this.tel);
        } else {
          if (this.$i18n.locale == "cn") {
            this.$message.error("请输入正确的手机号码");
            this.tel = "";
          }
          if (this.$i18n.locale == "en") {
            this.$message.error("Please enter the correct phone number");
            this.tel = "";
          }
        }
      }
    },
    // 手机区号改变
    getcountry() {
      this.phoneleave = this.countrySelected.replace(/\+/, "") + "+";
      //   console.log(this.phoneleave);
    },
    // 验证码
    yanzhengFocus() {
      this.showyanzheng = true;
      // this.blue2 = true;
    },
    yanzhengBlur() {
      if (this.yanzheng == "") {
        this.showyanzheng = false;
        // this.blue2 = false;
      }
    },
    // 获取验证码
    async getYanzheng() {
      if (this.tel !== "") {
        this.sendYanzhengMa();
        //console.log(that.allphone+'0'+that.phonejiami);
      } else if (this.tel == "") {
        if (this.$i18n.locale == "en") {
          this.$message.error("Please enter your phone");
        } else if (this.$i18n.locale == "cn") {
          this.$message.error("请输入手机号码");
        }
      }
    },
    // 发送验证码
    async sendYanzhengMa() {
      // console.log(this.tel);
      // console.log(this.phonecountry);
      // console.log(this.phonejiami);
      var that = this;
      await that.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/login/getPhoneCode",
          qs.stringify({
            phone: this.tel,
            type: 1,
            // 加密
            accessToken: that.phonejiami,
          })
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            // 倒计时效果
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.yandisabled = false;
              this.count = TIME_COUNT;
              this.showtimer = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.yandisabled = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            // 获取验证码按钮发送一次
            // this.btndisabled = true;
            //console.log(this.yandisabled);
          } else if (res.data.code == 400) {
            //console.log(res);
            this.yy = res.data.result;
            this.$message({
              message: this.yy,
              type: "error",
            });
          } else {
            return false;
          }
        })
        .catch((err) => {
          console.log(err, "验证码");
        });
    },

    // 密码
    passwordFocus() {
      this.showpassword = true;
      // this.blue3 = true;
    },
    passwordBlur() {
      if (this.password == "") {
        this.showpassword = false;
        // this.blue3 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("密码不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("password can not be blank");
        }
      } else {
        let passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (!passwordreg.test(this.password)) {
          if (this.$i18n.locale == "cn") {
            this.$message.error("请输入6-16英文加数字");
            this.password = "";
          }
          if (this.$i18n.locale == "en") {
            this.$message.error("Please enter 6-16 English plus numbers");
            this.password = "";
          }
        }
      }
    },

    // 确认密码
    confirmPasswordFocus() {
      this.showconfirmpassword = true;
      // this.blue4 = true;
    },
    confirmPasswordBlur() {
      if (this.confirmpassword == "") {
        this.showconfirmpassword = false;
        // this.blue4 = true;
      } else {
        if (this.password !== this.confirmpassword) {
          this.$message.error("两次密码输入不一致");
          this.confirmpassword = "";
        }
      }
    },

    // 确认
    async submit() {
      if (this.tel == "" || this.password == "" || this.yanzheng == "") {
        if (this.$i18n.locale == "cn") {
          this.$message.error("请填写完整信息");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Please fill in the complete information");
        }
      } else {
        this.$http
          .post(
            // 测试上
            //47.105.215.191/weimi/index/getPhoneCode
            `${BASEURL}` + "/weimioffice/login/resetPwd",
            qs.stringify({
              phone: this.tel,
              password: this.password,
              // 加密
              phoneCode: this.yanzheng,
            })
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.yandisabled = true;
              if (this.$i18n.locale == "cn") {
                this.$message.success(res.data.result);
                this.tel = "";
                this.password = "";
                this.confirmpassword = "";
                this.yanzheng = "";
                this.$store.commit("forgetlogin");
              }
              if (this.$i18n.locale == "en") {
                this.$message.success(res.data.result);
                this.tel = "";
                this.password = "";
                this.confirmpassword = "";
                this.yanzheng = "";
                this.$store.commit("forgetlogin");
              }
            } else {
              if (this.$i18n.locale == "cn") {
                this.$message.error(res.data.result);
              }
              if (this.$i18n.locale == "en") {
                this.$message.error(res.data.result);
              }
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.button:hover {
  border: 1px solid#009FCD !important;
}
// .blue1 {
//   border: 1px solid #009fcd !important;
// }
// .blue2 {
//   border: 1px solid #009fcd !important;
// }
// .blue3 {
//   border: 1px solid #009fcd !important;
// }
// .blue4 {
//   border: 1px solid #009fcd !important;
// }
input[type="checkbox"] {
  cursor: pointer;
  position: relative;
  width: 15px;
  height: 15px;
  font-size: 14px;
}
input::-webkit-input-placeholder {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
}

input[type="checkbox"]::after {
  position: absolute;
  top: 0;
  background-color: #009fcd;
  color: #ffffff;
  width: 15px;
  height: 15px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  border-radius: 3px;
}

input[type="checkbox"]:checked::after {
  content: "✓";
  font-size: 12px;
  font-weight: bold;
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

// 倒计时
.spantimer {
  position: relative;
  left: 275px;
  top: -35px;
  font-size: 16px;
  color: #00ffee;
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
.forgetpassword {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  .dengluzhuce {
    width: 400px;
    height: 529px;
    background: #131313;
    border-radius: 10px;
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
    .yanzheng {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 20px;
      line-height: 25px;
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
      .yanzheng_button {
        position: relative;
        right: -240px;
        top: -34px;
        color: #009fcd;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
    .password {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: -10px;

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
        margin: 30px auto 0;
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
