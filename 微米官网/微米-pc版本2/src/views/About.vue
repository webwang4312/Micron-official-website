<template>
  <div class="about">
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
    <!-- 顶部 -->
    <div class="abouttop">
     
      <div class="abouttop-content">
        <div class="about-more">
          <p>{{ $t("recommendtitle[0]") }}</p>
          <!-- <p>{{ $t("recommendshorttitle[0]") }}</p> -->
          <div class="about-button-overflow">
            <div class="about-button-left"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="aboutfooter">
      <!-- 轮播图 -->
      <div class="aboutfooter-swiper">
        <p>{{ $t("aboutcontent[0]") }}</p>
        <div class="about-line"></div>
        <div class="aboutfooter-swiperimg">
          <swiper></swiper>
        </div>
      </div>
      <!-- 视频介绍 -->
      <div class="aboutfooter-video">
        <div class="videozoom">
          <p>{{ $t("aboutcontent[1]") }}</p>
          <div class="about-line"></div>
          <div class="aboutfooter-videoimg">
            <div class="videotop">
              <div class="video1">
                <div class="input-video">
                  <video id="video1" width="386" height="220" controls loop>
                    <source :src="videosource[0].src" type="video/mp4" />
                  </video>
                </div>
                <div class="videocontent1 video-p">
                  <p>{{ $t("aboutdescription[0]") }}</p>
                  <p>
                    {{ $t("aboutdescription[1]") }}
                  </p>
                  <!-- <img
                    src="../assets/images/about/play.png"
                    @click="playvideo1()"
                    v-if="startstop1"
                  />
                  <img
                    src="../assets/images/about/stop.png"
                    v-else
                    id="stop1"
                    @click="playvideo11()"
                  /> -->
                </div>
              </div>
              <div class="video2">
                <div class="input-video2"></div>
              </div>
              <div class="video22">
                <div class="videocontent2 video-p">
                  <p id="videocontent2p1">{{ $t("aboutdescription[8]") }}</p>
                  <p id="videocontent2p2">{{ $t("aboutdescription[9]") }}</p>
                  <br />
                  <p id="videocontent2p3">{{ $t("aboutdescription[10]") }}</p>
                </div>
              </div>
            </div>
            <div class="videofooter">
              <div class="video3">
                <div class="input-video3">
                  <video
                    id="video2"
                    width="386"
                    height="220"
                    style="object-fit: fill;"
                    controls
                    loop
                  >
                    <source :src="videosource[1].src" type="video/mp4" />
                  </video>
                </div>
                <div class="videocontent3 video-p">
                  <p>{{ $t("aboutdescription[2]") }}</p>
                  <p>
                    {{ $t("aboutdescription[3]") }}
                  </p>
                  <!-- <img
                    src="../assets/images/about/play.png"
                    @click="playvideo2()"
                    v-if="startstop2"
                  />
                  <img
                    src="../assets/images/about/stop.png"
                    v-else
                    id="stop2"
                    @click="playvideo22()"
                  /> -->
                </div>
              </div>
              <div class="video4">
                <div class="input-video4">
                  <video
                    id="video3"
                    width="386"
                    height="220"
                    style="object-fit: fill;"
                    controls
                    loop
                  >
                    <source :src="videosource[2].src" type="video/mp4" />
                  </video>
                </div>

                <div class="videocontent4 video-p">
                  <p>{{ $t("aboutdescription[4]") }}</p>
                  <p>
                    {{ $t("aboutdescription[5]") }}
                  </p>
                  <!-- <img
                    src="../assets/images/about/play.png"
                    @click="playvideo3()"
                    v-if="startstop3"
                  />
                  <img
                    src="../assets/images/about/stop.png"
                    v-else
                    id="stop3"
                    @click="playvideo33()"
                  /> -->
                </div>
              </div>

              <div class="video5">
                <div class="input-video5">
                  <video
                    id="video4"
                    width="386"
                    height="220"
                    style="object-fit: fill;"
                    controls
                    loop
                  >
                    <source :src="videosource[3].src" type="video/mp4" />
                  </video>
                </div>
                <div class="videocontent5 video-p">
                  <p>{{ $t("aboutdescription[6]") }}</p>
                  <p>
                    {{ $t("aboutdescription[7]") }}
                  </p>
                  <!-- <img
                    src="../assets/images/about/play.png"
                    @click="playvideo4()"
                    v-if="startstop4"
                  />
                  <img
                    src="../assets/images/about/stop.png"
                    v-else
                    id="stop4"
                    @click="playvideo44()"
                  /> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 技术路线图 -->
    <div class="aboutlast">
      <div class="changxian"></div>

      <div class="aboutlastfooter">
        <p>{{ $t("aboutcontent[2]") }}</p>
        <div class="aboutlast-line"></div>
        <p class="baipishu" @click="downloadbook">{{ $t("baipishu[0]") }}</p>
        <div id="timeLine" :key="key">
          <ul id="yearList">
            <li class="year-active">2018<i class="year-dot"></i></li>
            <li>2019<i class="year-dot"></i></li>
            <li>2020<i class="year-dot"></i></li>
            <li>2021<i class="year-dot"></i></li>
          </ul>
          <div id="cList">
            <img
              src="@assets/images/about/left.png"
              id="btnLeft"
              style="width:24px;height:44px"
            />
            <div
              style="width: 1200px;margin: 0 auto; overflow: hidden;position:relative;top:150px"
            >
              <ul id="cUl">
                <li class="year-active">
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[5]") }}</span
                        ><br /><span>{{ $t("jieduancontent[0]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[6]") }}</span
                        ><br /><span>{{ $t("jieduancontent[1]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[7]") }}</span
                        ><br /><span>{{ $t("jieduancontent[2]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[8]") }}</span
                        ><br /><span>{{ $t("jieduancontent[3]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[9]") }}</span
                        ><br /><span>{{ $t("jieduancontent[4]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[0]") }}</span
                        ><br /><span>{{ $t("jieduancontent[5]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[1]") }}</span
                        ><br /><span>{{ $t("jieduancontent[6]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[2]") }}</span
                        ><br /><span>{{ $t("jieduancontent[7]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[3]") }}</span
                        ><br /><span>{{ $t("jieduancontent[8]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[0]") }}</span
                        ><br /><span>{{ $t("jieduancontent[9]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[1]") }}</span
                        ><br /><span>{{ $t("jieduancontent[10]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[4]") }}</span
                        ><br /><span>{{ $t("jieduancontent[11]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[6]") }}</span
                        ><br /><span>{{ $t("jieduancontent[12]") }}</span>
                      </p>
                      <p>
                        <span>Q4</span><br /><span>{{
                          $t("jieduancontent[13]")
                        }}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="container-li">
                    <div class="c-li-right">
                      <p>
                        <span>{{ $t("jieduan[0]") }}</span
                        ><br /><span>{{ $t("jieduancontent[14]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[1]") }}</span
                        ><br /><span>{{ $t("jieduancontent[15]") }}</span>
                      </p>
                      <p>
                        <span>{{ $t("jieduan[3]") }}</span
                        ><br /><span>{{ $t("jieduancontent[16]") }}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <img
              src="@assets/images/about/right.png"
              id="btnRight"
              style="width:24px;height:44px"
            />
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>

import swiper from "@components/common/swiper";
$(function() {
  //  alert('haha')
});
import "../assets/timer/css/timeline.css";
import "../assets/timer/js/jquery.min";
import "../assets/timer/js/jquery-timeLine";

// import { human } from "../components/human";
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
      startstop4: true,
    };
  },
  components: {  swiper },
  created() {
    // 强制刷新一次
    // if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   location.reload();
    // }
    this.nowLang = this.$i18n.locale;
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
    // this.human = human;
    // this.step = step;
  },
  computed: {},
  mounted() {
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
    gotochainexplor() {
      window.open("http://www.uenc.io/chainExplorer/index.html#/");
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
      window.open("http://47.75.93.221/video/baipishu.pdf");}
      else{
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
    faqs() {
      this.$router.push({
        path: "/FAQ",
      });
    },
    index() {
      this.$router.push({
        path: "/",
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
#stop1 {
  position: absolute;
  left: 319px;
  top: 172px;
}
#stop2 {
  position: absolute;
  left: 319px;
  top: 172px;
}
#stop3 {
  position: absolute;
  left: 319px;
  top: 172px;
}
#stop4 {
  position: absolute;
  left: 319px;
  top: 172px;
}
.baipishu {
  width: 100% !important;
  font-size: 20px !important;
  font-family: PingFang SC;
  font-weight: 400 !important;
  color: rgba(0, 159, 205, 1) !important;
  line-height: 22px !important;
  position: absolute;
  right: 0px;
  top: 48px;
  cursor: pointer;
  margin: 0 auto;
  text-align: right;
}
.el-icon-arrow-right::before {
  display: inline-block;
}
@keyframes colorchange {
  0% {
    background: rgba(51, 51, 51, 1);
  }
  100% {
    background: rgba(0, 159, 205, 1);
  }
}

a {
  text-decoration: none !important;
}
.vjs_video_2263-dimensions.vjs-fluid {
}
.move {
  transform: translateX(200px);
}
#particles-js {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 800px !important;
  z-index: 11; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}

@keyframes aboutslide {
  0% {
    width: 100px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  20% {
    width: 240px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  40% {
    width: 440px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 50px;
  }
  100% {
    width: 600px;
    background: rgba(0, 159, 205, 1);
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
  }
}
// 视频向上
@keyframes opacity {
  0% {
    opacity: 1;
  }
  100% {
    background: rgba(51, 51, 51, 0.7);
    transform: translateY(-215px);
    height: 465px;
    position: absolute;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
// 字向上
@keyframes write {
  0% {
    opacity: 1;
  }
  100% {
    position: absolute;
    top: 72px;
  }
}
.vjs-big-play-button {
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  background-color: #00a2c5 !important;
  border: none !important;
}
// {
//   position: relative!important;
//   top: -5px!important;
// }
#video1 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#video3 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#video4 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#video2 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.video1 .input-video {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgba(0, 0, 0);
}
.video-player {
  height: 50px !important;
  border-radius: 20px;
}
.video-p {
  position: relative;
  top: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.video-p img {
  cursor: pointer;
  position: relative;
  left: 318px;
  top: 56px;
}
// 主线
.about {
  width: 100%;
  height: auto;
  position: relative;
  .abouttop {
    height: 800px;
    position: relative;
    background: url("../assets/images/about/aboutbg.png") no-repeat center/100%
      100%;
    // 头部内容区域
    .abouttop-content {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      // 大方块设置
      .about-more {
        width: 600px;
        height: 263px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 50px;
        position: relative;
        left: 600px;
        top: 40px;
        cursor: pointer;
        border-radius: 10px;
        z-index: 20;
        p:first-child {
          z-index: 10;
          position: relative;
          left: 86px;
          top: 38px;
          width: 481px;
          height: 98px;
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 60px;
          opacity: 1;
        }
        p:nth-child(2) {
          z-index: 10;
          position: relative;
          left: 86px;
          top: 96px;
          width: 293px;
          height: 17px;
          font-size: 17px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          opacity: 0.5;
        }
      }
      .about-more:hover {
        .about-button-left {
          // animation: aboutslide 0.5s linear;
          // animation-fill-mode: forwards;
        }
      }
      .about-button-overflow {
        width: 600px;
        height: 263px;
        border-radius: 10px;
        position: relative;
        top: -97px;
        overflow: hidden;
        cursor: pointer;
        opacity: 1;
      }
      .about-button-left {
        width: 5px;
        height: 263px;
        position: relative;
        left: -2px;
        color: rgba(0, 159, 205, 1);
        background: rgba(0, 159, 205, 1);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        overflow: hidden;
        opacity: 1;
      }
      .about-button-left:hover {
        cursor: pointer;
      }
    }
  }
  .aboutfooter {
    width: 100%;
    height: 2023px;
    position: relative;
    background-color: #0c0c0c;
    .aboutfooter-swiper {
      position: relative;
      width: 1200px;
      height: 799px;
      margin: 0 auto;
      z-index: 20;
      p {
        height: 33px;
        font-size: 34px;
        position: relative;
        top: 80px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .about-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 100px;
        background: rgba(0, 159, 205, 1);
      }
      .aboutfooter-swiperimg {
        position: relative;
        top: 99px;
        width: 1200px;
        height: 532px;
        position: relative;

        .el-carousel__indicators {
          position: relative;
          top: -1px;
          left: 0px;
          z-index: 20;
          li {
            button {
              width: 50px;
              height: 2px;
            }
          }
        }
      }
    }
    .aboutfooter-video {
      position: relative;
      width: 100%;
      height: 1205px;
      margin: 0 auto;
      background: #141414;
      .videozoom {
        width: 1200px;
        height: 1356px;
        margin: 0 auto;
        opacity: 1;
        z-index: 20;
        p {
          width: 351px;
          height: 33px;
          font-size: 34px;
          position: relative;
          top: 80px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        .about-line {
          width: 100px;
          height: 2px;
          position: relative;
          top: 100px;
          background: rgba(0, 159, 205, 1);
        }
        .aboutfooter-videoimg {
          .video-p p:nth-child(1) {
            height: 33px;
            position: relative;
            top: 28px;
            left: 30px;
            font-size: 34px;
            font-family: PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 34px;
          }
          .video-p p:nth-child(2) {
            height: 83px;
            font-size: 16px;
            position: relative;
            width: 326px;
            top: 71px;
            left: 30px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }

          .videotop {
            display: flex;
            flex-direction: row;
            position: relative;
            top: 142px;
            z-index: 20;
            .video1 {
              position: relative;
              width: 386px;
              height: 549px;
              .input-video {
                position: relative;
                width: 386px;
                height: 219px;
                margin: 0 auto;
              }
              .videocontent1 {
                position: relative;
                // top: 10px;
                width: 386px;
                height: 245px;
                background: rgba(229, 229, 229, 1);
              }
            }
            .video2 {
              position: relative;
              width: 794px;
              height: 465px;
              left: 20px;
              background: url("../assets/images/about/bg.png") no-repeat
                center/100% 100%;

              .input-video2 {
                position: relative;
                width: 794px;
                height: 300px;
              }
            }
            .video22 {
              width: 794px;
              height: 250px;
              background: rgba(51, 51, 51, 1);
              position: absolute;
              left: 406px;
              top: 216px;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
            }
            .video22:hover {
              animation: opacity 0.5s linear;
              animation-fill-mode: forwards;
              .videocontent2 {
                animation: write 0.5s linear;
                animation-fill-mode: forwards;
              }
            }
            .videocontent2 {
              position: absolute;
              top: -32px;
              width: 794px;
              height: 245px;
              border-radius: 10px;
              #videocontent2p1 {
                position: relative;
                top: 60px;
              }
              #videocontent2p2 {
                position: relative;
                top: 81px;
              }
              #videocontent2p3 {
                position: relative;
                left: 30px;
                top: 60px;
              }
              p {
                width: 734px;
                color: aliceblue;
              }
              p:nth-child(4) {
                width: 734px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 22px;
                position: relative;
                left: 12px;
                top: 10px;
                text-align: left;
              }
            }
          }

          .videofooter {
            position: relative;
            top: 79px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            z-index: 30;
            .video3 {
              position: relative;
              width: 386px;
              height: 549px;

              .input-video3 {
                position: relative;
                width: 386px;
                height: 220px;
                margin: 0 auto;
              }
              .videocontent3 {
                position: relative;
                width: 386px;
                height: 245px;
                background: rgba(229, 229, 229, 1);
              }
            }
            .video4 {
              position: relative;
              width: 386px;
              height: 549px;
              border-radius: 10px;
              .input-video4 {
                position: relative;
                width: 386px;
                height: 220px;
                margin: 0 auto;

                border-radius: 10px;
              }
              .videocontent4 {
                position: relative;
                width: 386px;
                height: 245px;
                background: rgba(229, 229, 229, 1);
              }
            }
            .video5 {
              position: relative;
              width: 386px;
              height: 549px;

              border-radius: 10px;
              .input-video5 {
                position: relative;
                width: 386px;
                height: 220px;
                margin: 0 auto;
              }
              .videocontent5 {
                position: relative;
                width: 386px;
                height: 245px;
                background: rgba(229, 229, 229, 1);
              }
            }
          }
        }
      }
    }
  }
  .aboutlast {
    width: 100%;
    height: 809px;
    position: relative;
    top: 0px;
    background: url("../assets/images/about/aboutbg4.png") no-repeat center/100%
      100%;
    z-index: 20;
    margin: 0 auto;
    .aboutlastfooter {
      width: 1200px;
      height: 970px;
      margin: 0 auto;
      p {
        width: 388px;
        height: 33px;
        font-size: 34px;
        position: relative;
        top: 74px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .el-steps {
        position: relative;
        top: 374px;
      }
      .aboutlast-line {
        width: 100px;
        height: 2px;
        position: relative;
        top: 94px;
        background: rgba(0, 159, 205, 1);
      }
      .left {
        position: relative;
        left: 488px;
        top: 100px;
      }
      .right {
        position: relative;
        left: 666px;
        top: 100px;
      }
      #circle {
        position: relative;
        left: 30px;
        top: 260px;
      }
      .el-step__description {
        position: relative;
        top: -240px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        transform: rotate(-90deg);
      }
      .is wait {
        color: red !important;
      }
      .el-step__main {
        position: relative;
        top: 100px;
      }
      .el-step__title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
    }

    .changxian {
      width: 1200px;
      height: 3px;
      position: relative;
      top: 424px;
      margin: 0 auto;
      background: url("../assets/images/about/juxing.png") no-repeat center/100%
        100%;
    }
  }
}

</style>
