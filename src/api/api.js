import 'dotenv/config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const uri = process.env.URI;

const api = {
    papi: null,
    ids: []],

    // test method to ensure api is working
    test: () => 'ok',

    loadAPI: () => {
        return new Promise((resolve, reject) => {
            let provider = new WsProvider(uri);
            ApiPromise.create({ provider }).then((r) => {
                this.papi = r;
                let chain;
                papi.rpc.system.chain().then((r) => {
                    chain = r;
                }).catch((e) => { reject(e); });
                resolve(`Connected to ${chain} at ${uri}`, chain, uri);
            }).catch((e) => { reject(e); });
        });
    },

    // save parachain ids in ids
    getParachainIDs: () => {
        if (this.papi == null) return "API not loaded. Call loadAPI() before calling another function.";
        return new Promise((resolve, reject) => {
            papi.query.registrar.parachains().then((r) => {
                this.ids = r;
                resolve(r);
            }).catch((e) => { reject(e); })
        });
    },

    // return all parachains on relay
    getParachains: () => {
        if (this.papi == null) return "API not loaded. Call loadAPI() before calling another function.";
        return new Promise((resolve, reject) => {
            let headRequests = [];
            if (this.ids.length == 0) { reject('No parachain ids.'); }
            this.ids.forEach(id => {
                headRequests.push(papi.query.parachains.heads(id));
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
                console.log(e);
                reject(e);
            });
        });
    }
}
export default api;