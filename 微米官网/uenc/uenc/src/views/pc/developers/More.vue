<!--
 * @Author: yaoyuting
 * @Date: 2021-04-14 07:36:20
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 08:34:27
 * @Descripttion: 
-->
<template>
  <div class="More">
    <div class="w1300">
      <div class="list">
        <div class="item">
          <div class="images">
            <img src="@/assets/images/index/运行一个节点.png" alt="" />
          </div>
          <div class="title">{{ $t("Developer.Run") }}</div>
          <div class="content">{{ $t("Developer.RunText") }}</div>
          <div class="bottom">
            <el-button type="text" @click="runNode"
              >{{ $t("Developer.Start") }}<i class="el-icon-right"></i
            ></el-button>
          </div>
        </div>
        <div class="item">
          <div class="images">
            <img src="@/assets/images/index/开发者文档.png" alt="" />
          </div>
          <div class="title">{{ $t("Developer.Developer") }}</div>
          <div class="content">{{ $t("Developer.DeveloperText") }}</div>
          <div class="bottom">
            <el-button type="text" @click="goMore"
              >{{ $t("Developer.learn") }}<i class="el-icon-right"></i
            ></el-button>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="images">
            <img src="@/assets/images/index/主网源码.png" alt="" />
          </div>
          <div class="title">{{ $t("Developer.Main") }}</div>
          <div class="content">{{ $t("Developer.MainText") }}</div>
          <div class="bottom">
            <el-button type="text" @click="gogithup"
              >{{ $t("Developer.view") }}<i class="el-icon-right"></i
            ></el-button>
          </div>
        </div>
        <div class="item">
          <div class="images">
            <img src="@/assets/images/index/接口工具.png" alt="" />
          </div>
          <div class="title">{{ $t("Developer.Interface") }}</div>
          <div class="content">{{ $t("Developer.InterfaceText") }}</div>
          <div class="bottom">
            <el-button type="text" @click="goJieKou"
              >{{ $t("Developer.view") }}<i class="el-icon-right"></i
            ></el-button>
          </div>
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
  },
};
</script>

<style lang="less" scoped>
.More {
  background-image: url("../../../assets/images/index/kfz_bg.png");
  background-size: cover;
  background-position: center center;
  height: 1810px;
  .w1300 {
    width: 1200px;
    margin: 0 auto;
    padding-top: 160px;
    padding-bottom: 20px;
    .list:nth-child(1) {
      .item:nth-child(1) {
        img {
          width: 370px;
          height: 345px;
        }
      }
      .item:nth-child(2) {
        img {
          width: 370px;
          height: 347px;
        }
      }
    }
    .list:nth-child(2) {
      .item:nth-child(1) {
        img {
          width: 370px;
          height: 355px;
        }
      }
      .item:nth-child(2) {
        img {
          width: 370px;
          height: 364px;
        }
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      margin-bottom: 120px;
      .item {
        .images {
          width: 520px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: center;
          // justify-content: center;
          background-color: #fff;
          box-shadow: 0px 2px 40px 0px rgba(167, 161, 249, 0.3);
        }
        .title {
          margin-top: 30px;
          font-size: 40px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 52px;
          color: #333333;
          text-align: left;

          height: 56px;
          line-height: 56px;
        }
        .content {
          width: 520px;
          margin-top: 20px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 32px;
          color: #333333;
          text-align: left;

          line-height: 32px;
        }
        .bottom {
          margin-top: 20px;
          .el-button {
            padding: 0;
            margin: 0;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 26px;
            color: #6624fa;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
