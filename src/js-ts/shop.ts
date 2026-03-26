import '../style/menu.scss';
import '../style/form.scss';
import '../style/shop.scss';
import '../style/poUp.scss';



import { setUpMenu } from './menu';
import { fetchForm } from './form';
import { insertProductClone, setupColorSelection } from './templates';
import { loadTemplates } from "./templates";
import type { Variant, BaseProduct } from "./interfaces";
import { showPopUp, cleanSection } from './dom';
import { ProductsDefault } from './initProducts';
//import productsJson from "./data/products.json";
//loader templates to save them in memory
const templates: Record<string, HTMLTemplateElement> = {};






/*

//foreach create template 
//insertTemplate(sectionId: string, templateId: string)
//get products
function insertProducts() {
    const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    if (!products || products.length === 0) {
        showPopUp("Errore", "Caricamento della vetrina fallito");
        return;
    }

    // Inserisci tutti i prodotti
    products.forEach(product => {
        insertProductClone(product);
    });

    // Imposta un solo listener globale per tutti i colori
    setupColorSelection(products);
}
*/




















function insertShopTemplateFilters(type: string | null, gender: string | null) {
    //if filter is false don't use it 
    const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");

    const allProducts: BaseProduct[] = [...ProductsDefault, ...products];

    console.log(type, gender)
    const productsFirstFilter = allProducts.filter(p => p.type === type && p.gender === gender);
    console.log("productsFirstFilter:", productsFirstFilter)

    if (productsFirstFilter.length === 0) {
        showPopUp("Errore", "Nessun prodotto trovato cambiare i parametri di ricerca");
        return;
    }
    cleanSection("shopProductHTML"); //clean page shop


    productsFirstFilter.forEach(product => {

        insertProductClone(product);



    })
    setupColorSelection(productsFirstFilter);

    getfiltersPageShop(productsFirstFilter)


    //insert products  

}

















//function read data to send by menu filter 
function getFilterFormUrl() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const gender = params.get("gender")


    console.log("CATEGORY:", type);
    console.log("GENDER:", gender);
    insertShopTemplateFilters(type, gender)

    return { type, gender };

}



function checkedFilterShop(check: HTMLElement, allElement: NodeListOf<HTMLElement>):string {
    let selected = check.dataset.value || ""

    if (check.classList.contains("anable")) {
        check.classList.remove("anable");
        check.classList.add("disable");

        if (check instanceof HTMLInputElement) {
            check.checked = false;

        }
        selected = "";
        console.log("disattivato");
    } else {

        allElement.forEach(el => {
            el.classList.remove("anable");
            el.classList.add("disable");
            if(el instanceof HTMLInputElement){
                el.checked = false;
            }
            
        });
        check.classList.remove("disable");
        check.classList.add("anable");
        if ( check instanceof HTMLInputElement) {
            check.checked = true;

        }

        selected = check.dataset.value || "";
        console.log("attivato:", selected);
    }
    return selected;
}


function InsertTemplateShopFilter(color:string,size:string,productsBase: BaseProduct[]){
    if (!color && !size) {
                productsBase.forEach(product => {
                    insertProductClone(product);
                });
                return;
            }
            const filtered = productsBase.filter(p => {
                let colorMatch = true;
                let sizeMatch = true;

                if (color) {
                    colorMatch = p.variants.some(v => v.color === color);
                }
                if (size) {
                    sizeMatch = p.variants.some(v => v.size === size);
                }
                return colorMatch && sizeMatch;
            });

            cleanSection("shopProductHTML");
            if (filtered.length === 0) {
                showPopUp("Errore", "Nessun prodotto trovato, cambiare i filtri della ricarca")
                return
            }
            filtered.forEach(product => {
                insertProductClone(product);
            });
        }
    










function getfiltersPageShop(productsBase: BaseProduct[]) {
    const form = document.getElementById("filter");
    let selectedColorFilter = "";
    let selectedSizeFilter = "";

    form?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if ((target as HTMLInputElement).type === "radio" && (target as HTMLInputElement).name === "color") {
            const clickedRadio = target as HTMLInputElement;
            const allRadios = document.querySelectorAll<HTMLInputElement>('input[name="color"]')
            
            selectedColorFilter = checkedFilterShop(clickedRadio, allRadios)
            console.log("FINE FUNZIONE COLORE TROVATO:",selectedColorFilter)
        }

        if ((target as HTMLButtonElement).name === "size") {
            event.preventDefault();
            const clickedButton = target as HTMLButtonElement;
            const allSizeButtons = document.querySelectorAll<HTMLButtonElement>('button[name="size"]');

            selectedSizeFilter = checkedFilterShop(clickedButton, allSizeButtons)
            console.log("FINE FUNZIONE Taglia TROVATO:",selectedSizeFilter)
        }

        if ((target as HTMLButtonElement).type === "submit" && (target as HTMLButtonElement).name === "searchFilters") {
            event.preventDefault();

            console.log("COLORE FITRO PAGINA:",selectedColorFilter);
            console.log("Taglia FITRO PAGINA:",selectedSizeFilter);


            InsertTemplateShopFilter(selectedColorFilter,selectedSizeFilter,productsBase);
        }
    })
}
















document.addEventListener("DOMContentLoaded", async () => {

    await loadTemplates();
    setUpMenu();
    fetchForm();


    getFilterFormUrl();


})