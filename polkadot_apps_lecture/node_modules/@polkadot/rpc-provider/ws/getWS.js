"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWSClass = getWSClass;
exports.createWS = createWS;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

// Copyright 2017-2020 @polkadot/rpc-provider authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
async function getWSClass() {
  if (typeof WebSocket === 'undefined') {
    const {
      w3cwebsocket
    } = await Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('websocket')));
    return [w3cwebsocket, false];
  }

  return [WebSocket, true];
}

async function createWS(endpoint, headers) {
  const [WS, isDefault] = await getWSClass();
  return isDefault ? new WS(endpoint) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - WS may be an instance of w3cwebsocket, which supports headers
  : new WS(endpoint, undefined, undefined, headers);
}