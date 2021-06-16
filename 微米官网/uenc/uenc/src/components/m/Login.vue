<!--
 * @Author: yaoyuting
 * @Date: 2021-04-16 08:54:18
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 21:28:37
 * @Descripttion: 
-->
<template>
  <div class="Login-m">
    <!-- <img class="logo" src="@/assets/imagesm/logo@2x.png" alt="" /> -->
    <p v-show="activeName === 'login'" class="form_all_title">
      {{ $t("dialog.login") }}
    </p>
    <p v-show="activeName === 'register'" class="form_all_title">
      {{ $t("navbar.Register") }}
    </p>
    <p v-show="activeName === 'third'" class="form_all_title">
      {{ $t("dialog.Forgot") }}
    </p>
    <el-form
      ref="login"
      v-if="activeName === 'login'"
      :model="loginForm"
      class="demo-form-inline"
      :rules="loginRule"
    >
      <el-form-item label="" prop="loginName" key="login1">
        <el-input
          v-model="loginForm.loginName"
          :placeholder="$t('dialog.enteru')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="password" key="login2">
        <el-input
          v-model="loginForm.password"
          :placeholder="$t('dialog.enterpw')"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code" key="login3">
        <div class="between">
          <el-input
            v-model="loginForm.code"
            :placeholder="$t('dialog.code')"
          ></el-input>
            <validate-code ref="ref_validateCode" @change="changeCode" />
          <!-- <img :src="imgSrc" alt="" @click="getCaptchaImage" /> -->
        </div>
      </el-form-item>
      <el-form-item>
        <div @click="onLogin" class="submit">{{ $t("dialog.login") }}</div>
      </el-form-item>
      <div class="between">
        <div @click="activeName = 'third'" class="forget">
          {{ $t("dialog.Forgot") }}
        </div>
        <!-- <el-checkbox-group v-model="loginForm.autoLogin">
          <el-checkbox :label="$t('dialog.auto')" name="type"></el-checkbox>
        </el-checkbox-group> -->
        <div @click="activeName = 'register'" class="forget">
          {{ $t("dialog.register") }}<i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-form>
    <el-form
      ref="register"
      v-if="activeName === 'register'"
      :model="registeredForm"
      class="demo-form-inline"
      :rules="registeredRule"
    >
      <el-form-item label="" prop="loginName" key="register1">
        <el-input
          v-model="registeredForm.loginName"
          :placeholder="$t('dialog.enteru')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="email" key="register2">
        <el-input
          v-model="registeredForm.email"
          :placeholder="$t('dialog.entere')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code" key="register3">
        <div class="between">
          <el-input
            v-model="registeredForm.code"
            :placeholder="$t('dialog.enterc')"
          ></el-input>
          <el-button
            type="text"
            @click="onSubmit('registeredForm')"
            class="code"
          >
            {{ timer ? count + "s" : $t("dialog.sendc") }}
          </el-button>
        </div>
      </el-form-item>
      <!-- <el-form-item label="" prop="email" key="register4">
        <el-input
          v-model="registeredForm.email"
          :placeholder="$t('dialog.entere')"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="" prop="password" key="register5">
        <el-input
          v-model="registeredForm.password"
          :placeholder="$t('dialog.enterpw')"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="arginPassword" key="register6">
        <el-input
          v-model="registeredForm.arginPassword"
          :placeholder="$t('dialog.enterap')"
          type="password"
        ></el-input>
      </el-form-item>
      <div @click="onRegistered" class="submit">
        {{ $t("dialog.register") }}
      </div>
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
      <div class="between mt20">
        <div></div>
        <div @click="activeName = 'login'" class="forget">
          {{ $t("dialog.back") }}<i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-form>
    <el-form
      ref="updatePwd"
      v-if="activeName === 'third'"
      :model="updatePwdForm"
      class="demo-form-inline"
      :rules="updatePwdRule"
    >
      <el-form-item label="" prop="email" key="updatePwd1">
        <el-input
          v-model="updatePwdForm.email"
          :placeholder="$t('dialog.entere')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code" key="updatePwd2">
        <div class="between">
          <el-input
            v-model="updatePwdForm.code"
            :placeholder="$t('dialog.code')"
          ></el-input>
          <el-button
            type="text"
            @click="onSubmit('updatePwdForm')"
            class="code"
          >
            {{ timer ? count + "s" : $t("dialog.sendc") }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="" prop="password" key="updatePwd3">
        <el-input
          v-model="updatePwdForm.password"
          type="password"
          :placeholder="$t('dialog.enterpw')"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="arginPassword" key="updatePwd4">
        <el-input
          v-model="updatePwdForm.arginPassword"
          type="password"
          :placeholder="$t('dialog.enterap')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div @click="onUpdatePwd" class="submit">
          {{ $t("dialog.confirm") }}
        </div>
      </el-form-item>
      <div class="between">
        <div></div>
        <div @click="activeName = 'login'" class="forget">
          {{ $t("dialog.back") }}<i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import  qs from 'qs';
class LoginForm {
  constructor() {
    this.loginName = "";
    this.password = "";
    this.code = "";
    this.autoLogin = false;
  }
}
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
  Registered,
  GetCaptchaImage,
  Login,
  UpdatePwd,
   GetEmail,
} from "@/assets/server/api.js";
export default {
  data() {
    return {
        codevalue: "",
      activeName: "",
      loginForm: new LoginForm(),
      registeredForm: new RegisteredForm(),
      updatePwdForm: new UpdatePwdForm(),
      isForget: false,
      imgSrc: "",
      loginRule: {
        loginName: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入登录名"
                : "enter your login name",
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
                : "enter your verification code",
            trigger: "blur",
          },
        ],
      },
      registeredRule: {
        loginName: [
          {
            required: true,
            message:
              this.$t("index.switch") === "cn"
                ? "请输入登录名"
                : "enter your login name",
            trigger: "blur",
          },
        ],
        // email: [
        //   {
        //     required: true,
        //     message:
        //       this.$t("index.switch") === "cn"
        //         ? "请输入正确的邮箱格式"
        //         : "enter the correct email format",
        //     trigger: "blur",
        //     pattern: /\w+@[a-z0-9]+\.[a-z]{2,4}/,
        //   },
        // ],
        // phonenumber: [
        //   {
        //     required: true,
        //     message:
        //       this.$t("index.switch") === "cn"
        //         ? "请输入正确的手机号"
        //         : "input the correct mobile phone",
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
                : "enter your verification code",
            trigger: "blur",
          },
        ],
      },
      updatePwdRule: {
        // phonenumber: [
        //   {
        //     required: true,
        //     message:
        //       this.$t("index.switch") === "cn"
        //         ? "请输入登录名"
        //         : "enter your login name",
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
                : "enter your verification code",
            trigger: "blur",
          },
        ],
      },
      count: 60,
      timer: null,
    };
  },
  props: {
    dialogType: {
      type: String,
      default: "",
    },
  },
  components: {
    validateCode,
  },
  watch: {
    dialogType(newValue, oldValue) {
      this.activeName = newValue;
    },
    activeName(newValue, oldValue) {
      clearInterval(this.timer)
      this.timer=null
      this.count = 60
    }
  },
  created() {
    this.getCaptchaImage();
    this.activeName = this.dialogType;
  },
  methods: {
     changeCode(value) {
      this.codevalue = value;
      // console.log(value);
    },
    async onSubmit(type) {
       var tp='';
      if (type === "registeredForm") {
        tp="reg";
      } else {
        tp= "pwd";
      }
       let s ={tp:tp,email:this[type].email};
      // let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      // if (!reg.test(this[type].phonenumber) || this[type].phonenumber === "") {
      //   return this.$notify({
      //     type: "warning",
      //     message:
      //       this.$t("index.switch") === "cn"
      //         ? "请输入正确手机号"
      //         : "enter the correct phone number",
      //   });
      // }
      // let str = ''
      // if(type === 'registeredForm') {
      //   str = this[type].phonenumber + '/reg'
      // } else {
      //   str = this[type].phonenumber + '/pwd'
      // }
      const data = await GetEmail(qs.stringify(s));
       console.log(data);
      if(data.code=='500'){
         return this.$notify({
              type: "error",
              message:
               data.msg
            });
      }
      this.timer=setInterval(() => {
        this.count--
        if (this.count<=0) {
          clearInterval(this.timer)
          this.timer=null
          this.count = 60
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
            return this.$notify({
              type: "error",
              message:
                this.$t("index.switch") === "cn"
                  ? "两次密码输入不一致"
                  : "passwords do not match",
            });
          }
          const data = await Registered({ ...this.registeredForm });
          if (data.code === 0) {
            this.$notify({
              type: "success",
              message:
                this.$t("index.switch") === "cn" ? "注册成功" : "success",
            });
            this.activeName = "login";
            this.registeredForm = new RegisteredForm();
            this.count = 60
            clearInterval(this.timer)
            this.timer=null
          } else {
            this.$notify({ type: "error", message: data.msg });
          }
        } else {
          return false;
        }
      });
    },
    async getCaptchaImage() {
      const data = await GetCaptchaImage();
      this.imgSrc = window.URL.createObjectURL(data.data);
    },
    onLogin() {
      if (this.loginForm.code.toUpperCase() !== this.codevalue) {
         console.log("比对失败");
      } else {
      this.$refs["login"].validate(async (valid) => {
        if (valid) {
          const data = await Login({ ...this.loginForm });
          if (data.code === 0) {
            this.$notify({
              type: "success",
              message:
                this.$t("index.switch") === "cn" ? "登录成功！" : "success",
            });
            this.$emit("close");
            this.$emit("showUserInfo", data.data);
            this.$emit("checkUsersStatus");
            localStorage.setItem("username", data.data);
            this.loginForm = new LoginForm();
          } else {
            this.$notify({ type: "error", message: data.msg });
          }
        } else {
          return false;
        }
      })};
    },
    async onUpdatePwd() {
      this.$refs["updatePwd"].validate(async (valid) => {
        if (valid) {
          if (
            this.updatePwdForm.password !== this.updatePwdForm.arginPassword
          ) {
            return this.$notify({
              type: "error",
              message:
                this.$t("index.switch") === "cn"
                  ? "两次密码输入不一致"
                  : "passwords do not match",
            });
          }
          
          const data = await UpdatePwd({ ...this.updatePwdForm });
          console.log(data);
          if (data.code === 0) {
            this.$notify({
              type: "success",
              message:
                this.$t("index.switch") === "cn"
                  ? "密码修改成功，请登录！"
                  : "success",
            });
            this.activeName = "login";
            this.updatePwdForm = new UpdatePwdForm();
          } else {
            this.$notify({ type: "error", message: data.msg });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Login-m {
  .form_all_title {
 font-size: 36px;
font-family: PingFang SC;
font-weight: 600;
line-height: 50px;
color: #0D051F;
opacity: 1;
  margin-bottom: 40px;
  text-align: center;
}

  .logo {
    width: 264px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 42px;
  }
  .submit {
    width: 492px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    background: #5432F4;
    border-radius: 8px;
    font-size: 28px;
    color: #fff;
    margin-top: 48px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    color: #5432F4;
    img {
      height: 80px;
      width: 160px;
      margin-left: 10px;
    }
    .code {
      margin-left: 24px;
      color: #5432F4;
      width: 260px;
      text-align: center;
    }
    .forget{
      display: flex;
      align-items: center;
    }
  }
}
</style>
<style lang="less">
.Login-m {
  .between {
    .el-checkbox__label {
      font-size: 20px;
      margin-left: -12px;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #676767;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #dcdfe6;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #5432F4;
      border-color: #5432F4;
    }
  }
}
</style>
