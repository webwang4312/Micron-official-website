<template>
  <div class="about">
    <slider></slider>
    <div
      class="aboutheader"
      @click="showSliderFalse"
     
    >
      <p>{{ $t("recommendtitle[0]") }}</p>
      <button @click="learnmore">
        <span>{{ $t("learnmore[0]") }}</span>
      </button>
    </div>
    <div
      class="abouthuman"
      @click="showSliderFalse"
     
    >
      <p class="partnertitle">{{ $t("aboutcontent[0]") }}</p>
      <div class="videoline"></div>
      <!-- 轮播图 -->
      <div class="aboutfooter-swiper">
        <van-swipe :autoplay="4000" indicator-color="red">
          <van-swipe-item v-for="item in human" :key="item.id">
            <div class="information" v-if="abouttrue">
              <p>{{ item.name }}</p>
              <p>{{ item.zhiwei }}</p>
              <el-popover
                placement="left-start"
                width="300"
                trigger="click"
                :content="item.detail"
              >
                <p
                  class="pop"
                  slot="reference"
                  style=" background:#333333!important;border:none"
                >
                  {{ item.detail.substring(0, 80) + "..." }}
                </p>
              </el-popover>
            </div>
            <div class="information" v-else>
              <p>{{ item.name2 }}</p>
              <p>{{ item.zhiwei2 }}</p>
              <el-popover
                placement="left-start"
                width="300"
                trigger="click"
                :content="item.detail2"
              >
                <p
                  class="pop"
                  slot="reference"
                  style=" background:#333333!important;border:none"
                >
                  {{ item.detail2.substring(0, 160) + "..." }}
                </p>
              </el-popover>
            </div>
            <img :src="item.source" alt />
          </van-swipe-item>
        </van-swipe>
        <!-- <el-carousel indicator-position="outside" :interval="3000">
          <el-carousel-item v-for="item in human" :key="item.id">
            <div class="information" v-if="abouttrue">
              <p>{{ item.name }}</p>
              <p>{{ item.zhiwei }}</p>
              <el-popover
                placement="left-start"
                width="300"
                trigger="click"
                :content="item.detail"
              >
                <p
                  class="pop"
                  slot="reference"
                  style=" background:#333333!important;border:none"
                >
                  {{ item.detail.substring(1, 80) + "..." }}
                </p>
              </el-popover>
            </div>
            <div class="information" v-else>
              <p>{{ item.name2 }}</p>
              <p>{{ item.zhiwei2 }}</p>
              <el-popover
                placement="left-start"
                width="300"
                trigger="click"
                :content="item.detail2"
              >
                <p
                  class="pop"
                  slot="reference"
                  style=" background:#333333!important;border:none"
                >
                  {{ item.detail2.substring(1, 160) + "..." }}
                </p>
              </el-popover>
            </div>
            <img :src="item.source" alt />
          </el-carousel-item>
        </el-carousel>-->
      </div>
    </div>
    <div
      class="aboutvideo"
      @click="showSliderFalse"
     
    >
      <p class="videotitle">{{ $t("aboutcontent[1]") }}</p>
      <div class="aboutvideoline"></div>

      <ul class="videoul">
        <li>
          <div class="video1">
            <div class="demo">
              <video-player
                id="video1"
               v-if="!$store.state.slidershow"
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                webkit-playsinline="true"
                x5-playsinline="true"
                x-webkit-airplay="true"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x5-video-ignore-metadata="true"
                x5-video-orientation="landscape"
                style="object-fit:fill"
                :options="playerOptions1"
                :playsinline="true"
                customEventName="customstatechangedeventname"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
              ></video-player>
              <img
                src="../assets/images/about/video1.png"
                v-else
                style="width:167.5px;height:95px"
              />
            </div>

            <div class="videocontent1 video-p">
              <p>{{ $t("aboutdescription[0]") }}</p>
              <el-popover
                placement="top"
                width="200"
                trigger="click"
                :content="$t('aboutdescription[1]')"
                @show="popshow1"
              >
                <p class="pop" slot="reference">
                  {{ $t("aboutdescription[1]").substring(1, 60) + "..." }}
                </p>
              </el-popover>
            </div>
          </div>
        </li>
        <li>
          <div class="video3">
            <div class="demo">
              <video-player
                id="video2"
                class="video-player vjs-custom-skin"
                ref="videoPlayer2"
                v-if="!$store.state.slidershow"
                :playsinline="true"
                :options="playerOptions2"
                @play="playvideo2()"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
              ></video-player>
              <img
                src="../assets/images/about/video2.png"
                alt=""
                v-else
                style="width:167.5px;height:95px"
              />
            </div>
            <div class="videocontent3 video-p">
              <p>{{ $t("aboutdescription[2]") }}</p>
              <el-popover
                @show="popshow2"
                placement="top"
                width="200"
                trigger="click"
                :content="$t('aboutdescription[3]')"
              >
                <p class="pop" slot="reference">
                  {{ $t("aboutdescription[3]").substring(1, 60) + "..." }}
                </p>
              </el-popover>
            </div>
          </div>
        </li>
        <li>
          <div class="video4">
            <div class="demo">
              <video-player
                id="video3"
                class="video-player vjs-custom-skin"
                ref="videoPlayer3"
                :playsinline="true"
                v-if="!$store.state.slidershow"
                :options="playerOptions3"
                @play="playvideo3()"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
              ></video-player>
              <img
                src="../assets/images/about/video3.png"
                alt=""
                v-else
                style="width:167.5px;height:95px"
              />
            </div>

            <div class="videocontent4 video-p">
              <p>{{ $t("aboutdescription[4]") }}</p>
              <el-popover
                @show="popshow3"
                placement="top"
                width="200"
                trigger="click"
                :content="$t('aboutdescription[5]')"
              >
                <p class="pop" slot="reference">
                  {{ $t("aboutdescription[5]").substring(1, 60) + "..." }}
                </p>
              </el-popover>
            </div>
          </div>
        </li>
        <li>
          <div class="video5">
            <div class="demo">
              <video-player
                id="video4"
                class="video-player vjs-custom-skin"
                ref="videoPlayer4"
               v-if="!$store.state.slidershow"
                :playsinline="true"
                :options="playerOptions4"
                @play="playvideo4()"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
              ></video-player>
              <img
                src="../assets/images/about/video4.png"
                v-else
                style="width:167.5px;height:95px"
              />
            </div>
            <div class="videocontent5 video-p">
              <p>{{ $t("aboutdescription[6]") }}</p>
              <el-popover
                @show="popshow4"
                placement="top"
                width="200"
                trigger="click"
                :content="$t('aboutdescription[7]')"
              >
                <p class="pop" slot="reference">
                  {{ $t("aboutdescription[7]").substring(1, 60) + "..." }}
                </p>
              </el-popover>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <v-touch
      @swipeleft="swipeLeft"
      @swiperight="swipeRight"
      :swipe-options="{ direction: 'horizontal' }"
    >
      <div
        class="abouttel"
        @click="showSliderFalse"
      
      >
        <p class="teltitle">{{ $t("aboutcontent[2]") }}</p>
        <div class="telline"></div>
        <ul class="thing">
          <li v-show="li1" :class="{ trans: transright, transed: transleft }">
            <div class="year">
              <span class="years">2018</span>
              <span class="yearday">YEAR</span>
            </div>
            <ul class="yearcontent">
              <li>
                <p>{{ $t("jieduan[5]") }}</p>
                <p>{{ $t("jieduancontent[0]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[6]") }}</p>
                <p>{{ $t("jieduancontent[1]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[7]") }}</p>
                <p>{{ $t("jieduancontent[2]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[8]") }}</p>
                <p>{{ $t("jieduancontent[3]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[9]") }}</p>
                <p>{{ $t("jieduancontent[4]") }}</p>
              </li>
            </ul>
          </li>
          <li v-show="li2" :class="{ trans: transright, transed: transleft }">
            <div class="year">
              <span class="years">2019</span>
              <span class="yearday">YEAR</span>
            </div>
            <ul class="yearcontent">
              <li>
                <p>{{ $t("jieduan[0]") }}</p>
                <p>{{ $t("jieduancontent[5]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[1]") }}</p>
                <p>{{ $t("jieduancontent[6]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[2]") }}</p>
                <p>{{ $t("jieduancontent[7]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[3]") }}</p>
                <p>{{ $t("jieduancontent[8]") }}</p>
              </li>
            </ul>
          </li>
          <li v-show="li3" :class="{ trans: transright, transed: transleft }">
            <div class="year">
              <span class="years">2020</span>
              <span class="yearday">YEAR</span>
            </div>
            <ul class="yearcontent">
              <li>
                <p>{{ $t("jieduan[0]") }}</p>
                <p>{{ $t("jieduancontent[9]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[1]") }}</p>
                <p>{{ $t("jieduancontent[10]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[4]") }}</p>
                <p>{{ $t("jieduancontent[11]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[6]") }}</p>
                <p>{{ $t("jieduancontent[12]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[3]") }}</p>
                <p>{{ $t("jieduancontent[13]") }}</p>
              </li>
            </ul>
          </li>
          <li v-show="li4" :class="{ trans: transright, transed: transleft }">
            <div class="year">
              <span class="years">2021</span>
              <span class="yearday">YEAR</span>
            </div>
            <ul class="yearcontent">
              <li>
                <p>{{ $t("jieduan[0]") }}</p>
                <p>{{ $t("jieduancontent[14]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[1]") }}</p>
                <p>{{ $t("jieduancontent[15]") }}</p>
              </li>
              <li>
                <p>{{ $t("jieduan[3]") }}</p>
                <p>{{ $t("jieduancontent[16]") }}</p>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="circle">
          <li :class="{ lanse: lanse == 1 }"></li>
          <li :class="{ lanse: lanse == 2 }"></li>
          <li :class="{ lanse: lanse == 3 }"></li>
          <li :class="{ lanse: lanse == 4 }"></li>
        </ul>
        <div class="baipishu" @click="downloadbook">
          {{ $t("baipishu[0]") }}
        </div>
      </div>
    </v-touch>
  <v-footer></v-footer>
  
  </div>
</template>

<script>
import slider from "@components/common/slider";
import vFooter from "@components/common/vFooter";
var s = 0;
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import { human } from "../components/human";
import { step } from "../components/step";

export default {
  name: "about",
  data() {
    return {
      playerOptions1: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster: require("../assets/images/about/video1.png"),
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      playerOptions2: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster: require("../assets/images/about/video2.png"),
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      playerOptions3: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster: require("../assets/images/about/video3.png"),
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      playerOptions4: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster: require("../assets/images/about/video4.png"),
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      videoshow1: true,
      videoshow2: true,
      videoshow3: true,
      videoshow4: true,
    
      transright: false,
      transleft: false,
      lanse: "",
      s: 1,
      li1: true,
      li2: false,
      li3: false,
      li4: false,
      short: true,
      sticky: false,
      key: 0,
      active: 0,

      nowLang: "",
      moveleft: false,
      abouttrue: false,
      human: [],
      step: [],
      fullscreenLoading: false,
      aboutcur: 0,
      show: false,
      // 视频播放
      videosource: [{ src: "" }, { src: "" }, { src: "" }, { src: "" }],
      startstop1: true,
      startstop2: true,
      startstop3: true,
      startstop4: true
    };
  },
  components: { videoPlayer, slider, vFooter },
  

  created() {
    
    this.nowLang = this.$i18n.locale;

    this.lanse = 1;
    //console.log(this.nowLang);
    if (this.nowLang == "cn") {
      this.abouttrue = true;
      this.playerOptions1.sources[0].src =
        "http://47.75.93.221/video/8db3eb0b75e94328a2304256012f98b6.mp4";
      this.playerOptions2.sources[0].src =
        "http://pili-vod.uenc.net/uencVideo2.mp4";
      this.playerOptions3.sources[0].src =
        "http://pili-vod.uenc.net/uencVideo3.mp4";
      this.playerOptions4.sources[0].src =
        "http://pili-vod.uenc.net/uencVideo4.mp4";
    } else if (this.nowLang == "en") {
      this.abouttrue = false;
      this.playerOptions1.sources[0].src =
        "http://47.75.93.221/video/yingwen.mp4";
      this.playerOptions2.sources[0].src =
        "http://pili-vod.uenc.net/uencVideo2En.mp4";
      this.playerOptions3.sources[0].src =
        "http://pili-vod.uenc.net/uencVideo3En.mp4";
      this.playerOptions4.sources[0].src =
        "http://pili-vod.uenc.net/uencVideo4.mp4";
    }
    this.human = human;
    this.step = step;
  },

  methods: {
    showSliderFalse() {
      this.$store.commit("showSliderFalse");
      this.$store.commit("menCengHide");
    },
   
    popshow1() {
      this.videoshow1 = false;
    },
    popshow2() {
      this.videoshow2 = false;
    },
    popshow3() {
      this.videoshow3 = false;
    },
    popshow4() {
      this.videoshow4 = false;
    },
    onPlayerPlay(player) {
      console.log(player);
      var myVideo1 = document.getElementById("video1");
      // console.log("video1");
      if (myVideo1.requestFullscreen) {
        myVideo1.requestFullscreen();
      } else if (myVideo1.webkitRequestFullscreen) {
        myVideo1.webkitRequestFullscreen();
      } else if (myVideo1.webkitEnterFullscreen) {
        // iOS进入全屏
        myVideo1.webkitEnterFullscreen();
      } else if (myVideo1.mozRequestFullScreen) {
        myVideo1.mozRequestFullScreen();
      } else {
        myVideo1.msRequestFullscreen();
      }
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    playvideo1() {
      var myVideo1 = document.getElementById("video1");
      myVideo1.requestFullscreen();
      if (myVideo1.requestFullscreen) {
        // 最新标准
        myVideo1.requestFullscreen();
      } else if (myVideo1.webkitRequestFullscreen) {
        myVideo1.webkitRequestFullscreen();
      } else {
        // iOS进入全屏
        myVideo1.webkitEnterFullscreen();
        // 针对iOS监听不到webkitfullscreenchange事件做的兼容，感知退出全屏
        let timer = setInterval(() => {
          if (!myVideo1.webkitDisplayingFullscreen) {
            // 退出了全屏
            clearInterval(timer);
          }
        }, 1000);
      }
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
    },
   
   
    swipeLeft() {
      this.transright = true;
      this.s += 1;
      if (this.s > 4) {
        this.s = 1;
      }
      if (this.s === 1) {
        this.lanse = 1;
        this.li1 = true;
        this.li2 = false;
        this.li3 = false;
        this.li4 = false;
      }
      if (this.s === 2) {
        this.lanse = 2;
        this.li1 = false;
        this.li2 = true;
        this.li3 = false;
        this.li4 = false;
      }
      if (this.s === 3) {
        this.lanse = 3;
        this.li1 = false;
        this.li2 = false;
        this.li3 = true;
        this.li4 = false;
      }
      if (this.s === 4) {
        this.lanse = 4;
        this.li1 = false;
        this.li2 = false;
        this.li3 = false;
        this.li4 = true;
      }
    },
    // 右滑
    swipeRight() {
      this.transleft = true;
      this.s -= 1;
      if (this.s < 1) {
        this.s = 4;
      }
      if (this.s === 1) {
        this.lanse = 1;
        this.li1 = true;
        this.li2 = false;
        this.li3 = false;
        this.li4 = false;
      }
      if (this.s === 2) {
        this.lanse = 2;
        this.li1 = false;
        this.li2 = true;
        this.li3 = false;
        this.li4 = false;
      }
      if (this.s === 3) {
        this.lanse = 3;
        this.li1 = false;
        this.li2 = false;
        this.li3 = true;
        this.li4 = false;
      }
      if (this.s === 4) {
        this.lanse = 4;
        this.li1 = false;
        this.li2 = false;
        this.li3 = false;
        this.li4 = true;
      }
    },

    learnmore() {
      window.open(
        "https://mp.weixin.qq.com/s?__biz=MzUyMTU1NTY5Ng==&mid=2247484931&idx=1&sn=91dcaddee98c13e6c06725a304eb6fcd&chksm=f9d81d9cceaf948aad420aa22b7bc463e3f629e862696eb3e574ca56b4be7a523b68daabf8c3&mpshare=1&scene=1&srcid=07154gMhIKKtwTlrNgO6u9iZ&sharer_sharetime=1594800298815&sharer_shareid=075076a15a657862690d0180ddb3903f&key=e48de8bee8a80c9c5acebe13a30a042386a606043989167fede9e01ef2b1a9415d95d233bf220f6c74bb387526f2c4397803eb414a57612896359a9275f10e286393070d00d2f5d150a57d432748cc42&ascene=1&uin=MjE4Nzc3NzkwMg%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AQUOr446KM5J603N%2FtWmTJc%3D&pass_ticket=qfyOfhiRNshvZQdp%2FSYKDgWCwXETPSmHaPLiir7tnGPbWXehR9Qoa4OTwWK1Mxg1"
      );
    },
    pop() {
      console.log(this.$refs.content[i].innerHTML);
    },
    downloadbook() {
      window.open("http://47.75.93.221/video/baipishu.pdf");
    },

    gotoshow() {
      this.show = true;
    },
    gotohide() {
      this.show = false;
    },
  }
};
</script>
<style lang="less">
.baipishu {
  width: 200px;
  text-align: center;
  margin: 0 auto;
  height: 20px;
  font-size: 14px;
  font-family: "苹方-简";
  font-weight: normal;
  line-height: 20px;
  color: rgba(0, 159, 205, 1);
  opacity: 1;
  position: absolute;
  top: 650px;
}
.el-popover {
  z-index: 30;
}
.vjs-big-play-button {
  width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
  text-align: center;
  border: none !important;
  margin-left: 33% !important;
  margin-top: 10%;
}
.demo {
  display: inline-block;
  width: 167.5px;
  height: 95px;
  border-radius: 4px;
  position: relative;
  margin-right: 4px;
  overflow: hidden;
  z-index: 1;
}
.vjs-volume-panel,
.vjs-playback-rate {
  display: none !important;
}

.about .aboutvideo .videoul li .video-p {
  top: -6px !important;
}
.video1 {
  width: 167.5px !important;
  z-index: 1;
  position: absolute;
  top: 0;
}
.video3 {
  width: 167.5px !important;
  position: absolute;
  z-index: 1;
  top: 0;
}
.video4 {
  width: 167.5px !important;
  position: absolute;
  top: 240px;
  z-index: 1;
}
.video5 {
  width: 167.5px !important;
  position: absolute;
  top: 240px;
  z-index: 1;
}

.mencen {
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.el-popover__reference {
  font-size: 10px !important;
  position: relative;
  width: 137.5px !important;
  top: 15px !important;
}
.van-swipe__track {
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
}
.van-swipe__indicators {
  width: 100%;
  height: 10px;
  position: absolute;
  top: 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-around !important;
  margin: 0 auto;
  i {
    display: inline-block;
    width: 10px;
    height: 1px;
    background: white;
    opacity: 0.3;
  }
}
.van-swipe__indicator--active {
  background-color: #009fcd !important;
  opacity: 1 !important;
}

/*从右到左进入*/
@keyframes fadeInRight {
  from {
    opacity: 1;
    -webkit-transform: translate(1000px, 0);
    transform: translate(1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
  }
}
/*从左到右进入*/
@keyframes fadeInLeft {
  from {
    opacity: 1;
    -webkit-transform: translate(-1000px, 0);
    transform: translate(-1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
  }
}

.trans {
  animation-name: fadeInRight 0.3s linear;
  -webkit-animation: fadeInRight 0.3s linear;
}
.transed {
  animation-name: fadeInLeft 0.3s linear;
  -webkit-animation: fadeInLeft 0.3s linear;
}
.is-active button {
  background: rgba(0, 159, 205, 1) !important;
}
.lanse {
  background: rgba(0, 159, 205, 1) !important;
}
.about {
  width: 100%;
  height: auto;
  background-color: black;
  z-index: 10;
  .aboutheader {
    position: relative;
    top: 0px;
    width: 100%;
    height: 244px;
    background: url("../assets/images/about/蒙版组 3@3x.png") no-repeat
      center/100% 100%;
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
  .abouthuman {
    position: relative;
    width: 100%;
    height: 440px;
    background: rgba(12, 12, 12, 1);
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;
    .partnertitle {
      position: absolute;
      top: 50px;

      text-align: center;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      // background-color: red;
    }
    .videoline {
      width: 60px;
      height: 2px;
      border: 2px solid rgba(0, 159, 205, 1);
      position: absolute;

      top: 82px;
    }
    .aboutfooter-swiper {
      position: absolute;
      top: 120px;
      width: 335px;
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 118px;
        height: 138px;
        position: relative;
        left: 6px;
        top: -230px;
        z-index: 30;
      }
      .information > p:nth-child(1) {
        position: relative;
        left: 130px;
        top: 20px;
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: rgba(0, 159, 205, 1);
        opacity: 1;
        line-height: 22px;
      }
      .information > p:nth-child(2) {
        position: relative;
        width: 190px !important;
        left: 130px;
        top: 20px;
        font-size: 10px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 27px;
        color: rgba(255, 255, 255, 1);
        opacity: 0.5;
        line-height: 22px;
      }
      .information {
        width: 335px !important;
        height: 230px !important;
        position: relative;
        top: 29px;
        background: url("../assets/images/about/组 245@3x.png") no-repeat
          center/100% 100%;
        .pop {
          position: relative;
          left: 130px;
          top: 22px;
          width: 190px !important;
          font-size: 10px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 15px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          line-height: 22px;
          text-indent: left;
        }
      }
      .el-carousel__container {
        width: 100%;
        height: 250px;
        button {
          display: block !important;
        }
        button:first-child {
        }
      }
      .el-carousel__arrow {
        width: 0px;
        height: 0px;
        border: 1px solid snow;
        display: none !important;
        opacity: 0;
        i {
          transform: scale(0);
        }
      }
      .el-carousel--horizontal {
      }
    }
    .el-carousel__indicators {
      width: 335px;
      position: relative;
      top: 0px;
      left: 0px;
      li {
        button {
          width: 10px;
          height: 2px;
        }
      }
    }
  }
  .aboutvideo {
    position: relative;
    width: 100%;
    height: 599px;
    background: #181818;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;
    .videotitle {
      position: absolute;
      top: 50px;
      text-align: center;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    .aboutvideoline {
      width: 60px;
      height: 2px;
      border: 2px solid rgba(0, 159, 205, 1);
      position: absolute;
      top: 82px;
    }
    .videoul {
      position: absolute;
      width: 345px;
      height: 452px;
      top: 97px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      video {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      li {
        width: 167.5px;
        height: 221px;
        margin-top: 9px;
        .video-p {
          position: relative;
          top: 0px;
          height: 126px;
          width: 100%;
          background-color: #e5e5e5;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          p:nth-child(1) {
            width: 150.5px;
            position: relative;
            left: 15px;
            top: 10px;
            font-size: 16px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 15px;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
          p:nth-child(2) {
            width: 137.5px;
            position: relative;
            left: 15px;
            top: 20px;
            font-size: 10px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 15px;
            color: rgba(51, 51, 51, 1);
            opacity: 1;
          }
        }
      }
    }
  }
  .abouttel {
    position: relative;
    width: 100%;
    height: 720px;
    background: #0c0c0c;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;
    .teltitle {
      position: absolute;
      top: 50px;
      text-align: center;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 27px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    .telline {
      width: 60px;
      height: 2px;
      border: 2px solid rgba(0, 159, 205, 1);
      position: absolute;
      top: 82px;
    }
    .thing {
      position: absolute;
      top: 107px;
      width: 315px;
      height: 305px;
      // background-color: yellow;
      li {
        .year {
          // background-color: red;
          .years {
            font-size: 30px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 15px;
            color: rgba(255, 255, 255, 1);
            opacity: 0.61;
          }
          .yearday {
            position: relative;
            left: 5px;
            font-size: 9px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 15px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
          }
        }
        .yearcontent {
          position: absolute;
          width: 315px;
          height: 453px;
          background: rgba(37, 37, 37, 1);
          opacity: 1;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          li {
            margin-top: 15px;
            font-size: 14px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 15px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
            // background-color: red;
            display: flex;
            flex-direction: row;
            p:nth-child(1) {
              width: 50px;
              font-size: 14px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 15px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
              position: relative;
              left: 20px;
              text-align: left;
            }
            p:nth-child(2) {
              position: relative;
              width: 196px;
              left: 50px;
              text-align: left;
              font-size: 14px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 21px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
            }
          }
        }
      }
    }
    .circle {
      width: 160px;
      position: absolute;
      top: 622px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0px auto;
      li {
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        opacity: 0.5;
      }
    }
  }
}
</style>
