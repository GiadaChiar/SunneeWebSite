import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';
import '../style/cart.scss';
import '../style/poUp.scss';

import { setUpMenu, checkClickMenu } from './menu';
import { fetchForm } from './form';



document.addEventListener("DOMContentLoaded", () => {
    setUpMenu();
    checkClickMenu();
    fetchForm();
});