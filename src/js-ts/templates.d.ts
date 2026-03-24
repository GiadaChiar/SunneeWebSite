import type { BaseProduct } from "./interfaces";
export declare function loadTemplates(): Promise<void>;
export declare function insertTemplate(sectionId: string, templateId: string): void;
export declare function insertProductClone(product: BaseProduct): void;
export declare function setupColorSelection(products: BaseProduct[]): void;
export declare function insertShopTemplateFilters(products: BaseProduct[], type: string | null, gender?: string, color?: string, size?: string): void;
//# sourceMappingURL=templates.d.ts.map