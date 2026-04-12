
import type { Variant } from "./interfaces";


//generate id 
export function generateId(): string  {
    const value = Math.random().toString(32).substring(2, 9);

    return value

}



//----------LOG IN SECTION--------------------------------------------------


// global state page login to admin login and standard user
let isAdminLogin = false;

export function setAdminLogin(value: boolean) {
    isAdminLogin = value;
}

export function getAdminLogin() {
    return isAdminLogin;
}


//---------------ADMIN SECTION--------------------------------------------------



//translation
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




export const translate = {
    size: sizeTranslations,
    color: colorTranslations,
};