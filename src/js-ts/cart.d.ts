import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';
import '../style/cart.scss';
import '../style/poUp.scss';
import { ShopClient } from "./cartInterfaces";
export declare function buildCartContext(event: Event, userLogId: string): {
    target: HTMLElement;
    clone: HTMLElement;
    cliente: ShopClient;
    addButton: HTMLButtonElement | null;
    lessButtonClick: HTMLButtonElement | null;
    deleteButton: HTMLButtonElement | null;
    quantityElement: HTMLElement;
    textQuantity: number;
    allProducts: import("./productInterfaces").BaseProduct[];
} | null;
//# sourceMappingURL=cart.d.ts.map