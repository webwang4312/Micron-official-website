<template>
  <div class="chart_award">
    <div class="node">
      <div class="title">
        <img src="@assets/images/second/挖矿奖励.png" alt="" />
        <span> {{ $t("chart")[1] }}</span>
      </div>
      <div class="node_detail">
        <div id="average_fuelcost"></div>
        <div id="average_blockreward"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetChartAll } from "@server/api.js";
export default {
  name: "chart_award",
  data() {
    return {
      nowLang: "",
      title: [{ test: "" }, { test2: "" }],
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    if (this.nowLang == "cn") {
      this.title[0].test = "平均燃料费";
      this.title[0].test2 = "平均区块奖励";
    } else {
      this.title[0].test = "average gas fee";
      this.title[0].test2 = "average block reward";
    }
  },
  mounted() {
    this.drawLine();
  },

  // 页码设置
  watch: {},
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("average_fuelcost"));
      let myChart2 = echarts.init(document.getElementById("average_blockreward"));

      var data = [];
      // 绘制图表
         myChart.setOption({
        grid: {
         x: 60
       },
        title: {
            text: this.title[0].test,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
           padding: [23,0,0,0], //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
           textStyle: {
            color: "rgba(37, 53, 81, 1)",
            fontSize: "14px",
            fontFamily: " PingFang SC",
            fontWeight: "600",
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

          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLabel: {
            interval: 36,
            formatter: function(value) {
              //x轴的文字改为竖版显示
              var str = value.split(" ");
              return str[0];
            },
          },
        },

        yAxis: {
          // max: function(value) {
          //   return value.max;
          // },
          splitNumber:2,
          type: "value",
          splitLine: { show: false }, //去除网格线
          position: "left",
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
        grid: {
         x: 60
       },
        title: {
            text: this.title[0].test2,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
           padding: [23,0,0,0], //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
           textStyle: {
            color: "rgba(37, 53, 81, 1)",
            fontSize: "14px",
            fontFamily: " PingFang SC",
            fontWeight: "600",
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

          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLabel: {
            interval:0,
            formatter: function(value) {
              //x轴的文字改为竖版显示
              var str = value.split(" ");
              return str[0];
            },
          },
        },

        yAxis: {
          // max: function(value) {
          //   return value.max;
          // },
          splitNumber:2,
          type: "value",
          splitLine: { show: false }, //去除网格线
          position: "left",
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
      // 异步加载数据
      let that = this;
      // 每日交易笔数
       var avg_gas_for_7 = [];
      // // 前100快时间
      var avg_gas_for_7time = [];
     var avg_gas_for_72 = [];
      // // 前100快时间
      var avg_gas_for_7time2 = [];
     this.$http
        .get(GetChartAll)
        .then((res) => {
        for (var i = 0; i < res.data[0].avg_gas_for_7.length + 1; i++) {
            avg_gas_for_7.unshift(
              res.data[0].avg_gas_for_7[i].block_height_for_100
            );
            avg_gas_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].avg_gas_for_7[i].date
              ).substring(5)
            );
            //console.log(node_for_7);
            //console.log(node_for_7time);
             myChart.setOption({
              xAxis: {
                data: avg_gas_for_7time,
              },
              tooltip: {
              extraCssText: 'z-index:2',
                borderWidth: 1,
                padding: 15,
              
                position: "left",
                backgroundColor: "rgba(74, 74, 74, 1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 1)",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{c0}",
                rich: {
                  a: {
                    marginLeft: 25,
                    marginTop: 15,
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
                  data: avg_gas_for_7,
                  type: "line",
                  showSymbol: false,
                  symbolSize: 10,
                  areaStyle: {},
                  symbol: "circle", //拐点样式
                  smooth: true, //true 为平滑曲线，false为直线
                  itemStyle: {
                    normal: {
                      color: "#fff",
                      borderColor: "rgba(255, 201, 52, 1)",
                      borderWidth: 3,
                      label: {
                        show: false,
                        position: "left",
                        textStyle: {
                          fontSize: 16,
                          color: "#fff",
                          // width: 54,
                          // height: 27,
                          backgroundColor: "rgb(40,96,194)",
                        },
                      },
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "rgba(255, 201, 52, 1)" },
                        { offset: 0.2, color: "rgba(255, 201, 52, 1)" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "rgba(255, 201, 52, 1)", //改变折线颜色
                  },
                },
              ],
            });
          }
        })
        .catch((e) => {});
         this.$http
        .get(GetChartAll)
        .then((res) => {
        for (var s = 0; s < res.data[0].hourly_award_statistics.length + 1; s++) {
            avg_gas_for_72.unshift(
              res.data[0].hourly_award_statistics[s].award
            );
            avg_gas_for_7time2.unshift(
              this.timestampToTime2(
                res.data[0].hourly_award_statistics[s].date
              ).substring(5)
            );
            // console.log(avg_gas_for_72);
            // console.log( avg_gas_for_7time2);
            //console.log(node_for_7);
            //console.log(node_for_7time);
             myChart2.setOption({
              xAxis: {
                data: avg_gas_for_7time2,
              },
              tooltip: {
              extraCssText: 'z-index:2',
                borderWidth: 1,
                padding: 15,
              
                show: true,
                position: "left",
                backgroundColor: "rgba(74, 74, 74, 1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 1)",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{c0}",
                rich: {
                  a: {
                    marginLeft: 25,
                    marginTop: 15,
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
                  data: avg_gas_for_72,
                  type: "line",
                  showSymbol: false,
                  symbolSize: 10,
                  areaStyle: {},
                  symbol: "circle", //拐点样式
                  smooth: true, //true 为平滑曲线，false为直线
                  itemStyle: {
                    normal: {
                      color: "#fff",
                      borderColor: "rgba(255, 201, 52, 1)",
                      borderWidth: 3,
                      label: {
                        show: false,
                        position: "left",
                        textStyle: {
                          fontSize: 16,
                          color: "#fff",
                          // width: 54,
                          // height: 27,
                          backgroundColor: "rgb(40,96,194)",
                        },
                      },
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "rgba(255, 201, 52, 1)" },
                        { offset: 0.2, color: "rgba(255, 201, 52, 1)" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "rgba(255, 201, 52, 1)", //改变折线颜色
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
<style lang="less">
.chart_award {
   width: 100%;
    #average_fuelcost,#average_blockreward{
      width: 335px;
    height:300px;
    opacity: 1;  
    // background: red;
    }
  .node {
    width: 100%;
   background: #ffffff;
    border-radius: 18px;
    margin: 0px auto 47px;
    .title{
      margin-left: 15px;
      margin-bottom: 23px;
      margin-top: 7px;
    }
    .node_detail {
      width:100%;
     
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      

    }
    .title {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
      }
      span {
        font-size:16px;
        font-family: Arial;
        font-weight: bold;
        line-height: 26px;
        color: #000000;
        opacity: 1;
        margin-left: 15px;
      }
    }
  }
}
</style>
