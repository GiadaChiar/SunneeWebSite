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
import { users } from "./interfaces";
import type { RegisterForm} from "./interfaces";

function showUsersAllUsers(){
    const userJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    const all = [...users,...userJson]
    console.log("Tutti gli users:",all)
    console.log("Gli suser salvati nello storico: ",userJson)
}


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
    //cleanOldUsers(); 
    showUsersAllUsers()
});

