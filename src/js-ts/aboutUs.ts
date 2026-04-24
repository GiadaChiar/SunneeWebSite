import '../style/aboutUs.css';
import '../style/menu.scss';
import '../style/form.scss';

import { setUpMenu } from './menu'
import { fetchForm } from './form'

document.addEventListener("DOMContentLoaded", ()=>{
    setUpMenu();
    fetchForm();

});
