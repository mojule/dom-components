export declare type TSnippetTemplate = () => Node;
export declare type TComponentTemplate = (model: any, ...childNodes: Node[]) => Node;
export declare type TParentTemplate = (...childNodes: Node[]) => Node;
export declare type TTemplate = TSnippetTemplate | TComponentTemplate | TParentTemplate;
export interface ITemplateMap {
    [name: string]: TTemplate;
}
