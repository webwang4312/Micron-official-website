<template>
  <div class="chart_node">
    <div class="node">
      <div class="title">
        <img src="@assets/images/second/全网节点信息@2x.png" alt="" />
        <span>  {{ $t("chart")[0] }}</span>
      </div>
      <div class="node_detail">
        <div id="node"></div>
        <div id="fuelcost">
          <div class="title">
            {{ $t("chart")[4] }}
          </div>
          <div class="progress">
            <div class="first" :style="'width:' + credit_ratio[2].first2 + '%'">
            
            </div>
            <div
              class="second"
              :style="'width:' + credit_ratio[2].second2 + '%'"
            >
              
            </div>
            <div class="third" :style="'width:' + credit_ratio[2].third2 + '%'">
             
            </div>
            <div
              class="fourth"
              :style="'width:' + credit_ratio[2].fourth2 + '%'"
            >
            
            </div>
            <div class="five" :style="'width:' + credit_ratio[2].five2 + '%'">
             
            </div>
          </div>
          <ul>
            <li>
              <div class="blue"></div>
              <div>0~0.001</div>
              <div>{{ this.credit_ratio[1].node1 }} {{ $t("chart")[5] }}</div>
              <div>{{ this.credit_ratio[0].first }}% {{ $t("chart")[6] }}</div>
            </li>
            <li>
              <div class="yellow"></div>
              <div>0.001~0.005</div>
              <div>{{ this.credit_ratio[1].node2 }} {{ $t("chart")[5] }}</div>
              <div>{{ this.credit_ratio[0].second }} %{{ $t("chart")[6] }}</div>
            </li>
            <li>
              <div class="green"></div>
              <div>0.005~0.01</div>
              <div>{{ this.credit_ratio[1].node3 }} {{ $t("chart")[5] }}</div>
              <div>{{ this.credit_ratio[0].third }} %{{ $t("chart")[6] }}</div>
            </li>
            <li>
              <div class="red"></div>
              <div>0.01~0.05</div>
              <div>{{ this.credit_ratio[1].node4 }} {{ $t("chart")[5] }}</div>
              <div>{{ this.credit_ratio[0].fourth }} %{{ $t("chart")[6] }}</div>
            </li>
            <li>
              <div class="gray"></div>
              <div>0.05-0.1</div>
              <div>{{ this.credit_ratio[1].node5 }} {{ $t("chart")[5] }}</div>
              <div>{{ this.credit_ratio[0].five }} %{{ $t("chart")[6] }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "chart_node",
  data() {
    return {
      nowLang: "",
      nodenumber:'',
      credit_ratio: [
        { first: "10", second: "20", third: "30", fourth: "20", five: "20" },
        { node1: "10", node2: "20", node3: "30", node4: "20", node5: "20" },
         { first2: "80", second2: "10", third2: "10", fourth2: "10", five2: "10" },
      ],

      title: [{ test: "" }, { test2: "" }],
      allgas: Number,
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    if (this.nowLang == "cn") {
      this.title[0].test = "节点统计";
      this.title[0].test2 = "燃料费分布图";
      this.nodenumber='节点数'
    } else {
      this.title[0].test = "node statistics";
      this.title[0].test2 = "gas fee distribution";
      this.nodenumber='Number of nodes'
      
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
          padding: [0, 0 ,0, 0], //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
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
      that.$http
        .get("/show_graph_data")
        .then((res) => {
          //    console.log(res);
          for (var i = 0; i < res.data[0].gas_node_statistics.length + 1; i++) {
            node_for_7.unshift(res.data[0].gas_node_statistics[i].gas_count);
            node_for_7time.unshift(
              this.timestampToTime2(
                res.data[0].gas_node_statistics[i].date
              ).substring(5, 10)
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
                splitLine: { show: true, lineStyle: {
        // 使用深浅的间隔色
        color: '#EBEEEF',
         width :1
    }}, //去除网格线
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
                formatter: "{b0}<br />"+this.nodenumber+":{c0}",
                backgroundColor: "rgba(74, 74, 74, 1)",
              
                borderWidth: "1",
                textStyle: {
                  color: "rgba(255, 255, 255, 1)",
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
      that.$http.get("/search_top_n").then((res) => {
        // console.log(res);
        this.allgas = res.data.count[0].count;
        // console.log(this.allgas);
        let first = [];
        let second = [];
        let third = [];
        let fourth = [];
        let five = [];

        var num = 0;
        for (var s = 0; s < res.data.topN.length + 1; s++) {
          res.data.topN[s].gas = res.data.topN[s].gas / 1000000;
          // console.log(res.data.topN[s].gas);
          if (res.data.topN[s].gas > 0 && res.data.topN[s].gas <= 0.001) {
            let sum = 0;
            first.push(res.data.topN[s].count);
            first.forEach((item) => {
              sum = sum + item;
            });
            // console.log(res.data.topN[s].gas);
             this.credit_ratio[0].first = (sum/this.allgas*100).toFixed(2);
             //console.log(this.credit_ratio[0].first); 
            this.credit_ratio[1].node1 = sum;
            
          } else if (
            res.data.topN[s].gas > 0.001 &&
            res.data.topN[s].gas <= 0.005
          ) {
            let sum = 0;
            second.push(res.data.topN[s].count);
            second.forEach((item) => {
              sum = sum + item;
            });
             this.credit_ratio[0].second = (sum/this.allgas*100).toFixed(2);
            this.credit_ratio[1].node2= sum;
           
          }
          else if (
            res.data.topN[s].gas > 0.005 &&
            res.data.topN[s].gas <= 0.01
          ) {
            let sum = 0;
            third.push(res.data.topN[s].count);
            third.forEach((item) => {
              sum = sum + item;
            });
             this.credit_ratio[0].third =( sum/this.allgas*100).toFixed(2);
            this.credit_ratio[1].node3 = sum;
           
          }
          else if (
            res.data.topN[s].gas > 0.01 &&
            res.data.topN[s].gas <= 0.05
          ) {
            let sum = 0;
            fourth.push(res.data.topN[s].count);
            fourth.forEach((item) => {
              sum = sum + item;
            });
             this.credit_ratio[0].fourth =( sum/this.allgas*100).toFixed(2);
            this.credit_ratio[1].node4 = sum;
            
          }
          else{
             let sum = 0;
            five.push(res.data.topN[s].count);
            five.forEach((item) => {
              sum = sum + item;
            });
             this.credit_ratio[0].five=(sum/this.allgas*100).toFixed(2);
            this.credit_ratio[1].node5 = sum;
        //    if(this.credit_ratio[0].five<100){
        //        this.credit_ratio[0].five=1000
        //    }
          }
        }
      });
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
.chart_node {
   #node,
  #fuelcost {
    width: 551px;
    height: 343px;
    opacity: 1;
   
  }
  .node {
    width: 1274px;
    height: auto;
    border-radius: 18px;
    padding-top: 60px;
    
    margin:0px auto 47px;
    .title{
      margin-bottom: 23px;
    }
    .first {
      background: #965ee5;
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
            width: 140px;
            font-size: 15px;
            font-family: Arial;
            font-weight: bold;

            color: #a8aabc;
            margin-right:30px;
          }
          div:nth-child(4) {
            font-size: 15px;
            font-family: Arial;
            font-weight: bold;

            color: #a8aabc;
          }
          .blue {
            background: #965ee5;
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
