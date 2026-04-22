
import { insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events";


//--------------------------------------------------STANDARD FUNCTIONs -----------------------------------------------------------------


//clean element to HTML pages
export function cleanSection(sectionId: string) {

    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }
    section.innerHTML = "";
}


//Function change text content

export function changeTextContent(elementId: string, text: string) {

    const element = document.getElementById(elementId);
    if (element)
        element.textContent = text
}

//show information popUp
export function showPopUp(title: string, message: string) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUp");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);

    addCloseButton("custom-popup")
}



export function addCloseButton(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return

    const closeBtn = document.createElement("button");

    closeBtn.classList.add("btn-close");
    closeBtn.type = "button"

    closeBtn.addEventListener("click", () => {
        container.remove(); 
    });
    container.style.position = "relative";
    container.appendChild(closeBtn)
}



//info and quanstion multy opstions popUp

export function showPopUpSelection(title: string, message: string, checkright: string, checkleft: string) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUpSelection");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);
    changeTextContent("popUCheckright", checkright);
    changeTextContent("popUCheckleft", checkleft);
    handleCheckBoxtPoPUp();

    const closeButton = document.getElementById("closeButton");

    addCloseButton("PopUpHtml")
}



//-------------------------------ADMIN SECTION----------------------------------------------------------


//disable dropdown in the filter to add or change products

export function disableDropdown(dropdownId: string, bool: boolean) {
    const dropdownButton = document.getElementById(dropdownId) as HTMLButtonElement;
    if (dropdownButton) {
        dropdownButton.disabled = bool; // disable
    }
}





//filter swim-suit subcategory
export function showHidden(subMenuId: string):void {
    const subMenu = document.getElementById(subMenuId)
    if (subMenu) {
        if (subMenu.dataset.show === "none") {
            subMenu.dataset.show = "see"
        } else {
            subMenu.dataset.show = "none"
        }
    }
}


// set dropdown in relation to type
export function genderMenu(valueDropdown: string): void {
    const genderButton = document.getElementById("dropdownButtonGender");
    if (!genderButton) return;

    if (valueDropdown === "sarong") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "donna");
        genderButton.setAttribute("data-value", "woman");
        return;
    }

    if (valueDropdown === "cap") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "unisex");
        genderButton.setAttribute("data-value", "unisex");
        return;
    }

    
    disableDropdown("dropdownButtonGender", false);
    changeTextContent("dropdownButtonGender", "Genere");
    
}



//set text and value in dropdowns != Type

export function initGenericDropdown(target: HTMLElement, dropdownId: string, buttonId: string) {
    if (!target.classList.contains("dropdown-item")) return;
    if (!target.closest(`#${dropdownId}`)) return;

    const name = target.getAttribute("name") || "";
    const value = target.getAttribute("value") || "";

    // change button text
    changeTextContent(buttonId, name);

    //save value in dom like type 
    document
        .getElementById(buttonId)
        ?.setAttribute("data-value", value);

    // in base type you have a specific gender or a selection
    if (dropdownId === "typeDropdown") {
        genderMenu(value);
        return;
    }

};


//----------------------------------UNITOOOOOOOOOOOOOOOOOOOO-----------------------------
/*
//get value in Type dropdown 
export function getTypeValue(): string | null {
    return document
        .getElementById("dropdownButtonType")
        ?.getAttribute("data-value") || null;
}
*/


//get values from other dropdowns

export function getDropdownValue(buttonId: string): string | null {
    return document
        .getElementById(buttonId)
        ?.getAttribute("data-value") || null;
}

///----------------------------END UNITPOOOOOOOOOOOOOOOOOOOOOOOOO-----------------------+