<template>
  <div class="indexChart">
    <div id="bars"></div>
    <div id="bar"></div>
  </div>
</template>
<script>
import { GETINDEX } from "@server/api.js";
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
      (this.test1 = "区块奖励"),
        (this.test22 = "交易额"),
        (this.test2 = "每日交易总额");
    } else {
      (this.test1 = "Block reward"),
        (this.test22 = "transactions"),
        (this.test2 = "Total daily transactions");
    }
  },
  mounted() {
    this.getChart();
    // this.chartSecond()
    // const timer = setInterval(() => {
    //   this.chartSecond(); //你所加载数据的方法
    // }, 60000);
    // //销毁定时器
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer);
    // });
    this.chartSecond();
    // setInterval(this.chartSecond, 20000);
  },
  beforeDestroy() {
    clearInterval(this.chartSecond);
  },
  // 页码设置
  watch: {},
  methods: {
    async chartSecond() {
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
            return parseInt(value.max + 5);
          },
          splitNumber: 2,
          type: "value",
          position: "left",
          splitLine: { show: true }, //去除网格线
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
      const res = await GETINDEX();
      for (var i = 0; i < res.result.lineChart.length + 1; i++) {
        block_award.unshift(res.result.lineChart[i].blockAward);
        block_award_time.unshift(
          this.timestampToTime2(res.result.lineChart[i].tradeTime).substring(
            10,
            17
          )
        );

        //  console.log(ranliaoaverage);
        //  console.log(shijianchuo);
        // 填入数据
        // var size = [0, 0, 0, 0, 0, 0, 6];
        myChart.setOption({
          xAxis: {
            data: block_award_time,
            nameLocation: "center",
          },
          // legend: {
          //   selected: {
          //     data: true,
          //   },
          // },
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
          visualMap: {
            type: "piecewise",
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 0,
                lt: 1,
                color: "rgba(219, 229, 255, 1)",
              },
              {
                gt: 2,
                lt: 3,
                color: "rgba(219, 229, 255, 1)",
              },
              {
                gt: 4,
                lt: 5,
                color: "rgba(219, 229, 255, 1)",
              },
            ],
          },
          series: [
            {
              data: block_award,
              type: "line",
              showSymbol: false,
              symbolSize: 10,
              areaStyle: {},
              symbol: "circle", //拐点样式
              smooth: true, //true 为平滑曲线，false为直线
              symbolOffset: [0, -10],
              itemStyle: {
                normal: {
                  color: "#fff",
                  borderColor: "#965EE5",
                  borderWidth: 4,
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
                  // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   { offset: 0, color: "#965EE5" },
                  //   { offset: 0.2, color: "#965EE5" },
                  //   { offset: 1, color: "#fff" },
                  // ]),
                },
              },
              lineStyle: {
                color: "#965EE5", //改变折线颜色
                width: 4,
              },
            },
          ],
        });
      }
    },
    async getChart() {
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
          splitLine: { show: true }, //去除网格线
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

      //  区块奖励
      // 交易总额
      var transaction_num = [];
      var transaction_num_time = [];
      var transaction_num2 = [];
      const res = await GETINDEX();
      for (var i = 0; i < res.result.barChart.length + 1; i++) {
        // part.unshif(res.result.barChart[i].transaction_amount_for_24H)
        // console.log(res.result.barChart[i].transaction_amount_for_24H);
        // console.log(part);
        transaction_num.push(res.result.barChart[i].amount);
        transaction_num.forEach(function(val, index, arr) {
          // console.log(val);
          // if (Number(val / 1000000) >= 1) {
          //   val = Number(val / 100000) + "M";
          // }
          // val = Number(val / 1000) + "K";
          // console.log(val);
          // val = 10000;
          // console.log(arr);
          // transaction_num2.unshift(val);
        });
        transaction_num_time.push(
          res.result.barChart[i].dayTime.substring(5, 10)
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
            formatter: "{b0}<br />" + this.test22 + ":{c0}",
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
    },
    timestampToTime2(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
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
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
  }
}
</style>
