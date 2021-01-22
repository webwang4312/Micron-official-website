<template>
  <div class="fastoken">
    <slider></slider>
    <div class="dengluzhuce">
      <div class="forget_content">
        <!-- 转入钱包地址 -->
        <div class="telzong">
          <div class="address">
            <label> {{ $t("fastoken[6]") }}</label>
            <input type="text" v-model="address" disabled="true" />
          </div>
        </div>
        <!-- 输入钱包地址 -->
        <div class="haxi2">
          <label :class="{ movename2: showpassword2 }">
            {{ $t("fastoken[1]") }}</label
          >
          <input
            type="text"
            v-model="haxi2"
            @focus="haxiFocus2"
            @blur="haxiBlur2"
            :class="{ blue22: blue22 }"
          />
        </div>
        <div class="number">
          <label>
            {{ $t("fastoken[2]") }}
          </label>
          <input type="text" v-model="number" disabled="true" />
        </div>
        <!-- 交易哈希-->
        <div class="haxi">
          <label :class="{ movename: showpassword }">
            {{ $t("fastoken[3]") }}</label
          >
          <input
            type="text"
            v-model="haxi"
            @focus="haxiFocus"
            @blur="haxiBlur"
            :class="{ blue2: blue2 }"
          />
        </div>
        <div class="but_zong">
          <div class="fastoken_footer">
            <img
              src="@assets/images/fastoken/组 2@2x.png"
              class="fastoken_icon"
            />
            <span class="shenming"> {{ $t("fastoken[5]") }}</span>
          </div>
          <button class="submit" @click="submit">
            {{ $t("fastoken[4]") }}
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BASEURL} from '@api/api';
import slider from "@components/common/slider";
var qs = require("qs");
import crypto from "crypto";
export default {
  data() {
    return {
      tabsname: [],
      blue: "",
      //   表单内容
      address: localStorage.getItem("address"),
      number: localStorage.getItem("number"),
      haxi: "",
      haxi2: "",
      showpassword: false,
      showpassword2: false,
      btndisabled: false,
      isChecked: true, // 记住密码
      blue2: false,
      blue22: false,
    };
  },
  computed: {},
  created() {
     this.$store.commit("showSliderFalse");
  },
  components: { slider },
  mounted() {},

  methods: {
    fastokenHide() {
      // console.log(this.$store.state.showlogin);
      this.$store.dispatch("fastokenHide");
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

    // 密码
    haxiFocus() {
      this.showpassword = true;
    
    },
    haxiBlur() {
      if (this.haxi == "") {
        this.showpassword = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("交易哈希不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Transaction hash cannot be empty");
        }
      
      } else {
         this.showpassword = true;
      }
    },
    // 密码
    haxiFocus2() {
      this.showpassword2 = true;
     
    },
    haxiBlur2() {
      if (this.haxi2 == "") {
        this.showpassword2 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("交易哈希不能为空");
        }
        if (this.$i18n.locale == "en") {
          this.$message.error("Transaction hash cannot be empty");
        }
       
      } else {
       this.showpassword2 = true;
      }
    },

    // 确认
    async submit() {
      if (
        this.address == "" ||
        this.number == "" ||
        this.haxi == "" ||
        this.haxi2 == ""
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
            `${BASEURL}`+"/weimioffice/login/bindWallet",
            qs.stringify({
              walletAddress: this.haxi2,
              hash: this.haxi,
              // 加密
              userId: localStorage.getItem("userId"),
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            //  alert(res);
            if (res.data.code == 200) {
               localStorage.setItem(
                "walletAddress",
                 res.data.result
              );
              
               this.$router.push({
                path: "/index",
              });
              if (this.$i18n.locale == "cn") {
                this.$message.success('绑定成功');
                this.$store.dispatch("fastokenHide");
                //  this.$message.error('请重新登录');
                // this.tel = "";
                // this.password = "";
                // this.confirmpassword = "";
                // this.yanzheng = "";
              }
              if (this.$i18n.locale == "en") {
                this.$message.success('Bind Success');
                this.$store.dispatch("fastokenHide");
                //  this.$message.error('请重新登录');
                // this.tel = "";
                // this.password = "";
                // this.confirmpassword = "";
                // this.yanzheng = "";
              }
            } else {
              this.$message.error('绑定失败');
              //   if (this.$i18n.locale == "cn") {
              //     this.$message.error("修改失败");
              //   }
              //   if (this.$i18n.locale == "en") {
              //     this.$message.error("fail to edit");
              //   }
            }
          });
      }
    },
  },
};
</script>

<style lang="less">
.fastoken_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
align-items: center;
  .shenming {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
  }
  .fastoken_icon {
    width: 15px;
    height: 15px;
  }
}
.input {
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
    font-size: 10px;
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
.movename2 {
  animation: move 0.5s linear;
  animation-fill-mode: forwards;
}
.blue2 {
  border: 1px solid #009fcd !important;
}
.blue22 {
  border: 1px solid #009fcd !important;
}
.blue {
  color: #ffffff;
  opacity: 1 !important;
}
.fastoken {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: #131313;
  .dengluzhuce {
    width: 100%;
    height: auto;
    background: #131313;
    border-radius: 10px;
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

      .address {
        width: 318px;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        label {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #009fcd;
          line-height: 24px;
          position: relative;
          top: 0px;
          left: 15px;
        }
        input {
          font-size: 14px !important;
          font-family: "苹方-简";
          font-weight: normal;
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
    .number {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 10px;
      label {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #009fcd;
        line-height: 24px;
        position: relative;
        top: 0px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        font-size: 14px !important;
        font-family: "苹方-简";
        font-weight: normal;
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
    .haxi {
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
        top: 35px;
        left: 15px;
      }
      input {
        font-size: 14px !important;
        font-family: "苹方-简";
        font-weight: normal;
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
    .haxi2 {
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
        top: 35px;
        left: 15px;
      }
      input {
        font-size: 14px !important;
        font-family: "苹方-简";
        font-weight: normal;
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
      .submit {
        width: 318px;
        height: 45px;
        background: #009fcd;
        border-radius: 10px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin: 0 auto;
        margin: 50px auto 0;
        font-size: 16px;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
