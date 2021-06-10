/*
 * @Author: yaoyuting
 * @Date: 2021-04-23 17:17:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-16 15:37:16
 * @Descripttion: 
 */
import {get, gets, post, posts} from './server.js'
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




