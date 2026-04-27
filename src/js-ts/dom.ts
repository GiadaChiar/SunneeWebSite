
import { insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events";
import type { BaseProduct } from "./productInterfaces";
import { ProductsDefault } from "./initProducts";
import type { ShopClient } from "./cartInterfaces";
import { ProductService } from './productInterfaces';



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



//info and question multy opstions popUp

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
export function showHidden(subMenuId: string): void {
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



//set text and value in dropdowns != Type

export function initGenericDropdown(target: HTMLElement, dropdownId: string, buttonId: string) {
    if (!target.classList.contains("dropdown-item")) return;
    if (!target.closest(`#${dropdownId}`)) return;

    const name = target.getAttribute("name") || "";
    const value = target.getAttribute("value") || "";

    // change button text
    changeTextContent(buttonId, name);

    //save value in dom like type 
    document
        .getElementById(buttonId)
        ?.setAttribute("data-value", value);

    // in base type you have a specific gender or a selection
    if (dropdownId === "typeDropdown") {
        genderMenu(value);
        return;
    }

};




//get values from other dropdowns

export function getDropdownValue(buttonId: string): string | null {
    return document
        .getElementById(buttonId)
        ?.getAttribute("data-value") || null;
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
            <td><img src="../img/${product.image}" width="50"></td>
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


//-------------------------CART SECTION -------------------------------



//if I click on button + in the cart 

export function handleAdd(
    addButton: HTMLButtonElement | null,
    ctx: any,
    productsCart: any[]
) {
    if (!addButton) return;

    const { clone, textQuantity } = ctx;
    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    const product = ProductService.findById(productId);

    if (!product) return;

    const foundQuantity = ProductService.findQuantity(product, productColor, productSize);

    if (foundQuantity === undefined) return

    const userQuantity = Number(textQuantity)

    AddEffect(foundQuantity, userQuantity, addButton, productsCart, ctx)
}



function AddEffect(
    quantity: number,
    userQunatity: number,
    addButton: HTMLButtonElement | null,
    productsCart: any[],
    ctx: any,) {

    if (!addButton) return

    if (userQunatity >= quantity) {
        addButton.classList.remove("enable");
        addButton.classList.add("disable");
        showPopUp("Attenzione", "E' stato raggiunto il numero massimo di prodotti disponibili");
        return
    }

    addButton.classList.remove("disable");
    addButton.classList.add("anable");

    const { clone, quantityElement, cliente } = ctx;
    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    const productcart = findCartItem(
        productsCart,
        cliente.id,
        productId,
        productColor,
        productSize
    );

    if (!productcart) return;

    const newQty = userQunatity + 1;
    productcart.quantity = newQty;

    cliente.updateCartItem(productcart.productId, productcart.color, productcart.size, newQty);
    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));

    setSumTotCart(productsCart);

    quantityElement.textContent = newQty.toString();
    const lessButton = clone.querySelector(".bnt-less");

    if (lessButton) {

        if (newQty >= 1) {
            lessButton.classList.remove("disable");
            lessButton.classList.add("enable");
        }
    }
}




function findCartItem(
    productsCart: any[],
    userId: string,
    productId: string,
    color: string,
    size: string
) {
    return productsCart.find(
        p =>
            p.userId === userId &&
            p.productId === productId &&
            p.color === color &&
            p.size === size
    );
}



//if I click on button - in the cart

export function handleLess(
    lessButton: HTMLButtonElement | null,
    ctx: any,
    productsCart: any[],
) {
    if (!lessButton) return;

    const { clone, textQuantity, quantityElement, cliente } = ctx;
    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    const product = ProductService.findById(productId);

    if (!product) return;

    const foundQuantity = ProductService.findQuantity(product, productColor, productSize);

    const productcart = findCartItem(
        productsCart,
        cliente.id,
        productId,
        productColor,
        productSize
    );

    if (!productcart && !foundQuantity) return;

    if (textQuantity <= 1) {

        lessButton.classList.remove("enable");
        lessButton.classList.add("disable");
        return
    }

    const newQty = Number(textQuantity - 1);
    const addButton = clone.querySelector(".bnt-add");

    if (addButton) {

        if (foundQuantity && newQty < foundQuantity) {

            addButton.classList.remove("disable");
            addButton.classList.add("enable");
        }
    }
    productcart.quantity = newQty;

    cliente.updateCartItem(productcart.productId, productcart.color, productcart.size, newQty);
    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));

    setSumTotCart(productsCart);
    quantityElement.textContent = newQty.toString();
}







//if I click x in the cart 
export function handleDelete(
    deleteButton: HTMLButtonElement | null,
    ctx: any,
    userLogId: string
) {
    if (!deleteButton) return;

    const { clone, cliente } = ctx;
    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    if (!productId) return;

    cliente.removeFromCart(productId, productColor, productSize);
    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));

    //const products = getAllProducts();
    const products = ProductService.getAllProducts();
    const updated = cliente.getDetailedCart([...ProductsDefault, ...products], userLogId);
    setSumTotCart(updated);
    clone.remove();

}




// calc total to pay
export function setSumTotCart(products: ReturnType<ShopClient['getDetailedCart']>) {
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


