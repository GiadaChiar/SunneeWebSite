import { Cliente } from './interfaces';
import type { BaseProduct } from './interfaces';
export declare function preventSubmitLogIn(): void;
export declare function handleCheckBoxtPoPUp(): Promise<"yes" | "no">;
export declare function setReservateLogIn(): void;
export declare function submitLogIn(): void;
export declare function setUpNewSection(eventId: string, sectionId: string, templateId: string): void;
export declare function initTypeDropdown(): void;
export declare function initDropdown(dropdownId: string, buttonId: string): void;
export declare function getInsertOptions(): void;
export declare function initSearchSection(): void;
export declare function setupColorSelection(products: BaseProduct[]): void;
export declare function cartSetNumberProduct(userLogId: string, productsCart: ReturnType<Cliente['getDetailedCart']>): void;
export declare function clickToOrderCart(sectionId: string): Promise<void>;
//# sourceMappingURL=events.d.ts.map