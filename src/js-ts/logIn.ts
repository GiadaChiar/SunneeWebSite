import '../style/menu.scss';
import '../style/form.scss';
import '../style/logIn.scss';

import { setUpMenu } from './menu'
import { fetchForm } from './form'

import { setUpNewSection, loadTemplates } from './logInSections'


document.addEventListener("DOMContentLoaded", async() => {
    setUpMenu();
    fetchForm();

    //dowload template in memory
    await loadTemplates();
    setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration

});
