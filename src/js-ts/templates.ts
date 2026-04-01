//templates functions

import { checkRegistration, showPopUp, cleanSection, getRegisteredUsers, changeTextContent, addCloseButton } from './dom';
import type { Variant, BaseProduct, RegisterForm, CartItem } from "./interfaces";
import { checkedFilterShop } from "./shop";
import { Cliente } from './interfaces';
import { traslate } from './utils'


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

    //Not use clean it is better use a clonation 

    //make a copy by template and then replace it 
    const clone = template.content.cloneNode(true);

    section.replaceChildren(clone);

    //check for submit 
    if (templateId === "registrationTemplate") {
        const form = document.getElementById("registration") as HTMLFormElement;
        //add listener forum only one time
        //if existing and if is not an attribute data-listener add else not
        //because I don't want add extra eventListener
        if (form && !form.hasAttribute("data-listener")) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                checkRegistration();
            });
            form.setAttribute("data-listener", "true");
        }
    }
}






export function insertProductClone(product: BaseProduct) {


    const section = document.getElementById("shopProductHTML");
    const template = templates["shopTemplate"];

    if (!section || !template) {
        console.error("Section or template not found");
        return;
    }

    // Clona il template
    const clone = template.content.cloneNode(true) as HTMLElement;

    // Aggiorna i dati del prodotto
    (clone.querySelector(".decriptionShop") as HTMLElement).textContent = product.description;
    (clone.querySelector(".prizeShop") as HTMLElement).textContent = `${product.prize} €`;
    (clone.querySelector(".imgShop") as HTMLImageElement).src = `../img/${product.image}`;
    const buttonCard = clone.querySelector("button[name='cart']") as HTMLButtonElement;
    buttonCard.id = product.id.toString();

    //craetion dynamic id
    const collapseId = `sizeCollapse-${product.id}`;

    const button = clone.querySelector("#filterButton") as HTMLButtonElement;
    const collapse = clone.querySelector("#sizeCollapse") as HTMLElement;




    // 3. collego bottone → collapse
    if (button && collapse) {
        collapse.id = collapseId; // cambio id del div
        button.setAttribute("data-bs-target", `#${collapseId}`);
    }



    // Aggiunge i colori
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
            console.log(input.value)
            if (index === 0) {
                input.checked = true;
                let colorFirstElement = color
                console.log("COLORE ELEMENTO 0: ", colorFirstElement)
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

    //aggiorno le taglie di default 
    // Aggiorna lo stato dei pulsanti taglie



    // Appendi il clone alla sezione
    section.appendChild(clone);

}





























function checkColorCardShop(products: BaseProduct[], target: HTMLInputElement, clone: HTMLElement): string | "" {
    if (!clone) return "";

    const productId = target.name.replace("color-", "");

    const product = products.find(p => p.id === productId);
    if (!product) return "";


    console.log("Colore selezionato:", target.value);
    //find id product 

    // Aggiorna lo stato dei pulsanti taglie
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











///
let cliente: Cliente | null = null;

// Listener globale per i colori della vetrina
export function setupColorSelection(products: BaseProduct[]) {
    const shopSection = document.getElementById("shopProductHTML");
    if (!shopSection) return;
    let colorElement = "";
    let sizeElement = "";

    shopSection.addEventListener("click", (event) => {

        const button = (event.target as HTMLElement).closest("button") as HTMLButtonElement;
        const target = event.target as HTMLInputElement;
        const clone = target.closest(".container") as HTMLElement;

        // check card color selected
        if (target?.classList.contains("check-shop-color") && target.type === "radio") {

            colorElement = checkColorCardShop(products, target, clone)
            console.log("COLOREEEEE:", colorElement)
        }

        //buttons size inside the cart 
        if (button && button.classList.contains("template")) {
            console.log("bottone size cliccato")
            //get all buttons to change class
            const allButtons = document.querySelectorAll<HTMLButtonElement>('button[data-filter-type="size"]')

            sizeElement = checkedFilterShop(button, allButtons)

            console.log("FINE FUNZIONE Taglia TROVATO:", sizeElement)
        }

        //button car inside the cart 
        if (button && button.type === "button" && button.name === "cart") {
            if (!clone) return;
            console.log("CLICCATO CARELLAOO");
            const loggedUserId = sessionStorage.getItem("userId");
            console.log("userId trovato:", loggedUserId)

            if (loggedUserId) {
                console.log("ID dell'utente loggato:", loggedUserId);
            } else {
                showPopUp("Attenzione", "Fai il login per procedere all'acquisto")
            }
            if (colorElement === "") {
                showPopUp("Errore", "Seleziona il colore desiderato")
            }
            if (sizeElement === "") {
                showPopUp("Errore", "Seleziona la taglia desiderata")
            }
            const idProduct = button.id
            console.log("Id prodotto:", idProduct)
            console.log("Color product:", colorElement)
            console.log("size product:", sizeElement)

            //serch my client logged 
            const users = getRegisteredUsers();
            const savedCart = sessionStorage.getItem("cart");//old carts

            const userData = users.find(u => u.id === loggedUserId);
            if (userData) {
                cliente = new Cliente(userData);
                console.log("Cliente creato:", cliente);

                if (savedCart) {
                    const cartItems: CartItem[] = JSON.parse(savedCart);
                    cliente.loadCart(cartItems); // carico eventuali elementi già presenti

                } //create my new client 


                if (cliente && loggedUserId) {

                    cliente.addToCart({
                        userId: loggedUserId,
                        productId: button.id,
                        size: sizeElement as Variant["size"],
                        color: colorElement as Variant["color"],
                        quantity: 1
                    }, products,loggedUserId!);
                    //save info 
                    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
                    console.log("IL cliente salvato è:", cliente)
                    window.location.href = "cart.html";
                }

            }
        }

    });
}

















export function insertProductCloneFilter(product: BaseProduct) {

    const section = document.getElementById("shopProductHTML");
    const template = templates["shopTemplate"];

    if (!section || !template) {
        console.error("Section or template not found");
        return;
    }

    // Clona il template
    const clone = template.content.cloneNode(true) as HTMLElement;

    // Aggiorna i dati del prodotto
    (clone.querySelector(".decriptionShop") as HTMLElement).textContent = product.description;
    (clone.querySelector(".prizeShop") as HTMLElement).textContent = `${product.prize} €`;
    (clone.querySelector(".imgShop") as HTMLImageElement).src = `../img/${product.image}`;

    //craetion dynamic id
    const collapseId = `sizeCollapse-${product.id}`;

    const button = clone.querySelector("#filterButton") as HTMLButtonElement;
    const collapse = clone.querySelector("#sizeCollapse") as HTMLElement;




    // 3. collego bottone → collapse
    if (button && collapse) {
        collapse.id = collapseId; // cambio id del div
        button.setAttribute("data-bs-target", `#${collapseId}`);
    }



    // Aggiunge i colori
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
            console.log(input.value)
            if (index === 0) {
                input.checked = true;
            }
        });

    }

    //aggiorno le taglie di default 
    // Aggiorna lo stato dei pulsanti taglie
    const sizeButtons = clone.querySelectorAll<HTMLButtonElement>(".filter-btn");
    sizeButtons.forEach(button => {
        const sizeValue = button.dataset.value;
        const available = product.variants.some(
            v => v.size === sizeValue
        );
        button.dataset.state = available ? "enable" : "disable";
    });


    // Appendi il clone alla sezione
    section.appendChild(clone);

}

















/// carrello :


//






export function changeCartTemplate(cartItems: ReturnType<Cliente['getDetailedCart']>) {
    console.log("Dettagliiiiii carrello:", cartItems);
    //<h2 class="description">Bikini Oceano</h2>

    const section = document.getElementById("cartHTML");
    const template = templates["cartTemplate"];


    if (!section || !template) {
        console.error("Section or template not found");
        return;
    }

    console.log("trovatooo")
    //section.innerHTML = "";

    cartItems.forEach(item => {
        if (!item) return;

        //const desc = cartItems.description

        //const clone = template.content.cloneNode(true) as HTMLElement;
        const clone = template.content.cloneNode(true) as DocumentFragment;
        const element = clone.firstElementChild as HTMLElement;

        (element.querySelector(".description") as HTMLElement).textContent = item.description;
        (element.querySelector(".price") as HTMLElement).textContent = `${item.price} €`;
        (element.querySelector(".size") as HTMLElement).textContent = traslate.size[item.size];
        (element.querySelector(".color") as HTMLElement).textContent = traslate.color[item.color];
        (element.querySelector(".imgCart") as HTMLImageElement).src = `../img/${item.image}`;
        element.dataset.id = item.productId;//add id product
        element.dataset.color = item.color;
        element.dataset.size = item.size;


        section.appendChild(clone);


    })



}




