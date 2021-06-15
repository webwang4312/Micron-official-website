import enLocale from "element-ui/lib/locale/lang/en";
const en = {
    nav: [
        'Home',
        'Blockchain', 'Block', 'Transaction', 'Rich list', 'Chart'

    ],
    transaction:['transaction details','show more','More information'],
    search:['Search address, transaction, block hash, block height, etc.'],
    index:['block height', '24hr transaction count','rewards already distributed','no. of nodes','cumulative transactions','remaining block reward','newest transaction','latest block','More ','From','to'],
    block: ['block list','time','transaction count','trading volume','block reward'],
    blockdetail: ['block details','no. of blocks','fuel fee','transaction hash','transaction list'],
    transactiondetail: ['transaction details ','affiliated block','transaction time','consensus number','transaction signed node','click to view more','fuel fee information','block reward information'],
    address:['Address List','rank','address','amount','percentage'],
    addressdetail:['address overview','balance','number of transactions','total income','total expenses','No transactions at this address'],
    notfound:['not found','what you entered','does not exist','return'],
    chart:['network node information','mining reward','transaction information','account statistics','Fuel cost distribution map','Node','proportion'],
    ...enLocale
};

export default en;