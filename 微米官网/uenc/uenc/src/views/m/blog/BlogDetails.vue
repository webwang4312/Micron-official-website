<!--
 * @Author: yaoyuting
 * @Date: 2021-04-25 20:37:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 18:16:15
 * @Descripttion: 
-->
<template>
  <div class="BlogDetails">
    <div class="banner">
      <div class="placeholder"></div>
      <div class="details">
        <!-- <el-button v-if="blogData.isSub === 'true'" type="primary" style="margin-left: 10px" @click="unSubBlog(blogData.blogId)">取消订阅</el-button> -->
        <!-- <div class="text" v-html="$t("index.switch") === "en"?blogData.textEn:blogData.text"></div> -->
        <!-- <div class="btn">
        
          <el-button type="primary" style="margin-left: 10px" @click="dialogVisible = true">{{ $t("index.switch") === "cn" ? '订阅' : 'subscribe' }}</el-button>
        </div> -->
      </div>
    </div>
    <div class="content_bg">
      <div class="title">
        {{
          $t("index.switch") === "en"
            ? blogData.blogTitleEn
            : blogData.blogTitle
        }}
      </div>
      <div class="date">
        {{ blogData.createTime }} / {{ blogData.createBy }}
      </div>
      <div
        class="content"
        v-html="$t('index.switch') === 'en' ? blogData.textEn : blogData.text"
      ></div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="86%"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-input v-model="email" :placeholder="$t('dialog.entere')"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">{{
          $t("dialog.cancel")
        }}</el-button>
        <el-button type="primary" @click="subBlog" size="small">{{
          $t("index.switch") === "cn" ? "订阅" : "subscribe"
        }}</el-button>
      </span>
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
      email: "",
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
        this.$notify({
          type: "success",
          message:
            this.$t("index.switch") === "cn"
              ? "取消订阅成功!"
              : "Unsubscribe successfully!",
        });
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
        return this.$notify({
          type: "warning",
          message:
            this.$t("index.switch") === "cn"
              ? "请输入正确邮箱!"
              : "Enter the correct email",
        });
      }
      let info = id + "/" + this.email;
      const data = await SubBlog(info);
      if (data.code === 0) {
        this.getBlogList(id);
        this.$notify({
          type: "success",
          message: this.$t("index.switch") === "cn" ? "订阅成功!" : "success",
        });
        this.handleClose();
      } else {
        this.$message.error(data.msg);
      }
    },
    async getBlogList(id) {
      const data = await GetBlogDetail(id);
      if (data.code === 0) {
        // console.log(data);
         let dates = data.data.createTime.split(" ");
          // console.log(dates);
          let times = dates[1].split(":");
          // console.log(times);
         data.data.createTime = dates[0]+` `+times[0]+':'+times[1];
        data.data.images = data.data.images;
        data.data.text = data.data.text.replace(/\n/g, "<br>");
          // data.data.textEn = data.data.textEn.replace(/\pt/g, "px");
        this.blogData = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.BlogDetails {
  min-height: 1400px;
}
.banner {
  height: 110px;
  background: rgba(47, 43, 68, 1);
  // padding: 220px 160px 198px 42px;
  // background-image: url("../../../assets/imagesm/blogheader.png");
  // background-size: cover;
  // background-position: center center;
  display: flex;
  flex-direction: column;
  .placeholder {
    // flex: 1;
  }
  .details {
    margin: 20px;
    .date {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40px;
      color: #ffffff;
      opacity: 1;
      margin-bottom: 40px;
    }

    .text {
      font-size: 12px;
      line-height: 20px;
      height: 100px;
      overflow: hidden;
    }
    .btn {
      .el-button {
        padding: 0;
        width: 160px;
        height: 60px;
        background: #5432f4;
        border-radius: 38px;
        line-height: 60px;
        border: none;
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 40px;
        margin-left: 0px !important;
        // margin-bottom: 68px;
      }
    }
  }
}
.content_bg {
  width: 750px;
  flex-wrap: wrap;
  // background-image: url("../../../assets/imagesm/bk/bg2.png");
  background-size: 750px;
  padding: 42px 38px 286px 42px;
  .title {
    font-size: 56px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 69px;
    color: #000000;
    opacity: 1;
    margin-bottom: 20px;
  
    // max-height: 160px;
    //   overflow-y: scroll;
  }
  // background-position: center center;
}
.content {
  margin-top: 60px;
  // padding: 40px 38px 286px 42px;
  font-size: 133%;
  
  // font-size: 20px;
  // font-family: PingFangSC-Regular, PingFang SC;
  // font-weight: 400;
  // color: #656565;
  // line-height: 36px;
}
</style>

<style lang="less">
.BlogDetails {
  .content {
    img {
      max-width: 100%;
    }
    table{
    width: 100%!important;
    // background: red!important;
  }
  .MsoNormalTable{
    width: 100%!important;
    td{
       width: 50px!important;
    }
  }
 table{
    //  width:50%!important;
    //  margin: a auto;
     tr{
     
     }
  //   td{
  //     width: 50px!important;
  //   }
   }
  }
  .el-dialog {
    background: #ffffff;
    border-radius: 24px;
    padding: 0 40px;
    .el-input__inner {
      height: 74px;
      background: #ffffff;
      border-radius: 4px;
      border: 2px solid #999999;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-around;
      .el-button {
        width: 164px;
        height: 74px;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        border: none;
      }
      .el-button:nth-child(1) {
        background: #ececec;
        color: #9f9f9f;
      }
      .el-button:nth-child(2) {
        background: #5432f4;
        color: #ffffff;
      }
    }
  }
}
</style>
