<template>
  <div class="chart_transaction">
    <div class="node">
      <div class="title">
        <img src="@assets/images/second/交易信息@2x.png" alt="" />
        <span> {{ $t("chart")[2] }}</span>
      </div>
      <div class="node_detail">
        <div id="number_of_transactions"></div>
        <div id="total_daily_transactions"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { GETCHART } from "@server/api.js";
export default {
  name: "chart_transaction",
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
      this.title[0].test = "每日交易笔数";
      this.title[0].test2 = "每日交易总额";
    } else {
      this.title[0].test = "daily no. of transaction";
      this.title[0].test2 = "daily trading volume";
    }
  },
  mounted() {
    this.drawLine();
    this.drawLine2();
  },

  // 页码设置
  watch: {},
  methods: {
    async drawLine() {
      let myChart = echarts.init(
        document.getElementById("number_of_transactions")
      );

      var data = [];
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title[0].test,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: [0, 0, 0, 20], //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 0, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            color: "rgba(81, 81, 81, 1)",
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
      // 每日交易笔数
      var node_for_7 = [];
      // 时间
      var node_for_7time = [];
      var node_for_72 = [];
      // 时间
      var node_for_7time2 = [];
      const res = await GETCHART();

      for (var i = 0; i < res.result.tradeNumbersList.length + 1; i++) {
        node_for_7.unshift(res.result.tradeNumbersList[i].amount);
        node_for_7time.unshift(
          res.result.tradeNumbersList[i].dayTime.substring(5, 10)
        );
        //console.log(node_for_7);
        //console.log(node_for_7time);
        myChart.setOption({
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
            data: node_for_7time,
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
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                color: "#EBEEEF",
                width: 1,
              },
            }, //去除网格线
            axisLine: {
              //y轴
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{b0}<br />" + this.title[0].test + ":{c0}",
            backgroundColor: "rgba(74, 74, 74, 1)",
            borderColor: "#EEF0F2",
            borderWidth: "1",
            textStyle: {
              color: "white",
              fontWeight: "bold",
            },
          },
          series: [
            {
              data: node_for_7,
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
                  color: "rgba(144, 226, 202, 1)",
                  barBorderRadius: 7,
                },
              },
            },
          ],
        });
      }
    },
    async drawLine2() {
      let myChart2 = echarts.init(
        document.getElementById("total_daily_transactions")
      );

      myChart2.setOption({
        title: {
          text: this.title[0].test2,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: [0, 0, 0, 20], //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 0, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            color: "rgba(81, 81, 81, 1)",
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
      // 每日交易笔数
      var node_for_7 = [];
      // 时间
      var node_for_7time = [];
      var node_for_72 = [];
      // 时间
      var node_for_7time2 = [];

      const res = await GETCHART();
// console.log(res);
      for (var i = 0; i < res.result.tradeAmountList.length + 1; i++) {
        node_for_72.unshift(res.result.tradeAmountList[i].amount);
        node_for_7time2.unshift(
          res.result.tradeAmountList[i].dayTime.substring(5, 10)
        );
        //console.log(node_for_7);
        //console.log(node_for_7time);
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
            data: node_for_7time2,
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
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                color: "#EBEEEF",
                width: 1,
              },
            }, //去除网格线
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
            formatter: "{b0}<br />" + this.title[0].test2 + ":{c0}",
            backgroundColor: "rgba(74, 74, 74, 1)",
            borderColor: "#EEF0F2",
            borderWidth: "1",
            textStyle: {
              color: "white",
              fontWeight: "bold",
            },
          },
          series: [
            {
              data: node_for_72,
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
                  color: "rgba(144, 226, 202, 1)",
                  barBorderRadius: 7,
                },
              },
            },
          ],
        });
      }
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
.chart_transaction {
  #number_of_transactions,
  #total_daily_transactions {
    width: 551px;
    height: 343px;
    opacity: 1;
    // background: red;
  }
  .node {
    width: 1274px;
    height: 412px;
    border-radius: 18px;
    margin: 0px auto 47px;
    .title {
      margin-bottom: 23px;
    }
    .node_detail {
      width: 1274px;
      height: 412px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border: 1px solid #e9eced;
      border-radius: 18px;
      background: #ffffff;
    }
    .title {
      display: flex;
      align-items: center;
      img {
        width: 38px;
        height: 38px;
      }
      span {
        font-size: 23px;
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
