import zhLocale from "element-ui/lib/locale/lang/zh-CN";
const cn = {
    nav: [{
        path: "/index",
        title: "首页",
        img: require('../assets/images/index/首页(1).png'),
        img2: require('../assets/images/index/首页.png')
    },
    {
        path: "/FAQ",
        title: "FAQ",
        img: require('../assets/images/index/faq(1).png'),
        img2: require('../assets/images/index/faq.png')
    },
    {
        path: "/about",
        title: "关于项目",
        img: require('../assets/images/index/关于项目(1).png'),
        img2: require('../assets/images/index/关于项目.png')
    },
    {
        path: "/news",
        title: "媒体公告",
        img: require('../assets/images/index/媒体公告(1).png'),
        img2: require('../assets/images/index/媒体公告.png')
    },
    {
        path: "/partner",
        title: "合作伙伴",
        img: require('../assets/images/index/合作伙伴(1).png'),
        img2: require('../assets/images/index/合作伙伴.png')
    }, {
        path: "/proposal",
        title: "提案",
        img: require("@assets/images/index/提案(1).png"),
        img2: require("@assets/images/index/提案.png"),
    },
    {
        path: "/vote",
        title: "投票",
        img: require("@assets/images/index/投票(1).png"),
        img2: require("@assets/images/index/投票.png"),
    },
    {
        path: "/developer",
        title: "开发者社区",
        img: require("@assets/images/index/投票(1).png"),
        img2: require("@assets/images/index/投票.png"),
    },

    ],
    fastokensecond:['钱包地址','已绑定'],
    slider: ['登录/注册', '退出登录', '绑定钱包', '查看钱包'],
    fastoken: ['绑定钱包', '输入钱包地址', '输入UENC数量', '输入交易哈希', '确认', '绑定了钱包地址后，将无法更改钱包地址，请认真核对', '转入钱包地址'],
    forgetpassword: ['忘记密码', '手机号', '验证码', '输入密码', '再次输入密码', '确认'],
    login: ['登录', '注册', '用户名', '密码', '登录', '记住密码', '忘记密码', '手机号', '发送验证码', '确认密码', '邮箱', '下次自动登录'],
    wallet: ['fastoken 钱包'],
    baipishu: ['下载白皮书>'],
    recommendtitle: ['UENC主网已上线'],
    recommendshorttitle: ['本次公测在主网区块高度达50万时结束'],
    learnmore: ['了解更多'],
    video: ['UENC 视频简介'],
    project: ['UENC 项目成果'],
    videotitle: ['UENC是一条具有跨链技术的可扩展公链，能让用户安全、快捷地使用数字资产。'],
    height: ['区块高度'],
    number: ['全网节点'],
    jiangli: ['发放奖励'],
    sum: ['累计交易笔数'],
    contactus: ['联系我们', '电报', '推特', '微博', '脸书','Github'],
    contactcontent: ['UENC实行无竞争挖矿及去中心化机制，人人都可参与UENC网络基础设施及生态发展建设，共享全球通证经济生态增长红利。', '我们欢迎您与我们联系。 我们需要您的问题详情和有关您的更多信息，以便能够为您提供更好的解决方案。', '请填写右方表格，我们将为您提供有关您的问题的更多信息。'],
    meidaannouncement: ['媒体公告'],
    phone: ['电话'],
    email: ['邮箱'],
    submit: ['提交', '提交成功'],
    Partner: ['合作伙伴'],
    Mediaannouncement: ['媒体公告'],
    shangbiao: ['Copyright©2015-2020 UENC 保留所有权利UENC'],
    // 关于项目
    about: ['关于项目'],
    aboutcontent: ['团队建设', '项目介绍', '技术路线图'],
    aboutdescription: ['UENC技术原理',
        'UENC公链基于DHT网状网络、交叉式并行存储技术（CPS），建立了高效的节点组合结构，通过自主研发DPOW共识算法，实现了高效链上交易。',
        'UENC应用价值',
        'UENC实现了高并发、高速度、低成本的用户链上交易体验，满足了未来通证经济高速发展的底层技术需求。',
        'EnergyClub APP介绍',
        'EnergyClub APP是一款集学习、游戏、赚钱为一体的区块链知识社区工具，零门槛，不花钱，趣味学习、提升认知，为你打开区块链财富之门。',
        'UENC主网钱包介绍',
        'UENC主网钱包是一个基于区块链技术的完全去中心化钱包。',
        'UENC',
        'UENC是一个以跨链为技术方向的可扩展基础公链，基于DHT网状网络、交叉式并行存储技术（CPS）等创新技术，通过自主研发DPOW共识算法，实现了高并发、高速度、低成本的用户链上交易体验，满足了未来通证经济高速发展的底层技术需求。',
        '未来，UENC率先完成与比特币网络的跨链技术开发和应用，解决比特币日益增加的网络拥堵问题，进一步研发可信网络，开发基础跨链接口并构建SDK，最终构建全球可信价值网络。'
    ],
    // 合作伙伴
    partner: ['合作伙伴'],
    index: ['首页'],
    // 媒体公告
    media: ['媒体公告', '最新资讯', '显示更多', '没有更多信息啦'],
    // FAQ
    FAQ: ['常见问题'],
    social: ['社交媒体'],
    back: ['返回'],
    // 路线图
    time: ['2018', '2019', '2020', '2021', '2022'],
    jieduan: ['Q1', 'Q2', 'Q3', 'Q4', '7月', '8月', '9月', '10月', '11月', '12月'],
    jieduancontent: ['公链架构设计', '点对点网络设计研发', '分布式存储查询网络设计研发', '加解密服务组件设计研发', '安全智能合约组件设计研发', '创新型DPOW共识算法设计研发', '应用场景开发及公链迭代研发', '主网第一阶段功能开发', '主网第一阶段公测', '主网第一阶段功能优化', '主网第二阶段公测',
        '主网并发交易开发', '主网正式上线', '优化虚拟机架构； 搭建高效安全的智能合约； DAPP应用SDK开发；比特币跨链研发，共识层融合。', 'UENC2.0开发，解决区块链高度不断延展的并发瓶颈。', '链上与链下数据智能传输；增加链上数据的可信度', '多形态设备承担分类存储；完成一万家企业通证应用落地。'
    ],
    ...zhLocale
};

export default cn;