"use strict";
const component_tree_to_dom_1 = require("./component-tree-to-dom");
const dom_to_component_tree_1 = require("./dom-to-component-tree");
const predicates = require("@mojule/dom-node-predicates");
const DomComponents = (document, templates) => {
    const componentTreeToDom = component_tree_to_dom_1.ComponentTreeToDom(document, templates);
    const componentsToDom = (value) => {
        if (predicates.node(value)) {
            const componentTree = dom_to_component_tree_1.domToComponentTree(value);
            return componentTreeToDom(componentTree);
        }
        return componentTreeToDom(value);
    };
    return componentsToDom;
};
module.exports = DomComponents;
//# sourceMappingURL=index.js.map