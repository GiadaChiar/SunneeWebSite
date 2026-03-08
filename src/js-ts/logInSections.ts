const templates: Record<string, HTMLTemplateElement> = {};

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
function InsertTemplate(sectionId: string, templateId: string){

    const section = document.getElementById(sectionId);

    if(!section){
        console.error("section not found");
        return;
    }

    const template = templates[templateId];

    if(!template){
        console.error("template not loaded");
        return;
    }

    cleanSection(sectionId);

    const clone = document.importNode(template.content, true);

    section.appendChild(clone);
    
    //check for submit 
    if(templateId === "registrationTemplate"){
        setUpNewSection("submitRegistration","loginHTML","newPasswordTemplate");
    }
}


//check event for registration 
export function setUpNewSection(eventId : string,sectionId: string, templateId: string){

    const linkClicked = document.getElementById(eventId);

    if(!linkClicked){
        console.error("Link not found");
        return;
    }

    linkClicked.addEventListener("click", (event) => {

        event.preventDefault();

        InsertTemplate(sectionId, templateId);

    });

}

//check event for registration setUpNewUserRegistration
export function setUpNewUserRegistration(){

    const linkClicked = document.getElementById("newRegistration");

    if(!linkClicked){
        console.error("Link not found");
        return;
    }

    linkClicked.addEventListener("click", (event) => {

        event.preventDefault();

        InsertTemplate("login", "registration");

    });

}