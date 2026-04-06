import '../style/aboutUs.css';
import '../style/menu.css';
import '../style/form.scss';

import { setUpMenu,getTypeandDataFilterMenu } from './menu'
import { fetchForm } from './form'


document.addEventListener("DOMContentLoaded", ()=>{
    setUpMenu();
    fetchForm();
    //getTypeandDataFilterMenu();

});


