import { get, gets, post, posts } from './server.js'
// http://47.116.69.138:9090
//http://47.98.110.210:9002
export const base='http://47.116.69.138:9090'
// 获取首页数据
export const GETINDEX = p => post(base+'/ethbrowser/home/getHomeData', p);
//  区块列表
export const GETBLOCK = p => get(base+'/get_block_list_for_all', p);
//  交易列表
export const GETTRANSACTION = p => get(base+'/search_transaction_list_all', p);
//  富豪榜
export const GETADDRESS = p => get(base+'/get_address_list_for_all', p);
//  搜索区块详情
export const GETBLOCKDETAIL = p => get(base+'/search_blockHeight_for_height', p);
//  搜索交易详情
export const GetTransactionListDetail = base+'/search_transactionHash_detailInfo';
// 搜索地址详情
export const GETADDRESSDETAIL = p => get(base+'/search_transactionInfo_walletAddress', p);
// 地址详情2
export const GetAddressListDetail2 = p => get(base+'/wallet_address_overview', p);
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



