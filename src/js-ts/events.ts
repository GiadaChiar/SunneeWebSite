
//event functions

import { cleanSection, changeTextContent, setAdminLogin, checkUserLogin, submitLogIn, showPopUp } from "./dom";
import { Cliente } from './interfaces';
import { insertTemplate } from "./templates";
import { ProductsDefault } from './initProducts';
import type {  BaseProduct, Variant } from './interfaces';







//check event for registration 
export function setUpNewSection(eventId: string, sectionId: string, templateId: string) {

    const linkClicked = document.getElementById(eventId);

    if (!linkClicked) {
        console.error("Link not found");
        return;
    }

    linkClicked.addEventListener("click", (event) => {

        event.preventDefault();

        insertTemplate(sectionId, templateId);

    });

}



//function to remuve elements if I click on reservate area
export function removeElementHtm() {
    const linkReservateArea = document.getElementById("buttonLinkHTML") as HTMLElement | null;
    //click 
    linkReservateArea?.addEventListener("click", function () {
        cleanSection("buttonLinkHTML");
        cleanSection("checksection");
        cleanSection("newRegistration");
        cleanSection("forgotPassword");
        changeTextContent("titleLogIn", "Accesso Riservato:");
        setAdminLogin(true);
        submitLogIn();
    })

}






export function preventSubmitLogIn() {
    const registrationForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;
    registrationForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        checkUserLogin();
    });

}






//listener su cart ogni cart + e - 
//<div class="container-cart">
/*
<div class="add-remove">
                        <button class="bnt-less disable">-</button>
                        <h1 class="quantity">1</h1>
                        <button class="bnt-add anable">+</button>
                    </div>
*/














///PopUpSelect the box listener
export function handleCheckBoxtPoPUp(): Promise<"yes" | "no"> {
    return new Promise((resolve) => {
        // prendi il popup appena inserito
        const popup = document.getElementById("custom-popup");
        if (!popup) return;

        // prendi i checkbox dentro questo popup
        const checkRight = popup.querySelector("#popUCheckright") as HTMLInputElement;
        const checkLeft = popup.querySelector("#popUCheckleft") as HTMLInputElement;
        const saveButton = popup.querySelector("#saveCheck") as HTMLButtonElement;

        saveButton?.addEventListener("click", (event) => {
            event.preventDefault();
            if (checkRight.checked) resolve("yes")
            else resolve("no");
            cleanSection("PopUpHtml");
            // Risolvo la promise con true se il checkbox destro è selezionato, altrimenti false
            /*const isRightChecked = checkRight.checked;
            const isLeftChecked = checkLeft.checked;*/

        });

    })
}




/*
export function cartSetNumberProduct(cliente?: Cliente) {
    const sectionCart = document.getElementById("cartSection")
    if (!sectionCart) return

    console.log("okkk")

    sectionCart?.addEventListener("click", (event) => {


        const target = event.target as HTMLElement;

        const addButton = target.closest(".bnt-add") as HTMLButtonElement | null;
        const clikedLessButton = target.closest(".bnt-less") as HTMLButtonElement | null;
        const clone = target.closest(".container-cart") as HTMLElement | null;
        const deleteButton = target.closest(".btn-close") as HTMLButtonElement | null
        const savedCart = sessionStorage.getItem("cart");
        
        
        if (!clone) return
        let quantityElement = clone.querySelector(".quantity") as HTMLElement | null;
        if (!quantityElement) return

        let textQuantity = parseInt(quantityElement.textContent || "0");
        const lessButton = clone.querySelector(".bnt-less") as HTMLButtonElement | null;
        console.log("Quantità standard:", textQuantity)

        if (addButton) {
            textQuantity++;
            //quantityElement?.textContent = quantityNumebr.toString();
            console.log("BOTTONE +++ TROVATOOO", textQuantity)
            quantityElement.textContent = textQuantity.toString()
            if (textQuantity > 1 && lessButton && lessButton.classList.contains("disable")) {
                lessButton.classList.remove("disable")
                lessButton.classList.add("anable")
            }


        } if (clikedLessButton && textQuantity > 1) {
            textQuantity--;
            quantityElement.textContent = textQuantity.toString();
            if (textQuantity <= 1 && lessButton) {
                lessButton.classList.remove("anable")
                lessButton.classList.add("disable");
            }
        }

        //if I click delete btn 
            if (deleteButton) {
                if (!clone) return;
                console.log("DELETE BUTTON cliccato!");
                const productId = clone.dataset.id;
                console.log("INIZIOOOO  CARRELLO",savedCart)
                if (productId){
                    console.log("Idprodotto da eliminare:",productId)
                    clone.remove();
                    if (cliente){
                        cliente.removeFromCart(productId);
                        console.log("Rimasti nelcarrello", savedCart)
                    } 
                }
                
                return
            }



    })
}
*/



export function cartSetNumberProduct(cliente?: Cliente) {
    const sectionCart = document.getElementById("cartSection")
    if (!sectionCart) return

    console.log("okkk")

    sectionCart?.addEventListener("click", (event) => {


        const target = event.target as HTMLElement;

        const addButton = target.closest(".bnt-add") as HTMLButtonElement | null;
        const clikedLessButton = target.closest(".bnt-less") as HTMLButtonElement | null;
        const clone = target.closest(".container-cart") as HTMLElement | null;
        const deleteButton = target.closest(".btn-close") as HTMLButtonElement | null
        const savedCart = sessionStorage.getItem("cart");
        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
        const allProducts: BaseProduct[] = [...ProductsDefault, ...products];
        
        if (!clone) return
        let quantityElement = clone.querySelector(".quantity") as HTMLElement | null;
        if (!quantityElement) return

        let textQuantity = parseInt(quantityElement.textContent || "0");
        const lessButton = clone.querySelector(".bnt-less") as HTMLButtonElement | null;
        console.log("Quantità standard:", textQuantity)

        if (addButton) {
        const productId = clone.dataset.id;
        const productSize = clone.dataset.size;
        const productColor = clone.dataset.color;
        console.log("Quantità da catalogo disponibile:", productId,productColor,productSize)

        const product = allProducts.find(p => p.id === productId)
        if(product){
            const selectedProduct = product.variants.find(v=> v.color === productColor && v.size === productSize)
            const quantityProduct = selectedProduct?.quantity
            console.log("Quantità disponibile:", quantityProduct)

            if(quantityProduct && textQuantity >= quantityProduct){
                console.log("Prodotto disponibile:",quantityProduct,"Prodotto ordinabile >= ",textQuantity)
                addButton.classList.remove("anable")
                addButton.classList.add("disable");
                console.log("   Quantità non disponible ");
                showPopUp("Attenzione", "E' stato raggiunto il numero massimo di prodotti disponibili")
                return;

            }
        }

            textQuantity++;
            //quantityElement?.textContent = quantityNumebr.toString();
            console.log("BOTTONE +++ TROVATOOO", textQuantity)
            quantityElement.textContent = textQuantity.toString()
            if (textQuantity > 1 && lessButton && lessButton.classList.contains("disable")) {
                lessButton.classList.remove("disable")
                lessButton.classList.add("anable")
            }


        } if (clikedLessButton && textQuantity > 1) {
            textQuantity--;
            quantityElement.textContent = textQuantity.toString();
            if (textQuantity <= 1 && lessButton) {
                lessButton.classList.remove("anable")
                lessButton.classList.add("disable");
            }
        }

        //if I click delete btn 
            if (deleteButton) {
                if (!clone) return;
                console.log("DELETE BUTTON cliccato!");
                const productId = clone.dataset.id;
                console.log("INIZIOOOO  CARRELLO",savedCart)
                if (productId){
                    console.log("Idprodotto da eliminare:",productId)
                    clone.remove();
                    if (cliente){
                        cliente.removeFromCart(productId);
                        console.log("Rimasti nelcarrello", savedCart)
                    } 
                }
                
                return
            }



    })
}
