// I want to create an Interface for products standard

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



///CLIENT INTERFACE 
export interface RegisterForm {
    id?: string
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


export const users: RegisterForm[] = [
    {
        "id" : "jugriut",
        "name": "Giovanni",
        "surname": "Francese",
        "email": "jjovany@gmail.com",
        "preferPayment": "card",
        "password": "jjova908@"
    },
    {
        "id": "g3rt1tk",
        "name": "Samanta",
        "surname": "Rosie",
        "email": "rosiesam@gmail.com",
        "preferPayment": "card", "password": "A9b!cD3e"
    },
    {

        "id": "k0xv2oa",
        "name": "Roberto",
        "surname": "Rossi",
        "email": "robertorossi@gmail.com",
        "preferPayment": "paypal",
        "password": "Rob124@ll"
    },
    {   
        "id": "m7rj4tz",
        "name": "Luca",
        "surname": "De Martino",
        "email": "demartyluca@gmail.com",
        "preferPayment": "bank",
        "password": "popodim1@"
    },
    {   
        "id": "k9xv2qa",
        "name": "Sara",
        "surname": "Virgo",
        "email": "virgosara@gmail.com",
        "preferPayment": "card",
        "password": "sarh888@"
    }

]