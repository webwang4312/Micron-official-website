<template>
  <div class="index">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="polygon"
      :particleSize="1"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
    <!-- 内容部分 -->
    <headertop ref="headertop"></headertop>
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="container">
      <!-- 顶部栏 -->
      <div class="recommemd">
        <div class="recommend-title">{{ $t("recommendtitle[0]") }}</div>
        <!-- <div class="recommend-content">{{ $t("recommendshorttitle[0]") }}</div> -->
        <div class="learn-more" @click="learnmore">
          <p>{{ $t("learnmore[0]") }}</p>
          <div class="button-overflow">
            <div class="button-left"></div>
            <!-- <button>
            <p>了解更多</p>
            </button>-->
          </div>
        </div>
      </div>
      <!-- UENC视频简介 UENC项目成果 -->

      <div class="video-project">
        <!-- UENC视频简介 -->
        <div class="video" v-if="show">
          <div class="video-title">{{ $t("video[0]") }}</div>
          <div class="line"></div>
          <div class="video-detail">{{ $t("videotitle[0]") }}</div>
          <!--视频-->
          <div class="input_video">
            <video
              id="indexvideo"
              width="570"
              height="353"
              style="object-fit: fill;opacity:1;"
              loop
            >
              <source :src="videosource[0].src" type="video/mp4" />
            </video>
            <img
              src="../assets/images/about/play.png"
              @click="playvideo1()"
              v-if="startstop"
            />
            <img
              src="../assets/images/about/stop.png"
              v-else
              id="indexstop"
              @click="playvideo11()"
            />
          </div>
        </div>
        <!-- UENC项目成果 -->
        <div class="project" v-if="show">
          <div class="project-title">{{ $t("project[0]") }}</div>
          <div class="project-line"></div>
          <ul class="project-content">
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
            <li>
              <img src="@assets/images/index/reward.png" alt />
              <br />
              <p>{{ columndata[2] }}</p>
              <br />
              <p>{{ $t("jiangli[0]") }}</p>
            </li>
            <li>
              <img src="@assets/images/index/sum.png" alt />
              <br />
              <p>{{ columndata[3] }}</p>
              <br />
              <p>{{ $t("sum[0]") }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 媒体公告 -->
      <div class="media">
        <!-- 媒体公告左侧 -->
        <div class="media-left" v-if="showmedia">
          <div class="media-title">{{ $t("meidaannouncement[0]") }}</div>
          <div class="media-line"></div>
          <div class="quyu">
            <div class="media-title2" @click="route0()">
              {{ recommendlist[0].title }}
            </div>
            <div class="media-content">
              <p v-html="recommendlist[0].description"></p>
            </div>
            <div class="media-line-back"></div>
          </div>
        </div>
        <!-- 媒体公告右侧 -->

        <div class="media-right" v-if="showmedia">
          <ul>
            <li>
              <img src="../assets/images/index/p1.png" class="news-img" />
              <p class="news-title">{{ recommendlist[1].title }}</p>
              <div class="news-content">
                {{ recommendlist[1].description }}
              </div>
              <div class="icon" @click="route1()">
                <span>{{ $t("learnmore[0]") }}</span>
                <img src="@assets/images/index/jian.png" alt />
              </div>
            </li>
            <li>
              <img src="../assets/images/index/p2.png" alt class="news-img" />
              <p class="news-title">{{ recommendlist[2].title }}</p>
              <div class="news-content">
                {{ recommendlist[2].description }}
              </div>
              <div class="icon" @click="route2()">
                <span>{{ $t("learnmore[0]") }}</span>
                <img src="@assets/images/index/jian.png" alt />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 联系我们 -->
      <div class="contact">
        <!-- 联系我们左侧 -->
        <div class="contact-left" v-if="showus">
          <div class="contact-title">{{ $t("contactus[0]") }}</div>
          <div class="contact-line"></div>
          <div class="contact-right"></div>
          <div class="contact-content">
            {{ $t("contactcontent[0]") }}
            <br />
            <br />
            {{ $t("contactcontent[1]") }}

            {{ $t("contactcontent[2]") }}
            <!-- <br />
            {{ $t("contactcontent[0]") }} -->
          </div>
          <div class="phone"></div>
          <div class="email">{{ $t("email[0]") }}：csd3@uenc.net</div>
        </div>
        <!-- 联系我们右侧 -->
        <div class="contact-right" v-if="showus">
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
                v-model.number="ruleForm.advice"
                :placeholder="rules.advice.message"
                id="question"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <img
                src="../assets/images/index/gou.png"
                alt=""
                style="position:relative;left:450px;top:-21px;z-index:30"
                v-show="!submits"
                class="submit"
              />
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
      <!-- 底部 -->
    </div>
    <div class="indexuenc_foot">
      <div class="foot-top">
        <ul class="foot-box">
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img src="@assets/images/footer/github.png" @click="github" style="position:relative;left:10px" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box1">
              <div class="circle">
                <img
                  src="@assets/images/footer/telegram.png"
                  @click="telegram"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box2">
              <div class="circle">
                <img src="@assets/images/footer/twitter.png" @click="twitter" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box3">
              <div class="circle">
                <img
                  src="@assets/images/footer/facebook.png"
                  @click="facebook"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box5">
              <div class="circle">
                <img src="@assets/images/footer/weibo.png" @click="weibo" />
              </div>
            </div>
          </li>
          <li>
            <div class="foot-box4">
              <div
                class="circle"
                @mouseenter="gotoshow()"
                @mouseleave="gotohide()"
              >
                <img src="@assets/images/footer/erweima.png" />
              </div>
            </div>
          </li>
        </ul>
        <ul class="hovershow" v-if="showfooter">
          <img src="@assets/images/indexhover/juxing.png" class="imgshow" />
          <li class="club">
            <img src="@assets/images/indexhover/club.png" />
            <br />
            <span>Energy Club</span>
          </li>
          <li class="wallet">
            <img src="@assets/images/indexhover/wallet.png" />
            <br />
            <span>Fastoken</span>
          </li>
        </ul>
        <div class="component_index">
          <span class="neirong" @click="faqs">FAQ</span>
          <span>|</span>
          <span class="neirong" @click="about">{{ $t("about[0]") }}</span>
          <span>|</span>
          <span class="neirong" @click="news">{{
            $t("Mediaannouncement[0]")
          }}</span>
          <span>|</span>
          <span class="neirong" @click="partner">{{ $t("Partner[0]") }}</span>
        </div>
      </div>
      <div class="foot-zhong"></div>
      <footer>
        <p>{{ $t("shangbiao[0]") }}</p>
      </footer>
    </div>
  </div>
</template>
<script>
import { BASEURL } from "@api/api";
import headertop from "../components/common/header";
import Qs from "qs";
import {
  zhCN,
  country,
  password,
  namechecked,
  email,
  advice,
} from "../assets/rule.js";
// import {
//   GET,
//   GETINDEX,
//   GETRECOMMEND,
//   GETNEWS,
//   DOWNBAIPISHU,
// } from "@network/api/api";

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
          callback(new Error("At least one character in length"));
        } else if (this.$i18n.locale == "cn") {
          callback(new Error("长度至少为一个字符"));
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
      username: "",

      // 头部公共部分
      xianzhi: false,
      startstop: true,
      show: false,
      fullscreenLoading: false,
      cur: "",
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
  components: { headertop },
  created() {
    this.username = window.sessionStorage.getItem("username");
    // console.log(this.username);
    this.nowLang = this.$i18n.locale;
    //console.log(this.nowLang);
    // 视频语言的切换
    if (this.$i18n.locale == "cn") {
      this.videosource[0].src =
        "http://47.75.93.221/video/8db3eb0b75e94328a2304256012f98b6.mp4";
      this.rules.name.message = "请输入您的名字";
      this.rules.phone.message = "请输入您的手机号";
      this.rules.email.message = "请输入您的邮箱地址";
      this.rules.advice.message = "请输入您的问题";
    } else {
      this.videosource[0].src = "http://47.75.93.221/video/yingwen.mp4";
      this.rules.name.message = "Name";
      this.rules.phone.message = "Mobile no";
      this.rules.email.message = "Email address";
      this.rules.advice.message = "Details about your problem";
    }
    // 滚动设置
    window.addEventListener("scroll", this.getScroll);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  mounted() {
    // 请求首页数据
    // this.getIndex();
    this.getHomeData();
    // 请求媒体公告数据
    this.getindexrecommend();
    // 滚动设置
    window.addEventListener("scroll", this.getScroll);
  },
  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    indexDisplay() {
      if (this.$refs.headertop._data.iconshow) {
        this.$refs.headertop._data.iconshow = false;
      }
    },
    // 头部公共部分
    logins() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow");
    },
    register() {
      this.$store.dispatch("loginShow");
      this.$store.dispatch("numberShow2");
    },
    leavelogin() {
      // 清除缓存
      window.sessionStorage.clear();
      this.$store.dispatch("leavelogin");
    },
    gotochainexplor() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
    },
    playvideo1() {
      var indexvideo = document.getElementById("indexvideo");
      if (indexvideo.requestFullscreen) {
        indexvideo.requestFullscreen();
      } else if (indexvideo.mozRequestFullScreen) {
        indexvideo.mozRequestFullScreen();
      } else if (indexvideo.webkitRequestFullScreen) {
        indexvideo.webkitRequestFullScreen();
      }
      indexvideo.play();
      this.startstop = false;
    },
    playvideo11() {
      var indexvideo = document.getElementById("indexvideo");
      this.startstop = true;
      indexvideo.pause();
    },
    fullScreen() {
      const player = this.$refs.videoPlayer.player;
      player.requestFullscreen(); //调用全屏api方法
      player.isFullscreen(true);
      player.play();
    },
    onPlayerPlay(player) {
      this.full(player);
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    onPlayerFullScreenchange(player) {
      player.exitFullscreen(); //强制退出全屏，恢复正常大小
      this.videoDialogVisible = true;
    },
    learnmore() {
      window.open("http://www.uenc.io/#/detail?content_id=205");
    },
    route0() {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: this.recommendlist[0].content_id,
        },
      });
    },
    route1() {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: this.recommendlist[1].content_id,
        },
      });
    },
    route2() {
      this.$router.push({
        path: "/detail",
        query: {
          content_id: this.recommendlist[2].content_id,
        },
      });
    },
    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    about() {
      this.$router.push({
        path: "/about",
      });
    },
    news() {
      this.$router.push({
        path: "/news",
      });
    },
    partner() {
      this.$router.push({
        path: "/partner",
      });
    },
    change() {
      this.submits = true;
    },
    change2() {
      this.submits = false;
    },
    // http://47.100.227.125
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
        return false;
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 获得区块高度数值
    getHomeData() {
      let that = this;
      that.$http
        .get(`${BASEURL}` + "/weimioffice/web/content/getHomeData", {
          params: {},
          headers: {},
        })
        .then((res) => {
          if (res.data.code !== 200) {
            return false;
          } else {
            that.columndata = res.data.result;

            // this.columndata1 = Number(res.result[0])
            //   .toFixed(1)
            //   .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            // this.columndata2 = Number(res.result[1])
            //   .toFixed(1)
            //   .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            // this.columndata3 = Number(res.result[2])
            //   .toFixed(1)
            //   .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            // this.columndata4 = Number(res.result[3])
            //   .toFixed(1)
            //   .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取媒体公告数据
    getindexrecommend() {
      let that = this;
      that.$http
        .get(`${BASEURL}` + "/weimioffice/web/content/getRecommend", {
          params: {},
          headers: { language: this.nowLang },
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code !== 200) {
            return false;
          } else {
            that.recommendlist = res.data.result;
            if (that.recommendlist[0].description.length > 63) {
              that.recommendlist[0].description =
                that.recommendlist[0].description.substring(0, 62) + "...";
            } else {
              that.recommendlist[0].description =
                that.recommendlist[0].description;
            }
            if (that.recommendlist[1].description.length > 63) {
              that.recommendlist[1].description =
                that.recommendlist[1].description.substring(0, 62) + "...";
            } else {
              that.recommendlist[1].description =
                that.recommendlist[1].description;
            }
            if (that.recommendlist[2].description.length > 63) {
              that.recommendlist[2].description =
                that.recommendlist[2].description.substring(0, 62) + "...";
            } else {
              that.recommendlist[2].description =
                that.recommendlist[2].description;
            }
          }
          localStorage.setItem("lang", this.nowLang);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取滚动高度，设置图片飞入飞出
    getScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //console.log(this.scrollTop);
      if (this.scrollTop > 300) {
        this.show = true;
      }
     
      if (this.scrollTop > 900) {
        this.showmedia = true;
      }
     
      if (this.scrollTop > 1400) {
        this.showus = true;
      }
      
    },

    gotoshow() {
      this.showfooter = true;
    },
    gotohide() {
      this.showfooter = false;
    },
    github() {
      window.open("https://github.com/uenctech");
    },
    telegram() {
      window.open("https://t.me/UniversalEnergyChain1");
    },
    twitter() {
      window.open("https://twitter.com/uencclub");
    },
    facebook() {
      window.open("https://fb.me/uencclub");
    },
    weibo() {
      window.open("https://weibo.com/u/5580784739");
    },
  },
};
</script>
<style lang="less">
#liulanqi {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 18px;
  position: relative;
  top: -7px;
  cursor: pointer;
}
.selbutton {
  margin-top: -10px;
}
#submit {
  text-align: center;
}
.input_video img {
  position: relative;
  top: -200px;
  left: 250px;
  cursor: pointer;
  opacity: 0.5;
}
.submit {
  top: -3px !important;
}
.el-button {
  position: relative;
  top: -8px !important;
  left: 23px;
}
.el-textarea textarea {
  background-color: #333333 !important;
  font-size: 16px !important;
  color: snow !important;
  border: 1px solid gray !important;
}
.el-textarea textarea::placeholder {
  color: #989898 !important;
}
.el-textarea textarea:focus {
  border: 2px solid #009fcd !important;
}
.el-input__inner::-webkit-input-placeholder {
  position: relative;
  left: -13px;
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}

button {
  width: 83px;
  height: 36px;
  background: rgba(51, 51, 51, 1);
  border-radius: 5px;
  margin-top: -10px;
  margin-left: 15px;
  color: snow;
  cursor: pointer;
  border: none;
  outline: none;
}
.success {
  background: rgba(34, 171, 79, 1) !important;

  span {
    position: relative;
    left: 5px;
  }
}

// 变长
@keyframes slider {
  0% {
    width: 40px;
    border-radius: 20px;
  }
  50% {
    width: 80px;
    border-radius: 20px;
  }
  100% {
    width: 121px;
    border-radius: 20px;
  }
}
@keyframes sliderchang {
  0% {
    width: 20px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  20% {
    width: 50px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  40% {
    width: 100px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  100% {
    width: 180px;
    background: rgba(0, 159, 205, 1);
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
  }
}
@keyframes liner {
}
// 右滑进来
@keyframes sliderright {
  from {
    opacity: 0;
    -webkit-transform: translate(0px, 200px);
    transform: translate(0px, 200px);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0px, 0);
    transform: translate(0px, 0);
  }
}
// 左滑进来
@keyframes sliderleft {
  from {
    opacity: 0;
    -webkit-transform: translate(0px, 200px);
    transform: translate(0px, 200px);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0px, 0);
    transform: translate(0px, 0);
  }
}
// 上滑进来
@keyframes slidertop {
  from {
    opacity: 0;
    -webkit-transform: translate(0, -1000px); /* Safari */
    transform: translate(0, -1000px); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0, 10px); /* Safari */
    transform: translate(0, 10px); /* 标准语法 */
  }
}
// 下滑进来
@keyframes sliderbottom {
  0% {
    margin-bottom: 1000px;
  }
  100% {
    margin-bottom: 0px;
  }
}
// 往上
@keyframes xiangshang {
  0% {
    width: 420px;
    height: 0px;
    margin-top: 45px;
    background: rgba(255, 255, 255, 1);
  }
  100% {
    width: 420px;
    height: 10px;
    margin-top: 45px;
    background: rgba(0, 159, 205, 1);
  }
}
#particles-js {
  width: 100%;
  position: absolute;
  height: 800px !important;
  opacity: 0.3;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}

// 主线
.index {
  width: 100%;
  position: relative;
  height: 2484px;
  // margin-top: -200px;
  background: url("../assets/images/index/bg.png") no-repeat center/100% 100%;
  .bg1 {
    width: 100%;
    height: 686px;
    position: absolute;
    top: 900px;
    opacity: 0.3;
    background: #343434;
    z-index: 10;
  }
  .bg2 {
    width: 100%;
    height: 554px;
    position: absolute;
    top: 2164px;
    background: #141414;
    z-index: 10;
  }

  //内容部分
  .container {
    width: 1200px;
    position: relative;
    top: 0px;
    margin: 0 auto;
    z-index: 20;
    // height: 2436px;
    // z-index: 100;
  }
  //顶部栏
  .recommemd {
    width: 460px;
    height: 390px;
    position: relative;
    top: 154px;
    .recommend-title {
      width: 100%;
      height: 98px;
      text-align: left;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(0, 159, 205, 1);
      line-height: 60px;
    }
    .recommend-content {
      width: 293px;
      height: 17px;
      margin-top: 44px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
    }
    .learn-more {
      width: 180px;
      height: 50px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      position: absolute;
      left: 10px;
      top: 240px;
      cursor: pointer;
      p {
        z-index: 10;
        position: relative;

        text-align: center;
      }
    }
    .learn-more:hover {
      .button-left {
        animation: sliderchang 0.1s linear;
        animation-fill-mode: forwards;
      }
    }
    .button-overflow {
      width: 180px;
      height: 50px;
      background: rgba(102, 102, 102, 1);
      border-radius: 5px;
      position: relative;
      top: -50px;
      overflow: hidden;
      cursor: pointer;
      left: 5px;
    }
    .button-overflow:hover {
    }
    .button-left {
      width: 5px;
      height: 50px;
      position: relative;
      color: rgba(0, 159, 205, 1);
      background: rgba(0, 159, 205, 1);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      overflow: hidden;
    }
    .button-left:hover {
      cursor: pointer;
    }
  }

  //UENC视频项目成果
  .video-project {
    width: 1200px;
    height: 686px;
    display: flex;
    position: relative;
    top: 311px;
    flex-direction: row;
    //视频
    .video {
      width: 573px;
      display: flex;
      flex-direction: column;
      position: relative;
      top: 79px;
      animation: sliderleft 0.4s ease-out;
      .video-title {
        width: 100%;
        height: 33px;
        font-size: 33px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .line {
        width: 100px;
        height: 2px;
        background: rgba(0, 159, 205, 1);
        margin-top: 20px;
      }
      .video-detail {
        width: 589px;
        height: 41px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        line-height: 24px;
        text-align: left;
        margin-top: 38px;
      }
    }
    //项目成果
    .project {
      display: flex;
      flex-direction: column;
      position: relative;
      top: 79px;
      left: 60px;
      animation: sliderright 0.4s ease-out;
      .project-title {
        width: 100%;
        height: 33px;
        font-size: 33px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .project-line {
        width: 100px;
        height: 2px;
        background: rgba(0, 159, 205, 1);
        margin-top: 20px;
      }
      .project-content {
        width: 600px;
        height: 432px;
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          width: 275px;
          height: 206px;
          background: rgba(51, 51, 51, 1);
          box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5) inset;
          border-radius: 10px;
          line-height: 15px;

          img {
            position: relative;
            left: 10%;
            top: 36px;
          }
          // img:hover{
          //   box-shadow: 0 0 10px rgba(0, 159, 205, 1);
          // }

          p:nth-child(3) {
            width: 110px;
            height: 28px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(0, 159, 205, 1);
            line-height: 19px;
            margin-top: 42px;
            margin-left: 35px;
            text-align: left;
          }
          p:nth-child(5) {
            width: 180px;
            height: 14px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 300;
            color: rgba(229, 229, 229, 1);
            line-height: 19px;
            margin-left: 35px;
            margin-top: -14px;
            text-align: left;
          }
        }
        li:nth-child(2) {
          margin-left: 20px;
        }
        li:nth-child(3) {
          margin-top: 20px;
        }
        li:nth-child(4) {
          margin-top: 20px;
          margin-left: 20px;
        }
      }
    }
  }
  //媒体公告
  .media {
    width: 1200px;
    height: 549px;
    position: relative;
    top: 313px;
    display: flex;
    flex-direction: row;
    //媒体公告左侧
    .media-left:hover {
      .quyu {
        top: 6px;
        .media-title2 {
          // position: relative;
          // top: -6px;
          cursor: pointer;
        }
        // .media-content {
        //   position: relative;
        //   top: -6px;
        // }
        .media-line-back {
          animation: xiangshang 0.5s ease-out;
          animation-fill-mode: forwards;
        }
      }
    }
    .media-left {
      width: 419px;
      height: 389px;
      position: relative;
      top: 80px;
      animation: sliderleft 0.4s ease-out;

      .media-title {
        width: 377px;
        height: 32px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .media-line {
        width: 100px;
        height: 2px;
        background: rgba(0, 159, 205, 1);
        margin-top: 20px;
      }
      .media-title2 {
        width: 375px;
        height: 95px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(0, 159, 205, 1);
        line-height: 36px;
        text-align: left;
        margin-top: 67px;
      }
      .media-content {
        height: 108px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        line-height: 24px;
        text-align: left;
        margin-top: 40px;
        p {
          width: 100%;
          word-break: break-all;
          word-break: break-word;
        }
      }
      .media-line-back {
        // width: 420px;
        // height: 10px;
        // margin-top: 45px;
        // background: rgba(0, 159, 205, 1);
      }
    }
    //媒体公告右侧
    .media-right {
      width: 719px;
      height: 389px;
      position: relative;
      left: 60px;
      top: 76px;
      text-align: left;
      animation: sliderright 0.4s ease-out;
      ul {
        display: flex;
        flex-direction: row;
        .news-img {
          width: 349px;
          border-radius: 10px;
        }
        li:nth-child(2) {
          margin-left: 21px;
        }
        .icon:hover {
          // .news-img {
          //   box-shadow: 0px 0px 10px blue;
          // }
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          animation: slider 0.5s linear;
          animation-fill-mode: forwards;
          span {
            display: block;
            text-align: center;
            margin-left: 20px;
          }
          img {
            margin-left: -2px;
            position: relative;
            left: 10px;
          }
        }
      }
      .news-title {
        width: 100%;
        height: 40px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(0, 159, 205, 1);
        line-height: 24px;
        margin-top: 22px;
      }
      .news-content {
        width: 349px;
        height: 64px;
        margin-top: 17px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        line-height: 24px;
      }
      .icon {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-top: 42px;
        background: rgba(0, 159, 205, 1);
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        span {
          display: none;
          color: rgba(255, 255, 255, 1);
        }
        img {
          width: 10.2px;
          height: 18px;
          position: relative;
          top: 11px;
          left: 15px;
        }
      }

      .icon-more {
        text-align: center;
        width: 121px;
        height: 40px;
        margin-top: 24px;
        line-height: 40px;
        background: rgba(0, 159, 205, 1);
        border-radius: 20px;
        img {
          position: relative;
          left: 2px;
          top: 3px;
        }
        span {
          width: 62px;
          height: 16px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
        }
      }
    }
  }
  //联系我们
  .contact {
    width: 100%;
    height: 484px;
    top: 338px;
    position: relative;
    display: flex;
    flex-direction: row;
    //联系我们左侧
    .contact-left {
      width: 568px;
      height: 325px;
      position: relative;
      top: 79px;
      animation: sliderleft 0.4s ease-out;
      .contact-title {
        width: 100%;
        height: 33px;
        font-size: 33px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .contact-line {
        width: 100px;
        height: 2px;
        margin-top: 20px;
        background: rgba(0, 159, 205, 1);
      }
      .contact-content {
        width: 568px;
        height: 129px;
        text-align: left;
        margin-top: 38px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        line-height: 24px;
      }
      .phone {
        width: 317px;
        height: 22px;
        margin-top: 94px;
        text-align: left;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .email {
        width: 367px;
        height: 24px;
        margin-top: 18px;
        text-align: left;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
    }
    //联系我们右侧
    .contact-right .el-form {
      display: flex;
      flex-direction: column;
      position: relative;
      top: 80px;
      left: 60px;
      animation: sliderright 0.4s ease-out;
      #question {
        height: 100px;
        resize: none;
      }
      input:focus {
        border: 2px solid #009fcd;
      }
      input:first-child {
        width: 570px;
        height: 45px;
        background: rgba(51, 51, 51, 1);
        border: 1px solid rgba(102, 102, 102, 1);
        border-radius: 10px;
        outline: none;
        color: aliceblue;
      }
      input:focus {
        border: 2px solid #009fcd;
      }
      input:nth-child(1)::-webkit-input-placeholder {
        width: 112px;
        height: 16px;
        font-size: 16px;
        text-indent: 20px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
      input:nth-child(2) {
        width: 570px;
        height: 45px;
        margin-top: 20px;
        border: 1px solid rgba(102, 102, 102, 1);
        background: rgba(51, 51, 51, 1);
        border-radius: 10px;
        outline: none;
        color: aliceblue;
      }
      input:nth-child(2):focus {
        border: 2px solid #009fcd;
      }
      input:nth-child(2)::-webkit-input-placeholder {
        width: 115px;
        height: 16px;
        font-size: 16px;
        text-indent: 20px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
      input:nth-child(3) {
        width: 570px;
        height: 45px;
        margin-top: 20px;
        border: 1px solid rgba(102, 102, 102, 1);
        background: rgba(51, 51, 51, 1);
        border-radius: 10px;
        outline: none;
        color: aliceblue;
      }
      input:nth-child(3):focus {
        border: 2px solid #009fcd;
      }
      input:nth-child(3)::-webkit-input-placeholder {
        width: 115px;
        height: 16px;
        font-size: 16px;
        text-indent: 20px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
      input:nth-child(4) {
        width: 570px;
        height: 129px;
        margin-top: 20px;
        border: 1px solid rgba(102, 102, 102, 1);
        background: rgba(51, 51, 51, 1);
        border: 1px solid rgba(102, 10red2, 102, 1);
        border-radius: 10px;
        outline: none;
        color: aliceblue;
      }
      input:nth-child(4):focus {
        border: 2px solid #009fcd;
      }
      input:nth-child(4)::-webkit-input-placeholder {
        width: 112px;
        height: 16px;
        text-indent: 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
      button:hover {
        background: rgba(0, 159, 205, 1);
      }
      button {
        width: 144px;
        height: 45px;
        position: relative;
        top: -27px;
        margin-top: 20px;
        margin-left: 381px;
        background: rgba(102, 102, 102, 1);
        border-radius: 10px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
      }
    }
  }
  #indexvideo {
    border-radius: 10px;
  }
  //视频设置
  .input_video {
    width: 570px;
    margin: 40px 0 0 0;
  }
  .video-player {
    // width: 100%;
    opacity: 0.5;

    // height: 321px;
  }
  .vjs-big-play-button {
    top: 40% !important;
    left: 40% !important;
  }
}

//底部
.indexuenc_foot {
  width: 100%;
  height:166px;
  background-color: #0c0c0c;
  position: relative;
  top: 409px;
  z-index: 20;
  margin: 0 auto;
  .foot-top {
    width: 1200px;
    height: 111px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // z-index: 20;
    .foot-box {
      width: 500px;
      display: flex;
      flex-direction: row;
      position: relative;
      justify-content: space-between !important;
      img {
        align-content: center;
      }
      .circle {
        width: 40px;
        height: 40px;
        background: rgba(51, 51, 51, 1);
        position: relative;
        left: 5px;
        top: 5px;
        border-radius: 50%;
      }
      .foot-box1 {
        width: 50px;
        height: 50px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
        margin-top: 30px;
        img {
          position: relative;
          top: 9px;
          cursor: pointer;
          left: 15%;
        }
      }
      .foot-box1:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box2:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box3:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box5:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
      .foot-box3 {
        img {
          left: 33% !important;
        }
      }
      .foot-box2,
      .foot-box3,
      .foot-box4,
      .foot-box5 {
        width: 50px;
        height: 50px;
        background: rgba(51, 51, 51, 1);
        border-radius: 50%;
        // position: relative;
        margin-left: 0px;
        margin-top: 30px;
        img {
          cursor: pointer;
          position: relative;
          top: 7px;
          left: 17%;
        }
      }
      .foot-box4:hover {
        .circle {
          animation: colorchange 0.1s linear;
          animation-fill-mode: forwards;
        }
      }
    }
    .component_index {
   line-height: 111px;
      span {
        margin-left: 39px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
      }
    }
  }
  .foot-zhong {
    width: 100%;
    height: 1px;
    background: rgba(0, 159, 205, 1);
  }
  footer p {
    margin: 0 auto;
    width: 372px;
    height: 13px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 42px;
    text-align: center;
  }
  .hovershow {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -97px;
    left: 42%;
    float: left;
    z-index: 30;
    opacity: 1;
    .imgshow {
      width: 310px;
      height: 181px;
      position: relative;
    }
    .club {
      width: 120px;
      height: 120px;
      position: relative;
      left: -280px;
      top: 20px;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        position: relative;
        left: 9px;
      }
    }
    .wallet {
      width: 120px;
      height: 120px;
      position: relative;
      left: -260px;
      top: 20px;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        position: relative;
        left: 18px;
      }
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>
