export type SnippetTemplate = () => Node
export type ComponentTemplate = ( model: any, ...childNodes: Node[] ) => Node
export type ParentTemplate = ( ...childNodes: Node[] ) => Node

export type Template = SnippetTemplate | ComponentTemplate | ParentTemplate

export interface TemplateMap {
  [ name: string ]: Template
}
