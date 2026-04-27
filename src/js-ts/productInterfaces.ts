import { ProductsDefault } from "./initProducts";



//general interface

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




//class to insert product 
export class Product {
    id: string;
    type: BaseProduct["type"];
    gender: BaseProduct["gender"];
    prize: number;
    image: string;
    description: string;
    variants: Variant[];

    constructor(data: BaseProduct) {
        this.id = data.id;
        this.type = data.type;
        this.gender = data.gender;
        this.prize = data.prize;
        this.image = data.image;
        this.description = data.description;
        this.variants = data.variants || [];
    }

    addVariant(variant: Variant) {
        this.variants.push(variant);
    }

    updateVariant(index: number, variant: Variant) {
        this.variants[index] = variant;
    }

    removeVariant(index: number) {
        this.variants.splice(index, 1);
    }

    isAvailable(): boolean {
        return this.variants.some(v => v.state === "available");
    }
}





//add products
export class ProductService {
    private static KEY = "products";

    static getAll(): Product[] {
        const data = JSON.parse(localStorage.getItem(this.KEY) || "[]");
        return data.map((p: any) => new Product(p));
    }

    static getLocalProducts(): BaseProduct[] {
        return JSON.parse(localStorage.getItem("products") || "[]");
    }


    static getAllProducts(): BaseProduct[] {
        const localproducts = ProductService.getLocalProducts();
        return [...ProductsDefault, ...localproducts];
    }


    static saveAll(products: Product[]) {
        localStorage.setItem(this.KEY, JSON.stringify(products));
    }

    static add(product: Product) {
        const products = this.getAll();
        products.push(product);
        this.saveAll(products);
    }

    static delete(id: string) {
        const products = this.getAll().filter(p => p.id !== id);
        this.saveAll(products);
    }

    static findById(id: string): Product | undefined {
        const found = ProductService.getAllProducts().find(p => p.id === id);
        return found ? new Product(found) : undefined;
    }

    static findQuantity(product: Product, color: string, size: string): number | undefined {
        const variant = product?.variants.find(
            v => v.color === color && v.size === size
        );

        return variant?.quantity
    }
}