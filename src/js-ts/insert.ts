import '../style/menu.scss';
import { setUpMenu } from './menu'
import { setUpNewSection, loadTemplates } from './logInSections'


document.addEventListener("DOMContentLoaded", async() => {
    setUpMenu();
    //dowload template in memory
    await loadTemplates();
    setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration
});



