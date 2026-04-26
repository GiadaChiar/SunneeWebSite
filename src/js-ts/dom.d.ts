import type { BaseProduct } from "./productInterfaces";
import type { ShopClient } from "./cartInterfaces";
export declare function cleanSection(sectionId: string): void;
export declare function changeTextContent(elementId: string, text: string): void;
export declare function showPopUp(title: string, message: string): void;
export declare function addCloseButton(containerId: string): void;
export declare function showPopUpSelection(title: string, message: string, checkright: string, checkleft: string): void;
export declare function disableDropdown(dropdownId: string, bool: boolean): void;
export declare function showHidden(subMenuId: string): void;
export declare function genderMenu(valueDropdown: string): void;
export declare function initGenericDropdown(target: HTMLElement, dropdownId: string, buttonId: string): void;
export declare function getDropdownValue(buttonId: string): string | null;
export declare function createTable(products: BaseProduct[]): void;
export declare function checkedFilterShop(check: HTMLElement, allElement: NodeListOf<HTMLElement>): string | "";
export declare function handleAdd(addButton: HTMLButtonElement | null, ctx: any, productsCart: any[]): void;
export declare function handleLess(lessButton: HTMLButtonElement | null, ctx: any, productsCart: any[]): void;
export declare function handleDelete(deleteButton: HTMLButtonElement | null, ctx: any, userLogId: string): void;
export declare function setSumTotCart(products: ReturnType<ShopClient['getDetailedCart']>): void;
//# sourceMappingURL=dom.d.ts.map