export type TSnippetTemplate = () => Node
export type TComponentTemplate = ( model: any, ...childNodes: Node[] ) => Node
export type TParentTemplate = ( ...childNodes: Node[] ) => Node

export type TTemplate = TSnippetTemplate | TComponentTemplate | TParentTemplate

export interface ITemplateMap {
  [ name: string ]: TTemplate
}
