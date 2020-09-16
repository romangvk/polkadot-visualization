"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _create = require("../../create");

var _GrandpaRoundstate = _interopRequireDefault(require("../../json/GrandpaRoundstate.001.json"));

// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
describe('ReportedRoundStates', () => {
  const registry = new _create.TypeRegistry();
  it('decodes from an actual message', () => {
    const states = registry.createType('ReportedRoundStates', _GrandpaRoundstate.default.result);
    expect(states.best.precommits.missing.size).toEqual(250);
  });
});