/*
 * @Author: yaoyuting
 * @Date: 2021-04-23 17:17:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-16 15:37:16
 * @Descripttion: 
 */
import { get, gets, post, posts } from './server.js'
// 获取首页数据
//  export const base='http://47.116.69.138:9090'
export const base = 'http://47.98.110.210:9002/ethbrowser/home/'
// 获取首页数据
export const GETINDEX = p => post(base + 'getHomeData', p);
// 搜索地址详情
export const GETADDRESSDETAIL = p => post(base + 'searchKey', p);
// 搜索地址详情分页
export const GETADDRESSDETAIL2 = p => post(base + 'addrTradeList', p);
//  区块列表
export const GETBLOCK = p => post(base + '/blockList', p);
//  交易列表
export const GETTRANSACTION = p => post(base + 'tradeList', p);
//  富豪榜
export const GETADDRESS = p => post(base + 'richList', p);
// 图表页面
export const GETCHART = p => post(base + 'getCharts', p);

// 时间的处理
export function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    if (Y == "2021-") {
        Y = "";
    } else {
        Y = date.getFullYear() + "-";
    }
    var M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-";

    var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds();
    return Y + M + D + h + m;
}
//   普通时间处理
export function timestampToTime2(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}



