import type { ShopClient } from "./cartInterfaces";
import type { BaseProduct } from "./productInterfaces";
export declare function loadTemplates(): Promise<void>;
export declare function insertTemplate(sectionId: string, templateId: string): void;
export declare function insertProductClone(product: BaseProduct): void;
export declare function changeCartTemplate(cartItems: ReturnType<ShopClient['getDetailedCart']>, idUser: string): void;
//# sourceMappingURL=templates.d.ts.map