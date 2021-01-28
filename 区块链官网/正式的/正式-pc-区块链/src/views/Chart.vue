<template>
  <div class="chart">
    <headertop></headertop>
    <div class="chartzong">
      <!-- 搜索栏区域 -->
      <search></search>
      <div>
        <p style="top:58px;left:78px" class="charttitle">
          {{ $t("chart[0]") }}
        </p>
        <div class="chart1" id="chart1"></div>
      </div>

      <div class="row1">
        <div>
          <p style="top:58px;left:40px" class="charttitle">
            {{ $t("chart[1]") }}
          </p>
          <div class="chart2" id="chart2"></div>
        </div>
        <div>
          <p style="top:58px;left:40px" class="charttitle">
            {{ $t("chart[2]") }}
          </p>
          <div class="chart3" id="chart3"></div>
        </div>
      </div>
      <div class="row2">
        <div>
          <p style="top:58px;left:40px" class="charttitle">
            {{ $t("chart[3]") }}
          </p>
          <div class="chart4" id="chart4"></div>
        </div>
        <div>
          <p style="top:58px;left:40px" class="charttitle">
            {{ $t("chart[4]") }}
          </p>
          <div class="chart5" id="chart5"></div>
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
  name: "chart",
  data() {
    return {
      fullscreenLoading: false,
      language: "",
    };
  },
  components: { VFooter, Search, headertop },
  beforeDestory() {},
  created() {
    this.nowLang = this.$i18n.locale;
  },
  mounted() {
    this.drawLine();
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById("chart1"));
      let myChart2 = echarts.init(document.getElementById("chart2"));
      let myChart3 = echarts.init(document.getElementById("chart3"));
      let myChart4 = echarts.init(document.getElementById("chart4"));
      let myChart5 = echarts.init(document.getElementById("chart5"));
      myChart1.setOption({
        title: {
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 30, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
        },
        tooltip: {
          trigger: "axis",
          // trigger: "item",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          splitLine: { show: false }, //去除网格线
          boundaryGap: false,
          data: [],
          axisLabel: {
            interval: 6,
            formatter: function(value) {
              //x轴的文字改为竖版显示
              var str = value.split(" ");
              return str.join("\n");
            },
          },
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
        title: {
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 30, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
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
      myChart3.setOption({
        title: {
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 30, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
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
            return value.max + 10;
          },
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
      myChart4.setOption({
        title: {
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 30, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
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
      myChart5.setOption({
        grid: {
         x: 60
       },
        title: {
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 30, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
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
              return str.join("\n");
            },
          },
        },

        yAxis: {
          max: function(value) {
            return value.max;
          },
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
      // 每日uenc交易指数;
      var usdt = [];
      // 每日uenc交易指数时间;
      var usdttime = [];
      // 每日交易笔数
      var transaction_num_for_7 = [];
      // 每日交易笔数时间
      var transaction_num_for_7time = [];
      // 每日交易总额
      var transaction_amount_for_7 = [];
      // 每日交易总额时间
      var transaction_amount_for_7time = [];
      // 每日区块总数
      var block_num_for_7 = [];
      // 每日区块总数时间
      var block_num_for_7time = [];
      // 前100快
      var avg_gas_for_7 = [];
      // // 前100快时间
      var avg_gas_for_7time = [];
      that.$http
        .get("/show_graph_data")
        .then((res) => {
          // console.log(res.data[0].usdt);
          // console.log(res);
          // 每日交易笔数
          for (var i = 0; i < res.data[0].usdt.length + 1; i++) {
            // 每日uenc交易指数;
            usdt.unshift(res.data[0].usdt[i].usdt);
            usdttime.unshift(
              this.timestampToTime2(res.data[0].usdt[i].time).substring(5)
            );
            // 填入数据
            myChart1.setOption({
              xAxis: {
                data: usdttime,
              },
                tooltip: {
                borderColor: "#FFECD6",
                borderWidth: 1,
                padding: 15,
                extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
                show: true,
                position: "left",
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "#666666",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{b0}<br />交易指数: {c0}",
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
                  data: usdt,
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
                        show: true,
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
                        { offset: 0, color: "#BEE881" },
                        { offset: 0.8, color: "#C7EC93" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#8FD826", //改变折线颜色
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
          //  console.log(res.data[0].transaction_amount_for_7.length);
          // console.log(res);
          // 每日交易笔数
          for (
            var i = 0;
            i < res.data[0].transaction_num_for_7.length + 1;
            i++
          ) {
            // 每日交易笔数
            transaction_num_for_7.unshift(
              res.data[0].transaction_num_for_7[i].transaction_num_for_7
            );
            transaction_num_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].transaction_num_for_7[i].date
              ).substring(5, 10)
            );
            // 填入数据
            myChart2.setOption({
              xAxis: {
                data: transaction_num_for_7time,
              },
              tooltip: {
                borderColor: "#FFECD6",
                borderWidth: 1,
                padding: 15,
                extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
                show: true,
                position: "left",
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "#666666",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{b0}<br />交易笔数: {c0}",
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
                        show: true,
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
                        { offset: 0, color: "#BEE881" },
                        { offset: 0.8, color: "#C7EC93" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#8FD826", //改变折线颜色
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
          //  console.log(res.data[0].transaction_amount_for_7.length);
          // 每日交易笔数
          for (
            var i = 0;
            i < res.data[0].transaction_amount_for_7.length + 1;
            i++
          ) {
            // 每日交易笔数
            transaction_amount_for_7.unshift(
              res.data[0].transaction_amount_for_7[i].transaction_amount_for_24H
            );
            transaction_amount_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].transaction_amount_for_7[i].date
              ).substring(5, 10)
            );
            // 填入数据
            myChart3.setOption({
              xAxis: {
                data: transaction_amount_for_7time,
              },
              tooltip: {
                borderColor: "#FFECD6",
                borderWidth: 1,
                padding: 15,
                extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
                show: true,
                position: "left",
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "#666666",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{b0}<br />交易总额: {c0}",
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
              grid: {
                left: 100,
              },
              series: [
                {
                  data: transaction_amount_for_7,
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
                        show: true,
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
                        { offset: 0, color: "#BEE881" },
                        { offset: 0.8, color: "#C7EC93" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#8FD826", //改变折线颜色
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
          //  console.log(res.data[0].transaction_amount_for_7.length);
          // 每日区块总数
          for (var i = 0; i < res.data[0].block_num_for_7.length + 1; i++) {
            block_num_for_7.unshift(
              res.data[0].block_num_for_7[i].block_num_for_7
            );
            block_num_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].block_num_for_7[i].date
              ).substring(5, 10)
            );
            // 填入数据
            myChart4.setOption({
              xAxis: {
                data: block_num_for_7time,
              },
              tooltip: {
                borderColor: "#FFECD6",
                borderWidth: 1,
                padding: 15,
                extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
                show: true,
                position: "left",
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "#666666",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{b0}<br />区块总数: {c0}",
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
                  data: block_num_for_7,
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
                        show: true,
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
                        { offset: 0, color: "#BEE881" },
                        { offset: 0.8, color: "#C7EC93" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#8FD826", //改变折线颜色
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
          // console.log(res);
          //  console.log(res.data[0].transaction_amount_for_7.length);
          // 每日区块总数
          for (var i = 0; i < res.data[0].avg_gas_for_7.length + 1; i++) {
            avg_gas_for_7.unshift(
              res.data[0].avg_gas_for_7[i].block_height_for_100
            );
            avg_gas_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].avg_gas_for_7[i].date
              ).substring(5)
            );
            // 填入数据
            myChart5.setOption({
              xAxis: {
                data: avg_gas_for_7time,
              },
              tooltip: {
                borderColor: "#FFECD6",
                borderWidth: 1,
                padding: 15,
                extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
                show: true,
                position: "left",
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: 10,
                textStyle: {
                  fontSize: 12,
                  color: "#666666",
                  width: 166,
                  height: 54,
                  backgroundColor: "#fff",
                  boxshadow: "0 0 5px rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 15,
                },
                formatter: "{b0}<br />燃料费平均值: {c0}",
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
                      borderColor: "blue",
                      borderWidth: 3,
                      label: {
                        show: true,
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
                        { offset: 0, color: "#BEE881" },
                        { offset: 0.8, color: "#C7EC93" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#8FD826", //改变折线颜色
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
// 本页面
.chart {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 40px;
  z-index: 1;
  canvas{
    height: 260px!important;
    margin-top: 30px!important;
  }
  .chartzong {
    width: 1200px;
    height: 1267px;
    background: rgba(232, 234, 243, 1);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 40px;
    margin: 0 auto;
  }
  .charttitle {
    position: relative;
    font-size: 20px;
    font-family: "苹方-简";
    font-weight: bold;
    line-height: 28px;
    color: rgba(40, 96, 194, 1);
    opacity: 1;
   
    z-index: 20;
   
  }
  .chart1 {
    width: 1120px;
    height: 305px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 20px;
    margin: 0 auto;
  }
  .row1,
  .row2 {
    width: 1120px;
    display: flex;
    flex-direction: row;
    position: relative;
    margin-top: 18px;
    margin-left: 40px;
    justify-content: space-between;
  }
  .chart2,
  .chart3,
  .chart4,
  .chart5 {
    width: 550px;
    height: 305px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 20px;
  }
}
</style>
