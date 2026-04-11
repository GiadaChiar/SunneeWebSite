
import '../style/admin.scss';
import '../style/poUp.scss';
import { disableDropdown } from './dom';
import { loadTemplates } from "./templates";
import { initTypeDropdown, handleFormSubmit, initSearchSection,initGlobalClickListener } from "./events";
import type { BaseProduct } from "./interfaces";





/// clean products 
export function cleanProducts() {
    localStorage.removeItem("products")
    console.log("Prodotti eliminati")
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    console.log("rimasti:", existingProducts)
}




document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();

    disableDropdown("dropdownButtonGender", true);

    initTypeDropdown();
    initGlobalClickListener();
    handleFormSubmit();
    initSearchSection();
    //cleanProducts();
});




