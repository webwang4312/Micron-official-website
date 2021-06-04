<!--
 * @Author: yaoyuting
 * @Date: 2021-04-16 08:54:18
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 21:17:32
 * @Descripttion: 
-->
<template>
  <div class="Check">
    <div class="title">{{$t("dialog.Binding")}}</div>
    <el-form :model="checkForm" class="demo-form-inline">
      <el-form-item :label="$t('dialog.Transfer')">
        <el-input v-model="path" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('dialog.transferred')">
        <el-input v-model="checkForm.balance" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('dialog.Personal')">
        <el-input v-model="checkForm.address" :placeholder="$t('dialog.addr')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dialog.hash')">
        <el-input v-model="checkForm.hash" :placeholder="$t('dialog.phash')"></el-input>
      </el-form-item>
      <div style="color: red;">{{$t("dialog.Note")}}</div>
      <div class="btns">
        <div @click="checkSubmit" v-loading="loading" id='btnsolve'>{{$t("dialog.confirm")}}</div>
        <div class="r" @click="close()" >{{$t("dialog.cancel")}}</div>

      </div>
    </el-form>
  </div>
</template>

<script>
class CheckForm {
  constructor() {
    this.balance = '';
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
      loading:false
    };
  },
  mounted () {
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
          return this.$message.error( this.$t("index.switch") === "cn" ?"不能为空":'Can it be empty');
        }
      }
      this.loading = true
      this.checkForm.loginName = loginName;
      const data = await BindWallet({ ...this.checkForm });
      if (data.code === 0) {
        this.$message.success( this.$t("index.switch") === "cn" ?"钱包绑定成功！":'success');
        this.$emit("close");
        this.checkForm = new CheckForm();
        this.loading = false
      } else {
        this.$message.error(data.msg);
        this.loading = false
      }
    }
  }
};
</script>

<style lang="less">
.el-loading-spinner{
  width: 150px;
  height: 50px;
top: 0%;
// position: absolute;
//  left:-50px;
}
  .Check{
    text-align: left;
    .title{
      font-size: 28px;
      color: #313131;
      font-weight: 500;
      padding-bottom: 40px;
      text-align: center;
    }
    .el-form-item__label{
      font-size: 18px;
      color: #666;
    }
    .el-input__inner,input{
      height: 40px;
      font-size: 18px;
    }
    input::placeholder{
      font-size:  18px;
    }
    .el-checkbox__inner{
      width: 22px;
      height: 22px;
    }
    .el-checkbox__input{
      vertical-align: sub;
    }
    .el-checkbox__inner::after{
      height: 14px;
      left: 6px;
      width: 6px;
      top: 0px;
    }
    .el-checkbox__label{
      font-size: 24px;
    }
    .btns{
      padding: 36px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
       width: 150px;
height: 50px;
        text-align: center;
        line-height: 50px;
        background: #5432F4;
        border-radius: 4px;
        font-size: 20px;
        color: #fff;
        margin: 0 0px;
        cursor: pointer;
       
      }
      .r{
        background: #afb7e0;
      }
    }
  }
</style>
