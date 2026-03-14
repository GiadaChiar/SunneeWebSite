
import '../style/admin.scss';
import { changeTextContent } from "./dom"
/*
export function changeTextContent(elementId: string, text: string) {

    const element = document.getElementById(elementId);
    if (element)
        element.textContent = text

}
*/


function showHidden(subMenuId: string) {
    const subMenu = document.getElementById(subMenuId)
    if (subMenu) {
        if (subMenu.dataset.show === "none") {
            subMenu.dataset.show = "see"
        } else {
            subMenu.dataset.show = "none"
        }
    }

}


function disableAnableDropdown(dropdownId: string, bool: boolean) {
    const dropdownButton = document.getElementById(dropdownId) as HTMLButtonElement;
    if (dropdownButton) {
        dropdownButton.disabled = bool; // disabilita
    }
}






function genderMenu(valueDropdown: string) {
    if (valueDropdown !== "sarong" && valueDropdown !== "cap" && valueDropdown !== null) {
        disableAnableDropdown("dropdownButtonGender", false)
    }else{
        disableAnableDropdown("dropdownButtonGender", true)
    }

}

// Funzione che gestisce il valore selezionato
function handleSelectedValueType(valueType: string, nameType: string) {
    console.log("Valore selezionato:", valueType);
    console.log("Nome selezionato:", nameType);
    changeTextContent("dropdownButtonType",nameType)
    genderMenu(valueType)
}


function checkTypeDropdown() {
    const buttonType = document.getElementById("typeDropdown");

    buttonType?.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.classList.contains("dropdown-item")) {

            const nameDropdown = target.getAttribute("name") || "";
            let valueDropdown = target.getAttribute("value") || "";


            if (valueDropdown == "swimSuit") {
                event.preventDefault();//still open
                event.stopPropagation();
                showHidden("submenuType");
            }

            if (target.closest("#submenuType")) {
                const nameUnderMenu = target.getAttribute("name") || "";
                console.log("SOTTOMENU", nameUnderMenu)
                //changeTextContent("dropdownButtonType", nameUnderMenu)
                const valueUnderMenu = target.getAttribute("data-value") || "";
                handleSelectedValueType(valueUnderMenu, nameUnderMenu)

            }
            if (valueDropdown !== "swimSuit" && valueDropdown !== null && nameDropdown !== null) {
                handleSelectedValueType(valueDropdown, nameDropdown)
            }
        }

    })
}







document.addEventListener("DOMContentLoaded", () => {


    //desable dropdown gender
    disableAnableDropdown("dropdownButtonGender", true)
    checkTypeDropdown()

});
























/*

document.addEventListener("DOMContentLoaded", () => {


    //desable dropdown gender
    disableAnableDropdown("dropdownButtonGender",true)

    const buttonType = document.getElementById("typeDropdown");

    buttonType?.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.classList.contains("dropdown-item")) {
        
            const nameDropdown = target.getAttribute("name")
            let valueDropdown = target.getAttribute("value")
            

            if (valueDropdown == "swimSuit") {
                event.preventDefault();//still open
                event.stopPropagation();
                showHidden("submenuType");
            }

            if (target.closest("#submenuType")){
                const nameUnderMenu = target.getAttribute("name")
                console.log("SOTTOMENU", nameUnderMenu)

                if(nameUnderMenu){
                    changeTextContent("dropdownButtonType", nameUnderMenu)
                    const valueUnderMenu= target.getAttribute("data-value")
                    if(valueUnderMenu){
                        console.log(valueUnderMenu)
                        valueDropdown = valueUnderMenu
                        return valueDropdown
                    }
                }
                
            }

            if (valueDropdown !== "swimSuit" && valueDropdown !== null && nameDropdown !== null) {
                changeTextContent("dropdownButtonType", nameDropdown)
                console.log(valueDropdown)
                return valueDropdown
            }
        }
        
    })

});

*/






