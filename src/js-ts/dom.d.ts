import { Cliente } from "./interfaces";
import type { BaseProduct } from "./interfaces";
export declare function cleanSection(sectionId: string): void;
export declare function changeTextContent(elementId: string, text: string): void;
export declare function showPopUp(title: string, message: string): void;
export declare function addCloseButton(containerId: string): void;
export declare function showPopUpSelection(title: string, message: string, checkright: string, checkleft: string): void;
export declare function disableDropdown(dropdownId: string, bool: boolean): void;
export declare function showHidden(subMenuId: string): void;
export declare function genderMenu(valueDropdown: string): void;
export declare function createTable(products: BaseProduct[]): void;
export declare function checkedFilterShop(check: HTMLElement, allElement: NodeListOf<HTMLElement>): string | "";
export declare function setSumTotCart(products: ReturnType<Cliente['getDetailedCart']>): void;
//# sourceMappingURL=dom.d.ts.map