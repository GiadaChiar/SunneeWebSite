import type { BaseProduct } from './productInterfaces';
import { ShopClient } from "./cartInterfaces";
export declare function logInListenerClick(): void;
export declare function submitLogIn(): void;
export declare function setUpNewSection(eventId: string, sectionId: string, templateId: string): void;
export declare function initTypeDropdown(): void;
export declare function initGlobalClickListener(): void;
export declare function handleFormSubmit(): void;
export declare function handleCheckBoxtPoPUp(): Promise<"yes" | "no">;
export declare function setupColorSelection(products: BaseProduct[]): void;
export declare function cartSetNumberProduct(userLogId: string, productsCart: ReturnType<ShopClient['getDetailedCart']>): void;
export declare function clickToOrderCart(): void;
//# sourceMappingURL=events.d.ts.map