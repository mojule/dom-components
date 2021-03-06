"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentTreeToDom = void 0;
const is_1 = require("@mojule/is");
const H = require("@mojule/h");
const is_node_tuple_1 = require("./is-node-tuple");
const ComponentTreeToDom = (document, templates) => {
    const h = H(document);
    const { textNode, element, comment } = h;
    const handleArg = arg => is_node_tuple_1.isNodeTuple(arg) || is_1.is.string(arg) ?
        jsonToDom(arg) :
        arg;
    const jsonToDom = (json) => {
        if (is_1.is.string(json))
            return textNode(json);
        if (!is_node_tuple_1.isNodeTuple(json))
            throw Error('Expected string or node tuple');
        const [name, ...args] = json;
        if (name in templates) {
            const template = templates[name];
            // typescript can't handle this at all!
            const node = template(...args.map(handleArg));
            return node;
        }
        if (name === 'comment') {
            return comment(args[0]);
        }
        else if (name in h) {
            return h[name](...args.map(handleArg));
        }
        return element(name, ...args.map(handleArg));
    };
    return jsonToDom;
};
exports.ComponentTreeToDom = ComponentTreeToDom;
//# sourceMappingURL=component-tree-to-dom.js.map