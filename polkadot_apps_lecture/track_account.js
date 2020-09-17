const DOT_DECIMAL_PLACES = 1000000000000;
const ADDR = '5CAWffTXapK6ZzTrrFUvFWRs2YPes9SSZd4dtCo6ieLzQKhC'; // mhrydil address

const{ ApiPromise, WsProvider } = require('@polkadot/api');

(async () => {

    const provider = new WsProvider('wss://westend-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })
    const chain = await api.rpc.system.chain();

    console.log(`Connected to ${chain}!`);


    let blockCount = 0;
    function showDataAboutBlock(block){
        console.log(chain + ": last block: " + block.number + " with hash: " + block.hash);
        if (++blockCount == 5){
            blockUnsub();
        }
    }
    const blockUnsub = await api.rpc.chain.subscribeNewHeads(showDataAboutBlock);

    // const blockSub = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    //     console.log(chain + ": Last block: " + lastHeader.number + " with hash: " + lastHeader.hash);
    // });


    let balanceChangeCount = 0;
    function showBalanceChanges({nonce, data: balance}){
        console.log('free balance is ' + balance.free/DOT_DECIMAL_PLACES + " WND with " + balance.reserved + " reserved.");
        if(++balanceChangeCount == 5) balanceUnsub(); // balanceSub() 
    }
    const balanceUnsub = await api.query.system.account(ADDR, showBalanceChanges);


    //Subscribe to balance changes for our account
    // const unsub = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
    //   console.log(`free balance is ${balance.free/DOT_DECIMAL_PLACES} westies with ${balance.reserved} reserved and a nonce of ${nonce}`);
    // });

})()