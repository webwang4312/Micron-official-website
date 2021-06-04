<!--
 * @Author: yaoyuting
 * @Date: 2021-04-11 18:24:56
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 19:49:54
 * @Descripttion: 
-->
<template>
  <div class="Blog">
    <div class="l">
      <div class="level2title">{{ $t("index.Blog") }}</div>
      <router-link to="/pc/Blog" class="btn_style_none"
        >{{ $t("index.EnterBlog") }} <i class="el-icon-right"></i
      ></router-link>
    </div>
    <div class="w1352 box-card box-card-p20">
      <!-- <div class="footerUser">
                <span>{{ blog.createBy }}</span
                >{{ blog.createTime.split(" ")[0] }}
              </div> -->
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="blog in blogList" :key="blog.blogId">
          <div class="item" @click="detalis(blog)">
            <div class="images">
             <img :src="blog.imagesEn" v-if="$t('index.switch') == 'en'">
              <img :src="blog.images" v-else />
            </div>
            <div class="m">
              <div class="level4title">
                {{
                  $t("index.switch") === "en"
                    ? blog.blogTitleEn
                    : blog.blogTitle
                }}
              </div>
              <div
                class="content"
                v-html="blog.textEn"
                v-if="$t('index.switch') == 'en'"
              >
                <!-- {{ $t("index.switch") === "en" ? blog.textEn : blog.text }} -->
              </div>
              <div class="content" v-html="blog.text" v-else></div>
            </div>
            <div class="footerUser">
                <span>{{ blog.createBy }}</span
                >{{ blog.createTime.split(" ")[0] }}
              </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// import VueSlickCarousel from 'vue-slick-carousel';
//   import 'vue-slick-carousel/dist/vue-slick-carousel.css';
//   // optional style for arrows & dots
//   import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper.less";
export default {
  props: {
    blogList: {
      type: Array,
    },
  },
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
      swiperOptions: {
        autoplay: {
          delay: 3000, //
        },
        slidesPerView: 3,
        loop: true,
        spaceBetween: 75,
      },
      timer: null,
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    init() {
      this.count = this.count++;
      this.timer = setInterval(() => {
        this.swiper.slideNext(500);
      }, 3000);
    },
    detalis(blog) {
      this.$router.push({
        path: "/pc/Blog/Details",
        query: { id: blog.blogId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Blog {
  padding: 100px 0 200px;
  background: url("../../../assets/images/index/indblog.png") no-repeat
    center/100% 100%;

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 40px;
  }
  .swiper-slide {
    width: 350px !important;
  }
  .swiper-slide-active {
  }
  .swiper-slide-prev,
  .swiper-slide-next {
  }
  .l {
    width: 1200px;
    height: 66px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto 30px;
    .level2title {
      font-size: 50px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 66px;
      color: #333333;
    }
    .btn_style_none {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6624fa;
      line-height: 28px;
    }
  }
  .box-card {
    display: flex;

    margin: 0 auto;

    .item {
      width: 350px !important;
      cursor: pointer;
      width: 100%;
      padding: 0;

      .images {
        width: 350px;

        img {
          height: 240px;
          width: 350px;
          border-radius: 15px;
        }
      }
      .m {
        width: 100%;
      }
      .level4title {
        font-size: 26px;
        color: #333333;
        margin-top: 20px;
        line-height: 37px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .content {
        font-size: 16px;
        height: 74px;
        margin-top: 10px;
        line-height: 24px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        
      }
      .footerUser {
       font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 21px;
color: #666666;
opacity: 1;
        display: flex;
        justify-content: space-between;
      margin-top: 15px;
      }
    }
    .pr::-webkit-scrollbar {
      display: none;
    }
    .btn {
      text-align: center;
      padding-bottom: 5px;
    }
  }
}
</style>
<style lang="less">
.content {
  span{
            // background-color: white!important;
          }
}
</style>
