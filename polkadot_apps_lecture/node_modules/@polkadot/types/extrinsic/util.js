"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;

// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// a helper function for both types of payloads, Raw and metadata-known
function sign(registry, signerPair, u8a, options) {
  const encoded = u8a.length > 256 ? registry.hash(u8a) : u8a;
  return signerPair.sign(encoded, options);
}