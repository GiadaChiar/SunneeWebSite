// I want to create an Interface for products standard

//general interface

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
    image: string;
    description: string;
    variants: Variant[];
    
}


/*
export interface BaseProduct {
    id:string; 
    size: "xs" | "s" | "m" | "l" | "xl"| "2xl" ;
    color: "green" | "white" | "black" | "blue" | "pink" | "floral" | "multicolored";
    state?: "unavailable"|"available";
    image: string;
    quantity:number; //opzional only if state available
}

//cap 
export interface CapProduct extends BaseProduct {
    type: "cap";
    gender: "unisex";
}

//sarong
export interface SarongProduct extends BaseProduct {
    type: "sarong";
    gender: "woman";
}

//swimsuit
export interface SwimSuitProduct extends BaseProduct {
    type: "swimSuit-relax"|"swimSuit-sport"| "swimSuit-extreme";
    gender: "man" | "woman"; 

}
*/


///CLIENT INTERFACE 
export interface RegisterForm {
    name: string;
    surname: string;
    email: string;
    password?: string;
    preferPayment:string;
}


export interface RegisterFormReservate {
    email: string;
    password: string;
}


export const reservedUsers: RegisterFormReservate[] = [
    {
        email: "admin@site.com",
        password: "admin123"
    },
    {
        email: "manager@site.com",
        password: "manager123"
    }
];