
import '../style/admin.scss';
import '../style/poUp.scss';
import { loadTemplates } from "./templates";
import { disableDropdown } from './dom';
import { initTypeDropdown, initGlobalClickListener, handleFormSubmit } from "./events";







document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();

    disableDropdown("dropdownButtonGender", true);

    initTypeDropdown();
    
    initGlobalClickListener();

    handleFormSubmit();
    /*
    initSearchSection();*/
});








