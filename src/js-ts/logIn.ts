import '../style/menu.scss';
import '../style/form.scss';
import '../style/logIn.scss';
import'../style/poUp.scss';

import { setUpMenu,getTypeandDataFilterMenu } from './menu'
import { fetchForm } from './form'

/*
import { setUpNewSection, loadTemplates,removeElementHtm} from './logInSections'

*/

import{ removeElementHtm,setUpNewSection,preventSubmitLogIn } from "./events"
import{ loadTemplates } from "./templates"
import{ checkRegistration,showUsers,cleanOldUsers } from"./dom"

document.addEventListener("DOMContentLoaded", async() => {
    setUpMenu();
    fetchForm();
    removeElementHtm();
    preventSubmitLogIn();
    getTypeandDataFilterMenu();
    showUsers();

    //dowload template in memory
    await loadTemplates();
    setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration
    //clickAddInsertElement();
    //checkRegistration();
    //cleanOldUsers(); to clean
});

