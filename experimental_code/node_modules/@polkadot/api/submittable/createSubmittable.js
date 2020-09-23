"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSubmittable;

var _createClass = _interopRequireDefault(require("./createClass"));

// Copyright 2017-2020 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function createSubmittable(apiType, api, decorateMethod) {
  const Submittable = (0, _createClass.default)({
    api,
    apiType,
    decorateMethod
  });
  return extrinsic => new Submittable(api.registry, extrinsic);
}