(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15ad1a7a","chunk-11fadca4"],{2280:function(t,e,o){"use strict";var a=o("4ad8"),i=o.n(a);i.a},"3ab3":function(t,e,o){t.exports=o.p+"static/img/logo.80bf7697.png"},"4ad8":function(t,e,o){},5178:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"chart"},[o("headertop"),o("div",{staticClass:"chartzong"},[o("search"),o("div",[o("p",{staticClass:"charttitle",staticStyle:{top:"58px",left:"78px"}},[t._v(" "+t._s(t.$t("chart[0]"))+" ")]),o("div",{staticClass:"chart1",attrs:{id:"chart1"}})]),o("div",{staticClass:"row1"},[o("div",[o("p",{staticClass:"charttitle",staticStyle:{top:"58px",left:"40px"}},[t._v(" "+t._s(t.$t("chart[1]"))+" ")]),o("div",{staticClass:"chart2",attrs:{id:"chart2"}})]),o("div",[o("p",{staticClass:"charttitle",staticStyle:{top:"58px",left:"40px"}},[t._v(" "+t._s(t.$t("chart[2]"))+" ")]),o("div",{staticClass:"chart3",attrs:{id:"chart3"}})])]),o("div",{staticClass:"row2"},[o("div",[o("p",{staticClass:"charttitle",staticStyle:{top:"58px",left:"40px"}},[t._v(" "+t._s(t.$t("chart[3]"))+" ")]),o("div",{staticClass:"chart4",attrs:{id:"chart4"}})]),o("div",[o("p",{staticClass:"charttitle",staticStyle:{top:"58px",left:"40px"}},[t._v(" "+t._s(t.$t("chart[4]"))+" ")]),o("div",{staticClass:"chart5",attrs:{id:"chart5"}})])]),o("v-footer")],1)],1)},i=[],n=o("cdaa"),r=o("9b18"),s=o("b207");function l(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c={name:"chart",data:function(){return{fullscreenLoading:!1,language:""}},components:{VFooter:n["a"],Search:r["default"],headertop:s["default"]},beforeDestory:function(){},created:function(){this.nowLang=this.$i18n.locale},mounted:function(){this.drawLine()},methods:{drawLine:function(){var t,e,o,a,i,n=this,r=echarts.init(document.getElementById("chart1")),s=echarts.init(document.getElementById("chart2")),c=echarts.init(document.getElementById("chart3")),f=echarts.init(document.getElementById("chart4")),h=echarts.init(document.getElementById("chart5"));r.setOption({title:{x:"left",y:"top",padding:30,itemGap:30},tooltip:{trigger:"axis",axisPointer:{type:"line"}},xAxis:{type:"category",splitLine:{show:!1},boundaryGap:!1,data:[],axisLabel:{interval:36,formatter:function(t){var e=t.split(" ");return e.join("\n")}},axisLine:{show:!1},axisTick:{show:!1}},yAxis:{type:"value",splitLine:{show:!1},position:"left",axisLine:{show:!1},axisTick:{show:!1}},series:[(t={data:[],type:"line",areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"fff",borderColor:"blue",borderWidth:5,label:{show:!0,position:"left",textStyle:{fontSize:10,color:"#fff",width:30,height:27,backgroundColor:"blue"}}},lineStyle:{width:3,type:"solid",color:"#8FD826"}}},l(t,"areaStyle",{normal:{color:" #FFE0BE"}}),l(t,"lineStyle",{color:"#FE9D67"}),t)]}),s.setOption({title:{x:"left",y:"top",padding:30,itemGap:30},tooltip:{trigger:"axis",axisPointer:{type:"line"}},xAxis:{type:"category",splitLine:{show:!1},boundaryGap:!1,data:[],axisLine:{show:!1},axisTick:{show:!1}},yAxis:{type:"value",splitLine:{show:!1},position:"left",axisLine:{show:!1},axisTick:{show:!1}},series:[(e={data:[],type:"line",areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"fff",borderColor:"blue",borderWidth:5,label:{show:!0,position:"left",textStyle:{fontSize:10,color:"#fff",width:30,height:27,backgroundColor:"blue"}}},lineStyle:{width:3,type:"solid",color:"#8FD826"}}},l(e,"areaStyle",{normal:{color:" #FFE0BE"}}),l(e,"lineStyle",{color:"#FE9D67"}),e)]}),c.setOption({title:{x:"left",y:"top",padding:30,itemGap:30},tooltip:{trigger:"axis",axisPointer:{type:"line"}},xAxis:{type:"category",splitLine:{show:!1},boundaryGap:!1,data:[],axisLine:{show:!1},axisTick:{show:!1}},yAxis:{grid:{x:70,y:100},scale:!0,type:"value",splitLine:{show:!1},axisLine:{show:!1},axisTick:{show:!1}},series:[(o={data:[],type:"line",areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"fff",borderColor:"blue",borderWidth:5,label:{show:!0,position:"left",textStyle:{fontSize:10,color:"#fff",width:30,height:27,backgroundColor:"blue"}}},lineStyle:{width:3,type:"solid",color:"#8FD826"}}},l(o,"areaStyle",{normal:{color:" #FFE0BE"}}),l(o,"lineStyle",{color:"#FE9D67"}),o)]}),f.setOption({title:{x:"left",y:"top",padding:30,itemGap:30},tooltip:{trigger:"axis",axisPointer:{type:"line"}},xAxis:{type:"category",splitLine:{show:!1},boundaryGap:!1,data:[],axisLine:{show:!1},axisTick:{show:!1}},yAxis:{type:"value",splitLine:{show:!1},position:"left",axisLine:{show:!1},axisTick:{show:!1}},series:[(a={data:[],type:"line",areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"fff",borderColor:"blue",borderWidth:5,label:{show:!0,position:"left",textStyle:{fontSize:10,color:"#fff",width:30,height:27,backgroundColor:"blue"}}},lineStyle:{width:3,type:"solid",color:"#8FD826"}}},l(a,"areaStyle",{normal:{color:" #FFE0BE"}}),l(a,"lineStyle",{color:"#FE9D67"}),a)]}),h.setOption({title:{x:"left",y:"top",padding:30,itemGap:30},tooltip:{trigger:"axis",axisPointer:{type:"line"}},xAxis:{type:"category",splitLine:{show:!1},boundaryGap:!1,data:[],axisLabel:{interval:36,formatter:function(t){var e=t.split(" ");return e.join("\n")}},axisLine:{show:!1},axisTick:{show:!1}},yAxis:{type:"value",splitLine:{show:!1},position:"left",axisLine:{show:!1},axisTick:{show:!1}},series:[(i={data:[],type:"line",areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"fff",borderColor:"blue",borderWidth:5,label:{show:!0,position:"left",textStyle:{fontSize:10,color:"#fff",width:30,height:27,backgroundColor:"blue"}}},lineStyle:{width:3,type:"solid",color:"#8FD826"}}},l(i,"areaStyle",{normal:{color:" #FFE0BE"}}),l(i,"lineStyle",{color:"#FE9D67"}),i)]});var d=this,u=[],g=[],p=[],m=[],y=[],b=[],v=[],w=[],x=[],S=[];d.$http.get("/show_graph_data").then((function(t){for(var e=0;e<t.data[0].usdt.length+1;e++){var o;u.unshift(t.data[0].usdt[e].usdt),g.unshift(n.timestampToTime2(t.data[0].usdt[e].time).substring(5)),r.setOption({xAxis:{data:g},series:[(o={data:u,type:"line",symbolSize:.001,areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"#fff",borderColor:"blue",borderWidth:3,label:{show:!0,position:"left",textStyle:{fontSize:16,color:"#fff",backgroundColor:"rgb(40,96,194)"},formatter:function(t){return g.length-1==t.dataIndex?t.value:""}}}}},l(o,"areaStyle",{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#BEE881"},{offset:.8,color:"#C7EC93"},{offset:1,color:"#fff"}])}}),l(o,"lineStyle",{color:"#8FD826"}),o)]})}})).catch((function(t){})),d.$http.get("/show_graph_data").then((function(t){for(var e=0;e<t.data[0].transaction_num_for_7.length+1;e++){var o;p.unshift(t.data[0].transaction_num_for_7[e].transaction_num_for_7),m.unshift(n.timestampToTime2(t.data[0].transaction_num_for_7[e].date).substring(5,10)),s.setOption({xAxis:{data:m},series:[(o={data:p,type:"line",symbolSize:.001,areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"#fff",borderColor:"blue",borderWidth:3,label:{show:!0,position:"left",textStyle:{fontSize:16,color:"#fff",backgroundColor:"rgb(40,96,194)"},formatter:function(t){return m.length-1==t.dataIndex?t.value:""}}}}},l(o,"areaStyle",{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#BEE881"},{offset:.8,color:"#C7EC93"},{offset:1,color:"#fff"}])}}),l(o,"lineStyle",{color:"#8FD826"}),o)]})}})).catch((function(t){})),d.$http.get("/show_graph_data").then((function(t){for(var e=0;e<t.data[0].transaction_amount_for_7.length+1;e++){var o;y.unshift(t.data[0].transaction_amount_for_7[e].transaction_amount_for_24H),b.unshift(n.timestampToTime2(t.data[0].transaction_amount_for_7[e].date).substring(5,10)),c.setOption({xAxis:{data:b},yAxis:{type:"value",splitLine:{show:!1},axisLine:{show:!1},axisTick:{show:!1}},grid:{left:100},series:[(o={data:y,type:"line",symbolSize:.001,areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"#fff",borderColor:"blue",borderWidth:3,label:{show:!0,position:"left",textStyle:{fontSize:16,color:"#fff",backgroundColor:"rgb(40,96,194)"},formatter:function(t){return b.length-1==t.dataIndex?t.value:""}}}}},l(o,"areaStyle",{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#BEE881"},{offset:.8,color:"#C7EC93"},{offset:1,color:"#fff"}])}}),l(o,"lineStyle",{color:"#8FD826"}),o)]})}})).catch((function(t){})),d.$http.get("/show_graph_data").then((function(t){for(var e=0;e<t.data[0].block_num_for_7.length+1;e++){var o;v.unshift(t.data[0].block_num_for_7[e].block_num_for_7),w.unshift(n.timestampToTime2(t.data[0].block_num_for_7[e].date).substring(5,10)),f.setOption({xAxis:{data:w},series:[(o={data:v,type:"line",symbolSize:.001,areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"#fff",borderColor:"blue",borderWidth:3,label:{show:!0,position:"left",textStyle:{fontSize:16,color:"#fff",backgroundColor:"rgb(40,96,194)"},formatter:function(t){return w.length-1==t.dataIndex?t.value:""}}}}},l(o,"areaStyle",{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#BEE881"},{offset:.8,color:"#C7EC93"},{offset:1,color:"#fff"}])}}),l(o,"lineStyle",{color:"#8FD826"}),o)]})}})).catch((function(t){})),d.$http.get("/show_graph_data").then((function(t){for(var e=0;e<t.data[0].avg_gas_for_7.length+1;e++){var o;x.unshift(t.data[0].avg_gas_for_7[e].block_height_for_100),S.unshift(n.timestampToTime2(t.data[0].avg_gas_for_7[e].date).substring(5)),h.setOption({xAxis:{data:S},series:[(o={data:x,type:"line",symbolSize:.001,areaStyle:{},symbol:"circle",smooth:!0,itemStyle:{normal:{color:"#fff",borderColor:"blue",borderWidth:3,label:{show:!0,position:"left",textStyle:{fontSize:16,color:"#fff",backgroundColor:"rgb(40,96,194)"},formatter:function(t){return S.length-1==t.dataIndex?t.value:""}}}}},l(o,"areaStyle",{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#BEE881"},{offset:.8,color:"#C7EC93"},{offset:1,color:"#fff"}])}}),l(o,"lineStyle",{color:"#8FD826"}),o)]})}})).catch((function(t){}))},timestampToTime2:function(t){var e=new Date(1e3*t),o=e.getFullYear()+"-",a=(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-",i=e.getDate();i<10?i="0"+i+"  ":i+="  ";var n=e.getHours();n<10?n="0"+n+":":n+=":";var r=e.getMinutes();r<10?r="0"+r+":":r+=":";var s=e.getSeconds();return s=s<10?"0"+s:s,o+a+i+n+r+s}}},f=c,h=(o("bb61"),o("2877")),d=Object(h["a"])(f,a,i,!1,null,null,null);e["default"]=d.exports},7554:function(t,e,o){"use strict";var a=o("d77f7"),i=o.n(a);i.a},"7e21":function(t,e,o){t.exports=o.p+"static/img/中英文.4f8c879b.png"},aaeb:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAA8CAYAAABCbxWWAAAEnUlEQVR4Xu2dPW8zRRDHZ87nO/vsO5/jWFZiiYDoXDwKLQ00FIGGJl8hXykfIRUFTURBgYREi0QKWkIRiQgI7xCS3KL/Pl7ruMfBlpyxJmJGWt1L1rPj/y8zu3eS75jWNyai9rzFRISGc2bbUcAR0f283RERGs6ttHUgRUSUEVEyh7qW45UjW4dNFQCHv4noTyKq/svZKsiAm24ajX1eXIG/5rCXDvQYZGRvn4iwhVn2inPaeABk8+/LsnoZZIDNa0MGwAZ6Yw7iDsDojyboJuSQwTiPD4QWojPg4pw2HgCMUL4XSdmEHEp0HXA9gw3yxgy24gClG4syb3XInfkiCx2akA3uVtg86SC43HqoQw7zMGAGyHXY9cWXzc1PykLUGa6lF5ncnd/kCJCXZXNzXhaNzpw/iQLgWIVyPZiXaH+ytv/Y3PwkEZgTcQV80oZblbjp0QRs5VqcwVYG8JBRqnHLMkBels02J2+Fh8ggDpDrl0110PVFmEEW0X8rTj3k5nxcz+QA2iBvhYfMIKsgh3nZIMvovxWvgFwumY+bK2yDvBUcMoMYZBldVXk1yKpwyARjkGV0VeXVIKvCIROMQZbRVZVXg6wKh0wwBllGV1VeDbIqHDLBGGQZXVV5NciqcMgEY5BldFXl1SCrwiETjEGW0VWVV4OsCodMMAZZRldVXg2yKhwywRhkGV1VeTXIqnDIBGOQZXRV5dUgq8IhE4xBltFVlVeDrAqHTDAGWUZXVV4NsiocMsEYZBldVXk1yKpwyARjkGV0VeW1Drn+KInmLxsXj3pyzh4ZoorgGsFwWZb4wRvt7u5WaZpWnU6nSpLElWVZ9ft9NxwO3f7+vpvNZp7u8fHxGm6tiyYF+PDwsByNRi3AzbKsyvO82tnZ8YCLovCQJ5OJOzg48JBns5mm+C2W1Qo4Pjo6KqbTaTeOY9fr9arpdFoNh8Oq1+shg/3TVwF6NBp5yJPJZLVb66FJgTs+OTnJxuPxCFmLko1Svbe3V3W7XX8M2Ig4z3O/LYpC0xewWFYr8Cs75/j09PSNLMsYZTpNUxqPx9i6wWCAOdrDBXRsswwPCjJ7JgqgEn+H1TWdnZ3t53m+UxSFz9x2u+0wJyOr0QAcDX3xT2D2bBT4mZm/95DPz8/TwWDwIkkSRsaGBtiYq7EFbPRtt/GGArNnoAB4fc3Mdx4y7OLi4s0oil5HJiNrATeOYwrlGsfoh3Nmz0KBb5n5G0S6gOyciy4vL99JkmSQJAm1Wi00F7YBMo7N1CvwCxF9zsz+6mgBGQfX19f9qqo+SNO0A5go0ziP/SiKFvvqv+L/O0C8eOQTZv4tyPAvyDh5dXW1m2XZh61WKwvzbxRFPqvxd+ybqVUA76D4mJl/qEf4CmT88ebmpkyS5DiKor1QpgNcg6wW8BURfcTMPzUjXAoZnZxz8e3t7XvM/G700vxnDbI6yHg6/WdE9Ckz42n1r9ijkENP59zo4eHhfWZ++yVjK9dKMGNR9QWugJvlee1MbnZ0zmX39/dvxXH8goheI6IREeG9FbbclqeObMUbYn4koksi+oqIvmRmvB5opf0DKVVNXqTbuZAAAAAASUVORK5CYII="},b112:function(t,e,o){},b207:function(t,e,o){"use strict";o.r(e);var a,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"headertop",class:{sticky:t.sticky}},[a("div",{staticClass:"headerzong"},[t._m(0),a("ul",{staticClass:"header-right"},t._l(t.nav,(function(e,i){return a("li",{key:i,staticClass:"lifirst",class:{nav_li:t.active===i},on:{click:function(o){return t.gorouter(e.path)}}},[a("ul",{staticClass:"lili"},[t.active==i?a("img",{staticClass:"anxia",attrs:{src:o("aaeb")}}):a("div",{staticClass:"tuqi"}),a("li",[a("img",{attrs:{src:e.src}}),a("span",{staticClass:"title"},[t._v(t._s(e.title))])])])])})),0),a("div",{staticClass:"searchlanguage",on:{mouseenter:function(e){return t.switchLan()},mouseleave:function(e){return t.switchLan2()}}},[t.show?a("img",{staticClass:"qiehuan",attrs:{src:o("7e21")}}):a("img",{staticClass:"qiehuan2",attrs:{src:o("e898")}}),t.show?a("img",{staticClass:"righticon",attrs:{src:o("e512")}}):t._e(),a("span",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"headerselect"},[t._v(t._s(t.chose))]),t.show?t._e():a("img",{staticClass:"righticon2",attrs:{src:o("e512")}}),t.show?t._e():a("ul",{staticClass:"language"},[a("li",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],on:{click:t.chinese}},[t._v(" 中文 ")]),a("li",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],on:{click:t.english}},[t._v(" EN ")])])])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header-left"},[a("img",{attrs:{src:o("3ab3")}})])}],r=o("c8fa"),s=o("b7d1");function l(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c=(a={name:"headertop",data:function(){return{active:"",fullscreenLoading:!1,nav:[],sticky:!1,show:!0,nowLang:"",chose:""}},created:function(){var t=this;this.nowLang=this.$i18n.locale,"cn"===this.nowLang&&(this.nav=r["a"].nav,this.chose="语言"),"en"===this.nowLang&&(this.nav=s["a"].nav,this.chose="lan"),this.nav.forEach((function(e,o){"/transactiondetail"==t.$route.path&&(t.active=2),"/transactiondetails"==t.$route.path&&(t.active=2),"/blockdetail"==t.$route.path&&(t.active=1),"/blockdetails"==t.$route.path&&(t.active=1),"/notfound"==t.$route.path&&(t.active=10),e.path===t.$route.path&&(t.active=o)}))},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;t>0&&(this.sticky=!0),t<10&&(this.sticky=!1)},gorouter:function(t){this.$router.push({path:t})},switchLan2:function(){this.show=!0},switchLan:function(){this.show=!this.show},chinese:function(){var t=this;this.fullscreenLoading=!0,this.$i18n.locale="cn",localStorage.setItem("lang","cn"),setTimeout((function(){t.$router.go(0)}),1500)},english:function(){var t=this;this.fullscreenLoading=!0,this.$i18n.locale="en",localStorage.setItem("lang","en"),setTimeout((function(){t.$router.go(0)}),1500)}}},l(a,"mounted",(function(){window.addEventListener("scroll",this.handleScroll)})),l(a,"destroyed",(function(){window.removeEventListener("scroll",this.handleScroll)})),a),f=c,h=(o("2280"),o("2877")),d=Object(h["a"])(f,i,n,!1,null,null,null);e["default"]=d.exports},bb61:function(t,e,o){"use strict";var a=o("b112"),i=o.n(a);i.a},cdaa:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"uenc_foot"},[o("div",{staticClass:"footer"},[o("p",[t._v("Copyright©2015-2018 UENC.All Rights Reserved UENC")])])])}],n={name:"foot",data:function(){return{nowLang:"en",show:!1}},created:function(){},mounted:function(){},methods:{}},r=n,s=(o("7554"),o("2877")),l=Object(s["a"])(r,a,i,!1,null,null,null);e["a"]=l.exports},d77f7:function(t,e,o){},e512:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPCAYAAAA2yOUNAAAA6ElEQVQoU2NUjT2oycTMkP7r5+/2+8tdXjJgAYwa8YcmMzAy5Pz/z3D9J+NfpwcLHF+gq2NUjj0qxsr0dx8DI4M2LoWMIF2EFIIVEVIIV4RPIYoiZIX/Gf9rMzAw3fjx578ThiKQQtWYA65MzEw7GRkZGP/9/1+CoUgx7pAeG+P/vYyMjCL//zPs+PDvewiKIogChr2MjAwi/xkYtv19+SXoznavn3BFuBSArAcrwqcArEgl/og2M8O/A+hWIEcNo1rCoUlMDAy5////3/731ddAkBsw4k4m+ZgQ15/fIf9efV2ITQFIAwDmU5VXLZf3jQAAAABJRU5ErkJggg=="},e898:function(t,e,o){t.exports=o.p+"static/img/中英文2.8830eab8.png"}}]);