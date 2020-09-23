const DOT_DECIMAL_PLACES = 1000000000000;
const ADDR = '5CAWffTXapK6ZzTrrFUvFWRs2YPes9SSZd4dtCo6ieLzQKhC'; // mhrydil address

const{ ApiPromise, WsProvider } = require('@polkadot/api');

(async () => {

    const provider = new WsProvider('wss://westend-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })
    const chain = await api.rpc.system.chain();

    console.log(api);

    console.log(`Connected to ${chain}!`);


    let blockCount = 0;

    function showDataAboutBlock(block){
        console.log(chain + ": last block: " + block.number + " with hash: " + block.hash);
        if (++blockCount == 50){
            blockUnsub();

        }
    }

    const blockUnsub = await api.rpc.chain.subscribeNewHeads(showDataAboutBlock);



    function showBalanceChanges({nonce, data: balance}){
        console.log('free balance is ' + balance.free/DOT_DECIMAL_PLACES + " WND with " + balance.reserved + " reserved.");
        if(++balanceChangeCount == 5) balanceUnsub(); // balanceSub() 
    }

    const balanceUnsub = await api.query.system.account(ADDR, showBalanceChanges);

})()