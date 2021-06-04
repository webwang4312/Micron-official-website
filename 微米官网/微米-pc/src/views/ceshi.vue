<template>
  <div class="weibo">
    <ul>
  <li>aaaa</li>
  <li>bbbb</li>
  <li>cccc</li>
  <li>dddd</li>
  <li>eeee</li>
</ul>
   <textarea
      class="weibo-text"
      v-model="text"
      @keyup.shift.13="fabu"
      @input="a"
    ></textarea>
    <input class="weibo-btn" value="发布" type="button" @click="fabu" /><span
      class="spans"
      >{{ len }}/100</span
    >
    <ul class="weibo-list">
      <!-- v-for 可以遍历数组 获取值 和索引 -->
      <li v-for="(item, index) in xhs" :key="index">
        <p class="content">{{ item }}</p>
        <span class="time"></span>
        <!-- 点击删除的时候传一个数组的索引 -->
        <span class="del" @click="del(index)">删除</span>
      </li>
    </ul>
    <div class="Date">
      <span class="date">{{ d }}</span>
      <span>:</span>
      <span class="date">{{ h }}</span>
      <span>:</span>
      <span class="date">{{ m }}</span>
      <span>:</span>
      <span class="date">{{ s }}</span>
    </div>
    <!-- 仅展示主要代码-->
    手机号<input type="tel" placeholder="请输入手机号" v-model="username" />
    密码<input type="tel" placeholder="请输入密码" v-model="password" />
    <input type="checkbox" v-model="isChecked" />记住密码
    <a @click="login()">登录</a>
    <button @click="clearCookie">清除缓存cookie</button>
    {{ num }}
    <button @click="numjia">加</button>
    <count-down
         :currentTime="startTime"       
   :startTime="startTime"
   :endTime="endTime"
   :tipText="'距离订单开始还有'"
                :tipTextEnd="'距离订单关闭还剩'"
                :endText="'订单已关闭'"
   :dayTxt="'天'"
   :hourTxt="'小时'"
   :minutesTxt="'分钟'"
   :secondsTxt="'秒'" style="line-height:20px;color:red;font-size:16px">
</count-down>
   
  </div>
</template>

<script>
import CountDown from 'vue2-countdown';
export default {
  data() {
    return {
        // 留言的内容
      xhs: [],
      // 输入的内容
      text: "",
      // 规定输入的长度
      len: "100",
      d: "",
      h: "",
      m: "",
      s: "",
      username: "", // 用户名
      password: "", // 密码
      isChecked: false, // 记住密码
        currentTime:0,
                startTime:1607578279,
                endTime:1607578339,

      // 留言的内容
      xhs: [],
      // 输入的内容
      text: "",
      // 规定输入的长度
      len: "100",
      d: "",
      h: "",
      m: "",
      s: "",
      username: "", // 用户名
      password: "", // 密码
      isChecked: false // 记住密码
    };
  },
  
components: {
    CountDown
},
  computed: {
    num() {
      return this.$store.state.num;
    }
  },
  created() {
    this.countTime();
  },
  // 页面加载调用获取Cookie值
  mounted() {
    this.getCookie();
  },

  methods: {
     countDownS_cb: function (x) {
    console.log(x)
  },
  countDownE_cb: function (x) {
    console.log(x)
  },

    numjia() {
      // this.$store.commit("numjia", 15);
      this.$store.dispatch('aEdit',{age:15})
    },
    // 登录按钮
    login() {
      // 判断复选框是否被勾选; 勾选则调用配置Cookie方法
      if (this.isChecked) {
        // 记住密码
        this.setCookie(this.username, this.password, 30); // 保存期限为30天
      } else {
        this.clearCookie(); // 清空 Cookie
      }
    },

    // 设置Cookie
    setCookie(username, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      window.document.cookie =
        "userName=" + username + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd=" + password + ";path=/;expires=" + exdate.toGMTString();
    },

    // 读取Cookie
    getCookie() {
      console.log(document.cookie);
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割
          console.log(arr2);
          // 判断查找相对应的值
          if (arr2[0] == "userName") {
            this.username = arr2[1];
            // 保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.password = arr2[1];
          }
        }
      }
    },

    // 清除Cookie
    clearCookie() {
      this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    },

    // 点击发布
    fabu() {
      // 因为用了v-model 所以可以获取文本域的值

      this.xhs.push(this.text);
      // 发布完之后回到初始值
      this.text = "";
      this.len = "100";
    },
    // 删除
    del(index) {
      this.xhs.splice(index, 1);
    },
    // 文本域改变事件
    a() {
      this.len = 100 - this.text.length;
      // 给他一个条件是因为 用户在复制进去的时候可输入的字数会变成负数
      if (this.len < 0) {
        this.len = 0;
      }
      // 输入100个字节的时候就不可以输入了
      this.text = this.text.substr(0, 99);
    },
    countTime: function() {
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var endDate = new Date("2020-10-5 00:00:00");
      var end = endDate.getTime();
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      } else {
        //  console.log('时间截止了')
      }

      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    }
  }
};
</script>

<style lang="less">
ul {
  padding:0;
  margin:0;
  font-size:0;
}
li {
  font-size:20px;
  padding:5px 15px 5px 15px;
  display: inline-block;
  position:relative;
  cursor: pointer;
  transition: all 0.5s;
}
li::before {
  content:'';
  display:block;
  position:absolute;
  width:0%;
 top:0;
  left:100%;
  border-top: 2px solid #999;
  transition: all 0.5s;
}
li:hover::before {
  left:0;
  width:100%;
}
li:hover ~ li::before {
  left:0;
}
body,
ul
p {
  margin: 0;
  padding: 0;
  line-height: 15px!important;
}

.weibo {
  width: 600px;
 border: 1px solid #ccc;
  margin: 100px auto;
  padding: 10px;
  height:1200px;
}

.weibo-text {
  width: 590px;
  height: 140px;
  padding: 5px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
}

.weibo-text:focus {
  border-color: #f60;
}

.weibo-btn {
  width: 80px;
  height: 30px;
  background-color: #f90;
  color: #fff;
  border: 0 none;
  margin-top: 5px;
  border-radius: 3px;
  cursor: pointer;
  outline: 0 none;
}

.weibo-list {
  padding-top: 10px;
  list-style: none;
}

.weibo-list li {
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px dotted #ccc;
  overflow: hidden;
}

.weibo-list li p {
  float: left;
}

.weibo-list li span {
  float: right;
  cursor: pointer;
}

.weibo-list li input {
  height: 24px;
  line-height: 24px;
  width: 300px;
  font-size: 14px;
  border: 0 none;
}

.time {
  margin-right: 10px;
  font-style: normal;
  float: right;
}

.spans {
  float: right;
  color: #f40;
}
</style>
