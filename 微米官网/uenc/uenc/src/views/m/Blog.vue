<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 20:32:42
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 07:17:52
 * @Descripttion: 
-->
<template>
  <div class="Blog" v-if="blogList.length > 0">
    <div class="banner">
      <div class="placeholder"></div>
      <div class="details">
        <div class="title wbba">
          {{ $t("index.switch") === "cn" ? blogList[0].blogTitle : blogList[0].blogTitleEn }}
        </div>
        <div class="date">{{ blogList[0].createTime }} / {{ blogList[0].createBy }}</div>

        <div
          class="text"
          v-html="$t('index.switch') === 'cn' ? blogList[0].text : blogList[0].textEn"
        ></div>
        <div class="btn">
          <router-link :to="{ path: '/m/Blog/Details', query: { id: blogList[0].blogId } }">
            <el-button type="primary">{{$t('developers[2]')}}</el-button>
          </router-link>
          <!-- <el-button
            v-if="blogList[0].isSub === 'true'"
            type="primary"
            style="margin-left: 10px"
            @click="unSubBlog(blogList[0].blogId)"
            >取消订阅</el-button
          > -->
          <el-button type="primary" style="margin-left: 10px" @click="dialogVisible = true"
            >{{ $t("index.switch") === "cn" ? '订阅' : 'subscribe' }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="content_bg">
      <div class="content">
        <div class="lists">
          <div class="list" v-for="blog in blogList" :key="blog.blogId">
            <router-link :to="{ path: '/m/Blog/Details', query: { id: blog.blogId } }">
              <div class="images">
                <!-- <img :src="blog.images" alt="暂无图片" /> -->
                <img :src="blog.imagesEn" v-if="$t('index.switch') == 'en'">
              <img :src="blog.images" v-else />
              </div>
              <div class="main">
                <div class="top">
                  {{ $t("index.switch") === "cn" ? blog.blogTitle : blog.blogTitleEn }}
                </div>
                <div
                  class="medile"
                  v-html="$t('index.switch') === 'cn' ? blog.text : blog.textEn"
                ></div>
                <div class="bottom">
                  <div class="username">{{ blog.createBy }}</div>
                  <div class="date">{{ blog.createTime.split(" ")[0] }}</div>
                </div>
              </div>
            </router-link>
          </div>
          <!-- <div class="more">
            <span v-if="blogList.length<total" @click="more">
              {{ $t("index.switch") === "cn" ? '浏览更多' : 'more' }}
            </span>
          </div> -->
          
        </div>
      </div>
       <el-pagination
        :page-size='8'
  background
    @current-change="handleCurrentChange"
  layout="prev, pager, next"
  :total="total">
</el-pagination>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="86%"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-input v-model="email" :placeholder="$t('dialog.entere')"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">{{ $t("dialog.cancel") }}</el-button>
        <el-button type="primary" @click="subBlog" size="small">
          {{ $t("index.switch") === "cn" ? '订阅' : 'subscribe' }}
        </el-button>
      </span>
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
      pageSize:1,
      total:0
    };
  },
  created() {
    let userName = localStorage.getItem("username");
    document.cookie = "autoLogin=" + userName;
    this.getBlogList();
  },
  methods: {
     handleCurrentChange(currentPage){
// console.log(currentPage);
this.pageSize=currentPage;
 this.getBlogList();
    },
    async unSubBlog(id) {
      const data = await UnSubBlog(id);
      if (data.code === 0) {
        this.getBlogList();
        this.$notify({ type: 'success', message: this.$t("index.switch") === "cn" ?"取消订阅成功":'Unsubscribe successfully'})
      } else {
        this.$message.error(data.msg);
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.email = "";
    },
    async subBlog() {
      let id = this.blogList[0].blogId;
      let reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
      if (!reg.test(this.email)) {
        return  this.$notify({ type: 'warning', message: this.$t("index.switch") === "cn" ?"请输入正确邮箱":'enter the correct email address' })
      }
      let info = id + "/" + this.email;
      const data = await SubBlog(info);
      if (data.code === 0) {
        this.getBlogList();
         this.$notify({ type: 'success', message: this.$t("index.switch") === "cn" ?"订阅成功":'Subscribe to the success'})
        this.handleClose();
      } else {
        this.$message.error(data.msg);
      }
    },
    more(){
      this.pageSize++
      this.getBlogList();
    },
    async getBlogList() {
      const data = await GetBlogList({
        pageNo: this.pageSize,
        pageSize: 8
      });
      if (data.code === 0) {
        data.rows.forEach(item => {
          item.images = item.images;
          item.text = trimHtml(item.text);
          item.textEn = trimHtml(item.textEn);
        });
        this.total =data.total
        //  this.blogList = this.blogList.concat(data.rows);
          this.blogList = data.rows;
      } else {
        this.$message.error(data.msg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.Blog {
 
  .banner {
  //  padding-bottom: 90px;
    background-image: url("../../assets/imagesm/blogheader.png");
    background-size: cover;
    background-position: center center;
    display: flex;
    height: auto;
    flex-direction: column;
    .placeholder {
      // flex: 1;
      height: 220px;
    }
    .details {
      // margin: 0 300px;
      margin: 0px;
      padding: 0 58px 90px 42px;
      .date {
       font-size: 28px;
font-family: PingFang SC;
font-weight: 400;
line-height: 40px;
color: #FFFFFF;
opacity: 1;
        margin-bottom: 20px;
      }
      .title {
       font-size: 56px;
font-family: PingFang SC;
font-weight: 600;
line-height: 69px;
color: #FFFFFF;
opacity: 1;
        margin-bottom: 20px;
        // max-height: 69px;
        // overflow-y: scroll;
        display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
      }
      .text {
      font-size: 26px;
font-family: PingFang SC;
font-weight: 400;

color: #FFFFFF;
opacity: 1;
width: 650px;
        max-height: 88px;
        // overflow: hidden;
        // background: gray;
         word-wrap: break-word;
    word-break: normal;
      display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
        margin-bottom: 40px;
      }
      .btn {
        
        .el-button {
          width: 160px;
          height: 60px;
          padding: 0;
          line-height: 62px;
          text-align: center;
          background: linear-gradient(90deg, #4d71ff 0%, #003cfb 100%);
          border-radius: 40px;
          border: none;
          font-size: 28px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        }
      }
    }
  }
  .content_bg {
    // background-image: url("../../assets/imagesm/bk/bg.png");
    // background-size: cover;
    // background-position: center center;
  }
  .content {
    padding: 80px 28px 0 32px;
    margin-bottom: 80px;
    .lists {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .list {
       width: 330px;
height:430px;
background: #FFFFFF;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
opacity: 1;
        margin-bottom: 40px;
      
        .images {
          height: 226px;
          background-color: #fff;
        }
        img {
          width: 330px;
          height: 226px;
        }
        .main {
          background-color: #fff;
          padding:12px 10px;
          // margin-top: 18px;
          .top {
            font-size: 28px;
font-family: PingFang SC;
font-weight: 500;
// line-height: 24px;
color: #333333;
opacity: 1;
            margin-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .medile {
            font-size: 26px;
font-family: PingFang SC;
font-weight: 300;
line-height: 32px;
color: #666666;
opacity: 1;
            overflow: hidden;
            margin-bottom:38px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
font-family: PingFangSC-Regular;
line-height: 28px;
color: #8D8A9A;
opacity: 1;
// margin-bottom: 18px;
          }
        }
      }
    }

    .more{
      text-align: center;
      width: 100%;
      padding: 20px 0 100px;
      font-size: 18px;
      color:#4B3EFF;
      cursor: pointer;
    }
  }
}
</style>

<style lang="less">
.Blog {
   .el-pagination{
    width: 100%;
    text-align: center;
    margin-bottom: 128px;
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
      font-size: 30px;
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
        background: #5432F4;
        color: #ffffff;
      }
    }
  }
}
</style>
