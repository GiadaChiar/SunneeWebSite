const templates: Record<string, HTMLTemplateElement> = {};

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

function cleanSection(sectionId: string){

    const section = document.getElementById(sectionId);

    if(!section){
        console.error("Section not found");
        return;
    }

    section.innerHTML = "";
}

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
}


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

/*
export async function fetchTemplate(templateId:string) {

    const response = await fetch("logInSections.html");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const template = doc.getElementById(templateId) as HTMLTemplateElement;

    if (!template) {
        console.error("Template not found");
        return null;
    }

    return template;
}





//clean function 
function cleanSection(sectionId : string){
    const mySection = document.getElementById(sectionId);
    if(!mySection){
        console.log("Section to clean not found")
        return;
    }
    mySection.innerHTML= "";
}


//if I click to registration to default page 
//<a class="d-block mb-2" id="newRegistration" href="#">Nuovo utente? Registrati</a>
async function InsertTemplate(sectionId : string, templateId : string){
    
    const section = document.getElementById(sectionId) as HTMLElement;
    
    //with fetch it is in another page 
    //const template= document.getElementById(templateId) as HTMLTemplateElement;
    if (!section ) {
    console.error("section not found");
    return;
    }

    const template = await fetchTemplate(templateId);
    if (!template) return;
    
    cleanSection(sectionId);

        
    //insert <template id="registration">
    const clone = document.importNode(template.content, true);
    section.appendChild(clone);

}


//if I click 
export function setUpNewUserRegistration(){
    const linkClicked = document.getElementById("newRegistration");
    const sectionId = "login";
    const templateId = "registration";
    if (!linkClicked) {
        console.error("Link add user not found");
        return;
    }

    linkClicked.addEventListener("click", async function (event) {
        event.preventDefault(); // evita il reload della pagina
        await InsertTemplate(sectionId, templateId);
    });

}
*/