//dom functions

import { insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events";
import { Cliente } from "./interfaces";
import type { BaseProduct } from "./interfaces";



//--------------------------------------------------STANDARD FUNCTIONs -----------------------------------------------------------------


//clean element to HTML pages
export function cleanSection(sectionId: string) {

    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }
    section.innerHTML = "";
}




//Function change text content

export function changeTextContent(elementId: string, text: string) {

    const element = document.getElementById(elementId);
    if (element)
        element.textContent = text
}



//show information popUp
export function showPopUp(title: string, message: string) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUp");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);

    addCloseButton("custom-popup")
}



//close Button function 

export function addCloseButton(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return

    const closeBtn = document.createElement("button");

    closeBtn.classList.add("btn-close");
    closeBtn.type = "button"

    closeBtn.addEventListener("click", () => {
        container.remove(); 
    });
    container.style.position = "relative";
    container.appendChild(closeBtn)
}



//info and quanstion multy opstions popUp

export function showPopUpSelection(title: string, message: string, checkright: string, checkleft: string) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUpSelection");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);
    changeTextContent("popUCheckright", checkright);
    changeTextContent("popUCheckleft", checkleft);
    handleCheckBoxtPoPUp();

    const closeButton = document.getElementById("closeButton");

    addCloseButton("PopUpHtml")
}




//-------------------------------ADMIN SECTION----------------------------------------------------------


//disable dropdown in the filter to add or change products

export function disableDropdown(dropdownId: string, bool: boolean) {
    const dropdownButton = document.getElementById(dropdownId) as HTMLButtonElement;
    if (dropdownButton) {
        dropdownButton.disabled = bool; // disable
    }
}


//filter swim-suit subcategory
export function showHidden(subMenuId: string) {
    const subMenu = document.getElementById(subMenuId)
    if (subMenu) {
        if (subMenu.dataset.show === "none") {
            subMenu.dataset.show = "see"
        } else {
            subMenu.dataset.show = "none"
        }
    }

}



// set dropdown in relation to type
export function genderMenu(valueDropdown: string): void {
    const genderButton = document.getElementById("dropdownButtonGender");
    if (!genderButton) return;

    if (valueDropdown === "sarong") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "donna");
        genderButton.setAttribute("data-value", "woman");
        return;
    }

    if (valueDropdown === "cap") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "unisex");
        genderButton.setAttribute("data-value", "unisex");
        return;
    }

    
    disableDropdown("dropdownButtonGender", false);
    changeTextContent("dropdownButtonGender", "Genere");
    
}



//create table 
export function createTable(products: BaseProduct[]) {
    const existingTable = document.getElementById("tableTemplateShow")
    if (existingTable) {
        cleanSection("tableHTML")
    }
    insertTemplate("tableHTML", "tableTemplate");

    const productsSection = document.getElementById("products-table")

    if (!productsSection) return

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
        tr.innerHTML = `
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
    })
}




//----------------------------------------SHOP SECTION-----------------------------------------------------




export function checkedFilterShop(check: HTMLElement, allElement: NodeListOf<HTMLElement>): string | "" {
    let selected = check.dataset.value || ""

    if (check.classList.contains("anable")) {
        check.classList.remove("anable");
        check.classList.add("disable");

        if (check instanceof HTMLInputElement) {
            check.checked = false;
        }
        selected = "";
    } else {

        allElement.forEach(el => {
            el.classList.remove("anable");
            el.classList.add("disable");
            if (el instanceof HTMLInputElement) {
                el.checked = false;
            }
        });

        if (check.dataset.state === "unavailable") return ""

        check.classList.remove("disable");
        check.classList.add("anable");
        if (check instanceof HTMLInputElement) {
            check.checked = true;
        }

        selected = check.dataset.value || "";
    }
    return selected;
}




//---------------------CART SECTION------------------------------------------------------


// calc total to pay
export function setSumTotCart(products: ReturnType<Cliente['getDetailedCart']>) {
    //for each products price and quantity
    const productInfo = products.map(p => ({
        price: p?.price ?? 0,
        quantity: p?.quantity ?? 0,
        total: (p?.price ?? 0) * (p?.quantity ?? 0)
    }));

    const totalCart = productInfo.reduce((sum, item) => sum + item.total, 0);
    
    let result = totalCart.toFixed(2);
    changeTextContent("sommaTot", `${result} €`);
}
