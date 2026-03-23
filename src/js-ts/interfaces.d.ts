export interface Variant {
    size: "xs" | "s" | "m" | "l" | "xl" | "2xl";
    color: "green" | "white" | "black" | "blue" | "pink" | "floral" | "multicolored";
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
export declare const RelaxWoman: BaseProduct[];
export interface RegisterForm {
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
export declare const reservedUsers: RegisterFormReservate[];
//# sourceMappingURL=interfaces.d.ts.map