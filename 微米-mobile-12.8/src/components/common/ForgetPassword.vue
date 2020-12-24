<template>
  <div class="forgetpassword">
    <slider></slider>
    <div class="dengluzhuce">
      <div class="forget_content">
        <!-- 手机号 -->
        <div class="telzong">
          <div class="tel">
            <label :class="{ movename: showtel }">
              {{ $t("forgetpassword[1]") }}</label
            >
            <input
              type="text"
              v-model="tel"
              @focus="telFocus"
              @blur="telBlur"
              class="button"
            />
          </div>
        </div>
        <div class="yanzheng">
          <label :class="{ movename: showyanzheng }">
            {{ $t("forgetpassword[2]") }}
          </label>
          <input
            type="text"
            v-model="yanzheng"
            @focus="yanzhengFocus"
            @blur="yanzhengBlur"
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
          <label :class="{ movename: showpassword }">
            {{ $t("forgetpassword[3]") }}</label
          >
          <input
            type="password"
            v-model="password"
            @focus="passwordFocus"
            @blur="passwordBlur"
            class="button"
          />
        </div>
        <!-- 确认密码 -->
        <div class="confirmpassword">
          <label :class="{ movename: showconfirmpassword }">
            {{ $t("forgetpassword[4]") }}</label
          >
          <input
            type="password"
            v-model="confirmpassword"
            @focus="confirmPasswordFocus"
            @blur="confirmPasswordBlur"
            class="button"
          />
        </div>

        <div class="but_zong">
          <button class="submit" @click="submit">
            {{ $t("forgetpassword[5]") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BASEURL} from '@api/api';
import { country } from "@assets/rule.js";
import slider from "@components/common/slider";
var qs = require("qs");
import crypto from "crypto";
export default {
  data() {
    return {
      tabsname: [],
      //   表单内容
      tel: "",
      yanzheng: "",
      password: "",
      confirmpassword: "",
      country: "",
      phoneleave: "",
      showtel: false,
      showyanzheng: false,
      showpassword: false,
      showconfirmpassword: false,
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
  components: { slider },
  created() {
    // 手机号
    this.country = country;
    // console.log(country);
    this.countrySelected = country[0].name;
    this.phoneleave = "86+";
  },

  mounted() {},

  methods: {
    // 手机号
    telFocus() {
      this.showtel = true;
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
          this.showtel = true;
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
    },
    yanzhengBlur() {
      if (this.yanzheng == "") {
        this.showyanzheng = false;
      } else {
        this.showyanzheng = true;
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
          `${BASEURL}`+"/weimioffice/login/getPhoneCode",
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
              this.count = TIME_COUNT;
              this.showtimer = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                  this.yandisabled = false;
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
    },
    passwordBlur() {
      if (this.password == "") {
        this.showpassword = false;

        if (this.$i18n.locale == "cn") {
          this.$message.error("密码不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("password can not be blank");
        }
      } else {
        let passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (!passwordreg.test(this.password)) {
          this.showpassword = false;
          if (this.$i18n.locale == "cn") {
            this.$message.error("请输入6-16英文加数字");
            this.password = "";
          }
          if (this.$i18n.locale == "en") {
            this.$message.error("Please enter 6-16 English plus numbers");
            this.password = "";
          }
        } else {
          this.showpassword = true;
        }
      }
    },

    // 确认密码
    confirmPasswordFocus() {
      this.showconfirmpassword = true;
    },
    confirmPasswordBlur() {
      if (this.confirmpassword == "") {
        this.showconfirmpassword = false;
      } else {
        if (this.password !== this.confirmpassword) {
          this.$message.error("两次密码输入不一致");
          this.confirmpassword = "";
        } else {
          this.showconfirmpassword = true;
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
            `${BASEURL}`+"/weimioffice/login/resetPwd",
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
              if (this.$i18n.locale == "cn") {
                this.$message.success(res.data.result);
                this.tel = "";
                this.password = "";
                this.confirmpassword = "";
                this.yanzheng = "";
              }
              if (this.$i18n.locale == "en") {
                this.$message.success(res.data.result);
                this.tel = "";
                this.password = "";
                this.confirmpassword = "";
                this.yanzheng = "";
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

<style lang="less">
input {
  width: 345px;
  height: 40px;
  font-size: 14px!important;
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  padding-left: 15px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
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
.forgetpassword {
  width: 100%;
  height: auto;
  min-height: 120vh;
  background: #131313;
  .dengluzhuce {
    .telzong {
      width: 318px;
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      margin-top: 0px;
      .tel {
        width: 318px;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        label {
           font-size: 14px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 13px;
          color: rgba(255, 255, 255, 0.5);
          position: relative;
          top: 34px;
          left: 15px;
        }
        input {
          width: 318px;
          height: 40px;
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
      margin-top: 10px;
      line-height: 25px;
      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 34px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 40px;
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
        font-size: 14px;
        left: 240px;
        top: -32px;
        color: #009fcd;
        width: 100px;
        cursor: pointer;
      }
    }
    .password {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: -16px;
      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 34px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 40px;
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
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 34px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 40px;
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
      width: 330px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      .submit {
        width: 318px !important;
        height: 40px;
        border-radius: 10px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin: 0 auto;
        margin: 50px auto 0;
        font-size: 16px;
        background: #009fcd;
        border-radius: 10px;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
