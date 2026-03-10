//dom functions

//clean element to HTML pages
export function cleanSection(sectionId: string){

    const section = document.getElementById(sectionId);

    if(!section){
        console.error("Section not found");
        return;
    }

    section.innerHTML = "";
}


//Function change text content

export function changeTextContent(elementId:string,text:string){

    const element = document.getElementById(elementId);
    if(element)
    element.textContent = text

}


