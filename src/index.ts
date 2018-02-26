import { ComponentTreeToDom } from './component-tree-to-dom'
import { domToComponentTree } from './dom-to-component-tree'
import * as predicates from '@mojule/dom-node-predicates'
import { isNodeTuple } from './is-node-tuple'

const DomComponents = ( document: Document, templates ) => {
  const componentTreeToDom = ComponentTreeToDom( document, templates )

  const componentsToDom = ( value ) => {
    if( predicates.node( value ) ){
      const componentTree = domToComponentTree( value )

      return componentTreeToDom( componentTree )
    }

    return componentTreeToDom( value )
  }

  return componentsToDom
}

export = DomComponents
