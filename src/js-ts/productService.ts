import { genderMenu, getDropdownValue, showPopUp, showPopUpSelection } from "./dom"
import { checkInputQuantity, checkPrizeInput, checkDescriptionInput, checkInputImage } from "./validations";
import type { BaseProduct, Variant } from "./productInterfaces";
import { generateId } from "./utils";
import { handleCheckBoxtPoPUp } from "./events"



//--------------------ADMIN SECTION -------------------------------------------------------------
// BUILD PRODUCT
// ----------------------
export function buildProductFromForm(): BaseProduct | null {

    const type = getDropdownValue("dropdownButtonType");

    if (!type) return null;

    genderMenu(type);
    const gender = getDropdownValue("dropdownButtonGender");

    const size = getDropdownValue("dropdownButtonSize");
    const color = getDropdownValue("dropdownButtonColor");
    const state = getDropdownValue("dropdownButtonState");

    const quantity = checkInputQuantity();
    const prize = checkPrizeInput();
    const description = checkDescriptionInput();
    const image = checkInputImage();


    if (
        !type || !size || !color || !gender ||
        quantity === null || prize === null || !description || !image
    ) {
        return null;
    }
    alert("prodotto creatoooooo")
    return {
        id: generateId(),
        type: type as BaseProduct["type"],
        gender: gender as BaseProduct["gender"],
        prize,
        image,
        description,
        variants: [
            {
                size: size as Variant["size"],
                color: color as Variant["color"],
                quantity,
                state: (state as Variant["state"]) || (quantity > 0 ? "available" : "unavailable")
            }
        ]
    };
}



//check product 

//insert prpoduct or variable

export async function insertProduct(productData: BaseProduct) {
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");

    const newVariant = productData.variants[0];
    // find product 
    let product = existingProducts.find(p =>
        p.type === productData.type &&
        p.gender === productData.gender &&
        p.image === productData.image &&
        p.description === productData.description
    );

    if (product && newVariant) {
        const variantExists = product.variants.some(v => v.size === newVariant.size && v.color === newVariant.color);
        const priceChanged = Number(product.prize) !== Number(productData.prize);

        if (variantExists || priceChanged) {
            showPopUpSelection("Attenzione", "Prodotto già esistente, procedere con la modifica?", "SI", "NO");
            const choice = await handleCheckBoxtPoPUp();
            if (choice !== "yes") return;

            if (variantExists) {
                product.variants = product.variants.map(v =>
                    v.size === newVariant.size && v.color === newVariant.color
                        ? { ...v, quantity: newVariant.quantity, state: newVariant.state }
                        : v
                );
            } else {
                product.variants.push(newVariant);
            }

            if (priceChanged) product.prize = Number(productData.prize);

            showPopUp("Aggiornamento", "Prodotto aggiornato correttamente");

        } else {
            product.variants.push(newVariant);
            showPopUp("Aggiornamento", "Nuova variante aggiunta correttamente");
        }

    } else {
        // New product
        productData.id = generateId();
        existingProducts.push(productData);
        showPopUp("Inserimento", "Prodotto inserito correttamente");
    }

    localStorage.setItem("products", JSON.stringify(existingProducts));
}



//-------------------SHOP SECTION ---------------------------------------------


// check selected radio button clicked
export function getSelectedColor(
    target: HTMLElement,
    clone: HTMLElement,
    products: BaseProduct[]
): string {
    let selectedColor =
        clone?.querySelector<HTMLInputElement>('input.check-shop-color:checked')?.value || "";

    if (target?.classList.contains("check-shop-color") && (target as HTMLInputElement).type === "radio") {
        selectedColor = checkColorCardShop(products, target as HTMLInputElement, clone);
    }

    return selectedColor;
}




//check if the product color is available

function checkColorCardShop(products: BaseProduct[], target: HTMLInputElement, clone: HTMLElement): string | "" {
    if (!clone) return "";

    const productId = target.name.replace("color-", "");
    const product = products.find(p => p.id === productId);

    if (!product) return "";

    // update size
    const sizeButtons = clone.querySelectorAll<HTMLButtonElement>(".filter-btn");

    sizeButtons.forEach(button => {
        const sizeValue = button.dataset.value;
        const available = product.variants.some(
            v => v.size === sizeValue && v.color === target.value
        );
        button.dataset.state = available ? "available" : "unavailable";

    });
    return target.value

}



