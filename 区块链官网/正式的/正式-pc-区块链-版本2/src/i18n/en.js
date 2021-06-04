import enLocale from "element-ui/lib/locale/lang/en";
const en = {
    nav: [
        'Home',
        'Blockchain', 'Block', 'Transaction', 'Rich list', 'Chart'

    ],
    search:['Search address, transaction, block hash, block height, etc.'],
    index:['Block height', '24H number of transactions','Reward issued','Total number of nodes','Accumulated number of transactions','Remaining block reward','Latest transaction','Latest block','More ','From','to'],
    block: ['block list','time','transaction number','transaction amount','block reward'],
    blockdetail: ['block details','number of blocks','fuel fee','transaction hash','transaction list'],
    transactiondetail: ['Transaction details','belonging to block','transaction time','consensus number','transaction signature node','click to view more','fuel fee information','block reward information'],
    address:['Address List','rank','address','amount','percentage'],
    addressdetail:['Address overview','balance','number of transactions','total income','total expenditure','No transactions at this address'],
    notfound:['not found','what you entered','does not exist','return'],
    ...enLocale
};

export default en;