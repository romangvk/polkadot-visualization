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

function sendMessage() {
    from_id = document.getElementById('from_chain').value;
    to_id = document.getElementById('to_chain').value;
    console.log("Animating sending a message from " + from_id + " to " + to_id);
    for(i=0; i<3; i++){
        anime({
            targets: '#path_id_' + from_id,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'linear',
            duration: 4000,
            // direction: 'alternate',
            // loop: true
        })
        anime({
            targets: '#path_id_' + to_id,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'linear',
            duration: 4000,
            delay: 4000,
            direction: 'reverse'
            // loop: true
        })
    }
    setTimeout(() => {generateCircles()}, 2000); //reset the paths after a message is sent... Not really sure why 4000 is the delay, I feel like it should be 8000 but idk
}

function generateCircles(){
    console.log("Generating circles.");
    elem = document.getElementById('message_svg');
    number = document.getElementById('num_chains').value;
    angleBetween = (360/number)*(Math.PI/180);
    centerX = 400;
    centerY = 400;
    text = "";
    for(var i=0; i<number; i++){
        thisX = centerX + Math.cos(angleBetween*i)*325;
        //50 + i*30;// x position for the ith circle
        thisY = centerY + Math.sin(angleBetween*i)*325;
        //40 + i*30;// y position for the ith circle
        text += "<circle id='circle_id_" + i + "' cx='" + thisX + "' cy='" + thisY + "' r='40' stroke='black' stroke-width='3' fill='#EEEEEE' />\n";
        text += "<path id='path_id_" + i + "'d='M" + thisX + " " + thisY + "L400 400 Z' stroke='black' stroke-width='3' />\n";
        text += "<text x='" + (thisX-15) + "' y='" + (thisY-50) + "' fill='black'> ID: " + i + "</text>";
        //<!-- <path id="path3" d="M75 125 L325 125 Z" stroke="black" stroke-width="3" /> -->
        //<circle id="left_circle" cx="50" cy="125" r="40" stroke="black" stroke-width="3" fill="red" />
    }
    console.log(text);
    elem.innerHTML = text;
}


function showNewBlock(){
    console.log("animating the bottom left circle");
    anime({
        targets: '#block_svg #left_circle',
        scale: 1.25,
        duration: 500,
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

// main()