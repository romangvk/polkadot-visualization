"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAuthor = extractAuthor;

// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function extractAuthor(digest, sessionValidators = []) {
  const [pitem] = digest.logs.filter(({
    type
  }) => type === 'PreRuntime'); // extract from the substrate 2.0 PreRuntime digest

  if (pitem) {
    const [engine, data] = pitem.asPreRuntime;
    return engine.extractAuthor(data, sessionValidators);
  } else {
    const [citem] = digest.logs.filter(({
      type
    }) => type === 'Consensus'); // extract author from the consensus (substrate 1.0, digest)

    if (citem) {
      const [engine, data] = citem.asConsensus;
      return engine.extractAuthor(data, sessionValidators);
    }
  }

  return undefined;
}