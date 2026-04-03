import { Cliente } from './interfaces';
export declare function setUpNewSection(eventId: string, sectionId: string, templateId: string): void;
export declare function removeElementHtm(): void;
export declare function preventSubmitLogIn(): void;
export declare function handleCheckBoxtPoPUp(): Promise<"yes" | "no">;
export declare function cartSetNumberProduct(userLogId: string, productsCart: ReturnType<Cliente['getDetailedCart']>): void;
export declare function clickToOrderCart(sectionId: string): void;
//# sourceMappingURL=events.d.ts.map