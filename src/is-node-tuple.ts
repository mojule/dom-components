import * as is from '@mojule/is'

export const isNodeTuple = ( value ) =>
  is.array( value ) && is.string( value[ 0 ] )
