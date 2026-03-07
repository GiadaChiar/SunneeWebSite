// I want to create an Interface for products standard

type Gender = "UOMO" | "DONNA" | "UNISEX";
type State = "available" | "unavailable";
type Size = "XS" | "S" | "M" | "L" | "2XL" | "3XL";
type Color = "green" | "white" | "black" | "blue" | "viola" | "floral" | "multicolored";



interface SwimSuitProduct {
    type: "swim-suit";
    subType: "RELAX" | "SPORT" | "EXTREME";
    gender: "MAN" | "WOMAN"; 
    id: string;
    size: Size;
    color: Color;
    state: State;
    image: string;
    quantity:number; //opzional only if state available
}

interface CapProduct {
    type: "cap";
    subType: "CAP";
    gender: "UNISEX"; // tutti unisex
    id: string;
    size: Size;
    color: Color;
    state: State;
    image: string;
    quantity:number; //opzional only if state available
}

interface PareoProduct {
    type: "sarong";
    subType: "SARONG";
    gender: "WOMAN"; // solo donna
    id: string;
    size: Size;
    color: Color;
    state: State;
    image: string;
    quantity:number; //opzional only if state available
}

type Product = SwimSuitProduct | CapProduct | PareoProduct;

const products: Product[] = [/*
    { type: "swim-suit", subType: "RELAX", gender: "WOMAN", id: "001", size: "M", color: "blue", state: "available" },
    { type: "swim-suit", subType: "SPORT", gender: "WOMAN", id: "002", size: "S", color: "floral", state: "available" },
    { type: "cap", subType: "CAP", gender: "UNISEX", id: "003", size: "M", color: "black", state: "available" },
    { type: "sarong", subType: "SARONG", gender: "WOMAN", id: "004", size: "L", color: "multicolored", state: "unavailable" },
    */
    { type: "swim-suit", subType: "RELAX", gender: "WOMAN", id: "001", size: "M", color: "white", state: "available", image:".\style\img\bikini_bianco.jpg",quantity: 5 },
    
];  