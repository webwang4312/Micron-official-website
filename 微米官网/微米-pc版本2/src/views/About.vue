<template>
  <div class="about">
    <div class="about_top">
      <div class="about_top_content">
        <p>Capture your next leads</p>
        <p>
          This is a lead capture oriented landing page template, hence the name.
        </p>
      </div>
    </div>
    <div class="about_swiper">
      <div class="team">{{ $t("aboutcontent[0]") }}</div>
      <div id="root" style="overflow: hidden">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in human" :key="item.id">
              <div class="swiper_gray">
                <img src="@assets/images/wmAbout/left.png" class="leftimg" />
                <div v-if="nowLang == 'cn'" class="humancontent">
                  {{ item.detail }}
                  <!-- I used landify and created a landing page for my startup
                  within a week. The Landify UI Kit is simple and highly
                  intuitive, so anyone can use it.I used landify and created a
                  landing page for my startup within a week. The Landify UI Kit
                  is simple and highly intuitive, so anyone can use it. -->
                </div>
                <div v-else class="humancontent">
                  {{ item.detail2 }}
                  <!-- I used landify and created a landing page for my startup
                  within a week. The Landify UI Kit is simple and highly
                  intuitive, so anyone can use it.I used landify and created a
                  landing page for my startup within a week. The Landify UI Kit
                  is simple and highly intuitive, so anyone can use it. -->
                </div>

                <img src="@assets/images/wmAbout/right.png" class="rightimg" />
              </div>
              <div class="human_img"></div>
              <div class="human_img_content">
                <div v-if="nowLang == 'cn'" class="humanname">
                  {{ item.name }}
                </div>
                <div v-else class="humanname">
                  {{ item.name2 }}
                </div>
                <div v-if="nowLang == 'cn'" class="humanzhiwei">
                  {{ item.zhiwei }}
                </div>
                <div v-else class="humanzhiwei">
                  {{ item.zhiwei2 }}
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> -->
        </div>
      </div>
      <!-- <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in images"
            :key="index"
          >
            <img class="swiper-img" :src="item" />
          </div>
        </div>
      </div> -->
    </div>
    <div class="about_video">
      <div class="video_content">
        <div class="content_top">
          <div>
            <img src="@assets/images/wmAbout/Group1.png" alt="" />
          </div>
          <div>
            <p>
              {{ $t("aboutdescription[0]") }}
            </p>
            <p>
              {{ $t("aboutdescription[1]") }}
            </p>
            <div>
              <button @click="checkVideoFun" class="button">
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
        </div>
        <div class="content_bottom">
          <div>
            <p>
              {{ $t("aboutdescription[2]") }}
            </p>
            <p>
              {{ $t("aboutdescription[3]") }}
            </p>
            <div>
              <button @click="checkVideoFun2" class="button">
                <img src="@assets/images/wmIndex/Frame.png" alt="" />
                <div>
                  {{ $t("learnmore[0]") }}
                </div>
              </button>

              <div
                class="mask"
                v-if="videoState2 == true"
                @click="masksCloseFun2"
              ></div>

              <div class="videomasks" v-if="videoState2 == true">
                <video
                  src="https://pili-vod.uenc.net/uencVideo2.mp4"
                  controls="controls"
                  autoplay
                  v-if="nowLang == 'cn'"
                />
                <video
                  src="https://pili-vod.uenc.net/uencVideo2En.mp4"
                  controls="controls"
                  autoplay
                  v-else
                />
              </div>
            </div>
          </div>
          <div>
            <img src="@assets/images/wmAbout/Apple TV 1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="about_media">
      <div class="media_content">
        <div class="media_left">
          <!-- <img src="@assets/images/wmAbout/video3.png" alt="" @click="checkVideoFun2"/> -->

          <video
            src="https://pili-vod.uenc.net/uencVideo3.mp4"
            controls
            style="width:580px;height:332px"
            v-if="nowLang == 'cn'"
          />
          <video
            src="https://pili-vod.uenc.net/uencVideo3En.mp4"
            controls
            style="width:580px;height:332px"
            v-else
          />
          <p>{{ $t("aboutdescription[4]") }}</p>
          <p>
            {{ $t("aboutdescription[5]") }}
          </p>
        </div>
        <div class="media_right">
          <p>
            Related media reports
          </p>
          <video
            src="https://pili-vod.uenc.net/uencVideo4.mp4"
            controls
            style="width:580px;height:332px"
            v-if="nowLang == 'cn'"
          />
          <video
            src="https://pili-vod.uenc.net/uencVideo4.mp4"
            controls
            style="width:580px;height:332px"
            v-else
          />
          <p>{{ $t("aboutdescription[6]") }}</p>
          <p>
            {{ $t("aboutdescription[7]") }}
          </p>
        </div>
      </div>
    </div>
    <div class="about_parper">
      <div class="paper_content">
        <div>{{ $t("baipishu[0]") }}</div>
        <div>
          Please fill in the form on the right and we will give you feedback in
          time.
        </div>
        <div class="parper_download" @click="downloadbook">
          <img src="@assets/images/wmAbout/download.png" alt="" />
          <span>{{ $t("baipishu[1]") }}</span>
        </div>
      </div>
    </div>
    <div class="about_year">
      <div class="year_content">
        <div class="year_contentdetail">
          <div class="line"></div>
          <ul>
            <li v-for="item in 5" :key="item">
              <img src="@assets/images/wmAbout/Group 1597.png" />
              <!-- <img src="@assets/images/wmAbout/Group 1597.png"  :class="{scale:item==scale}"/> -->
            </li>
          </ul>
        </div>
        <div id="timeLine" :key="key">
          <div id="cList">
            <div class="year_header">
              <span v-if="yearactive == 0" v-html="`2018 YEAR`"></span>
              <span v-else-if="yearactive == 1" v-html="`2019 YEAR`"></span>
              <span v-else-if="yearactive == 2" v-html="`2020 YEAR`"></span>
              <span v-else-if="yearactive == 3" v-html="`2021 YEAR`"></span>
              <img
                src="@assets/images/wmAbout/Frame 124.png"
                id="btnLeft"
                @click="yearLeft"
              />
              <img
                src="@assets/images/wmAbout/Frame 125.png"
                id="btnRight"
                @click="yearRight"
              />
            </div>

            <div
              style="width: 1200px;margin: 0 auto;position:relative;top:150px"
            >
              <ul id="cUl">
                <li class="year-active">
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[5]") }}</span
                        ><span>{{ $t("jieduancontent[0]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[6]") }}</span
                        ><span>{{ $t("jieduancontent[1]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[7]") }}</span
                        ><span>{{ $t("jieduancontent[2]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[8]") }}</span
                        ><span>{{ $t("jieduancontent[3]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[9]") }}</span
                        ><span>{{ $t("jieduancontent[4]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[0]") }}</span
                        ><span>{{ $t("jieduancontent[5]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[1]") }}</span
                        ><span>{{ $t("jieduancontent[6]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[2]") }}</span
                        ><span>{{ $t("jieduancontent[7]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[3]") }}</span
                        ><span>{{ $t("jieduancontent[8]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[0]") }}</span
                        ><span>{{ $t("jieduancontent[9]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[1]") }}</span
                        ><span>{{ $t("jieduancontent[10]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[4]") }}</span
                        ><span>{{ $t("jieduancontent[11]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[6]") }}</span
                        ><span>{{ $t("jieduancontent[12]") }}</span>
                      </p>
                      <p>
                        <span>Q4</span
                        ><span>{{ $t("jieduancontent[13]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[0]") }}</span
                        ><span>{{ $t("jieduancontent[14]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[1]") }}</span
                        ><span>{{ $t("jieduancontent[15]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[3]") }}</span
                        ><span>{{ $t("jieduancontent[16]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="year_heade">
          2018 YEAR
          <img src="@assets/images/wmAbout/Frame 124.png" @click="leftMove" />

          <img src="@assets/images/wmAbout/Frame 125.png" @click="rightMove" />
        </div>
        <el-carousel
          :autoplay="false"
          ref="elcarousel"
          @change="carouselChange"
        >
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel> -->
      </div>
    </div>
  </div>
</template>

<script>
import { BASEURL } from "@api/api";
import VueSlickCarousel from "vue-slick-carousel";
import swiper from "@components/common/swiper";
import "../assets/timer/css/timeline.less";
import "../assets/timer/js/jquery.min";
import "../assets/timer/js/jquery-timeLine";
import { human } from "../components/human";
import { step } from "../components/step";
// import {
//   GET,
//   GETINDEX,
//   GETRECOMMEND,
//   GETNEWS,
//   DOWNBAIPISHU,
// } from "@network/api/api";
export default {
  name: "about",
  data() {
    return {
      scale: "",
      videoState: false,
      videoState2: false,
      // 媒体推荐位信息
      recommendlist: [{ title: "" }, { title: "" }, { title: "" }],
      yearactive: 0,
      nowLang: "",
      moveleft: false,
      abouttrue: false,
      human: [],
      step: [],
      fullscreenLoading: false,
      show: false,
      // 视频播放
      videosource: [{ src: "" }, { src: "" }, { src: "" }, { src: "" }],
      startstop1: true,
      startstop2: true,
      startstop3: true,
      startstop4: true,
    };
  },
  components: { swiper, VueSlickCarousel },
  created() {
    this.getindexrecommend();
    // 强制刷新一次
    // if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   location.reload();
    // }
    this.nowLang = this.$i18n.locale;
    this.timeIndex = 0;
    //console.log(this.nowLang);
    if (this.nowLang == "cn") {
      this.abouttrue = true;
      this.videosource[0].src =
        "https://www.uenc.io/video/8db3eb0b75e94328a2304256012f98b6.mp4";
      this.videosource[1].src = "https://pili-vod.uenc.net/uencVideo2.mp4";
      this.videosource[2].src = "https://pili-vod.uenc.net/uencVideo3.mp4";
      this.videosource[3].src = "https://pili-vod.uenc.net/uencVideo4.mp4";
    } else if (this.nowLang == "en") {
      this.abouttrue = false;
      this.videosource[0].src = "https://www.uenc.io/video/yingwen.mp4";
      this.videosource[1].src = "https://pili-vod.uenc.net/uencVideo2En.mp4";
      this.videosource[2].src = "https://pili-vod.uenc.net/uencVideo3En.mp4";
      this.videosource[3].src = "https://pili-vod.uenc.net/uencVideo4.mp4";
    }
    this.human = human;
    // this.step = step;
  },
  computed: {},
  mounted() {
    //  this.$nextTick(()=>{
    //     new Swiper('.swiper-container', {
    //       loop: true, // 循环模式选项
    //       loopedSlides: 5,
    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination',
    //       },
    //     })
    //   })
    var swiper = new Swiper(".swiper-container", {
      // pagination: '.swiper-pagination',
      // nextButton: ".swiper-button-next",
      // prevButton: ".swiper-button-prev",
      
      loop: true,
      grabCursor: true,
      //pagination: ".pagination", // 定义一个Swiper的分页器。默认会在这个分页器里面生成与slide对应的span标签
      paginationClickable: true, // 值为true时，点击分页器的指示点时会发生Swiper。
      centeredSlides: true,
      slidesPerView: "auto",
      slideToClickedSlide: true,
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      coverflow: {
        stretch: 0,
        modifier: 1,
        slideShadows: false,
      },
    });
    this.step = step;
    $(function() {
      $("#timeLine").timeLine({
        w: 1200, //每一个li的宽度
        //            btnPrev:"#btnLeft",      //上一个按钮
        //            btnNext: "#btnRight",  //下一个按钮
        //            dateBox:"#yearList", //日期的ul盒子
        //            dateArr: "#yearList li", //保存每一个日期的数组
        //            conBox:"#cUl",  //保存切换内容的ul盒子
        //            conArr:"#cUl li" //保存每一个内容的数
      });
    });
  },
  activated() {
    $(function() {
      $("#timeLine").timeLine({
        w: 1200, //每一个li的宽度
        //            btnPrev:"#btnLeft",      //上一个按钮
        //            btnNext: "#btnRight",  //下一个按钮
        //            dateBox:"#yearList", //日期的ul盒子
        //            dateArr: "#yearList li", //保存每一个日期的数组
        //            conBox:"#cUl",  //保存切换内容的ul盒子
        //            conArr:"#cUl li" //保存每一个内容的数
      });
    });
    // this.window.onload();
    // if (!this.$route.meta.isBack || this.isFirstEnter) {
    //   this.initData(); // 这里许要初始化dada()中的数据
    //   this.getDataFn(); // 这里发起数据请求，（之前是放在created或者mounted中，现在只需要放在这里就好了，不需要再在created或者mounted中请求！！）
    // }
    // this.$route.meta.isBack = false; //请求完后进行初始化
    // this.isFirstEnter = false; //请求完后进行初始化
  },

  methods: {
    checkVideoFun(videos) {
      this.videoState = true;
    },
    masksCloseFun() {
      this.videoState = false;
    },
    checkVideoFun2(videos) {
      this.videoState2 = true;
    },
    masksCloseFun2() {
      this.videoState2 = false;
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
          //console.log(res);
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
    yearLeft() {
      this.yearactive -= 1;
      if (this.yearactive < 0) {
        this.yearactive = 3;
      }
      // this.scale=this.yearactive+1
    },
    yearRight() {
      this.yearactive += 1;
      if (this.yearactive >= 4) {
        this.yearactive = 0;
      }
      // this.scale=this.yearactive+1
    },
    carouselChange(index) {
      //console.log(index);
    },
    leftMove() {
      this.$refs.elcarousel.prev();
    },
    rightMove() {
      this.$refs.elcarousel.next();
    },

    prevent() {
      //console.log(this.$refs.img);
      //console.log(this.$refs.issues.style.marginLeft);
      // console.log(this.$refs.issuesli.style);
      // if(this.$refs.issues.style.marginLeft>'-2240px'){
      //   this.$refs.issues.style.marginLeft='0px';
      //  this.$refs.issuesli.style.fontSize='60px'
      // }
    },
    downloadbook() {
      if (this.nowLang == "cn") {
        window.open("http://47.75.93.221/video/baipishu.pdf");
      } else {
        window.open("http://47.75.93.221/video/baipishu.pdf");
      }
    },
    playvideo1() {
      var myVideo1 = document.getElementById("video1");
      if (myVideo1.requestFullscreen) {
        myVideo1.requestFullscreen();
      } else if (myVideo1.mozRequestFullScreen) {
        myVideo1.mozRequestFullScreen();
      } else if (myVideo1.webkitRequestFullScreen) {
        myVideo1.webkitRequestFullScreen();
      }
      myVideo1.play();
      // myVideo1.requestFullscreen();
      // myVideo1.mozRequestFullScreen();
      // myVideo1.webkitRequestFullScreen();
      this.startstop1 = false;
    },
    playvideo11() {
      var myVideo1 = document.getElementById("video1");
      this.startstop1 = true;
      myVideo1.pause();
    },
    playvideo2() {
      var myVideo2 = document.getElementById("video2");
      if (myVideo2.requestFullscreen) {
        myVideo2.requestFullscreen();
      } else if (myVideo2.mozRequestFullScreen) {
        myVideo2.mozRequestFullScreen();
      } else if (myVideo2.webkitRequestFullScreen) {
        myVideo2.webkitRequestFullScreen();
      }
      myVideo2.play();
      this.startstop2 = false;
    },
    playvideo22() {
      var myVideo2 = document.getElementById("video2");
      this.startstop2 = true;
      myVideo2.pause();
    },
    playvideo3() {
      var myVideo3 = document.getElementById("video3");
      if (myVideo3.requestFullscreen) {
        myVideo3.requestFullscreen();
      } else if (myVideo3.mozRequestFullScreen) {
        myVideo3.mozRequestFullScreen();
      } else if (myVideo3.webkitRequestFullScreen) {
        myVideo3.webkitRequestFullScreen();
      }
      myVideo3.play();
      this.startstop3 = false;
    },
    playvideo33() {
      var myVideo3 = document.getElementById("video3");
      this.startstop3 = true;
      myVideo3.pause();
    },
    playvideo4() {
      var myVideo4 = document.getElementById("video4");
      if (myVideo4.requestFullscreen) {
        myVideo4.requestFullscreen();
      } else if (myVideo4.mozRequestFullScreen) {
        myVideo4.mozRequestFullScreen();
      } else if (myVideo4.webkitRequestFullScreen) {
        myVideo4.webkitRequestFullScreen();
      }
      myVideo4.play();
      this.startstop4 = false;
    },
    playvideo44() {
      var myVideo4 = document.getElementById("video4");
      this.startstop4 = true;
      myVideo4.pause();
    },
    pauseVid() {
      myVideo4.pause();
    },

    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
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
@import "../animate.min.css";
.scale {
  transform: scale(2) !important;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #000000;
  opacity: 0.6;
}
// 内容层 z-index要比遮罩大，否则会被遮盖
.videomasks {
  width: 1200px;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
}
.videomasks video {
  width: 100%;
  height: 100%;
}
/*从右到左进入*/
.fadeInRight {
  display: block !important;
  animation-name: fadeInRight !important;
  -webkit-animation: fadeInRight !important;
  animation-timing-function: 20s !important;
}
@keyframes fadeInRight {
  from {
    color: red !important;
    -webkit-transform: translate(1200px, 0);
    transform: stranslate(1200px, 0);
  }
  to {
    color: #30b3f5 !important;
    -webkit-transform: translate(10px, 0);
    transform: stranslate(10px, 0);
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__container button,
.el-carousel__indicators {
  display: none;
}

.year_2018_1_header {
  display: flex;
  flex-direction: row;
  width: 1200px;
  margin: 0 auto 35px;
  background: red;
  .year_2018_1 {
    width: 224px;
    height: 194px;
    background: #f2f2f2;
    border-radius: 20px;
    text-align: center;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
    p:nth-child(1) {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 26px;
      line-height: 36px;
      font-feature-settings: "liga" off;
      margin-bottom: 20px;
      color: #000000;
    }
  }
}

.swiper-container {
  overflow: visible !important;
  width: 1200px;
  min-height: 314px;
  height: auto;
  .swiper-wrapper .swiper-slide {
    width: 700px !important;
    border-radius: 20px;
    min-height: 205px;
    height: auto;

    border-radius: 10px;
    .human_img {
      width: 100px;

      min-height: 100px;
      height: auto;
      background: yellow;

      position: relative;
      top: -50px;
      left: 45%;
      z-index: 9999;
      .humanname {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
      }
      .humanzhiwei {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        color: #30b3f5;
      }
    }
    .human_img_content {
      position: relative;
      top: -38px;
      left: 10px;
      text-align: center;

      .humanname {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
      }
      .humanzhiwei {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        color: #30b3f5;
      }
    }
    .swiper_gray {
      width: 700px;
      min-height: 205px;
      height: auto;

      background: #f5f5f5;
      border-radius: 10px;
      z-index: 1;
      position: relative;
      .humancontent {
        width: 580px;
        padding-top: 38px;
        padding-bottom: 83px;
        margin: 0 auto;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;

        font-feature-settings: "liga" off;

        color: #666666;
        background: #30b3f5;
        z-index: 1;
      }

      .leftimg {
        position: absolute;
        left: 25px;
        top: 20px;
      }
      .rightimg {
        position: absolute;
        left: 652px;
        bottom: 65px;
      }
    }
  }
}

.swiper-container .swiper-wrapper .swiper-slide-prev {
  width: 700px !important;
  margin-top: 18px;
  min-height: 314px !important;
  height: auto;
  opacity: 0.5;
}

.swiper-container .swiper-wrapper .swiper-slide-next {
  width: 700px !important;
  position: relative;
  top: 18px;
  min-height: 284px !important;
  height: auto;
  opacity: 0.5;
}

.swiper-container .swiper-wrapper .swiper-slide-active {
  width: 700px !important;
  margin-right: 30px;
  margin-left: 30px;
}
.about {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 1;
  .about_top {
    position: relative;
    width: 100%;
    height: 600px;
    margin: auto;
    // background: red;
    background: url("../assets/images/wmAbout/aboutheader.png") no-repeat
      center/100% 100%;
    .about_top_content {
      position: relative;
      top: 244px;
      width: 932px;
      height: auto;
      margin: 0 auto;
      text-align: center;
      // background: red;
      p:nth-child(1) {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 70px;
        line-height: 82px;
        text-align: center;
        color: #18191f;
      }
      p:nth-child(2) {
        width: 560px;
        height: 72px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 36px;
        margin: 30px auto 0;
        text-align: center;
        color: #18191f;
        opacity: 0.75;
      }
    }
  }
  .about_swiper {
    width: 100%;
    height: 636px;
    // background: bisque;
    .team {
      width: 1200px;
      position: relative;
      top: 80px;
      margin: 0 auto;
      font-family: Manrope;
      font-style: normal;
      font-weight: 800;
      font-size: 48px;
      line-height: 64px;
      text-align: center;
      font-feature-settings: "liga" off;
      color: #18191f;
    }
    #root {
      position: relative;
      top: 140px;
    }
    .swiper-container {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 15px;
      .swiper-slide {
        width: 50%;
        .swiper-img {
          border-radius: 10px;
          width: 100%;
        }
      }
    }
  }
  .about_video {
    width: 100%;
    height: 962px;
    // background: chocolate;
    .video_content {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      // background: blanchedalmond;
      .content_top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        top: 99px;
        p:nth-child(1) {
          width: 379px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 28px;
          line-height: 37px;
          color: #18191f;
        }
        p:nth-child(2) {
          margin-top: 24px;
          width: 410px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: 0.01em;
          color: #18191f;
        }
        .button {
          margin-top: 24px;
          width: 227px;
          height: 62px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #30b3f5;
          border-radius: 8px;
          font-family: Manrope;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 30px;
          text-align: center;
          font-feature-settings: "liga" off;
          color: #ffffff;
          cursor: pointer;
          img {
            margin-left: 40px;
            margin-right: 10px;
          }
          span {
          }
        }
      }
      .content_bottom {
        position: relative;
        top: 180px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        p:nth-child(1) {
          width: 379px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 28px;
          line-height: 37px;
          color: #18191f;
        }
        p:nth-child(2) {
          margin-top: 24px;
          width: 410px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: 0.01em;
          color: #18191f;
        }
        .button {
          margin-top: 24px;
          width: 227px;
          height: 62px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #30b3f5;
          border-radius: 8px;
          font-family: Manrope;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 30px;
          text-align: center;
          font-feature-settings: "liga" off;
          color: #ffffff;
          cursor: pointer;
          img {
            margin-left: 40px;
            margin-right: 10px;
          }
          span {
          }
        }
      }
    }
  }
  .about_media {
    width: 100%;
    height: 821px;
    // background: gray;
    .media_content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;
      width: 1200px;
      margin: 0 auto;
      // background: yellowgreen;
      .media_left {
        position: relative;
        top: 100px;
        img {
          width: 580px;
          height: 332px;
          border-radius: 10px;
          cursor: pointer;
        }
        p:nth-child(2) {
          width: 379px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 28px;
          line-height: 37px;
          color: #18191f;
          margin-top: 30px;
        }
        p:nth-child(3) {
          width: 410px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 27px;
          color: #18191f;
          margin-top: 16px;
        }
      }
      .media_right {
        position: relative;
        top: 100px;
        img {
          width: 580px;
          height: 332px;
          border-radius: 10px;
          cursor: pointer;
        }
        p:nth-child(1) {
          width: 445px;
          height: 128px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 600;
          font-size: 48px;
          line-height: 64px;
          text-align: right;
          color: #18191f;
          // background: red;
          position: relative;
          left: 135px;
        }
        p:nth-child(3) {
          width: 379px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 28px;
          line-height: 37px;
          color: #18191f;
          margin-top: 30px;
        }
        p:nth-child(4) {
          width: 410px;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 27px;
          color: #18191f;
          margin-top: 16px;
        }
      }
    }
  }
  .about_parper {
    width: 100%;
    height: 458px;
    background: url("../assets/images/wmAbout/8551 1.png") no-repeat center/100%
      100%;
    .paper_content {
      height: 100%;
      width: 1200px;
      margin: 0 auto;
      // background: blanchedalmond;
      div:nth-child(1) {
        position: relative;
        top: 100px;
        width: 100%;
        height: 64px;
        text-align: center;
        font-family: Manrope;
        font-style: normal;
        font-weight: 800;
        font-size: 48px;
        line-height: 64px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
      }
      div:nth-child(2) {
        width: 464px;
        height: 64px;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
        font-feature-settings: "liga" off;
        color: #18191f;
        margin: 108px auto 0;
      }
      .parper_download {
        cursor: pointer;
        margin: 60px auto 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: Manrope;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        width: 201px;
        height: 62px;
        /* Style */
        background: #30b3f5;
        border-radius: 8px;
        img {
          margin-left: 35px;
          margin-right: 5px;
        }
      }
    }
  }
  .about_year {
    width: 100%;
    height: 782px;

    .year_content {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      .slick-slide {
        border: none !important;
        outline-color: white !important;
      }

      .year_contentdetail {
        position: relative;
        top: 453px;
        .line {
          width: 100%;
          height: 0px;

          border: 0.5px solid #bbbbbb;
        }
        ul {
          margin: 0 auto;
          width: 1200px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-top: -15px;
          li {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
