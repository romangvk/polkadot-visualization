import 'dotenv/config';
import express from 'express';
import api from './api';

const app = express();
const polkadotApi = new api();

app.get('/', (req, res) => {
    return res.send(polkadotApi.test());
});

app.get('/getParachains', (req, res) => {
    polkadotApi.getParachains().then((response) => {
        return res.send(response);
    }).catch((e) => {
        return res.send(e);
    });
});

app.get('/getParachainIDs', (req, res) => {
  polkadotApi.getParachainIDs().then((response) => {
      return res.send(response);
  }).catch((e) => {
      return res.send(e);
  });
});

app.get('/loadAPI', (req, res) => {
  polkadotApi.loadAPI().then((response) => {
      return res.send(response);
  }).catch((e) => {
      return res.send(e);
  });
});

app.listen(process.env.PORT, () => {
    console.log(`Polkadot API Server listening on port ${process.env.PORT}!`);
});
