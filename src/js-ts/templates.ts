//templates functions

import { checkRegistration } from "./dom";

//loader templates to save them in memory
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




//insert template in the page
export function insertTemplate(sectionId: string, templateId: string) {

    const section = document.getElementById(sectionId);

    const template = templates[templateId];

    if (!section || !template) {
        console.error("Section or template not found");
        return;
    }

    //Not use clean it is better use a clonation 

    //make a copy by template and then replace it 
    const clone = template.content.cloneNode(true);

    section.replaceChildren(clone);

    //check for submit 
    if (templateId === "registrationTemplate") {
        const form = document.getElementById("registration") as HTMLFormElement;
        //add listener forum only one time
        //if existing and if is not an attribute data-listener add else not
        //because I don't want add extra eventListener
        if (form && !form.hasAttribute("data-listener")) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                checkRegistration();
            });
            form.setAttribute("data-listener", "true");
        }
    }
}