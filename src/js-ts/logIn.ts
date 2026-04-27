import '../style/menu.scss';
import '../style/form.scss';
import '../style/logIn.scss';
import '../style/poUp.scss';



import { setUpMenu, checkClickMenu } from './menu'
import { fetchForm } from './form'
import { loadTemplates } from "./templates";
import { logInListenerClick } from "./events";
import { cleanSection, changeTextContent } from "./dom";
import { submitLogIn, setUpNewSection } from "./events";



//setUp Reservation Access
export function setReservatePage() {
    cleanSection("buttonLinkHTML");
    cleanSection("newRegistration");
    cleanSection("forgotPassword");
    changeTextContent("titleLogIn", "Accesso Riservato:");
    submitLogIn();
}



document.addEventListener("DOMContentLoaded", async () => {
    //dowload template in memory
    await loadTemplates();
    setUpMenu();
    checkClickMenu();
    fetchForm();
    logInListenerClick();
    submitLogIn();
    setUpNewSection("newRegistration", "loginHTML", "registrationTemplate");//new registration

});

