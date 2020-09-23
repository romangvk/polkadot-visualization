"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateTypes;

var _extractTypes = _interopRequireDefault(require("./extractTypes"));

var _flattenUniq = _interopRequireDefault(require("./flattenUniq"));

// Copyright 2017-2020 @polkadot/metadata authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/** @internal */
function validateTypes(registry, types, throwError) {
  const missing = (0, _flattenUniq.default)((0, _extractTypes.default)(types)).filter(type => !registry.hasType(type));

  if (missing.length !== 0) {
    const message = `Unknown types found, no types for ${missing.join(', ')}`;

    if (throwError) {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }
}