<template>
  <div class="login">
    <slider></slider>
    <van-tabs v-model="active">
      <van-tab :title="$t('login[0]')">
        <ul class="login_form">
          <!-- 用户名 -->
          <li class="username1">
            <label :class="{ movename: loginusername }">{{
              $t("login[2]")
            }}</label>
            <input
              type="text"
              v-model="username1"
              @focus="usernameFocus1"
              @blur="usernameBlur1"
              class="button"
            />
          </li>
          <!-- 密码 -->
          <li class="password1">
            <label :class="{ movename: loginpassword }">{{
              $t("login[3]")
            }}</label>
            <input
              type="password"
              v-model="password1"
              @focus="passwordFocus1"
              @blur="passwordBlur1"
              class="button"
            />
          </li>

          <li class="denglu_footer">
            <input
              type="checkbox"
              v-model="isChecked"
              class="regular-checkbox"
            />
            <span class="rember"> {{ $t("login[11]") }}</span>
            <span class="forget" @click="forgetPassword">
              {{ $t("login[6]") }}</span
            >
          </li>
          <li>
            <button @click="submit1">
              {{ $t("login[0]") }}
            </button>
          </li>
        </ul></van-tab
      >
      <van-tab :title="$t('login[1]')">
        <ul class="register_form">
          <li class="username">
            <label :class="{ movename: registerusername }">{{
              $t("login[2]")
            }}</label>
            <input
              type="text"
              v-model="username"
              @focus="usernameFocus"
              @blur="usernameBlur"
              class="button"
            />
          </li>
          <!-- 手机号 -->
          <li class="telzong">
            <div class="tel">
              <label :class="{ movename: registertel }">{{
                $t("login[7]")
              }}</label>
              <input
                type="text"
                v-model="tel"
                @focus="telFocus"
                @blur="telBlur"
                class="button"
              />
            </div>
          </li>
          <li class="yanzheng">
            <label :class="{ movename: registeryanzheng }">{{
              $t("login[8]")
            }}</label>
            <input
              type="text"
              v-model="yanzheng"
              @focus="yanzhengFocus"
              @blur="yanzhengBlur"
              class="button"
            />
            <span
              class="yanzheng_button"
              @click="getYanzheng"
              v-if="yandisabled"
            >
              {{ $t("login[8]") }}
            </span>
            <span v-show="!yandisabled" class="count spantimer"
              >{{ count }} s</span
            >
          </li>
          <!-- 密码 -->
          <li class="password">
            <label :class="{ movename: registerpassword }">{{
              $t("login[3]")
            }}</label>
            <input
              type="password"
              v-model="password"
              @focus="passwordFocus"
              @blur="passwordBlur"
              class="button"
            />
          </li>
          <!-- 确认密码 -->
          <li class="confirmpassword">
            <label :class="{ movename: registerconfirmpassword }">{{
              $t("login[9]")
            }}</label>
            <input
              type="password"
              v-model="confirmpassword"
              @focus="confirmPasswordFocus"
              @blur="confirmPasswordBlur"
              class="button"
            />
          </li>
          <!-- 邮箱 -->
          <li class="email">
            <label :class="{ movename: registeremail }">{{
              $t("login[10]")
            }}</label>
            <input
              type="text"
              v-model="email"
              @focus="emailFocus"
              @blur="emailBlur"
              class="button"
            />
          </li>
          <li id="registerbutton">
            <button @click="submit">
              {{ $t("login[1]") }}
            </button>
          </li>
        </ul></van-tab
      >
    </van-tabs>
  </div>
</template>
<script>
import { BASEURL } from "@api/api";
import qs from "qs";
import crypto from "crypto";
import slider from "@components/common/slider";
export default {
  inject: ["reload"],
  name: "login",
  data() {
    return {
      active: 0,
      //登录用户名
      username1: "",
      password1: "",
      loginusername: false,
      loginpassword: false,
      // 注册
      username: "",
      tel: "",
      yanzheng: "",
      password: "",
      confirmpassword: "",
      email: "",
      registerusername: false,
      registertel: false,
      registeryanzheng: false,
      registerpassword: false,
      registerconfirmpassword: false,
      registeremail: false,
      // 复选框
      isChecked: true, // 记住密码
      // 倒计时效果
      count: "",
      yandisabled: true,
    };
  },
  components: { slider },
  created() {
    this.$store.commit("showSliderFalse");
  },
  mounted() {
    this.getCookie();
    if (this.username1 !== "") {
      this.loginusername = true;
    }
    if (this.password1 !== "") {
      this.loginpassword = true;
    }
  },
  methods: {
    // 忘记密码
    forgetPassword() {
      this.$router.push({
        path: "/forgetpassword",
      });
      // this.$store.dispatch("forget");
      // this.$store.dispatch("loginShow");
    },
    // 登录用户名
    usernameFocus1() {
      this.loginusername = true;
    },
    usernameBlur1() {
      if (this.username1 == "") {
        this.loginusername = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("用户名不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Username can not be empty");
        }
      } else {
        this.loginusername = true;
      }
    },
    // 登录密码
    passwordFocus1() {
      this.loginpassword = true;
    },
    passwordBlur1() {
      if (this.password1 == "") {
        this.loginpassword = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("密码不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("password can not be blank");
        }
      } else {
        this.loginpassword = true;
      }
    },
    // 注册用户名
    usernameFocus() {
      this.registerusername = true;
    },
    usernameBlur() {
      if (this.username == "") {
        this.registerusername = false;
        this.$message({
          showClose: true,
          type: "error",
          message: "用户名不能为空",
          duration: 1000,
        });
      } else {
        this.registerusername = true;
      }
    },
    // 手机号
    telFocus() {
      this.registertel = true;
    },
    telBlur() {
      if (this.tel == "") {
        this.registertel = false;
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
          this.registertel = true;
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
      this.registeryanzheng = true;
      // this.blue5 = true;
    },
    yanzhengBlur() {
      if (this.yanzheng == "") {
        this.registeryanzheng = false;
        // this.blue5 = false;
      } else {
        this.registeryanzheng = true;
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
      var that = this;
      await that.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}` + "/weimioffice/login/getPhoneCode",
          qs.stringify({
            phone: that.tel,
            type: 0,
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
      this.registerpassword = true;
    },
    passwordBlur() {
      if (this.password == "") {
        this.registerpassword = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("密码不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("password can not be blank");
        }
      } else {
        // this.anNiu();
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
        } else {
          this.registerpassword = true;
        }
      }
    },
    // 确认密码
    confirmPasswordFocus() {
      this.registerconfirmpassword = true;
    },
    confirmPasswordBlur() {
      if (this.confirmpassword == "") {
        this.registerconfirmpassword = false;
      } else {
        if (this.password !== this.confirmpassword) {
          if (this.$i18n.locale == "cn") {
            this.$message.error("两次密码输入不一致");
            this.confirmpassword = "";
          }
          if (this.$i18n.locale == "en") {
            this.$message.error("Two password entries are inconsistent");
            this.confirmpassword = "";
          }
        } else {
          this.registerconfirmpassword = true;
        }
      }
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
    getuserid() {
      // var token = localStorage.getItem("token");
      // console.log(localStorage.getItem("token"));
      if (localStorage.getItem("token") === "") {
        this.$message.error("请先登录");
      } else {
        this.$http
          .post(
            // 测试上
            //47.105.215.191/weimi/index/getPhoneCode
            `${BASEURL}` + "/weimioffice/login/getBindInfo",
            qs.stringify({
              userId: localStorage.getItem("userId"),
            }),
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            // console.log(res);
            localStorage.setItem("address", res.data.result[0]);
            localStorage.setItem("number", res.data.result[1]);
          });
      }
    },
    //登录
    async submit1() {
      if (this.username1 == "" || this.password1 == "") {
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
            `${BASEURL}` + "/weimioffice/login/userLogin",
            qs.stringify({
              username: this.username1,
              password: this.password1,
            })
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              localStorage.setItem("loginState", new Date());
              localStorage.setItem("login", true);
              if (this.$i18n.locale == "cn") {
                this.$toast.success({
                  duration: 1000, // 持续展示 toast
                  forbidClick: true, // 禁用背景点击
                  loadingType: "spinner",
                  message: "登陆成功",
                  position: top,
                });
                //  this.$message.success("登陆成功");
                // this.$message({
                //   message: "登陆成功",
                //   center: true,
                //   type: "success",
                //   duration: 1000,
                // });
                // this.$notify({
                //   message: "登录成功",
                //   color: "#ad0000",
                //   background: "pink",
                //   duration: 50000,
                // });
              }
              if (this.$i18n.locale == "en") {
                // this.$message.success("login successful");
                this.$toast.success({
                  duration: 1000, // 持续展示 toast
                  forbidClick: true, // 禁用背景点击
                  loadingType: "spinner",
                  message: "login successful",
                  position: top,
                });
                // this.$message({
                //   message: "login successful",
                //   center: true,
                //   type: "success",
                //   duration: 1000,
                // });
              }
              // this.$store.dispatch("leavelogin");
              this.$store.commit("login");
              // this.username1 = "";
              // this.password1 = "";
              localStorage.setItem("username", res.data.result.username);
              // this.$store.state.username = res.data.result.username;
              // console.log(this.$store.state.username)
              // const store = {
              //   username: res.data.result.username,
              //   userId: res.data.result.userId,
              //   token: res.data.result.token,
              //   password1: this.password1,
              //   username1: this.username1,
              // };
              // localStorage.setItem("store", JSON.stringify(store));
              localStorage.setItem("userId", res.data.result.userId);
              localStorage.setItem("token", res.data.result.token);
              localStorage.setItem("deptId", res.data.result.deptId);
              localStorage.setItem(
                "walletAddress",
                res.data.result.walletAddress
              );
              this.$store.state.userId = res.data.result.userId;
              this.getuserid();

              if (this.isChecked) {
                // 记住密码
                localStorage.setItem("isChecked", true);
                this.setCookie(this.username1, this.password1, 30); // 保存期限为30天
              } else {
                localStorage.setItem("isChecked", false);
                this.clearCookie(); // 清空 Cookie
              }
              this.$router.push({
                path: "/index",
              });
            } else {
              this.$message.error(res.data.result);
            }
          });
      }
    },
    // 注册
    async submit() {
      if (
        this.username == "" ||
        this.tel == "" ||
        this.yanzheng == "" ||
        this.password == "" ||
        this.confirmpassword == "" ||
        this.email == ""
      ) {
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
            `${BASEURL}` + "/weimioffice/login/userRegister",
            qs.stringify({
              username: this.username,
              password: this.password,
              // 加密
              email: this.email,
              phone: this.tel,
              phoneCode: this.yanzheng,
            })
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              if (this.$i18n.locale == "cn") {
                this.$message.success("恭喜你注册成功");
              }
              if (this.$i18n.locale == "en") {
                this.$message.success(
                  "Congratulations on your successful registration"
                );
              }
              this.username = "";
              this.tel = "";
              this.password = "";
              this.confirmpassword = "";
              // 加密
              this.email = "";
              this.yanzheng = "";
              this.yandisabled = true;
            } else {
              this.$message.error(res.data.result);
            }
          });
      }
    },
    // 邮箱
    emailFocus() {
      this.registeremail = true;
      window.scrollTo(0, 0);
    },
    emailBlur() {
      if (this.email == "") {
        this.registeremail = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("邮箱不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Email can not be blank");
        }
      } else {
        let emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!emailreg.test(this.email)) {
          if (this.$i18n.locale == "cn") {
            this.$message.error("请输入正确的邮箱格式");
            this.email = "";
            this.showemail = false;
          }
          if (this.$i18n.locale == "en") {
            this.$message.error("Please enter the correct email format");
            this.email = "";
            this.showemail = false;
          }
        } else {
          this.registeremail = true;
        }
      }
    },
  },
};
</script>
<style lang="less">
@keyframes move {
  from {
    position: relative;
    top: 23px;
  }
  to {
    position: relative;
    top: 1px;
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
.button:hover {
  border: 1px solid#009FCD !important;
}
input {
  width: 345px;
  height: 40px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  padding-left: 15px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}
input::-webkit-input-placeholder {
  font-size: 14px;
  font-family: ‘;
  font-weight: normal;
  line-height: 15px;
  color: #ffffff;
  opacity: 0.5;
}

.login {
  width: 100%;
  height: auto;
  background: #0d0d0d;
  .van-tabs__nav {
    background: rgba(255, 255, 255, 0.05);
  }
  .van-tab {
    color: white;
    font-size: 16px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 22px;
  }
  .van-tab--active {
    color: #009fcd;
  }
  .van-tabs__line {
    width: 187px;
    height: 1px;
    background: #009fcd;
    border-radius: 1px;
  }
  .login_form {
    height: 100vh;
    margin-top: -30px;
    label {
      font-size: 14px;
      font-family: "苹方-简";
      font-weight: normal;
      opacity: 1;
      position: relative;
      top: 30px;
      left: 15px;
      font-weight: normal;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.5);
    }
    li {
      width: 345px;
      height: 40px;
      margin: 0 auto;
    }
    li:nth-child(1) {
      margin-top: 50px;
    }
    li:nth-child(2) {
      margin-top: 30px;
    }
    li:nth-child(4) {
      margin-top: 50px;
      button{
        margin-left: 0px!important;
      }
    }
    .denglu_footer {
      margin-top: 40px;
      font-size: 11px;
      font-family: "苹方-简";
      font-weight: normal;
      color: #ffffff;
      opacity: 0.5;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      input {
        width: 16px !important;
        height: 18px !important;
        position: relative;
        left: -110px;
      }
      .rember {
        position: relative;
        left: -210px;
      }
    }
    button {
      width: 345px;
      height: 40px;
      line-height: 40px;
      background: #009fcd;
      border-radius: 5px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      color: #ffffff;
      border: none;
    }
  }
  .register_form {
    height: auto;
    min-height: 100vh;
    margin-top: -30px;
    #registerbutton {
      margin-top: 70px;
      button{
        margin-left: 0px!important;
      }
    }
    label {
      font-size: 14px;
      font-family: "苹方-简";
      font-weight: normal;
      opacity: 1;
      position: relative;
      top: 30px;
      left: 15px;
      font-weight: normal;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.5);
    }
    .count {
      position: relative;
      left: 300px;
      top: -32px;
      color: #009fcd;
    }
    .yanzheng_button {
      font-size: 14px;
      font-family: "苹方-简";
      font-weight: normal;
      color: #009fcd;
      position: relative;
      left: 260px;
      top: -32px;
    }
    li {
      width: 345px;
      height: 40px;
      margin: 0 auto;
    }
    li:nth-child(1) {
      margin-top: 50px;
    }
    li {
      margin-top: 30px;
    }
    .denglu_footer {
      margin-top: 20px;
      font-size: 11px;
      font-family: "苹方-简";
      font-weight: normal;
      color: #ffffff;
      opacity: 0.5;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      input {
        width: 16px !important;
        height: 16px !important;
        position: relative;
        left: -110px;
      }
      .rember {
        position: relative;
        left: -210px;
      }
    }
    button {
      width: 345px;
      height: 40px;
      line-height: 40px;
      background: #009fcd;
      border-radius: 5px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
