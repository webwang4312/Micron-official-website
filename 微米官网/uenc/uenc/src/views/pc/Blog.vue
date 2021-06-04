<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 20:32:42
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 22:00:21
 * @Descripttion: 
-->
<template>
  <div class="Blog" v-if="blogList.length > 0">
    <div class="banner">
      <!-- <div class="placeholder"></div> -->
      <div class="details">
        <div class="title wbba">
          {{
            $t("index.switch") === "en"
              ? blogList[0].blogTitleEn
              : blogList[0].blogTitle
          }}
        </div>
        <div class="date">
          {{ blogList[0].createTime }}
          <span>
            {{ blogList[0].createBy }}
          </span>
        </div>
        <div
          class="text"
          v-html="
            $t('index.switch') === 'en' ? blogList[0].textEn : blogList[0].text
          "
        ></div>
        <div class="btns">
          <router-link
            class="btn"
            :to="{
              path: '/pc/Blog/Details',
              query: { id: blogList[0].blogId },
            }"
          >
            {{
                  $t("developers[2]")}}
           
          </router-link>
          <!-- <div
            class="btn"
            v-if="blogList[0].isSub === 'true'"
            @click="unSubBlog(blogList[0].blogId)"
          >
            取消订阅
          </div> -->
          <div class="btn" @click="dialogVisible = true">
            {{ $t("index.switch") === "cn" ? "订阅" : "subscribe" }}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="w1352 w">
        <div class="box-card" v-for="blog in blogList" :key="blog.blogId">
          <router-link
            :to="{ path: '/pc/Blog/Details', query: { id: blog.blogId } }"
          >
            <div class="images">
              <img :src="blog.imagesEn" v-if="$t('index.switch') == 'en'" />
              <img :src="blog.images" v-else />
            </div>
            <div class="main">
              <div class="top">
                {{
                  $t("index.switch") === "en"
                    ? blog.blogTitleEn
                    : blog.blogTitle
                }}
              </div>
               <div
                  class="medile"
               
                  v-html="$t('index.switch') === 'cn' ? blog.text : blog.textEn"
                ></div>
              <div class="bottom">
                <div class="username">{{ blog.createBy }}</div>
                <div class="date">{{ blog.createTime }}</div>
              </div>
              <!-- <div class="btn">
                <router-link :to="{path: '/pc/Blog/Details', query: {id: blog.blogId}}">
                  <el-button type="text">More</el-button>
                </router-link>
              </div> -->
            </div>
          </router-link>
        </div>
        <!-- <div class="box-card"></div>
        <div class="box-card"></div> -->
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
        :page-size='9'
      >
      </el-pagination>
      <!-- <div class="more">
        <span v-if="blogList.length < total" @click="more">
          {{ $t("index.switch") === "cn" ? "浏览更多" : "more" }}
        </span>
      </div> -->
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-input v-model="email" :placeholder="$t('dialog.entere')"></el-input>
      <div class="btn_style">
        <el-button type="primary" @click="subBlog">{{
          $t("index.switch") === "cn" ? "订阅" : "subscribe"
        }}</el-button>
        <el-button type="text" @click="handleClose">{{
          $t("dialog.cancel")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetBlogList, UnSubBlog, SubBlog } from "@/assets/server/api.js";
import { baseURL, trimHtml } from "@/utils/utils";
export default {
  data() {
    return {
      blogList: [],
      dialogVisible: false,
      email: "",
      pageSize: 1,
      total: 0,
    };
  },
  created() {
    let userName = localStorage.getItem("username");
    document.cookie = "autoLogin=" + userName;
    this.getBlogList();
  },
  methods: {
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.pageSize = currentPage;
      this.getBlogList();
    },
    handleClose() {
      this.dialogVisible = false;
      this.email = "";
    },
    async subBlog() {
      let id = this.blogList[0].blogId;
      let reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
      if (!reg.test(this.email)) {
        return this.$message.warning(
          this.$t("index.switch") === "cn"
            ? "请输入正确邮箱"
            : "enter the correct email address"
        );
      }
      let info = id + "/" + this.email;
      const data = await SubBlog(info);
      if (data.code === 0) {
        this.getBlogList();
        this.$message.success(
          this.$t("index.switch") === "cn" ? "订阅成功!" : "success"
        );
        this.handleClose();
      } else {
        this.$message.error(data.msg);
      }
    },
    async unSubBlog(id) {
      const data = await UnSubBlog(id);
      if (data.code === 0) {
        this.getBlogList();
        this.$message.success(
          this.$t("index.switch") === "cn"
            ? "取消订阅成功!"
            : "Unsubscribe successfully!"
        );
      } else {
        this.$message.error(data.msg);
      }
    },
    more() {
      this.pageSize++;
      this.getBlogList();
    },
    async getBlogList() {
      const data = await GetBlogList({
        pageNo: this.pageSize,
        pageSize: 9,
      });
      if (data.code === 0) {
        data.rows.forEach((item) => {
            this.total = data.total;
        //console.log( this.total);
        this.blogList = data.rows;
          item.images = item.images;
          item.text = trimHtml(item.text);
           item.textEn = trimHtml(item.textEn);
          let dates = item.createTime.split(" ");
          //console.log(dates);
          let times = dates[1].split(":");
          item.createTime = dates[0];
          // item.createTime = dates[0] + " " + times[0] + ":" + times[1];
        });
      
        // this.blogList = this.blogList.concat(data.rows);
      } else {
        this.$message.error(data.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Blog {
  .banner {
    height: 1000px;
    background-image: url("https://pili-vod.uenc.net/uenc_pc_blogHeader.png");
    background-size: cover;
    background-position: center center;

    display: flex;
    flex-direction: column;

    // .placeholder {
    //   flex: 1;
    // }
    .details {
      width: 1200px;
      height: 100%;
      padding-top: 400px;
      color: #fff;
      margin: 0 auto;

      .date {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 26px;
        color: #ffffff;
        opacity: 1;
        span {
          margin-left: 20px;
        }
      }
      .title {
       
        font-size: 60px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 79px;
        color: #ffffff;
        opacity: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 30px;
      }
      .text {
        height:60px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 30px;
        color: #ffffff;
        opacity: 1;
        margin-top: 10px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .btns {
        margin: 135px 0 76px;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        .btn {
          font-size: 24px;
          color: #ffffff;
          width: 140px;
          text-align: center;
          height: 54px;
          line-height: 54px;
          background: #5432f4;
          border-radius: 33px;
          margin-left: 50px;
          cursor: pointer;
        }
      }
    }
  }
  .content {
    // background: url("../../assets/images/index/Blog.png") no-repeat center/100%
    //   100%;
    padding-bottom: 260px;
    // background-image: url("../../assets/images/index/Blog.png");
    // background-size: cover;
    // background-position: 100% center;
  }
  .w {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;

    //  background: gray;
    .box-card:nth-child(3n + 3) {
      margin-right: 0px;
    }
    .box-card {
      width: 350px;
      height: 420px;
      border-radius: 20px;
background: #FFFFFF;
      box-sizing: border-box;
      margin-right: 75px;
      margin-top: 90px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
      .images {
        height: 240px;
        background-color: #fff;
         border-top-left-radius: 20px;
         border-top-right-radius: 20px;
        img {
            border-top-left-radius: 20px;
             border-top-right-radius: 20px;
          height: 240px;
          width: 100%;
        }
      }
      .main {
      //  background-color: #fff!important;
       background:white!important;
        padding: 10px 30px;
        .top {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 35px;
          color: #000000;
          margin-bottom: 4px;
        }
        
        .bottom {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #8179a1;
          .username {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 21px;
            color: #333333;
            opacity: 1;
          }
          .date {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 21px;
            color: #333333;
            opacity: 1;
          }
        }
        .btn {
          text-align: center;
          .el-button {
            color: #333;
          }
        }
      }
    }
  }
  .more {
    text-align: center;
    padding: 20px 0 100px;
    font-size: 18px;
    color: #4b3eff;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.Blog {
  .medile {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 24px;
          color: #333333;
         
          opacity: 1;
          min-height: 70px;
          margin-bottom: 20px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          max-height: 60px;
          span{
            // background-color: white!important;
          }
        }
  .el-pagination {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-top: 100px;
    font-size: 20px !important;
    font-family: Arial !important;
    font-weight: 400 !important;
    line-height: 23px !important;
    color: #666666 !important;
    opacity: 1;
    .el-icon-more {
      width: 49px;
      height: 49px;
      line-height: 49px;
      background-color: #ffffff !important;
    }
    button {
      width: 49px;
      height: 49px;
      background-color: #ffffff !important;
      font-size: 20px;
      font-family: Arial;
      font-weight: 400;
      line-height: 23px;
      color: #666666;
      opacity: 1;
    }
    .active {
      background-color: #ffffff !important;
      border: 1px solid #5432f4;
      border-radius: 8px;
      color: #7f48fb !important;
    }
    .number {
      width: 49px;
      height: 49px;
      background-color: #ffffff !important;
      opacity: 1;
      border-radius: 8px;
      line-height: 49px;
    }
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
      background: #4b3eff;
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
