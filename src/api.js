import 'dotenv/config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const uri = process.env.URI;

const ids = [5000, 100, 5001, 120, 8000, 110, 3000, 1000];


const api = {
    test: () => 'ok',
    getParachains: (parachainIDs = ids) => {
        return new Promise((resolve, reject) => {
            let provider = new WsProvider(uri);
            ApiPromise.create({ provider }).then((r) => {
                let papi = r;
                papi.rpc.system.chain().then((r) => {
                    let chain = r;
                    console.log(`Connected to ${chain}!`);

                    let headRequests = [];
                    parachainIDs.forEach(id => {
                        headRequests.push(papi.query.parachains.heads(id));
                    });

                    Promise.all(headRequests).then((heads) => {
                        let response = {};
                        response.parachains = [];
                        for(let i = 0; i < headRequests.length; i++) {
                            response.parachains.push({
                                id: parachainIDs[i],
                                head: heads[i]
                            });
                            console.log('Parachain with ID: ' + parachainIDs[i] + ' new head:' + heads[i] + '\n');
                        }
                        resolve(response);
                    }).catch((e) => {
                        console.log(e);
                        reject(e);
                    });
                }).catch((e) => { reject(e); });
            }).catch((e) => { reject(e); });
        })
    }
}
export default api;