
import type { ShopClient } from "./cartInterfaces";
import type { BaseProduct } from "./productInterfaces";
import { checkRegistration } from './userServices';
import { translate } from "./utils";
import { setSumTotCart } from "./dom";
import { cartSetNumberProduct } from "./events";





//-----------STANDARD LOAD TEMPLATES--------------------------------------------

//loader templates to save them in memory
const templates: Record<string, HTMLTemplateElement> = {};



export async function loadTemplates() {

    const response = await fetch("logInSections.html");
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const foundTemplates = doc.querySelectorAll("template");

    foundTemplates.forEach(template => {
        templates[template.id] = template as HTMLTemplateElement;
    });

}




//insert template in the page
export function insertTemplate(sectionId: string, templateId: string) {

    const section = document.getElementById(sectionId);
    const template = templates[templateId];

    if (!section || !template) {
        console.error("Section or template not found");
        return;
    }

    //make a copy by template and then replace it 
    const clone = template.content.cloneNode(true);

    section.replaceChildren(clone);

    //check for submit 
    if (templateId === "registrationTemplate") {
        const form = document.getElementById("registration") as HTMLFormElement;
        //add listener forum only one time

        if (form && !form.hasAttribute("data-listener")) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                checkRegistration();
            });
            form.setAttribute("data-listener", "true");
        }
    }
}



//change clone shop

export function insertProductClone(product: BaseProduct) {

    const section = document.getElementById("shopProductHTML");
    const template = templates["shopTemplate"];

    if (!section || !template) {
        console.error("Section or template not found");
        return;
    }

    // clone template
    const clone = template.content.cloneNode(true) as HTMLElement;
    // update info
    (clone.querySelector(".decriptionShop") as HTMLElement).textContent = product.description;
    (clone.querySelector(".prizeShop") as HTMLElement).textContent = `${product.prize} €`;
    (clone.querySelector(".imgShop") as HTMLImageElement).src = `../img/${product.image}`;
    const buttonCard = clone.querySelector("button[name='cart']") as HTMLButtonElement;
    buttonCard.id = product.id.toString();

    //creation dynamic id
    const collapseId = `sizeCollapse-${product.id}`;
    const button = clone.querySelector("#filterButton") as HTMLButtonElement;
    const collapse = clone.querySelector("#sizeCollapse") as HTMLElement;

    // button --> to collapse
    if (button && collapse) {
        collapse.id = collapseId; //change div id
        button.setAttribute("data-bs-target", `#${collapseId}`);
    }
    // Add colors
    const colorList = clone.querySelector(".colorshop");
    if (colorList) {
        const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));
        uniqueColors.forEach((color, index) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `color-${product.id}`;
            input.value = color;
            input.setAttribute("data-value", color);
            input.classList.add("check-shop-color");
            colorList.appendChild(input);
            
            if (index === 0) {
                input.checked = true;
                let colorFirstElement = color
                
                //return colorFirstElement
                const sizeButtons = clone.querySelectorAll<HTMLButtonElement>(".filter-btn");

                sizeButtons.forEach(button => {
                    const sizeValue = button.dataset.value;
                    const available = product.variants.some(
                        v => v.size === sizeValue && v.color === colorFirstElement
                    );
                    button.dataset.state = available ? "available" : "unavailable";
                });
            }
        });
    }
    // Append clone to section
    section.appendChild(clone);
}



//-------------------CART SECTION ---------------------

export function changeCartTemplate(cartItems: ReturnType<ShopClient['getDetailedCart']>, idUser: string) {
    
    const section = document.getElementById("cartHTML");
    const template = templates["cartTemplate"];

    if (!section || !template) return;

    const userProducts = cartItems.filter(p => p && p.userId === idUser)
    if (!userProducts) return

    userProducts.forEach(item => {
        if (!item) return;

        const clone = template.content.cloneNode(true) as DocumentFragment;
        const element = clone.firstElementChild as HTMLElement;

        (element.querySelector(".description") as HTMLElement).textContent = item.description;
        (element.querySelector(".price") as HTMLElement).textContent = `${item.price} €`;
        (element.querySelector(".size") as HTMLElement).textContent = translate.size[item.size];
        (element.querySelector(".color") as HTMLElement).textContent = translate.color[item.color];
        (element.querySelector(".imgCart") as HTMLImageElement).src = `../img/${item.image}`;
        (element.querySelector(".quantity") as HTMLElement).textContent = item.quantity.toString();
        element.dataset.id = item.productId;//add id product
        element.dataset.color = item.color;
        element.dataset.size = item.size;


        //default 1 to order
        const buttonLess = element.querySelector(".bnt-less") as HTMLButtonElement;
        if (item.quantity > 1) {
            buttonLess.classList.remove("disable");
            buttonLess.classList.add("anable");
        }

        section.appendChild(clone);
    })

    cartSetNumberProduct(idUser, userProducts);
    //sum function total to pay
    setSumTotCart(userProducts)

}
