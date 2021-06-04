<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 07:52:31
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-17 22:21:28
 * @Descripttion: 
-->
<template>
  <div>
    <div class="Task">
      <div class="task_content">
        <div class="subTitle">{{ $t("Developer.Bounty") }}</div>
        <div class="task_const">
          <div class="title">{{ $t("Developer.Mission") }}</div>
          <div class="tasks" v-if="bountyData">
            <div class="box">
              <div class="l">
                <img src="@/assets/images/index/任务@2x.png" alt="" />
              </div>
              <div class="r">
                <div class="num">{{ bountyData.count }}</div>
                <div class="text">{{ $t("Developer.Total") }}</div>
              </div>
            </div>
            <div class="box">
              <div class="l">
                <img src="@/assets/images/index/完成@2x.png" alt="" />
              </div>
              <div class="r">
                <div class="num">{{ bountyData.end }}</div>
                <div class="text">{{ $t("Developer.Finished") }}</div>
              </div>
            </div>
            <div class="box">
              <div class="l">
                <img src="@/assets/images/index/奖励@2x.png" alt="" />
              </div>
              <div class="r">
                <div class="num">{{ bountyData.reward }}</div>
                <div class="text">{{ $t("Developer.Award") }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="task_list">
          <div class="title task_title">
            {{ $t("Developer.list") }}
            <div v-show="total>3">
              <img src="@/assets/images/left.png" @click="handleClickSlide" />
              <img src="@/assets/images/right.png" @click="handleClickSlide2" />
            </div>
          </div>

          <div class="swiper-box" v-if="total>3">
            <div class="w">
              <swiper class="lists" ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="bount in bountyList" :key="bount.taskId">
                  <div class="box">
                    <div class="box-title">
                      {{
                        $t("index.switch") === "en"
                          ? bount.titleEn
                          : bount.title
                      }}
                    </div>
                    <div class="medile">
                      {{
                        $t("index.switch") === "en"
                          ? bount.introductionEn
                          : bount.introduction
                      }}
                    </div>
                    <div class="bottom">
                      <div class="reward">
                        {{ $t("Developer.reward") }}
                        <span>{{ bount.reward }}</span
                        >UENC
                      </div>
                      <router-link
                        :to="{
                          path: '/pc/Task/Details',
                          query: { id: bount.taskId },
                        }"
                      >
                        <span class="more"
                          >{{ $t("Developer.more")
                          }}<i class="el-icon-right"></i
                        ></span>
                      </router-link>
                    </div>
                  </div>
                </swiper-slide>
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
              </swiper>
            </div>
          </div>
         <div class="swiper-box2" v-if="total<=3&&total>0">
            <div class="w">
              <div class="lists" ref="mySwiper" :options="swiperOptions">
                <div v-for="bount in bountyList" :key="bount.taskId" class="boc2">
                  <div class="box">
                    <div class="box-title">
                      {{
                        $t("index.switch") === "en"
                          ? bount.titleEn
                          : bount.title
                      }}
                    </div>
                    <div class="medile">
                      {{
                        $t("index.switch") === "en"
                          ? bount.introductionEn
                          : bount.introduction
                      }}
                    </div>
                    <div class="bottom">
                      <div class="reward">
                        {{ $t("Developer.reward") }}
                        <span>{{ bount.reward }}</span
                        >UENC
                      </div>
                      <router-link
                        :to="{
                          path: '/pc/Task/Details',
                          query: { id: bount.taskId },
                        }"
                      >
                        <span class="more"
                          >{{ $t("Developer.more")
                          }}<i class="el-icon-right"></i
                        ></span>
                      </router-link>
                    </div>
                  </div>
                </div>
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
              </div>
            </div>
          </div>
          <div class="notask" v-show="total==0">
            <img src="@/assets/images/notask.png"  />
            <div>
             {{ $t("developers[3]") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vulnerability">
      <div class="w1300">
        <div class="box">
          <div class="all_center">
            <img src="@/assets/images/index/安全漏洞奖励@2x.png" alt="" />
          </div>
          <div class="content">
            <div class="title">{{ $t("Developer.Security") }}</div>
            <div class="text">{{ $t("Developer.SecurityText") }}</div>
            <div class="text">{{ $t("Developer.SecurityNote") }}</div>
            <!-- <div class="copy" @click="copyLink">
              {{ $t("Developer.copyEmail") }}<i class="el-icon-right"></i>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetBountyList, GetBountyStatistics } from "@/assets/server/api.js";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper.less";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  data() {
    return {
      total:Number,
      bountyList: [],
      bountyData: null,

      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          // onSlideChangeEnd: (swiper) => {
          //   //这里放swiper的回调方法
          //   console.log(swiper.realIndex);
          // },
          clickable: true, //允许分页点击跳转
        },
        spaceBetween: 50,

        loop: true,
        slidesPerView: "auto",
        loopedSlides:3,
        // slidesPerView:3,
        // initialSlide: 3,
        //slidesPerView: 2.4,
        // Some Swiper option/callback...
      },
      timer: null,
    };
  },
  mounted() {
    this.getBountyList();
    this.getBountyStatistics();
    setTimeout(() => {
      this.swiper.slideTo(3, 0, false);
      this.init();
    }, 3000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    handleClickSlide() {
      this.swiper.slidePrev(500);
      //  mySwiper.slidePrev();
    },
    handleClickSlide2() {
      this.swiper.slideNext(500);
      //  mySwiper.slidePrev();
    },

    init() {
      this.count = this.count++;
      this.timer = setInterval(() => {
        //console.log(this.timer);
        this.swiper.slideNext(500);
      }, 3000);
    },
    copyLink() {
      var link = "tech@uenc.net";
      var newNode = document.createElement("input");
      newNode.value = link;
      document.body.appendChild(newNode);
      newNode.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      newNode.style.display = "none";
      this.$message.success(
        this.$t("index.switch") === "cn" ? "复制成功" : "success"
      );
    },
    async getBountyList() {
      const dataList = await GetBountyList({ pageNo: 1, pageSize: 12 });
      if (dataList.code === 0) {
        this.total=dataList.total;
        // console.log(dataList.total);
        this.bountyList = dataList.rows;
        //console.log(this.bountyList);
      } else {
        this.$message.error(dataList.msg);
      }
    },
    async getBountyStatistics() {
      const data = await GetBountyStatistics();
      if (data.code === 0) {
        this.bountyData = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.recommendPage .swiper-container {
  // position: relative;
  // width: 100%;
  // height: 200px;
  // background: pink;
}
.recommendPage .swiper-container .swiper-slide {
  width: 100%;
  line-height: 200px;
  background: yellowgreen;
  color: #000;
  font-size: 16px;
  text-align: center;
}

.Task {
  border-top: 1px solid #fff;
  background: #FFFFFF;
  overflow-x: hidden;
  .task_content {
    width: 1200px;
   
    margin: 0 auto;

    overflow: hidden;
    .swiper-slide {
      width: 360px !important;
      height: 450px;
      background: #fbf6ff;
    }
    .subTitle {
      margin: 149px 0 81px;
      height: 70px;
      text-align: left;
      font-size: 50px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 66px;
      color: #333333;
    }
    .task_const {
      margin-bottom: 81px;
      .title {
        font-size: 40px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 52px;
        color: #333333;
        text-align: left;

        padding-bottom: 50px;
      }
      .tasks {
        display: flex;
        // justify-content: space-between;
        .box:nth-child(3) {
          margin-right: 0px;
          .l{
             margin-left: 20px;
          }
        }
        .box {
          width: 360px;
          height: 208px;
          background: #fbf6ff;
          opacity: 1;
          display: flex;
         
          justify-content: space-around;
          align-items: center;
          margin-right: 50px;
          .l {
            width: 120px;
            height: 120px;
            background: #e8ddf1;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            // margin-right: 60px;
            img {
              width: 60px;
              height: 60px;
            }
          }
          .r {
            padding: 0 30px;
            display: flex;
            flex-direction: column;
            .text {
            font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 26px;
color: #0D051F;
opacity: 1;
text-align: right;
            }
            .num {
              color: #0d051f;
              font-size: 70px;
            }
          }
        }
      }
    }
    .task_list {
      padding-bottom: 220px;
      .task_title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        img {
          width: 54px;
          height: 54px;
          cursor: pointer;
        }
      }
      .title {
        font-size: 40px;
        text-align: left;
        color: #333333;
        margin-bottom: 50px;
        height: 56px;
      }
      .swiper-box {
        .w {
          width: 100%;
        }
        .lists {
          .box {
            width: 360px;
            height: 450px;
            background: #fbf6ff;
            opacity: 1;
            padding: 50px 40px 40px 40px;
            box-sizing: border-box;
            background: #fbf6ff;

            display: flex;
            flex-direction: column;
            .box-title {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 31px;
              color: #0d051f;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-bottom: 30px;
            }
            .medile {
              flex: 1;
              padding-top: 26px;
              border-top: 1px solid #000;
              font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 32px;
color: #0D051F;
              margin-bottom: 21px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 6;
              overflow: hidden;
            }
            .bottom {
              border-top: 1px solid #000;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .reward {
                font-size: 16px;
                color: #0d051f;
                span {
                  font-size: 50px;
                  color: #0d051f;
                }
              }
              .more {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 21px;
                color: #6624fa;
                cursor: pointer;
              }
            }
          }
        }
      }
        .swiper-box2 {
        .w {
          width: 100%;
        }
        .lists {
           display: flex;
            flex-direction: row;
          .boc2{
           margin-right: 50px;
          }
          .box {
            width: 360px;
            height: 450px;
            background: #fbf6ff;
            opacity: 1;
            padding: 50px 40px 40px 40px;
            box-sizing: border-box;
            background: #fbf6ff;

            display: flex;
            flex-direction: column;
            .box-title {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 31px;
              color: #0d051f;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-bottom: 30px;
            }
            .medile {
              flex: 1;
              padding-top: 26px;
              border-top: 1px solid #000;
              font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 32px;
color: #0D051F;
              margin-bottom: 21px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 6;
              overflow: hidden;
            }
            .bottom {
              border-top: 1px solid #000;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .reward {
                font-size: 16px;
                color: #0d051f;
                span {
                  font-size: 50px;
                  color: #0d051f;
                }
              }
              .more {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 21px;
                color: #6624fa;
                cursor: pointer;
              }
            }
          }
        }
      }
     .notask{
       padding-top: 81px;
       width: 1200px;
       margin: 0 auto;
       display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 35px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 46px;
color: #000000;
opacity: 1;
       img{
         width: 597px;
         height: 438px;
         text-align: center;
       }
     }
    }
  }
}
.vulnerability {
  background-image: url("../../../assets/images/index/devbg3.png");
  background-size: cover;
  background-position: center center;
  padding: 226px 0 280px;
  .box {
    display: flex;
    .content {
      width: 650px;
      margin-left: 192px;
      .title {
        font-size: 50px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 66px;
        color: #333333;
        margin-bottom: 60px;
        // padding: 60px 0;
      }
      .text {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 40px;
        color: #333333;
        margin-bottom: 40px;
      }
      .copy {
        font-size: 16px;
        color: #5432f4;
        cursor: pointer;
      }
    }
  }
  img {
    width: 383px;
    height: 380px;
  }
}
</style>
