import '../style/menu.scss';
import '../style/form.scss';
import '../style/shop.scss';
import '../style/poUp.scss';


import { setUpMenu } from './menu';
import { fetchForm } from './form';


document.addEventListener("DOMContentLoaded", async () => {

    //await loadTemplates();
    setUpMenu();
    fetchForm();
    //getFilterFormUrl();
})