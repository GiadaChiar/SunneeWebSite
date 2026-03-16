// I want to create an Interface for products standard

//general interface
interface BaseProduct {
    id:string; 
    size: "XS" | "S" | "M" | "L" | "XL"| "2XL" ;
    color: "green" | "white" | "black" | "blue" | "pink" | "floral" | "multicolored";
    state?: "unavailable"|"available";
    image: string;
    quantity:number; //opzional only if state available
}

//cap 
interface CapProduct extends BaseProduct {
    type: "cap";
    gender: "unisex";
}

//sarong
interface SarongProduct extends BaseProduct {
    type: "sarong";
    gender: "woman";
}

//swimsuit
interface SwimSuitProduct extends BaseProduct {
    type: "swimSuit-relax"|"swimSuit-sport"| "swimSuit-extreme";
    gender: "man" | "woman"; 

}



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