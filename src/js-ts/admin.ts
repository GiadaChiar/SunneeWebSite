
import '../style/admin.scss';
import { changeTextContent,showPopUp } from "./dom"

//variabili globali 
let selectedType: string = "";
let selectedSize : string = "";
let selectedQuantity : number = 0;
let selectedColor: string = "";
let selectedState: string = "";
let selectedImage : string = "";
let generateId : string ="";
/*
export function changeTextContent(elementId: string, text: string) {

    const element = document.getElementById(elementId);
    if (element)
        element.textContent = text

}

    function showPopUp(title: string, message: string
*/
//----check inmput -------------//
function checkInputQuality(){
    const quantityInput= document.getElementById("quantityInput")as HTMLInputElement;
    quantityInput?.addEventListener("input",()=>{
        let valueQuantity= quantityInput.value 
        let valueQuantityCheck = valueQuantity.replace(/[^0-9]/g, '')
        if(valueQuantity !==valueQuantityCheck){
            showPopUp("Inserimento Errato", "Inserisci come quantità un numero intero")
            valueQuantity = ""
        }

        console.log("valore inserito",valueQuantity)
    })
}





//---------------------------------check dropdown----------------//

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


function disableDropdown(dropdownId: string, bool: boolean) {
    const dropdownButton = document.getElementById(dropdownId) as HTMLButtonElement;
    if (dropdownButton) {
        dropdownButton.disabled = bool; // disabilita
    }
}






function genderMenu(valueDropdown: string) {
    if (valueDropdown === "sarong" || valueDropdown === "cap" && valueDropdown !== null) {
        disableDropdown("dropdownButtonGender", true)

        if(valueDropdown === "sarong"){
            changeTextContent("dropdownButtonGender","donna")
        }else{
            changeTextContent("dropdownButtonGender","unisex")
        }
    }else{
        disableDropdown("dropdownButtonGender", false)
        checkDropdown("genderDropdown","dropdownButtonGender");
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


//change text in base selection except type and geneder

function checkDropdown(dropdownId:string,buttonId: string){
    if(dropdownId !=="typeDropdown" ){

    const buttonType = document.getElementById(dropdownId);

    buttonType?.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.classList.contains("dropdown-item")) {

            const nameDropdown = target.getAttribute("name") || "";
            let valueDropdown = target.getAttribute("value") || "";
            
            changeTextContent(buttonId,nameDropdown)
        }
    })
}
}


///if I click on save button I want all values to insert into interface

function eventSave(){
    const submitSave = document.getElementById("submitSave");
    if (submitSave){
    submitSave.addEventListener("submit",()=>{

    })
}
}






document.addEventListener("DOMContentLoaded", () => {


    //desable dropdown gender
    disableDropdown("dropdownButtonGender", true)
    checkTypeDropdown();
    checkDropdown("sizerDropdown","dropdownButtonSize");
    checkDropdown("colorDropdown","dropdownButtonColor");
    checkDropdown("stateDropdown","dropdownButtonState");
    checkInputQuality();


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






