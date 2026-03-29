export interface Variant {
    size: "xs" | "s" | "m" | "l" | "xl" | "2xl";
    color: "green" | "white" | "black" | "blue" | "red" | "pink" | "floral" | "multicolored";
    quantity: number;
    state: "available" | "unavailable";
}
export interface BaseProduct {
    id: string;
    type: "cap" | "sarong" | "swimSuit-relax" | "swimSuit-sport" | "swimSuit-extreme";
    gender: "unisex" | "man" | "woman";
    prize: number;
    image: string;
    description: string;
    variants: Variant[];
}
export interface RegisterForm {
    id?: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    preferPayment: string;
}
export interface RegisterFormReservate {
    email: string;
    password: string;
}
export interface CartItem {
    productId: string;
    size: Variant["size"];
    color: Variant["color"];
    quantity: number;
}
export declare const reservedUsers: RegisterFormReservate[];
export declare const users: RegisterForm[];
export declare class Cliente {
    id: string;
    name: string;
    surname: string;
    email: string;
    preferPayment: string;
    private cart;
    constructor(data: RegisterForm);
    addToCart(item: CartItem, products: BaseProduct[]): void;
    removeFromCart(productId: string): void;
    getCart(): CartItem[];
    checkout(): void;
    getDetailedCart(products: BaseProduct[]): ({
        description: string;
        price: number;
        image: string;
        productId: string;
        size: Variant["size"];
        color: Variant["color"];
        quantity: number;
    } | null)[];
    loadCart(cartItems: CartItem[]): void;
}
//# sourceMappingURL=interfaces.d.ts.map