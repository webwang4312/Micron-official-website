<template>
  <div id="chart">
    <div class="node">
      <div class="title">
        <img src="@assets/images/second/全网节点信息@2x.png" alt="" />
        <span>全网节点信息</span>
      </div>
      <div class="node_detail">
        <div id="node"></div>
        <div id="fuelcost">
          <div class="title">
            燃料费分布图
          </div>
          <div class="progress">
            <div class="first" :style="'width:' + credit_ratio[0].first + '%'">
              1
            </div>
            <div
              class="second"
              :style="'width:' + credit_ratio[0].second + '%'"
            >
              2
            </div>
            <div class="third" :style="'width:' + credit_ratio[0].third + '%'">
              3
            </div>
            <div
              class="fourth"
              :style="'width:' + credit_ratio[0].fourth + '%'"
            >
              4
            </div>
            <div class="five" :style="'width:' + credit_ratio[0].five + '%'">
              5
            </div>
          </div>
          <ul>
            <li>
              <div class="blue"></div>
              <div>0~0.001</div>
              <div>
              {{this.credit_ratio[1].node1}} 节点
              </div>
              <div>
                 {{this.credit_ratio[0].first}}% 占比
              </div>
            </li>
            <li>
              <div class="yellow"></div>
              <div>0.001~0.01</div>
              <div>
              {{this.credit_ratio[1].node2}} 节点
              </div>
              <div>
                 {{this.credit_ratio[0].second}}% 占比
              </div>
            </li>
            <li>
              <div class="green"></div>
              <div>0.01~0.1</div>
              <div>
                {{this.credit_ratio[1].node3}} 节点
              </div>
              <div>
               {{this.credit_ratio[0].third}}% 占比
              </div>
            </li>
            <li>
              <div class="red"></div>
              <div>0.1~1</div>
              <div>
              {{this.credit_ratio[1].node4}} 节点
              </div>
              <div>
                 {{this.credit_ratio[0].fourth}}% 占比
              </div>
            </li>
            <li>
              <div class="gray"></div>
              <div>1-2</div>
              <div>
              {{this.credit_ratio[1].node5}} 节点
              </div>
              <div>
                 {{this.credit_ratio[0].five}}% 占比
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="node">
      <div class="title">
        <img src="@assets/images/second/挖矿奖励@2x.png" alt="" />
        <span>挖矿奖励</span>
      </div>
      <div class="node_detail">
        <div id="average_fuelcost"></div>
        <div id="average_blockreward"></div>
      </div>
    </div>
    <div class="node">
      <div class="title">
        <img src="@assets/images/second/交易信息@2x.png" alt="" />
        <span>交易信息</span>
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
  name: "chart",
  data() {
    return {
      nowLang: "",
      credit_ratio: [
        { first: "10", second: "20", third: "30", fourth: "20", five: "20" },
        { node1: "10", node2: "20", node3: "30", node4: "20", node5: "20" },
      ],

      title: [{ test: "" }, { test2: "" }],
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    if (this.nowLang == "cn") {
      this.title[0].test = "节点统计";
      this.title[0].test2 = "燃料费分布图";
    } else {
      this.title[0].test = "Node statistics";
      this.title[0].test2 = "Fuel cost distribution map";
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
      let myChart = echarts.init(document.getElementById("node"));

      var data = [];
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title[0].test,
          x: "left", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          padding: 25, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 30, //主副标题纵向间隔，单位px，默认为10
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
              tooltip: {
                trigger: "item",
                formatter: "{c0}",
                backgroundColor: "#EEF0F2",
                borderColor: "#EEF0F2",
                borderWidth: "1",
                textStyle: {
                  color: "#965EE5",
                  fontWeight: "bold",
                },
              },
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
                        color:'#965EE5',
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
#chart {
  width: 100%;
  height: auto;
  margin-bottom: 53px;
  .first {
    background: #965EE5;;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .second {
    background: #ffc934;
  }
  .third {
    background: #90e2ca;
  }
  .fourth {
    background: #ff707a;
  }
  .five {
    background: #eeeeee;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  #fuelcost {
    ul {
      margin-top: 14px;
      li {
        display: flex;
        flex-direction: row;
        margin-top: 24px;
        align-items: center;

        div:nth-child(1) {
          width: 18px;
          height: 18px;
          opacity: 1;
          border-radius: 5px;
          margin-right: 23px;
        }
        div:nth-child(2) {
          width: 76px;
          font-size: 15px;
          font-family: Arial;
          font-weight: bold;

          color: #515151;
          margin-right: 127px;
        }
        div:nth-child(3) {
          width: 70px;
          font-size: 15px;
          font-family: Arial;
          font-weight: bold;

          color: #a8aabc;
          margin-right: 150px;
        }
        div:nth-child(4) {
          font-size: 15px;
          font-family: Arial;
          font-weight: bold;

          color: #a8aabc;
        }
        .blue {
        background: #965EE5;
        }
        .yellow {
          background: #ffc934;
        }
        .green {
          background: #90e2ca;
        }
        .red {
          background: #ff707a;
        }
        .gray {
          background: #eeeeee;
        }
      }
    }
    .title {
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      line-height: 21px;
      color: #000000;
      margin-bottom: 32px;
      margin-top: 44px;
    }
    .progress {
      display: flex;
      flex-direction: row;

      width: 551px;
      div {
        height: 18px;
      }
    }
  }
  #node,
  #fuelcost {
    width: 551px;
    height: 100%;
    opacity: 1;
    // div {
    //   height: 100% !important;
    //   canvas {
    //     height: 100% !important;
    //   }
    // }
  }
  .node {
    width: 1274px;
    height: 412px;
    border-radius: 18px;
    margin: 47px auto;
    .node_detail {
      width: 1274px;
      height: 412px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border: 1px solid #e9eced;
      border-radius: 18px;
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
