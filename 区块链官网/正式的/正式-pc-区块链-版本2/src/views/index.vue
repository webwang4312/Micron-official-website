<template>
  <div class="index">
    <headertop></headertop>
    <div class="index_top">
      <div class="title">
        UENC EXPLORER
      </div>
      <Search></Search>
    </div>
    <div class="info">
      <div class="info_top">
        <ul>
          <div class="block_height"></div>
          <div>
            <div class="center_top">
              {{ blockheigth }}
            </div>
            <div class="center_bottom">
             {{ $t('publicsection')[3]}}
            </div>
          </div>
          <div class="line_right"></div>
        </ul>
        <ul class="top_left">
          <div class="transaction24"></div>
          <div>
            <div class="center_top">
              {{ transzoom }}
            </div>
            <div class="center_bottom">
              24H交易数
            </div>
          </div>
          <div class="line_right"></div>
        </ul>
        <ul class="top_left">
          <div class="award"></div>
          <div>
            <div class="center_top">
              22
            </div>
            <div class="center_bottom">
              已发放奖励
            </div>
          </div>
          <div class="line_right2"></div>
        </ul>
      </div>
      <div class="info_line"></div>
      <div class="info_top info_bottom">
        <ul>
          <div class="alljiedian"></div>
          <div>
            <div class="center_top">
              {{ blockheigth }}
            </div>
            <div class="center_bottom">
              节点总数
            </div>
          </div>
          <div class="line_right"></div>
        </ul>
        <ul class="top_left">
          <div class="alltransaction"></div>
          <div>
            <div class="center_top">
              {{ transzoom }}
            </div>
            <div class="center_bottom">
              累计交易数
            </div>
          </div>
          <div class="line_right"></div>
        </ul>
        <ul class="top_left">
          <div class="last_award"></div>
          <div>
            <div class="center_top">
              22
            </div>
            <div class="center_bottom">
              剩余区块奖励
            </div>
          </div>
          <div class="line_right2"></div>
        </ul>
      </div>
    </div>
    <div class="chart">
      <div id="bars"></div>
      <div id="bar"></div>
    </div>
    <div class="info_list">
      <div class="last_transaction">
        <div class="subject">
          <div>
            最新交易
          </div>
          <div class="more" @click="goToTransaction">
            更多<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content" v-for="item in tableData" :key="item">
          <li>
            <div class="content_left">
              TX<span> {{ item.date.toString() }}</span>
              <br />
              <span>
                {{ item.date.toString() }}
              </span>
            </div>
            <div class="content_center">
              从
              <span @click="goToAddressDetail(item.from_address)
              ">
                {{ item.from_address }}
              </span>
              <br />
              至
              <span @click="goToAddressDetail(item.to_address)
              ">
                {{ item.to_address }}
              </span>
            </div>
            <div class="content_right">
              <span>
                {{ item.amount }}
              </span>
              UENC
            </div>
          </li>
        </ul>
      </div>
      <div class="last_block">
        <div class="subject">
          <div>
            最新出块
          </div>
          <div class="more" @click="goToBlock">
            更多<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content" v-for="item in tableData2" :key="item">
          <li>
            <div class="content_left">
              TX<span @click="goToBlockDetail(item.block_height)">
                {{ item.block_height }}</span
              >
              <br />
              <span>
                {{ item.time.toString() }}
              </span>
            </div>
            <div class="content_center">
              <span>
                {{ item.amount }}
              </span>
            </div>
            <div class="content_right">
              <span>
                {{ item.award }}
              </span>
              UENC
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import headertop from "@components/common/HeaderTop";
import VFooter from "@components/common/Footer.vue";
import Search from "@components/common/Search.vue";
export default {
  name: "index",
  inject: ["reload"],
  data() {
    return {
      timer: null, //定时器名称
      // 固定设置
      tables: false,
      nowLang: "",
      language: "",
      // 语言图片显示与隐藏
      show: true,
      money: "",
      money2: "",
      // 卡片左边所有的数据
      // 区块高度
      blockheigth: "",
      // 24小时交易笔数?
      transzoom: "",
      // 24小时交易总额?
      transmoney: "" || 0,
      //  交易笔数
      transnumber: "",
      // 区块奖励
      blockreward: "",
      // 剩余区块奖励
      blocklastreward: "",
      echartsed: [],
      // 本页面
      tableData: [
        {
          transaction_hash: "",
          transaction_hash2: "",
          date: "",
          amount: "",
          from_address: "",
          to_address: "",
          gas: "",
        },
      ],
      tableData2: [
        {
          block_height: "",
          time: "",
          tx_num: "",
          amount: "",
          award: "",
        },
      ],
      tabledataall: "",
      pie: [],
    };
  },
  watch: {},
  components: { headertop, Search, VFooter },
  created() {
    this.nowLang = this.$i18n.locale;
    this.indexlist();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    goToAddressDetail(item){
 this.$router.push({
        path: "/addressdetail",
        query:{
         address:item
        }
      });
    },
    goToTransaction() {
      this.$router.push({
        path: "/tranaction",
      });
    },

    goToBlock() {
      this.$router.push({
        path: "/block",
      });
    },
    goToBlockDetail(item) {
     this.$router.push({
        path: "/blockdetail",
        query:{
          block:item
        }
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("bars"));
      let myChart2 = echarts.init(document.getElementById("bar"));
      var data = [];
      // 绘制图表
      myChart.setOption({
        title: {
          text: "区块奖励",
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 25, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            color: "rgba(81, 81, 81, 1)",
            fontSize: "18px",
            fontFamily: "Arial",
            fontWeight: "bolder",
          },
        },

        xAxis: {
          type: "category",
          splitLine: { show: false }, //去除网格线
          boundaryGap: false,
          data: [],
          axisLine: {
            //y轴
            show: false,
          },
          axisLabel: {
            interval: 0,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },

        yAxis: {
          max: function(value) {
            return value.max + 100;
          },
          splitNumber: 4,

          type: "value",
          position: "left",
          splitLine: { show: false }, //去除网格线

          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {},
            symbol: "circle", //拐点样式
            smooth: true, //true 为平滑曲线，false为直线
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "left",
                  textStyle: {},
                },
              },
              lineStyle: {
                // 系列级个性化折线样式
                width: 3,
                type: "solid",
                color: "green", //折线的颜色
              },
            },
          },
        ],
      });
      myChart2.setOption({
        title: {
          text: "每日交易总额",
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
         padding: 25, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            color: "rgba(81, 81, 81, 1)",
            fontSize: "18px",
            fontFamily: "Arial",
            fontWeight: "bolder",
          },
        },
        xAxis: {
          type: "category",
          data: [],
          splitLine: { show: false }, //去除网格线
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: { show: false }, //去除网格线

          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        tooltip: { trigger: "item" },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(238, 242, 252, 1)",
              borderRadius: 20, // 统一设置四个角的圆角大小
            },
            barWidth: 14,
            itemStyle: {
              emphasis: {
                barBorderRadius: 7,
              },
              normal: {
                barBorderRadius: 7,
              },
            },
          },
        ],
      });
      // 异步加载数据
      let that = this;
      // 燃料费平均值
      var ranliaoaverage = [];
      // 时间
      var shijianchuo = [];
      // 每日交易笔数
      var transaction_num_for_7 = [];
      var transaction_num_for_77 = [];
      // 时间
      var transaction_num_for_7time = [];
      var transaction_num_for_7time2 = [];
      //  燃料费分布

      that.$http
        .get("")
        .then((res) => {
          // console.log(res);
          for (
            var i = 0;
            i < res.data[0].transaction_num_for_7.length + 1;
            i++
          ) {
            transaction_num_for_7.unshift(
              res.data[0].transaction_num_for_7[i].transaction_num_for_7
            );
            transaction_num_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].transaction_num_for_7[i].date
              ).substring(5, 10)
            );
            //  console.log(ranliaoaverage);
            //  console.log(shijianchuo);
            // 填入数据
            var size = [0, 0, 0, 0, 0, 0, 6];
            myChart.setOption({
              xAxis: {
                data: transaction_num_for_7time,
              },
              tooltip: {
                borderWidth: 1,
                padding: 13,

                show: true,
                position: "left",
                backgroundColor: "rgba(238, 240, 242, 1)",
                borderRadius: 7,
                extraCssText: "background:rgba(238, 240, 242, 1)",
                textStyle: {
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  lineHeight: 5,
                  fontSize: 15,
                  color: "#5583FF",

                  backgroundColor: "rgba(238, 240, 242, 1)",
                },
                formatter: "{c0}",
                rich: {
                  a: {
                    marginLeft: 25,

                    color: "#333333",
                    fontFamily: "苹方-简",
                    fontSize: 12,
                  },
                  b: {
                    color: "#333333",
                    fontFamily: "苹方-简",
                    fontSize: 12,
                  },
                },
                trigger: "axis",
                axisPointer: {
                  type: "none",
                  label: {
                    backgroundColor: "#6a7985",
                  },
                },
              },
              series: [
                {
                  data: transaction_num_for_7,
                  type: "line",
                  showSymbol: false,
                  symbolSize: 10,
                  areaStyle: {},
                  symbol: "circle", //拐点样式
                  smooth: true, //true 为平滑曲线，false为直线
                  itemStyle: {
                    normal: {
                      color: "#fff",
                      borderColor: "blue",
                      borderWidth: 3,
                      label: {
                        show: false,
                        position: "left",
                        textStyle: {
                          fontSize: 16,
                          color: "#fff",
                          // width: 54,
                          // height: 27,
                          backgroundColor: "blue",
                        },
                      },
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#2860C2" },
                        { offset: 0.4, color: "#2860C2" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#2860C2", //改变折线颜色
                  },
                },
              ],
            });
          }
        })
        .catch((e) => {});
      that.$http
        .get("")
        .then((res) => {
          // console.log(res);
          for (
            var i = 0;
            i < res.data[0].transaction_num_for_7.length + 1;
            i++
          ) {
            transaction_num_for_77.unshift(
              res.data[0].transaction_num_for_7[i].transaction_num_for_7
            );
            transaction_num_for_7time2.unshift(
              this.timestampToTime2(
                res.data[0].transaction_num_for_7[i].date
              ).substring(5, 10)
            );
            //console.log(transaction_num_for_77);
            //console.log(transaction_num_for_7time2);

            myChart2.setOption({
              title: {
                text: "每日交易总额",
              
                textStyle: {
                  color: "rgba(81, 81, 81, 1)",
                  fontSize: "18px",
                  fontFamily: "Arial",
                  fontWeight: "bolder",
                },
              },
              xAxis: {
                type: "category",
                data: transaction_num_for_7time2,
                splitLine: { show: false }, //去除网格线
                axisLine: {
                  //y轴
                  show: false,
                },
                axisTick: {
                  //y轴刻度线
                  show: false,
                },
              },
              yAxis: {
                type: "value",
                splitLine: { show: false }, //去除网格线

                axisLine: {
                  //y轴
                  show: false,
                },
                axisTick: {
                  //y轴刻度线
                  show: false,
                },
              },
              tooltip: { trigger: "item" },
              series: [
                {
                  data: transaction_num_for_77,
                  type: "bar",
                  showBackground: true,
                  backgroundStyle: {
                    color: "rgba(238, 242, 252, 1)",
                    borderRadius: 20, // 统一设置四个角的圆角大小
                  },
                  barWidth: 18,
                  itemStyle: {
                    emphasis: {
                      barBorderRadius: 7,
                    },
                    normal: {
                      barBorderRadius: 7,
                    },
                  },
                },
              ],
            });
          }
        })
        .catch((e) => {});
    },
    indexlist() {
      let that = this;
      that.$http
        .get("")
        .then((res) => {
          //console.log(res);
          // 获取首页数据集合
          var cardleftinformation = res.data[0];
          //console.log(cardleftinformation);
          // 区块高度
          // 最新交易数据
          this.tableData = cardleftinformation.transaction_info_for_index;
          //  console.log(this.tableData);
          // 最新出块数据
          this.tableData2 = cardleftinformation.block_new;
          // console.log(this.tableData.length);
          // 时间戳的处理
          if (this.nowLang == "cn") {
            for (var i = 0; i < this.tableData.length; i++) {
              let date = [];
              let strdate = this.tableData[i].date;
              // console.log(strdate + "shuju");
              // 当前日期转时间戳
              // console.log(Date.parse(new Date()));
              let timestamp = cardleftinformation.timeStamp;
              // console.log(timestamp + "xianzai");
              let s = timestamp - strdate; //9.20
              // console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              // console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  date.push("刚刚");
                } else {
                  date.push(parseInt(fenzhong) + "分钟前");
                }

                this.tableData[i].date = date;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                date.push(parseInt(fenzhong / 60) + "小时前");
                this.tableData[i].date = date;
              }
              if (fenzhong > 1440) {
                date.push(parseInt(fenzhong / 1440) + "天前");
                this.tableData[i].date = date;
              }
              // console.log(this.tableData[i].date);
              this.tableData[i].transaction_hash2 = this.tableData[
                i
              ].transaction_hash;
              this.tableData[i].transaction_hash =
                this.tableData[i].transaction_hash.substring(0, 10) + "...";
              this.tableData[i].from_address =
                this.tableData[i].from_address.substring(0, 10) + "...";
              if (
                this.tableData[i].to_address ==
                "0000000000000000000000000000000000"
              ) {
                if (this.nowLang == "cn") {
                  this.tableData[i].to_address = "质押";
                }
                if (this.nowLang == "en") {
                  this.tableData[i].to_address = "Pledge";
                }
              } else {
                this.tableData[i].to_address =
                  this.tableData[i].to_address.substring(0, 10) + "...";
              }
            }
            //console.log(this.tableData2.length);
            for (var j = 0; j < this.tableData2.length; j++) {
              let times = [];
              let strtime = this.tableData2[j].time;
              // 当前日期转时间戳
              let timestamp = cardleftinformation.timeStamp;
              // console.log(timestamp + "xianzai");
              let s = timestamp - strtime; //9.20
              // console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              //  console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  times.push("刚刚");
                } else {
                  times.push(parseInt(fenzhong) + "分钟前");
                }

                this.tableData2[j].time = times;
              }

              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "小时前");
                this.tableData2[j].time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "天前");
                this.tableData2[j].time = times;
              }
              // console.log(times);
              // console.log(strtime);
              // times.push(this.timestampToTime(Number(strtime)));
              // console.log(times);
            }
          } else {
            for (var i = 0; i < this.tableData.length; i++) {
              let date = [];
              let strdate = this.tableData[i].date;
              // console.log(strdate + "shuju");
              // 当前日期转时间戳
              let timestamp = cardleftinformation.timeStamp;
              // console.log(timestamp + "xianzai");
              let s = timestamp - strdate; //9.20
              // console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              //  console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  date.push("just");
                } else {
                  date.push(parseInt(fenzhong) + "minutes ago");
                }

                this.tableData[i].date = date;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                date.push(parseInt(fenzhong / 60) + "hour ago");
                this.tableData[i].date = date;
              }
              if (fenzhong > 1440) {
                date.push(parseInt(fenzhong / 1440) + "days ago");
                this.tableData[i].date = date;
              }
              // console.log(this.tableData[i].date);
              this.tableData[i].transaction_hash2 = this.tableData[
                i
              ].transaction_hash;
              this.tableData[i].transaction_hash =
                this.tableData[i].transaction_hash.substring(0, 10) + "...";
              this.tableData[i].from_address =
                this.tableData[i].from_address.substring(0, 10) + "...";
              this.tableData[i].to_address =
                this.tableData[i].to_address.substring(0, 10) + "...";
            }
            //console.log(this.tableData2.length);
            for (var j = 0; j < this.tableData2.length; j++) {
              let times = [];
              let strtime = this.tableData2[j].time;
              // 当前日期转时间戳
              let timestamp = cardleftinformation.timeStamp;
              // console.log(timestamp + "xianzai");
              let s = timestamp - strtime; //9.20
              // console.log(s+'相差');
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

                this.tableData2[j].time = times;
              }

              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "hour ago");
                this.tableData2[j].time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "days ago");
                this.tableData2[j].time = times;
              }
              // console.log(times);
              // console.log(strtime);
              // times.push(this.timestampToTime(Number(strtime)));
              // console.log(times);
            }
          }
          //console.log(this.tableData);
          //区块高度
          this.blockheigth =
            cardleftinformation.block_height_all[0].block_height;
          // 区块奖励
          this.blockreward = Math.trunc(
            cardleftinformation.count_block_award_for_all[0].award_total
          );
          // 剩余区块奖励
          this.blocklastreward = Math.trunc(
            cardleftinformation.count_block_award_for_all[0].award_balance
          );
          //  交易笔数
          this.transnumber =
            cardleftinformation.transaction_num_for_all[0].transaction_num;
          this.money = res.data[0].usdt[0].usdt.toString().substring(0, 6);

          this.money2 = res.data[0].usdt[0].rmb.toString().substring(0, 4);
          //24小时交易笔数?
          this.transzoom =
            cardleftinformation.transaction_num_for_24h[0].transaction_num;
          // console.log(this.transzoom);
          // 24小时交易总额?

          this.transmoney = Math.trunc(
            cardleftinformation.transaction_amount_for_24h[0]
              .transaction_amount_24h
          );
        })
        .catch((e) => {});
    },
    timestampToTime2(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      if (D < 10) {
        D = "0" + D + "  ";
      } else {
        D = D + "  ";
      }
      var h = date.getHours();
      if (h < 10) {
        h = "0" + h + ":";
      } else {
        h = h + ":";
      }
      var m = date.getMinutes();
      if (m < 10) {
        m = "0" + m + ":";
      } else {
        m = m + ":";
      }

      var s = date.getSeconds();
      if (s < 10) {
        s = "0" + s;
      } else {
        s = s;
      }

      return Y + M + D + h + m + s;
    },
  },
};
</script>
<style lang="less">
// canvas {
//   width: 626px !important;
//   height: 322px !important;
// }
.el-icon-arrow-right {
}
.more {
  cursor: pointer;
}
#bars {
  width: 626px;
  height: 322px;
  border: 1px solid #e9eced;
  opacity: 1;
  border-radius: 18px;
  // div {
  //   width: 626px !important;
  //   height: 322px !important;
  // }
}
#bar {
  width: 626px;
  height: 322px;
  border: 1px solid #e9eced;
  opacity: 1;
  border-radius: 18px;
  margin-left: 23.25px;
}
.index {
  height: auto;
}
.index_top {
  width: 100%;
  height: 352.5px;
  background: url("../assets/images/second/背景.png") no-repeat center/100% 100%;
  z-index: 1;
  .title {
    width: 100%;
    text-align: center;
    font-size: 53px;
    font-family: Arial;
    font-weight: bold;
    line-height: 40px;
    color: rgba(255, 255, 255, 0.9);
    padding-top: 68.4px;
    margin-bottom: 36.6px;
    letter-spacing: 12px;
  }
  .indexsecondsearch {
    width: 600px;
    height: 45px;
    background: #ffffff;
    opacity: 1;
    border-radius: 11px;
  }
}
.info {
  width: 1274px;
  height: 247px;
  background: #ffffff;
  border: 1px solid #e9eced;
  opacity: 1;
  border-radius: 18px;
  margin: 0 auto;
  z-index: 100;
  position: relative;
  top: -103px;
  .center_bottom {
    font-size: 15px;
    font-family: Arial;
    font-weight: 400;
    line-height: 15px;
    color: #666666;
    opacity: 1;
    margin-top: 2px;
  }
  .center_top {
    font-size: 18px;
    font-family: Arial;
    font-weight: 400;
    line-height: 18px;
    color: #000000;
    opacity: 1;
  }
  .info_top {
    width: 1274px;
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: center;
    align-items: center;
    // margin-left: 97.13px;
    margin-top: 45.38px;
    ul {
      width: 325.5px;
      margin-left: 97.13px;
      //background: chocolate;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      justify-content: space-between;
      .block_height {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/区块高度.png") no-repeat
          center/100% 100%;
      }
      .block_height:hover {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/区块高度.gif") no-repeat
          center/100% 100%;
      }
      .transaction24 {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/24H交易数.png") no-repeat
          center/100% 100%;
      }
      .transaction24:hover {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/24H交易数.gif") no-repeat
          center/100% 100%;
      }
      .award {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/已发放奖励.png") no-repeat
          center/100% 100%;
      }
      .award:hover {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/已发放奖励.gif") no-repeat
          center/100% 100%;
      }
      .alljiedian {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/节点总数.png") no-repeat
          center/100% 100%;
      }
      .alljiedian:hover {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/节点总数.gif") no-repeat
          center/100% 100%;
      }
      .alltransaction {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/累计交易数.png") no-repeat
          center/100% 100%;
      }
      .alltransaction:hover {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/累计交易数.gif") no-repeat
          center/100% 100%;
      }
      .last_award {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/剩余区块奖励.png") no-repeat
          center/100% 100%;
      }
      .last_award:hover {
        width: 60px;
        height: 60px;
        background: url("../assets/images/second/剩余区块奖励.gif") no-repeat
          center/100% 100%;
      }
    }
    .top_left {
      margin-left: 63.5px;
    }
  }
  .info_bottom {
    margin-top: 18px !important;
  }
  .info_line {
    width: 1080px;
    height: 0px;
    border: 1px solid #e9eced;
    opacity: 1;
    margin-top: 30px;
    margin-left: 64.5px;
  }
  .line_right {
    width: 0px;
    height: 47px;
    border: 1px solid #e9eced;
    opacity: 1;
  }
  .line_right2 {
    width: 0px;
    height: 31px;
    border: 1px solid #e9eced;
    opacity: 0;
  }
}
.chart {
  width: 1274px;
  height: 322px;
  margin: -83px auto;
  display: flex;
  flex-direction: row;
}
.info_list {
  width: 1274px;
  height: 889px;
  margin: 105.5px auto 115px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .last_transaction {
    width: 626px;
    height: 847px;
    border: 1px solid #e9eced;
    opacity: 1;
    border-radius: 18px;

    .subject {
      width: 551.74px;
      margin: 33.48px auto 23.5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      div:nth-child(1) {
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        line-height: 21px;
        color: #515151;
      }
      div:nth-child(2) {
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        line-height: 21px;
        color: #5583ff;
      }
    }
    .content {
      width: 551px;
      margin: 0 auto;
      li {
        width: 551px;
        height: 75px;
        border-top: 2px solid #ebeeef;
        display: flex;
        flex-direction: row;

        // justify-content: space-between;
        padding-top: 19px;
        padding-bottom: 18px;
        align-items: center;
        .content_left {
          width: 140px;
          margin-right: 85px;
          span:nth-child(1) {
            font-size: 15px;
            font-family: Arial;
            font-weight: bold;
            line-height: 17px;
            color: #5583ff;
            cursor: pointer;
          }
          span:nth-child(3) {
            font-size: 15px;
            font-family: Arial;
            font-weight: 400;
            line-height: 17px;
            color: #666666;
          }
        }
        .content_center {
          width: 140px;
          margin-right: 75px;
          span:nth-child(1),
          span:nth-child(3) {
            font-size: 15px;
            font-family: Arial;
            font-weight: bold;
            line-height: 17px;
            color: #5583ff;
            cursor: pointer;
          }
        }
        .content_right {
          width: 118px;
          text-align: right;
          font-size: 15px;
          font-family: Arial;
          font-weight: 400;
          line-height: 17px;
          color: #666666;
          span {
            margin-right: 3px;
          }
        }
      }
    }
  }
  .last_block {
    width: 626px;
    height: 847px;
    border: 1px solid #e9eced;
    opacity: 1;
    border-radius: 18px;
    .subject {
      width: 551.74px;
      margin: 33.48px auto 23.5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      div:nth-child(1) {
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        line-height: 21px;
        color: #515151;
      }
      div:nth-child(2) {
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        line-height: 21px;
        color: #5583ff;
      }
    }
    .content {
      width: 551px;
      margin: 0 auto;
      li {
        width: 551px;
        height: 75px;
        border-top: 2px solid #ebeeef;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 19px;
        padding-bottom: 18px;
        align-items: center;
        .content_left {
          width: 140px;
          span:nth-child(1) {
            font-size: 15px;
            font-family: Arial;
            font-weight: bold;
            line-height: 17px;
            color: #5583ff;
            cursor: pointer;
          }
          span:nth-child(3) {
            font-size: 15px;
            font-family: Arial;
            font-weight: 400;
            line-height: 17px;
            color: #666666;
          }
        }
        .content_center {
          text-align: center;
          span {
            font-size: 15px;
            font-family: Arial;
            font-weight: 400;
            line-height: 17px;
            color: #666666;
          }
        }
        .content_right {
          font-size: 15px;
          font-family: Arial;
          font-weight: 400;
          line-height: 17px;
          color: #666666;
        }
      }
    }
  }
}
</style>
