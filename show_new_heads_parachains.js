
const{ ApiPromise, WsProvider } = require('@polkadot/api');

(async () => {

    const provider = new WsProvider('wss://rococo-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })
    const chain = await api.rpc.system.chain();
    console.log(`Connected to ${chain}!`);

    // console.log(api)
    // console.log(api.query)

    // const allChains = await api.query.parachains.heads();
    // console.log(allChains);

    const parachainIDS = await api.query.registrar.parachains();
    // [5000, 100, 5001, 120, 8000, 110, 3000, 1000]

    parachainIDS.forEach(async (id)=>{
        await api.query.parachains.heads(id, (head)=>{
            console.log("Parachain with ID: " + id + " new head: " + head.toHuman() + "\n");
        });
    });


})()