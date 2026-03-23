import '../style/menu.scss';
import '../style/form.scss';
import '../style/shop.scss';



import { setUpMenu } from './menu';
import { fetchForm } from './form';
import { insertProductClone,setupColorSelection } from './templates';
import { loadTemplates } from "./templates";
import type { Variant, BaseProduct } from "./interfaces";
import { showPopUp } from './dom';



document.addEventListener("DOMContentLoaded", () => {
    setUpMenu();
    fetchForm();
});





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


document.addEventListener("DOMContentLoaded", async () => {

    await loadTemplates();

    insertProducts();
})