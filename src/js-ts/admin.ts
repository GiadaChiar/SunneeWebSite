
import '../style/admin.scss';
import '../style/poUp.scss';
import { changeTextContent, showPopUp, showPopUpSelection, cleanSection } from './dom';
//console.log("TEMPLATES:", templates);
import { loadTemplates,insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events";
import type { Variant, BaseProduct } from "./interfaces";
import { setUpMenu,getTypeandDataFilterMenu } from './menu';



///modifica da testo a valore 


let selectedType: string | null = null;
let selectedSize: string | null = null;
let selectedColor: string | null = null;
let selectedGender: string | null = null;
let selectedState: string | null = null;
let selectedQuantity: number | null = null;
let selectedPrize: number | null = null;
let selectedDescription: string | null = null;
let selectedImage: string | null = null;
let selectedId: string | null = null;
let selectedValue: string | null = null;



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
        //header products
        const productHeader = document.createElement("tr");
        productHeader.classList.add("table-active");
        productHeader.innerHTML = `
            <td>Id</td>
            <td>Tipologia</td>
            <td>Genere</td>
            <td>Immagine</td>
            <td>Prezzo</td>
            <td>Descrizione</td>
            
        `;
        productsSection.append(productHeader)

        const tr = document.createElement("tr");
        tr.classList.add("table-success");
        tr.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.type}</td>
            <td>${product.gender}</td>
            <td><img src="../img/${product.image}" width="50"</td>
            <td>${product.prize}</td>
            <td>${product.description}</td>
        </tr>
        `;
        productsSection.append(tr)

        //header variants
        const variantHeader = document.createElement("tr");
        variantHeader.classList.add("table-secondary");
        variantHeader.innerHTML = `
            <td>Variabili</td>
            <td>Taglia</td>
            <td>Colore</td>
            <td>Quantità</td>
            <td>Stato</td>
            <td>-</td>
        `;

        productsSection.appendChild(variantHeader);



        product.variants.forEach(variant => {
            const variantRow = document.createElement("tr");
            variantRow.innerHTML += `
        <tr>
            <td>Caratteristiche:</td>
            <td>${variant.size}</td>
            <td>${variant.color}</td>
            <td>${variant.quantity}</td>
            <td>${variant.state}</td>
            <td>-</td>
        </tr>
        `;

            productsSection.appendChild(variantRow);
        });
        //<td><img src="${product.image}" width="50"</td>
        console.log(product.id)
    })

    console.log(products)

}




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



//no change text 
function getDropdownValue(buttonId: string): string | null {
    const button = document.getElementById(buttonId);

    if (!button || !button.textContent) return null;

    return button.textContent.trim();
}




function genderMenu(valueDropdown: string) {
    if (valueDropdown === "sarong") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "donna");
        selectedGender = "woman";
        return selectedGender;
    }
    if (valueDropdown === "cap") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "unisex");
        selectedGender ="unisex";
        return selectedGender;
    }

    disableDropdown("dropdownButtonGender", false)
    return null
    //checkDropdown("genderDropdown", "dropdownButtonGender");

}



function initTypeDropdown() {
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
                changeTextContent("dropdownButtonType", nameUnderMenu);
                genderMenu(valueUnderMenu)
                document.getElementById("dropdownButtonType")
    ?.setAttribute("data-value", valueUnderMenu);
                selectedType = valueUnderMenu
                return selectedType;
            }
            if (valueDropdown !== "swimSuit" && valueDropdown !== null && nameDropdown !== null) {
                genderMenu(valueDropdown)

                changeTextContent("dropdownButtonType", nameDropdown)
                document.getElementById("dropdownButtonType")
    ?.setAttribute("data-value", valueDropdown);
                selectedType = valueDropdown;
                return selectedType;
                //handleSelectedValueType(valueDropdown, nameDropdown)
                //let type = valueDropdown
                //return type
            }
        }
    })
}


// Gestione click su dropdown multipli
function initDropdown(dropdownId: string, buttonId: string) {
    const dropdown = document.getElementById(dropdownId);
    dropdown?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!target.classList.contains("dropdown-item")) return;

        const name = target.getAttribute("name") || "";
        const value = target.getAttribute("value") || "";

        // Aggiorna testo bottone
        changeTextContent(buttonId, name);
        
        
        // Se è il tipo, gestisci il gender
        if (dropdownId === "typeDropdown") {
            genderMenu(value);
        }
        if (dropdownId === "sizeDropdown") {
                    selectedSize = value
                    return selectedSize
                }
                if (dropdownId === "colorDropdown") {
                    selectedColor = value
                    return selectedColor
                }
                if (dropdownId === "stateDropdown") {
                    selectedState = value
                    return selectedState
                }
                if (dropdownId === "genderDropdown") {
                    selectedGender = value
                    return selectedGender
                }
    });
}
















//----check inmput -------------//
function checkInputQuantity(): number | null {
    const quantityInput = (document.getElementById("quantityInput") as HTMLInputElement);
    let value = quantityInput.value.trim();
    const num = parseInt(value, 10);

    if (isNaN(num) || num < 0) {
        showPopUp("Inserimento Errato", "Inserisci come quantità un numero intero positivo");
        quantityInput.value = "";
        return null;
    }

    return num;
}


function checkPrizeInput(): number | null {
    const prizeInput = document.getElementById("prizeInput") as HTMLInputElement;
    let value = prizeInput.value;
    if (!value) return null;
    console.log("prezzo:", value)

    return Number(value);

}

function checkDescriptionInput(): string | null {
    const descriptionInput = document.getElementById("descriptionInput") as HTMLInputElement
    let value = descriptionInput.value
    if (!value) return null
    console.log("descrizione:", value)
    return value;
}



function checkInputImage(): string | null {
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;

    let pathImage = imageInput.value
    let value = pathImage.replace("C:\\fakepath\\", "");
    console.log("link:", value)
    return value;
}


function generateId(): string | null {
    const value = Math.random().toString(32).substring(2, 9);
    console.log("NUMERO GENERATO", value)
    return value

}







async function insertProduct() {

    // Array dei prodotti già salvati
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");

    // Cerco se il prodotto esiste già (stesso tipo e genere)

    let product = existingProducts.find(p => p.type === selectedType && p.gender === selectedGender && p.image === selectedImage && p.description === selectedDescription);



    const variant = {
        size: selectedSize as Variant["size"],
        color: selectedColor as Variant["color"],
        quantity: selectedQuantity!,
        state: selectedState as "available" | "unavailable"
    };

    if (product) {
        const variantExists = product.variants.some(v => v.size === variant.size && v.color === variant.color);
        if (product.prize !== selectedPrize) {
            product.prize = selectedPrize!;
            showPopUp("Aggiornamento", "Prezzo aggiornato correttamente");
        }

        if (variantExists) {
            showPopUpSelection("Attenzione", "Prodotto già esistente, procedere con la modifica?", "SI", "NO")

            const choice = await handleCheckBoxtPoPUp();
            if (choice === "no") return
            //if yes
            product.variants = product.variants.map(v =>
                v.size === variant.size && v.color === variant.color ? { ...v, quantity: variant.quantity, state: variant.state } : v
            );
            showPopUp("Aggiornamento", "Modifica effettuata correttamente")
        } else {
            // Aggiungo nuova variante
            product.variants.push(variant);
            showPopUp("Aggiornamento", "Modifica /Inserimeto effettuato correttamente")

        }
    } else {
        // Creo un nuovo prodotto con la variante
        product = {
            id: selectedId!,
            type: selectedType as BaseProduct["type"],
            gender: selectedGender as BaseProduct["gender"],
            image: selectedImage!,
            description: selectedDescription!,
            prize: selectedPrize!,
            variants: [variant]
        };
        existingProducts.push(product);
        console.log("Nuovo prodotto creato:", product);
        showPopUp("Inserimeto", "Inserimeto effettuato correttamente")
    }
    localStorage.setItem("products", JSON.stringify(existingProducts));
    console.log(existingProducts)

}









//change take element


function getInsertOptions() {
    const form = document.getElementById("dropdwons")
    form?.addEventListener("submit", (event) => {
        event.preventDefault();


        //prima cosa check type dropdown in base a quello il gender


        //const prize = Number((document.getElementById("prizeInput") as HTMLInputElement).value);
        //selectedType = getDropdownValue("dropdownButtonType");
        //selectedSize = getDropdownValue("dropdownButtonSize");
        //selectedColor = getDropdownValue("dropdownButtonColor");
       // selectedGender = getDropdownValue("dropdownButtonGender");

        selectedDescription = checkDescriptionInput();
        selectedQuantity = checkInputQuantity();

        if (selectedQuantity === null) return

        selectedPrize = checkPrizeInput();
        selectedImage = checkInputImage();


        const isValid =
            selectedType !== null &&
    selectedSize !== null &&
    selectedColor !== null &&
    selectedGender !== null &&
    selectedImage !== null &&
    selectedDescription !== null &&
    selectedPrize !== null &&
    selectedQuantity !== null;
        if (isValid) {
                if (!selectedState) {
                    selectedState = selectedQuantity > 0 ? "available" : "unavailable";
                }
            selectedId = generateId()
            insertProduct()
            console.log("CAMPI INSERITIII")
            console.log("tipologia:", selectedType);
            console.log("prezzo", selectedPrize);
            console.log("genere:", selectedGender);
            console.log("id", selectedId);
            console.log("descrizione", selectedDescription);
            console.log("immagine", selectedImage);
            console.log("quantità:", selectedQuantity);
            console.log("stato", selectedState);
        } else {
            showPopUp("Errore", "Compila tutti i campi obbligatori")
        }
    });




}





function searchProducts() {
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


function deleteProduct() {
    const deleteButton = document.getElementById("deleteProduct")
    const insertIdSearch = document.getElementById("searchIdInput") as HTMLInputElement
    deleteButton?.addEventListener("click", () => {
        let insertId = insertIdSearch.value.trim();
        if (!insertId) return;


        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
        const updatedProducts = products.filter(p => p.id !== insertId);

        if (updatedProducts.length === products.length) {
            showPopUp("Errore", "Prodotto non trovato, id errato o inesistente");
            return;
        }

        localStorage.setItem("products", JSON.stringify(updatedProducts));
        showPopUp("Successo", "Prodotto eliminato correttamente");

        // Aggiorna la tabella
        createTable(updatedProducts);
    });

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
    setUpMenu();
    getTypeandDataFilterMenu();
    disableDropdown("dropdownButtonGender", true);

    // Inizializza dropdown multipli
    initTypeDropdown();
    initDropdown("sizeDropdown", "dropdownButtonSize");
    initDropdown("colorDropdown", "dropdownButtonColor");
    initDropdown("stateDropdown", "dropdownButtonState");
    initDropdown("genderDropdown", "dropdownButtonGender");

    // Attiva submit
    getInsertOptions();
    searchProducts();
    searchIdProduct();
    deleteProduct();
   
});





