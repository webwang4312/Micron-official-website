<template>
  <div class="index">
    <headertop></headertop>
    <div class="indexzong">
      <!-- 搜索栏区域 -->
      <search></search>
      <!-- 卡片区域 -->
      <div class="card">
        <!-- 卡片左边 -->
        <div class="cardleft" >
          <div class="cardlefttop">
            <img src="../assets/images/index/uenc.png" />
            <div class="cardlefttopright">
              <p>UENC</p>
              <p>
                <span style="color:#FFC787">{{ money }}</span> USDT≈<span
                  style="color:#FFC787"
                  >￥{{ money2 }}</span
                >
              </p>
            </div>
          </div>
          <div class="cardleftbottom">
            <ul>
              <li>
                <p>{{ $t("publicsection[3]") }}</p>
                <p>{{ blockheigth }}</p>
              </li>
              <li>
                <p>{{ $t("home.cardleft[0]") }}</p>
                <p>{{ transzoom }}</p>
              </li>
              <li>
                <p>{{ $t("home.cardleft[1]") }}</p>
                <p>{{ transmoney }}</p>
              </li>
              <li>
                <p>{{ $t("publicsection[4]") }}</p>
                <p>{{ transnumber }}</p>
              </li>
              <li>
                <p>{{ $t("home.cardleft[2]") }}</p>
                <p>{{ blockreward }}</p>
              </li>
              <li>
                <p>{{ $t("home.cardleft[3]") }}</p>
                <p>{{ blocklastreward }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 卡片右边 -->
        <div
          class="cardright"
          id="bar"
          v-show="card"
          v-loading="loading2"
          element-loading-background="rgba(0, 0, 0,0)"
        ></div>

        <div
          class="cardright"
          id="bars"
          v-show="card2"
          v-loading="loading2"
          element-loading-background="rgba(0, 0, 0,0)"
        ></div>
        <div
          class="cardright"
          id="barss"
          v-show="card3"
          v-loading="loading2"
          element-loading-background="rgba(0, 0, 0,0)"
        ></div>
        <div class="cardp">
          <p @click="cardclick1" :class="{ cardblue: card }">
            {{ $t("home.cardright[0]") }}
          </p>
          <p @click="cardclick2" :class="{ cardblue: card2 }">
            {{ $t("home.cardright[1]") }}
          </p>
          <p @click="cardclick3" :class="{ cardblue: card3 }">
            {{ $t("home.cardright[2]") }}
          </p>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="indexcontent">
        <p class="last">{{ $t("home.contenttop[0]") }}</p>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          class="eltable1"
          @row-click="gototransactiondetail"
        >
          <el-table-column
            align="center"
            prop="transaction_hash2"
            :label="$t('home.contenttop[0]')"
            v-if="tables"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="transaction_hash"
            :label="$t('home.contenttop[1]')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="date"
            :label="$t('publicsection[8]')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="amount"
            :label="$t('publicsection[5]')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="from_address"
            :label="$t('publicsection[6]')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="to_address"
            :label="$t('publicsection[7]')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gas"
            :label="$t('home.contenttop[2]')"
          ></el-table-column>
        </el-table>

        <p class="seemore" @click="gototransaction">
          {{ $t("publicsection[9]") }}
        </p>
        <p class="last">{{ $t("home.contentbottom[0]") }}</p>
        <el-table
          v-loading="loading"
          :data="tableData2"
          style="width: 100%"
          class="eltable2"
          @row-click="gotoblockdetail"
        >
          <el-table-column
            prop="block_height"
            :label="$t('publicsection[3]')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="time"
            :label="$t('publicsection[8]')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="tx_num"
            :label="$t('publicsection[4]')"
          ></el-table-column>
          <el-table-column
            prop="amount"
            :label="$t('publicsection[5]')"
          ></el-table-column>
          <el-table-column
            prop="award"
            :label="$t('home.cardleft[2]')"
          ></el-table-column>
        </el-table>
        <p class="seemore" @click="gotoblock">{{ $t("publicsection[9]") }}</p>
      </div>
      <!-- 底部区域 -->
      <div class="indexfooter">
        <div class="footertop">
          <img src="../assets/images/index/路径 88.png" alt />
          <span>UENC</span>
        </div>
        <div class="footercontent">
          <p>{{ $t("home.bottom[0]") }}</p>
        </div>
        <div class="footerfooter">
          <ul>
            <li>{{ $t("home.bottom[1]") }}2018-11-11</li>
            <li>{{ $t("home.bottom[2]") }}{{ $t("footerlast[0]") }}</li>
            <li>{{ $t("home.bottom[3]") }}{{ $t("footerlast[1]") }}</li>
            <li>{{ $t("home.bottom[4]") }}https://www.uenc.io</li>
          </ul>
        </div>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script>
import Search from "@components/common/search.vue";
import VFooter from "@components/common/Footer.vue";
import headertop from "@components/common/HeaderTop";
export default {
  name: "index",
  data() {
    return {
      timer: null, //定时器名称
      loading: true,
      loading2: true,
      // 固定设置
      sticky: false,
      tables: false,
      // 外部公共部分
      fullscreenLoading: false,
      nowLang: "",
      language: "",
      // 语言图片显示与隐藏
      show: true,
      choselanguage: ["中文", "EN"],
      card: true,
      card2: false,
      card3: false,
      money: "",
      money2: "",
      // 卡片左边所有的数据
      // 区块高度
      blockheigth: "",
      // 24小时交易笔数?
      transzoom: "",
      // 24小时交易总额?
      transmoney: ""||0,
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
  components: { VFooter, Search, headertop },
  created() {
    this.nowLang = this.$i18n.locale;
    this.indexlist();

    // 获取首页数据
  },
  beforeDestroy() {
    clearInterval(this.timer); // 清除定时器
    this.timer = null;
  },

  mounted() {
    // setInterval(this.timer, 4000);
    this.timer = setInterval(this.indexlist, 20000);
    this.drawLine();
  },
  activated() {},
  methods: {
    // timer() {
    //   return setTimeout(() => {
    //     this.indexlist();
    //   }, 4000);
    // },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("bar"));
      let myChart2 = echarts.init(document.getElementById("bars"));
      let myChart3 = echarts.init(document.getElementById("barss"));
      var data = [];
      // 绘制图表
      myChart.setOption({
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
          axisLabel: {
            interval: 36,
            formatter: function(value) {
              //x轴的文字改为竖版显示
              var str = value.split(" ");
              return str[0];
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          splitNumber: 2,
          type: "value",
          splitLine: { show: false }, //去除网格线
          position: "right",
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
          splitNumber: 2,
          type: "value",
          splitLine: { show: false }, //去除网格线
          position: "right",
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
        tooltip: {
          trigger: "item",
        },
        legend: {},
        series: [
          {
            type: "pie",

            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 20,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
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
      // 时间
      var transaction_num_for_7time = [];
      //  燃料费分布

      that.$http
        .get("")
        .then((res) => {
          this.loading2 = false;
          // console.log(res);
          for (var i = 0; i < res.data[0].get_avgGas_for_100.length + 1; i++) {
            ranliaoaverage.unshift(
              res.data[0].get_avgGas_for_100[i].block_height_for_100
            );
            shijianchuo.unshift(
              this.timestampToTime2(
                res.data[0].get_avgGas_for_100[i].date
              ).substring(5)
            );
            // console.log(i);
            //  console.log(ranliaoaverage);
            //  console.log(shijianchuo);
            // 填入数据

            myChart.setOption({
              xAxis: {
                data: shijianchuo,
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
                  data: ranliaoaverage,
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
                        { offset: 0, color: "#FFDAAF" },
                        { offset: 0.4, color: "#FFDAAF" },
                        { offset: 1, color: "#fff" },
                      ]),
                    },
                  },
                  lineStyle: {
                    color: "#FE9D67", //改变折线颜色
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
          //  console.log(res);

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
        .get("/search_top_n")
        .then((res) => {
          var ranliaofei = [
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
            { name: "", value: "" },
          ];
          var count = res.data.count[0].count;
          for (var j = 0; j < res.data.topN.length + 1; j++) {
            ranliaofei[j].name = Number(res.data.topN[j].gas) / Number(1000000);

            ranliaofei[j].value = res.data.topN[j].count;

            myChart3.setOption({
              title: {
                zlevel: 0,
                text: ["{name|节点总数}", "{value|" + count + "}"].join("\n"),
                top: "45%",
                left: "21%",
                textAlign: "center",
                textStyle: {
                  rich: {
                    value: {
                      fontSize: 26,
                      lineHeight: 37,
                      color: "#2860C2",
                      fontFamily: "苹方-简",
                      lineHeight: 24,
                    },
                    name: {
                      fontSize: "16px",
                      color: "#333333",
                      fontSize: 16,
                      fontFamily: "苹方-简",
                      lineHeight: 22,
                    },
                  },
                },
              },
              tooltip: {
                trigger: "item",
                formatter: "燃料费:{b} </br> 节点数量:{c} </br> 全网占比:{d}%",
              },
              color: [
                "#4C7CDB",
                "#B9596C",
                "#514CDB",
                "#BF74A6",
                "#DB6B4C",
                "#63B5B2",
                "#95B575",
                "#9D52A5",
                "#6CBE4A",
                "#DBBE4C",
              ],
              legend: {
                orient: "horizontal",
                top: "25%",
                right: "0%",
                padding: [40, 50],
                width: 220,
                pageButtonItemGap: 20,
                itemGap: 25,
                icon: "circle",

                formatter: function(name) {
                  // console.log(name);
                  let data = ranliaofei;
                  return name;
                },
              },

              series: [
                {
                  minAngle: 30,
                  data: ranliaofei,
                  name: "节点总数",
                  type: "pie",
                  roundCap: false,
                  radius: ["50%", "60%"],
                  center: ["22%", "55%"],
                  avoidLabelOverlap: false,

                  stillShowZeroSum: false,
                  zlevel: 1,
                  label: {
                    normal: {
                      padding: [],
                      backgroundColor: "#fff",
                      show: false,
                      position: "center",
                      formatter: [
                        "燃料费:{name|{b}}",
                        "节点数量:{value|{c}}",
                      ].join("\n"),
                      rich: {
                        value: {
                          color: "#303133",
                          fontSize: 24,
                          lineHeight: 24,
                        },
                        name: {
                          color: "#909399",
                          fontSize: 14,
                          lineHeight: 35,
                        },
                      },
                    },
                    emphasis: {
                      show: false,
                      textStyle: {
                        fontSize: "16",
                        fontWeight: "bold",
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  itemStyle: {
                    borderRadius: 200,
                    borderColor: "#f00",
                    borderWidth: 2,
                    // 此配置
                    normal: {
                      borderWidth: 4,
                      borderColor: "#ffffff",
                    },
                    emphasis: {
                      borderWidth: 0,
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                },
              ],
            });
          }

          // var ranliaofei =[{
          //         name: '其它',
          //         value: 320
          //     },{
          //         name: '休闲裤',
          //         value: 586
          //     },{
          //         name: '女士衬衫',
          //         value: 874
          //     },{
          //         name: '运动服',
          //         value: 725
          //     }];
        })
        .catch((e) => {});
    },

    //获取首页数据
    indexlist() {
      let that = this;
      that.$http
        .get("")
        .then((res) => {
          // console.log(res);
          this.loading = false;

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
         

          // console.log(this.transmoney);
          // console.log(res.data[0].block_height_all[0].block_height);
          //this.totalNum = res.data.result.total;
          //console.log(this.totalNum);
          // table赋值
          //for (let i = 0; i < res.data.result.list.length + 1; i++) {
          //var obj = {};
          //obj.height = res.data.result.list[i].content_id;
          //console.log(obj);
          //blockData[i] = obj;
          //console.log(blockData);
          //this.blockData = blockData;
          //console.log(obj);
          //}
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
    //日期转时间戳
    transdate(time) {
      var date = new Date();
      date.setFullYear(time.substring(0, 4));
      date.setMonth(time.substring(5, 7) - 1);
      date.setDate(time.substring(8, 10));
      date.setHours(time.substring(11, 13));
      date.setMinutes(time.substring(14, 16));
      date.setSeconds(time.substring(17, 19));
      return Date.parse(date) / 1000;
    },
    // 点击卡片切换
    cardclick1() {
      this.card3 = false;
      this.card2 = false;
      this.card = true;
    },
    cardclick2() {
      this.card2 = true;
      this.card = false;
      this.card3 = false;
    },
    cardclick3() {
      this.card2 = false;
      this.card = false;
      this.card3 = true;
    },

    // 首页跳转到交易详情页
    gototransactiondetail(row, event, column) {
      this.$router.push({
        path: "transactiondetail",
        query: { transaction_hash: row.transaction_hash2 },
      });
      // console.log(row, event, column);
    },
    // 首页跳转到块详情页
    gotoblockdetail(row, event, column) {
      this.$router.push({
        path: "/blockdetail",
        query: { blockheight: row.block_height },
      });
      //  console.log(row, event, column);
    },
    // 转到交易界面
    gototransaction() {
      this.$router.push({ path: "/transaction" });
    },
    // 转到区块界面
    gotoblock() {
      this.$router.push({ path: "/block" });
    },
  },
};
</script>
<style lang="less">
#barss {
  .number {
    position: relative;
    left: 70%;
    top: 90%;
    font-size: 14px;
  }
  .el-table--border td {
    border-right: none !important;
  }
  .number2 {
    position: relative;
    left: 70%;
    top: 88%;
    font-size: 12px;
  }
  .el-table td {
    border: none !important;
  }
  .el-table {
    position: absolute !important;
    top: 54px !important;
    height: 220px !important;
    left: 50px !important;
    width: 470px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 15px;
  }
  .has-gutter {
    line-height: 36px !important;
    font-size: 16px;
    font-family: "苹方-简";
    font-weight: normal;
    color: #333333;
    opacity: 1;
    background: red !important;
  }
  .el-table .cell {
    line-height: 35px !important;
  }
  .el-table td,
  .el-table th {
    padding: 0px !important;
  }
}

// 本页面
.index {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 20px;
  opacity: 1;
  border-radius: 40px;
  z-index: 1;
  .el-table td {
    border-bottom: 1px solid rgba(51, 51, 51, 0.1);
  }
  // .el-table th {
  //   background: rgba(40, 96, 149, 0.1) !important;
  // }
  .el-table__header tr th {
    // background: rgba(40, 96, 194, 0.001) !important;
  }
  .cardblue {
    color: rgba(40, 96, 194, 1) !important;
    font-weight: bold;
  }
  .indexzong {
    width: 1200px;
    height: auto;
    background: rgba(232, 234, 243, 1);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 40px;
    margin: 0 auto;
  }
  .card {
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    // 卡片左边
    .cardleft {
      width: 550px;
      height: 305px;
      background: rgba(40, 96, 194, 1);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      opacity: 1;
      border-radius: 20px;
      position: relative;
      left: 45px;
      .cardlefttop {
        display: flex;
        flex-direction: row;
        position: relative;
        img {
          position: absolute;
          left: 40px;
          top: 30px;
        }
        .cardlefttopright {
          p:nth-child(1) {
            position: absolute;
            left: 91px;
            top: 30px;
            font-size: 16px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 28px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
          }
          p:nth-child(2) {
            position: absolute;
            left: 91px;
            top: 58px;
            font-size: 20px;
            font-family: "苹方-简";
            font-weight: normal;
            line-height: 17px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
          }
        }
      }
      .cardleftbottom {
        width: 470px;
        height: 160px;
        background: rgba(77, 121, 242, 1);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        opacity: 1;
        border-radius: 15px;
        position: absolute;
        left: 40px;
        top: 115px;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          flex-wrap: wrap;
          li {
            width: 140px;
            margin-top: 15px;
            margin-left: 15px;
            text-align: left;
            p:nth-child(1) {
              font-size: 18px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 25px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
            }
            p:nth-child(2) {
              font-size: 16px;
              font-family: "苹方-简";
              font-weight: normal;
              line-height: 25px;
              color: rgba(255, 199, 135, 1);
              opacity: 1;
            }
          }
        }
      }
    }
    // 卡片右边
    .cardright {
      width: 550px;
      height: 305px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      opacity: 1;
      border-radius: 20px;
      position: relative;
      left: 66px;
    }
    .cardp {
      width: 550px;
      position: absolute;
      left: 620px;
      top: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      cursor: pointer;
      p {
      }
      p:nth-child(2) {
      }
    }
  }
  .indexcontent {
    width: 1120px;
    height: 915px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
    // 最新
    .last {
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: bold;
      line-height: 28px;
      color: rgba(40, 96, 194, 1);
      opacity: 1;
      position: relative;
      left: 40px;
      top: 30px;
      margin-bottom: 50px;
    }
    // 查看更多
    .seemore {
      width: 1040px !important;
      margin: 0 auto;
      height: 61px;
      line-height: 61px !important;
      text-align: center;
      font-size: 20px;
      font-family: "苹方-简";
      font-weight: bold;
      color: rgba(40, 96, 194, 1);
      opacity: 1;
      cursor: pointer;
      background: rgba(40, 96, 194, 0.1);
      border-top: 1px solid rgba(51, 51, 51, 0.1);
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    .el-table__row {
      height: 51px;
      line-height: 51px;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 22px;
      color: rgba(51, 51, 51, 1);
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
    // 表格1
    .eltable1 {
      width: 1040px !important;
      margin: 0 auto;
      position: relative;
      height: 304px;
      outline: none;
      border: none;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      background: rgba(40, 96, 194, 0.1);
      cursor: pointer;
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: none !important;
      }
      .el-table__body tr td {
        text-align: center;
      }

      .el-table__row {
        background: rgba(233, 239, 249) !important;
      }
      tbody tr td:nth-child(1) {
        text-align: left;
        padding-left: 20px !important;
      }
      tbody tr td:nth-child(6) {
        text-align: right;
        padding-right: 20px !important;
      }
      .has-gutter tr th:nth-child(6) div {
        text-align: right !important;
        padding-right: 30px !important;
      }
      .has-gutter tr th:nth-child(1) {
        div {
          text-align: left !important;
          padding-left: 30px !important;
        }

        border-bottom-left-radius: 10px !important;
      }
      .has-gutter tr th:nth-last-child(2) {
        border-bottom-right-radius: 10px !important;
      }
      .has-gutter tr th {
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 22px;
        color: rgba(40, 96, 194, 1);
        background: rgba(40, 96, 194, 0.1);
        text-align: center;
        th div {
          text-align: center;
        }
      }
    }
    // 表格2
    .eltable2 {
      width: 1040px !important;
      margin: 0 auto;
      height: 304px;
      outline: none;
      border: none;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      cursor: pointer;
      background: rgba(40, 96, 194, 0.1);
      tbody tr td:nth-child(1) {
        text-align: left;
        padding-left: 20px !important;
      }
      tbody tr td:nth-child(5) {
        text-align: right;
        padding-right: 20px !important;
      }
      .has-gutter tr th:nth-child(5) div {
        text-align: right;
        padding-right: 30px !important;
      }
      .has-gutter tr th:nth-child(1) {
        div {
          text-align: left;
          padding-left: 30px !important;
        }

        border-bottom-left-radius: 10px !important;
      }
      .has-gutter tr th:nth-last-child(2) {
        border-bottom-right-radius: 10px !important;
      }
      .el-table__row {
        background: rgba(233, 239, 249) !important;
      }
      .el-table__body tr td {
        text-align: center;
      }
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: none !important;
      }
      .has-gutter tr th {
        text-align: center;
        font-size: 16px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 22px;
        color: rgba(40, 96, 194, 1);
        opacity: 1;

        background: rgba(40, 96, 194, 0.1);
        th div {
          text-align: center;
        }
      }
    }
    .el-table__header-wrapper {
      width: 100%;
      // border-radius: 15px;
    }
  }
  // 内容底部
  .indexfooter {
    width: 1175px;
    height: 277px;
    position: relative;
    margin: 0 auto;
    background: url("../assets/images/index/Icon 3.png") no-repeat center/100%
      100%;
    margin-bottom: -28px;
    .footertop {
      position: relative;
      left: 70px;
      top: 57px;
      span {
        position: relative;
        left: 10px;
        top: -5px;
        font-size: 20px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 28px;
        color: rgba(51, 51, 51, 1);
        opacity: 1;
      }
    }
    .footercontent p {
      position: relative;
      width: 1030px;
      top: 63px;
      left: 80px;
      text-indent: 2em;
      font-size: 16px;
      font-family: "苹方-简";
      font-weight: normal;
      line-height: 22px;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
    }
    .footerfooter ul {
      width: 1030px;
      position: relative;
      top: 74px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 auto;
      li {
        font-size: 20px;
        font-family: "苹方-简";
        font-weight: normal;
        line-height: 28px;
        color: rgba(40, 96, 194, 1);
        opacity: 1;
      }
    }
  }
}
</style>
