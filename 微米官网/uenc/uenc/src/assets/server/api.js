/*
 * @Author: yaoyuting
 * @Date: 2021-04-23 17:17:07
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-16 15:37:16
 * @Descripttion: 
 */
import {get, gets, post, posts} from './server.js'
//  注册
export const Registered = p => post('/system/user/registered', p);
// 登录
export const Login = p => post('/system/webLogin', p);
// 忘记密码
export const UpdatePwd = p => post('/system/user/updatePwd', p);
// 退出登录
export const WebLogout = p => get('/system/webLogout', p);
// 是否绑定钱包
export const CheckUsersStatus =p => post(`/system/user/checkUsersStatus`,p);
// 绑定钱包
export const BindWallet = p => post('/system/user/bindWallet', p);
// 获取登录图片
export const GetCaptchaImage = p => gets('/system/captcha/captchaImage?type=char', p);
// 主网数据概览
export const GetProjectOutcome = p => get('/system/getProjectOutcome', p);
// 核心成员
export const GetMsemberList = p => post('/system/member/list1', p);
// 团队成员
export const GetMsemberLists = p => post('/system/member/list', p);
// 核心成员详情
export const GetMsemberDetail = id => get(`/system/member/detail/${id}`);
// 博客列表
export const GetBlogList = p => post('/system/blog/list1', p);
// 博客详情
export const GetBlogDetail = id => get(`/system/blog/detail/${id}`);
// 合作伙伴
export const GetPartnerList = p => post('/system/partner/list', p);
// 悬赏任务列表
export const GetBountyList = p => post('/system/bounty/noseList', p);
// http://192.168.1.79:8080/system/bounty/list
// 任务详情
export const GetBountyDetail = id => get(`/system/bounty/detail/${id}`);
// 任务统计
export const GetBountyStatistics = id => get(`/system/bounty/statistics`);
// 报名任务
export const GetBountyApply = p => post('/system/bounty/apply', p);
// 提案列表
export const GetProposalList = p => post('/system/proposal/list1', p);
// 提案详情
export const GetProposaDetail = id => get(`/system/proposal/detail/${id}`);
// 投票列表
export const GetPollList = p => post('/system/proposal/pollList', p);
// 投票
export const GetPoll = p => post('/system/proposal/poll', p);
// 提案状态
export const GetDictList = p => post('/system/dict/data/list1', p);
// 添加提案
export const AddProposal = p => post('/system/proposal/add1', p);
// 获取账户地址-个人信息展示用
export const GetUsersAddress = p => post(`/system/user/getUsersAddress`,p);
// 获取用户角色
export const GetUserRoleByLoginName = p => post(`/system/role/getUserRoleByLoginName`,p);
// 地址和余额
export const GetWalletAddress =p => post(`/system/user/getWalletAddress`,p);
// 手机验证码
export const GetCode = phone => get(`/system/send/sms/reg/${phone}`);
// 全部完成
export const AddImplPlanOver = p => post('/system/proposal/addImplPlanOver', p);
// 判断是否为执行理事
export const CheckIsExecDirector = p => post('/system/user/checkIsExecDirector', p);
// 添加执行计划
export const AddImplPlan = p => post('/system/proposal/addImplPlan', p);
// 获取账户余额-投票时用
export const GetUsersBalance = loginName => get(`/system/user/getUsersBalance/${loginName}`);
// 提案状态更新
export const DetailInfo = p => post('/system/proposal/detailInfo', p);
// 订阅
export const SubBlog = blogId => get(`/system/blog/subBlog/${blogId}`);
// 取消订阅
export const UnSubBlog = blogId => get(`/system/blog/unSubBlog/${blogId}`);



