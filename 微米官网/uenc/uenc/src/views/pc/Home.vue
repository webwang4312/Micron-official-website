<!--
 * @Author: yaoyuting
 * @Date: 2019-08-28 21:44:30
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 18:34:19
 * @Descripttion: 
-->
<template>
  <div class="home">
    <div class="Header">
      <Header></Header>
    </div>
    <div class="Main">
      <Main></Main>
    </div>
    <div class="Footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/pc/Header'
import Main from '@/components/pc/Main'
import Footer from '@/components/pc/Footer'
export default {
  components: {
    'Header': Header,
    'Main': Main,
    'Footer': Footer,
  },
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="less">
.el-menu--horizontal .el-menu{
  background-color: #fff!important;
}
.home {
  /* width: 1920px; */
  background-color: rgba(0, 0, 0, 0);
}
.Header {
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  // height: 100px;
}
.Main {
  width: 100%;
  // margin-top: 96px;
  background-color: rgba(0, 0, 0, 0);
}
.Footer {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #F5EEFD;
}
</style>
