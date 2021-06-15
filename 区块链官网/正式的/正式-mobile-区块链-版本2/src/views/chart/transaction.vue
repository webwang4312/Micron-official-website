<template>
  <div class="chart_transaction">
   <div class="node">
      <div class="title">
        <img src="@assets/images/second/交易信息.png" alt="" />
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
  },

  // 页码设置
  watch: {},
  methods: {
    drawLine() {
       let myChart = echarts.init(document.getElementById("number_of_transactions"));
       let myChart2 = echarts.init(document.getElementById("total_daily_transactions"));
      var data = [];
      // 绘制图表
      myChart.setOption({
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
       myChart2.setOption({
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
      that.$http
        .get("/show_graph_data")
        .then((res) => {
          //    console.log(res);
          for (var i = 0; i < res.data[0].transaction_num_for_7.length + 1; i++) {
            node_for_7.unshift(res.data[0].transaction_num_for_7[i].transaction_num_for_7);
            node_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].transaction_num_for_7[i].date
              ).substring(5, 10)
            );
            //console.log(node_for_7);
            //console.log(node_for_7time);
            myChart.setOption({
          
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
                formatter: "{c0}",
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
        })
        .catch((e) => {});
        that.$http
        .get("/show_graph_data")
        .then((res) => {
          //    console.log(res);
          for (var i = 0; i < res.data[0].transaction_amount_for_7.length + 1; i++) {
            node_for_72.unshift(res.data[0].transaction_amount_for_7[i].transaction_amount_for_24H);
            node_for_7time2.unshift(
              this.timestampToTime2(
                res.data[0].transaction_amount_for_7[i].date
              ).substring(5, 10)
            );
            //console.log(node_for_7);
            //console.log(node_for_7time);
            myChart2.setOption({
             
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
                formatter: "{c0}",
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
.chart_transaction {
   width: 100%;
   #number_of_transactions,#total_daily_transactions{
      width: 335px;
    height: 300px;
    opacity: 1;  
    // background: red;
    }
  .node {
    width: 100%;
   
   background: #ffffff;
    margin:0px auto 47px;
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
        font-size: 16px;
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
