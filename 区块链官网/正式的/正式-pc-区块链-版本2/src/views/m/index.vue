<template>
  <div class="index">
    <div class="info">
      <ul class="info_first">
        <li>
          <div class="block_height"></div>
          <div>
            <div class="center_top">
              {{ blockheigth }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[0] }}
            </div>
          </div>
        </li>
        <li>
          <div class="transaction24"></div>
          <div>
            <div class="center_top">
              {{ transzoom }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[1] }}
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="award"></div>
          <div>
            <div class="center_top">
              {{ blockreward }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[2] }}
            </div>
          </div>
        </li>
        <li>
          <div class="alljiedian"></div>
          <div>
            <div class="center_top">
              {{ jiediancount }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[3] }}
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="alltransaction"></div>
          <div>
            <div class="center_top">
              {{ transnumber }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[4] }}
            </div>
          </div>
        </li>
        <li>
          <div class="last_award"></div>
          <div>
            <div class="center_top">
              {{ blocklastreward }}
            </div>
            <div class="center_bottom">
              {{ $t("index")[5] }}
            </div>
          </div>
        </li>
      </ul>

      <!--     
      <div class="info_top info_bottom">
        
      </div> -->
    </div>
    <div class="hezi"></div>
    <div class="chart">
      <div id="bars"></div>
      <div id="bar"></div>
    </div>
    <div class="hezi"></div>
    <div class="info_list">
      <div class="last_transaction">
        <div class="subject">
          <div>
            {{ $t("index")[6] }}
          </div>
          <div class="more" @click="goToTransaction">
            {{ $t("index")[8] }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content">
          <li v-for="item in tableData" :key="item">
            <ul>
              <li>
                <div>
                  交易哈希TX
                </div>
                <div
                  @click="goToTransactionDetail(item.transaction_hash2)"
                  class="blue"
                >
                  {{ item.transaction_hash }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("index")[9] }}
                </div>
                <div
                  @click="goToAddressDetail(item.from_address2)"
                  class="blue"
                >
                  {{ item.from_address }}
                </div>
              </li>
              <li>
                <div>
                  {{ $t("index")[10] }}
                </div>
                <div @click="goToAddressDetail(item.to_address2)" class="blue">
                  {{ item.to_address }}
                </div>
              </li>
              <li>
                <div>
                  交易额:
                </div>
                <div>
                  {{ item.amount }}
                </div>
              </li>
              <li>
                <div>
                  时间
                </div>
                <div>
                  {{ item.date.toString() }}
                </div>
              </li>
              <li>
                <div></div>
                <div
                  style="width: 248px;
height: 0px;border-bottom:1px solid #B2B2B2"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="last_block">
        <div class="subject">
          <div>
            {{ $t("index")[7] }}
          </div>
          <div class="more" @click="goToBlock">
            {{ $t("index")[8] }}<i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <ul class="content">
          <li v-for="item in tableData2" :key="item">
            <ul>
              <li>
                <div>
                  高度
                </div>
                <div @click="goToBlockDetail(item.block_height)" class="blue">
                  {{ item.block_height }}
                </div>
              </li>
              <li>
                <div>区块奖励</div>
                <div>
                  {{ item.award }}
                </div>
              </li>
              <li>
                <div>
                  时间
                </div>
                <div>
                  {{ item.time.toString() }}
                </div>
              </li>
              <li>
                <div>
                  交易笔数
                </div>
                <div>
                  {{ item.tx_num }}
                </div>
              </li>
               <li>
                <div></div>
                <div
                  style="width: 248px;
height: 0px;border-bottom:1px solid #B2B2B2"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
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
      test1: "",
      test2: "",
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
          from_address2: "",
          to_address2: "",
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
      jiediancount: "",
    };
  },
  watch: {},

  created() {
    this.nowLang = this.$i18n.locale;
    if (this.nowLang == "cn") {
      (this.test1 = "区块奖励"), (this.test2 = "每日交易总额");
    } else {
      (this.test1 = "Block reward"), (this.test2 = "Total daily transactions");
    }
    this.indexlist();
    this.jiedian();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    goToAddressDetail(item) {
      //console.log(item);
      this.$router.push({
        path: "/addressdetail",
        query: {
          address: item,
        },
      });
    },
    goToTransaction() {
      this.$router.push({
        path: "/transaction",
      });
    },
    goToTransactionDetail(item) {
      this.$router.push({
        path: "/transactiondetail",
        query: {
          transaction_hash: item,
        },
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
        query: {
          block: item,
        },
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
          text: this.test1,
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
                color: "#965EE5", //折线的颜色
              },
            },
          },
        ],
      });
      myChart2.setOption({
        title: {
          text: this.test2,
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
                 color:'#965EE5',
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

                show: true,
                position: "left",
                backgroundColor: "rgba(238, 240, 242, 1)",

                textStyle: {
                  fontFamily: "Microsoft YaHei",
                  fontWeight: "bold",
                  lineHeight: 5,
                  fontSize: 15,
                  color: "#965EE5",
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
    jiedian() {
      let that = this;
      that.$http.get("/search_top_n").then((res) => {
        this.jiediancount = res.data.count[0].count;
        // console.log(res.data.count[0].count);
      });
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
              this.tableData[i].from_address2 = this.tableData[i].from_address;
              this.tableData[i].transaction_hash =
                this.tableData[i].transaction_hash.substring(0, 10) + "...";
              this.tableData[i].from_address =
                this.tableData[i].from_address.substring(0, 10) + "...";

              this.tableData[i].to_address2 = this.tableData[i].to_address;
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
              this.tableData[i].from_address2 = this.tableData[i].from_address;
              this.tableData[i].from_address =
                this.tableData[i].from_address.substring(0, 10) + "...";
              this.tableData[i].to_address =
                this.tableData[i].to_address.substring(0, 10) + "...";

              this.tableData[i].to_address2 = this.tableData[i].to_address;
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
.blue {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 18px;
  color: #965EE5 !important;
  cursor: pointer;
}
canvas {
  z-index: 2;
}

.el-icon-arrow-right {
}
.more {
  cursor: pointer;
}
#bars {
  width: 343px;
  height: 322px;
  background: #ffffff !important;
  z-index: 2;
}
#bar {
  width: 343px;
  height: 322px;
  background: #ffffff;
  z-index: 2;
}
.index {
  height: auto;
  z-index: 1;
  .hezi {
    width: 100%;
    height: 10px;
    background: #f8f8f8;
  }
  .info {
    width: 343px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 30px;
    padding-top: 12px;
    background: gray;
    .info_first {
      margin-top: 0px;

      background: red;
    }
    ul {
      width: 100%;
      //background: chocolate;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 38px;
      padding: 0 9px;
      li:nth-child(1) {
        width: 200px;
        margin-right: 61px;
      }
      li {
        width: 200px;
        display: flex;
        flex-direction: row;
      }
      .block_height {
        width: 44px;
        height: 44px;
        background: url("../../assets/images/second/区块高度.png") no-repeat
          center/100% 100%;
      }
      // .block_height:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/区块高度.gif") no-repeat
      //     center/100% 100%;
      // }
      .transaction24 {
        width: 44px;
        height: 44px;
        background: url("../../assets/images/second/24H交易数.png") no-repeat
          center/100% 100%;
      }
      // .transaction24:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/24H交易数.gif") no-repeat
      //     center/100% 100%;
      // }
      .award {
        width: 44px;
        height: 44px;
        background: url("../../assets/images/second/已发放奖励.png") no-repeat
          center/100% 100%;
      }
      // .award:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/已发放奖励.gif") no-repeat
      //     center/100% 100%;
      // }
      .alljiedian {
        width: 44px;
        height: 44px;
        background: url("../../assets/images/second/节点总数.png") no-repeat
          center/100% 100%;
      }
      // .alljiedian:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/节点总数.gif") no-repeat
      //     center/100% 100%;
      // }
      .alltransaction {
        width: 44px;
        height: 44px;
        background: url("../../assets/images/second/累计交易数.png") no-repeat
          center/100% 100%;
      }
      // .alltransaction:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/累计交易数.gif") no-repeat
      //     center/100% 100%;
      // }
      .last_award {
        width: 44px;
        height: 44px;
        background: url("../../assets/images/second/剩余区块奖励.png") no-repeat
          center/100% 100%;
      }
      // .last_award:hover {
      //   width: 44px;
      //   height: 44px;
      //   background: url("../assets/images/second/剩余区块奖励.gif") no-repeat
      //     center/100% 100%;
      // }
    }
    .center_bottom {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: #9da5bb;
      margin-top: 2px;
    }
    .center_top {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 21px;
      color: #253551;
    }
  }
  .chart {
    position: relative;
    width: 343px;
    height: auto;
    margin: 10px auto 10px;
    z-index: 2;
  }
  .info_list {
    width: 343px;
    height: auto;
    margin: 20px auto 37px;
    display: flex;
    flex-direction: column;

    .last_transaction {
      width: 100%;
      height: auto;

      margin-bottom: 20px;
      .subject {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #253551;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #965EE5;
        }
      }
      .content {
        width: 100%;
        margin: 0 auto;
      }
      .content > li {
        width: 100%;
        height: 172px;

        display: flex;
        align-items: center;
        ul {
          width: 100%;
          height: 100%;
          li:nth-child(1) {
            margin-top: 20px;
          }
          li {
            display: flex;
            flex-direction: row;

            margin-top: 10px;
            div:nth-child(1) {
              width: 100px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #9da5bb;
            }
            div:nth-child(2) {
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #253551;
            }
          }
        }
      }
    }
    .last_block {
      width: 100%;
      height: auto;

      .subject {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #253551;
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 20px;
          color: #965EE5;
        }
      }
      .content {
        width: 100%;
        height: auto;
        margin: 0 auto;
      }
      .content > li {
        width: 100%;
        height: 143px;

        display: flex;
        align-items: center;
        ul {
          width: 100%;
          height: 143px;
          li:nth-child(1) {
            margin-top: 20px;
          }
          li {
            margin-top: 10px;
            display: flex;
            flex-direction: row;

            div:nth-child(1) {
              width: 100px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #9da5bb;
            }
            div:nth-child(2) {
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 18px;
              color: #253551;
            }
          }
        }
      }
    }
  }
}
</style>
