<template>
  <div class="forgetpassword">
    <slider></slider>
    <div class="dengluzhuce">
      <div class="forget_content">
        <!-- 姓名 -->

        <div class="name">
          <label :class="{ movename: showname }"> 姓名</label>
          <input
            type="text"
            v-model="name"
            @focus="nameFocus"
            @blur="nameBlur"
            class="button"
          />
        </div>

        <!-- 标题 -->
        <div class="title">
          <label :class="{ movename: showtitle }"> 标题</label>
          <input
            type="text"
            v-model="title"
            @focus="titleFocus"
            @blur="titleBlur"
            class="button"
          />
        </div>
        <!-- 摘要 -->
        <div class="summary">
          <label :class="{ movename: showsummary }"> 摘要</label>
          <textarea
            v-model="summary"
            @focus="summaryFocus"
            @blur="summaryBlur"
            class="button"
          ></textarea>
        </div>
        <!-- 目标 -->
        <div class="target">
          <label :class="{ movename: showtarget }"> 目标</label>
          <input
            type="text"
            v-model="target"
            @focus="targetFocus"
            @blur="targetBlur"
            class="button"
          />
        </div>
        <!-- 计划 -->
        <div class="plan">
          <label :class="{ movename: showplan }"> 计划</label>
          <input
            type="text"
            v-model="plan"
            @focus="planFocus"
            @blur="planBlur"
            class="button"
          />
        </div>
        <!-- 预算 -->
        <div class="budget">
          <label :class="{ movename: showbudget }">
            预算
          </label>
          <input
            type="text"
            v-model="budget"
            @focus="budgetFocus"
            @blur="budgetBlur"
            class="button"
          />
        </div>
        <div class="but_zong">
          <button class="submit" @click="confirm" v-preventClick >
            确认发布
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
export default {
  data() {
    return {
      name: "",
      userId: "",
      title: "",
      summary: "",
      target: "",
      plan: "",
      budget: "",
      showname: false,
      showtitle: false,
      showsummary: false,
      showtarget: false,
      showplan: false,
      showbudget: false,
    };
  },
  computed: {},
  components: { slider },
  created() {
    if (!localStorage.getItem("token")) {
        this.$message.error("请先登录您的账号信息");
       this.$router.push({
         path:'/index'
       })
      } 
  },

  mounted() {},

  methods: {
    // 姓名
    nameFocus() {
      this.showname = true;
    },
    nameBlur() {
      if (this.name == "") {
        this.showname = false;
        // this.blue1 = false;
        if (this.$i18n.locale == "cn") {
          this.$message.error("姓名不能为空");
          this.name = "";
        }
      } else {
        this.showname = true;
      }
    },
    // 标题
    titleFocus() {
      this.showtitle = true;
    },
    titleBlur() {
      if (this.title == "") {
        this.showtitle = false;
      } else {
        this.showtitle = true;
      }
    },
    // 摘要
    summaryFocus() {
      this.showsummary = true;
      window.scrollTo(0,50)
    },
    summaryBlur() {
      if (this.summary == "") {
        this.showsummary = false;
      } else {
        this.showsummary = true;
      }
    },
    // 目标
    targetFocus() {
      this.showtarget = true;
    },
    targetBlur() {
      if (this.target == "") {
        this.showtarget = false;
      } else {
        this.showtarget = true;
      }
    },
    // 计划
    planFocus() {
      this.showplan = true;
    },
    planBlur() {
      if (this.plan == "") {
        this.showplan = false;
      } else {
        this.showplan = true;
      }
    },
    // 预算
    budgetFocus() {
      this.showbudget = true;
    },
    budgetBlur() {
      if (this.budget == "") {
        this.showbudget = false;
      } else {
        this.showbudget = true;
      }
    },
    confirm() {
      // console.log("11");
      if (
        this.name == "" ||
        this.title == "" ||
        this.summary == "" ||
        this.target == "" ||
        this.plan == "" ||
        this.budget == ""
      ) {
        this.$message.error("请填写完整信息");
      } else {
        this.$http
          .post(
            `${BASEURL}`+"/weimioffice/vote/addMotion",
            qs.stringify({
              name: this.name,
              userId: localStorage.getItem("userId"),
              title: this.title,
              summary: this.summary,
              target: this.target,
              plan: this.plan,
              budget: this.budget,
            }),
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.result);
              this.name = "";
              this.title = "";
              this.summary = "";
              this.target = "";
              this.plan = "";
              this.budget = "";
              this.reload();
            } else {
              this.$message.error(res.data.result);
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
  font-size: 14px !important;
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

@keyframes move {
  from {
    position: relative;
    top: 40px;
  }
  to {
    position: relative;
    top: 10px;
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
  height: 698px;
  background: #131313;
  .dengluzhuce {
    .name {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 45px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 15px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .title {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      line-height: 25px;
      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 45px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 16px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
      .yanzheng_button {
        position: relative;
        font-size: 14px;
        left: 240px;
        top: -34px;
        color: #009fcd;
        width: 100px;
        cursor: pointer;
      }
    }
    .summary {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
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
      textarea {
        width: 318px;
        height: 150px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 15px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
        resize: none;
      }
    }
    .target {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 42px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 15px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .plan {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 42px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 15px;
        position: relative;
        padding-left: 15px;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .budget {
      width: 318px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      label {
        font-size: 14px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 13px;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
        top: 42px;
        left: 15px;
      }
      input {
        width: 318px;
        height: 45px;
        background: #333333;
        border: 1px solid #656565;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 15px;
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
        height: 45px;
        border-radius: 10px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin: 0 auto;
        margin: 30px auto 0;
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
