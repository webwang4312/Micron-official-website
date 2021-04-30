<template>
  <div>
    <div class="index">
      <!-- <video src="https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4" style="width:100%;opacity:0.5" autoplay="autoplay" muted>

</video> -->
 
      <div class="index_top">
        <!-- <div id="app1" v-drag class="drag" @mouseover="drag"></div> -->
        <div class="index_topz">
          <div class="index_top_content">
             <!-- <button @click="ceshi">测试</button> -->
            <div class="content">
              A public chain with cross chain technology
             
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="#181e32"
                xmlns="http://www.w3.org/2000/svg"
                class="svelte-csnp7s"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="24"
                  stroke="#ffffff"
                  fill='red'
                  stroke-width="10"
                  class="path1"
                ></circle>
                <path d="M23 19L29 25L23 31" stroke="white"></path>
              </svg>
             
            </div>
            <!-- <button @click="goVideo">
            <img src="@assets/images/wmIndex/Frame.png" alt="" />
            <div>
              Learn more
            </div>
          </button> -->
            <div>
              <button @click="checkVideoFun">
                <img src="@assets/images/wmIndex/Frame.png" alt="" />
                <div>
                  {{ $t("learnmore[0]") }}
                </div>
              </button>

              <div
                class="mask"
                v-if="videoState == true"
                @click="masksCloseFun"
              ></div>

              <div class="videomasks" v-if="videoState == true">
                <video
                  src="https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4"
                  controls="controls"
                  autoplay
                  v-if="nowLang == 'cn'"
                />
                <video
                  src="https://www.uenc.io/video/yingwen.mp4"
                  controls="controls"
                  autoplay
                  v-else
                />
              </div>
            </div>
          </div>
          <div>
            <img src="@assets/images/wmIndex/Frame(1).png" class="svg_img" />
          </div>
        </div>
      </div>
      <div class="index_project">
        <div class="index_projectz">
          <div class="title">
            <div>{{ $t("project[0]") }}</div>
            <div>
              {{ $t("project[1]") }}
            </div>
          </div>
          <div class="detail">
            <div class="detail_top">
              <div class="detail_top_left">
                <img src="@assets/images/wmIndex/Icon.png" />
                <div class="detail_top_top2">
                  <div>
                  <countTo :startVal='startVal' :endVal='columndata1' :duration='2000' autoplay></countTo>
                   
                  </div>

                  <div>
                    {{ $t("height[0]") }}
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
                    {{ $t("number[0]") }}
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
                    {{ $t("jiangli[0]") }}
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
                    {{ $t("sum[0]") }}
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
            <div>{{ $t("Technical[0]") }}</div>
            <div>
              {{ $t("Technical[1]") }}
            </div>
          </div>
          <div class="advantage_detail">
            <ul class="advantage_detail_ul1">
              <li>
                <div>
                  <img src="@assets/images/wmIndex/Vector.png" alt="" />
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
            <img
              src="@assets/images/wmIndex/Layer 2.png"
              class="media_imgtop"
            />
            <div class="media_content_content">
              <img src="@assets/images/wmIndex/“2.png" alt="" />
              <div class="contentz">
                To quickly start my startup landing page design, I was looking
                for a landing page UI Kit. Landify is one of the best landing
                page UI kit I have come across. It’s so flexible, well organised
                and easily editable.
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
            <img
              src="@assets/images/wmIndex/Vector3.png"
              class="media_imgtop"
            />
            <div class="media_content_content">
              <img src="@assets/images/wmIndex/“2.png" alt="" />
              <div class="contentz2">
                I used landify and created a landing page for my startup within
                a week. The Landify UI Kit is simple and highly intuitive, so
                anyone can use it.
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
            <div>{{ $t("contactus[0]") }}</div>
            <div>
              {{ $t("contactus[1]") }}
            </div>
          </div>
          <div class="index_form">
            <div class="index_line1">
              <div>
                <span>
                  {{ $t("contactus[2]") }}
                  <span style="color:red">*</span></span
                ><br />
                <input
                  :class="{ indexblue: nameblue }"
                  type="text"
                  :placeholder="$t('contactus[2]')"
                  v-model="ruleForm.name"
                  @focus="nameFocus"
                  @blur="nameBlur"
                />
              </div>
              <div>
                <span>
                  {{ $t("contactus[3]") }}
                  <span style="color:red">*</span></span
                ><br />
                <input
                  :class="{ indexblue: emailblue }"
                  type="text"
                  :placeholder="$t('contactus[3]')"
                  v-model="ruleForm.email"
                  @focus="emailFocus"
                  @blur="emailBlur"
                />
              </div>
            </div>
            <div class="index_line2">
              <div>
                <span> {{ $t("contactus[4]") }}</span
                ><br />
                <input
                  :class="{ indexblue: phoneblue }"
                  type="text"
                  :placeholder="$t('contactus[4]')"
                  v-model="ruleForm.phone"
                  @focus="phoneFocus"
                  @blur="phoneBlur"
                />
              </div>
            </div>
            <div class="index_line3">
              <div>
                <span>
                  {{ $t("contactus[5]") }}
                  <span style="color:red">*</span></span
                ><br />
                <textarea
                  :class="{ indexblue: mindblue }"
                  :placeholder="$t('contactus[5]')"
                  v-model="ruleForm.advice"
                  @focus="mindFocus"
                  @blur="mindBlur"
                >
                </textarea>
              </div>
            </div>
          </div>
          <div class="index_button" @click="submitForm">
            <span> {{ $t("submit[0]") }}</span>
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
            {{ $t("learnmore[0]") }}
          </div>
        </div>
      </div>
      <div class="index_partner">
        <div class="index_partnerz">
          <div class="partner_title">
            {{ $t("Partner[0]") }}
          </div>
          <VueSlickCarousel
            :arrows="false"
            :autoplay="false"
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
                  <img src="@assets/images/wmIndex/partner/1.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/2.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/3.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/4.png" alt="" />
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <img src="@assets/images/wmIndex/partner/5.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/6.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/7.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/8.png" alt="" />
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <img src="@assets/images/wmIndex/partner/9.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/10.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/11.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/12.png" alt="" />
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <img src="@assets/images/wmIndex/partner/13.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/14.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/15.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/16.png" alt="" />
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <img src="@assets/images/wmIndex/partner/17.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/18.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/19.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/20.png" alt="" />
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <img src="@assets/images/wmIndex/partner/21.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/22.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/23.png" alt="" />
                </li>
                <li>
                  <img src="@assets/images/wmIndex/partner/24.png" alt="" />
                </li>
              </ul>
            </div>
          </VueSlickCarousel>
          <div class="carousel_bottom">
            <img src="@assets/images/wmIndex/left.png" @click="leftMove" />
            <span>{{ carsoulitem }}/6</span>
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
  </div>
</template>

<script>
import countTo from 'vue-count-to';
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
      startVal: 0,
        endVal: 2017,
      videoState: false,
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

  components: { VueSlickCarousel,countTo },
  beforeRouteEnter(to, from, next) {
    //console.log(to);
    next();
  },
  created() {
    //  window.setInterval(() => {
    //   setTimeout(this.getHomeData(), 0);
    // }, 300000);
    this.carsoulitem = 1;

    this.username = window.sessionStorage.getItem("username");
    // console.log(this.username);
    this.nowLang = this.$i18n.locale;
    //console.log(this.nowLang);
    // 视频语言的切换
    if (this.$i18n.locale == "cn") {
    } else {
    }
    // 滚动设置
    //window.addEventListener("scroll", this.getScroll);
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
//     ceshi(){
// console.log('11');
//   that.$http
//           .post(`${BASEURL}` + "/weimioffice/web/content/callback", data, {
//             headers: { language: this.nowLang },
//           })
//           .then((res) => {
//             console.log(res);
           
//           })
//           .catch((err) => {
            
//             console.log(err);
//           });
//     },
    drag(e) {
      const el = document.getElementById("app1");
      var disx = e.pageX - el.offsetLeft;
      var disy = e.pageY - el.offsetTop;
      document.onmousemove = function(e) {
        el.style.left = e.pageX - disx + "px";
        el.style.top = e.pageY - disy + "px";
      };
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    },

    // 获取滚动高度，设置图片飞入飞出
    getScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //console.log(this.scrollTop);

      if (this.scrollTop > 333 && this.scrollTop < 1200) {
        $(".index_project").addClass("animated fadeInUp ");
      } else {
        $(".index_project").removeClass("animated fadeInUp ");
      }

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
    checkVideoFun(videos) {
      this.videoState = true;
      this.videoSrc = videos;
    },
    masksCloseFun() {
      this.videoState = false;
    },
    toDeveloper() {
      this.$router.push({
        path: "/developer",
        query: {},
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
    // goVideo() {
    //   this.$alert(
    //     ' <div style="width:100%;height:100%"><video style="width:100%;height:700px;object-fit:fill;" src="https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4" controls="controls" autoplay></video></div>',
    //     {
    //       dangerouslyUseHTMLString: true,
    //       showConfirmButton: false,
    //       showClose: false,
    //       closeOnClickModal: true,
    //     }
    //   )
    //     .then(() => {})
    //     .catch((e) => e);

    //   // if (this.$i18n.locale == "cn") {
    //   //   window.open(
    //   //     "https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4"
    //   //   );
    //   // } else {
    //   //   window.open("https://www.uenc.io/video/yingwen.mp4", "_self");
    //   // }
    // },
    indexDisplay() {
      if (this.$refs.headertop._data.iconshow) {
        this.$refs.headertop._data.iconshow = false;
      }
    },
    // // 头部公共部分
    // logins() {
    //   this.$store.dispatch("loginShow");
    //   this.$store.commit("numberShow");
    // },
    // register() {
    //   this.$store.dispatch("loginShow");
    //   this.$store.commit("numberShow2");
    // },
    // leavelogin() {
    //   // 清除缓存
    //   window.sessionStorage.clear();
    //   this.$store.commit("leavelogin");
    // },
    // gotochainexplor() {
    //   window.open("http://www.uenc.io/chainExplorer/index.html#/");
    // },
    // playvideo1() {
    //   var indexvideo = document.getElementById("indexvideo");
    //   if (indexvideo.requestFullscreen) {
    //     indexvideo.requestFullscreen();
    //   } else if (indexvideo.mozRequestFullScreen) {
    //     indexvideo.mozRequestFullScreen();
    //   } else if (indexvideo.webkitRequestFullScreen) {
    //     indexvideo.webkitRequestFullScreen();
    //   }
    //   indexvideo.play();
    //   this.startstop = false;
    // },
    // playvideo11() {
    //   var indexvideo = document.getElementById("indexvideo");
    //   this.startstop = true;
    //   indexvideo.pause();
    // },
    // fullScreen() {
    //   const player = this.$refs.videoPlayer.player;
    //   player.requestFullscreen(); //调用全屏api方法
    //   player.isFullscreen(true);
    //   player.play();
    // },
    // onPlayerPlay(player) {
    //   this.full(player);
    // },
    // onPlayerPause(player) {
    //   // alert("pause");
    // },
    // onPlayerFullScreenchange(player) {
    //   player.exitFullscreen(); //强制退出全屏，恢复正常大小
    //   this.videoDialogVisible = true;
    // },
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

            this.columndata1 = Number(res.data.result[0])
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
<style lang='less'>
@import './index.less';
</style>