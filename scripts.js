// const{ ApiPromise, WsProvider } = require('@polkadot/api');

// import { ApiPromise, WsProvider } from '@polkadot/api';
// import { WsProvider } from '@polkadot/api';

// import Api from '/node_modules/@polkadot/api/promise';
// import Ws from '/node_modules/@polkadot/rpc-provider/ws';


/* I had just started trying to use express js to display the website, but didn't get very far so I'm commenting this out

var express = require('express');
const path = require('path');
var app = express();
var port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

*/
var path = '#path3'
function showMessage(){
    console.log("animating!");
    anime({
        targets: '#message_svg ' + path,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'steps(30)',
        duration: 5000,
        // direction: 'alternate',
        // loop: true
    })
}


circle_to_animate = '#left_circle';

function showNewBlock(){
    console.log("animating the bottom left circle");
    anime({
        targets: '#block_svg ' + circle_to_animate,
        scale: .5,
        duration: 1000,
        direction: 'alternate',
    })
}


async function main() {
    const provider = new WsProvider('wss://rococo-rpc.polkadot.io/');
    const api = await ApiPromise.create({ provider });
    const chain = await api.rpc.system.chain();
    console.log(`Connected to ${chain}!`);

    update_parachain_heads(api);
    show_new_blocks(api);
    show_queues(api);
    
}

async function show_new_blocks(api) {
    const block_unsub = await api.rpc.chain.subscribeNewHeads((block) => {
        console.log("New block: " + block.number + "\n");
    })
}

async function show_queues(api) {
    const parachainIDS = await api.query.registrar.parachains(); // returns an arary of all the parachains connected to the network
    parachainIDS.forEach(async (id)=>{
        await api.query.parachains.downwardMessageQueue(id, (incoming_messages) => {
            console.log("Parachain with ID " + id + " - Incoming Messages: " + incoming_messages.length + "\n");
        });
        await api.query.parachains.relayDispatchQueue(id, (outgoing_messages) => {
            console.log("Parachain ID " + id + " - Outoging Messages: " + outgoing_messages.length + "\n");
        });
    })
}

async function update_parachain_heads(api) {
    const parachainIDS = await api.query.registrar.parachains(); // returns an arary of all the parachains connected to the network

    parachainIDS.forEach(async (id)=>{
        await api.query.parachains.heads(id, (head)=>{
            // elem = document.getElementById('event_updates_content');
            // elem.innerText = elem.innerText + "Parachain with ID: " + id + " new head: " + head.toHuman() + "\n";
            console.log("Parachain with ID " + id + " - New Head: " + head.toHuman().substring(0, 20) + "...\n");
        });
    });
}

main()