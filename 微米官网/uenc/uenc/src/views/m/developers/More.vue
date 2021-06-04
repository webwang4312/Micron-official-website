<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 07:36:20
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 08:17:11
 * @Descripttion: 
-->
<template>
  <div class="More">
    <div class="more">
      <div class="list">
        <div class="images">
          <img src="@/assets/imagesm/kfz/配图.png"  alt="暂无图片" srcset="" />
        </div>
        <div class="title">{{ $t("Developer.Run") }}</div>
        <div class="content">{{ $t("Developer.RunText") }}</div>
        <div class="btn">
          <el-button type="text" @click="runNode">{{$t("Developer.Start")}}<i class="el-icon-right"></i></el-button>
        </div>
      </div>
      <div class="list">
        <div class="images">
          <img src="@/assets/imagesm/kfz/配图2.png"  alt="暂无图片" srcset="" />
        </div>
        <div class="title">{{ $t("Developer.Developer") }}</div>
        <div class="content">{{ $t("Developer.DeveloperText") }}</div>
        <div class="btn">
          <el-button type="text" @click="goMore">{{$t("Developer.learn")}}<i class="el-icon-right"></i></el-button>
        </div>
      </div>
      <div class="list">
        <div class="images">
          <img src="@/assets/imagesm/kfz/配图3.png"  alt="暂无图片" srcset="" />
        </div>
        <div class="title">{{ $t("Developer.Main") }}</div>
        <div class="content">{{ $t("Developer.MainText") }}</div>
        <div class="btn">
          <el-button type="text" @click="gogithup">{{$t("Developer.view")}}<i class="el-icon-right"></i></el-button>
        </div>
      </div>
      <div class="list">
        <div class="images">
          <img src="@/assets/imagesm/kfz/配图4.png"  alt="暂无图片" srcset="" />
        </div>
        <div class="title">{{ $t("Developer.Interface") }}</div>
        <div class="content">{{ $t("Developer.InterfaceText") }}</div>
        <div class="btn">
          <el-button type="text" @click="goJieKou">{{$t("Developer.view")}}<i class="el-icon-right"></i></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goMore() {
      window.open("http://47.75.93.221/devDocsEn/%E5%BC%80%E5%8F%91%E8%80%85/UENC%20developer", "_blank");
      // this.$router.push({
      //   path: "/pc/Devdocument"
      // });
    },
    gogithup() {
      window.open("https://github.com/uenctech/uenc_src", "_blank");
    },
    runNode() {
      window.open(
        "http://47.75.93.221/devDocsEn/UENC%20nodes/Node%20deployment",
        "_blank"
      );
    },
    goJieKou() {
      window.open(
        "http://47.75.93.221/devDocsEn/%E5%BC%80%E5%8F%91%E8%80%85/%E5%BC%80%E6%94%BE%E6%8E%A5%E5%8F%A3/jsonrpc%20interface/Request%20example",
        "_blank"
      );
    },
  }
};
</script>

<style lang="less" scoped>
.More {
  // background-image: url("../../../assets/imagesm/kfz/bg1.png");
  // background-size: cover;
  // background-position: center center;
   background: url("../../../assets/imagesm/kfz/bg1.png") no-repeat
    center/100% 100%;
  .more {
    padding: 80px 40px 100px 42px;
    .list {
      margin-bottom: 68px;
      .images {
        width: 334 * 2px;
        height: 170 * 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        box-shadow: 0px 2px 10px 0px rgba(167, 161, 249, 0.2);
      }
      .title {
       font-size: 40px;
font-family: PingFang SC;
font-weight: 600;
line-height: 56px;
color: #000000;
opacity: 1;
        margin-top: 40px;
        margin-bottom: 20px;
      }
      .content {
        font-size: 30px;
font-family: PingFang SC;
font-weight: 400;
line-height: 52px;
color: #333333;
opacity: 1;
        margin-bottom: 10px;
      }
      .btn {
        span{

        }
        .el-button {
          padding: 0;
          margin: 0;
        font-size: 26px;
font-family: PingFang SC;
font-weight: 400;
line-height: 36px;
color: #5432F4;
opacity: 1;
        }
      }
    }
    .list:nth-child(1) {
      img {
        height: 130 * 2px;
      }
    }
    .list:nth-child(2) {
      img {
        height: 139 * 2px;
      }
    }
    .list:nth-child(3) {
      img {
        height: 152 * 2px;
      }
    }
    .list:nth-child(4) {
      img {
        height: 134 * 2px;
      }
    }
  }
}
</style>
