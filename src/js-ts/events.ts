
//event functions

import { cleanSection,changeTextContent,setAdminLogin,checkUserLogin,submitLogIn} from "./dom";
import { insertTemplate } from "./templates";







//check event for registration 
export function setUpNewSection(eventId :string,sectionId: string, templateId: string){

    const linkClicked = document.getElementById(eventId);

    if(!linkClicked){
        console.error("Link not found");
        return;
    }

    linkClicked.addEventListener("click", (event) => {

        event.preventDefault();

        insertTemplate(sectionId, templateId);

    });

}



//function to remuve elements if I click on reservate area
export function removeElementHtm(){
    const linkReservateArea = document.getElementById("buttonLinkHTML") as HTMLElement | null;
    //click 
    linkReservateArea?.addEventListener("click", function(){
        cleanSection("buttonLinkHTML");
        cleanSection("checksection");
        cleanSection("newRegistration");
        cleanSection("forgotPassword");
        changeTextContent("titleLogIn","Accesso Riservato:");
        setAdminLogin(true);
        submitLogIn();
    })

}






export function preventSubmitLogIn(){
const registrationForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;
registrationForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    checkUserLogin();
});

}



///PopUpSelect the box listener
export function handleCheckBoxtPoPUp(): Promise<"yes" | "no">{
    return new Promise((resolve) => {
    // prendi il popup appena inserito
    const popup = document.getElementById("custom-popup");
    if (!popup) return;

    // prendi i checkbox dentro questo popup
    const checkRight = popup.querySelector("#popUCheckright") as HTMLInputElement;
    const checkLeft = popup.querySelector("#popUCheckleft") as HTMLInputElement;
    const saveButton = popup.querySelector("#saveCheck") as HTMLButtonElement;
    
    saveButton?.addEventListener("click",(event)=>{
        event.preventDefault();
        if(checkRight.checked)resolve("yes")
        else resolve("no");
        cleanSection("PopUpHtml");
        // Risolvo la promise con true se il checkbox destro è selezionato, altrimenti false
        /*const isRightChecked = checkRight.checked;
        const isLeftChecked = checkLeft.checked;*/
        
        });

    })
}