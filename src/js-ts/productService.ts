
import type { BaseProduct } from "./interfaces";
import { showPopUp,showPopUpSelection } from "./dom";
import { generateId } from "./utils";
import { handleCheckBoxtPoPUp} from "./events";
//Service about products 



//----------------------------LOGIN SECTION ---------------------------

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
        // Prodotto nuovo
        productData.id = generateId();
        existingProducts.push(productData);
        showPopUp("Inserimento", "Prodotto inserito correttamente");
    }

    localStorage.setItem("products", JSON.stringify(existingProducts));
}



//--------------------------------SHOP SECTION------------------------------


//check if the product color is available

export function checkColorCardShop(products: BaseProduct[], target: HTMLInputElement, clone: HTMLElement): string | "" {
    if (!clone) return "";

    const productId = target.name.replace("color-", "");

    const product = products.find(p => p.id === productId);
    if (!product) return "";


    console.log("Colore selezionato:", target.value);
    //find id product 

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



