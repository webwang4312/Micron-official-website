/*
 * @Author: yaoyuting
 * @Date: 2020-03-19 23:45:12
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-14 07:22:33
 * @Descripttion: 
 */
import { goPAGE } from '@/utils/utils';

let classify = goPAGE()
export const navList = [{
  id: 1,
  text: "首页",
  texten: 'Home',
  menuUrl: "/" + classify + "/Index"
  // submenus: [{
  //   submenuName: "项目团队",
  //   submenuNameen: "Project Team",
  //   submenuUrl: "/" + classify + "/Team",
  //   // component: r => require.ensure([], () => r(require('@/views/Team')), 'Team'),
  // },
    // {
    //   submenuNameen: "buy Token",
    //   submenuName: "购买Token",
    //   submenuUrl: "/"+classify+"/About",
    //   // component: r => require.ensure([], () => r(require('@/views/About')), 'About'),
    // }
  // ]
}, {
  id:2,
  text: "技术",
  texten: 'Tech',
  menuUrl: "/" + classify + "/Technology",
  // submenus: [
  //   // {
  //   //   submenuName: "区块浏览器",
  //   //   submenuNameen: "Blockchain browser",
  //   //   submenuUrl: "/" + classify + "/About",
  //   //   // component: r => require.ensure([], () => r(require('@/views/About')), 'About'),
  //   // },
  //   {
  //     submenuNameen: "roadmap",
  //     submenuName: "路线图",
  //     submenuUrl: "/" + classify + "/roadmap",
  //     // component: r => require.ensure([], () => r(require('@/views/roadmap')), 'roadmap'),
  //   }],
}, {
  id:3,
  text: "开发者",
  texten: 'Developer',
  menuUrl: "/" + classify + "/Developers",
  // submenus: [{
  //   submenuNameen: "whitepaper",
  //   submenuName: "白皮书",
  //   submenuUrl: "/" + classify + "/whitePaper",
  //   // component: r => require.ensure([], () => r(require('@/views/whitePaper')), 'whitePaper'),
  // }],
}, 
{
  id:4,
  text: "钱包",
  texten: 'Wallet',
  submenus: [
  //   {
  //   submenuNameen: "Access Wallet",
  //   submenuName: "访问钱包",
  //   submenuUrl: "/",
  // },
  {
    submenuNameen: "Fastoken Download",
    submenuName: "Fastoken下载",
    submenuUrl: "/" + classify + "/Fastoken",
  },{
    submenuNameen: "Blockchain Browser",
    submenuName: "区块链浏览器",
    submenuUrl: "/",
  }],
},
 {
  id:5,
  text: "博客",
  texten: 'Blog',
  menuUrl: "/" + classify + "/Blog",
  // submenus: [{
  //   submenuNameen: "whitepaper",
  //   submenuName: "白皮书",
  //   submenuUrl: "/" + classify + "/whitePaper",
  //   // component: r => require.ensure([], () => r(require('@/views/whitePaper')), 'whitePaper'),
  // }],
},
//  {
//   id:6,
//   text: "社区",
//   texten: 'Community',
//   submenus: [{
//     submenuNameen: "Github",
//     submenuName: "Github",
//     submenuUrl: "https://github.com/uenctech",
//     href:true
//   },{
//     submenuNameen: "Telegram",
//     submenuName: "Telegram",
//     submenuUrl: "/",
//   },{
//     submenuNameen: "Twitter",
//     submenuName: "Twitter",
//     submenuUrl: "/",
//   },{
//     submenuNameen: "Weibo",
//     submenuName: "Weibo",
//     submenuUrl: "/",
//   },{
//     submenuNameen: "Facebook",
//     submenuName: "Facebook",
//     submenuUrl: "/",
//   },{
//     submenuNameen: "Reddit",
//     submenuName: "Reddit",
//     submenuUrl: "/",
//   },{
//     submenuNameen: "Medium",
//     submenuName: "Medium",
//     submenuUrl: "/",
//   },{
//     submenuNameen: "Proposal",
//     submenuName: "提案",
//     submenuUrl: "/" + classify + "/community/Proposal",
//   },{
//     submenuNameen: "Vote",
//     submenuName: "投票",
//     submenuUrl: "/" + classify + "/community/Vote",
//   }],
// },
//  {
//   id: 5,
//   text: "语言",
//   texten: 'language',
//   menuUrl: "1",
//   submenus: [{
//     submenuName: "English"
//   }, {
//     submenuName: "中文"
//   }],
// }
]
