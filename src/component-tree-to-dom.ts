import * as is from '@mojule/is'
import * as H from '@mojule/h'
import * as predicates from '@mojule/dom-node-predicates'
import { ITemplateMap } from './types'
import { isNodeTuple } from './is-node-tuple'

export const ComponentTreeToDom = ( document: Document, templates: ITemplateMap ) => {
  const h = H( document )
  const { textNode, element, comment } = h

  const handleArg = arg =>
    isNodeTuple( arg ) || is.string( arg ) ?
    jsonToDom( arg ) :
    arg

  const jsonToDom = ( json ) : Node => {
    if( is.string( json ) ) return textNode( json )

    if( !isNodeTuple( json ) ) throw Error( 'Expected string or node tuple' )

    const [ name, ...args ] = json

    if( name in templates ){
      const template = templates[ name ]
      // typescript can't handle this at all!
      const node : Node = (<any>template)( ...args.map( handleArg ) )

      return node
    }

    if( name === 'comment' ){
      return comment( args[ 0 ] )
    } else if( name in h ){
      return h[ name ]( ...args.map( handleArg ) )
    }

    return element( name, ...args.map( handleArg ) )
  }

  return jsonToDom
}
