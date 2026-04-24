import type { BaseProduct, Variant } from "./productInterfaces";
import type { RegisterForm } from "./userInterfaces";
export interface CartItem {
    userId: string;
    productId: string;
    size: Variant["size"];
    color: Variant["color"];
    quantity: number;
}
export declare class ShopClient {
    id: string;
    name: string;
    surname: string;
    email: string;
    preferPayment: string;
    private cart;
    constructor(data: RegisterForm);
    addToCart(item: CartItem, products: BaseProduct[], userId: string): void;
    removeFromCart(productId: string, color?: string, size?: string): void;
    cleanFromCart(UserId: string): void;
    getCart(): CartItem[];
    checkout(): void;
    getDetailedCart(products: BaseProduct[], loggedIdUser: string): ({
        description: string;
        price: number;
        image: string;
        userId: string;
        productId: string;
        size: Variant["size"];
        color: Variant["color"];
        quantity: number;
    } | null)[];
    updateCartItem(productId: string, color: string, size: string, quantity: number): void;
    loadCart(cartItems: CartItem[]): void;
}
//# sourceMappingURL=cartInterfaces.d.ts.map