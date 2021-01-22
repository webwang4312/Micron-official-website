<template>
  <div class="index">
    <slider></slider>
    <!-- <canvas id="canvas" style="background:white"></canvas> -->
    <div>
      <div class="indexheader" @click="showSliderFalse">
        <p>{{ $t("recommendtitle[0]") }}</p>
        <button @click="learnmore">
          <span>{{ $t("learnmore[0]") }}</span>
        </button>
      </div>
      <!-- 视频简介 -->
      <div class="video" @click="showSliderFalse">
        <p>{{ $t("video[0]") }}</p>
        <div class="videoline"></div>
        <p class="jieshao">
          {{ $t("videotitle[0]") }}
        </p>
        <div id="videoz">
          <video
            v-if="!$store.state.slidershow"
            id="videol"
            width="315"
            height="195"
            style="object-fit: fill;"
            controls
            @click="playvideo1"
            webkit-playsinline="true"
            x5-video-player-type="h5"
            x5-video-orientation="portraint"
            poster="../assets/images/index/video1.png"
          >
            <source :src="videosource[0].src" type="video/mp4" />
          </video>
          <img
            src="../assets/images/index/video1.png"
            alt=""
            v-if="$store.state.slidershow"
            style="width:315px;height:195px"
          />
        </div>
        <div class="clear"></div>
      </div>
      <!-- 项目成果 -->
      <div class="project" @click="showSliderFalse">
        <p>{{ $t("project[0]") }}</p>
        <div class="projectline"></div>
        <ul class="project-content">
          <div>
            <li>
              <img src="@assets/images/index/height.png" alt />
              <br />
              <p>{{ columndata[0] }}</p>
              <br />
              <p>{{ $t("height[0]") }}</p>
            </li>
            <li>
              <img src="@assets/images/index/number.png" alt />
              <br />
              <p>{{ columndata[1] }}</p>
              <br />
              <p>{{ $t("number[0]") }}</p>
            </li>
          </div>
          <div>
            <li class="padleft">
              <img src="@assets/images/index/reward.png" alt />
              <br />
              <p>{{ columndata[2] }}</p>
              <br />
              <p>{{ $t("jiangli[0]") }}</p>
            </li>
            <li class="padleft">
              <img src="@assets/images/index/sum.png" alt />
              <br />
              <p>{{ columndata[3] }}</p>
              <br />
              <p>{{ $t("sum[0]") }}</p>
            </li>
          </div>
        </ul>
      </div>
      <!-- 媒体公告 -->
      <div class="media" @click="showSliderFalse">
        <p class="mediatitle">{{ $t("Mediaannouncement[0]") }}</p>
        <div class="medialine"></div>
        <ul>
          <li @click="route0(recommendlist[0].content_id)">
            <div>
              <img src="../assets/images/index/p1.png" />
            </div>
            <div>
              <p class="newstitle">{{ recommendlist[0].title }}</p>
              <p class="newscontent">
                {{ recommendlist[0].description }}
              </p>
            </div>
          </li>
          <li @click="route1(recommendlist[1].content_id)">
            <div>
              <img src="../assets/images/index/p2.png" />
            </div>
            <div>
              <p class="newstitle">{{ recommendlist[1].title }}</p>
              <p class="newscontent">
                {{ recommendlist[1].description }}
              </p>
            </div>
          </li>
          <li @click="route2(recommendlist[2].content_id)">
            <div>
              <img src="../assets/images/index/p1.png" />
            </div>
            <div>
              <p class="newstitle">{{ recommendlist[2].title }}</p>
              <p class="newscontent">
                {{ recommendlist[2].description }}
              </p>
            </div>
          </li>
        </ul>
        <div class="learn-more">
          <span class="learnmore" @click="gotodetail">{{
            $t("learnmore[0]")
          }}</span
          ><img src="../assets/images/index/组 224.png" class="righticon" />
        </div>
      </div>
      <div class="contact" @click="showSliderFalse">
        <p class="contacttitle">{{ $t("contactus[0]") }}</p>
        <div class="contactline"></div>
        <div class="contactcontent">
          <p>{{ $t("contactcontent[0]") }}</p>
          <br />
          <p>{{ $t("contactcontent[1]") }}</p>
          <br />
          <p>{{ $t("contactcontent[2]") }}</p>
        </div>
        <!-- 联系我们右侧 -->
        <div class="contact-right" @click="showSliderFalse">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="name">
              <el-input
                v-model="ruleForm.name"
                :placeholder="rules.name.message"
              ></el-input>
            </el-form-item>

            <el-form-item prop="phone">
              <el-input
                v-model.number="ruleForm.phone"
                :placeholder="rules.phone.message"
              ></el-input>
            </el-form-item>

            <el-form-item prop="email">
              <el-input
                v-model="ruleForm.email"
                :placeholder="rules.email.message"
              ></el-input>
            </el-form-item>
            <el-form-item prop="advice">
              <el-input
                type="textarea"
                rows="2"
                v-model="ruleForm.advice"
                :placeholder="rules.advice.message"
                id="question"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <img
                src="../assets/images/index/gou.png"
                style="position:relative;left:437px;top:-21px;z-index:30"
                v-show="!submits"
                class="submit"
              /> -->

              <el-button @click="submitForm()" v-if="submits">{{
                $t("submit[0]")
              }}</el-button>
              <el-button
                @click="submitForm()"
                :class="{ success: !submits }"
                v-else
                id="submit"
                ><span>{{ $t("submit[1]") }}</span></el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>

      <v-footer></v-footer>
    </div>
  </div>
</template>
<script>
import { BASEURL } from "@api/api";
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
import Qs from "qs";
import {
  zhCN,
  country,
  password,
  namechecked,
  email,
  advice,
} from "../assets/rule.js";
export default {
  name: "index",
  data() {
    // 昵称验证
    var namecheck = (rule, value, callback) => {
      if (!namechecked.test(value)) {
        if (this.$i18n.locale == "en") {
          callback(
            new Error(
              "Cannot contain special characters, emoticons, within 10 characters"
            )
          );
        } else if (this.$i18n.locale == "cn") {
          callback(new Error("不能包含特殊字符、表情,10个字符以内"));
        }
        this.ruleForm.name = "";
      }
    };
    // email
    var emailcheck = (rule, value, callback) => {
      if (!email.test(value)) {
        if (this.$i18n.locale == "en") {
          callback(new Error("Email address entered incorrectly"));
        } else if (this.$i18n.locale == "cn") {
          callback(new Error("邮箱地址输入错误"));
        }
        this.ruleForm.email = "";
      }
    };
    // advice
    var advicecheck = (rule, value, callback) => {
      if (!advice.test(value)) {
        if (this.$i18n.locale == "en") {
          callback(
            new Error("At least one character in length, no special characters")
          );
        } else if (this.$i18n.locale == "cn") {
          callback(new Error("长度至少为一个字符,不包含特殊字符"));
        }
        this.ruleForm.advice = "";
      }
    };
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        if (this.nowLang == "cn") {
          return callback(new Error("手机号不能为空"));
        } else {
          return callback(new Error("Phone number cannot be empty"));
        }
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          if (this.nowLang == "cn") {
            callback(new Error("请输入数字值"));
          } else {
            return callback(new Error("Phone number cannot be empty"));
          }
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            if (this.nowLang == "cn") {
              callback(new Error("号码格式不正确"));
            } else {
              return callback(new Error("Incorrect number format"));
            }
          }
        }
      }, 100);
    };
    return {
      videoshow: true,
      nowLang: "en",

      showDetail: false,
      short: true,
      sticky: false,
      startstop: true,
      show: false,
      fullscreenLoading: false,

      // 提交成功
      submits: true,
      nowLang: "",
      showfooter: false,
      showmedia: false,
      showus: false,
      // 柱状数据
      columndata: [],
      columndata1: "",
      columndata2: "",
      columndata3: "",
      columndata4: "",
      // 表单验证规则
      ruleForm: {
        name: "",
        phone: "",
        email: "",
        advice: "",
      },
      rules: {
        name: [{ validator: namecheck, trigger: "blur" }],
        phone: [
          {
            message: "",
            validator: checkPhone,
            trigger: "blur",
          },
        ],
        email: [{ validator: emailcheck, trigger: "blur" }],
        advice: [{ validator: advicecheck, message: "", trigger: "blur" }],
      },
      // 媒体推荐位信息
      recommendlist: [{ title: "" }, { title: "" }, { title: "" }],
      indexNumTop: "",
      scrollTop: "",
      description1: "",
      videoUrl: "",
      videosource: [{ src: "" }],
    };
  },
  components: { slider, vFooter },

  created() {
    window.scrollTo(0, 0);
    this.nowLang = this.$i18n.locale;
    // console.log(this.nowLang);
    // this.getSession();
    // 视频语言的切换
    if (this.nowLang == "cn") {
      this.videosource[0].src =
        "https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4";
      this.rules.name.message = "请输入您的名字";
      this.rules.phone.message = "请输入您的手机号";
      this.rules.email.message = "请输入您的邮箱地址";
      this.rules.advice.message = "请输入您的问题";
    } else {
      this.videosource[0].src = "https://www.uenc.io/video/yingwen.mp4";
      this.rules.name.message = "Please enter your name";
      this.rules.phone.message = "Please enter your phone number";
      this.rules.email.message = "Please enter your e-mail address";
      this.rules.advice.message = "Please enter your question";
    }
     // 请求首页数据
    // this.getIndex();
    this.getHomeData();
    // 请求媒体公告数据
    this.getindexrecommend();
  },
  computed: {},
  mounted() {
   
  },

  methods: {
//     initCanvas() {
// console.log("初始化canvas")
// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext('2d');
// ctx.beginPath();
// ctx.strokeStyle = "red";
// ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
// ctx.moveTo(110, 75);
// ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
// ctx.moveTo(65, 65);
// ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
// ctx.moveTo(95, 65);
// ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
// ctx.stroke();
// ctx.beginPath();
// ctx.strokeStyle = "red";
// ctx.moveTo(160, 20);
// ctx.lineTo(160, 120);
// ctx.lineTo(260, 120);
// ctx.bezierCurveTo(100, 100, 200, 40, 250, 120);
// // 登录状态下不会出现这行文字，点击页面右上角一键登录
// ctx.lineTo(260,20);
// ctx.stroke();
// ctx.fillRect(150, 10, 50, 50);
// ctx.strokeStyle = "red";
// ctx.fillStyle = "rgba(0,0,0,1)";
// // 登录状态下不会出现这行文字，点击页面右上角一键登录
// },
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCengHide");
    },

    playvideo1() {
      var myVideo1 = document.getElementById("videol");
      if (myVideo1.paused) {
        myVideo1.play();
        if (myVideo1.requestFullscreen) {
          myVideo1.requestFullscreen();
        } else if (myVideo1.mozRequestFullScreen) {
          myVideo1.mozRequestFullScreen();
        } else if (myVideo1.webkitRequestFullScreen) {
          myVideo1.webkitRequestFullScreen();
        }
      } else {
        myVideo1.pause();
      }
    },

    gotodetail() {
      this.$router.push({
        path: "/news",
        query: {},
      });
    },

    learnmore() {
      window.open(
        "https://mp.weixin.qq.com/s?__biz=MzUyMTU1NTY5Ng==&mid=2247484931&idx=1&sn=91dcaddee98c13e6c06725a304eb6fcd&chksm=f9d81d9cceaf948aad420aa22b7bc463e3f629e862696eb3e574ca56b4be7a523b68daabf8c3&mpshare=1&scene=1&srcid=07154gMhIKKtwTlrNgO6u9iZ&sharer_sharetime=1594800298815&sharer_shareid=075076a15a657862690d0180ddb3903f&key=e48de8bee8a80c9c5acebe13a30a042386a606043989167fede9e01ef2b1a9415d95d233bf220f6c74bb387526f2c4397803eb414a57612896359a9275f10e286393070d00d2f5d150a57d432748cc42&ascene=1&uin=MjE4Nzc3NzkwMg%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AQUOr446KM5J603N%2FtWmTJc%3D&pass_ticket=qfyOfhiRNshvZQdp%2FSYKDgWCwXETPSmHaPLiir7tnGPbWXehR9Qoa4OTwWK1Mxg1"
      );
    },
    route0(id, content, title, updatedate, thumb, description) {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: id,
          content: content,
          title: title,
          updatedate: updatedate,
          thumb: thumb,
          description: description,
        },
      });
    },
    route1(id, content, title, updatedate, thumb, description) {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: id,
          content: content,
          title: title,
          updatedate: updatedate,
          thumb: thumb,
          description: description,
        },
      });
    },
    route2(id, content, title, updatedate, thumb, description) {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: id,
          content: content,
          title: title,
          updatedate: updatedate,
          thumb: thumb,
          description: description,
        },
      });
    },
    change() {
      this.submits = true;
    },
    change2() {
      this.submits = false;
    },
    // 提交建议
    submitForm() {
      let that = this;
      var data = Qs.stringify({
        nickname: this.ruleForm.name,
        phone: this.ruleForm.phone,
        email: this.ruleForm.email,
        content: this.ruleForm.advice,
      });
      // form表单设置不能为空
      if (
        this.ruleForm.name == "" ||
        this.ruleForm.phone == "" ||
        this.ruleForm.email == "" ||
        this.ruleForm.advice == ""
      ) {
        if (this.nowLang == "cn") {
          alert("请输入有效信息");
        } else {
          alert("Please enter valid information");
        }
      } else {
        that.$http
          .post(`${BASEURL}` + "/weimioffice/web/content/callback", data, {
            headers: { language: this.nowLang },
          })
          .then((res) => {
            //console.log(res);
            if (res.data.code == 200) {
              setTimeout(this.change2, 0);
              setTimeout(this.change, 5000);
              (this.ruleForm.name = ""),
                (this.ruleForm.phone = ""),
                (this.ruleForm.email = ""),
                (this.ruleForm.advice = "");
            }
          });
      }
    },
    // http://47.100.227.125:8003
    // 获得区块高度数值
    async getHomeData() {
      let that = this;
      that.$http
        .get(`${BASEURL}` + "/weimioffice/web/content/getHomeData", {
          params: {},
          headers: {},
        })
        .then((res) => {
          //  console.log(res);
          if (res.data.code !== 200) {
            return false;
          } else {
            this.columndata = res.data.result;
          }
          localStorage.setItem("lan", this.nowLang);
        });
    },
    //获取媒体公告数据
    async getindexrecommend() {
      let that = this;
      await that.$http
        .get(`${BASEURL}` + "/weimioffice/web/content/getRecommend", {
          params: {},
          headers: { language: this.nowLang },
        })
        .then((res) => {
          //  console.log(res);
          if (res.data.code !== 200) {
            return false;
          } else {
            that.recommendlist = res.data.result;
            // console.log(that.recommendlist);
            for (var i = 0; i < that.recommendlist.length; i++) {
              if (this.nowLang == "en") {
                if (that.recommendlist[i].title.length > 15) {
                  that.recommendlist[i].title =
                    that.recommendlist[i].title.substring(0, 25) + "...";
                }
                if (that.recommendlist[0].description.length > 80) {
                  that.recommendlist[0].description =
                    that.recommendlist[0].description.substring(0, 80) + "...";
                } else {
                  that.recommendlist[0].description =
                    that.recommendlist[0].description;
                }
                if (that.recommendlist[1].description.length > 80) {
                  that.recommendlist[1].description =
                    that.recommendlist[1].description.substring(0, 80) + "...";
                } else {
                  that.recommendlist[1].description =
                    that.recommendlist[1].description;
                }
                if (that.recommendlist[2].description.length > 80) {
                  that.recommendlist[2].description =
                    that.recommendlist[2].description.substring(0, 80) + "...";
                } else {
                  that.recommendlist[2].description =
                    that.recommendlist[2].description;
                }
              }
              if (this.nowLang == "cn") {
                if (that.recommendlist[i].title.length > 1) {
                  that.recommendlist[i].title =
                    that.recommendlist[i].title.substring(0, 15) + "...";
                }
                if (that.recommendlist[0].description.length > 45) {
                  that.recommendlist[0].description =
                    that.recommendlist[0].description.substring(0, 45) + "...";
                } else {
                  that.recommendlist[0].description =
                    that.recommendlist[0].description;
                }
                if (that.recommendlist[1].description.length > 45) {
                  that.recommendlist[1].description =
                    that.recommendlist[1].description.substring(0, 45) + "...";
                } else {
                  that.recommendlist[1].description =
                    that.recommendlist[1].description;
                }
                if (that.recommendlist[2].description.length > 45) {
                  that.recommendlist[2].description =
                    that.recommendlist[2].description.substring(0, 45) + "...";
                } else {
                  that.recommendlist[2].description =
                    that.recommendlist[2].description;
                }
              }
            }
          }
          localStorage.setItem("lan", this.nowLang);
        });
    },

    gotoshow() {
      this.showfooter = true;
    },
    gotohide() {
      this.showfooter = false;
    },
  },
};
</script>
<style lang="less">
.clear {
  clear: both;
  height: 0;
  line-height: 0;
  font-size: 0;
}
.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5 !important;
}
#submit {
  background-color: green;
}
.index {
  width: 100%;
  height: auto;
  background: rgba(0, 0, 0, 1);
  .indexheader {
    position: relative;
    top: 0px;
    width: 100%;
    height: 244px;
    background: url("../assets/images/index/indexbg.png") no-repeat center/100%
      100%;
    p {
      width: 130px;
      height: 79px;
      font-size: 18px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 0.7;
      position: absolute;
      left: 50px;
      top: 50px;
    }
    button {
      width: 78px;
      height: 30px;
      background: rgba(0, 159, 205, 1);
      opacity: 1;
      border-radius: 5px;
      border: none;
      outline: none;
      position: absolute;
      left: 50px;
      top: 144px;
      span {
        width: 48px;
        height: 17px;
        font-size: 12px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }
    }
  }
  // 视频
  #videoz {
    position: absolute;
    width: 315px;
    height: 195px !important;
    top: 161px;
    margin: 0 auto;
  }
  .video {
    position: relative;
    width: 100%;
    height: 406px;
    background: #313131;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    p:nth-child(1) {
      // position: absolute;
      // left: 0px;
      top: 50px;
      text-align: center;
      margin: 0 auto;
    }
    p {
      height: 22px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      position: absolute;
      // left: 133px;
      top: 50px;
    }
    .videoline {
      width: 60px;
      height: 2px;
      background:  rgba(0, 159, 205, 1);
   margin: 0 auto;
      position: absolute;
      //  left: 158px;
      top: 82px;
    }
    .jieshao {
      width: 231px;
      height: 44px;
      font-size: 10px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 15px;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      top: 102px;
    }

    #videol {
    }
  }
  // 项目成果
  .project {
    width: 100%;
    height: 364px;
    position: relative;
    background-color: #0c0c0c;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    p:nth-child(1) {
      margin: 0 auto;
      text-align: center;
      height: 22px;
      position: absolute;
      top: 50px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
    }
    .projectline {
      width: 60px;
      height: 2px;
      background:  rgba(0, 159, 205, 1);
   margin: 0 auto;
      position: absolute;
      top: 82px;
    
    }
    .project-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // flex-wrap: wrap;
      position: absolute;
      top: 92px;
      .padleft {
        margin-left: 10px !important;
      }
      li {
        width: 168px;
        height: 101px;
        position: relative;
        background: rgba(51, 51, 51, 1);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        opacity: 1;
        border-radius: 5px;

        margin-top: 10px;
        img {
          width: 35px;
          height: 35px;
          position: relative;
          left: 11px;
          top: 15px;
        }
        p:nth-child(3) {
          position: absolute;
          left: 15px;
          top: 50px;
          font-size: 18px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 16px;
          color: rgba(0, 159, 205, 1);
          opacity: 1;
        }
        p:nth-child(5) {
          position: absolute;
          left: 15px;
          font-size: 10px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 16px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
      }
    }
  }
  //媒体公告
  .media {
    width: 100%;
    height: 450px;
    background: #181818;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .mediatitle {
      position: absolute;
      top: 30px;
      text-align: center;
    }
    p:nth-child(1) {
      position: absolute;
      top: 50px;
      width: 100%;
      height: 22px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    .medialine {
      position: absolute;
      top: 82px;
      width: 60px;
     height: 2px;
      background:  rgba(0, 159, 205, 1);
   margin: 0 auto;
    }
    ul {
      position: absolute;
      width: 345px;
      top: 97px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 0 auto;
      li:nth-child(1) {
        margin-top: 0px;
        position: absolute;
        top: 0px;
        height: 81px;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
      }
      li:nth-child(2) {
        position: absolute;

        top: 91px;
        height: 81px;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
      }
      li:nth-child(3) {
        position: absolute;
        top: 182px;
        height: 81px;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
      }
      li {
        .newstitle {
          position: relative;
          width: 195px;
          left: 10px;
          top: 0px;
          font-size: 14px !important;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 15px;
          color: rgba(0, 159, 205, 1);
          opacity: 1;
        }
        .newscontent {
          position: relative;
          width: 195px;
          left: 10px;
          font-size: 12px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 15px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
        img {
          width: 140px;
          height: 81px;
          background: rgba(255, 255, 255, 1);
          border-radius: 5px;
        }
      }
    }
    .learn-more {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 auto;
      position: absolute;
      top: 390px;
    }
    .learnmore {
      font-size: 14px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 15px;
      color: rgba(0, 159, 205, 1);
    }
    .righticon {
      position: relative;
      left: 4px;
      top: 4px;
      line-height: 11.41px;
      width: 6.41px;
      height: 11.41px;
    }
  }
  // 联系我们
  .contact {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 701px;
    background-color: #0c0c0c;
    .contacttitle {
      position: absolute;
      width: 100%;
      text-align: center;

      top: 50px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    .contactline {
      position: absolute;

      top: 82px;
      width: 60px;
      height: 2px;
      background:  rgba(0, 159, 205, 1);
   margin: 0 auto;
    }
    .contactcontent {
      position: absolute;

      top: 97px;
      text-align: center;
      width: 295px;
      height: 104px;
      font-size: 10px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 15px;
      color: rgba(255, 255, 255, 1);
    }
    .contact-right {
      position: absolute;
      top: 251px;
      .el-form-item {
        width: 345px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 5px;
        margin: 0 auto;
        margin-bottom: 30px;
        border: none;
        outline: none;
        .el-button {
          width: 100px;
          height: 30px;
          position: relative;
          text-align: center;
          top: 90px;
          background: rgba(0, 159, 205, 1);
          border-radius: 5px;
          font-size: 12px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 3px;
          color: rgba(255, 255, 255, 1);
          border: none;
          outline: none;
          margin-left: 35%;
        }
        #question {
          width: 345px;
          height: 140px;
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          outline: none;
          color: white;
          opacity: 0.5;
        }
        #question:focus {
          border: 2px solid #009fcd;
        }
        .el-input__inner {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          outline: none;
        }
        .el-input input {
          font-size: 14px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 15px;
          color: rgba(255, 255, 255, 1);
          opacity: 0.5;
        }
        input:focus {
          border: 2px solid #009fcd;
        }
      }
    }
  }
}
</style>
