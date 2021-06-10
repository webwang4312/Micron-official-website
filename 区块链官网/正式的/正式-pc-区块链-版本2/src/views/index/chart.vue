<template>
  <div class="indexChart">
    <div id="bars"></div>
    <div id="bar"></div>
  </div>
</template>
<script>
export default {
  name: "indexchart",
  data() {
    return {
      test1: "",
      test2: "",
      test22: "",
      index_chart: false,
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    if (this.nowLang == "cn") {
      (this.test1 = "区块奖励"),(this.test22 = "交易额"), (this.test2 = "每日交易总额");
    } else {
      (this.test1 = "Block reward"),(this.test22 = "transactions"), (this.test2 = "Total daily transactions");
    }
    
  },
  mounted() {
     this.drawLine();
    this.chartSecond()
     window.setInterval(() => {
      setTimeout(this.chartSecond(), 1000);
    }, 60000);
    
  },
 beforeDestroy() {
    clearInterval(this.chartSecond());        
   
},
  // 页码设置
  watch: {},
  methods: {
    chartSecond() {
      var block_award = [];
      var block_award_time = [];
      let myChart = echarts.init(document.getElementById("bars"));
      myChart.setOption({
        title: {
          text: this.test1,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 34, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            color: "rgba(81, 81, 81, 1)",
            fontSize: "18px",
            fontFamily: "Microsoft YaHei",
            fontWeight: "bolder",
            color: "#000000",
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
            return parseInt(value.max + 20);
          },
          splitNumber: 2,
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
      this.$http
        .get("")
        .then((res) => {
          // console.log(res);
          for (var i = 0; i < res.data[0].hourly_award.length + 1; i++) {
            block_award.unshift(res.data[0].hourly_award[i].award);
            block_award_time.unshift(
              this.timestampToTime2(res.data[0].hourly_award[i].date).substring(
                10
              )
            );
            //  console.log(ranliaoaverage);
            //  console.log(shijianchuo);
            // 填入数据
            // var size = [0, 0, 0, 0, 0, 0, 6];
            myChart.setOption({
              xAxis: {
                data: block_award_time,
              },
              tooltip: {
                borderWidth: 1,

                show: true,
                position: "left",
                backgroundColor: "rgba(74, 74, 74, 1)",

                textStyle: {
                  fontFamily: "Microsoft YaHei",
                  fontWeight: "bold",
                  lineHeight: 5,
                  fontSize: 15,
                  color: "white",
                  backgroundColor: "rgba(238, 240, 242, 1)",
                },
                formatter: "{c0}",

                trigger: "axis",
                axisPointer: {
                  type: "none",
                  label: {
                    backgroundColor: "#6a7985",
                  },
                },
              },
              series: [
                // {
                //   name: "军费支出",
                //   type: "bar",
                //   barWidth: "20%",

                //   itemStyle: {
                //     normal: {
                //       color: "#4169E1", //柱子的颜色
                //     },
                //   },
                //   backgroundStyle: {
                //     borderRadius: 10, // 统一设置四个角的圆角大小
                //     shadowColor: "rgba(0, 0, 0, 0.5)",
                //     shadowBlur: 10,
                //   },
                //   data: block_award,
                // },
                {
                  data: block_award,
                  type: "line",
                  showSymbol: false,
                  symbolSize: 10,
                  areaStyle: {},
                  symbol: "circle", //拐点样式
                  smooth: true, //true 为平滑曲线，false为直线
                  itemStyle: {
                    normal: {
                      color: "#fff",
                      borderColor: "#965EE5",
                      borderWidth: 3,
                      label: {
                        show: false,
                        position: "left",
                        textStyle: {
                          fontSize: 16,
                          color: "#fff",
                          // width: 54,
                          // height: 27,
                          backgroundColor: "#965EE5",
                        },
                      },
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#965EE5" },
                        { offset: 0.4, color: "#965EE5" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#965EE5", //改变折线颜色
                  },
                },
              ],
            });
          }
        })
        .catch((e) => {});
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例

      let myChart2 = echarts.init(document.getElementById("bar"));
      myChart2.setOption({
        title: {
          text: this.test2,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 34, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            color: "#000000",
            fontSize: "18px",
            fontFamily: "Microsoft YaHei",
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
          splitNumber: 3,

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
      //  区块奖励

      // 交易总额
      var transaction_num = [];
      var transaction_num_time = [];
      var transaction_num2 = [];
      // 时间
      //  燃料费分布

      var part = [];
      that.$http
        .get("")
        .then((res) => {
          // console.log(res);
          for (
            var i = 0;
            i < res.data[0].transaction_amount_for_7.length + 1;
            i++
          ) {
            // part.unshif(res.data[0].transaction_amount_for_7[i].transaction_amount_for_24H)
            // console.log(res.data[0].transaction_amount_for_7[i].transaction_amount_for_24H);
            // console.log(part);
            transaction_num.unshift(
              res.data[0].transaction_amount_for_7[i].transaction_amount_for_24H
            );
            transaction_num.forEach(function(val, index, arr) {
              // console.log(val);
              // if (Number(val / 1000000) >= 1) {
              //   val = Number(val / 100000) + "M";
              // }
              // val = Number(val / 1000) + "K";
              // console.log(val);
              // val = 10000;
              // console.log(arr);
              transaction_num2.unshift(val);
            });
            transaction_num_time.unshift(
              this.timestampToTime2(
                res.data[0].transaction_amount_for_7[i].date
              ).substring(5, 10)
            );
            //console.log(block_award_time);
            //console.log(transaction_num_time);
            myChart2.setOption({
              title: {
                textStyle: {
                  color: "rgba(81, 81, 81, 1)",
                  fontSize: "18px",
                  fontFamily: "Microsoft YaHei",
                  fontWeight: "bolder",
                },
              },
              xAxis: {
                type: "category",
                data: transaction_num_time,
                splitLine: { show: false }, //去除网格线
                axisLine: {
                  //y轴
                  show: false,
                },
                axisTick: {
                  //y轴刻度线
                  show: false,
                },
                // axisLabel: {
                //     formatter: function (value) {
                //       console.log(value);
                // }},
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
                axisLabel: {
                  formatter: function(value, index) {
                    // console.log(value);
                    if (value / 1000 >= 1 && value / 1000 < 1000) {
                      return (value = Number(value) / 1000 + "K");
                    } else if (value / 1000 >= 1000) {
                      return (value = Number(value) / 1000000 + "M");
                    } else {
                      return (value = value);
                    }
                  },
                },
              },
              tooltip: {
                trigger: "item",
                formatter: "{b0}<br />"+this.test22+":{c0}",
                backgroundColor: "rgba(74, 74, 74, 1)",

                textStyle: {
                  color: "rgba(255, 255, 255, 1)",
                  fontWeight: "bold",
                },
              },
              series: [
                {
                  data: transaction_num,
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
                      color: "#965EE5",
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
<style lang="less" scoped>
.indexChart {
  width: 1274px;
  height: 322px;
  margin: -83px auto;
  display: flex;
  flex-direction: row;
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
}
</style>
