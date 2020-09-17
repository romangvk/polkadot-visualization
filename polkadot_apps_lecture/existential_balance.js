const ROCOCO_DECIMAL_PLACES = 1000;
const{ ApiPromise, WsProvider } = require('@polkadot/api');

// We must wrap everything up in an async block
(async () => {

    // Connect to a node (this is a public one)
    const provider = new WsProvider('wss://rococo-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })

    // Make a call to the chain and get its name.
    const chain = await api.rpc.system.chain();
    console.log(`You are connected to ${chain}!`);


    const balance = api.consts.balances.existentialDeposit;
    console.log("Existential balance is: " + balance/ROCOCO_DECIMAL_PLACES);


    // Print out the chain to which we connected.


    // Exit the process.
    process.exit()
})()
