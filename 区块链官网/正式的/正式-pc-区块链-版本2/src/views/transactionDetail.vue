<template>
  <div class="transactiondetail">
    <div class="top">
      <img src="@assets/images/second/交易明细.png" alt="" />
      <span>交易明细</span>
    </div>
    <div class="detail_content">
      <ul class="all_content">
        <li>
          <div>所属区块:</div>
          <div class="blue">1</div>
        </li>
        <li>
          <div>交易哈希:</div>
          <div class="strong">2</div>
        </li>
        <li>
          <div>交易时间:</div>
          <div class="strong">3</div>
        </li>
        <li>
          <div >从:</div>
          <div class="blue">4</div>
        </li>
        <li>
          <div >至:</div>
          <div class="blue">5</div>
        </li>
        <li>
          <div>交易额:</div>
          <div class="strong">6</div>
        </li>
        <li>
          <div>共识数:</div>
          <div class="strong">7</div>
        </li>
        <li>
          <div>交易签名节点:</div>
          <ul class="blue detail_info2">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
          </ul>
        </li>
        <li>
          <div>燃料费:</div>
          <div class="strong">9</div>
        </li>
        <li>
          <div>区块奖励:</div>
          <div class="strong">10</div>
        </li>
        <li
          style="font-size: 17px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 22px;
color: #5583FF;cursor:pointer"
          @click="moreClick"
          v-show="!moreclick"
        >
          点击查看更多
        </li>
        <li v-show="moreclick">
          <div>燃料费信息:</div>
          <ul class="detail_info detail_info2"><li>
              1
          </li>
          <li>1</li>
          <li>1</li>
          <li>1</li></ul>
          <ul class="detail_info2"><li>
              2
          </li>
          <li>2</li>
          <li>2</li>
          <li>2</li></ul>
        </li>
        <li v-show="moreclick">
          <div>区块奖励信息:</div>
          <ul class="detail_info detail_info2"><li>
              1
          </li>
          <li>1</li>
          <li>1</li>
          <li>1</li></ul>
          <ul
          class="detail_info2"><li>
              2
          </li>
          <li>2</li>
          <li>2</li>
          <li>2</li></ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "block",
  data() {
    return {
      nowLang: "",
      blockmedianum: 1,
      moreclick: false,
    };
  },
  components: {},
  created() {
    console.log(this.$route.query.block);

    this.blocklist();
  },

  // 页码设置
  watch: {},
  methods: {
    moreClick() {
      this.moreclick = true;
    },
    //获取MEDIA
    async blocklist() {
      let that = this;
      var blockData = [];
      // var data = Qs.stringify({ pageNum: this.blockmedianum, pageSize: 20 });
      await that.$http
        .get("/get_block_list_for_all", {
          params: {
            pageNum: this.blockmedianum,
            pageSize: 20,
          },
        })
        .then((res) => {
          console.log(res);
          this.totalNum = res.data[0].total_page[0].totalPageNum;
          //console.log(this.totalNum);
          if (this.nowLang == "cn") {
            for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
              var obj = {};
              let times = [];
              obj.block_height = res.data[0].block_list[i].block_height;
              let blocktime = res.data[0].block_list[i].block_time;
              // .substring(0, 13)
              // .valueOf();
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res.data[0].timeStamp;
              // console.log(timestamp);
              // console.log(timestamp + "xianzai");
              let s = timestamp - blocktime; //9.20
              //  console.log(s+'相差');
              // console.log(s/86400000 + "天数");
              // console.log(parseInt(s/86400000*24*60) + "fenzhong");
              let fenzhong = parseInt((s / 86400) * 24 * 60);
              // console.log(fenzhong);
              if (fenzhong < 60) {
                if (fenzhong == 0) {
                  times.push("刚刚");
                } else {
                  times.push(parseInt(fenzhong) + "分钟前");
                }
                obj.block_time = times;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "小时前");
                obj.block_time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "天前");
                obj.block_time = times;
              }
              // obj.block_time = this.timestampToTime(
              //   Number(
              //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
              //   )
              // );
              obj.transaction_num = res.data[0].block_list[i].transaction_num;
              obj.transaction_amount =
                res.data[0].block_list[i].transaction_amount;
              obj.transaction_award =
                res.data[0].block_list[i].transaction_award;
              //console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.blockData = blockData;
              //console.log(obj);
            }
          } else {
            for (var i = 0; i < res.data[0].block_list.length + 1; i++) {
              var obj = {};
              let times = [];
              obj.block_height = res.data[0].block_list[i].block_height;
              let blocktime = res.data[0].block_list[i].block_time;
              // .substring(0, 13)
              // .valueOf();
              // console.log(blocktime);
              // 当前日期转时间戳
              let timestamp = res.data[0].timeStamp;
              // console.log(timestamp);
              // console.log(timestamp + "xianzai");
              let s = timestamp - blocktime; //9.20
              //  console.log(s+'相差');
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
                obj.block_time = times;
              }
              if (fenzhong >= 60 && fenzhong <= 1440) {
                times.push(parseInt(fenzhong / 60) + "hour ago");
                obj.block_time = times;
              }
              if (fenzhong > 1440) {
                times.push(parseInt(fenzhong / 1440) + "days ago");
                obj.block_time = times;
              }
              // obj.block_time = this.timestampToTime(
              //   Number(
              //     res.data[0].block_list[i].block_time.substring(0, 13).valueOf()
              //   )
              // );
              obj.transaction_num = res.data[0].block_list[i].transaction_num;
              obj.transaction_amount =
                res.data[0].block_list[i].transaction_amount;
              obj.transaction_award =
                res.data[0].block_list[i].transaction_award;
              //console.log(obj);
              blockData[i] = obj;
              //console.log(blockData);
              this.blockData = blockData;
              //console.log(obj);
            }
          }
          console.log(this.blockData);
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
  },
};
</script>
<style lang="less">
.blue{

}
.transactiondetail {
  height: auto;
  .blue{
    font-size: 14px;
font-family: Microsoft YaHei;
font-weight: 400;
line-height: 18px;
color: #5583FF;
}
.strong{
font-size: 17px;
font-family: Microsoft YaHei;
font-weight: bold;
line-height: 22px;
color: #333333;
}
  .top {
    width: 1275px;
    height: 38px;
    font-size: 23px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 38px;
    color: #000000;
    margin: 31px auto 22px;
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
  .detail_content {
    width: 1275px;
    height: auto;
    background: #ffffff;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 1;
    border-radius: 11px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    background: beige;
    padding-bottom: 54px;
    margin-bottom: 407px;
   .all_content {
      font-size: 17px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: #666666;
      margin-left: 53px;
      margin-top: 18px;
      li {
        margin-top: 28px;
        display: flex;
        flex-direction: row;
        div:nth-child(1) {
          width: 243px;
        }
        .detail_info2
        {
li:nth-child(1){
    margin-top: 0px;
}
        }
        .detail_info{
margin-right: 230px;

        }
      }
    }
  }
}
</style>
