<!--
 * @Author: yaoyuting
 * @Date: 2019-08-28 19:41:18
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-01 22:51:18
 * @Descripttion:  
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import { goPAGE } from "./utils/util.js";
export default {
  methods: {
    bodyScroll(){
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      document.cookie =  "scroll=" +scrollTop;
    },
    scrollback(){
      const scroll = this.GetCookie('scroll')
      if(scroll!=null){document.body.scrollTop=scroll}
    },
    GetCookie(sName){
      const aCookie = document.cookie.split(";");
      //console.log(aCookie);
      for(let　i=0;　i　< aCookie.length;　i++){
         var aCrumb = aCookie[i].split("=");
         if(sName　== aCrumb[0]){
            return aCrumb[1];
         }
      }
      return null;
   }
  },
  mounted() {
    // this.$i18n.locale='en'
    this.$nextTick(()=>{
      window.addEventListener("scroll", this.bodyScroll, true);
      window.addEventListener("load", this.scrollback, true);
    })
  },
}
</script>
<style lang="less">

html,body {
  /* background-color: #00101F; */
  color: #fff;
}
</style>
