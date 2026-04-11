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
    id: string;
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
    userId: string;
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
export declare class Product {
    id: string;
    type: BaseProduct["type"];
    gender: BaseProduct["gender"];
    prize: number;
    image: string;
    description: string;
    variants: Variant[];
    constructor(data: BaseProduct);
    addVariant(variant: Variant): void;
    updateVariant(index: number, variant: Variant): void;
    removeVariant(index: number): void;
    isAvailable(): boolean;
}
export declare class ProductService {
    private static KEY;
    static getAll(): Product[];
    static saveAll(products: Product[]): void;
    static add(product: Product): void;
    static delete(id: string): void;
    static findById(id: string): Product | undefined;
}
//# sourceMappingURL=interfaces.d.ts.map