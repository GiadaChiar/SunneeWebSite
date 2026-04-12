
import '../style/admin.scss';
import '../style/poUp.scss';
import { disableDropdown } from './dom';
import { loadTemplates } from "./templates";
import { initTypeDropdown, handleFormSubmit, initSearchSection,initGlobalClickListener } from "./events";
import type { BaseProduct } from "./interfaces";





/// clean products 
export function cleanProducts() {
    localStorage.removeItem("products")
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
}




document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();

    disableDropdown("dropdownButtonGender", true);

    initTypeDropdown();
    initGlobalClickListener();
    handleFormSubmit();
    initSearchSection();
});




