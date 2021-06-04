<!--
 * @Author: yaoyuting
 * @Date: 2019-08-28 23:45:02
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-12 17:59:19
 * @Descripttion: 
-->
<template>
  <div class="home" >
    <div class="Header" :class="header?'bg':''">
      <Header></Header>
    </div>
    
    <div  class="Main">
      <Main ref="main" ></Main>
    </div>
    <div class="Footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/m/Header'
import Main from '@/components/m/Main'
import Footer from '@/components/m/Footer'

export default {
  
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    // 监听（绑定）滚轮 滚动事件
  },
  
watch: {
  
  },
  data() {
    return {
      header: false,
    
    }
  },
  methods: {
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 30) {
        this.header = true;
      } else {
        this.header = false;
      }
    },
  },
  components: {
    'Header': Header,
    'Main': Main,
    'Footer': Footer,
  },
  name: 'Home',
};
</script>

<style  lang="less">
.fix{
  position: fixed!important;
  top: 0!important;
  
  left: 0!important;
  background: red!important;
}
.home {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.Header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.bg{
  background: #231F38;

}
.Main {
  width: 100%;
}
.Footer {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #01192E;
}
</style>
