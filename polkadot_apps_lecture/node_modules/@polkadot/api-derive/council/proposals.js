"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proposals = proposals;

var _collective = require("../collective");

var _util = require("../util");

// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function proposals(instanceId, api) {
  return (0, _util.memo)(instanceId, (0, _collective.proposals)(instanceId, api, 'council'));
}