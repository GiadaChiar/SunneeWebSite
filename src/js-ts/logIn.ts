import '../style/menu.scss';
import '../style/form.scss';
import '../style/logIn.scss';

import { setUpMenu } from './menu'
import { fetchForm } from './form'

/*
import { setUpNewSection, loadTemplates,removeElementHtm} from './logInSections'

*/

import{ removeElementHtm,setUpNewSection,clickAddInsertElement } from "./events"
import{ loadTemplates } from "./templates"

document.addEventListener("DOMContentLoaded", async() => {
    setUpMenu();
    fetchForm();
    removeElementHtm();

    //dowload template in memory
    await loadTemplates();
    setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration
    clickAddInsertElement();
});