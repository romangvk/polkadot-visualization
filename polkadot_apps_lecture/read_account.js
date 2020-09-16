const DOT_DECIMAL_PLACES = 1000000000000;

const{ ApiPromise, WsProvider } = require('@polkadot/api');

// We must wrap everything up in an async block
(async () => {

    // Connect to a node (this is a public one)
    const provider = new WsProvider('wss://rococo-rpc.polkadot.io')
    const api = await ApiPromise.create({ provider })

    const ADDR = '5FPMzsezo1PRxYbVpJMWK7HNbR2kUxidsAAxH4BosHa4wd6S';

    const totalIssuance = await api.query.balances.totalIssuance(); // Note: freeBalance doesn't seem to be a function anymore
    const account = await api.query.balances.account(ADDR)
    const freeBalance = account;

    // const polkadotApi= await api;

    // console.log(polkadotApi);

    console.log(`${ADDR} has ${freeBalance} ROC`);
    console.log(`Total Issuance is: ${totalIssuance/DOT_DECIMAL_PLACES} ROC`);

    process.exit()
})()
