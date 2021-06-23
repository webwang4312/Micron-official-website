import enLocale from "element-ui/lib/locale/lang/en";
const en = {
    nav: [
        'Home',
        'Blockchain', 'Block', 'Transaction', 'Rich list', 'Chart'

    ],
    transaction:['transaction details','show more',"Node expected revenue",'Circulation'],
    search:['Search address/block height/TXhash'],
    index:['height', ' transaction（24H）','Reward issued','Total nodes','cumulative transactions','Remaining reward','Transactions','Blocks','More ','From','to'],
    block: ['block list','time','TX Count','Value','Reward'],
    blockdetail: ['block details','no. of blocks',' Fee','TxHash','transaction list'],
    transactiondetail: ['transaction details ','affiliated block','transaction time','consensus number','transaction signed node','click to view more',' Fee information','Reward information'],
    address:['Address List','rank','address','amount','percentage'],
    addressdetail:['address overview','balance','TX Count','total income','total expenses','No transactions at this address'],
    notfound:['not found','what you entered','does not exist','return'],
    chart:['network node information','mining reward','transaction information','account statistics','Fuel cost distribution map','Node','proportion'],
    ...enLocale
};

export default en;