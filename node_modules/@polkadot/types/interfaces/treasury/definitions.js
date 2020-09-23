"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// order important in structs... :)

/* eslint-disable sort-keys */
var _default = {
  rpc: {},
  types: {
    OpenTip: {
      reason: 'Hash',
      who: 'AccountId',
      finder: 'AccountId',
      deposit: 'Balance',
      closes: 'Option<BlockNumber>',
      tips: 'Vec<OpenTipTip>',
      findersFee: 'bool'
    },
    OpenTipTo225: {
      reason: 'Hash',
      who: 'AccountId',
      finder: 'Option<OpenTipFinderTo225>',
      closes: 'Option<BlockNumber>',
      tips: 'Vec<OpenTipTip>'
    },
    OpenTipFinderTo225: '(AccountId, Balance)',
    OpenTipTip: '(AccountId, Balance)',
    TreasuryProposal: {
      proposer: 'AccountId',
      value: 'Balance',
      beneficiary: 'AccountId',
      bond: 'Balance'
    }
  }
};
exports.default = _default;