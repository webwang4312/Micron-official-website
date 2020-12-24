<template>
  <div class="votenumber">
    <van-popup v-model="$store.state.votenumberstate">
      <div class="votenumber_header">
        <div class="line"></div>
        <span class="vote_vote">投票</span>
        <img
          src="@assets/images/detail/组 372 (1).png"
          @click="votenumberstate"
        />
      </div>

      <input type="text" placeholder="投票数量" v-model="numberconfirm" />
      <div class="votenumber_footer">
        <img src="../../assets/images/detail/组 370.png" alt="" />
        <div>投票数量1000票起投，上不封顶，请保证钱包中UENC 数量充足</div>
      </div>
      <button @click="numberConfirm" v-preventClick>确认</button></van-popup
    >
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
      show: true,
    };
  },
  computed: {},
  created() {
    // console.log(this.$store.state.votenumber);
    // console.log(localStorage.getItem("activityId"));
    // console.log(localStorage.getItem("toupiaostate"));
  },
  mounted() {},
  methods: {
    votenumberstate() {
      this.$store.commit("voteNumber");
    },
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
      // alert("toupiao");
      // console.log(localStorage.getItem("activityId"));
      // console.log(localStorage.getItem("toupiaostate"));
      if (!localStorage.getItem("token")) {
        this.$message.error("请先登录账号或注册");
      } else {
        if (
          this.numberconfirm == "" ||
          !/(^[1-9]\d*$)/.test(this.numberconfirm)
        ) {
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

<style lang="less">
.votenumber {
  .votenumber_header {
    width: 315px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    margin: 0 auto;
    .vote_vote {
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 22px;
      color: #ffffff;
      opacity: 1;
      background: rgba(30, 30, 30, 1);
      position: relative;
      left: -120px;
    }
    .line {
      width: 3px;
      height: 16px;
      background: #009fcd;
      opacity: 1;
      border-radius: 3px;
    }
    img {
      width: 20.83px;
      height: 20.83px;
    }
  }
  .votenumber_footer {
    width: 315px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding-top: 10px;
    img {
      width: 14px;
      height: 14px;
    }
    div {
      width: 296px;
      height: 38px;
      font-size: 12px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 21px;
      color: #ffffff;
      opacity: 1;
    }
  }
}
.van-popup {
  width: 345px;
  height: 260px;
  background: rgba(30, 30, 30, 1);

  input {
    width: 315px;
    height: 40px;
    background: #0c0c0c;
    border: 1px solid #666666;
    opacity: 1;
    border-radius: 5px;
    padding-left: 10px;
    margin-top: 20px;
    margin-left: 15px;
    color: white;
  }
  button {
    width: 315px;
    height: 40px;
    background: #666666;
    opacity: 1;
    border-radius: 5px;
    font-size: 16px;
    font-family: "苹方-简";
    font-weight: normal;
    line-height: 27px;
    color: #ffffff;
    opacity: 1;
    outline: none;
    border: none;
    margin-left: 15px;
    margin-top: 50px;
  }
  button:hover {
    background: deepskyblue;
  }
}
</style>
