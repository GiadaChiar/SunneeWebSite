
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





//-------------------------------insert page ------------------

/*
// funzione per gestire la scelta e creare il dropdown a destra
function selectedControll(selectedValue: string | null, parentDropdown: HTMLElement) {
    if (!selectedValue) return;

    if (selectedValue === "swim") {
        console.log("la categoria selezionata è",selectedValue)
    }

    console.log("Hai selezionato:", selectedValue);
}

*/






/*

// listener annidato come nella versione originale
function handleDropdownClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("dropdown-item")) return;

    const selectedValue = target.getAttribute("value");
    const selectedName = target.getAttribute("name");

    const parentDropdown = target.closest(".dropdown") as HTMLElement;
    if (!parentDropdown) return;

    changeTextContent("typeTitleDropdown", selectedName ?? "Tipologia..");

    const existingRight = parentDropdown.parentElement?.querySelector(".dropend");
    if (existingRight) existingRight.remove();

    selectedControll(selectedValue, parentDropdown);
}
*/





/*
// click sul submit: inserisce template e aggiunge listener
export function clickAddInsertElement() {
    const submitHtmlPage = document.getElementById("submitLogIn");
    submitHtmlPage?.addEventListener("click", function () {
        const titlePage = document.getElementById("titleLogIn");
        if (titlePage?.textContent !== "Accesso Riservato:") return;

        cleanSection("buttonLinkHTML");
        insertTemplate("loginHTML", "insertOptions");

        // listener sul container appena creato
        const loginContainer = document.getElementById("loginHTML");
        if (!loginContainer) return;

        loginContainer.addEventListener("click", handleDropdownClick);
    });
}

*/
