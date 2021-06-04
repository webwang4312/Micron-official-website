 // 设置Cookie
 export const setCookie=function(username, password, exdays) {
    // 用户名, 密码, 保存天数
    let exdate = new Date(); // 获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    // 字符串拼接cookie
    window.document.cookie =
      "username=" + username + ";path=/;expires=" + exdate.toGMTString();
    window.document.cookie =
      "password=" + password + ";path=/;expires=" + exdate.toGMTString();
  };

  // 读取Cookie
  export const getCookie=function(){
    // console.log(document.cookie);
    if (document.cookie.length > 0) {
      this.showpassword1 = true;
      this.showusername1 = true;
      let arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split("="); // 再次切割
        // console.log(arr2);
        // 判断查找相对应的值
        if (arr2[0] == "username") {
          this.username1 = arr2[1];
          // 保存到保存数据的地方
        } else if (arr2[0] == "password") {
          this.password1 = arr2[1];
        }
      }
    }
  };

  // 清除Cookie
  export const clearCookie=function() {
    this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
  };