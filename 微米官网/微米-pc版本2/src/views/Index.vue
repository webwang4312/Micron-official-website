<template>
  <div class="index">
    <div class="index_top">
      <div class="index_topz">
        <div class="index_top_content">
          <div class="content">
            A public chain with cross chain technology
          </div>
          <button @click="goVideo">
            <img src="@assets/images/wmIndex/Frame.png" alt="" />
            <div>
              Learn more
            </div>
          </button>
        </div>
        <div>
          <img src="@assets/images/wmIndex/Frame(1).png" class="svg_img" />
        </div>
      </div>
    </div>
    <div class="index_project">
      <div class="index_projectz">
        <div class="title">
          <div>UENC project achievements</div>
          <div>
            With our super powers we have reached this
          </div>
        </div>
        <div class="detail">
          <div class="detail_top">
            <div class="detail_top_left">
              <img src="@assets/images/wmIndex/Icon.png" />
              <div class="detail_top_top2">
                <div>
                  {{ columndata[0] }}
                </div>

                <div>
                  Block height
                </div>
              </div>
            </div>
            <div class="detail_top_right">
              <img src="@assets/images/wmIndex/Icon2.png" />
              <div class="detail_top_top2">
                <div>
                  {{ columndata[1] }}
                </div>

                <div>
                  Whole network nodes
                </div>
              </div>
            </div>
          </div>
          <div class="detail_bottom">
            <div class="detail_top_left">
              <img src="@assets/images/wmIndex/Icon3.png" />
              <div class="detail_top_top2">
                <div>
                  {{ columndata[2] }}
                </div>

                <div>
                  Bonus issued
                </div>
              </div>
            </div>
            <div class="detail_top_right">
              <img src="@assets/images/wmIndex/Icon4.png" />
              <div class="detail_top_top2">
                <div>
                  {{ columndata[3] }}
                </div>

                <div>
                  Transactions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="advantage">
      <div class="advantagez">
        <div class="advantage_top">
          <div>Technical advantages</div>
          <div>
            UENC has developed dpow consensus algorithm to meet the technical
            needs of the future economic development of Tongzheng.
          </div>
        </div>
        <div class="advantage_detail">
          <ul class="advantage_detail_ul1">
            <li>
              <div>
                <img src="@assets/images/wmIndex/Vector.png" alt="" />
                <!-- <svg
                  width="38"
                  height="40"
                  viewBox="0 0 38 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0138 1.25C18.6738 1.25 18.3452 1.31153 18.0339 1.436C17.2035 1.76813 14.2874 3.09109 11.6305 6.25513C10.1209 8.05636 8.94484 10.145 8.1267 12.4818C7.1468 15.2913 6.69156 18.4666 6.77817 21.9117C6.78962 22.2998 6.65148 22.6942 6.39737 23.0039C4.71457 25.0702 1.84428 29.332 1.50428 34.6749C1.45775 35.3951 1.79274 36.0712 2.4033 36.4824C2.76621 36.7243 3.18709 36.8481 3.61369 36.8481C3.90716 36.8481 4.19562 36.7914 4.46691 36.6677C5.38883 36.2621 7.84397 35.2881 10.5239 35.035C10.5818 35.0294 10.6334 35.0294 10.6906 35.0294C11.1459 35.0294 11.5782 35.2042 11.8781 35.5021C12.7428 36.3747 14.3619 37.5963 17.1456 38.4745C17.7447 38.6549 18.3674 38.75 19.0073 38.75C19.6472 38.75 20.2692 38.6598 20.8569 38.4745C23.6406 37.5963 25.2597 36.3747 26.1244 35.5021C26.4236 35.2035 26.8616 35.0294 27.3111 35.0294C27.3691 35.0294 27.4206 35.0294 27.4779 35.035C30.1578 35.2888 32.6072 36.2565 33.5349 36.6677C33.8111 36.7858 34.0996 36.8481 34.3931 36.8481C34.8197 36.8481 35.2406 36.7243 35.5977 36.4824C36.2026 36.0712 36.5368 35.3902 36.4968 34.6749C36.151 29.3376 33.2865 25.0757 31.6037 23.0039C31.3503 22.6886 31.2179 22.3054 31.2229 21.9117C31.3095 18.4659 30.8542 15.2906 29.8743 12.4818C29.0619 10.145 27.8802 8.05076 26.3706 6.25513C23.7372 3.09109 20.8204 1.76813 19.9908 1.436C19.6823 1.31153 19.3545 1.25 19.0138 1.25Z"
                    stroke="#30B3F5"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    class="path"
                  />
                </svg> -->
              </div>
              <span>High velocity</span>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                erat nibh tristique ipsum.
              </div>
            </li>
            <li>
              <div>
                <img src="@assets/images/wmIndex/02.png" />
              </div>
              <span>High concurrency</span>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                erat nibh tristique ipsum.
              </div>
            </li>
            <li>
              <div>
                <img src="@assets/images/wmIndex/Group2.png" />
              </div>
              <span>Low cost</span>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                erat nibh tristique ipsum.
              </div>
            </li>
          </ul>
          <ul class="advantage_detail_ul1">
            <li>
              <div>
                <img src="@assets/images/wmIndex/Group 1593.png" />
              </div>

              <span>Decentralization</span>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                erat nibh tristique ipsum.
              </div>
            </li>
            <li>
              <div>
                <img src="@assets/images/wmIndex/Group 1594.png" />
              </div>
              <span>DPOW consensus algorithm</span>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                erat nibh tristique ipsum.
              </div>
            </li>
            <li>
              <div>
                <img src="@assets/images/wmIndex/Group.png" />
              </div>
              <span>Cross parallel storage</span>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                erat nibh tristique ipsum.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="index_media">
      <div class="index_mediaz">
        <img
          src="@assets/images/wmIndex/zuo.png"
          style="position:relative;top:64px;left:40px;z-index:1;opacity:0.2"
        />
        <div class="media_title">
          <div>
            Related media reports
          </div>
          <div>
            Pay attention to the latest development of uenc.
          </div>
        </div>
        <div class="media_content1">
          <img src="@assets/images/wmIndex/Layer 2.png" class="media_imgtop" />
          <div class="media_content_content">
            <img src="@assets/images/wmIndex/“2.png" alt="" />
            <div class="contentz">
              To quickly start my startup landing page design, I was looking for
              a landing page UI Kit. Landify is one of the best landing page UI
              kit I have come across. It’s so flexible, well organised and
              easily editable.
              <div>
                2021.2.1
              </div>
              <div>
                Vice President, GoPro
              </div>
            </div>
          </div>
        </div>
        <div class="media_content2">
          <img src="@assets/images/wmIndex/Vector3.png" class="media_imgtop" />
          <div class="media_content_content">
            <img src="@assets/images/wmIndex/“2.png" alt="" />
            <div class="contentz2">
              I used landify and created a landing page for my startup within a
              week. The Landify UI Kit is simple and highly intuitive, so anyone
              can use it.
              <div>
                2021.2.1
              </div>
              <div>
                Vice President, GoPro
              </div>
            </div>
          </div>
        </div>
        <div class="media_content3">
          <img src="@assets/images/wmIndex/Group4.png" class="media_imgtop" />
          <div class="media_content_content">
            <img
              src="@assets/images/wmIndex/“2.png"
              style="position:relative;top:50px"
            />
            <div class="contentz3">
              Landify saved our time in designing my company page.
              <div>
                2021.2.1
              </div>
              <div>
                Vice President, GoPro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index_contact">
      <div class="index_contactz">
        <div class="contact_title">
          <div>Contact Us</div>
          <div>
            Please fill in the form on the right and we will give you feedback
            in time.
          </div>
        </div>
        <div class="index_form">
          <div class="index_line1">
            <div>
              <span>Your Name <span style="color:red">*</span></span
              ><br />
              <input
                :class="{ indexblue: nameblue }"
                type="text"
                placeholder="Your Name"
                v-model="ruleForm.name"
                @focus="nameFocus"
                @blur="nameBlur"
              />
            </div>
            <div>
              <span>Your Email <span style="color:red">*</span></span
              ><br />
              <input
                :class="{ indexblue: emailblue }"
                type="text"
                placeholder="Your Email"
                v-model="ruleForm.email"
                @focus="emailFocus"
                @blur="emailBlur"
              />
            </div>
          </div>
          <div class="index_line2">
            <div>
              <span>Your phonenumber</span><br />
              <input
                :class="{ indexblue: phoneblue }"
                type="text"
                placeholder="Your phonenumber"
                v-model="ruleForm.phone"
                @focus="phoneFocus"
                @blur="phoneBlur"
              />
            </div>
          </div>
          <div class="index_line3">
            <div>
              <span>What's on your mind? <span style="color:red">*</span></span
              ><br />
              <textarea
                :class="{ indexblue: mindblue }"
                placeholder="Jot us a note and we’ll get back to you as quickly as possible"
                v-model="ruleForm.advice"
                @focus="mindFocus"
                @blur="mindBlur"
              >
              </textarea>
            </div>
          </div>
        </div>
        <div class="index_button" @click="submitForm">
          <span> submit</span>
        </div>
      </div>
    </div>
    <div class="index_developer">
      <div class="index_developerz">
        <div class="title">
          Join the developer community
        </div>
        <div class="content">
          Jointly create uenc project ecological community obtain developer
          awards and promote the development of blockchain Technology
        </div>
        <div class="bottom" @click="toDeveloper">
          Learn more
        </div>
       

      </div>
    </div>
    <div class="index_partner">
      <div class="index_partnerz">
        <div class="partner_title">
          partner
        </div>
        <VueSlickCarousel
          :arrows="false"
          :dots="false"
          :infinite="true"
          :speed="300"
          :slidesToShow="1"
          :touchMove="false"
          :slidesToScroll="1"
          ref="carousel"
          @afterChange="changes"
        >
        <div>
            <ul>
              <li>
                <img src="@assets/images/wmIndex/Group 687.png" alt="" />
              </li>
              <li>
                <img src="@assets/images/wmIndex/Group 687.png" alt="" />
              </li>
              <li>
                <img src="@assets/images/wmIndex/Group 687.png" alt="" />
              </li>
              <li>
                <img src="@assets/images/wmIndex/Group 687.png" alt="" />
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <img src="@assets/images/wmIndex/Group 688.png" alt="" />
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <img src="@assets/images/wmIndex/Group 687.png" alt="" />
              </li>
            </ul>
          </div>
           <div>
            <ul>
              <li>
                <img src="@assets/images/wmIndex/Group 688.png" alt="" />
              </li>
            </ul>
          </div>
        </VueSlickCarousel>
        <div class="carousel_bottom">
          <img src="@assets/images/wmIndex/left.png" @click="leftMove" />
          <span>{{ carsoulitem }}/3</span>
          <img src="@assets/images/wmIndex/right.png" @click="rightMove" />
        </div>
        <!-- <div class="carousel">
          <el-carousel
            indicator-position="outside"
            :autoplay="false"
            type="card"
            @change="changes"
            ref="car"
            arrow="never"
          >
            <el-carousel-item v-for="item in 6" :key="item">
              <ul>
                <li>
                  <ul>
                    <li>
                      <img src="@assets/images/wmIndex/Group 687.png" alt="" />
                    </li>
                    <li>
                      <img src="@assets/images/wmIndex/Group 688.png" alt="" />
                    </li>
                    <li>
                      <img src="@assets/images/wmIndex/Group 687.png" alt="" />
                    </li>
                    <li>
                      <img src="@assets/images/wmIndex/Group 688.png" alt="" />
                    </li>
                  </ul>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
          <div class="carousel_bottom">
            <img src="@assets/images/wmIndex/left.png" @click="leftMove" />
            <span>{{ carsoulitem }}/3</span>
            <img src="@assets/images/wmIndex/right.png" @click="rightMove" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { BASEURL } from "@api/api";
import VueSlickCarousel from "vue-slick-carousel";

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
    return {
      nameblue: false,
      emailblue: false,
      phoneblue: false,
      mindblue: false,
      username: "",
      carsoulitem: "",
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

      
      indexNumTop: "",
      scrollTop: "",
      description1: "",
      videoUrl: "",
      videosource: [{ src: "" }],
    };
  },
  components: { VueSlickCarousel },
  created() {
    this.carsoulitem = 1;
    this.username = window.sessionStorage.getItem("username");
    // console.log(this.username);
    this.nowLang = this.$i18n.locale;
    //console.log(this.nowLang);
    // 视频语言的切换
    if (this.$i18n.locale == "cn") {
      this.videosource[0].src =
        "https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4";
    } else {
      this.videosource[0].src = "https://www.uenc.io/video/yingwen.mp4";
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
   
    // 滚动设置
    window.addEventListener("scroll", this.getScroll);
  },
  destroyed() {
    // 滚动取消
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    toDeveloper(){
       this.$router.push({
        path: "/developer",
        query: {
         
        },
      });
    },
    changes(index) {
      console.log(index);
      this.carsoulitem = index + 1;
    },
    leftMove() {
      this.$refs.carousel.prev();
    },
    rightMove() {
      this.$refs.carousel.next();
    },
    nameFocus() {
      this.nameblue = true;
    },
    nameBlur() {
      this.nameblue = false;
    },

    emailFocus() {
      this.emailblue = true;
    },
    emailBlur() {
      this.emailblue = false;
    },
    phoneFocus() {
      this.phoneblue = true;
    },
    phoneBlur() {
      this.phoneblue = false;
    },
    mindFocus() {
      this.mindblue = true;
    },
    mindBlur() {
      this.mindblue = false;
    },
    goVideo() {
      if (this.$i18n.locale == "cn") {
        window.open(
          "https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4"
        );
      } else {
        window.open("https://www.uenc.io/video/yingwen.mp4");
      }
    },
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
      console.log(this.ruleForm.name);
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
        if (this.$i18n.locale == "cn") {
          this.$message.error("输入内容不能为空");
        } else {
          this.$message.error("Input content cannot be empty ");
        }
      } else {
        that.$http
          .post(`${BASEURL}` + "/weimioffice/web/content/callback", data, {
            headers: { language: this.nowLang },
          })
          .then((res) => {
            //console.log(res);
            if (res.data.code == 200) {
              // setTimeout(this.change2, 0);
              // setTimeout(this.change, 5000);

              (this.ruleForm.name = ""),
                (this.ruleForm.phone = ""),
                (this.ruleForm.email = ""),
                (this.ruleForm.advice = "");
                this.$message.success(res.data.result);
            }
          })
          .catch((err) => {
             this.$message.error(res.data.result);
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
svg {
  width: 300px;
  display: block;

  .paths {
    stroke-dasharray: 320;
    stroke-dashoffset: 0;
    animation: dash 1s linear infinite;
  }
  @keyframes dash {
    from {
      // stroke-dashoffset: 320;
      transform: rotateY(0deg);
      transform-origin: 50% 0;
    }
    to {
      // stroke-dashoffset: 0;
      transform: rotateY(360deg);
      transform-origin: 50% 0;
    }
  }
}

.indexblue {
  border: 1px solid #30b3f5 !important;
}
.index {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 1;
  .index_top {
    position: relative;

    width: 100%;
    height: 900px;
    margin: auto;
    // background: red;
    background: url("../assets/images/wmIndex/Background.png") no-repeat
      center/100% 100%;
    .index_topz {
      display: flex;
      flex-direction: row;
      width: 1200px;
      margin: 0 auto;
      // background: #801090;
      position: relative;
      top: 40px;
    }
    .svg_img {
      width: 437px;
      height: 350px;
      margin-top: 150px;
    }
    .index_top_content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: 57px;
      margin-top: 150px;

      .content {
        width: 706px;
        height: 294px;

        /* Heading / H1 */

        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 72px;
        line-height: 98px;

        font-feature-settings: "liga" off;

        color: #18191f;
      }
      button {
        position: static;
        width: 227px;
        height: 62px;
        left: 0px;
        top: 334px;
        background: #30b3f5;
        border-radius: 8px;
        flex: none;
        order: 1;
        flex-grow: 0;
        margin: 40px 0px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        img {
          position: relative;
          left: 40px;
        }
        div {
          position: relative;
          right: 40px;
          font-family: Manrope;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 30px;
          text-align: center;
          font-feature-settings: "liga" off;
          color: #ffffff;
        }
      }
    }
  }
  .index_project {
    position: relative;
    width: 100%;
    height: 332px;
    // background: gray;

    .index_projectz {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: relative;
      top: 81px;
      // background: #505090;
      .title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        div:nth-child(1) {
          position: static;
          width: 540px;
          height: 128px;
          left: 0px;
          top: 0px;
          font-family: Manrope;
          font-style: normal;
          font-weight: 800;
          font-size: 48px;
          line-height: 64px;
          font-feature-settings: "liga" off;
          color: #18191f;
          flex: none;
          order: 0;
          flex-grow: 0;
          margin: 8px 0px;
        }
        div:nth-child(2) {
          position: static;
          width: 540px;
          height: 32px;
          left: 0px;
          top: 136px;
          font-family: Manrope;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 32px;
          font-feature-settings: "liga" off;
          color: #18191f;
          flex: none;
          order: 1;
          align-self: stretch;
          flex-grow: 0;
          margin: 8px 0px;
        }
      }
      .detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px;

        width: 540px;
        height: 172px;

        .detail_top_left {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 48px;
            height: 48px;
          }
        }
        .detail_top_right {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 48px;
            height: 48px;
          }
        }
        .detail_top_top2 {
          margin-left: 16px;
          div:nth-child(1) {
            font-family: Manrope;
            font-style: normal;
            font-weight: 800;
            font-size: 28px;
            line-height: 40px;
            color: #18191f;
          }
          div:nth-child(2) {
            font-family: Manrope;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 26px;
            color: #18191f;
          }
        }
        .detail_top {
          display: flex;
          flex-direction: row;

          align-items: center;
          width: 540px;
          height: 66px;
          .detail_top_right {
            margin-left: 140px;
          }
        }
        .detail_bottom {
          display: flex;
          flex-direction: row;

          align-items: center;
          width: 540px;
          height: 66px;
          margin-top: 40px;
          .detail_top_right {
            margin-left: 24px;
          }
        }
      }
    }
  }
  .advantage {
    position: relative;
    width: 100%;
    height: 716px;

    // background: red;
    .advantagez {
      height: 716px;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      // background: #836040;
    }
    .advantage_top {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: 80px;
      width: 668px;
      height: 136px;
      margin: 0 auto;
      div:nth-child(1) {
        position: static;
        width: 540px;
        height: 64px;
        left: 0px;
        top: 0px;

        /* Heading / H2 */

        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        /* identical to box height, or 133% */

        text-align: center;
        font-feature-settings: "liga" off;

        /* Text / Gray 900 */

        color: #18191f;

        /* Inside Auto Layout */

        flex: none;
        order: 0;
        flex-grow: 0;
      }
      div:nth-child(2) {
        position: static;
        width: 668px;
        height: 64px;
        left: 0px;
        top: 72px;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
        flex: none;
        order: 1;
        align-self: stretch;
        flex-grow: 0;
      }
    }
    .advantage_detail {
      display: flex;
      flex-direction: column;

      position: relative;
      top: 134.75px;
      .advantage_detail_ul1:nth-child(2) {
        margin-top: 65px;
      }
      .advantage_detail_ul1 {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        li {
          display: flex;
          flex-direction: column;
          span {
            font-family: Manrope;
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 32px;
            text-align: center;
            font-feature-settings: "liga" off;
            color: #18191f;
            flex: none;
            order: 0;
            flex-grow: 0;
            margin: 8px 0px;
          }
          img {
            position: relative;
            left: 46%;
            right: 15%;
            top: 3.12%;
            bottom: 3.12%;
          }
          div:nth-child(3) {
            position: static;
            width: 350px;
            height: 52px;
            left: 0px;
            top: 40px;

            /* Body / Body 1 */

            font-family: Manrope;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 26px;
            /* or 162% */

            text-align: center;
            font-feature-settings: "liga" off;
          }
        }
      }
    }
  }
  .index_media {
    position: relative;
    width: 100%;
    height: 896px;
    background: #b1e5ff;
    .index_mediaz {
      width: 1200px;
      margin: 0 auto;
      height: 100%;

      .media_title {
        position: relative;
        margin-top: -14px;
        margin-left: 134px;
        z-index: 100;

        div:nth-child(1) {
          z-index: 100;
          width: 445px;
          height: 128px;

          font-family: PingFang SC;
          font-style: normal;
          font-weight: 600;
          font-size: 48px;
          line-height: 64px;
          font-feature-settings: "liga" off;
          color: #18191f;
          flex: none;
          order: 0;
          flex-grow: 0;
          margin: 8px 0px;
        }
        div:nth-child(2) {
          width: 445px;
          height: 32px;

          top: 136px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 32px;
          font-feature-settings: "liga" off;
          color: #18191f;
          flex: none;
          order: 1;
          align-self: stretch;
          flex-grow: 0;
          margin: 8px 0px;
        }
      }
      .media_imgtop {
        position: relative;
        left: 32px;
        top: 38px;
      }
      .media_content_content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        img {
          position: relative;
          left: 32px;
          top: 68px;
          height: 14px;
          width: 15.929831504821777px;
          opacity: 0.5;
        }
        .contentz3 {
          width: 254px;
          min-height: 140px;
          height: auto;
          position: relative;

          top: 40px;

          font-family: Manrope;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 32px;
          font-feature-settings: "liga" off;
          color: #18191f;

          margin-right: 24px 0px;
          div:nth-child(1) {
            font-family: Manrope;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 28px;
            font-feature-settings: "liga" off;
            color: #18191f;

            margin-top: 24px;
          }
          div:nth-child(2) {
            font-family: Manrope;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            font-feature-settings: "liga" off;
            color: #969bab;
          }
        }
        .contentz2 {
          width: 349px;
          min-height: 128px;
          height: auto;
          position: relative;
          // right: 32px;
          top: 38.42px;

          font-family: Manrope;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 32px;
          font-feature-settings: "liga" off;
          color: #18191f;

          margin: 24px 0px;
          div:nth-child(1) {
            font-family: Manrope;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 28px;
            font-feature-settings: "liga" off;
            color: #18191f;

            margin-top: 24px;
          }
          div:nth-child(2) {
            font-family: Manrope;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            font-feature-settings: "liga" off;
            color: #969bab;
          }
        }
        .contentz {
          width: 314px;
          min-height: 192px;
          height: auto;
          position: relative;
          right: 32px;
          top: 38.42px;

          font-family: Manrope;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 32px;
          font-feature-settings: "liga" off;
          color: #18191f;

          margin: 24px 0px;
          div:nth-child(1) {
            font-family: Manrope;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 28px;
            font-feature-settings: "liga" off;
            color: #18191f;

            margin-top: 24px;
          }
          div:nth-child(2) {
            font-family: Manrope;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            font-feature-settings: "liga" off;
            color: #969bab;
          }
        }
      }
      .media_content1 {
        height: auto;
        min-height: 404px;
        width: 410px;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0px 10px 20px rgba(41, 41, 42, 0.07);
        border-radius: 8px;
        position: relative;
        left: 215px;
      }
      .media_content2 {
        height: auto;
        min-height: 340px;
        width: 410px;
        border-radius: 8px;
        background: #ffffff;
        position: relative;
        left: 655px;
        top: -532px;
        box-shadow: 0px 10px 20px rgba(41, 41, 42, 0.07);
        border-radius: 8px;
      }
      .media_content3 {
        height: auto;
        min-height: 276px;
        width: 350px;
        position: relative;
        left: 655px;
        top: -500px;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0px 10px 20px rgba(41, 41, 42, 0.07);
        border-radius: 8px;
      }
    }
  }
  .index_contact {
    width: 100%;
    height: 838px;
    // background: red;
    .index_contactz {
      width: 1200px;
      margin: 0 auto;
      height: 838px;
      // background: #505090;
      display: flex;
      flex-direction: column;
      .contact_title {
        text-align: center;
        position: relative;
        top: 80px;
        div:nth-child(1) {
          width: 100%;
          height: 64px;

          font-family: Manrope;
          font-style: normal;
          font-weight: 800;
          font-size: 48px;
          line-height: 64px;
          text-align: center;
          font-feature-settings: "liga" off;
          color: #18191f;
          flex: none;
          order: 0;
          flex-grow: 0;
        }
        div:nth-child(2) {
          width: 100%;
          height: 64px;
          left: 0px;
          top: 72px;
          font-family: Manrope;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 32px;
          text-align: center;
          font-feature-settings: "liga" off;
          color: #18191f;
          flex: none;
          order: 1;
          align-self: stretch;
          flex-grow: 0;
          margin: 8px 0px;
        }
      }
      .index_form {
        position: relative;
        top: 127px;
        input {
          height: 50px;
          width: 580.6034545898438px;
          left: 0px;
          top: 38px;
          border-radius: 4px;
          border: 1px solid #8c8c8c;
          padding-left: 17px;
          outline: none;
        }
        .index_line1 {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          span {
            font-family: Poppins;
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 210%;
            /* or 27px */

            display: flex;
            align-items: center;

            /* Color - 8 */

            color: #000000;
          }
        }
        .index_line2 {
          margin-top: 11px;
          span {
            font-family: Poppins;
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 210%;
            /* or 27px */

            display: flex;
            align-items: center;

            /* Color - 8 */

            color: #000000;
          }
        }
        .index_line3 {
          span {
            font-family: Poppins;
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 210%;
            /* or 27px */

            display: flex;
            align-items: center;

            /* Color - 8 */

            color: #000000;
          }
          margin-top: 11px;
          textarea {
            height: 180px;
            width: 1199.9998779296875px;
            left: 405px;
            top: 512px;
            border-radius: 4px;
            resize: none;
            border: 1px solid #8c8c8c;
            padding-left: 17px;
            padding-top: 17px;
          }
        }
      }
      .index_button {
        cursor: pointer;
        position: relative;
        top: 136px;
        height: 50px;
        width: 194.59457397460938px;
        border-radius: 50px;
        background: #30b3f5;
        border-radius: 50px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .index_developer {
    width: 100%;
    height: 450px;
    // background: red;
    background: url("../assets/images/wmIndex/Group 1592.png") no-repeat
      center/100% 100%;
    position: relative;
    top: 0;
    .index_developerz {
      width: 1200px;
      height: 450px;

      margin: 0 auto;
      text-align: center;
      position: relative;
      top: 0;
      .title {
        position: relative;
        top: 80px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        font-feature-settings: "liga" off;
        color: #18191f;
      }
      .content {
        position: relative;
        top: 88px;
        width: 792px;
        height: 96px;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        font-feature-settings: "liga" off;
        color: #18191f;
        margin: 0 auto;
      }
      .bottom {
        position: relative;
        top: 148px;
        margin: 0 auto;
        width: 196px;
        height: 62px;
        background: #30b3f5;
        border-radius: 8px;
        font-family: Manrope;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 62px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .index_partner {
    width: 100%;
    height: 471px;
    // background: red;
    position: relative;
    top: 0;
    .index_partnerz {
      width: 1200px;
      height: 471px;
      background: #fff;
      margin: 0 auto;
      // background: #505090;
      position: relative;

      .partner_title {
        text-align: center;
        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        font-feature-settings: "liga" off;
        color: #18191f;

        position: relative;
        top: 80px;
      }
      .carousel {
        position: relative;
        top: 140px;
        .el-carousel {
          height: 110px;

          .el-carousel__container {
            height: 100%;
            ul {
              li {
                ul {
                  display: flex;
                  flex-direction: row;
                  justify-content: space-around;
                  li {
                    width: 270px;
                    height: 110px;
                    display: flex;
                    /* General / Dark */

                    background: #fff;
                    justify-content: space-around;
                    font-size: 30px;
                    align-items: center;
                    align-content: center;
                    img {
                      width: 170px;
                      height: 70px;
                    }
                    // margin-left: 30px;
                  }
                }
              }
            }
          }
          .el-carousel__indicator {
            display: none;
          }
        }

        .el-carousel__item {
          width: 1100px;
          height: 100%;
          left: -300px !important;
        }
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
          opacity: 0;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
          opacity: 0;
        }
        .is-active {
          width: 100%;
          margin: 0 auto;
          opacity: 1 !important;
        }
      }
      .carousel_bottom {
        text-align: center;
        margin-top: 176px;
        img {
          cursor: pointer;
        }
        span {
          font-family: Raleway;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          align-items: center;
          text-align: center;
          color: #222222;
          opacity: 0.3;
          margin: 0px 15px;
        }
      }
      .slick-slider {
        position: relative;
        top: 140px;
        color: red;
        font-size: 20px;
        width: 1200px !important;
        background: blue;
        height: 110px;
        ul {
          display: flex !important;
          flex-direction: row;
          height: 110px;
          li {
            height: 110px;
            width: 100%;
            background: white;
          }
        }
      }
      .slick-list {
      }
    }
  }
}
</style>
