import '../style/menu.scss';
import '../style/form.scss';
import '../style/shop.scss';
import '../style/poUp.scss';


import { setUpMenu, checkClickMenu } from './menu';
import { fetchForm } from './form';
import { cleanSection, showPopUp } from "./dom";
import { loadTemplates } from "./templates";
import { insertProductClone } from "./templates";
import { setupColorSelection, getfiltersPageShop } from "./events";
import { ProductService } from './productInterfaces';
import type { BaseProduct } from "./productInterfaces";





//function read data to send by menu filter 
function getFilterFormUrl() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const gender = params.get("gender")

    insertShopTemplateFilters(type, gender)

    return { type, gender };
}






export function insertShopTemplateFilters(type: string | null, gender: string | null) {

    const allProducts = ProductService.getAllProducts();

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
    //filter in the page 
    getfiltersPageShop(productsFirstFilter)

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

                (color ? v.color === color : true) &&
                (size ? (v.size === size && v.state === "available") : true)
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
    checkClickMenu()
    getFilterFormUrl();
})