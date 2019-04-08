export declare type SnippetTemplate = () => Node;
export declare type ComponentTemplate = (model: any, ...childNodes: Node[]) => Node;
export declare type ParentTemplate = (...childNodes: Node[]) => Node;
export declare type Template = SnippetTemplate | ComponentTemplate | ParentTemplate;
export interface TemplateMap {
    [name: string]: Template;
}
