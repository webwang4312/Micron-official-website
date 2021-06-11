<!--
 * @Author: yaoyuting
 * @Date: 2021-04-13 07:55:01
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-16 10:39:40
 * @Descripttion: 
-->
<template>
  <div class="Technology">
    <div class="banner">
      <div class="technology_content">
        <div class="content_title">
          <p>{{ $t("Technology.index") }}
            </p>
            <p>
              {{ $t("Technology.index2") }}
              </p></div>
       
        <a href="http://47.75.93.221/devDocsEn/" target="_blank"
          >{{ $t("Technology.more") }} <i class="el-icon-right"></i
        ></a>
        <a href="https://pili-vod.uenc.net/uencWhitePaperCN.pdf" target="_blank"
          >{{ $t("navbar.whitepaper") }} <i class="el-icon-right"></i
        ></a>
      </div>
    </div>
    <div class="introduced">
      <div class="about_bg">
        <div class="about">
          <div class="sub_title">{{ $t("Technology.TechnologyTitle") }}</div>
          <div class="list">
            <div class="item">
              <div class="images all_center">
                <img src="@/assets/images/index/网状网络.png" alt="" />
              </div>
              <div class="title">{{ $t("Technology.DHT") }}</div>
              <div class="content">{{ $t("Technology.DHTText") }}</div>
            </div>
            <div class="item">
              <div class="images all_center">
                <img src="@/assets/images/index/共识算法.png" alt="" />
              </div>
              <div class="title">{{ $t("Technology.DPOW") }}</div>
              <div class="content">{{ $t("Technology.DPOWText") }}</div>
            </div>
          </div>
          <div class="list">
            <div class="item">
              <div class="images all_center">
                <img src="@/assets/images/index/存储技术.png" alt="" />
              </div>
              <div class="title">{{ $t("Technology.Cross") }}</div>
              <div class="content">{{ $t("Technology.CrossaText") }}</div>
            </div>
            <div class="item">
              <div class="images all_center">
                <img src="@/assets/images/index/可验证计算.png" alt="" />
              </div>
              <div class="title">{{ $t("Technology.Verifiable") }}</div>
              <div class="content">{{ $t("Technology.VerifiableText") }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="features_bg">
        <div class="features">
          <div class="sub_title">{{ $t("Technology.Characteristic") }}</div>
          <div class="list">
            <div class="item">
              <div class="num">01</div>
              <div class="title">{{ $t("Technology.Decentralization") }}</div>
              <div class="content">
                {{ $t("Technology.DecentralizationText") }}
              </div>
            </div>
            <div class="images">
              <img src="@/assets/images/index/去中心化@2x.png" alt="" />
            </div>
          </div>
          <div class="list">
            <div class="images">
              <img src="@/assets/images/index/隐私及安全@2x.png" alt="" />
            </div>
            <div class="item">
              <div class="num">02</div>
              <div class="title">{{ $t("Technology.Privacy") }}</div>
              <div class="content">{{ $t("Technology.PrivacyText") }}</div>
            </div>
          </div>
          <div class="list">
            <div class="item">
              <div class="num">03</div>
              <div class="title">{{ $t("Technology.concurrency") }}</div>
              <div class="content">{{ $t("Technology.concurrencyText") }}</div>
            </div>
            <div class="images">
              <img src="@/assets/images/index/高并发@2x.png" alt="" />
            </div>
          </div>
          <div class="list">
            <div class="images">
              <img src="@/assets/images/index/高速度@2x.png" alt="" />
            </div>
            <div class="item">
              <div class="num">04</div>
              <div class="title">{{ $t("Technology.speed") }}</div>
              <div class="content">{{ $t("Technology.speedText") }}</div>
            </div>
          </div>
          <div class="list">
            <div class="item">
              <div class="num">05</div>
              <div class="title">{{ $t("Technology.cost") }}</div>
              <div class="content">{{ $t("Technology.costText") }}</div>
            </div>
            <div class="images">
              <img src="@/assets/images/index/低成本@2x.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="path_bg">
        <div class="path">
          <div class="subTitle">{{ $t("Technology.roadmap") }}</div>
          <div class="images">
            <template v-if="$t('index.switch') === 'en'">
              <img src="@/assets/images/index/pathEn.png" alt="" class="path_path2" />
            </template>
            <template v-else>
              <img src="@/assets/images/index/路线图.png" alt=""  class="path_path"/>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style lang="less" scoped>
.Technology {
  .banner {
    height: 900px;
    background: url("https://pili-vod.uenc.net/uenc_pc_teHeader.png") no-repeat center/100% 100%;

    padding-top: 350px;
    .technology_content {
      width: 1200px;
      margin: 0 auto;
      .title {
        font-size: 40px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 52px;
        color: #333333;
      }
      .content_title {
        width: 600px;

        font-size: 60px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 80px;
        color: #ffffff;
        opacity: 1;
        margin-bottom: 35px;
      }
      a {
        color: #fff;
        font-size: 20px;
        margin-right: 80px;
      }
    }
  }
  .introduced {
    .about_bg {
      background-image: url("../../assets/images/index/js_bg.png");
      background-size: cover;
      background-position: center center;
      min-height: 1506px;
    }
    .features_bg {
      // background-image: url("../../assets/images/index/tx_bg.png");
      // background-size: cover;
      // background-position: center center;
       background: url("../../assets/images/index/tx_bg.png") no-repeat
        center/100% 100%;
    }
    .path_bg {
      background: url("../../assets/images/index/技术.png") no-repeat
        center/100% 100%;

      min-height: 1818px;
      height: auto;
    }
    .sub_title {
      // border-top: 4px solid #0d051f;
      font-size: 50px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 66px;
      color: #333333;
      text-align: left;
    }
    .about {
      width: 1200px;
      margin: 0 auto;
      padding-top: 104px;
      padding-bottom: 16px;
      .list:nth-child(2) {
        img {
          height: 249px;
        }
      }
      .list:nth-child(3) {
        .item:nth-child(1) {
          img {
            height: 230px;
          }
        }
        .item:nth-child(2) {
          img {
            height: 258px;
          }
        }
      }
      .list {
        display: flex;
        justify-content: space-between;
        padding-top: 40px;
        padding-bottom: 100px;
        .item {
          width: 520px;
          .images {
            width: 520px;
            height: 300px;
            box-shadow: 0px 2px 40px 0px rgba(167, 161, 249, 0.3);
            background-color: #fff;
          }
          .title {
            font-size: 40px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            line-height: 52px;
            color: #333333;
            opacity: 1;
            text-align: left;

            margin-top: 30px;
          }
          .content {
            width: 520px;
            height: 96px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 32px;
            color: #333333;
            opacity: 1;
            text-align: left;

            margin-top: 30px;
          }
        }
      }
      .list:first-child {
        margin-top: 48px;
      }
    }
    .features {
      width: 1200px;
      margin: 0 auto;
      padding-top: 106px;
      padding-bottom: 200px;
      .list {
        display: flex;
        justify-content: space-between;
        .item {
          width: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .num {
            font-size: 20px;
            font-family: Futura, Futura-MediumItalic;
            font-weight: MediumItalic;
            text-align: left;
            color: #0d051f;
            line-height: 27px;
            border-bottom: 1px solid #0d051f;
          }
          .title {
            font-size: 40px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            line-height: 52px;
            color: #333333;
            opacity: 1;
         
            text-align: left;

            margin-top: 37px;
            margin-bottom: 30px;
          }
          .content {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 32px;
            color: #333333;
            opacity: 1;
            text-align: left;
          }
        }
        .images {
          width: 480px;
        }
      }
      .list:nth-child(2) {
        img {
          width: 344px;
          height: 370px;
          margin-left: -31px;
        }
      }
      .list:nth-child(3) {
        margin-top: 236px;
        img {
          width: 344px;
          height: 381px;
          margin-left: 36px;
        }
      }
      .list:nth-child(4) {
        margin-top: 132px;
        img {
          width: 388px;
          height: 340px;
          margin-left: 25px;
        }
      }
      .list:nth-child(5) {
        margin-top: 176px;
        img {
          width: 382px;
          height: 352px;
        }
      }
      .list:nth-child(6) {
        margin-top: 210px;
        img {
          width: 399px;
          height: 285px;
          margin-left: 16px;
        }
      }
    }
    .path {
      width: 1200px;
      margin: 0 auto;
      padding-top: 140px;
      padding-bottom: 150px;
      .subTitle {
        font-size: 50px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 66px;
        color: #333333;
        opacity: 1;
        text-align: center;

        margin-bottom: 87px;
      }
      // .path_path {
      //   width: 635px !important;
      //   height: 2207px !important;
      // }
      .images {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        .path_path2{
           width:1200px;
          height: 1599px;
        }
         .path_path{
           width:1200px;
          height:1147px;
        }
        img {
          // width:1200px;
          margin: 0 auto;
          // height: 1147px;
        }
      }
    }
  }
}
</style>
