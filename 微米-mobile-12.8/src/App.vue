<template>
  <div id="app">
    
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
     
    };
  },

  data() {
    return {  isRouterAlive: true,};
  },
  created() {
    // console.log(this.$store.state.username.length);
    if(this.$store.state.username==null||this.$store.state.username=='false'||this.$store.state.username.length===undefined){
      // console.log('1');
      //   this.$store.commit("loginfalse");
      //   console.log(this.$store.state.login);
    }
       //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
 mounted () {
   
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0)
    })
  },
  components: {},
  updated() {
  //  window.scroll(0, 0);
},
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
  }
};
</script>

<style lang="less">

a {
  text-decoration: none;
}
.vue-particles {
  // z-index: 1;
}
li {
  list-style: none;
}
#app {
  font-size: 16px;
  width: 100%;
}
</style>
