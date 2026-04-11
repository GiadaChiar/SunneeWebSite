import type { BaseProduct } from "./interfaces";
import { Cliente } from './interfaces';
export declare function loadTemplates(): Promise<void>;
export declare function insertTemplate(sectionId: string, templateId: string): void;
export declare function insertProductClone(product: BaseProduct): void;
export declare function changeCartTemplate(cartItems: ReturnType<Cliente['getDetailedCart']>, idUser: string): void;
//# sourceMappingURL=templates.d.ts.map