
import type { Variant } from "./interfaces";


//generate id 
export function generateId(): string | null {
    const value = Math.random().toString(32).substring(2, 9);
    console.log("NUMERO GENERATO", value)
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
/*
export let selectedType: string | null = null;
export let selectedSize: string | null = null;
export let selectedColor: string | null = null;
export let selectedGender: string | null = null;
export let selectedState: string | null = null;
export let selectedQuantity: number | null = null;
export let selectedPrize: number | null = null;
export let selectedDescription: string | null = null;
export let selectedImage: string | null = null;
export let selectedId: string | null = null;
export let selectedValue: string | null = null;

*/

export let selectedValues = {
    selectedType: null as string | null,
    selectedSize: null as string | null,
    selectedColor: null as string | null,
    selectedGender: null as string | null,
    selectedState: null as string | null,
    selectedQuantity: null as number | null,
    selectedPrize: null as number | null,
    selectedDescription: null as string | null,
    selectedImage: null as string | null,
    selectedId: null as string | null,
    selectedValue: null as string | null
};



//














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