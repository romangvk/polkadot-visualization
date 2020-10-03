import 'dotenv/config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const uri = process.env.URI;

export default class API {
    API() {
        console.log("loaded API class")
    }

    papi = null;
    ids = [];
    testMessage = 'ok';

    // test method to ensure api is working
    test() {
        return (this.testMessage);
    }

    loadAPI() {
        return new Promise((resolve, reject) => {
            let provider = new WsProvider(uri);
            console.log(provider);
            ApiPromise.create({ provider }).then((r) => {
                this.papi = r;
                this.papi.rpc.system.chain().then((r) => {

                    resolve(`Connected to ${r} at ${uri}`, r, uri);

                }).catch((e) => { console.log("first catch block"); reject(e); });

            }).catch((e) => { console.log("second catch block"); console.log(e); reject(e); });
        });
    }

    // save parachain ids in ids
    getParachainIDs() {
        return new Promise((resolve, reject) => {
            if (this.papi == null) reject("API not loaded. Call loadAPI() before calling another function.");
            this.papi.query.registrar.parachains().then((r) => {
                this.ids = r;
                console.log(this.ids);
                resolve(r);
            }).catch((e) => { reject(e); })
        });
    }

    // return all parachains on relay
    getParachains() {
        return new Promise((resolve, reject) => {
            if (this.papi == null) reject("API not loaded. Call loadAPI() before calling another function.");
            let headRequests = [];
            console.log("before promise.all");
            console.log(this.ids.length);
            if (this.ids.length == 0) { reject('No parachain ids.'); }
            this.ids.forEach(id => {
                console.log(id);
                headRequests.push(papi.query.parachains.heads(id));
            });

            Promise.all(headRequests).then((heads) => {
                let response = {};
                response.parachains = [];
                console.log(headRequests.length);
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
                console.log(e);
                reject(e);
            });
        });
    }
}
