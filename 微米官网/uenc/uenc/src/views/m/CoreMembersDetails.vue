<!--
 * @Author: yaoyuting
 * @Date: 2021-04-12 21:25:05
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-14 13:41:24
 * @Descripttion: 
-->
<template>
  <div class="CoreMembers">
    <div class="banner"></div>
    <div class="content_bg">
      <div class="content">
        <div class="title">{{ $t("navbar.TeamMembers") }}</div>
        <div class="lists">
          <div
            class="list"
            v-for="(msember, index) in msemberList"
            :key="msember.usersId"
          >
            <img
              :src="msember.images"
              alt="暂无图片"
              :class="
                introduce && introduce.usersId == msember.usersId
                  ? 'active'
                  : ''
              "
              @click="tab(msember.usersId)"
            />
            <div
              class="details"
              :style="
                `${
                  index % 3 === 0
                    ? 'left:0'
                    : (index - 1) % 3 === 0
                    ? ''
                    : 'right:0'
                }`
              "
              v-if="introduce && introduce.usersId == msember.usersId"
            >
              <div class="top">
                <div class="name">
                  {{
                    $t("index.switch") === "en"
                      ? introduce.userNameEn
                      : introduce.userName
                  }}
                </div>
                <div class="all_center">
                  <img
                    src="@/assets/imagesm/cy/icon.png"
                    alt="暂无图片"
                    srcset=""
                  />
                </div>
              </div>
              <div class="position">
                {{
                  $t("index.switch") === "en" ? introduce.jobEn : introduce.job
                }}
              </div>
              <div class="about">
                {{
                  $t("index.switch") === "en"
                    ? introduce.introductionEn
                    : introduce.introduction
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetMsemberDetail, GetMsemberLists } from "@/assets/server/api.js";
import { baseURL } from "@/utils/utils";
export default {
  data() {
    return {
      msemberList: [],
      introduce: null,
    };
  },
  created() {
    this.getMsemberList();
  },
  methods: {
    async getMsemberList() {
      const dataList = await GetMsemberLists();
      if (dataList.code === 0) {
        dataList.rows.forEach((item) => {
          item.images = item.images;
        });
        this.msemberList = dataList.rows;
      } else {
        this.$notify({
          type: "danger",
          message:
            this.$t("index.switch") === "cn"
              ? "接口错误！"
              : "Interface error!",
        });
      }
    },
    async tab(id) {
      const data = await GetMsemberDetail(id);
      if (data.code === 0) {
        this.introduce = data.data;
      } else {
        this.$notify({
          type: "danger",
          message:
            this.$t("index.switch") === "cn"
              ? "接口错误！"
              : "Interface error!",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.CoreMembers {
  .banner {
    height: 265 * 2px;
    background-image: url("../../assets/imagesm/indba.png");
    background-size: cover;
    background-position: center center;
  }
  .content_bg {
    background-image: url("../../assets/imagesm/cy/bg.png");
    background-size: 750px;
    .content {
      padding: 80px 81px 220px 81px;
      .title {
        font-size: 44px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 60px;
        color: #333333;
        opacity: 1;

        padding-top: 68px;
        margin-bottom: 72px;
      }
      .lists {
        width: 100%;
        display: flex;
        flex-direction: row;
         
        flex-wrap: wrap;
       
        // padding: 0px 32px 500px;
        // padding-bottom: 500px;
        .list:nth-child(3n+3) {
          margin-right: 0px;
       }
        .list {
          // margin: 20px 48px;
            width: 120px;
            height: 120px;
        
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
           margin-right: 114px;
          margin-bottom: 70px;
          text-align: center;
          img {
            width: 115px;
            height: 115px;
            border-radius: 50%;
          }
          .active {
            box-shadow: 0px 0px 25px 0px #5432f4;
            border: 1px solid #fff;
          }
          .details {
             position: absolute;
            z-index: 10;
            // top: 40%;
            width: 500px;
            background: rgba(0, 0, 0, 0.85);
            color: #fff;
            padding: 30px 35px;
            border-radius: 24px;
            .top {
              display: flex;
              justify-content: space-between;
              img {
                width: 40px;
                height: 32px;
              }
            }
            .name {
              font-size: 40px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              margin-right: 100px;
            }
            .position {
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
            }
            .about {
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 36px;
              margin-top: 22px;
              margin-bottom: 30px;
              word-break: break-all;
            }
          }
        }
      }
    }
  }
}
</style>
