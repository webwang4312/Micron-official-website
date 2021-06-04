<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 07:28:54
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-14 11:37:37
 * @Descripttion: 
-->
<template>
  <div class="Developers">
    <div class="banner">
      <div class="text">
        {{ $t("developers[0]") }}<br />
        {{ $t("developers[1]") }}
      </div>
      <div class="list_z">
        <div class="list">
           <a target="_blank" href="http://47.75.93.221/devDocsEn/"
            >{{ $t("Developer.doc") }}<i class="el-icon-right"></i
          ></a>
         
        </div>
        <div class="list">
          <a target="_blank" href="https://github.com/uenctech"
            >GitHub <i class="el-icon-right"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="content">
      <More></More>
      <Task></Task>
    </div>
  </div>
</template>

<script>
import More from "@/views/m/developers/More.vue";
import Task from "@/views/m/developers/Task.vue";
export default {
  components: {
    More,
    Task,
  },
};
</script>

<style lang="less" scoped>
.Developers {
  min-height: 1400px;
  .banner {
    height: 660px;
    
    background-image: url("../../assets/imagesm/indba2.png");
    background-size: cover;
    background-position: center center;
    padding: 178px 152px 166px 36px;
    .text {
      width: 560px;

      font-size: 56px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 69px;
      color: #ffffff;
      opacity: 1;
    }
    .list_z{
      display: flex;
      flex-direction: row;
      margin-top: 40px;
    }
    .list {
      height: 60px;
border: 2px solid #FFFFFF;
opacity: 1;
border-radius: 30px;
padding: 0 20px;
line-height: 60px;
      a {
      font-size: 28px;
font-family: PingFangSC-Medium;

color: #FFFFFF;
opacity: 1;
      }

      margin-bottom: 36px;
      margin-right: 52px;
    }
  }
}
</style>
