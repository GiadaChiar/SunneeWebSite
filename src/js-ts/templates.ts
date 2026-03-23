//templates functions

import { checkRegistration, showPopUp } from "./dom";
import type { Variant, BaseProduct } from "./interfaces";

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
            if(index === 0){
                input.checked =true;
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


// Listener globale per i colori della vetrina
export function setupColorSelection(products: BaseProduct[]) {
    const shopSection = document.getElementById("shopProductHTML");
    if (!shopSection) return;

    shopSection.addEventListener("click", (event) => {
        const target = event.target as HTMLInputElement;
        const productId = target.name.replace("color-", "");
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
        // Controlla che sia un input colore
        if (target?.classList.contains("check-shop-color") && target.type === "radio") {
            const clone = target.closest(".container") as HTMLElement;
            if (!clone) return;


            console.log("Colore selezionato:", target.value);
            //find id product 

            // Aggiorna lo stato dei pulsanti taglie
            const sizeButtons = clone.querySelectorAll<HTMLButtonElement>(".filter-btn");
            sizeButtons.forEach(button => {
                const sizeValue = button.dataset.value;
                const available = product.variants.some(
                    v => v.size === sizeValue && v.color === target.value
                );
                button.dataset.state = available ? "enable" : "disable";
            });
                
        }
    });
}






