<!--
 * @Author: yaoyuting
 * @Date: 2021-04-16 08:54:18
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 21:13:05
 * @Descripttion: 
-->
<template>
  <div class="Check-m">
    <div class="title">{{$t('dialog.Binding')}}</div>
    <el-form :model="checkForm" class="demo-form-inline">
      <el-form-item :label="$t('dialog.Transfer')">
        <el-input v-model="path" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('dialog.transferred')">
        <el-input v-model="checkForm.balance" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('dialog.Personal')">
        <el-input v-model="checkForm.address" :placeholder="address"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dialog.hash')">
        <el-input v-model="checkForm.hash" :placeholder="hash"></el-input>
      </el-form-item>
      <div class="bind">{{$t('dialog.Note')}}</div>
      <div class="btns">
        <div class="submit close" @click="close()" >{{$t('dialog.cancel')}}</div>
        <div class="submit" @click="checkSubmit" v-loading="loading">{{$t('dialog.confirm')}}</div>

      </div>
    </el-form>
  </div>
</template>

<script>
class CheckForm {
  constructor() {
    this.balance = Math.random().toFixed(3);
    this.address = "";
    this.hash = "";
  }
}
import { BindWallet,GetWalletAddress } from "@/assets/server/api.js";
export default {
  data() {
    return {
      checkForm: new CheckForm(),
      path: '1GzfAaZc9MDRzYV1ZERxRMHZtHaXy2hqGH',
      loading: false,
      address:'',
      hash:''
    };
  },
  mounted () {
    // console.log(this.$i18n.locale);
    if(this.$i18n.locale=='zh'){
 this.address='请输入您的钱包地址'
    this.hash='请输入交易哈希'
    }
    else{
       this.address='Please enter your wallet address'
    this.hash='Please enter transaction hash'
    }
   
    this.GetWalletAddress();
  },
  methods: {
    async GetWalletAddress(){
      const userName = localStorage.getItem("username");
     
        let datas = new FormData();
          datas.append("loginName", userName);
      const {data} = await GetWalletAddress(datas)
      this.path = data.address
      this.checkForm.balance = data.number
    },
    close() {
      this.$emit("close");
    },
    async checkSubmit() {
      
      let loginName = localStorage.getItem("username");
      for (const key in this.checkForm) {
        const element = this.checkForm[key];
        if (element === "" || !element) {
          return this.$notify({ type: 'danger', message: this.$t("index.switch") === "cn" ?"不能为空":'Can it be empty'}) 
        }
      }
      this.loading = true
      this.checkForm.loginName = loginName;
      const data = await BindWallet({ ...this.checkForm });
      if (data.code === 0) {
        this.$notify({ type: 'success', message: this.$t("index.switch") === "cn" ?"钱包绑定成功！":'success'}) 
        this.$emit("close");
        this.checkForm = new CheckForm();
        this.loading = false;
        //  location.reload();
         window.location.reload();
        
      } else {
        this.$notify({ type: 'danger', message: data.msg })
        this.loading = false
      }
    }
  }
};
</script>

<style lang="less" scoped>
.Check-m{
  .title{
    font-size: 40px;
    margin-bottom: 20px;
    text-align: center;
  }
  .el-form-item {
      margin-bottom: 0;
  }
  .bind{
    font-size: 20px;
    color: #B33939;
    margin-top: 18px;
  }
  .btns{
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
  }
  .submit {
    width: 164px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    background: #4B3EFF;
    border-radius: 8px;
    font-size: 28px;
    color: #fff;
  }
  .close{
    background: #ECECEC;
    color: #9F9F9F;
  }
    .between{
      .el-checkbox__label{
        font-size: 20px;
        margin-left: -12px;
      }
      
    }
  }
</style>
