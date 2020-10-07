import 'dotenv/config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const uri = process.env.URI;



export default class API {
    papi = null;
    ids = null;
    testMessage = 'ok';



    // test method to ensure api is working
    test() {
        return ({'message': this.testMessage});
    }

    loadAPI() {
        return new Promise((resolve, reject) => {
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
}
