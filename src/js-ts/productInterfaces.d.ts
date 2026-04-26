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
    static getLocalProducts(): BaseProduct[];
    static getAllProducts(): BaseProduct[];
    static saveAll(products: Product[]): void;
    static add(product: Product): void;
    static delete(id: string): void;
    static findById(id: string): Product | undefined;
    static findQuantity(product: Product, color: string, size: string): number | undefined;
}
//# sourceMappingURL=productInterfaces.d.ts.map