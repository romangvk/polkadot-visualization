import 'dotenv/config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const uri = process.env.URI;
const max_stored_blocks = 10;



export default class API {
    papi = null;
    ids = null;
    testMessage = 'ok';



    // test method to ensure api is working
    test() {
        return ({ 'message': this.testMessage });
    }

    loadAPI() {
        return new Promise((resolve, reject) => {
            if (this.papi != null) resolve('API already loaded!');
            let provider = new WsProvider(uri);
            ApiPromise.create({ provider }).then((r) => {
                this.papi = r;
                this.papi.rpc.system.chain().then((r) => {
                    resolve(`Connected to ${r} at ${uri}`, r, uri);
                }).catch((e) => { reject(e); });
            }).catch((e) => { reject(e); });
        });
    }

    // save parachain ids in this.ids
    getParachainIDs() {
        return new Promise((resolve, reject) => {
            if (this.papi == null) reject('API not loaded. Call loadAPI() before calling another function.');
            this.papi.query.registrar.parachains().then((r) => {
                this.ids = r;
                resolve({ ids: r });
            }).catch((e) => { reject(e); })
        });
    }

    // return all parachains on relay
    getParachains() {
        return new Promise((resolve, reject) => {
            if (this.papi == null) reject('API not loaded. Call loadAPI() before calling another function.');
            let headRequests = [];
            if (this.ids == null || this.ids.length == 0) { reject('No parachain ids.'); }
            this.ids.forEach(id => {
                headRequests.push(this.papi.query.parachains.heads(id));
            });
            Promise.all(headRequests).then((heads) => {
                let response = {};
                response.parachains = [];
                for (let i = 0; i < headRequests.length; i++) {
                    response.parachains.push({
                        id: this.ids[i],
                        head: heads[i]
                    });
                    console.log('Parachain with ID: ' + this.ids[i] + ' new head:' + heads[i] + '\n');
                }
                resolve(response);
            }).catch((e) => {
                // Parachain head request failed
                reject(e);
            });
        });
    }

    heads = [];
    head = null;
    subscription = null;

    dirtyHeads = 0;

    // Returns whether or not the api is subscribed to new heads
    subscribed() { return (this.subscription != null); }

    // Subscribes to new heads and unsubscribes once a certain number of heads have been received
    async subscribeNewHeads() {
        if (this.subscribed()) return "Already subscribed.";
        this.subscription = await this.papi.rpc.chain.subscribeNewHeads((block) => {
            console.log("New block: " + block.number + "\n");
            
            // Add new block to list of blocks
            this.heads.push(block);
            if (this.heads.length > max_stored_blocks) this.heads.pop();
            
            // Store latest block
            this.head = block;
            
            // Unsubscribe if more than dirtyHeads blocks have been loaded since a latestHead request
            this.dirtyHeads++;
            if (this.dirtyHeads > max_stored_blocks) this.unsubscribeNewHeads();
        });
        return "Subscribed to new blocks.";
    }

    // Unsubscribes the api from new heads and sets subscription to null
    unsubscribeNewHeads() {
        if (this.subscription != null) {
            this.subscription();
            this.subscription = null;
            this.heads = [];
            console.log('unsubscribed!!!');
            return "Unsubscribed successfully.";
        } else return "Must be subscribed to unsubscribe.";
    }

    // Returns the latest head
    latestHead() {
        this.dirtyHeads = 0;
        return { head: this.head };
    }
}
