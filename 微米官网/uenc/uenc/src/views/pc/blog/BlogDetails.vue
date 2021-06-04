<!--
 * @Author: yaoyuting
 * @Date: 2021-04-25 20:37:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 18:16:46
 * @Descripttion: 
-->
<template>
  <div class="BlogDetails">
    <div class="banner">
      <!-- <div class="placeholder"></div> -->
      <div class="details">
        <div class="date">{{ blogData.createTime }} / {{ blogData.createBy }}</div>
        <div class="title wbba">
          {{ $t("index.switch") === "en" ? blogData.blogTitleEn : blogData.blogTitle }}
        </div>
        <!-- <div class="btn" v-if="blogData.isSub === 'true'" @click="unSubBlog(blogData.blogId)">
          取消订阅
        </div> -->
        <div class="btn" @click="dialogVisible = true">{{ $t("index.switch") === "cn" ? '订阅' : 'subscribe' }}</div>
      </div>
    </div>
    <div class="blog_details_content">
      <div
        class="w1800"
        v-html="$t('index.switch') === 'en' ? blogData.textEn : blogData.text"
      ></div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-input v-model="email" :placeholder="$t('dialog.entere')"></el-input>
      <div class="btn_style">
        <el-button type="primary" @click="subBlog">{{ $t("index.switch") === "cn" ? '订阅' : 'subscribe' }}</el-button>
        <el-button type="text" @click="handleClose">{{ $t("dialog.cancel") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetBlogDetail, UnSubBlog, SubBlog } from "@/assets/server/api.js";
import { baseURL } from "@/utils/utils";
export default {
  data() {
    return {
      blogData: [],
      dialogVisible: false,
      email: ""
    };
  },
  created() {
    let userName = localStorage.getItem("username");
    document.cookie = "autoLogin=" + userName;
    this.getBlogList(this.$route.query.id);
  },
  methods: {
    async unSubBlog(id) {
      const data = await UnSubBlog(id);
      if (data.code === 0) {
        this.getBlogList(id);
        this.$message.success(this.$t("index.switch") === "cn" ?"取消订阅成功!":'Unsubscribe successfully!');
      } else {
        this.$message.error(data.msg);
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.email = "";
    },
    async subBlog() {
      let id = this.blogData.blogId;
      let reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
      if (!reg.test(this.email)) {
        return this.$message.warning(this.$t("index.switch") === "cn" ?"请输入正确邮箱":'enter the correct email address');
      }
      let info = id + "/" + this.email;
      const data = await SubBlog(info);
      if (data.code === 0) {
        this.getBlogList(id);
        this.$message.success(this.$t("index.switch") === "cn" ?"订阅成功!":'success');
        this.handleClose();
      } else {
        this.$message.error(data.msg);
      }
    },
    async getBlogList(id) {
      const data = await GetBlogDetail(id);
      if (data.code === 0) {
        data.data.images = data.data.images;
        // data.data.text = data.data.text.replace(/\n/g, "<br>");
        let dates = data.data.createTime.split(" ");
        let times = dates[1].split(":");
        data.data.createTime = dates[0] + " " + times[0] + ":" + times[1];
        this.blogData = data.data;
      } else {
        this.$message.error(data.msg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  min-height: 1000px;
  height: auto;
  background-image: url("https://pili-vod.uenc.net/uenc_pc_blogHeader.png");
  background-size: cover;
  background-position: center center;
  padding-top:400px;
  display: flex;
  flex-direction: column;
  .placeholder {
    flex: 1;
  }
  .details {
    width: 1200px;
    margin: 0 auto;
    color: #fff;
    .date {
      font-size: 26px;
      margin-bottom: 45px;
    }
    .title {
     
     font-size: 60px;
font-family: PingFangSC-Medium;
line-height: 80px;
color: #FFFFFF;
opacity: 1;
      margin-bottom: 69px;
    }
    .btn {
      width: 141px;
      height: 54px;
    
      text-align: center;
      background: #5432F4;
      border-radius: 33px;
     font-size: 24px;
font-family: PingFangSC-Semibold;
line-height: 54px;
color: #FFFFFF;
opacity: 1;
      margin-bottom: 136px;
    }
  }
}

</style>

<style lang="less">
.BlogDetails {
  .blog_details_content /deep/ {
  background-image: url("../../../assets/images/index/blogdbg.png");
  background-size: cover;
  background-position: center center;
  padding: 100px 0 100px;
 font-size: 133%;
  width: 100%;
 
  .w1800{
    width: 1200px;
    margin: 0 auto;
     p{
      //  width: 100%;
    //  font-size: 133%!important;
    
  }
  span{
    //  font-size: 133%!important;
      
  }
  }
//    ::v-deep img{
//     width:100%!important;
//     max-width: 100%;
// }

}
  .btn_style {
    display: flex;
    justify-content: space-between;
    margin-top: 47px;
    text-align: center;
    .el-button:nth-child(1) {
      width: 158px;
      height: 70px;
      opacity: 1;
      background: #5432F4;
      border-radius: 4px;
      font-size: 28px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
    .el-button:nth-child(2) {
      height: 70px;
      font-size: 24px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #999999;
      line-height: 33px;
    }
  }
  .el-dialog {
    width: 600px;
    opacity: 1;
    background: #ffffff;
    border-radius: 25px;
    padding: 0 60px 32px;
    .el-dialog__title {
      padding: 0;
      margin: 0;
      font-size: 28px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #313131;
    }
    .el-dialog__header {
      padding: 0;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-input__inner {
      height: 70px;
      opacity: 1;
      background: #fcfdff;
      border: 1px solid #d5d5d5;
      border-radius: 3px;
      font-size: 24px !important;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      line-height: 33px;
    }
  }
}
</style>