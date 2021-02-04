"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _en = _interopRequireDefault(require("element-ui/lib/locale/lang/en"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var en = _objectSpread({
  nav: [{
    PageTo: "首页",
    title: "Home",
    src: require("../assets/images/index/首页.png"),
    src2: require("../assets/images/index/首页(1).png")
  }, {
    PageTo: "区块",
    title: "Block",
    src: require("../assets/images/index/区块.png"),
    src2: require("../assets/images/index/区块(1).png")
  }, {
    PageTo: "交易",
    title: "Trans",
    src: require("../assets/images/index/交易.png"),
    src2: require("../assets/images/index/交易(1).png")
  }, {
    PageTo: "地址",
    title: "Address",
    src: require("../assets/images/index/地址.png"),
    src2: require("../assets/images/index/地址(1).png")
  }],
  page: ['first', 'last'],
  publicsection: ['UENC Mainnet', 'Search', 'Search Address, Transaction/block hash, Block Height, etc.', 'Block Height', 'TX Amount', 'TX volume', 'From', 'To', 'Time', 'View More', 'Home Page', 'End Page'],
  home: {
    cardleft: ['24H TX Amount', '24H TX volume', 'Block Reward', ' Remaining Reward'],
    cardright: ['Average value of transaction fuel fee (first 100 blocks)', 'Number of transactions per day'],
    contenttop: ['Latest Transaction', ' TxHash', 'Gas Fee'],
    contentbottom: ['Latest Block', 'Block Reward'],
    bottom: ['UENC is a scalable blockchain-based public chain system with cross-chain research as its technical direction. Through optimization and innovation on the underlying technology and architecture of the blockchain, it supports the communication between different blockchain networks. Value transfer and improve its security. UENC establishes an efficient node combination structure by developing a hybrid point-to-point network based on DHT technology, cross-parallel storage technology (CPS), and trusted zone technology (TA), thereby rapidly increasing the speed of blockchain transactions. ', 'Publish time:', 'Total circulation:', 'Total circulation:', 'Official website:']
  },
  block: {
    content: ['Block List', 'Block Block Reward'],
    content2: ['Block Reward', 'TX volume', 'Block List', 'Block Hash'],
    content3: ['Pre-hash']
  },
  transaction: {
    content: ['Transaction List', 'TxHash', 'Gas Fee', 'Balance', 'Trans List'],
    content2: ['Award:', 'Sign_node:', 'Transaction', 'Gas Fee ', 'Block Reward', 'Trans_time', 'Signature Node', 'Details']
  },
  chart: ['Daily UENC Transaction Index (USDT)', 'Daily Transaction Number', 'Daily Transaction Total', 'Daily Block Total', 'Average Transaction Fuel Fee (First 100 Blocks)'],
  address: {
    content: ['UENC address:', 'Ranking', 'Address', 'Amount', 'Percentage', 'Total', 'Item']
  },
  notfound: ['Sorry, the data you want could not be found, please search again...'],
  wallet: ['Manage your digital assets', 'Fastoken is a digital asset management software that provides a safe, secure, easy-to-use, and powerful wallet application for ordinary users and miners. It is currently in the second phase of the public beta. ', 'Fastoken provides functions such as transfer transactions, secure storage and fast payment. Transfer transactions are fast and safe and secure. At the current public beta phase, a transaction can be completed in 1 second, and the historical transaction records in the wallet account are clear at a glance. By adopting a decentralized design, the wallet provides convenient and fair mining functions for miners and users can freely choose stable nodes for broadcast transactions. ']
}, _en["default"]);

var _default = en;
exports["default"] = _default;