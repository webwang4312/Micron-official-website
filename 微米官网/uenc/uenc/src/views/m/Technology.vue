<!--
 * @Author: yaoyuting
 * @Date: 2021-04-13 07:55:01
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-18 08:11:04
 * @Descripttion: 
-->
<template>
  <div class="Technology">
    <div class="banner">
      <!-- <div class="logo">
        <router-link to="/m/synopsis"> -->
      <!-- <img src="@/assets/imagesm/js/奖励@2x.png"  alt="暂无图片"/> -->
      <!-- </router-link>
      </div> -->
      <div class="contents">
        <!-- <div class="list">{{ $t("index.index1") }}</div> -->
        <div class="title">
          <p>{{ $t("Technology.index") }}</p>
          <p>{{ $t("Technology.index2") }}</p>
        </div>
        <div class="zong">
          <div class="item">
            <a href="http://47.75.93.221/devDocsEn/" target="_blank"
              >{{ $t("Technology.more") }} <i class="el-icon-right"></i
            ></a>
          </div>
          <!-- <div class="item">
            <a href="http://123.56.155.79/baipishu.pdf" target="_blank"
              >{{ $t("navbar.whitepaper") }} <i class="el-icon-right"></i
            ></a>
          </div> -->
        </div>
      </div>
    </div>
    <div class="introduced">
      <div class="about_bg">
        <div class="about">
          <div class="sub_title">{{ $t("Technology.TechnologyTitle") }}</div>
          <div class="box-card">
            <div class="title">
              {{ $t("Technology.DHT") }}
            </div>
            <div class="content">{{ $t("Technology.DHTText") }}</div>
            <div class="images">
              <img src="@/assets/imagesm/js/DHT.png" alt="暂无图片" />
            </div>
          </div>
          <div class="box-card">
            <div class="title">
              {{ $t("Technology.DPOW") }}
            </div>
            <div class="content">{{ $t("Technology.DPOWText") }}</div>
            <div class="images">
              <img src="@/assets/imagesm/js/共识算法.png" alt="暂无图片" />
            </div>
          </div>
          <div class="box-card">
            <div class="title">
              {{ $t("Technology.Cross") }}
            </div>
            <div class="content">{{ $t("Technology.CrossaText") }}</div>
            <div class="images">
              <img src="@/assets/imagesm/js/存储.png" alt="暂无图片" />
            </div>
          </div>
          <div class="box-card">
            <div class="title">
              {{ $t("Technology.Verifiable") }}
            </div>
            <div class="content">{{ $t("Technology.VerifiableText") }}</div>
            <div class="images">
              <img src="@/assets/imagesm/js/可验证计算.png" alt="暂无图片" />
            </div>
          </div>
        </div>
      </div>
      <div class="features_bg">
        <div class="features">
          <div class="sub_title">{{ $t("Technology.Characteristic") }}</div>
          <div class="details">
            <div class="list">
              <div class="num">01</div>
              <div class="bgc"></div>
              <div class="title">{{ $t("Technology.Decentralization") }}</div>
              <div class="content">
                {{ $t("Technology.DecentralizationText") }}
              </div>
              <div class="images">
                <img src="@/assets/imagesm/js/1.png" alt="暂无图片" />
              </div>
            </div>
            <div class="list">
              <div class="num">02</div>
              <div class="bgc"></div>
              <div class="title">{{ $t("Technology.Privacy") }}</div>
              <div class="content">{{ $t("Technology.PrivacyText") }}</div>
              <div class="images">
                <img src="@/assets/imagesm/js/2.png" alt="暂无图片" />
              </div>
            </div>
            <div class="list">
              <div class="num">03</div>
              <div class="bgc"></div>
              <div class="title">{{ $t("Technology.concurrency") }}</div>
              <div class="content">{{ $t("Technology.concurrencyText") }}</div>
              <div class="images">
                <img src="@/assets/imagesm/js/3.png" alt="暂无图片" />
              </div>
            </div>
            <div class="list">
              <div class="num">04</div>
              <div class="bgc"></div>
              <div class="title">{{ $t("Technology.speed") }}</div>
              <div class="content">{{ $t("Technology.speedText") }}</div>
              <div class="images">
                <img src="@/assets/imagesm/js/4.png" alt="暂无图片" />
              </div>
            </div>
            <div class="list">
              <div class="num">05</div>
              <div class="bgc"></div>
              <div class="title">{{ $t("Technology.cost") }}</div>
              <div class="content">{{ $t("Technology.costText") }}</div>
              <div class="images">
                <img src="@/assets/imagesm/js/5.png" alt="暂无图片" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="path_bg">
        <div class="path">
          <div class="subTitle">{{ $t("Technology.roadmap") }}</div>
          <div class="images">
           
              <img src="../../assets/imagesm/js/pathEn.png" alt="暂无图片" v-if="$t('index.switch') === 'en'"/>
          
              <img src="../../assets/imagesm/js/path.png" alt="暂无图片" v-else />
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.Technology {
  .banner {
   height: 660px;
  
    background-image: url("../../assets/imagesm/js/banner.png");
    background-size: cover;
    background-position: center center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 220px 140px 206px 40px;
    .title {
      margin-bottom: 46px;

      font-size: 56px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 69px;
      color: #ffffff;
      opacity: 1;
    }
    .contents {
      display: flex;
      flex-direction: column;
      .zong {
        display: flex;
        flex-direction: row;
      }
      .item:nth-child(1) {
        margin-right: 40px;
      }
      .item {
        // margin-top: 36px;
        border: 2px solid #ffffff;
        opacity: 1;
        border-radius: 30px;
        padding: 12px 20px;
        a {
          font-size: 28px;
          font-family: PingFangSC-Medium;
          line-height: 38px;
          color: #ffffff;
          opacity: 1;
        }
      }
    }
  }
  .introduced {
    width: 750px;
    .about_bg {
      background-image: url("../../assets/imagesm/js/bg1.png");
      background-size: cover;
      background-position: center center;
    }
    .features_bg {
      background-image: url("../../assets/imagesm/js/bg2.png");
      background-size: cover;
      background-position: center center;
    }
    .path_bg {
       background: url("../../assets/imagesm/js/bg4.png") no-repeat
    center/100% 100%;
      // background-image: url("../../assets/imagesm/js/bg4.png");
      // background-size: cover;
      // background-position: center center;
    }
    .sub_title {
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 28px;
      color: #000000;
      opacity: 1;
      text-align: center;
    }
    .about {
      padding: 62px 44px 40px 42px;
      //  background: gray;
      .sub_title {
        height: 66px;
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 600;
         line-height: 66px;
        color: #000000;
        opacity: 1;
        text-align: center;
        margin-bottom: 40px;
      }
      .box-card {
        // padding: 0 50px;
        padding-bottom: 66px;
        .images {
          width: 440px;
          height: 400px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 2px 10px 0px rgba(167, 161, 249, 0.2);
          margin: 0 auto;
          img {
            width: 320px;
            height: 260px;
           
          }
        }
        .title {
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 56px;
          color: #000000;
          opacity: 1;

          margin-bottom: 30px;
        }
        .content {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 52px;
          color: #333333;
          opacity: 1;
          margin-bottom: 36px;
        }
      }
    }
    .features {
      padding: 178px 40px 62px;
      .details {
        margin-top: 46px;
      }
      .list {
        .num {
          font-size: 28px;
          font-family: Futura-MediumItalic;
          line-height: 38px;
          color: #000000;
          opacity: 1;
          margin-bottom: 36px;
        }
        .bgc {
          width: 540px;
          height: 2px;
          opacity: 1;
          background: linear-gradient(270deg, rgba(98, 98, 98, 0), #333333);
        }
        .title {
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 500;
          line-height: 56px;
          color: #333333;
          opacity: 1;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .content {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 52px;
          color: #333333;
          opacity: 0.7;

          margin-bottom: 60px;
        }
        .images {
          // text-align: center;
 
          margin-bottom: 62px;
          img{
            margin-left:166px;
          }
        }
      }
      .list:nth-child(1) {
        img {
          width: 135 * 2px;
          height: 146 * 2px;
        }
      }
      .list:nth-child(2) {
        img {
          width: 152 * 2px;
          height: 172 * 2px;
        }
      }
      .list:nth-child(3) {
        img {
          width: 186 * 2px;
          height: 162 * 2px;
        }
      }
      .list:nth-child(4) {
        img {
          width: 173 * 2px;
          height: 159 * 2px;
        }
      }
      .list:nth-child(5) {
        img {
          width: 186 * 2px;
          height: 133 * 2px;
        }
      }
    }
    .path {
      padding-top: 82px;
      padding-bottom: 206px;
      .subTitle {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 66px;
        color: #000000;
        opacity: 1;
        text-align: center;
        margin-bottom: 80px;
      }
      .images {
        // background-color: #fff;
        padding: 52px 6px;
        img {
          width: 337 * 2px;
        }
      }
    }
  }
}
</style>
