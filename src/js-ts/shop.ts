import '../style/menu.scss';
import '../style/form.scss';
import '../style/shop.scss';
import '../style/poUp.scss';


import { setUpMenu, checkClickMenu } from './menu';
import { fetchForm } from './form';
import { cleanSection } from "./dom";
import { loadTemplates } from "./templates";
import { getAllProducts } from "./productService";
import { insertProductClone } from "./templates";
import { setupColorSelection } from "./events";










//function read data to send by menu filter 
function getFilterFormUrl() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const gender = params.get("gender")

    console.log("SHOP CATEGORY :", type)
    console.log("SHOP GENDER :", gender)

    insertShopTemplateFilters(type, gender)

    return { type, gender };
}








function insertShopTemplateFilters(type: string | null, gender: string | null) {
    //if filter is false don't use it 
    const allProducts = getAllProducts();

    console.log("Tutti i prodotti trovati: ", allProducts)


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

    console.log("PRODOTTI DOPO IL FILTRO ", productsFirstFilter )

    productsFirstFilter.forEach(product => {

        insertProductClone(product);
    })

    
    setupColorSelection(productsFirstFilter);
/*
    getfiltersPageShop(productsFirstFilter)
    //insert products  
*/
}




document.addEventListener("DOMContentLoaded", async () => {

    await loadTemplates();
    setUpMenu();
    fetchForm();
    checkClickMenu()
    getFilterFormUrl();
})