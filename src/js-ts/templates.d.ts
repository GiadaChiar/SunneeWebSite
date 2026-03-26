import type { BaseProduct } from "./interfaces";
export declare function loadTemplates(): Promise<void>;
export declare function insertTemplate(sectionId: string, templateId: string): void;
export declare function insertProductClone(product: BaseProduct): void;
export declare function setupColorSelection(products: BaseProduct[]): void;
export declare function insertProductCloneFilter(product: BaseProduct): void;
//# sourceMappingURL=templates.d.ts.map