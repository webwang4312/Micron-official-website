<template>
  <div class="forgetpassword">
    <div class="dengluzhuce">
      <div  style="width:40px;height:40px; position: relative;;left:336px;top:41px;cursor:pointer;" @click="fastokensecondHide">
         <img
        src="@assets/images/index/组 3@2x.png"
        alt=""
        style="width:30px;height:30px; cursor:pointer"
        
      />
      </div>
     
      <div class="tabs_name">
      查看钱包地址
      </div>
      <div class="line"></div>

      <div class="forget_content">
        <!-- 转入钱包地址 -->
        <div class="telzong">
          <div class="address">
            <label> 钱包地址</label>
            <input type="text" v-model="address" disabled="true" />
          </div>
        </div>
        <div class="but_zong">
          <div class="submit">
          已绑定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var qs = require("qs");
import crypto from "crypto";
export default {
  data() {
    return {
      tabsname: [],
      blue: "",
      //   表单内容
      address:'' ,
      haxi: "",
      showpassword: false,
      showpassword2: false,
      btndisabled: false,
      isChecked: true, // 记住密码
      blue2: false,
     
    };
  },
  computed: {},
  created() {
    this.address=localStorage.getItem("walletAddress")
  },

  mounted() {},

  methods: {
    fastokensecondHide() {
      // console.log(this.$store.state.showlogin);
      this.$store.commit("fastokensecondHide");
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
      this.blue2 = true;
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
        this.blue2 = false;
      } else {
        this.blue2 = true;
      }
    },
    // 密码
   

    // 确认
    // async submit() {
    //   if (
    //     this.address == "" ||
    //     this.number == "" ||
    //     this.haxi == "" ||
    //     this.haxi2 == ""
    //   ) {
    //     if (this.$i18n.locale == "cn") {
    //       this.$message.error("请填写完整信息");
    //     }
    //     if (this.$i18n.locale == "en") {
    //       this.$message.error("Please fill in the complete information");
    //     }
    //   } else {
    //     this.$http
    //       .post(
    //         // 测试上
    //         //47.105.215.191/weimi/index/getPhoneCode
    //         "http://192.168.1.194:8003/weimioffice/login/bindWallet",
    //         qs.stringify({
    //           walletAddress: this.haxi2,
    //           hash: this.haxi,
    //           // 加密
    //           userId: localStorage.getItem("userId"),
    //         }),
    //         { headers: { token: localStorage.getItem("token") } }
    //       )
    //       .then((res) => {
    //         console.log(res);
    //         if (res.data.code == 200) {
    //           if (this.$i18n.locale == "cn") {
    //             this.$message.success(res.data.result);
    //             this.$store.commit("fastokenHide");
    //             // this.tel = "";
    //             // this.password = "";
    //             // this.confirmpassword = "";
    //             // this.yanzheng = "";
    //           }
    //           if (this.$i18n.locale == "en") {
    //             this.$message.success(res.data.result);
    //             this.$store.commit("fastokenHide");
    //             // this.tel = "";
    //             // this.password = "";
    //             // this.confirmpassword = "";
    //             // this.yanzheng = "";
    //           }
    //         } else {
    //           this.$message.error(res.data.result);
    //           //   if (this.$i18n.locale == "cn") {
    //           //     this.$message.error("修改失败");
    //           //   }
    //           //   if (this.$i18n.locale == "en") {
    //           //     this.$message.error("fail to edit");
    //           //   }
    //         }
    //       });
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.fastoken_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  line-height: 20px;
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

input[type="checkbox"] {
  cursor: pointer;
  position: relative;
  width: 15px;
  height: 15px;
  font-size: 14px;
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
.movename2 {
  animation: move 0.5s linear;
  animation-fill-mode: forwards;
}
.blue2 {
  border: 1px solid #009fcd !important;
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
  top: 0;
  left: 0;
  .dengluzhuce {
    width: 400px;
    height: 440px;
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
    .haxi {
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
      .submit {
        width: 318px;
         height: 45px;
        line-height: 45px;
        background:GRAY;
        border-radius: 10px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin: 0 auto;
        margin: 30px auto 0;
        font-size: 16px;
        padding-left: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>
