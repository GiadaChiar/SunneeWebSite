import '../style/menu.scss';
import '../style/form.scss';
import '../style/shop.scss';
import '../style/poUp.scss';



import { setUpMenu } from './menu';
import { fetchForm } from './form';
import { insertProductClone } from './templates';
import { loadTemplates } from "./templates";
import { setupColorSelection, getfiltersPageShop } from "./events";
import type { BaseProduct } from "./interfaces";
import { showPopUp, cleanSection } from './dom';
import { ProductsDefault } from './initProducts';






//function read data to send by menu filter 
function getFilterFormUrl() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const gender = params.get("gender")

    insertShopTemplateFilters(type, gender)

    return { type, gender };
}





function insertShopTemplateFilters(type: string | null, gender: string | null) {
    //if filter is false don't use it 
    const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");

    const allProducts: BaseProduct[] = [...ProductsDefault, ...products];

    const productsFirstFilter = allProducts.filter(p => p.type === type && p.gender === gender)
        .map(product => {
            const availableVariants = product.variants.filter(v => v.state === "available");
            return {

                ...product,
                variants: availableVariants
            };
        })
        .filter(product => product.variants.length > 0)

    if (productsFirstFilter.length === 0) {
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





export function InsertTemplateShopFilter(color: string, size: string, productsBase: BaseProduct[]) {
    cleanSection("shopProductHTML");
    cleanSection("shopProductHTML");
    
    if (!color && !size) {
        productsBase.forEach(product => {
            insertProductClone(product);
        });
        return;
    }

    const filtered = productsBase
        .map(p => {
            // exists product
            const exists = p.variants.some(v =>

            (color ?  v.color === color : true)&&
                (size ? (v.size === size && v.state === "available"): true)
            );

    if (!exists) {
        return null;
    }

    let variants = p.variants;

    if (color) {
        variants = variants.filter(v => v.color === color);
    }

    return {
        ...p,
        variants
    };
})
        .filter(p => p !== null);


if (filtered.length === 0) {
    showPopUp("Errore", "Nessun prodotto trovato, cambiare i filtri della ricerca");
    return;
}
filtered.forEach(product => {
    insertProductClone(product);
});

}




document.addEventListener("DOMContentLoaded", async () => {

    await loadTemplates();
    setUpMenu();
    fetchForm();
    getFilterFormUrl();
})