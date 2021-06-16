<!--
 * @Author: yaoyuting
 * @Date: 2021-04-16 08:54:18
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 21:29:40
 * @Descripttion: 
-->
<template>
  <div class="Login">
    <!-- <img class="logo" src="@/assets/images/index/logo.png" alt="" /> -->
    <p v-show="type === 'login'" class="form_all_title">
      {{ $t("dialog.login") }}
    </p>
    <p v-show="type === 'register'" class="form_all_title">
      {{ $t("navbar.Register") }}
    </p>
    <p v-show="type === 'password'" class="form_all_title">
      {{ $t("dialog.Forgot") }}
    </p>
    <el-form
      :rules="LoginRule"
      ref="login"
      v-show="type === 'login'"
      :model="loginForm"
      class="demo-form-inline"
    >
      <el-form-item label="" prop="loginName">
        <el-input
          v-model="loginForm.loginName"
          key="login1"
          :placeholder="$t('dialog.enteru')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="loginForm.password"
          :placeholder="$t('dialog.enterpw')"
          type="password"
          key="login2"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <div class="between">
          <el-input
            v-model="loginForm.code"
            key="login3"
            :placeholder="$t('dialog.code')"
          ></el-input>
          <validate-code ref="ref_validateCode" @change="changeCode" />
          <!-- <img :src="imgSrc" alt="" @click="getCaptchaImage" /> -->
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="submit">{{
          $t("dialog.login")
        }}</el-button>
      </el-form-item>
      <el-form-item label="">
        <div class="between">
          <div class="text" @click="type = 'password'">
            {{ $t("dialog.Forgot") }}
          </div>
          <!-- <el-checkbox-group v-model="loginForm.autoLogin">
            <el-checkbox :label="$t('dialog.auto')" name="type"></el-checkbox>
          </el-checkbox-group> -->
          <div class="text" @click="type = 'register'">
            {{ $t("dialog.register") }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-form
      :rules="RegisteredRule"
      ref="register"
      v-show="type === 'register'"
      :model="registeredForm"
      class="demo-form-inline register_form"
    >
      <el-form-item label="" prop="loginName">
        <el-input
          v-model="registeredForm.loginName"
          key="register1"
          :placeholder="$t('dialog.enteru')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input
          v-model="registeredForm.email"
          :placeholder="$t('dialog.entere')"
          key="register2"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <div class="between">
          <el-input
            v-model="registeredForm.code"
            key="register3"
            :placeholder="$t('dialog.code')"
          ></el-input>
          <div @click="onSubmit('registeredForm')" class="code">
            {{ timer ? count + "s" : $t("dialog.sendc") }}
          </div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="" prop="email">
        <el-input
          v-model="registeredForm.email"
          key="register4"
          :placeholder="$t('dialog.entere')"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="" prop="password">
        <el-input
          v-model="registeredForm.password"
          :placeholder="$t('dialog.enterpw')"
          type="password"
          key="register5"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="arginPassword">
        <el-input
          v-model="registeredForm.arginPassword"
          :placeholder="$t('dialog.enterap')"
          type="password"
          key="register5"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onRegistered" class="submit">{{
          $t("dialog.register")
        }}</el-button>
      </el-form-item>
      <!-- <el-form-item label="">
        <div class="between">
          <el-checkbox-group v-model="registeredForm.autoLogin">
            <el-checkbox
              :label="$t('dialog.read')"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item> -->
      <div @click="type = 'login'" class="back">
        {{ $t("dialog.back") }}<i class="el-icon-arrow-right"></i>
      </div>
    </el-form>
    <div class="div" v-show="type === 'password'">
      <el-form
        :rules="UpdatePwdRule"
        ref="updatePwd"
        :model="updatePwdForm"
        class="demo-form-inline"
      >
        <el-form-item label="" prop="email">
          <el-input
            v-model="updatePwdForm.email"
            :placeholder="$t('dialog.entere')"
            key="updatePwd1"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <div class="between">
            <el-input
              v-model="updatePwdForm.code"
              key="updatePwd2"
              :placeholder="$t('dialog.code')"
            ></el-input>
            <div @click="onSubmit('updatePwdForm')" class="code">
              {{ timer ? count + "s" : $t("dialog.sendc") }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="updatePwdForm.password"
            type="password"
            :placeholder="$t('dialog.enterpw')"
            key="updatePwd3"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="arginPassword">
          <el-input
            v-model="updatePwdForm.arginPassword"
            type="password"
            :placeholder="$t('dialog.enterap')"
            key="updatePwd4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onUpdatePwd" class="submit">{{
            $t("dialog.confirm")
          }}</el-button>
        </el-form-item>
        <el-form-item>
          <div @click="type = 'login'" class="back">
            {{ $t("dialog.back") }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
class RegisteredForm {
  constructor() {
    this.loginName = "";
    this.email = "";
    // this.phonenumber = "";
    this.password = "";
    this.arginPassword = "";
    this.code = "";
    // this.autoLogin = false;
  }
}
class LoginForm {
  constructor() {
    this.loginName = "";
    this.password = "";
    this.code = "";
    this.autoLogin = false;
  }
}
class UpdatePwdForm {
  constructor() {
    this.email = "";
    this.password = "";
    this.code = "";
    this.arginPassword = "";
  }
}

import validateCode from "./ValidateCode";
import {
  GetEmail,
  Registered,
  GetCaptchaImage,
  Login,
  UpdatePwd,
} from "@/assets/server/api.js";
export default {
  watch: {
    type(newValue, oldValue) {
      this.$refs["updatePwd"].resetFields();
      this.$refs["register"].resetFields();
      this.$refs["login"].resetFields();
    },
  },
  components: {
    validateCode,
  },
  data() {
    return {
      codevalue: "",
      type: "login",
      loginForm: new LoginForm(),
      registeredForm: new RegisteredForm(),
      updatePwdForm: new UpdatePwdForm(),
      isForget: false,
      imgSrc: "",
      LoginRule: {
        loginName: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入登录名"
                : "Please enter your login name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message:
              this.$t("index.switch") === "cn"
                ? "密码格式不对"
                : "Incorrect password format",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入验证码"
                : "Please enter your verification code",
            trigger: "blur",
          },
        ],
      },
      RegisteredRule: {
        loginName: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入登录名"
                : "Please enter your login name",
            trigger: "blur",
          },
        ],
        phonenumber: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入正确的手机号"
                : "Please input the correct mobile phone number",
            trigger: "blur",
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
          },
        ],
        code: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入验证码"
                : "Please enter your verification code",
            trigger: "blur",
          },
        ],
        // email: [
        //   {
        //     required: true,
        //     message:
        //       this.$t("index.switch") === "cn"
        //         ? "请输入正确的邮箱格式"
        //         : "Please enter the correct email format",
        //     trigger: "blur",
        //     pattern: /\w+@[a-z0-9]+\.[a-z]{2,4}/,
        //   },
        // ],

        password: [
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message:
              this.$t("index.switch") === "cn"
                ? "密码格式不对"
                : "Incorrect password format",
            trigger: "blur",
          },
        ],
        arginPassword: [
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message:
              this.$t("index.switch") === "cn"
                ? "密码格式不对"
                : "Incorrect password format",
            trigger: "blur",
          },
        ],
      },
      UpdatePwdRule: {
        // phonenumber: [
        //   {
        //     required: true,
        //     message:
        //       this.$t("index.switch") === "cn"
        //         ? "请输入登录名"
        //         : "Please enter your login name",
        //     trigger: "blur",
        //     pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
        //   },
        // ],
        password: [
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message:
              this.$t("index.switch") === "cn"
                ? "密码格式不对"
                : "Incorrect password format",
            trigger: "blur",
          },
        ],
        arginPassword: [
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message:
              this.$t("index.switch") === "cn"
                ? "密码格式不对"
                : "Incorrect password format",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入验证码"
                : "Please enter your verification code",
            trigger: "blur",
          },
        ],
      },
      count: 60,
      timer: null,
    };
  },
  // created(){ this.$emit("checkUsersStatus");},
  watch: {
    type(newValue, oldValue) {
      clearInterval(this.timer);
      this.timer = null;
      this.count = 60;
    },
  },
  methods: {
    changeCode(value) {
      this.codevalue = value;
      // console.log(value);
    },
    async onSubmit(type) {
      var tp = "";
      if (type === "registeredForm") {
        tp = "reg";
      } else {
        tp = "pwd";
      }
      let s = { tp: tp, email: this[type].email };
      // console.log(s);
      // let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      // if (!reg.test(this[type].phonenumber) || this[type].phonenumber === "") {
      //   return this.$message.warning(
      //     this.$t("index.switch") === "cn"
      //       ? "请输入正确手机号"
      //       : "enter the correct phone number"
      //   );
      // }
      // let str = "";
      // if (type === "registeredForm") {
      //   str = this[type].phonenumber + "/reg";
      // } else {
      //   str = this[type].phonenumber + "/pwd";
      // }
      const data = await GetEmail(qs.stringify(s));
      this.timer = setInterval(() => {
        this.count--;
        if (this.count <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.count = 60;
        }
      }, 1000);
      // console.log(data, "data");
    },
    async onRegistered() {
      this.$refs["register"].validate(async (valid) => {
        if (valid) {
          if (
            this.registeredForm.password !== this.registeredForm.arginPassword
          ) {
            return this.$message.error(
              this.$t("index.switch") === "cn"
                ? "两次密码输入不一致"
                : "passwords do not match"
            );
          }
          const data = await Registered({ ...this.registeredForm });
          if (data.code === 0) {
            this.$message.success(
              this.$t("index.switch") === "cn" ? "注册成功" : "success"
            );
            this.registeredForm = new RegisteredForm();
            this.count = 60;
            clearInterval(this.timer);
            this.timer = null;
          } else {
            this.$message.error(data.msg);
          }
        } else {
          return false;
        }
      });
    },
    async getCaptchaImage() {
      const data = await GetCaptchaImage();
      // console.log(data);
      this.imgSrc = window.URL.createObjectURL(data.data);
      // console.log(this.imgSrc);
    },
    async onLogin() {
      //       console.log(this.loginForm);
      //       if(this.loginForm.code!==1){
      // return false
      //       }
      // console.log(this.codevalue);
      // console.log(this.loginForm.code);
      if (this.loginForm.code.toUpperCase() !== this.codevalue) {
        // console.log("比对失败");
      } else {
        this.$refs["login"].validate(async (valid) => {
          if (valid) {
            const data = await Login({ ...this.loginForm });
            //  console.log(data);
            if (data.code === 0) {
              this.$message.success(
                this.$t("index.switch") === "cn" ? "登录成功！" : "success"
              );
              localStorage.setItem("username", data.data);

              this.$emit("close");
              this.$emit("showUserInfo", data.data);
              this.$emit("checkUsersStatus");
              this.loginForm = new LoginForm();
            } else {
              this.$message.error(data.msg);
            }
          } else {
            return false;
          }
        });
      }
    },
    async onUpdatePwd() {
      this.$refs["updatePwd"].validate(async (valid) => {
        if (valid) {
          if (
            this.updatePwdForm.password !== this.updatePwdForm.arginPassword
          ) {
            return this.$message.error(
              this.$t("index.switch") === "cn"
                ? "两次密码输入不一致"
                : "passwords do not match"
            );
          }
          const data = await UpdatePwd({ ...this.updatePwdForm });
          if (data.code === 0) {
            this.$message.success(
              this.$t("index.switch") === "cn"
                ? "密码修改成功，请登录！"
                : "success"
            );
            this.updatePwdForm = new UpdatePwdForm();
            this.count = 60;
            clearInterval(this.timer);
            this.timer = null;
          } else {
            this.$message.error(data.msg);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less">
.form_all_title {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 31px;
  color: #313131;
  opacity: 1;
  margin-bottom: 30px;
}

.register_form {
  button {
    height: 50px !important;
    background: #5432f4 !important;
    opacity: 1;
    border-radius: 4px;
    margin-top: 15px !important;
    font-size: 20px !important;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 26px;
    color: #ffffff;
    opacity: 1;
  }
  .code {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #4d26d7;
    opacity: 1;
  }
  // height:70vh;
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-input {
    height: 40px;
    input::-webkit-input-placeholder {
      font-size: 18px;
    }

    input {
      height: 40px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 24px;
      color: #999999;
      opacity: 1;
    }
  }

  //  overflow-y: scroll;
}
.Login {
  .el-input__inner,
  input {
    height: 40px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #999999;
    opacity: 1;
  }
  input::placeholder {
    font-size: 18px;
  }
  .el-checkbox__inner {
    width: 22px;
    height: 22px;
  }
  .el-checkbox__input {
    vertical-align: sub;
  }
  .el-checkbox__inner::after {
    height: 14px;
    left: 6px;
    width: 6px;
    top: 0px;
  }
  .el-checkbox__label {
    font-size: 16px;
  }
}
</style>
<style lang="less" scoped>
.Login {
  text-align: center;
  .logo {
    height: 90px;
    margin: 36px auto;
  }
  .el-button {
    height: 50px;
    background: #5432f4;

    border-radius: 15px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 26px;
    color: #ffffff;
  }
}
.el-tabs__item.is-active {
  font-size: 20px;
}
.submit {
  width: 100%;
  margin-top: 22px;
}
.back {
  cursor: pointer;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  line-height: 21px;
  color: #4c67ef;
  opacity: 1;
  text-align: right;
}
.between {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 24px;

  .text {
    color: #4c67ef;
    cursor: pointer;
    font-size: 16px;
  }
  .forget {
    color: #ccc;
    cursor: pointer;
    font-size: 16px;
  }
  img {
    height: 41px;
    width: 110px;
    margin-left: 10px;
    cursor: pointer;
  }
  .code {
    margin-left: 15px;
    margin-right: 10px;
    width: 150px;
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 40px;
    // color: #305bbc;
    // font-size: 28px;
    color: #4d26d7;
    cursor: pointer;
  }
}
</style>
