import * as predicates from '@mojule/dom-node-predicates'
import * as Mapper from '@mojule/mapper'
import * as upperFirst from 'lodash.upperfirst'
import * as camelCase from 'lodash.camelcase'

const pascalCase = str => upperFirst( camelCase( str ) )

const modelNodeToJson = node => JSON.parse( node.textContent )

const elementToJson = ( element: Element ) => {
  let name = element.localName!
  let model = {}

  if( name.startsWith( 'm-' ) ){
    name = pascalCase( name.slice( 2 ) )

    model = Array.from( element.attributes ).reduce( ( obj, pair ) => {
      obj[ camelCase( pair.name ) ] = pair.value

      return obj
    }, {} )

    const modelNodes =
      Array.from( element.children )
      .filter( node => node.localName === 'm-model' )

    Object.assign( model, ...modelNodes.map( modelNodeToJson ) )

    modelNodes.forEach( node => element.removeChild( node ) )
  } else {
    model = Array.from( element.attributes ).reduce( ( obj, pair ) => {
      obj[ pair.name ] = pair.value

      return obj
    }, {} )
  }

  const tuple : any = [ name ]

  if( Object.keys( model ).length ){
    tuple.push( model )
  }

  Array.from( element.childNodes ).forEach( node => {
    tuple.push( domToComponentTree( node ) )
  })

  return tuple
}

const fragmentToJson =
  ( node: DocumentFragment ) => {
    const tuple: any = [ 'documentFragment' ]

    Array.from( node.childNodes ).forEach( node => {
      tuple.push( domToComponentTree( node ) )
    })

    return tuple
  }

const map = {
  element: ( node: Element ) => elementToJson( node ),
  text: ( node: Text ) => node.nodeValue,
  comment: ( node: Comment ) => [ 'comment', node.nodeValue ],
  documentFragment: ( node: DocumentFragment ) => fragmentToJson( node )
}

export const domToComponentTree = Mapper( { predicates, map } )
