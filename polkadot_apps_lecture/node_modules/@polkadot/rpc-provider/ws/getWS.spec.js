"use strict";

var _getWS = require("./getWS");

// Copyright 2017-2020 @polkadot/rpc-provider authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
describe('getWSClass', () => {
  let origWs;
  beforeEach(() => {
    origWs = global.WebSocket;
  });
  afterEach(() => {
    global.WebSocket = origWs;
  });
  it('polyfills with no exceptions (with WebSocket)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    global.WebSocket = undefined;
    const [WS] = await (0, _getWS.getWSClass)();
    expect(WS).toBeDefined();
  });
  it('polyfills with no exceptions (without WebSocket)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    global.WebSocket = () => true;

    const [WS] = await (0, _getWS.getWSClass)();
    expect(WS).toBeDefined();
  });
});