/*const templates: Record<string, HTMLTemplateElement> = {};

//cronology of templates 
export async function loadTemplates() {

    const response = await fetch("logInSections.html");
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const foundTemplates = doc.querySelectorAll("template");

    foundTemplates.forEach(template => {
        templates[template.id] = template as HTMLTemplateElement;
    });

}

//cleaning
function cleanSection(sectionId: string){

    const section = document.getElementById(sectionId);

    if(!section){
        console.error("Section not found");
        return;
    }

    section.innerHTML = "";
}

//insert template in the page
function insertTemplate(sectionId: string, templateId: string){

    const section = document.getElementById(sectionId);

    const template = templates[templateId];

    if(!section || !template){
        console.error("Section or template not found");
        return;
    }

    //Not use clean it is better use a clonation 

    //make a copy by template and then replace it 
    const clone = template.content.cloneNode(true);

    section.replaceChildren(clone);
    
    //check for submit 
    if(templateId === "registrationTemplate"){
        setUpNewSection("submitRegistration","loginHTML","newPasswordTemplate");
    }
}


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




//Function change text 

function changeTextContent(elementId:string,text:string){

    const element = document.getElementById(elementId);
    if(element)
    element.textContent = text

}

// RISERVATE AREA 
//If I click a wannt to change standard page html 

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

}*/