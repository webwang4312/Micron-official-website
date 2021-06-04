<!--
 * @Author: yaoyuting
 * @Date: 2021-04-16 08:54:18
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-12 18:25:14
 * @Descripttion: 
-->
<template>
  <div class="Money">
    <div class="title">{{$t('dialog.See')}}</div>
    <div class="path">{{moneyAddress}}</div>
    <div class="btn" @click="$emit('close')">{{$t('dialog.close')}}</div>
  </div>
</template>

<script>

export default {
  props: {
    moneyAddress: {
      type: String,
      default: ''
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    
  }
};
</script>

<style lang="less" scoped>
.Money{
  text-align: center;
}
    .title{
      text-align: left;
      font-size: 28px;
      color: #313131;
      font-weight: 500;
      padding-bottom: 40px;
    }
      .path{
        height: 70px;
        line-height: 70px;
        background: #f3f4f5;
        border-radius: 2px;
        font-size: 24px;
        color: #666;
        margin: 10px 0 30px;
        overflow: hidden;
text-overflow:ellipsis; white-space: nowrap;
      }
    .btn{
        display: inline-block;
        width: 158px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        background: #5432F4;
        border-radius: 4px;
        font-size: 28px;
        color: #fff;
        cursor: pointer;
    }
</style>
