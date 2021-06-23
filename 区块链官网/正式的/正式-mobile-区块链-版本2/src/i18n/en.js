import enLocale from "element-ui/lib/locale/lang/en";
const en = {
    // nav: [
    //     'Home',
    //     'Blockchain', 'Block', 'Transaction', 'Rich list', 'Chart'

    // ],
    // transaction:['transaction details','show more','More information'],
    // search:['Search address, transaction, block hash, block height, etc.'],
    // index:['block height', '24hr TX Count','rewards already distributed','no. of nodes','cumulative transactions','remaining Reward','newest transaction','latest block','More ','From','to'],
    // block: ['block list','time','TX Count','trading volume','Reward'],
    // blockdetail: ['block details','no. of blocks','Fee','transaction hash','transaction list'],
    // transactiondetail: ['transaction details ','affiliated block','transaction time','consensus number','transaction signed node','click to view more','Fee information','Reward information'],
    // address:['Address List','rank','address','amount','percentage'],
    // addressdetail:['address overview','balance','number of transactions','total Total Received','total Total Sent','No transactions at this address'],
    // notfound:['not found','what you entered','does not exist','return'],
    // chart:['network node information','mining reward','transaction information','account statistics','Fuel cost distribution map','Node','proportion'],
    nav: [
        'Home',
        'Blockchain', 'Block', 'Transaction', 'Rich list', 'Chart'

    ],
    transaction:['transaction details','show more','more information',"Node expected revenue",'Circulation'],
    search:['Search address/block height/TXhash'],
    index:['height', ' transaction（24H）','Reward issued','Total nodes','cumulative transactions','Remaining reward','Transactions','Blocks','More ','From','to'],
    block: ['block list','time','TX Count',' Value','Reward'],
    blockdetail: ['block details','no. of blocks','Fee','tx hash','transaction list'],
    transactiondetail: ['transaction details ','affiliated block','transaction time','consensus number','transaction signed node','click to view more','Fee information','Reward information'],
    address:['Address List','rank','address','amount','percentage'],
    addressdetail:['address overview','balance','TX Count','Total Received','Total Sent','No transactions at this address'],
    notfound:['not found','what you entered','does not exist','return'],
    chart:['network node information','mining reward','transaction information','account statistics','Fuel cost distribution map','Node','proportion'],
    ...enLocale
};

export default en;