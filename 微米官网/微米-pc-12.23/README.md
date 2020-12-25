# textone

微米官网 PC 端源代码
12.9 修改了首页栏，关于项目页轮播图问题
12.10 页面 2 页面 3 顶部栏 css 修改，提案投票详情页不再重复刷新,详情页底部栏 github 图标，之前告一段落
12.11 开发者社区新功能，新建 developer 图片文件夹,媒体公告详情页 bug 内容区域加了 line-height,打了个包微米-pc-12.11last.rar
修改了 HTML 整体 line-height、登录注册忘记密码，绑定钱包，查看钱包页面修改
12.14 修改议事部人员 3 人变 5 人，监督部 7 人变 3 人，修改了 headerthird.vue 的 header 样式，修改了详情页倒计时
12.15 修改了 headerthird 高度 150px
12.17marquee 标签详解滚动内容标签,整合了 vote，proposal，develop 文件夹
12.18 修改了 header-right 宽度使之自适应 width:auto,footer 高度由 202px 变为 166px
12.21 开发者社区提交测试
12.23if (!sessionStorage.getItem('uenc-whilelogin')) {
window.sessionStorage.clear();
localStorage.clear();
this.\$store.commit("leavelogin");
  
 }判断关闭页面重新登录,pc端上线

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
