<template>
  <div class="notfound">
    <div class="ttitle">
      <div>{{ $t("notfound")[0] }}{{ content }}</div>
      <div>{{ $t("notfound")[1] }}{{ content }} {{ $t("notfound")[2] }}</div>
      <!-- <div>
        <button @click="goBack">{{ $t("notfound")[3] }}</button>
      </div> -->
    </div>
    <!-- <div class="image">
      <img src="@assets/images/second/插画@2x.png" alt="" />
    </div> -->
  </div>
</template>
<script>
export default {
  name: "notfound",
  data() {
    return {
      nowLang: "",

      address: "",
      content: "",
    };
  },
  components: {},
  created() {
    this.nowLang = this.$i18n.locale;
    this.address = this.$route.query.address;
    //console.log(this.address);
    //console.log(this.nowLang);
    if (this.nowLang == "cn") {
      switch (this.address) {
        case "address":
          this.content = "地址";
          break;
        case "transaction":
          this.content = "交易哈希";
          break;
        case "height":
          this.content = "区块高度";
          break;
        default:
      }
    } else {
      switch (this.address) {
        case "address":
          this.content = "address";
          break;
        case "transaction":
          this.content = "transaction";
          break;
        case "height":
          this.content = "block height";
          break;
        default:
      }
    }
  },

  // 页码设置
  watch: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less">
.notfound {
  background: #f9fafd;
  height: 915px;
  display: flex;
  flex-direction:column;
  margin: 0 auto;
//   padding: 173px 233px 0 293px;
  justify-content: space-between;
  .ttitle {
    margin-top: 141px;
    text-align: center;
    div:nth-child(1) {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 59px;
      color: #965ee5;
    }
    div:nth-child(2) {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 25px;
      color: #666666;
      margin-top: 20px;
    }
    div:nth-child(3) {
      margin-top: 100px;
      cursor: pointer;
      button {
        cursor: pointer;
        width: 100px;
        height: 53px;
        background: #965ee5;
        opacity: 1;
        border-radius: 8px;
        border: none;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 25px;
        color: #ffffff;
      }
    }
  }
  .image {
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
