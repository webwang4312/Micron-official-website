<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 07:28:54
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 19:13:13
 * @Descripttion: 
-->
<template>
  <div class="Developers">
    <div class="banner">
      <div class="content w1300">
        <div class="title">
          {{ $t("developers[0]") }}<br />
          {{ $t("developers[1]") }}
        </div>
        <a href="http://47.75.93.221/devDocsEn/%E5%BC%80%E5%8F%91%E8%80%85/UENC%20developer" target="_blank"
          >{{ $t("Developer.doc") }} <i class="el-icon-right"></i
        ></a>
        <a target="_blank" href="https://github.com/uenctech"
          >GitHub <i class="el-icon-right"></i
        ></a>
      </div>
    </div>
    <div class="content">
      <More></More>
      <Task></Task>
    </div>
  </div>
</template>

<script>
import More from "@/views/pc/developers/More.vue";
import Task from "@/views/pc/developers/Task.vue";
export default {
  components: {
    More,
    Task,
  },
  created() {
   
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    
    },
  },
};
</script>

<style lang="less" scoped>
.Developers {
  .banner {
    height: 900px;
    background-image: url("https://pili-vod.uenc.net/uenc_pc_devpsHeader.png");
    background-size: cover;
    background-position: center center;
    padding-top: 448px;
    .content {
      width: 1200px;
      margin: 0 auto;
      .title {
        width: 840px;
        font-size: 60px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 80px;
        color: #ffffff;
        margin-bottom: 35px;
      }
      a {
        color: #fff;
        font-size: 20px;
        margin-right: 80px;
      }
    }
  }
}
</style>
