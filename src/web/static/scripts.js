// const{ ApiPromise, WsProvider } = require('@polkadot/api');

// import { ApiPromise, WsProvider } from '@polkadot/api';
// import { WsProvider } from '@polkadot/api';

// import Api from '/node_modules/@polkadot/api/promise';
// import Ws from '/node_modules/@polkadot/rpc-provider/ws';


function createXmlHttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!(xmlhttp)) {
        alert("Your browser does not support AJAX!");
    }
    return xmlhttp;
}

function get(xmlHttp, target) {
    if (xmlHttp) {
        xmlHttp.open("GET", target, true); // XMLHttpRequest.open(method, url, async)
        var contentType = "application/x-www-form-urlencoded";
        xmlHttp.setRequestHeader("Content-type", contentType);
        xmlHttp.send();
    }
}

function sendGetRequest(targetUrl, callbackFunction) {
    var xmlHttp = createXmlHttp();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            console.log(xmlHttp);
            var myObject = JSON.parse(xmlHttp.responseText);
            callbackFunction(myObject, targetUrl);
        }
    }
    get(xmlHttp, targetUrl)
}


function initServer() {
    fetch('http://localhost:3000/loadAPI')
        .then(
            function(response) {
                console.log(response);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                    console.log(data);
                    elem = document.getElementById('event_updates_content');
                    oldText = elem.innerText;
                    elem.innerText = data.response + "\n\n" + oldText;
                    initImage();
                    initSidebar();

                }).catch((e) => {
                    console.log(e);
                });
            }
        ).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

}

function initImage() {
    fetch('http://localhost:3000/getParachainIDs').then(
        function(response) {
            console.log(response);
            if(response.status !== 200) { 
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            response.json().then(function(data){
                console.log(data);
                chains_array = data.response.ids;
                num_chains = chains_array.length;
                elem = document.getElementById('event_updates_content');
                oldText = elem.innerText;
                elem.innerText = "Parachain IDs:\n[" + chains_array + "]\n\n" + oldText;
                generateChains();
            }).catch((e) => {
                console.log(e);
            });

        }).catch((e) => {
            console.log(e);
        });
}

function initSidebar() {
    elem = document.getElementById("event_updates_content");
    oldText = elem.innerText;
    

    
}

function showChains(result, url) {
    console.log(result);
    elem = document.getElementById('event_updates_content');
    oldText = elem.innerText;
    elem.innerText = result.response + oldText;
}

function updateContent(){
    // sendGetRequest('http://localhost:3000/loadAPI', showChains);  
    fetch('http://localhost:3000/loadAPI')
        .then(
            function(response) {
                console.log(response);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                    console.log(data);
                }).catch((e) => {
                    console.log(e);
                });
            }
        )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function animatePathFrom(from_id, length){
    elem = document.getElementById('chain_id_' + from_id);   
    elem2 = document.getElementById('path_id_' + from_id);   
    elem.setAttribute('fill', '#00BB00');
    elem2.setAttribute('stroke', '#00BB00');
    anime({
        targets: '#path_id_' + from_id,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: length,
        direction: 'alternate',
        // loop: true
    });
}

function animatePathTo(to_id, length){
    elem = document.getElementById('chain_id_' + to_id);   
    elem2 = document.getElementById('path_id_' + to_id); 
    elem3 = document.getElementById('path_under_id_' + to_id);     
    elem.setAttribute('fill', '#00BB00');
    elem2.setAttribute('stroke', '#000000');
    elem3.setAttribute('stroke', '#00BB00');
    anime({
        targets: '#path_id_' + to_id,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: length,
        delay: length,
        direction: 'reverse',
        // loop: true
    });
}


function sendMessage() {
    from_id = document.getElementById('from_chain').value;
    to_id = document.getElementById('to_chain').value;
    console.log("Animating sending a message from " + from_id + " to " + to_id);
    //changeColor(from_id);
    animatePathFrom(from_id, 4000);
    //changeColor(to_id);
    animatePathTo(to_id, 4000);
    setTimeout(() => {generateChains()}, 4000); //reset the paths after a message is sent... Not really sure why 4000 is the delay, I feel like it should be 8000 but idk
}


chains_array = [];
num_chains = 0;

function changeColor(chain) {
    elem = document.getElementById('chain_id_' + chain);
    // text += "<rect id='chain_id_" + i + "' x='" + (thisX-30) + "' y='" + (thisY-30) + "' rx='10' ry='10' width='60' height='60' stroke='black' stroke-width='0' fill='#BBBBBB' />\n";
    elem.setAttribute('fill', '#00BB00');

}


function generateChains(){
    console.log("Generating parachains.");
    elem = document.getElementById('message_svg');
    // number = document.getElementById('num_chains').value;
    number = num_chains
    angleBetween = (360/number)*(Math.PI/180);
    centerX = 350;
    centerY = 350;
    offsetX = 150;
    text = "";
    for(var i=0; i<number; i++){
        thisX = offsetX + centerX + Math.cos(angleBetween*i)*(centerX*.8);
        thisY = centerY + Math.sin(angleBetween*i)*(centerX*.8);
        text += "<rect id='chain_id_" + chains_array[i] + "' x='" + (thisX-30) + "' y='" + (thisY-30) + "' rx='10' ry='10' width='60' height='60' stroke='black' stroke-width='0' fill='#BBBBBB' />\n";
        text += "<rect id='chain_id_" + chains_array[i] + "' x='" + (thisX-12) + "' y='" + (thisY-12) + "' rx='5' ry='5' width='24' height='24' fill='#FFFFFF' />\n";
        text += "<path id='path_under_id_" + chains_array[i] + "'d='M" + thisX + " " + thisY + " L" + (offsetX+centerX) + " " + centerY + " Z' stroke='black' stroke-width='2' />\n";
        text += "<path id='path_id_" + chains_array[i] + "'d='M" + thisX + " " + thisY + " L" + (offsetX+centerX) + " " + centerY + " Z' stroke='black' stroke-width='2' />\n";
        text += "<text x='" + (thisX-15) + "' y='" + (thisY-50) + "' fill='black'> ID: " + chains_array[i] + "</text>";
    }
    text += "<circle cx='" + (centerX+offsetX) + "' cy='" + centerY + "' r='120' fill='none' stroke-width='40' stroke='#777777' />";
    // console.log(text);
    elem.innerHTML = text;
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