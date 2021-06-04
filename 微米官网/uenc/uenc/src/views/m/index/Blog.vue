<!--
 * @Author: yaoyuting
 * @Date: 2021-04-11 18:24:56
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-17 22:10:19
 * @Descripttion: 
-->
<template>
  <div class="Blog">
    <div class="sub_title">{{ $t("index.Blog") }}</div>
    <div class="scroll">
      <div class="details">
        <el-card class="box-card" v-for="blog in blogList" :key="blog.blogId">
          <router-link :to="{ path: '/m/Blog/Details', query: { id: blog.blogId } }">
            <div class="images">
             <img :src="blog.imagesEn" v-if="$t('index.switch') == 'en'">
              <img :src="blog.images" v-else />
              <!-- <img :src="blog.images" alt="暂无图片" /> -->
            </div>
            <div class="content">
              <div class="title">
                {{ $t("index.switch") === "cn" ? blog.blogTitle : blog.blogTitleEn }}
              </div>
              <div
                class="text"
                v-html="$t('index.switch') === 'cn' ? blog.text : blog.textEn"
              ></div>
              <div class="bottom">
                <div class="username">{{ blog.createBy }}</div>
                <div class="date">{{ blog.createTime.split(" ")[0] }}</div>
              </div>
            </div>
          </router-link>
        </el-card>
      </div>
    </div>
    <div class="btn">
      <router-link to="/m/Blog"
        >{{ $t("index.EnterBlog") }} <i class="el-icon-right"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blogList: {
      type: Array
    }
  },
  methods: {
    detalis(blog) {
      this.$router.push({
        path: "/pc/Blog/Details",
        query: { id: blog.blogId }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Blog {
  .sub_title {
    margin-top: 236px;
    margin-bottom: 56px;
    font-size: 48px;
font-family: PingFang SC;
font-weight: 600;
line-height: 66px;
color: #333333;
opacity: 1;
text-align: center;
  }
  .scroll {
    // overflow-x: scroll;
    .details {
      margin-left: 30px;
      height: 430px;
      display: inline-flex;
      .box-card {
        width: 330px;
         margin-right: 30px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        .images {
          height: 226px;
          background-color: #fff;
        }
        img {
          height: 226px;
          width:100%;
        }
        .content {
          padding: 18px 18px 10px;
          .title {
            font-size: 24px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            color: #333333;
            line-height: 40px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 280px;
          }
          .text {
            height: 96px;
            overflow: hidden;
            font-size: 20px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 32px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          .bottom {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #8d8a9a;
            line-height: 28px;
          }
        }
      }
    }
  }
  .btn {
    text-align: center;
    font-size: 26px;
font-family: PingFangSC-Medium;
line-height: 34px;
color: #5432F4;
opacity: 1;
    margin-top: 84px;
   
    a {
     font-size: 26px;
font-family: PingFangSC-Medium;
line-height: 34px;
color: #5432F4;
opacity: 1;
    }
  }
}
</style>
