<template>
  <div class="block">
    <headertop></headertop>
    <div class="blockzong">
      <!-- 搜索栏区域 -->
      <search></search>
      <!-- 内容区域 -->
      <div class="blockcontent">
        <p class="title">{{ $t("block.content[0]") }}</p>
        <el-table
         empty-text='Loading...'
          v-loading="loading"
          :data="blockData"
          style="width: 100%"
          class="addressltable"
          @row-click="gotoblockdetail"
        >
          <el-table-column
            prop="block_height"
            :label="$t('publicsection[3]')"
          
          ></el-table-column>
          <el-table-column
            align="center"
            prop="block_time"
            :label="$t('publicsection[8]')"
         
          ></el-table-column>
          <el-table-column
            align="center"
            prop="transaction_num"
            :label="$t('publicsection[4]')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="transaction_amount"
            :label="$t('publicsection[5]')"
          ></el-table-column>
          <el-table-column
            align="right"
            prop="transaction_award"
            :label="$t('home.cardleft[2]')"
          ></el-table-column>
        </el-table>
        <div class="block">
          <div class="blocks">
            <img
              src="@assets/images/footer/加载中.gif"
              style="width:32px;height:32px;margin-right:30px"
              v-if="icon"
            />
            <span v-if="totalNum == 1">1</span>
            <span v-else>{{ blockmedianum }}-{{ totalNum }}</span>
            <img
              src="@assets/images/footer/组 75.png"
              @click="pageJian"
              style="margin-right:30px"
            />
            <img
              src="@assets/images/footer/组 76.png"
              @click="pageJia"
              style="margin-right:20px"
            />
          </div>

          <!-- <el-pagination
            :current-page.sync="blockmedianum"
            :page-size="20"
            :pager-count="5"
            layout="total, prev, pager, next, jumper"
            :total="totalNum"
            @current-change="change"
            v-if="totalNum != 0"
            ref="pagination"
          ></el-pagination> -->
          <!-- <span class="shouye" @click="gotofirst" :class="{ blue: blue1 }"
            >{{ $t("page[0]") }}</span
          >
          <span class="weiye" @click="gotolast" :class="{ blue: blue2 }"
            >{{ $t("page[1]") }}</span
          > -->
        </div>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import VFooter from "@components/common/Footer.vue";
import Search from "@components/common/search.vue";
import headertop from "@components/common/HeaderTop";
export default {
  name: "block",
  data() {
    return {
      icon: false,
      loading: true,

      // 外部公共部分
      language: "",

      // 语言图片显示与隐藏

      choselanguage: ["中文", "EN"],
      nowLang: "",

      fullscreenLoading: false,
      // 分页
      blockmedianum: 1,
      internalCurrentPage: "",
      totalNum: "",
      blockData: [],
      // 页码设置
      blue1: false,
      blue2: false,
    };
  },
  components: { VFooter, Search, headertop },
  created() {
    this.nowLang = this.$i18n.locale;

    this.blockmedianum = 1;
    if (this.blockmedianum == 1) {
      this.blue1 = true;
    }
    this.blocklist();
    // this.$nextTick(() => {
    //   //console.log(this.$refs);
    //   this.$refs.pagination.internalCurrentPage = this.blockmedianum;
    // });
  },

  // 页码设置
  watch: {
    blockmedianum(val) {
      //console.log(val);
      if (val == 1) {
        this.blue1 = true;
      } else {
        this.blue1 = false;
      }
    },
  },
  methods: {
    pageJian() {
      if (this.blockmedianum >= 2) {
        if (this.icon == false) {
          this.blockmedianum -= 1;
          this.loading = true;
          this.blocklist();
        } else {
        }
      } else {
        return false;
      }
    },
    pageJia() {
      if (this.blockmedianum < this.totalNum) {
        if (this.icon == false) {
          this.blockmedianum += 1;
          this.loading = true;
          this.blocklist();
        } else {
        }
      } else {
        return false;
      }
    },
    // 页码设置
    // 去首页
    gotofirst() {
      this.blockmedianum = 1;
      this.blue2 = false;
      this.blue1 = true;
      this.blocklist();
    },
    // 去尾页
    gotolast() {
      this.blue1 = false;
      this.blue2 = true;
      //console.log(parseInt(this.totalNum / 20));
      if (this.totalNum % 20 == 0) {
        this.blockmedianum = this.totalNum / 20;
      } else {
        this.blockmedianum = parseInt(this.totalNum / 20) + 1;
      }
      //console.log(this.blockmedianum );
      this.blocklist();
    },
    // 点击表格行显示数据
    gotoblockdetail(row, event, column) {
      this.$router.push({
        path: "blockdetail",
        query: {
          // 高度
          blockheight: row.block_height,
        },
      });
      // console.log(row, event, column);
    },
    //给sessionStorage存值,分页返回时准确位置
    setContextData: function(key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function(key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    },
    change(val) {
      //console.log(val);
      this.blockmedianum = val;
      //console.log(this.medianum);
      this.blocklist();
      this.setContextData("currentpage1", this.blockmedianum);
    },
    //获取MEDIA
    async blocklist() {
      this.icon = true;
      let that = this;
      var blockData = [];
      // var data = Qs.stringify({ pageNum: this.blockmedianum, pageSize: 20 });
      await that.$http
        .get("/get_block_list_for_all", {
          params: {
            pageNum: this.blockmedianum,
            pageSize: 20,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.loading = false;
            this.icon = false;
          }

          //  console.log(res);
          this.totalNum = res.data[0].total_page[0].totalPageNum;
          //console.log(this.totalNum);
          if (this.nowLang == "cn") {
            for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
              var obj = {};
              let times = [];
              obj.block_height = res.data[0].block_list[i].block_height;
              let blocktime = res.data[0].block_list[i].block_time;
              // .substring(0, 13)
              // .valueOf();
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res.data[0].timeStamp;
              // console.log(timestamp);
              // console.log(timestamp + "xianzai");
              let s = timestamp - blocktime; //9.20
              //  console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              // console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  times.push("刚刚");
                } else {
                  times.push(parseInt(fenzhong) + "分钟前");
                }
                obj.block_time = times;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "小时前");
                obj.block_time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "天前");
                obj.block_time = times;
              }
              // obj.block_time = this.timestampToTime(
              //   Number(
              //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
              //   )
              // );
              obj.transaction_num = res.data[0].block_list[i].transaction_num;
              obj.transaction_amount =
                res.data[0].block_list[i].transaction_amount;
              obj.transaction_award =
                res.data[0].block_list[i].transaction_award;
              //console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.blockData = blockData;
              //console.log(obj);
            }
          } else {
            for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
              var obj = {};
              let times = [];
              obj.block_height = res.data[0].block_list[i].block_height;
              let blocktime = res.data[0].block_list[i].block_time;
              // .substring(0, 13)
              // .valueOf();
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res.data[0].timeStamp;
              // console.log(timestamp);
              // console.log(timestamp + "xianzai");
              let s = timestamp - blocktime; //9.20
              //  console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              //  console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  times.push("just");
                } else {
                  times.push(parseInt(fenzhong) + "minutes ago");
                }
                obj.block_time = times;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "hour ago");
                obj.block_time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "days ago");
                obj.block_time = times;
              }
              // obj.block_time = this.timestampToTime(
              //   Number(
              //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
              //   )
              // );
              obj.transaction_num = res.data[0].block_list[i].transaction_num;
              obj.transaction_amount =
                res.data[0].block_list[i].transaction_amount;
              obj.transaction_award =
                res.data[0].block_list[i].transaction_award;
              //console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.blockData = blockData;
              //console.log(obj);
            }
          }
          // table赋值

          localStorage.setItem("lan", this.nowLang);
        })
        .catch((e) => {});
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>
<style lang="less">
.sticky {
  width: 1200px !important;
  height: 120px !important;
  position: fixed;
  top: 0px;
  margin: 0 auto !important;
}

// 本页面
.block {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 20px;
  opacity: 1;
  border-radius: 40px;
  z-index: 1;
  .blockzong {
    width: 1200px;
    height: auto;
    background: rgba(232, 234, 243, 1);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 40px;
    margin: 0 auto;
  }
  // 内容部分
  .blockcontent {
    width: 1120px;
    height: 1250.5px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 20px;
    margin: 0 auto;

    .el-table th,
    .el-table tr {
      background-color: #d5e1f4;
    }

    .title {
      position: relative;
      left: 42px;
      top: 30px;
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: bold;
      line-height: 28px;
      color: rgba(40, 96, 194, 1);
      opacity: 1;
    }
    .addressltable {
      position: relative;
      width: 1040px !important;
      height: 1069px;
      top: 50px;
      background: rgba(40, 96, 194, 0.1);
      margin: 0 auto;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      cursor: pointer;
      .el-table__row {
        background: rgba(233, 239, 249) !important;
      }

      .has-gutter tr th:nth-child(1)  {
        div{
text-align: left;
        padding-left: 30px !important;
        }
        
        border-bottom-left-radius: 10px !important;
      }
      .has-gutter tr th:nth-child(5) div {
        text-align: right;
        padding-right: 30px !important;
      }
      .has-gutter tr th:nth-last-child(2) {
        border-bottom-right-radius: 10px !important;
      }
      tbody tr td:nth-child(1) {
        text-align: left;
        padding-left: 20px !important;
      }
      tbody tr td:nth-child(5) {
        padding-right: 20px !important;
      }
      .has-gutter tr th {
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 22px;
        color: rgba(40, 96, 194, 1);
        background: rgba(40, 96, 194, 0.1);
      }
      .el-table__row td {
        background: rgba(233, 239, 249) !important;

        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 22px;
        color: rgba(51, 51, 51, 1);
        opacity: 1;
        height: 51px;
        border-bottom: 1px solid rgba(51, 51, 51, 0.1) !important;
      }
      .el-table__row:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        td {
          background-color: rgb(213, 225, 244) !important ;
        }
      }

      .el-table tr {
        background: rgba(40, 96, 194, 0.1) !important;
        //  background: rgba(40, 96, 149) !important;
      }
    }
    // 页码设置
    .block {
      border-top: 1px solid rgba(51, 51, 51, 0.1) !important;
      position: relative;
      top: 50px;
      width: 1040px !important;
      height: 64px;
      line-height: 64px;
      background: rgba(40, 96, 194, 0.1);
      margin: 0 auto;
      // padding-left: 30%;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;

      .blocks {
        position: absolute;
        right: 20px;
        top: 17px;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          font-size: 16px;
          font-family: "苹方-简";
          font-weight: normal;
          line-height: 22px;
          color: #666666;
          opacity: 1;
          margin-right: 30px;
        }
        img {
          cursor: pointer;
        }
      }

      // .el-pagination__total {
      //   position: absolute;
      //   top: 21px;
      //   left: 188px;
      //   font-size: 16px;
      //   font-family: "苹方-简";
      //   font-weight: normal;
      //   line-height: 22px;
      //   color: rgba(40, 96, 194, 1);
      //   opacity: 1;
      // }
      .el-pagination {
        position: relative;
        top: 18px;
      }
      .shouye {
        position: absolute;
        top: 21px;
        left: 309px;
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 22px;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        cursor: pointer;
      }
      // .btn-prev {
      //   position: absolute;
      //   top: 21px;
      //   left: 371px;
      // }
      // .el-pager {
      //   position: relative;
      //   top: 19px;
      //   left: 62px;
      // }
      // .btn-next {
      //   position: relative;
      //   top: 19px;
      //   left: 60px;
      // }
      .weiye {
        position: absolute;
        top: 21px;
        left: 600px;
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 22px;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        cursor: pointer;
      }
      // .el-pagination__jump {
      //   position: relative;
      //   top: 15px;
      //   left: 182px;
      // }
    }
  }
}
</style>
