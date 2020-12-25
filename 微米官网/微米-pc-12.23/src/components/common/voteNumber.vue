<template>
  <div class="votenumber">
    <div id="voterejectnumber" v-if="$store.state.votenumber">
      <img
        src="@assets/images/detail/组 3.png"
        @click="voteReject1"
        class="quxiao"
      />
      <div class="vote">投票</div>
      <div class="line"></div>
      <input
        type="text"
        placeholder="投票数量"
        v-model="numberconfirm"
       
      />
      <div>
        <img src="@assets/images/detail/组 2.png" class="icon" />
        <span class="title"
          >投票数量1000票起投，上不封顶，请保证钱包中UENC 数量充足</span
        >
      </div>
      <button @click="numberConfirm" v-preventClick>确认</button>
    </div>
  </div>
</template>

<script>
import {BASEURL} from '@api/api';
var qs = require("qs");
import crypto from "crypto";
export default {
  inject: ["reload"],
  data() {
    return {
      voterejectnumber1: false,
      numberconfirm: "",
    };
  },
  computed: {},
  created() {
    // console.log(localStorage.getItem("activityId"));
    // console.log(localStorage.getItem("toupiaostate"));
  },
  mounted() {},
  methods: {
    numberconfirmblur() {
      if (this.numberconfirm == "") {
        this.$message.error("请输入正整数");
      }
      if (!/(^[1-9]\d*$)/.test(this.numberconfirm)) {
        this.$message.error("请输入正整数");
        this.numberconfirm = "";
      } else {
      }
    },
    voteReject1() {
      this.$store.commit("voteNumber");
    },
    // 反对
    reject() {
      // console.log("reject");
      // console.log(this.numberconfirm);
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/put",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: localStorage.getItem("activityId"),
            amount: Number(this.numberconfirm),
            isPass: 0,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.numberconfirm = "";
            this.$message.success(res.data.result);
            this.$store.commit("voteNumber");
            this.reload();
          } else {
            this.$message.error(res.data.result);
            this.numberconfirm = "";
          }
        });
    },
    agree() {
      // console.log("agree");
      // console.log(this.numberconfirm);
      this.$http
        .post(
          // 测试上
          //47.105.215.191/weimi/index/getPhoneCode
          `${BASEURL}`+"/weimioffice/vote/put",
          qs.stringify({
            userId: localStorage.getItem("userId"),
            activityId: localStorage.getItem("activityId"),
            amount: Number(this.numberconfirm),
            isPass: 1,
          }),
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.numberconfirm = "";
            this.$message.success(res.data.result);

            this.$store.commit("voteNumber");
            this.reload();
          } else {
            this.$message.error(res.data.result);
            this.numberconfirm = "";
          }
        });
    },
    // 赞成
    numberConfirm() {
      // console.log("toupiao");
      // console.log(localStorage.getItem("activityId"));
      // console.log(localStorage.getItem("toupiaostate"));
      if (!localStorage.getItem("token")) {
        this.$message.error("请先登录账号或注册");
      } else {
        if (this.numberconfirm == "") {
          this.$message.error("请输入正整数");
        }
        if (!/(^[1-9]\d*$)/.test(this.numberconfirm)) {
          this.$message.error("请输入正整数");
          this.numberconfirm = "";
        } else {
          if (localStorage.getItem("toupiaostate") === "0") {
            this.reject();
          }
          if (localStorage.getItem("toupiaostate") === "1") {
            this.agree();
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#voterejectnumber {
  width: 400px;
  height: 500px;
  background: #141414;
  position: fixed;
  border-radius: 10px;
  z-index: 99999;
  top: 25%;
  left: 40%;
  .quxiao {
    position: absolute;
    left: 336px;
    top: 34px;
  }
  .vote {
    position: absolute;
    left: 40px;
    top: 65px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
  }
  .line {
    width: 320px;
    height: 1px;
    background: #ffffff;
    opacity: 0.1;
    position: absolute;
    left: 40px;
    top: 113px;
  }
  input {
    width: 318px;
    height: 45px;
    background: #333333;
    border: 1px solid #666666;
    border-radius: 10px;
    position: absolute;
    left: 41px;
    top: 174px;
    padding-left: 21px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  .icon {
    position: absolute;
    left: 47px;
    top: 237px;
  }
  .title {
    width: 288px;
    height: 30px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 18px;
    position: absolute;
    left: 68px;
    top: 239px;
  }
  button {
    width: 320px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;

    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    line-height: 24px;
    position: absolute;
    left: 40px;
    top: 395px;
  }
  button:hover {
    background: #009fcd !important;
  }
}
</style>
