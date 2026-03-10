
//event functions

import { cleanSection,changeTextContent } from "./dom";
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



//function to remuve elements
export function removeElementHtm(){
    const linkReservateArea = document.getElementById("buttonLinkHTML") as HTMLElement | null;
    //click 
    linkReservateArea?.addEventListener("click", function(){
        cleanSection("buttonLinkHTML");
        cleanSection("checksection");
        cleanSection("newRegistration");
        cleanSection("forgotPassword");
        changeTextContent("titleLogIn","Accesso Riservato:");
    })

}