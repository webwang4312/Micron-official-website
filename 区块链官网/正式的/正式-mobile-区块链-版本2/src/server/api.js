/*
 * @Author: yaoyuting
 * @Date: 2021-04-23 17:17:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-16 15:37:16
 * @Descripttion: 
 */
import { get, gets, post, posts } from './server.js'
// 获取首页数据
 export const base='http://47.116.69.138:9090'
// export const base='http://47.98.110.210:9002'
// 获取首页数据
export const GETINDEX = p => post(base+'/ethbrowser/home/getHomeData', p);
//  区块列表
export const GetBlockList =base+'/get_block_list_for_all';
//  交易列表
export const GetTransactionList =base+'/search_transaction_list_all';
//  富豪榜
export const GetAddressList =base+'/get_address_list_for_all';
//  搜索区块详情
export const GetBlockListDetail =base+'/search_blockHeight_for_height';
//  搜索交易详情
export const GetTransactionListDetail =base+'/search_transactionHash_detailInfo';
// 搜索地址详情
export const GetAddressListDetail =base+'/search_transactionInfo_walletAddress';
// 地址详情2
export const GetAddressListDetail2 =base+'/wallet_address_overview';
// 图表页面
export const GetChartAll =base+'/show_graph_data';
// 图表节点
export const GetChart = base+'/search_top_n';
// 地址搜索
export const AddressSearch = base+'/search_transactionInfo_walletAddress';
// 交易哈希搜索
export const TransactionSearch = base+'/search_transactionHash_detailInfo';
// 高度搜索
export const BlockSearch = base+'/search_blockHeight_for_height';

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



