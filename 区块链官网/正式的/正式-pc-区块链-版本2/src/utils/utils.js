/*
 * @Author: yaoyuting
 * @Date: 2019-08-27 11:38:24
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-15 15:00:12
 * @Descripttion: 
 */
export function trimHtml(str) {
    if (!str) return ''
    str = str.replace(/(\n)/g, "");
    str = str.replace(/(\t)/g, "");
    str = str.replace(/(\r)/g, "");
    str = str.replace(/<\/?[^>]*>/g, "");
    str = str.replace(/\s*/g, "");
    str = str.replace(/<[^>]*>/g, "");
    return str;
}
export function goPAGE() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        /*window.location.href="你的手机版地址";*/
        return "m";
    } else {
        /*window.location.href="你的电脑版地址";    */
        return "pc";
    }
}

export function getNavigator() {
    let u = navigator.userAgent;
    // console.log('navigator.userAgent\n\n\n\n', u)
    let obj = {}
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    obj.device = 'h5'
    if (isAndroid) {
        obj.device = "android";
    }
    if (isIOS) {
        obj.device = "ios";
    }
    obj.isApp = u.indexOf('dianjiemian') > -1;
    // if (process.env.NODE_ENV != 'production') {
    // 	obj.isApp = true
    // }
    return obj
}

// export const baseURL = "http://47.98.110.210:8081/"
    //http://47.115.200.174:8080
export function FormatTime(number, format) {
    if (number == "0" || !number) return " ";
    var formateArr = ["Y", "M", "D", "h", "m", "s"];
    var returnArr = [];
    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
}