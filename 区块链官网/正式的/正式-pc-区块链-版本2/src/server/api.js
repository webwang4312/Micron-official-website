/*
 * @Author: yaoyuting
 * @Date: 2021-04-23 17:17:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-16 15:37:16
 * @Descripttion: 
 */
import { get, gets, post, posts } from './server.js'
//  区块列表
export const GetBlockList = p => get('/get_block_list_for_all', p);
//  交易列表
export const GetTransactionList = p => get('/search_transaction_list_all', p);
//  富豪榜
export const GetAddressList = p => get('/get_address_list_for_all', p);
//  区块详情
export const GetBlockListDetail = p => get('/search_blockHeight_for_height', p);
//  交易详情
export const GetTransactionListDetail = p => get('/search_transactionHash_detailInfo', p);
// 地址详情
export const GetAddressListDetail = p => get('/search_transactionInfo_walletAddress', p);
// 地址详情2
export const GetAddressListDetail2 = p => get('/wallet_address_overview', p);
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
// //   去交易列表
// export function goToTransaction() {
//     this.$router.push({
//         path: "/transaction",
//     });
// }
// //   去交易详情页
// export function goToTransactionDetail(item) {
//     this.$router.push({
//         path: "/transactiondetail",

//         query: {
//             transaction_hash: item,
//         },
//     });
// }
// //   去区块列表
// export function goToBlock() {
//     this.$router.push({
//         path: "/block",
//     });
// }
// //   去区块详情页
// export function goToBlockDetail(item) {
//     this.$router.push({
//         path: "/blockdetail",

//         query: {
//             block: item,
//         },
//     });
// }

// //   去地址详情页
// export function goToAddressDetail(item) {
//     this.$router.push({
//         path: "/addressdetail",
//         query: {
//             address: item,
//         },
//     });
// }



