<template>
  <div class="login">
    <div class="dengluzhuce">
      <img
        src="@assets/images/index/组 3@2x.png"
        alt=""
        style="width:24px;height:24px; position: relative;;left:336px;top:30px;cursor:pointer"
        @click="login"
      />
      <div class="tabs_name">
        <div
          v-for="item in tabsname"
          :key="item.id"
          @click="tabsName(item.id)"
          :class="{ blue: blue === item.id }"
          class="tabs_namelist"
        >
          {{ item.name }}
        </div>
      </div>

      <div class="line"></div>
      <div class="linebottom" v-if="linebottom1"></div>
      <div class="linebottom2" v-if="linebottom2"></div>
      <div class="content_left content" v-if="linebottom1">
        <!-- 用户名 -->
        <div class="username1">
          <!-- <label :class="{ movename: showusername1 }">{{
            $t("login[2]")
          }}</label> -->
          <input
            type="text"
            v-model="username1"
            @focus="usernameFocus1"
            @blur="usernameBlur1"
            :placeholder="$t('login[2]')"
            class="button"
          />
        </div>
        <!-- 密码 -->
        <div class="password1">
          <!-- <label :class="{ movename: showpassword1 }">{{
            $t("login[3]")
          }}</label> -->
          <input
            type="password"
            v-model="password1"
            @focus="passwordFocus1"
            @blur="passwordBlur1"
            :placeholder="$t('login[3]')"
            class="button"
          />
        </div>
        <!-- 图片验证码 -->
        <div class="password2">
          <!-- <label :class="{ movename: showpassword1 }">{{
            $t("login[3]")
          }}</label> -->
          <input
            type="text"
            v-model="password22"
            :placeholder="$t('forgetpassword[2]')"
            class="button"
            @focus="imgyanzhengfocus"
            @blur="imgyanzhengblur"
          />
          <button @click="createCode" id="imgcode">
            {{ imgCode }}
          </button>
        </div>
        <div class="password2">
          <div
            :class="{ submita: true, submitsed1: submits1 }"
            @click="submit1"
          >
            {{ $t("login[0]") }}
          </div>
        </div>
        <div class="denglu_footer">
          <div>
            <input
              type="checkbox"
              :class="{ check: check }"
              v-model="isChecked"
              class="regular-checkbox"
            />
            <span class="rember">{{ $t("login[11]") }}</span>
          </div>

          <span class="forget" @click="forgetPassword">
            {{ $t("login[6]") }}</span
          >
        </div>
      </div>
      <div class="content_right content" v-if="linebottom2">
        <!-- 用户名 -->
        <div class="username">
          <!-- <label :class="{ movename: showusername }">{{
            $t("login[2]")
          }}</label> -->
          <input
            type="text"
            v-model="username"
            @focus="usernameFocus"
            @blur="usernameBlur"
            :placeholder="$t('login[2]')"
            class="button"
          />
        </div>
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
            <!-- <label :class="{ movename: showtel }">{{ $t("login[7]") }}</label> -->
            <input
              type="text"
              v-model="tel"
              @focus="telFocus"
              @blur="telBlur"
              :placeholder="$t('login[7]')"
              class="button"
            />
          </div>
        </div>
        <div class="yanzheng">
          <!-- <label :class="{ movename: showyanzheng }">{{
            $t("login[8]")
          }}</label> -->
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
          <!-- <label :class="{ movename: showpassword }">{{
            $t("login[3]")
          }}</label> -->
          <input
            type="password"
            v-model="password"
            @focus="passwordFocus"
            @blur="passwordBlur"
            :placeholder="$t('login[3]')"
            class="button"
          />
        </div>
        <!-- 确认密码 -->
        <div class="confirmpassword">
          <!-- <label :class="{ movename: showconfirmpassword }">{{
            $t("login[9]")
          }}</label> -->
          <input
            type="password"
            v-model="confirmpassword"
            @focus="confirmPasswordFocus"
            @blur="confirmPasswordBlur"
            :placeholder="$t('login[9]')"
            class="button"
          />
        </div>
        <!-- 邮箱 -->
        <div class="email">
          <!-- <label :class="{ movename: showemail }">{{ $t("login[10]") }}</label> -->
          <input
            type="text"
            v-model="email"
            @focus="emailFocus"
            @blur="emailBlur"
            :placeholder="$t('login[10]')"
            class="button"
          />
        </div>
        <div class="email">
          <div :class="{ submitb: true, submitsed: submits }" @click="submit">
            {{ $t("login[1]") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { country } from "../assets/rule.js";
import { BASEURL } from "@api/api";
import qs from "qs";
import crypto from "crypto";
import { log } from "util";
export default {
  inject: ["reload"],
  data() {
    return {
      blue1: false,
      blue2: false,
      blue3: false,
      blue4: false,
      blue5: false,
      blue6: false,
      blue7: false,
      blue8: false,
      blue9: false,
      tabsname: [],
      blue: "",
      linebottom1: false,
      linebottom2: false,
      imgCode: "",
      //   表单内容
      username: "",
      username1: "",
      tel: "",
      yanzheng: "",
      password: "",
      password1: "",
      password22: "",
      confirmpassword: "",
      email: "",
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
      // 倒计时
      count: "",
      timer: null,
      yandisabled: true,
      yy: "",
      btndisabled: false,
      isChecked: true, // 记住密码
      submits: false,
      submits1: false,
      check: true,
    };
  },
  computed: {},
  watch: {
    yandisabled(newName, oldName) {
      // console.log("newName" + newName);
      // console.log("oldName" + oldName);
    },
  },
  created() {
    // console.log(localStorage.getItem("isChecked"));
    // this.isChecked = localStorage.getItem("isChecked");
    // console.log(this.isChecked);
    this.createCode();
    // this.anNiu1();
    // this.anNiu();
    // this.$i18n.locale = "en";
    // console.log(this.$i18n.locale);
    if (this.$i18n.locale == "en") {
      this.tabsname = [
        { name: "Login", id: 0 },
        { name: "Register", id: 1 },
      ];
    }
    if (this.$i18n.locale == "cn") {
      this.tabsname = [
        { name: "登录", id: 0 },
        { name: "注册", id: 1 },
      ];
    }
    this.blue = this.$store.state.number;
    if (this.blue == 0) {
      this.linebottom1 = true;
      this.linebottom2 = false;
    } else {
      this.linebottom1 = false;
      this.linebottom2 = true;
    }

    // 手机号
    // this.country = country;
    // console.log(country);
    // this.countrySelected = country[0].name;
    // this.phoneleave = "86+";
  },

  mounted() {
    this.getCookie();
  },

  methods: {
    createCode() {
      let code = "";
      const codeLength = 4; //验证码的长度
      const random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ); //随机数
      for (let i = 0; i < codeLength; i++) {
        //循环操作
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.imgCode = code; //把code值赋给验证码
      // console.log(this.imgCode);
    },
    login() {
      // console.log(this.$store.state.showlogin);
      this.$store.dispatch("loginShow");
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

    // 忘记密码
    forgetPassword() {
      this.$store.dispatch("forget");
      this.$store.dispatch("loginShow");
    },

    tabsName(index) {
      this.blue = index;
      if (this.blue == 0) {
        this.linebottom1 = true;
        this.linebottom2 = false;
      }
      if (this.blue == 1) {
        this.linebottom1 = false;
        this.linebottom2 = true;
      }
    },
    // 图片验证码
    imgyanzhengfocus() {
      // this.blue9 = true;
    },
    imgyanzhengblur() {
      // if (this.password22 == "") {
      //   // this.blue9 = false;
      // } else {
      //   if (this.username1 !== "" && this.password1 !== "") {
      //     // this.anNiu1();
      //     // this.blue1 = true;
      //     // this.blur2 = true;
      //   }
      //   if (this.password22 !== this.imgCode) {
      //     this.password22 = "";
      //     this.createCode();
      //     this.$message.error("验证码输入错误");
      //   } else {
      //   }
      // }
    },
    // 用户名
    usernameFocus() {
      this.showusername = true;
      // this.blue3 = true;
    },
    usernameBlur() {
      if (this.username == "") {
        this.showusername = false;
        // this.blue3 = false;
        this.$message({
          showClose: true,
          type: "error",
          message: "用户名不能为空",
          duration: 1000,
        });
      } else {
        // this.anNiu();
        // let regname = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        // if (!regname.test(this.username)) {
        //   this.$message.error(
        //     "用户名由英文字母和数字组成的4-16位字符，以字母开头"
        //   );
        //   this.username = "";
        // }
      }
    },
    // 用户名
    usernameFocus1() {
      this.showusername1 = true;
      // this.blue1 = true;
    },
    usernameBlur1() {
      if (this.username1 == "") {
        this.showusername1 = false;
        // this.blue1 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("用户名不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Username can not be empty");
        }
      } else {
        // this.anNiu1();
      }
    },
    // 手机号
    telFocus() {
      this.showtel = true;
      // this.blue4 = true;
    },
    telBlur() {
      if (this.tel == "") {
        this.showtel = false;
        // this.blue4 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("手机号码不能为空");
          this.tel = "";
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Phone number can not be blank");
          this.tel = "";
        }
      } else {
        // this.anNiu();
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
      // this.blue5 = true;
    },
    yanzhengBlur() {
      if (this.yanzheng == "") {
        this.showyanzheng = false;
        // this.blue5 = false;
      } else {
        // this.anNiu();
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
              this.yandisabled = false;
              this.count = TIME_COUNT;
              this.showtimer = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                  // console.log(this.timer);
                } else {
                  this.yandisabled = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            } else {
              this.timer = true;
            }
            // 获取验证码按钮发送一次
            //console.log(this.yandisabled);
            // this.yandisabled = true;
          } else if (res.data.code == 400) {
            // // 倒计时效果
            // const TIME_COUNT = 60;
            // if (!this.timer) {
            //     this.yandisabled = false;
            //   this.count = TIME_COUNT;
            //   this.showtimer = false;
            //   this.timer = setInterval(() => {
            //     if (this.count > 0 && this.count <= TIME_COUNT) {
            //       this.count--;

            //     } else {
            //       this.yandisabled = true;
            //       clearInterval(this.timer);
            //       this.timer = null;
            //     }
            //   }, 1000);
            // } else {
            //   this.timer = true;
            // }
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
      // this.blue6 = true;
    },
    passwordBlur() {
      if (this.password == "") {
        this.showpassword = false;
        // this.blue6 = false;
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
        }
      }
    },
    // 密码
    passwordFocus1() {
      this.showpassword1 = true;
      // this.blue2 = true;
    },
    passwordBlur1() {
      if (this.password1 == "") {
        this.showpassword1 = false;
        // this.blue2 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("密码不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("password can not be blank");
        }
      } else {
        // this.anNiu1();
        // let passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        // if (!passwordreg.test(this.password1)) {
        //   if (this.$i18n.locale == "cn") {
        //     this.$message.error("请输入6-16英文加数字");
        //     this.password1 = "";
        //   }
        //   if (this.$i18n.locale == "en") {
        //     this.$message.error("Please enter 6-16 English plus numbers");
        //     this.password1 = "";
        //   }
        // }
      }
    },
    // 确认密码
    confirmPasswordFocus() {
      this.showconfirmpassword = true;
      // this.blue7 = true;
    },
    confirmPasswordBlur() {
      if (this.confirmpassword == "") {
        this.showconfirmpassword = false;
        // this.blue7 = false;
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
        }
        // this.anNiu();
      }
    },
    // 邮箱
    emailFocus() {
      this.showemail = true;
      // this.blue8 = true;
    },
    emailBlur() {
      if (this.email == "") {
        this.showemail = false;
        // this.blue8 = false;
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
          // this.anNiu();
        }
      }
    },
    // 注册
    async submit() {
      // console.log(this.timer);
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
      if (this.password22 !== this.imgCode) {
        this.password22 = "";
        this.createCode();
        this.$message.error("验证码输入有误，请重新输入");
      } else {
        if (
          this.username1 == "" ||
          this.password1 == "" ||
          this.password22 == ""
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
                sessionStorage.setItem("uenc-whilelogin", "true");
                if (this.$i18n.locale == "cn") {
                  this.$message.success("登录成功");
                }
                if (this.$i18n.locale == "en") {
                  this.$message.success("login successful");
                }
                this.$store.dispatch("leavelogin");
                this.$store.commit("loginShow");
                // this.username1 = "";
                // this.password1 = "";
                this.$store.state.username = res.data.result.username;
                // console.log(this.$store.state.username)
                localStorage.setItem("uenc-username", res.data.result.username);
                const store = {
                  username: res.data.result.username,
                  userId: res.data.result.userId,
                  token: res.data.result.token,
                  password1: this.password1,
                  username1: this.username1,
                };
                localStorage.setItem("store", JSON.stringify(store));
                localStorage.setItem("userId", res.data.result.userId);
                localStorage.setItem("token", res.data.result.token);
                localStorage.setItem("deptId", res.data.result.deptId);
                localStorage.setItem(
                  "walletAddress",
                  res.data.result.walletAddress
                );
                // console.log(
                //   "walletAddress+" + localStorage.getItem("walletAddress")
                // );
                //  localStorage.setItem("username", res.data.result.username);
                //  localStorage.setItem("userId", res.data.result.userId);
                //  localStorage.setItem("token", res.data.result.token);
                //  localStorage.setItem("password1", this.password1);
                //  localStorage.setItem("username1", this.username1);
                // localStorage.setItem("token", res.data.result.token);
                // console.log(sessionStorage.getItem("userId"));
                this.$store.state.userId = res.data.result.userId;
                this.getuserid();
                this.reload();
                if (this.isChecked) {
                  // 记住密码
                  localStorage.setItem("isChecked", true);
                  this.setCookie(this.username1, this.password1, 30); // 保存期限为30天
                } else {
                  localStorage.setItem("isChecked", false);
                  this.clearCookie(); // 清空 Cookie
                }
              } else {
                this.$message.error(res.data.result);
              }
            });
        }
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
// .blue5 {
//   border: 1px solid #009fcd !important;
// }
// .blue6 {
//   border: 1px solid #009fcd !important;
// }
// .blue7 {
//   border: 1px solid #009fcd !important;
// }
// .blue8 {
//   border: 1px solid #009fcd !important;
// }
// .blue9 {
//   border: 1px solid #009fcd !important;
// }
input::-webkit-input-placeholder {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
}
#imgcode {
  width: 70px !important;
  height: 29px !important;
  background: white !important;
  color: black !important;
  line-height: 29px !important;
  position: relative;
  left: 225px !important;
  top: -27px !important;
  cursor: pointer !important;
  font-size: 16px !important;
}
.check {
  position: absolute;
  top: 0;
  background-color: #009fcd !important;
  color: #ffffff;
  width: 15px !important;
  height: 15px !important;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  // border-radius: 3px;
}
input[type="checkbox"] {
  cursor: pointer;
  position: relative;
  width: 15px;
  height: 15px;
  font-size: 14px;
}

input[type="checkbox"]::after {
  background: #009fcd !important;
}

input[type="checkbox"]:checked::after {
  width: 100%;
  content: "✓";
  font-size: 14px;
  font-weight: bold;
  background: #009fcd !important;
}
.denglu_footer {
  width: 318px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 15px;
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
.login {
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
    height: 619px;
    background: #131313;
    border-radius: 10px;
    .tabs_name {
      padding-top: 32px;
      margin-left: 41px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 125px;

      cursor: pointer;
      .tabs_namelist {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        opacity: 0.5;
      }
    }
    .line {
      width: 320px;
      height: 1px;
      background: #ffffff;
      opacity: 0.1;
      margin: 0 auto;
      margin-top: 31px;
    }
    .linebottom {
      width: 60px;
      height: 2px;
      background: #009fcd;
      transform: translateX(41px);
      margin-top: -2px;
    }
    .linebottom2 {
      width: 60px;
      height: 2px;
      background: #009fcd;
      transform: translateX(129px);
      margin-top: -2px;
    }
    .content {
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
    .username {
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
    .username1 {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 70px;
      label {
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 25px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
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
    }
    .yanzheng {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 10px;
      line-height: 20px;
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
        right: -227px;
        top: -30px;
        color: #009fcd;
        font-size: 16px;
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
    .password1 {
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
    .password2 {
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
    .email {
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

    .submita {
      width: 318px !important;
      height: 45px;
      line-height: 45px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      margin: 30px auto 0;
      font-size: 16px;
      padding-left: 15px;
      cursor: pointer;
    }
    .submitsed {
      background: #009fcd !important;
    }
    .submitsed1 {
      background: #009fcd !important;
    }
    .submitb {
      width: 318px !important;
      height: 45px;
      line-height: 45px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      margin: 0 auto;
      margin-top: 40px;
      font-size: 16px;
      padding-left: 15px;
      cursor: pointer;
    }
    .submita:hover {
      background: #009fcd !important;
    }
    .submitb:hover {
      background: #009fcd !important;
    }
  }
}
</style>
