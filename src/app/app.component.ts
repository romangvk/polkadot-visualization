import { Component, OnInit } from '@angular/core';
import ApiPromise from '@polkadot/api';
import { WsProvider } from '@polkadot/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'polkadot-visualization';
  parachains = '';

  ngOnInit() {
    this.getParachains();
    this.parachains = 'many parachains';
  }

  async getParachains() {
    const provider = new WsProvider('wss://rococo-rpc.polkadot.io/');
    const api = await ApiPromise.ApiPromise.create({ provider });
    const chain = await api.rpc.system.chain();
    console.log(`Connected to ${chain}!`);

    // console.log(api)
    // console.log(api.query)

    // const allChains = await api.query.parachains.heads();
    // console.log(allChains);

    const parachainIDS = [5000, 100, 5001, 120, 8000, 110, 3000, 1000]
    var output = "";
    parachainIDS.forEach(async (id) => {
      await api.query.parachains.heads(id, (head) => {
        output += "Parachain with ID: " + id + " new head: " + head.toHuman() + "\n";
      });
    });
    
  }
}
