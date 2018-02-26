"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicates = require("@mojule/dom-node-predicates");
const Mapper = require("@mojule/mapper");
const upperFirst = require("lodash.upperfirst");
const camelCase = require("lodash.camelcase");
const pascalCase = str => upperFirst(camelCase(str));
const modelNodeToJson = node => JSON.parse(node.textContent);
const elementToJson = (element) => {
    let name = element.localName;
    let model = {};
    if (name.startsWith('m-')) {
        name = pascalCase(name.slice(2));
        model = Array.from(element.attributes).reduce((obj, pair) => {
            obj[camelCase(pair.name)] = pair.value;
            return obj;
        }, {});
        const modelNodes = Array.from(element.children)
            .filter(node => node.localName === 'm-model');
        Object.assign(model, ...modelNodes.map(modelNodeToJson));
        modelNodes.forEach(node => element.removeChild(node));
    }
    else {
        model = Array.from(element.attributes).reduce((obj, pair) => {
            obj[pair.name] = pair.value;
            return obj;
        }, {});
    }
    const tuple = [name];
    if (Object.keys(model).length) {
        tuple.push(model);
    }
    Array.from(element.childNodes).forEach(node => {
        tuple.push(exports.domToComponentTree(node));
    });
    return tuple;
};
const fragmentToJson = (node) => {
    const tuple = ['documentFragment'];
    Array.from(node.childNodes).forEach(node => {
        tuple.push(exports.domToComponentTree(node));
    });
    return tuple;
};
const map = {
    element: (node) => elementToJson(node),
    text: (node) => node.nodeValue,
    comment: (node) => ['comment', node.nodeValue],
    documentFragment: (node) => fragmentToJson(node)
};
exports.domToComponentTree = Mapper({ predicates, map });
//# sourceMappingURL=dom-to-component-tree.js.map