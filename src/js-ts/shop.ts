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
//loader templates to save them in memory
const templates: Record<string, HTMLTemplateElement> = {};


/*

document.addEventListener("DOMContentLoaded", () => {
    setUpMenu();
    fetchForm();
});
*/


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

    console.log(type, gender)
    const productsFirstFilter = products.filter(p => p.type === type && p.gender === gender);
    console.log("productsFirstFilter:", productsFirstFilter)

    if (productsFirstFilter.length === 0) {
        showPopUp("Errore", "Nessun prodotto trovato cambiare i parametri di ricerca");
        return;
    }
    cleanSection("shopProductHTML"); //clean page shop


    productsFirstFilter.forEach(product => {

        insertProductClone(product);
        setupColorSelection(products);


    })


    checkfiltersPageShop(productsFirstFilter)


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







//listener only one on shopPage 
/*
//global event listener to get data-type and value
export function getTypeandDataFilterMenu() {
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        // risale fino al link con data-type
        const dropdownItem = target.closest("a[data-gender]") as HTMLAnchorElement;
        if (!dropdownItem) return;

        // blocca la navigazione
        event.preventDefault();

        const type = dropdownItem.dataset.type;
        const gender = dropdownItem.dataset.gender;

        console.log("Tipologia cliccata:", type);
        console.log("Valore cliccato:", gender);

        //send data 
        window.location.href = `shop.html?type=${type}&gender=${gender}`;

    });
}*/



function checkfiltersPageShop(productsBase: BaseProduct[]) {
    const form = document.getElementById("filter");
    let selectedColorFilter = "";
    let selectedSizeFilter = "";

    form?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if ((target as HTMLInputElement).type === "radio" && (target as HTMLInputElement).name === "color") {

            const clickedRadio = target as HTMLInputElement;
            selectedColorFilter = clickedRadio.dataset.value || "";

            const allRadios = document.querySelectorAll<HTMLInputElement>('input[name="color"]')
            
            allRadios.forEach(input =>{
                input.classList.remove("anable");
                input.classList.add("disable");
            })
            clickedRadio.classList.remove("anable");
            clickedRadio.classList.add("disable");
        }

        if ((target as HTMLButtonElement).name === "size") {
            event.preventDefault();
            const clickedButton = target as HTMLButtonElement;
            selectedSizeFilter  = clickedButton.dataset.value || "";
            console.log("size",selectedSizeFilter)
            const allSizeButtons = document.querySelectorAll<HTMLButtonElement>('button[name="size"]');

            allSizeButtons.forEach(btn => {
                // resetta tutti a disable
                btn.classList.remove("anable");
                btn.classList.add("disable");
            });

            clickedButton.classList.remove("disable");
            clickedButton.classList.add("anable");
        }

        if ((target as HTMLButtonElement).type === "submit" && (target as HTMLButtonElement).name === "searchFilters") {
                event.preventDefault();
            if (!selectedColorFilter && !selectedSizeFilter) {
                showPopUp("Errore", "Inserisci almeno un filtro di ricerca")
                return;
            }
            const filtered = productsBase.filter(p => {
                let colorMatch = true;
                let sizeMatch = true;

                if (selectedColorFilter) {
                    colorMatch = p.variants.some(v => v.color === selectedColorFilter);
                }
                if (selectedSizeFilter) {
                    sizeMatch = p.variants.some(v => v.size === selectedSizeFilter);
                }
                return colorMatch && sizeMatch;
            });

            cleanSection("shopProductHTML");
            if(filtered.length === 0){
                    showPopUp("Errore", "Nessun prodotto trovato, cambiare i filtri della ricarca")
                    return
                }
            filtered.forEach(product => {
                insertProductClone(product);
            });
        }

    })

}

















document.addEventListener("DOMContentLoaded", async () => {

    await loadTemplates();
    setUpMenu();
    fetchForm();
    getFilterFormUrl();
    //checkfiltersPageShop();

    // insertProducts();
})