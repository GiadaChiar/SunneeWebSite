
import type { Variant } from "./interfaces";


//generate id 
export function generateId(): string | null {
    const value = Math.random().toString(32).substring(2, 9);
    console.log("NUMERO GENERATO", value)
    return value

}



//traslation
// TYPES
type Size = Variant["size"];
type Color = Variant["color"];

// MAPPE
const sizeTranslations: Record<Size, string> = {
    xs: "XS",
    s: "S",
    m: "M",
    l: "L",
    xl: "XL",
    "2xl": "2XL",
};

const colorTranslations: Record<Color, string> = {
    green: "Verde",
    white: "Bianco",
    black: "Nero",
    blue: "Blu",
    red: "Rosso",
    pink: "Rosa",
    floral: "Floreale",
    multicolored: "Multicolore",
};




export const traslate = {
    size: sizeTranslations,
    color: colorTranslations,
};