import '../style/menu.scss';
import '../style/form.scss';
import '../style/logIn.scss';
import'../style/poUp.scss';

import { setUpMenu,getTypeandDataFilterMenu } from './menu'
import { fetchForm } from './form'

import{ setReservateLogIn,setUpNewSection,preventSubmitLogIn} from "./events"
import{ loadTemplates } from "./templates"
import{showUsers,cleanOldUsers, showUsersAllUsers} from"./dom"






document.addEventListener("DOMContentLoaded", async() => {
    //dowload template in memory
    await loadTemplates();
    setUpNewSection("newRegistration","loginHTML","registrationTemplate");//new registration
    setUpMenu();
    fetchForm();
    setReservateLogIn();
    preventSubmitLogIn();
    getTypeandDataFilterMenu();
    showUsers();
    //cleanOldUsers(); 
    showUsersAllUsers()
});

