"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeTuple = void 0;
const is_1 = require("@mojule/is");
const isNodeTuple = (value) => is_1.is.array(value) && is_1.is.string(value[0]);
exports.isNodeTuple = isNodeTuple;
//# sourceMappingURL=is-node-tuple.js.map