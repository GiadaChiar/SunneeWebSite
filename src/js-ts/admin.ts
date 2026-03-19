
import '../style/admin.scss';
import '../style/poUp.scss';
import { changeTextContent, showPopUp, showPopUpSelection, cleanSection } from "./dom"
//console.log("TEMPLATES:", templates);
import { loadTemplates } from "./templates"
import { handleCheckBoxtPoPUp } from "./events"
import { insertTemplate } from "./templates";
import type { Variant, BaseProduct } from "./interfaces";


//you have to resolve import template 

//variabili globali 
let selectedType: string = "";
let selectedSize: string = "";
let selectedQuantity: number = 0;
let selectedColor: string = "";
let selectedState: string = "";
let selectedImage: string = "";
let selectedeId: string = "";
let selectedGender: string = "";
let selectedDescription: string = "";




//----check inmput -------------//
function checkInputQuantity() {
    const quantityInput = document.getElementById("quantityInput") as HTMLInputElement;
    quantityInput?.addEventListener("input", () => {
        let valueQuantity = quantityInput.value
        let valueQuantityCheck = valueQuantity.replace(/[^0-9]/g, '')
        if (valueQuantity !== valueQuantityCheck) {
            showPopUp("Inserimento Errato", "Inserisci come quantità un numero intero")
            valueQuantity = ""
        } else {
            selectedQuantity = Number(valueQuantityCheck)
            return selectedQuantity
        }

        console.log("valore inserito", valueQuantity)
    })
}



function checkDescriptionInput() {
    const descriptionInput = document.getElementById("descriptionInput") as HTMLInputElement
    descriptionInput?.addEventListener("input", () => {
        let description = descriptionInput.value
        if (description) {
            selectedDescription = description
        }
    })

}




function checkInputImage() {
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;
    imageInput?.addEventListener("input", () => {
        let pathImage = imageInput.value
        selectedImage = pathImage.replace("C:\\fakepath\\", "");
        return selectedImage;
    })
}





//---------------------------------check dropdown----------------//

function showHidden(subMenuId: string) {
    const subMenu = document.getElementById(subMenuId)
    if (subMenu) {
        if (subMenu.dataset.show === "none") {
            subMenu.dataset.show = "see"
        } else {
            subMenu.dataset.show = "none"
        }
    }

}



function disableDropdown(dropdownId: string, bool: boolean) {
    const dropdownButton = document.getElementById(dropdownId) as HTMLButtonElement;
    if (dropdownButton) {
        dropdownButton.disabled = bool; // disabilita
    }
}



function generateId(): string {
    selectedeId = Math.random().toString(32).substring(2, 9);
    console.log("selectedeId:", selectedeId);
    return selectedeId

}




function genderMenu(valueDropdown: string) {
    if (valueDropdown === "sarong") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "donna");
        selectedGender = "woman";
        return;
    }
    if (valueDropdown === "cap") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "unisex");
        selectedGender = "unisex";
        return;
    }

    disableDropdown("dropdownButtonGender", false)
    checkDropdown("genderDropdown", "dropdownButtonGender");

}




// Funzione che gestisce il valore selezionato
function handleSelectedValueType(valueType: string, nameType: string) {
    console.log("Valore selezionato:", valueType);
    console.log("Nome selezionato:", nameType);
    changeTextContent("dropdownButtonType", nameType)
    genderMenu(valueType)
    /*selectedType = valueType
                return selectedType */

}




function checkTypeDropdown() {
    const buttonType = document.getElementById("typeDropdown");

    buttonType?.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.classList.contains("dropdown-item")) {

            const nameDropdown = target.getAttribute("name") || "";
            let valueDropdown = target.getAttribute("value") || "";

            if (valueDropdown == "swimSuit") {
                event.preventDefault();//still open
                event.stopPropagation();
                showHidden("submenuType");
            }
            if (target.closest("#submenuType")) {
                const nameUnderMenu = target.getAttribute("name") || "";
                let valueUnderMenu = target.getAttribute("data-value") || "";
                handleSelectedValueType(valueUnderMenu, nameUnderMenu)
                selectedType = valueUnderMenu
                return selectedType
            }
            if (valueDropdown !== "swimSuit" && valueDropdown !== null && nameDropdown !== null) {
                handleSelectedValueType(valueDropdown, nameDropdown)
                selectedType = valueDropdown
                return selectedType
            }
        }
    })
}






//change text in base selection except type and geneder

function checkDropdown(dropdownId: string, buttonId: string) {
    if (dropdownId !== "typeDropdown") {

        const buttonType = document.getElementById(dropdownId);

        buttonType?.addEventListener("click", (event) => {
            const target = event.target;
            if (target instanceof HTMLElement && target.classList.contains("dropdown-item")) {

                const nameDropdown = target.getAttribute("name") || "";
                let valueDropdown = target.getAttribute("value") || "";

                changeTextContent(buttonId, nameDropdown)
                if (dropdownId === "sizeDropdown") {
                    selectedSize = valueDropdown
                    return selectedSize
                }
                if (dropdownId === "colorDropdown") {
                    selectedColor = valueDropdown
                    return selectedColor
                }
                if (dropdownId === "stateDropdown") {
                    selectedState = valueDropdown
                    return selectedState
                }
                if (dropdownId === "genderDropdown") {
                    selectedGender = valueDropdown
                    return selectedGender
                }

            }
        })
    }
}




///if I click on save button I want all values to insert into interface
async function insertProduct() {
    console.log("VALORI DI RITORNO:");
    console.log("selectedType:", selectedType);
    console.log("selectedSize:", selectedSize);
    console.log("selectedColor:", selectedColor);
    console.log("selectedState:", selectedState);
    console.log("selectedGender:", selectedGender);
    console.log("selectedQuantity:", selectedQuantity);
    console.log("selectedImage:", selectedImage);
    console.log("selectedeId:", selectedeId);
    console.log("selectedDescription:", selectedDescription);

    // Array dei prodotti già salvati
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");

    // Cerco se il prodotto esiste già (stesso tipo e genere)

    let product = existingProducts.find(p => p.type === selectedType && p.gender === selectedGender && p.image === selectedImage && p.description === selectedDescription);

    const variant = {
        size: selectedSize as Variant["size"],
        color: selectedColor as Variant["color"],
        quantity: selectedQuantity,
        state: selectedState as "available" | "unavailable"
    };

    if (product) {
        const variantExists = product.variants.some(v => v.size === variant.size && v.color === variant.color);
        if (variantExists) {
            showPopUpSelection("Attenzione", "Prodotto già esistente, procedere con la modifica?", "SI", "NO")

            const choice = await handleCheckBoxtPoPUp();
            if (choice === "no") return
            //if yes
            product.variants = product.variants.map(v =>
                v.size === variant.size && v.color === variant.color ? { ...v, quantity: variant.quantity, state: variant.state } : v
            );
            showPopUp("Nessun aggiornamneto", "L'articolo è già presente e non vi sono modifiche")

        } else {
            // Aggiungo nuova variante
            product.variants.push(variant);
            showPopUp("Aggiornamento", "Modifica /Inserimeto effettuato correttamente")

        }
    } else {
        // Creo un nuovo prodotto con la variante
        product = {
            id: selectedeId,
            type: selectedType as BaseProduct["type"],
            gender: selectedGender as BaseProduct["gender"],
            image: selectedImage,
            description: selectedDescription,
            variants: [variant]
        };
        existingProducts.push(product);
        console.log("Nuovo prodotto creato:", product);
    }
    localStorage.setItem("products", JSON.stringify(existingProducts));
    console.log(existingProducts)

}

//create table 
function createTable(products: BaseProduct[]) {

    const existingTable = document.getElementById("tableTemplateShow")
    if (existingTable) {
        cleanSection("tableHTML")
    }
    insertTemplate("tableHTML", "tableTemplate");
    /*let products = localStorage.getItem("products")
    console.log(products)*/
    const productsSection = document.getElementById("products-table")

    if (!productsSection) return

    //const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    products.forEach(product => {

        const tr = document.createElement("tr");
        tr.classList.add("table-success");
        tr.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.type}</td>
            <td>${product.gender}</td>
            <td><img src="../img/${product.image}" width="50"</td>
            <td>${product.description}</td>
        </tr>
        `;
        productsSection.append(tr)

        product.variants.forEach(variant => {
            productsSection.innerHTML += `
        <tr>
            <td>${"Variabile"}</td>
            <td>${variant.size}</td>
            <td>${variant.color}</td>
            <td>${variant.quantity}</td>
            <td>${variant.state}</td>
        </tr>
        `;
        });
        //<td><img src="${product.image}" width="50"</td>
        console.log(product.id)
    })

    console.log(products)

}





function eventSave() {
    const form = document.getElementById("dropdwons") as HTMLFormElement;;

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();
            const isValid =
                selectedType &&
                selectedSize &&
                selectedColor &&
                selectedGender &&
                selectedImage &&
                selectedDescription &&
                selectedQuantity > 0;

            if (isValid) {
                if (!selectedState) {
                    selectedState = selectedQuantity > 0 ? "available" : "unavailable";
                }
                generateId()
                insertProduct()
            } else {
                showPopUp("Errore", "Compila tutti i campi obbligatori")
            }
        });
    }
}



//function search elements
function serachProducts() {
    const searchButton = document.getElementById("submitSearch")
    searchButton?.addEventListener("click", () => {
        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
        createTable(products);
    })
}


function searchIdProduct() {
    const searchButton = document.getElementById("searchById")
    const insertIdSearch = document.getElementById("searchIdInput") as HTMLInputElement

    searchButton?.addEventListener("click", () => {
        let insertId = insertIdSearch.value.trim();
        if (!insertId) return;

        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
        const existingProduct = products.find(p => p.id === insertId)
        if (existingProduct) {
            createTable([existingProduct]);
        } else {
            showPopUp("Errore", "Prodotto non trovato, id errato o inesistente");
        }

    })
}





/// clean products 
export function cleanProducts() {
    localStorage.removeItem("products")
    console.log("Prodotti eliminati")
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    console.log("rimasti:", existingProducts)
}






document.addEventListener("DOMContentLoaded", async () => {

    await loadTemplates();
    //cleanProducts();

    //desable dropdown gender
    disableDropdown("dropdownButtonGender", true)
    checkTypeDropdown();
    checkDropdown("sizeDropdown", "dropdownButtonSize");
    checkDropdown("colorDropdown", "dropdownButtonColor");
    checkDropdown("stateDropdown", "dropdownButtonState");
    checkInputQuantity();
    checkDescriptionInput();
    checkInputImage();
    eventSave();
    serachProducts();
    searchIdProduct();

});






























