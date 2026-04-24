import '../style/menu.scss';
import '../style/form.scss';
import '../style/logIn.scss';
import'../style/poUp.scss';




//NON IMPORTATO getTypeandDataFilterMenu NON PENSO SERVA
import { setUpMenu, checkClickMenu } from './menu'
import { fetchForm } from './form'

import{ loadTemplates } from "./templates";
//import{ setReservateLogIn} from "./events"
import{ logInListenerClick} from "./events";
import { cleanSection, changeTextContent } from "./dom";
import {submitLogIn, setUpNewSection } from "./events";
import { showUsersAllUsers, showUsers} from './userServices';


//setUp Reservation Access
export function setReservatePage() {
        cleanSection("buttonLinkHTML");
        cleanSection("newRegistration");
        cleanSection("forgotPassword");
        changeTextContent("titleLogIn", "Accesso Riservato:");
        submitLogIn();
}




console.log("PAGEEE LOGFIN")

document.addEventListener("DOMContentLoaded", async() => {
    //dowload template in memory
    await loadTemplates();
    setUpMenu();
    checkClickMenu();
    fetchForm();
    logInListenerClick();
    submitLogIn();
    setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration
    
    //EXTRA TO SEE USERS
    showUsersAllUsers();
    showUsers();
    
    
    
    
    //getTypeandDataFilterMenu();

    /*setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration
    setUpMenu();
    fetchForm();
    setReservateLogIn();
    preventSubmitLogIn();
    getTypeandDataFilterMenu();
    showUsers();
    showUsersAllUsers()*/
});

