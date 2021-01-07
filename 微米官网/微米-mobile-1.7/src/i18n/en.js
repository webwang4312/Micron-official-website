import enLocale from "element-ui/lib/locale/lang/en";
const en = {
    nav: [{
        path: "/index",
        title: "Home",
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
        title: "About",
        img: require('../assets/images/index/关于项目(1).png'),
        img2: require('../assets/images/index/关于项目.png')
    },
    {
        path: "/proposal",
        title: "Proposal",
        img: require("@assets/images/index/提案(1).png"),
        img2: require("@assets/images/index/提案.png"),
    },
    {
        path: "/vote",
        title: "Vote",
        img: require("@assets/images/index/投票(1).png"),
        img2: require("@assets/images/index/投票.png"),
    },
    {
        path: "/developer",
        title: "developer",
        img: require("@assets/images/index/开发者社区(1).png"),
        img2: require("@assets/images/index/开发者社区.png"),
    },
    {
        path: "/news",
        title: "News",
        img: require('../assets/images/index/媒体公告(1).png'),
        img2: require('../assets/images/index/媒体公告.png')
    },
    {
        path: "/partner",
        title: "Partner",
        img: require('../assets/images/index/合作伙伴(1).png'),
        img2: require('../assets/images/index/合作伙伴.png')
    }
   
    ],
    zhanwei: ['No more data'],
    registrationtask: ['Contact information', 'WeChat ID', 'Facebook account', 'Github account (required)'],
    developerdetail: ['Bounty Reward', 'Enrolled Numbers', 'Deadline Time', 'Github Address', 'Sign Up Task', 'Has Signed', 'Task Ended', 'completed the task and obtained', 'Learn More'],
    developer: ['Developer Community', 'attract community members to contribute to the UENC project and ecosystem', 'Developer Statistics', 'Total Tasks', 'Completed Tasks', 'Reward Issuance', 'Bounty Tasks', 'Security Vulnerability Rewards', 'UENC provides a channel for the majority of community security experts, ifYou can send an email to tech@uenc.net if you find any potential security issues or threats about the underlying security of our blockchain. We will investigate all qualified vulnerability reports and try our best to solve the problem quickly.The speaker will receive generous UENC rewards.', ' Note: According to the severity level of the vulnerability, the higher the severity and impact of the vulnerability, the higher the reward; the reward will not be issued for the vulnerabilities that have been discovered or resolved by UENC technicians.', 'email address', 'Github'],
    fastokensecond: ['Wallet address', 'Bounded'],
    slider: ['Login/Register', 'Logout', 'Bind wallet', 'Check wallet'],
    fastoken: ['Bind wallet', 'Enter wallet address', 'Enter UENC quantity', 'Enter transaction hash', 'Confirm', 'After binding the wallet address, the wallet address cannot be changed, please check carefully', 'Transfer to wallet address'],
    forgetpassword: ['Forgot Password', 'Mobile Number', 'Verification', 'Enter Password', 'Enter Password Again', 'Confirm'],
    login: ['Login', 'Register', 'username', 'password', 'login', 'remember password', 'forgot', 'mobile phone number', 'verification', 'confirm password', 'email', 'Remember'],
    wallet: ['fastoken wallet'],
    baipishu: ['Download white paper>'],
    recommendtitle: ['UENC mainnet is online'],
    recommendshorttitle: ['The Testing Ends When Block Height Reaches 500,000'],
    learnmore: ['Learn more'],
    video: ['UENC Video'],
    project: ['Achievements of UENC'],
    videotitle: ['UENC is a scalable public chain with cross-chain technology that allows users to use digital assets safely and quickly.'],
    height: ['Block Height'],
    number: ['Full network nodes'],
    jiangli: ['Rewards'],
    sum: ['Transactions'],
    contactus: ['Contact Us', 'Telegram', 'Twitter', 'Weibo', 'Facebook', 'Github'],
    contactcontent: ['UENC implements a non-competitive mining and decentralized mechanism that enables everyone to build UENC network infrastructure and ecosystem and share dividends of global token economic growth altogether.', 'Welcome to contact us.', 'We need more information to provide a better solution.Please fill in the blanks and we will get back to you asap.'],
    meidaannouncement: ['Media announcement'],
    phone: ['phone'],
    email: ['mailbox'],
    submit: ['submit', 'success'],
    Partner: ['Partner'],
    Partner: ['Partner'],
    Mediaannouncement: ['News'],
    shangbiao: ['Copyright©2015-2020 UENC All rights reserved UENC'],
    // 关于项目
    about: ['About'],
    aboutcontent: ['Team building', 'Project introduction', 'Technology Roadmap'],
    aboutdescription: ['Technical Elements of UENC',
        'Based on DHT, CPS and self-developed DPOW consensus, UENC is featured by highly efficient node structure and high speed transaction.',
        'Application Value of UENC',
        'UENC offers on-chain transaction of high-concurrency, high speed and low cost, which fits the underlayer technical requirement of developing token economy in the future.',
        'EnergyClub APP introduction',
        'EngergyClub is an education APP for Blockchain fans who can get digital asset reward through learning.',
        'About UENC Main Net Wallet',
        'UENC main net wallet is a fully decentralized wallet based on Blockchain technology', 'UENC', 'A scalable basic public chain with cross-chain technology as its direction, UENC relies on innovative technologies such as DHT mesh network and cross-parallel storage technology (CPS).Based on self-developed DPOW consensus algorithm,UENC can provide high-concurrency and efficient transaction.',
        'In the future, UENC will apply cross-chain technology and solve Bitcoin"s increasing congestion problem. UENC will further develop trusted network, develop basic cross-chain interface and build SDK, and create a global trusted value network.'
    ],
    // 合作伙伴
    partner: ['Partner'],
    index: ['Home'],
    // 媒体公告
    media: ['News', 'Latest News', 'display more', 'No more information'],
    // FAQ
    FAQ: ['Common problem'],
    social: ['Social Media'],
    back: ['back'],
    // 路线图
    time: ['2018', '2019', '2020', '2021', '2022'],
    jieduan: ['Q1', 'Q2', 'Q3', 'Q4', 'July', 'August', 'September', 'October', 'November', 'December'],
    jieduancontent: ['Design architecture of public chain', 'R&D of Peer to Peer network', 'Design and develop distributed storage query network', 'Design and develop service components of encryption and decryption', 'R&D of secure and smart contract components', 'R&D of DPOW, a self-developed consensus algorithm', 'Develop application scenario and public chain iteration', 'Function development of mainnet (Phase I)', 'Mainnet (Phase I) opens', 'Optimize function of mainnet (Phase I)', 'Mainnet (Phase II) opens',
        'Optimize function of mainnet (Phase II)', 'Officially launches mainnet',
        'Optimize architecture of Virtual Machine, Construct highly efficient and secure smart contract;Develop DAPP and SDK;R&D of cross-chain with Bitcoin network and integrate consensus layer',
        'Develop UENC 2.0;Solve scalability problem',
        'Smart transmission of on/off chain data;Increase transparency of on-chain data',
        'Classify storage distribution in multiple devices;Implement token application for 10,000 enterprises'
    ],
    ...enLocale
};

export default en;