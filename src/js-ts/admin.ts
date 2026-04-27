
import '../style/admin.scss';
import '../style/poUp.scss';
import { loadTemplates } from "./templates";
import { disableDropdown } from './dom';
import { initTypeDropdown, initGlobalClickListener, handleFormSubmit } from "./events";
import { setUpMenu, checkClickMenu } from './menu';






document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();
    setUpMenu();
    checkClickMenu();
    disableDropdown("dropdownButtonGender", true);
    initTypeDropdown();
    initGlobalClickListener();
    handleFormSubmit();

});








