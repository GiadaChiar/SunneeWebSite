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
    prize: number;
    image: string;
    description: string;
    variants: Variant[];

}

//CREATE STANDARD  PRODUCTS 
export const RelaxWoman: BaseProduct[] = [
    {
        id: "0g0551r",
        type: "swimSuit-relax",
        gender: "woman",
        prize: 56.8,
        image: "bikini_verde.jpg",
        description: "bikini verde intenso",
        variants: [
            { size: "xs", color: "green", quantity: 25,  state: "available" },
            { size: "s", color: "green", quantity: 20, state: "available" },
            { size: "m", color: "green", quantity: 14,  state: "available" },
            { size: "l", color: "green", quantity: 10,  state: "available" },
        ]
    },
    {
        id: "5n4fv94",
        type: "swimSuit-relax",
        gender: "woman",
        prize: 56.8,
        image: "bikini_verde.jpg",
        description: "bikini verde intenso",
        variants: [
            { size: "xs", color: "green", quantity: 25, state: "available" },
            { size: "s", color: "green", quantity: 20, state: "available" },
            { size: "m", color: "green", quantity: 14, state: "available" },
            { size: "l", color: "green", quantity: 10, state: "available" },
        ]
    },

];


///CLIENT INTERFACE 
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